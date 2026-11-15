import { expect, test, type Locator, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { DEFAULT_LOCALE, localeList, type Locale } from "../../src/i18n/index";

const BASE = (process.env.BASE_PATH ?? "/").replace(/\/+$/, "");
const DRAFT_KEY = "ab578.wizard.draft";
const CONTACT_KEY = "ab578.wizard.contact";

function localePrefix(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? "" : `/${locale}`;
}

/** Keypad button by its accessible name ("1"..."0", ".", "Delete"). */
function key(page: Page, label: string): Locator {
  return page.getByRole("button", { name: label, exact: true });
}

/** The wizard only reacts after the island hydrates; the mount effect
 * normalizes the URL hash, so the hash is the cheapest hydration marker. */
async function waitForWizard(page: Page, step: string) {
  await page.waitForFunction(
    (expected) => window.location.hash === `#${expected}`,
    step,
    { timeout: 10_000 },
  );
}

/**
 * Runs the happy path with the on-screen keypad for the total and counts
 * every discrete user action (each keypad tap included).
 */
async function runHappyPath(page: Page, prefix: string): Promise<number> {
  let interactions = 0;
  const tap = async (locator: Locator) => {
    interactions += 1;
    await locator.click();
  };

  await page.goto(`${BASE}${prefix}/`);
  await tap(page.locator("main a.button[href$='/file']"));
  await waitForWizard(page, "issues");

  await tap(page.locator("#issue-wrong_items"));
  await tap(page.locator(".wizard .button")); // Next

  await tap(page.locator("button.wizard-option", { hasText: "DoorDash" }));
  await waitForWizard(page, "details"); // the tap auto-advanced

  for (const label of ["1", "2", ".", "9", "9"]) {
    await tap(key(page, label));
  }
  await expect(page.locator("#order-total")).toHaveValue("12.99");

  await tap(page.locator(".wizard .button")); // Continue
  await waitForWizard(page, "kit");

  await expect(page.locator(".wizard-contact")).toBeVisible();
  await expect(page.locator("article.kit")).toBeVisible();
  return interactions;
}

for (const locale of localeList) {
  test(`happy path reaches a finished kit in at most 10 interactions (${locale})`, async ({
    page,
  }) => {
    const interactions = await runHappyPath(page, localePrefix(locale));
    expect(interactions).toBeLessThanOrEqual(10);
    // The answers survived to the kit: the draft is on disk with them.
    const draft = await page.evaluate(
      (key) => localStorage.getItem(key),
      DRAFT_KEY,
    );
    expect(draft).toContain("wrong_items");
    expect(draft).toContain("12.99");
  });
}

test("the keypad total renders through the locale money formatter", async ({
  page,
}) => {
  await page.goto(`${BASE}/file`);
  await waitForWizard(page, "issues");
  await page.locator("#issue-wrong_items").click();
  await page.locator(".wizard .button").click();
  await waitForWizard(page, "platform");
  await page.locator("button.wizard-option", { hasText: "DoorDash" }).click();
  await waitForWizard(page, "details");

  await expect(page.locator("#order-total-hint")).toHaveText(
    "Numbers only, like 24.50",
  );
  for (const label of ["1", "2", ".", "9", "9"]) {
    await key(page, label).click();
  }
  await expect(page.locator("#order-total-hint")).toHaveText("$12.99");
});

test("hash follows the steps, and browser back and forward keep every answer", async ({
  page,
}) => {
  await page.goto(`${BASE}/file`);
  await waitForWizard(page, "issues");

  await page.locator("#issue-missing_items").click();
  await page.locator(".wizard .button").click();
  await waitForWizard(page, "platform");
  await expect(page).toHaveURL(/#platform$/);

  await page.locator("button.wizard-option", { hasText: "Uber Eats" }).click();
  await waitForWizard(page, "details");

  await key(page, "8").click();
  await key(page, "4").click();
  await expect(page.locator("#order-total")).toHaveValue("84");

  await page.goBack();
  await waitForWizard(page, "platform");
  await expect(
    page.locator("button.wizard-option", { hasText: "Uber Eats" }),
  ).toHaveAttribute("data-selected", "true");

  await page.goForward();
  await waitForWizard(page, "details");
  await expect(page.locator("#order-total")).toHaveValue("84");
  // The issue answer from step 1 lives on in the autosaved draft.
  const draft = await page.evaluate(
    (key) => localStorage.getItem(key),
    DRAFT_KEY,
  );
  expect(draft).toContain("missing_items");
});

test("entry link ?platform=doordash preselects the app", async ({ page }) => {
  await page.goto(`${BASE}/file?platform=doordash`);
  await waitForWizard(page, "issues");

  await page.locator("#issue-not_delivered").click();
  await page.locator(".wizard .button").click();
  await waitForWizard(page, "platform");

  await expect(
    page.locator("button.wizard-option", { hasText: "DoorDash" }),
  ).toHaveAttribute("data-selected", "true");
});

test("draft autosaves and comes back after a reload", async ({ page }) => {
  await page.goto(`${BASE}/file`);
  await waitForWizard(page, "issues");

  await page.locator("#issue-credits_only").click();
  await page.locator(".wizard .button").click();
  await waitForWizard(page, "platform");
  await page.locator("button.wizard-option", { hasText: "Grubhub" }).click();
  await waitForWizard(page, "details");

  await page.reload();
  await waitForWizard(page, "details");
  await expect(page.getByText("Welcome back")).toBeVisible();
  const draft = await page.evaluate(
    (key) => localStorage.getItem(key),
    DRAFT_KEY,
  );
  expect(draft).toContain("grubhub");
  expect(draft).toContain("credits_only");

  await page.locator(".wizard-footer .wizard-link").first().click();
  await waitForWizard(page, "platform");
  await expect(
    page.locator("button.wizard-option", { hasText: "Grubhub" }),
  ).toHaveAttribute("data-selected", "true");
});

for (const prefix of ["", "/es"]) {
  test(`a fresh visit starts at issues with saved answers (${prefix || "en"})`, async ({
    page,
  }) => {
    await runHappyPath(page, prefix);
    await page.reload();
    await waitForWizard(page, "kit");
    await expect(page.locator("article.kit")).toBeVisible();

    await page.goto(`${BASE}${prefix}/file`);
    await waitForWizard(page, "issues");
    await expect(page.locator("#issue-wrong_items")).toBeChecked();
    await expect(page.locator(".wizard-note").last()).toBeVisible();
    await page
      .locator(".wizard-progress li")
      .nth(2)
      .getByRole("button")
      .click();
    await waitForWizard(page, "details");
    await expect(page.locator("#order-total")).toHaveValue("12.99");
  });
}

test("progress steps validate current answers and preserve focus and history", async ({
  page,
}) => {
  await page.goto(`${BASE}/file`);
  await waitForWizard(page, "issues");
  const steps = page.locator(".wizard-progress li");
  await expect(steps.nth(1).getByRole("button")).toHaveCount(0);
  await expect(steps.nth(2).getByRole("button")).toHaveCount(0);
  await page.locator("#issue-wrong_items").check();
  await steps.nth(1).getByRole("button").click();
  await waitForWizard(page, "platform");
  await expect(page.locator("#wizard-heading")).toBeFocused();
  await page
    .locator("button.wizard-option", { hasText: "Another app" })
    .click();
  await expect(steps.nth(2).getByRole("button")).toHaveCount(0);
  await page.locator("#other-platform-name").fill("ChowNow");
  await steps.nth(2).getByRole("button").click();
  await waitForWizard(page, "details");
  await expect(steps.nth(3).getByRole("button")).toHaveCount(0);
  await page.locator("#order-total").fill("25");
  await page.locator("#order-date").fill("");
  await expect(steps.nth(3).getByRole("button")).toHaveCount(0);
  await page.locator("#order-date").fill("2026-01-01");
  await page.locator(".wizard-optional summary").click();
  await page.locator(".wizard-check input").check();
  await expect(steps.nth(3).getByRole("button")).toHaveCount(0);
  await page.locator("#contacted-result").fill("No refund");
  await steps.nth(3).getByRole("button").click();
  await waitForWizard(page, "kit");
  await expect(page.locator("#wizard-heading")).toBeFocused();
  await steps.nth(0).getByRole("button").click();
  await waitForWizard(page, "issues");
  await expect(page.locator("#issue-wrong_items")).toBeChecked();
  await page.locator("#issue-wrong_items").uncheck();
  await expect(steps.nth(3).getByRole("button")).toHaveCount(0);
  await page.goBack();
  await waitForWizard(page, "kit");
  await steps.nth(2).getByRole("button").click();
  await waitForWizard(page, "details");
  await expect(page.locator("#order-total")).toHaveValue("25");
  await expect(page.locator("#contacted-result")).toHaveValue("No refund");
});

test("switching language mid-wizard keeps every answer", async ({ page }) => {
  await page.goto(`${BASE}/file`);
  await waitForWizard(page, "issues");

  await page.locator("#issue-missing_items").click();
  await page.locator(".wizard .button").click();
  await waitForWizard(page, "platform");
  await page.locator("button.wizard-option", { hasText: "DoorDash" }).click();
  await waitForWizard(page, "details");
  await key(page, "2").click();
  await key(page, "0").click();

  // The header picker keeps the current page and switches locale.
  await page.locator(".language-picker a[href$='/es/file']").click();
  await waitForWizard(page, "issues");
  await expect(page.locator("#issue-missing_items")).toBeChecked();
  await page.locator(".wizard-progress li").nth(2).getByRole("button").click();
  await waitForWizard(page, "details");
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  await expect(page.locator("#order-total")).toHaveValue("20");

  // The issue answer is still there, two steps back.
  await page.locator(".wizard-footer .wizard-link").first().click();
  await waitForWizard(page, "platform");
  await page.locator(".wizard-footer .wizard-link").first().click();
  await waitForWizard(page, "issues");
  await expect(page.locator("#issue-missing_items")).toBeChecked();
});

test("contact info stays out of localStorage until Remember is checked", async ({
  page,
}) => {
  await page.goto(`${BASE}/file`);
  await waitForWizard(page, "issues");
  await page.locator("#issue-refund_denied").click();
  await page.locator(".wizard .button").click();
  await waitForWizard(page, "platform");
  await page.locator("button.wizard-option", { hasText: "DoorDash" }).click();
  await waitForWizard(page, "details");
  await key(page, "1").click();
  await key(page, "5").click();
  await page.locator(".wizard .button").click();
  await waitForWizard(page, "kit");

  await page.locator("#contact-first").fill("Dana");
  await page.locator("#contact-last").fill("Moreno");
  await page.locator("#contact-street").fill("123 Palm Ave");
  await page.locator("#contact-city").fill("Fresno");
  await page.locator("#contact-zip").fill("93701");
  // Remember stays unchecked.
  await page.locator(".wizard-contact button[type='submit']").click();

  await expect(
    page.getByRole("status").filter({ hasText: "Your contact details" }),
  ).toContainText("Your contact details are in the kit.");
  // The kit itself now carries the name, proving the regen used contact info.
  await expect(page.locator("article.kit")).toContainText("Dana");

  const stored = await page.evaluate(() => JSON.stringify(localStorage));
  expect(stored).not.toContain("Dana");
  expect(stored).not.toContain(CONTACT_KEY);

  // Opting in writes only the contact key; the draft stays contact-free.
  await page.locator(".wizard-check input").check();
  await page.locator(".wizard-contact button[type='submit']").click();
  const savedContact = await page.evaluate(
    (key) => localStorage.getItem(key),
    CONTACT_KEY,
  );
  expect(savedContact).toContain("Dana");
  const savedDraft = await page.evaluate(
    (key) => localStorage.getItem(key),
    DRAFT_KEY,
  );
  expect(savedDraft).not.toContain("Dana");

  // Clear my data removes answers, contact and the language choice.
  await page.evaluate(() => localStorage.setItem("ab578.lang", "vi"));
  await page.locator(".wizard-footer .wizard-link").nth(1).click();
  await waitForWizard(page, "issues");
  expect(await page.evaluate(() => Object.keys(localStorage))).toEqual([]);
  await expect(page.locator("#issue-refund_denied")).not.toBeChecked();
});

test("axe reports zero violations on every wizard step", async ({ page }) => {
  await page.goto(`${BASE}/file`);

  // Step 1, with a selection made.
  await waitForWizard(page, "issues");
  await page.locator("#issue-unusable_items").click();
  await stepIsClean(page, "issues");
  await page.locator(".wizard .button").click();

  // Step 2, as reached.
  await waitForWizard(page, "platform");
  await stepIsClean(page, "platform");
  await page.locator("button.wizard-option", { hasText: "DoorDash" }).click();

  // Step 3, with the optional fold-out, contact sub-form and total filled.
  await waitForWizard(page, "details");
  await page.locator(".wizard-optional summary").click();
  await page.locator(".wizard-check input").check();
  await page.locator("#contacted-result").fill("They offered app credit.");
  await key(page, "9").click();
  await stepIsClean(page, "details");
  await page.locator(".wizard .button").click();

  // Step 4, the finished kit with its contact panel.
  await waitForWizard(page, "kit");
  await stepIsClean(page, "kit");
});

async function stepIsClean(page: Page, step: string) {
  const results = await new AxeBuilder({ page }).analyze();
  expect(
    results.violations.map((violation) => violation.id),
    `axe violations on ${step}`,
  ).toEqual([]);
}

test("validation errors are announced and block progress", async ({ page }) => {
  await page.goto(`${BASE}/file`);
  await waitForWizard(page, "issues");

  // No issue chosen yet.
  await page.locator(".wizard .button").click();
  await expect(page.locator(".field-error")).toContainText(
    "Choose at least one",
  );
  await expect(page.locator("#issue-not_delivered")).toBeFocused();

  await page.locator("#issue-not_delivered").click();
  await page.locator(".wizard .button").click();
  await waitForWizard(page, "platform");

  // Other with no name.
  await page
    .locator("button.wizard-option", { hasText: "Another app" })
    .click();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(page.locator(".field-error")).toContainText(
    "Type the app's name",
  );
  await expect(page.locator("#other-platform-name")).toBeFocused();

  await page.locator("#other-platform-name").fill("ChowNow");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await waitForWizard(page, "details");

  // No total yet.
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(page.locator(".field-error")).toContainText(
    "Enter the order total",
  );
  await expect(page.locator("#order-total")).toBeFocused();
});

test("the no-JS fallback links straight to the AG form", async ({
  request,
}) => {
  const response = await request.get(`${BASE}/file`);
  const html = await response.text();
  expect(html).toContain("The wizard needs JavaScript");
  expect(html).toContain(
    "https://oag.ca.gov/contact/consumer-complaint-against-business-or-company",
  );
});
