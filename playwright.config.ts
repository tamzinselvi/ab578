import { defineConfig } from "@playwright/test";

// BASE_PATH must match the Astro base used at build time ('/' for the custom
// domain, '/ab578' for a GitHub Pages project site). Normalized without a
// trailing slash so the root base is the empty string.
const BASE = (process.env.BASE_PATH ?? "/").replace(/\/+$/, "");
const HOST = "127.0.0.1";
const PORT = 4321;

export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"]],
  use: {
    baseURL: `http://${HOST}:${PORT}`,
    // Mobile-first: 390x844 phone viewport.
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  },
  webServer: {
    // --ignore-lock forces a foreground server (Astro otherwise daemonizes
    // preview when it detects an agent environment); --host pins IPv4 so
    // Chromium's localhost resolution cannot drift to ::1.
    command: `npm run build && npx astro preview --ignore-lock --host ${HOST}`,
    url: `http://${HOST}:${PORT}${BASE}/`,
    timeout: 240_000,
  },
  projects: [{ name: "chromium" }, { name: "webkit" }],
});
