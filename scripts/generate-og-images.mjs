// Generates the Open Graph images in public/og/ (1200x630 PNG) by rendering
// an HTML card in headless Chromium and screenshotting it. Playwright is
// already a devDependency for e2e, so no new packages are needed.
//
// Run with: node scripts/generate-og-images.mjs
// The PNGs are committed; rerun only when the copy or design changes.
import { mkdirSync } from "node:fs";
import { chromium } from "@playwright/test";

const OUT_DIR = new URL("../public/og/", import.meta.url);

const cards = [
  {
    file: "home.png",
    eyebrow: "AB 578 Complaint Kit",
    headline: "Get your delivery order money back",
    sub: "Demand the AG enforce AB 578. Free, private, about a minute.",
  },
  {
    file: "about.png",
    eyebrow: "AB 578 Complaint Kit",
    headline: "How this works, and why",
    sub: "Why we ask for a full refund, and what California law says delivery apps must do.",
  },
];

function cardHtml({ eyebrow, headline, sub }) {
  return `<!doctype html>
<html lang="en">
<head><meta charset="utf-8" />
<style>
  * { box-sizing: border-box; margin: 0; }
  html, body { width: 1200px; height: 630px; }
  body {
    display: flex; flex-direction: column; justify-content: center;
    padding: 72px 84px;
    background: #ffffff;
    color: #1c1c1e;
    font-family: system-ui, -apple-system, "Segoe UI", Roboto,
      "Helvetica Neue", Arial, sans-serif;
  }
  .bar { position: absolute; inset-inline-start: 0; inset-block: 0; width: 16px; background: #0b57d0; }
  .eyebrow {
    font-size: 30px; font-weight: 600; letter-spacing: 0.08em;
    text-transform: uppercase; color: #0b57d0; margin-bottom: 28px;
  }
  h1 { font-size: 88px; line-height: 1.08; font-weight: 800; letter-spacing: -0.01em; }
  .sub { margin-top: 30px; font-size: 36px; line-height: 1.35; color: #55575b; }
</style></head>
<body><div class="bar"></div>
  <div class="eyebrow">${eyebrow}</div>
  <h1>${headline}</h1>
  <p class="sub">${sub}</p>
</body></html>`;
}

mkdirSync(OUT_DIR, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1,
});
for (const card of cards) {
  await page.setContent(cardHtml(card), { waitUntil: "load" });
  const out = new URL(card.file, OUT_DIR).pathname;
  await page.screenshot({ path: out, type: "png" });
  console.log(`wrote ${out}`);
}
await browser.close();
