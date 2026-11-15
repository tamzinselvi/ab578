import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import AxeBuilder from "@axe-core/playwright";
import { test, expect, type Page } from "@playwright/test";

const BASE = (process.env.BASE_PATH ?? "/").replace(/\/+$/, "");
const AG_FORM_URL =
  "https://oag.ca.gov/contact/consumer-complaint-against-business-or-company";
const FIXTURE = readFileSync(
  fileURLToPath(new URL("./fixtures/ag-form.html", import.meta.url)),
  "utf8",
);

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

/** Serve the fixture at the AG form's real URL; never touch the network. */
async function openFixture(page: Page) {
  await page.route(AG_FORM_URL, (route) =>
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
    expect(href).not.toContain("@");
    await link.click();
    await expect(page).toHaveURL(new RegExp(`${BASE}/dev/kit`));
    await expect(page.getByText(/Clicking it here does nothing/)).toBeVisible();
  });

  test("fills the AG form from the pasted answers and never submits", async ({
    page,
  }) => {
    const { code, payload } = await kitBookmark(page);
    expect(payload.startsWith("AB578-AGFILL:v1:")).toBe(true);

    await openFixture(page);
    await page.evaluate(code);
    const box = page.locator("#ab578-agfill");
    await expect(box).toContainText("Paste your answers here");
    await box.locator("textarea").fill(payload);
    await expect(box).toContainText(/Done\. \d+ answers filled in/);

    expect(
      await value(page, "submitted[enter_your_information][first_name]"),
    ).toBe("Maria");
    expect(await value(page, "submitted[enter_your_information][state]")).toBe(
      "CA",
    );
    expect(
      await value(
        page,
        "submitted[business_information_complaint_against][company_address]",
      ),
    ).toBe("303 2nd Street, Suite 800");
    expect(
      await value(
        page,
        "submitted[business_information_complaint_against][company_state]",
      ),
    ).toBe("CA");
    expect(
      await value(page, "submitted[complaint][amount_in_dispute]"),
    ).toMatch(/^\d+\.\d{2}$/);
    const resolution = await value(
      page,
      "submitted[complaint][reasonable_resolution]",
    );
    expect(resolution.length).toBeGreaterThan(0);
    expect(resolution.length).toBeLessThanOrEqual(128);
    expect(
      await value(page, "submitted[complaint][complaint_description]"),
    ).toContain("§ 22599.2");

    // Choices first: the contact-history fields opened, then got filled.
    await expect(
      page.locator(
        '[name="submitted[complaint][contacte_company]"][value="Y"]',
      ),
    ).toBeChecked();
    expect(
      await value(page, "submitted[complaint][date_of_last_contact]"),
    ).not.toBe("");
    await expect(
      page.locator(
        '[name="submitted[enter_your_information][submitting_on_behalf]"][value="N"]',
      ),
    ).toBeChecked();

    // The person answers the affirmation and submits themselves.
    await expect(
      page.locator('[name="submitted[statement][affirm_yn]"]:checked'),
    ).toHaveCount(0);
    await expect(page.locator("body")).not.toHaveAttribute(
      "data-submitted",
      "true",
    );
  });

  test("the desktop kit with the bookmark passes axe", async ({ page }) => {
    await page.goto(`${BASE}/dev/kit`);
    await expect(page.locator("a.kit-bookmarklet")).toBeVisible();
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations.map((violation) => violation.id)).toEqual([]);
  });

  test("rejects text that is not a kit payload", async ({ page }) => {
    const { code } = await kitBookmark(page);
    await openFixture(page);
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
});

test.describe("fill-the-AG-form bookmark on touch screens", () => {
  test.use({ hasTouch: true, viewport: { width: 390, height: 844 } });

  test("phones get the copy list, not the bookmark", async ({ page }) => {
    await page.goto(`${BASE}/dev/kit`);
    await expect(page.locator(".kit-ag-label-en").first()).toBeVisible();
    await expect(page.locator("a.kit-bookmarklet")).toHaveCount(0);
  });
});
