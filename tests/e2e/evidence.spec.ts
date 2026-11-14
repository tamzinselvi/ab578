import { readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";
import {
  noisePaint,
  pngFixture,
  receiptPaint,
  solidPaint,
} from "./helpers/png";

const BASE = process.env.BASE_PATH ?? "/ab578";
const ORIGIN = "http://127.0.0.1:4321";
const FOUR_MB = 4 * 1024 * 1024;

const fixtures = [
  {
    name: "order-receipt.png",
    mimeType: "image/png" as const,
    buffer: () => pngFixture(1170, 2532, receiptPaint(1170)),
  },
  {
    name: "chat-support.png",
    mimeType: "image/png" as const,
    buffer: () => pngFixture(1080, 2340, noisePaint(7, [40, 60, 90], 120)),
  },
  {
    name: "photo-food.png",
    mimeType: "image/png" as const,
    buffer: () => pngFixture(1600, 1200, noisePaint(23, [120, 80, 50], 160)),
  },
];

test("builds one PDF from screenshots with CJK captions, fully offline", async ({
  page,
}) => {
  const requests: string[] = [];
  page.on("request", (request) => requests.push(request.url()));

  await page.goto(`${BASE}/dev/evidence`);

  await page.getByLabel("Add screenshots").setInputFiles(
    fixtures.map((fixture) => ({
      name: fixture.name,
      mimeType: fixture.mimeType,
      buffer: fixture.buffer(),
    })),
  );

  await expect(page.locator("[data-evidence-count]")).toHaveAttribute(
    "data-evidence-count",
    "3",
  );

  await page
    .getByLabel("Caption for order-receipt.png")
    .fill("Receipt: order 123, two wrong items");
  await page
    .getByLabel("Caption for chat-support.png")
    .fill("订单截图：客服只提供了积分补偿");
  await page
    .getByLabel("Caption for photo-food.png")
    .fill("주문 내역 누락 항목");

  // Reorder: move the chat screenshot to the front and see the list change.
  await page.getByLabel("Move chat-support.png earlier").click();
  await expect(page.getByLabel("Move chat-support.png earlier")).toBeDisabled();
  await expect(page.locator(".evidence-item-name").first()).toHaveText(
    "chat-support.png",
  );

  const buildStartedAt = requests.length;
  await page.getByRole("button", { name: "Build the PDF" }).click();
  const result = page.locator("[data-evidence-pages]");
  await expect(result).toHaveAttribute("data-evidence-pages", "3");

  // Final size is shown and lands under the 4 MB upload limit.
  const bytes = Number(
    await page
      .locator("[data-evidence-bytes]")
      .getAttribute("data-evidence-bytes"),
  );
  expect(bytes).toBeGreaterThan(100_000);
  expect(bytes).toBeLessThan(FOUR_MB);
  await expect(page.locator("[data-evidence-bytes]")).toContainText(
    /File size: [\d.]+ (KB|MB)/,
  );

  // Descriptive filename on the download offer.
  const downloadName = await page
    .getByRole("link", { name: /Download doordash-/ })
    .getAttribute("download");
  expect(downloadName).toMatch(/^doordash-\d{4}-\d{2}-\d{2}-evidence\.pdf$/);

  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.getByRole("link", { name: /Download doordash-/ }).click(),
  ]);
  expect(download.suggestedFilename()).toBe(downloadName);

  // The downloaded file is a real PDF with one page per image.
  const downloadPath = await download.path();
  expect(downloadPath).toBeTruthy();
  const pdf = readFileSync(downloadPath as string);
  expect(pdf.subarray(0, 5).toString("latin1")).toBe("%PDF-");
  expect(pdf.length).toBeLessThan(FOUR_MB);
  const pageObjects = pdf.toString("latin1").match(/\/Type\s*\/Page(?![s])/g);
  expect(pageObjects?.length).toBe(3);

  // No network use beyond same-origin assets (the lazy pdf-lib chunk may be
  // fetched right after the click); nothing leaves the device. blob: and
  // data: loads are device-local and never reach the network.
  const duringBuild = requests.slice(buildStartedAt);
  for (const url of duringBuild) {
    expect(url.startsWith(ORIGIN)).toBe(true);
  }
  const external = requests.filter(
    (url) => !url.startsWith(ORIGIN) && !url.startsWith("blob:"),
  );
  expect(external).toEqual([]);
});

test("draws Chinese and Korean captions onto the image with system fonts", async ({
  page,
}) => {
  await page.goto(`${BASE}/dev/evidence`);
  const whitePng = pngFixture(800, 400, solidPaint([255, 255, 255]));

  const report = await page.evaluate(async (pngBase64) => {
    const hook = window.__evidenceDebug;
    if (!hook) {
      return { error: "debug hook missing", dark: 0, light: 0 };
    }
    const bytes = Uint8Array.from(atob(pngBase64), (char) =>
      char.charCodeAt(0),
    );
    const file = new File([bytes], "caption-check.png", {
      type: "image/png",
    });
    const image = await hook.decodeImageFile(file);
    const rendered = await hook.renderEvidenceJpeg(
      image,
      "订单截图 주문 내역",
      800,
      0.8,
    );
    const url = URL.createObjectURL(rendered.blob);
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const element = new Image();
      element.onload = () => resolve(element);
      element.onerror = () => reject(new Error("JPEG decode failed"));
      element.src = url;
    });
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return { error: "canvas 2d unavailable", dark: 0, light: 0 };
    ctx.drawImage(img, 0, 0);
    const bandTop = Math.round(img.height * 0.8);
    const data = ctx.getImageData(
      0,
      bandTop,
      img.width,
      img.height - bandTop,
    ).data;
    let dark = 0;
    let light = 0;
    for (let i = 0; i < data.length; i += 4) {
      const luma = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
      if (luma < 70) dark += 1;
      else if (luma > 200) light += 1;
    }
    URL.revokeObjectURL(url);
    return { error: undefined as string | undefined, dark, light };
  }, whitePng.toString("base64"));

  // The white fixture's bottom fifth is a dark caption band carrying light
  // glyph pixels: proves both scripts were drawn onto the image.
  expect(report.error).toBeUndefined();
  expect(report.dark).toBeGreaterThan(30_000);
  expect(report.light).toBeGreaterThan(200);
});
