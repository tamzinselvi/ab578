# ab578

A free static site that helps California residents turn a botched food
delivery order into a ready-to-send complaint in about a minute. It drafts the
refund demand a delivery platform must honor under California AB 578 and a
complaint for the California Attorney General. Everything runs in the
visitor's browser: no accounts, no backend, nothing sent anywhere.

Status: scaffold. Placeholder pages exist in all seven launch locales
(English, Spanish, Traditional and Simplified Chinese, Tagalog, Vietnamese,
Korean) with working language switching. The wizard, complaint engine and real
content arrive in later tasks.

## Local development

Requires Node 22.12 or newer and npm.

```sh
npm install
npm run dev        # dev server at http://localhost:4321/ab578/
```

Environment variables (all optional):

| Variable    | Default                   | Purpose                                          |
| ----------- | ------------------------- | ------------------------------------------------ |
| `SITE_URL`  | `https://owner.github.io` | Origin used for canonical and hreflang URLs      |
| `BASE_PATH` | `/ab578`                  | Deploy base. Use `/` when a custom domain is set |

## Tests and checks

```sh
npm test          # unit tests (Vitest)
npm run test:e2e  # e2e + axe (Playwright: Chromium and WebKit, 390x844)
npm run typecheck # astro check
npm run lint      # ESLint + Prettier
npm run check:copy  # translation parity + em dash checks
npm run build     # static build into dist/
```

The first e2e run needs browsers: `npx playwright install chromium webkit`
(add `--with-deps` on Linux). The e2e suite builds the site and serves
`dist/` via `astro preview`.

Copy checks:

- `npm run check:i18n` fails if a live locale catalog has keys but misses any
  key present in the English catalog. Empty catalogs are allowed while
  translations are pending; at runtime missing strings fall back to English.
- `npm run check:emdash` fails if any user-facing copy under `src/pages`,
  `src/i18n`, or `src/components` contains an em dash (U+2014), including the
  Chinese double dash. Use a comma, colon, or period instead. The arrow in
  "File a complaint →" is allowed.

## Deploy

GitHub Pages via GitHub Actions:

- Every pull request runs CI: typecheck, lint, copy checks, unit tests, build,
  then e2e with axe on Chromium and WebKit.
- Every push to `main` builds and publishes through
  `actions/deploy-pages` with least-privilege permissions.

One manual step, once, by the repository owner:

1. Settings → Pages → Source: **GitHub Actions**.

Moving to a custom domain later: set `BASE_PATH=/` (for example as a repository
variable or in the deploy workflow environment) and set `SITE_URL` to the
domain. No code changes needed.

## Adding a language

1. Add the locale code to `locales` in `astro.config.mjs` (Astro i18n
   routing) and to `locales` in `src/i18n/index.ts` with its label in its own
   script, BCP 47 tag, text direction, and `live` flag.
2. Create `src/i18n/<locale>.ts` exporting a `Partial<Messages>` catalog.
   Start it empty; English covers everything until the translation lands.
3. Teach `localeFromTag` in `src/i18n/suggest.ts` about the language if
   browser tags for it need special mapping.
4. Fill the catalog and keep it complete: a partially translated catalog fails
   `npm run check:i18n`. Follow the voice rules in the design doc, and never
   use em dashes.

Routes are generated from `src/pages/[locale]/`, so a new locale gets every
page automatically. The language picker, hreflang links, and the first-visit
suggestion pick the new locale up from the locale list.

## Project layout

```
src/
  components/   header, footer, language picker, suggestion island, page views
  i18n/         locale registry, catalogs, t() with English fallback, Intl helpers
  layouts/      base layout (skip link, lang/dir, hreflang, CSP via Astro config)
  pages/        routes; [locale]/ renders every non-English locale
  styles/       global mobile-first CSS, system fonts, logical properties
tests/
  unit/         Vitest unit tests
  e2e/          Playwright + axe smoke and language tests
scripts/        CI copy checks (translation parity, em dash)
.github/        ci.yml (pull requests), deploy.yml (Pages on main)
```

Not legal advice. Not affiliated with the State of California or any delivery
company.
