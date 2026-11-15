// @ts-check
import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";

// The site is served from the custom domain https://ab578.com at the root.
// SITE_URL is the origin only; BASE_PATH is the deploy base. Override both to
// serve from a GitHub Pages project URL instead (for example
// SITE_URL=https://<owner>.github.io BASE_PATH=/ab578).
const SITE_URL = process.env.SITE_URL ?? "https://ab578.com";
const BASE_PATH = process.env.BASE_PATH ?? "/";

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  output: "static",
  integrations: [preact()],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es", "zh-hant", "zh-hans", "tl", "vi", "ko"],
    routing: { prefixDefaultLocale: false },
  },
  // Astro injects a strict CSP meta tag with content hashes for every
  // bundled script and stylesheet. strict-dynamic lets hydrated islands load
  // without allowing third-party origins or 'unsafe-inline'.
  security: {
    csp: {
      algorithm: "SHA-256",
      directives: [
        "default-src 'self'",
        "img-src 'self' data: blob:",
        "connect-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
      ],
      scriptDirective: { resources: ["'self'"], strictDynamic: true },
      styleDirective: { resources: ["'self'"] },
    },
  },
  // Keep stylesheets external so CSP style-src stays simple.
  build: { inlineStylesheets: "never" },
});
