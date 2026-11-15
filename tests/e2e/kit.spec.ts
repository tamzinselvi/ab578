import { readFileSync } from "node:fs";
import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import {
  agFormFacts,
  agFormFields,
  destinations,
} from "../../src/data/destinations";
import { getPlatform } from "../../src/data/platforms";

const BASE = (process.env.BASE_PATH ?? "/").replace(/\/+$/, "");

function destinationUrl(id: string): string {
  const found = destinations.find((destination) => destination.id === id);
  if (!found) throw new Error(`missing destination ${id}`);
  return found.url;
}

/** On computers the field-by-field AG list sits in a fold-out; open it. */
async function openAgList(page: Page) {
  const fold = page.locator(".kit-ag-manual");
  await expect(page.locator(".kit-ag-fields")).toHaveCount(1);
  if ((await fold.count()) > 0 && !(await fold.getAttribute("open"))) {
    await fold.locator("summary").click();
  }
}

test.describe("kit screen", () => {
  test("labels settled and argued asks, with the floor and the About link", async ({
    page,
  }) => {
    await page.goto(`${BASE}/dev/kit`);

    // Fixture: missing_items (argued) plus no_human (settled).
    await expect(
      page.getByText("Backed by California law, as we read it"),
    ).toBeVisible();
    await expect(page.getByText("The law requires this")).toBeVisible();
    await expect(
      page.getByText("At minimum, they owe you $18.25"),
    ).toBeVisible();

    // Argued asks link to the About page's California-law section, localized.
    const why = page.getByRole("link", { name: "Why?" }).first();
    await expect(why).toHaveAttribute("href", `${BASE}/about#california-law`);
  });

  test("sends the platform demand with copy, support link and human tips", async ({
    page,
  }) => {
    await page.goto(`${BASE}/dev/kit`);

    await expect(
      page.getByRole("heading", { name: "Get your refund from DoorDash" }),
    ).toBeVisible();
    await expect(page.getByText("Short version, for chat")).toBeVisible();
    await expect(
      page.getByText("Longer version, for email or web forms"),
    ).toBeVisible();

    const support = page.getByRole("link", { name: "Open DoorDash support" });
    await expect(support).toHaveAttribute(
      "href",
      getPlatform("doordash").supportUrl,
    );
    await expect(support).toHaveAttribute("target", "_blank");
    await expect(support).toHaveAttribute("rel", "noopener noreferrer");

    await page.getByText("How to reach a real person").click();
    // Tips come from verified platform data: the help center entry point and
    // the around-the-clock human contact route.
    await expect(page.locator(".kit-tips li").first()).toContainText(
      "help.doordash.com",
    );
    await expect(page.locator(".kit-tips li").nth(1)).toContainText("24/7");
  });

  test("AG card lists fields under exact form labels, linked to the real form", async ({
    page,
  }) => {
    await page.goto(`${BASE}/dev/kit`);

    await openAgList(page);
    const labels = page.locator(".kit-ag-label-en");
    // count() does not wait; let the island hydrate first.
    await expect(labels.first()).toBeVisible();
    const count = await labels.count();
    expect(count).toBeGreaterThan(5);

    // Every rendered label is one the AG form actually uses (the form
    // repeats several labels; exact ordering is covered by the unit tests).
    const formLabels = new Set(agFormFields.map((field) => field.label));
    for (let index = 0; index < count; index += 1) {
      const label = (await labels.nth(index).textContent())?.trim() ?? "";
      expect(formLabels.has(label)).toBe(true);
    }
    await expect(labels.first()).toHaveText("First Name");
    await expect(page.getByText("Complaint description")).toBeVisible();

    const form = page.getByRole("link", { name: "Open the AG form" }).first();
    await expect(form).toHaveAttribute("href", agFormFacts.formUrl);
    await expect(form).toHaveAttribute("target", "_blank");
    await expect(form).toHaveAttribute("rel", "noopener noreferrer");

    // Upload guidance comes from the verified form facts.
    await expect(
      page.getByText(
        "You can attach up to 5 files (pdf, doc, docx, xls, xlsx), each under 4 MB.",
      ),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Go to the evidence tool" }),
    ).toHaveAttribute("href", "#kit-evidence");

    // English page carries no mail-in note.
    await expect(page.locator(".kit-mailin")).toHaveCount(0);
  });

  test("Spanish page links the AG mail-in form; English does not", async ({
    page,
  }) => {
    await page.goto(`${BASE}/dev/kit?ui=es`);
    const mailIn = page.locator(".kit-mailin a");
    await expect(mailIn).toHaveAttribute(
      "href",
      destinationUrl("ca-ag-complaint-form-pdf-es"),
    );
    await expect(mailIn).toHaveAttribute("rel", "noopener noreferrer");
    await expect(page.getByText("Como mínimo, te deben")).toContainText(
      "18,25",
    );
  });

  test("more ways to act starts collapsed and expands to three routes", async ({
    page,
  }) => {
    await page.goto(`${BASE}/dev/kit`);

    const more = page.locator("details.kit-more");
    await expect(more).not.toHaveAttribute("open", "");
    await expect(
      page.getByRole("link", {
        name: "Find your district attorney or city attorney",
      }),
    ).toBeHidden();

    // Both halves of Save a record exist; the print dialog itself is not
    // assertable headlessly.
    await expect(
      page.getByRole("button", { name: "Print this kit" }),
    ).toBeVisible();

    await more.locator("summary").click();
    await expect(more).toHaveAttribute("open", "");
    await expect(
      page.getByRole("link", {
        name: "Find your district attorney or city attorney",
      }),
    ).toHaveAttribute("href", destinationUrl("cdaa-da-roster"));
    await expect(
      page.getByRole("link", { name: "Report to the FTC" }),
    ).toHaveAttribute("href", destinationUrl("ftc-reportfraud"));
    await expect(
      page.getByRole("link", {
        name: "Take the platform to small claims court",
      }),
    ).toHaveAttribute("href", destinationUrl("ca-courts-small-claims"));

    // The printable demand letter rides along, with its own copy button.
    await expect(
      page.getByRole("heading", { name: "Printable demand letter" }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Copy Printable demand letter" }),
    ).toBeVisible();
  });

  test("downloads a dated plain-text record of the whole kit", async ({
    page,
  }) => {
    await page.goto(`${BASE}/dev/kit`);

    const [download] = await Promise.all([
      page.waitForEvent("download"),
      page.getByRole("button", { name: "Download the record" }).click(),
    ]);
    expect(download.suggestedFilename()).toMatch(
      /^ab578-complaint-kit-\d{4}-\d{2}-\d{2}\.txt$/,
    );

    const path = await download.path();
    expect(path).toBeTruthy();
    const record = readFileSync(path as string, "utf8");
    expect(record).toContain("Saved on ");
    expect(record).toContain("§ 22599.2");
    expect(record).toContain(agFormFacts.formUrl);
    expect(record).toContain("Not legal advice");
    expect(record.includes("\u2014")).toBe(false);
  });

  test("falls back to a selected textarea when the clipboard API is missing", async ({
    browser,
  }) => {
    test.skip(
      browser.browserType().name() !== "chromium",
      "focus and selection checks are Chromium-deterministic",
    );
    const context = await browser.newContext();
    await context.addInitScript(() => {
      Object.defineProperty(navigator, "clipboard", {
        get: () => undefined,
        configurable: true,
      });
    });
    const page = await context.newPage();
    await page.goto(`${BASE}/dev/kit`);

    const short = page.locator(".kit-message").first().locator(".kit-outgoing");
    const outgoing = (await short.textContent())?.trim() ?? "";

    await page
      .getByRole("button", { name: "Copy Short version, for chat" })
      .click();

    await expect(
      page.getByRole("heading", { name: "Copy manually" }),
    ).toBeVisible();
    const area = page.locator(".kit-manual-text");
    await expect(area).toHaveValue(outgoing);
    const selection = await area.evaluate((node: HTMLTextAreaElement) => ({
      start: node.selectionStart,
      end: node.selectionEnd,
      focused: document.activeElement === node,
    }));
    expect(selection.start).toBe(0);
    expect(selection.end).toBe(outgoing.length);
    expect(selection.focused).toBe(true);
    await context.close();
  });
});

test.describe("kit screen: outgoing language", () => {
  test.use({ permissions: ["clipboard-read", "clipboard-write"] });

  test("toggle swaps the outgoing text; copies never carry the translation", async ({
    page,
    browser,
  }) => {
    test.skip(
      browser.browserType().name() !== "chromium",
      "clipboard readback needs Chromium",
    );
    await page.goto(`${BASE}/dev/kit?ui=es&translate=1`);

    await expect(page.locator("html")).toHaveAttribute("lang", "es");
    // Argued asks link to the localized About anchor.
    await expect(
      page.getByRole("link", { name: "¿Por qué?" }).first(),
    ).toHaveAttribute("href", `${BASE}/es/about#california-law`);

    const kit = page.locator("article.kit");
    const short = page.locator(".kit-message").first().locator(".kit-outgoing");
    const copyShort = page.getByRole("button", {
      name: "Copiar Versión corta, para el chat",
    });

    // Default: outgoing is the English text; the translation stays visible
    // beside it but never on the clipboard.
    await expect(kit).toHaveAttribute("data-send-in-ui", "false");
    const englishOutgoing = (await short.textContent())?.trim() ?? "";
    expect(englishOutgoing).not.toContain("[es]");
    await expect(
      page.locator(".kit-message").first().locator(".kit-translation"),
    ).toContainText("[es]");

    await copyShort.click();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
      englishOutgoing,
    );

    // Toggle to Spanish: the translation becomes the outgoing text.
    await page.getByRole("button", { name: "Enviar en Español" }).click();
    await expect(kit).toHaveAttribute("data-send-in-ui", "true");
    const spanishOutgoing = (await short.textContent())?.trim() ?? "";
    expect(spanishOutgoing).toContain("[es]");
    await copyShort.click();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
      spanishOutgoing,
    );

    // Toggle label now offers the way back.
    await expect(
      page.getByRole("button", { name: "Enviar en inglés" }),
    ).toBeVisible();

    // AG answers copy their outgoing value too, under the exact form label.
    await openAgList(page);
    const description = page
      .locator(".kit-ag-field", { hasText: "Complaint description" })
      .first()
      .locator(".kit-ag-value");
    const descriptionOutgoing = (await description.textContent())?.trim() ?? "";
    await page
      .getByRole("button", { name: "Copiar Complaint description" })
      .click();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
      descriptionOutgoing,
    );
  });

  test("hides the toggle when there is nothing to translate", async ({
    page,
  }) => {
    await page.goto(`${BASE}/dev/kit`);
    await expect(page.getByRole("button", { name: /Send in/ })).toHaveCount(0);
  });
});

test.describe("kit screen: accessibility and narrow layout", () => {
  for (const variant of [
    {
      name: "en",
      url: `${BASE}/dev/kit`,
      heading: "Report to the California Attorney General",
    },
    {
      name: "es with translations",
      url: `${BASE}/dev/kit?ui=es&translate=1`,
      heading: "Reporta al Fiscal General de California",
    },
    {
      name: "zh-hant with CJK stress strings",
      url: `${BASE}/dev/kit?ui=zh-hant&translate=1&stress=1`,
      heading: "向加州州檢察長檢舉",
    },
  ]) {
    test(`passes axe and fits 320 px: ${variant.name}`, async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 600 });
      await page.goto(variant.url);
      await expect(
        page.getByRole("heading", { name: variant.heading }),
      ).toBeVisible();

      // Long strings and CJK text must not push the page wider than 320 px.
      const scrollWidth = await page.evaluate(
        () => document.scrollingElement?.scrollWidth ?? 0,
      );
      expect(scrollWidth).toBeLessThanOrEqual(320);

      const results = await new AxeBuilder({ page }).analyze();
      expect(results.violations.map((violation) => violation.id)).toEqual([]);
    });
  }
});
