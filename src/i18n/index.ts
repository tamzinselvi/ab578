import { en, type Messages, type MessageKey } from "./en";
import { es } from "./es";
import { zhHant } from "./zh-hant";
import { zhHans } from "./zh-hans";
import { tl } from "./tl";
import { vi } from "./vi";
import { ko } from "./ko";

/** Site locales. The default locale (en) has no URL prefix. */
export type Locale = "en" | "es" | "zh-hant" | "zh-hans" | "tl" | "vi" | "ko";

export interface LocaleMeta {
  /** Language name in its own script, shown in the language picker. */
  label: string;
  /** BCP 47 tag for lang attributes, hreflang, and Intl. */
  htmlLang: string;
  /** Text direction. Every launch locale is ltr; the field exists for rtl locales later. */
  dir: "ltr" | "rtl";
  /** Whether the locale is live. Live locales must keep key parity with en (CI checks this). */
  live: boolean;
}

export const DEFAULT_LOCALE: Locale = "en";

export const locales: Record<Locale, LocaleMeta> = {
  en: { label: "English", htmlLang: "en", dir: "ltr", live: true },
  es: { label: "Español", htmlLang: "es", dir: "ltr", live: true },
  "zh-hant": { label: "繁體中文", htmlLang: "zh-Hant", dir: "ltr", live: true },
  "zh-hans": { label: "简体中文", htmlLang: "zh-Hans", dir: "ltr", live: true },
  tl: { label: "Tagalog", htmlLang: "tl", dir: "ltr", live: true },
  vi: { label: "Tiếng Việt", htmlLang: "vi", dir: "ltr", live: true },
  ko: { label: "한국어", htmlLang: "ko", dir: "ltr", live: true },
};

/** All locales in picker order. */
export const localeList = Object.keys(locales) as Locale[];

/** Type guard so route params and stored values narrow to Locale. */
export function isLocale(value: string): value is Locale {
  return value in locales;
}

/** localStorage key remembering the visitor's chosen locale. */
export const LANGUAGE_STORAGE_KEY = "ab578.lang";

const catalogs: Record<Locale, Partial<Messages>> = {
  en,
  es,
  "zh-hant": zhHant,
  "zh-hans": zhHans,
  tl,
  vi,
  ko,
};

/** Exported for the CI translation parity check. */
export { catalogs };

/**
 * Translate a key in the given locale, falling back to English when the
 * locale catalog has no entry. `{name}` placeholders are replaced from vars.
 */
export function t(
  locale: Locale,
  key: MessageKey,
  vars?: Record<string, string>,
): string {
  const raw = catalogs[locale][key] ?? en[key];
  if (!vars) return raw;
  return raw.replace(
    /\{(\w+)\}/g,
    (match, name: string) => vars[name] ?? match,
  );
}

// Literal member access (import.meta.env.X) so Vite injects the configured
// values at build time; whole-object access comes out empty in the build.
// The try/catch guards plain node (tsx), where import.meta.env does not
// exist. Both read lazily on each call so unit tests can stub BASE_URL.
function configuredBase(): string {
  try {
    const raw = import.meta.env.BASE_URL as string | undefined;
    return typeof raw === "string" ? raw.replace(/\/+$/, "") : "";
  } catch {
    return "";
  }
}

function configuredSite(): string {
  try {
    const raw = import.meta.env.SITE as string | undefined;
    return typeof raw === "string" ? raw.replace(/\/+$/, "") : "";
  } catch {
    return "";
  }
}

/**
 * Path to a page in a locale, including the deploy base. The default locale
 * is unprefixed ('/file'); others get their prefix ('/es/file').
 */
export function localePath(locale: Locale, path: string): string {
  const suffix = path.startsWith("/") ? path : `/${path}`;
  const prefix = locale === DEFAULT_LOCALE ? "" : `/${locale}`;
  const base = configuredBase();
  if (suffix === "/") return `${base}${prefix}/`;
  return `${base}${prefix}${suffix}`;
}

/** Absolute URL for canonical and hreflang links, from the Astro site config. */
export function absoluteUrl(path: string): string {
  return `${configuredSite()}${path}`;
}
