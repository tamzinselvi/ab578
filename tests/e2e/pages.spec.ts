import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import type { Page } from "@playwright/test";

const BASE = process.env.BASE_PATH ?? "/ab578";

async function expectNoA11yViolations(page: Page) {
  const results = await new AxeBuilder({ page }).analyze();
  // Fail with the rule ids so the report names the problem.
  expect(results.violations.map((violation) => violation.id)).toEqual([]);
}

test("home page shows the hero and primary actions", async ({ page }) => {
  await page.goto(`${BASE}/`);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Get your delivery order money back",
  );
  await expect(
    page.getByRole("link", { name: "File a complaint →" }),
  ).toHaveAttribute("href", `${BASE}/file`);
  const how = page.getByRole("link", { name: "How?", exact: true });
  await expect(how).toHaveAttribute("href", `${BASE}/about`);
  await expect(page.getByRole("contentinfo")).toContainText(
    "Not legal advice. Not affiliated with the State of California or any delivery company.",
  );
  await expectNoA11yViolations(page);
});

test("file page shows the wizard shell placeholder", async ({ page }) => {
  await page.goto(`${BASE}/file`);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "File a complaint",
  );
  await expect(
    page.getByRole("link", { name: "Back to the home page" }),
  ).toHaveAttribute("href", `${BASE}/`);
  await expectNoA11yViolations(page);
});

test("about page shows its placeholder", async ({ page }) => {
  await page.goto(`${BASE}/about`);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "How this works",
  );
  await expectNoA11yViolations(page);
});

test("unknown paths get the 404 page", async ({ page }) => {
  const response = await page.goto(`${BASE}/no-such-page`);
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Page not found",
  );
  await expect(
    page.getByRole("link", { name: "Go to the home page", exact: true }),
  ).toHaveAttribute("href", `${BASE}/`);
  await expectNoA11yViolations(page);
});

test("locale routes render with their lang attribute", async ({ page }) => {
  await page.goto(`${BASE}/ko/`);
  await expect(page.locator("html")).toHaveAttribute("lang", "ko");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Get your delivery order money back",
  );
  await expect(page.getByRole("contentinfo")).toContainText(
    "Translated automatically. The English version is the official one.",
  );
});
