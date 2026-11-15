import { test, expect } from "@playwright/test";

const BASE = (process.env.BASE_PATH ?? "/").replace(/\/+$/, "");
const STORAGE_KEY = "ab578.lang";

test("switching language keeps the same page and survives a reload", async ({
  page,
}) => {
  await page.goto(`${BASE}/file`);
  await page.getByRole("link", { name: "Español" }).click();
  await expect(page).toHaveURL(new RegExp(`${BASE}/es/file/?(#.*)?$`));
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  expect(
    await page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY),
  ).toBe("es");

  await page.reload();
  await expect(page).toHaveURL(new RegExp(`${BASE}/es/file/?(#.*)?$`));
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "¿Qué salió mal?",
  );
});

test("first visit suggests a browser language without redirecting", async ({
  browser,
}) => {
  const context = await browser.newContext({ locale: "es-ES" });
  const page = await context.newPage();
  await page.goto(`${BASE}/`);
  await expect(page.getByText("Prefer Español?")).toBeVisible();
  // Suggests only: the visitor stays on the English page.
  await expect(page).toHaveURL(new RegExp(`${BASE}/?$`));

  await page.locator("aside.lang-suggest a[data-locale-link]").click();
  await expect(page).toHaveURL(new RegExp(`${BASE}/es/?$`));
  expect(
    await page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY),
  ).toBe("es");

  // The recorded choice suppresses the suggestion on the next visit.
  await page.goto(`${BASE}/`);
  await expect(page.getByText("Prefer Español?")).toHaveCount(0);
  await context.close();
});

test("dismissing the suggestion remembers the current language", async ({
  browser,
}) => {
  const context = await browser.newContext({ locale: "ko-KR" });
  const page = await context.newPage();
  await page.goto(`${BASE}/`);
  await expect(page.getByText(/한국어/).first()).toBeVisible();
  await page.getByRole("button", { name: "Dismiss" }).click();
  await expect(page.locator("aside.lang-suggest")).toHaveCount(0);
  expect(
    await page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY),
  ).toBe("en");
  await context.close();
});

test("home page loads with no console errors (CSP holds)", async ({
  page,
  browserName,
}) => {
  test.skip(
    browserName !== "chromium",
    "console message formats differ per engine",
  );
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(`pageerror: ${error}`));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`console: ${message.text()}`);
  });
  await page.goto(`${BASE}/`);
  await page.waitForLoadState("networkidle");
  expect(errors).toEqual([]);
});
