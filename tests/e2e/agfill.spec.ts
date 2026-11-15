import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import AxeBuilder from "@axe-core/playwright";
import { test, expect, type Page } from "@playwright/test";
import { pngFixture, receiptPaint } from "./helpers/png";

const BASE = (process.env.BASE_PATH ?? "/").replace(/\/+$/, "");
const AG_FORM_URL =
  "https://oag.ca.gov/contact/consumer-complaint-against-business-or-company";
const FIXTURE = readFileSync(
  fileURLToPath(new URL("./fixtures/ag-form.html", import.meta.url)),
  "utf8",
);
const FILE_INPUT = "files[submitted_documents_upload_supporting_documents]";

/** Read the bookmark's code and the clipboard payload from the kit. */
async function kitBookmark(page: Page) {
  await page.goto(`${BASE}/dev/kit`);
  const link = page.locator("a.kit-bookmarklet");
  await expect(link).toBeVisible();
  const href = (await link.getAttribute("href")) ?? "";
  const payload =
    (await page.locator("button[data-payload]").getAttribute("data-payload")) ??
    "";
  return {
    code: decodeURIComponent(href.slice("javascript:".length)),
    payload,
  };
}

/**
 * Serve the fixture at the AG form's real URL for every page in the context
 * (the handoff popup is its own page); never touch the network.
 */
async function openFixture(page: Page) {
  await page
    .context()
    .route(AG_FORM_URL, (route) =>
      route.fulfill({ status: 200, contentType: "text/html", body: FIXTURE }),
    );
  await page.goto(AG_FORM_URL);
}

const value = (page: Page, name: string) =>
  page.locator(`[name="${name}"]`).inputValue();

