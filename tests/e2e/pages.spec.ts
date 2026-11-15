import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import type { Page } from "@playwright/test";

const BASE = (process.env.BASE_PATH ?? "/").replace(/\/+$/, "");
// Must match astro.config.mjs: CI builds with the real owner origin.
const SITE = process.env.SITE_URL ?? "https://ab578.com";

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

test("file page opens the wizard at the first question", async ({ page }) => {
  await page.goto(`${BASE}/file`);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "What went wrong?",
  );
  await expect(
    page.getByRole("checkbox", { name: "It never arrived" }),
  ).toBeVisible();
  await expectNoA11yViolations(page);
});

test("about page carries the approved sections, story and disclaimer", async ({
  page,
}) => {
  await page.goto(`${BASE}/about`);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("About");
  const headings = page.getByRole("heading", { level: 2 });
  await expect(headings).toHaveText([
    "How it works",
    "Why we ask for a full refund",
    "California law is on your side",
    "Why the complaint matters",
    "Why did you build this?",
  ]);
  for (const anchor of ["how", "why", "california-law", "story"]) {
    await expect(page.locator(`#${anchor}`)).toBeAttached();
  }
  await expect(
    page.getByText(
      "Not legal advice. We're not affiliated with the State of California, DoorDash, Uber Eats, Grubhub or any other company.",
    ),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "File a complaint →" }),
  ).toHaveAttribute("href", `${BASE}/file`);
  await expectNoA11yViolations(page);
});

test("faq answers the seven questions and links the full-refund one", async ({
  page,
}) => {
  await page.goto(`${BASE}/faq`);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("FAQ");
  await expect(page.getByRole("heading", { level: 2 })).toHaveCount(7);
  await expect(
    page.getByRole("link", { name: "Why we ask for a full refund" }),
  ).toHaveAttribute("href", `${BASE}/about#why`);
  await expect(
    page.getByText("the app can't take it back out of the driver's pay"),
  ).toBeVisible();
  await expectNoA11yViolations(page);
});

test("privacy page keeps everything on the device", async ({ page }) => {
  await page.goto(`${BASE}/privacy`);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Privacy");
  await expect(
    page.getByText("Nothing you type leaves your device."),
  ).toBeVisible();
  await expectNoA11yViolations(page);
});

test("platform page pulls support info from the verified data", async ({
  page,
}) => {
  await page.goto(`${BASE}/doordash`);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Get your DoorDash money back",
  );
  const support = page.getByRole("link", { name: "Open DoorDash support" });
  await expect(support).toHaveAttribute(
    "href",
    "https://help.doordash.com/en-us/consumers",
  );
  await expect(support).toHaveAttribute("rel", "noopener noreferrer");
  await expect(support).toHaveAttribute("target", "_blank");
  await expect(page.getByText("855-431-0459").first()).toBeVisible();
  await expect(
    page.getByRole("link", { name: "File a complaint →" }),
  ).toHaveAttribute("href", `${BASE}/file?platform=doordash`);
  await expectNoA11yViolations(page);
});

test("footer links about, faq and privacy", async ({ page }) => {
  await page.goto(`${BASE}/`);
  const nav = page.locator("footer nav");
  await expect(nav.getByRole("link", { name: "About" })).toHaveAttribute(
    "href",
    `${BASE}/about`,
  );
  await expect(nav.getByRole("link", { name: "FAQ" })).toHaveAttribute(
    "href",
    `${BASE}/faq`,
  );
  await expect(nav.getByRole("link", { name: "Privacy" })).toHaveAttribute(
    "href",
    `${BASE}/privacy`,
  );
});

test("localized content routes render translated", async ({ page }) => {
  await page.goto(`${BASE}/es/faq`);
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Preguntas frecuentes",
  );
  await expect(page.getByRole("contentinfo")).toContainText(
    "Traducido automáticamente. La versión en inglés es la oficial.",
  );
  await expectNoA11yViolations(page);
});

test("seo meta: descriptions, og images, canonical and hreflang", async ({
  page,
}) => {
  await page.goto(`${BASE}/`);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    "File a food delivery refund complaint under California AB 578 in about a minute. Free, private, no account.",
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    /\/og\/home\.png$/,
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    new RegExp(`${BASE}/?$`),
  );
  await page.goto(`${BASE}/about`);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    /\/og\/about\.png$/,
  );
  await expect(
    page.locator('link[rel="alternate"][hreflang="es"]'),
  ).toHaveAttribute("href", `${SITE}${BASE}/es/about`);
});
test("sitemap covers every locale and content page", async ({ page }) => {
  const response = await page.goto(`${BASE}/sitemap.xml`);
  expect(response?.status()).toBe(200);
  const body = await response?.text();
  for (const suffix of [
    "/about",
    "/faq",
    "/privacy",
    "/file",
    "/doordash",
    "/ubereats",
    "/grubhub",
  ]) {
    for (const prefix of [
      "",
      "/es",
      "/zh-hant",
      "/zh-hans",
      "/tl",
      "/vi",
      "/ko",
    ]) {
      expect(body).toContain(`<loc>${SITE}${BASE}${prefix}${suffix}</loc>`);
    }
  }
});

test("robots.txt allows crawlers and points at the sitemap", async ({
  page,
}) => {
  const response = await page.goto(`${BASE}/robots.txt`);
  expect(response?.status()).toBe(200);
  const body = await response?.text();
  expect(body).toContain("User-agent: *");
  expect(body).toContain(`Sitemap: ${SITE}${BASE}/sitemap.xml`);
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
    "배달 주문 금액을 돌려받으세요",
  );
  await expect(page.getByRole("contentinfo")).toContainText(
    "기계 번역입니다. 영어판이 공식 버전입니다.",
  );
});