test.describe("fill-the-AG-form bookmark", () => {
  // The suite defaults to a phone; the bookmark is a computer feature.
  test.use({
    viewport: { width: 1280, height: 900 },
    isMobile: false,
    hasTouch: false,
  });

  test("the kit offers a draggable bookmark that does nothing when clicked", async ({
    page,
  }) => {
    await page.goto(`${BASE}/dev/kit`);
    const link = page.locator("a.kit-bookmarklet");
    await expect(link).toHaveText("Fill AG form");
    expect(await link.getAttribute("href")).toMatch(/^javascript:/);
    // The link carries no personal data, only the generic script.
    const href = decodeURIComponent((await link.getAttribute("href")) ?? "");
    expect(href).not.toContain("Lopez");
    expect(href).not.toContain("example.com");
    await link.click();
    await expect(page).toHaveURL(new RegExp(`${BASE}/dev/kit`));
    await expect(page.getByText(/Clicking it here does nothing/)).toBeVisible();
  });

  test("the desktop kit with the bookmark passes axe", async ({ page }) => {
    await page.goto(`${BASE}/dev/kit`);
    await expect(page.locator("a.kit-bookmarklet")).toBeVisible();
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations.map((violation) => violation.id)).toEqual([]);
  });

  test("one click fills the AG form and attaches the evidence PDF", async ({
    page,
  }) => {
    const { code } = await kitBookmark(page);

    // Build an evidence PDF in the kit; it is kept on the device for the
    // bookmark.
    await page.getByLabel("Add screenshots").setInputFiles({
      name: "order-receipt.png",
      mimeType: "image/png",
      buffer: pngFixture(600, 1200, receiptPaint(600)),
    });
    await page.getByRole("button", { name: "Build the PDF" }).click();
    await expect(page.locator(".kit-agfill-ready")).toContainText(
      /Ready: .+\.pdf will be attached/,
    );

    await openFixture(page);
    await page.evaluate(code);
    const box = page.locator("#ab578-agfill");
    await expect(box).toContainText(
      /Done\. \d+ answers filled in and your evidence PDF attached/,
    );

    expect(
      await value(page, "submitted[enter_your_information][first_name]"),
    ).toBe("Maria");
    expect(
      await value(
        page,
        "submitted[business_information_complaint_against][company_address]",
      ),
    ).toBe("303 2nd Street, Suite 800");
    expect(
      await value(page, "submitted[complaint][date_of_last_contact]"),
    ).not.toBe("");

    // The PDF is attached to the first upload, with a description.
    await expect(
      page.locator(
        '[name="submitted[documents][do_you_want_to_upload]"][value="Y"]',
      ),
    ).toBeChecked();
    const file = await page
      .locator(`[name="${FILE_INPUT}"]`)
      .evaluate((input: HTMLInputElement) => ({
        count: input.files?.length ?? 0,
        name: input.files?.[0]?.name ?? "",
        type: input.files?.[0]?.type ?? "",
        size: input.files?.[0]?.size ?? 0,
      }));
    expect(file.count).toBe(1);
    expect(file.name).toMatch(/\.pdf$/);
    expect(file.type).toBe("application/pdf");
    expect(file.size).toBeGreaterThan(1000);
    expect(
      await value(page, "submitted[documents][description_of_document]"),
    ).toContain("Screenshots");
    await expect(
      page.locator(
        '[name="submitted[documents][do_you_want_to_upload2]"][value="N"]',
      ),
    ).toBeChecked();

    // The person affirms and submits themselves.
    await expect(
      page.locator('[name="submitted[statement][affirm_yn]"]:checked'),
    ).toHaveCount(0);
    await expect(page.locator("body")).not.toHaveAttribute(
      "data-submitted",
      "true",
    );
  });

  test("without a PDF it fills the answers and leaves the upload alone", async ({
    page,
  }) => {
    const { code } = await kitBookmark(page);
    await openFixture(page);
    await page.evaluate(code);
    const box = page.locator("#ab578-agfill");
    await expect(box).toContainText(/Done\. \d+ answers filled in\. Check/);
    expect(
      await value(page, "submitted[enter_your_information][first_name]"),
    ).toBe("Maria");
    const files = await page
      .locator(`[name="${FILE_INPUT}"]`)
      .evaluate((input: HTMLInputElement) => input.files?.length ?? 0);
    expect(files).toBe(0);
  });

  test("falls back to pasting when the popup is blocked", async ({ page }) => {
    const { code, payload } = await kitBookmark(page);
    expect(payload.startsWith("AB578-AGFILL:v1:")).toBe(true);
    await openFixture(page);
    await page.evaluate(() => {
      window.open = () => null;
    });
    await page.evaluate(code);
    const box = page.locator("#ab578-agfill");
    await expect(box).toContainText("Couldn't open your kit");
    await box.locator("textarea").fill(payload);
    await expect(box).toContainText(/Done\. \d+ answers filled in/);
    expect(
      await value(page, "submitted[enter_your_information][first_name]"),
    ).toBe("Maria");
  });

  test("asks for a paste when this browser has no saved answers", async ({
    page,
  }) => {
    const { code } = await kitBookmark(page);
    await page.evaluate(() => localStorage.removeItem("ab578.agfill.answers"));
    await openFixture(page);
    await page.evaluate(code);
    const box = page.locator("#ab578-agfill");
    await expect(box).toContainText("Couldn't find your answers");
    await expect(box.locator("textarea")).toBeVisible();
  });

  test("rejects pasted text that is not a kit payload", async ({ page }) => {
    const { code } = await kitBookmark(page);
    await openFixture(page);
    await page.evaluate(() => {
      window.open = () => null;
    });
    await page.evaluate(code);
    const box = page.locator("#ab578-agfill");
    await box.locator("textarea").fill("hello there");
    await expect(box).toContainText("doesn't look like your answers");
    expect(
      await value(page, "submitted[enter_your_information][first_name]"),
    ).toBe("");
  });

  test("points people to the AG form when clicked elsewhere", async ({
    page,
  }) => {
    const { code } = await kitBookmark(page);
    await page.goto(`${BASE}/`);
    await page.evaluate(code);
    const box = page.locator("#ab578-agfill");
    await expect(box).toContainText(
      "Open the Attorney General's complaint form",
    );
    await expect(box.getByRole("link")).toHaveAttribute("href", AG_FORM_URL);
  });

  test("the handoff page opened on its own explains what to do", async ({
    page,
  }) => {
    await page.goto(`${BASE}/agfill/`);
    await expect(page.locator(".agfill-status")).toContainText(
      "Open the Attorney General's complaint form",
    );
    await expect(
      page.getByRole("link", { name: "Open your complaint kit" }),
    ).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      "noindex, nofollow",
    );
  });
});

test.describe("fill-the-AG-form bookmark on touch screens", () => {
  test.use({ hasTouch: true, viewport: { width: 390, height: 844 } });

  test("phones get the copy list, not the bookmark", async ({ page }) => {
    await page.goto(`${BASE}/dev/kit`);
    await expect(page.locator(".kit-ag-label-en").first()).toBeVisible();
    await expect(page.locator("a.kit-bookmarklet")).toHaveCount(0);
  });
});
