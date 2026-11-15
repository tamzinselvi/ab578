import { afterEach, describe, expect, it, vi } from "vitest";
import {
  catalogs,
  DEFAULT_LOCALE,
  localeList,
  localePath,
  locales,
  t,
} from "../../src/i18n/index";
import { formatDate, formatMoney, formatNumber } from "../../src/i18n/format";
import { localeFromTag, pickSuggestedLocale } from "../../src/i18n/suggest";
import { findParityIssues } from "../../scripts/check-translation-parity";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("t", () => {
  it("returns the English string for the default locale", () => {
    expect(t("en", "homeHeadline")).toBe("Get your delivery order money back");
  });

  it("falls back to English when a locale catalog has no entry", () => {
    const es = catalogs.es as Record<string, string | undefined>;
    const saved = es.homeHeadline;
    delete es.homeHeadline;
    try {
      expect(t("es", "homeHeadline")).toBe(
        "Get your delivery order money back",
      );
    } finally {
      es.homeHeadline = saved;
    }
  });

  it("prefers the locale catalog over English", () => {
    expect(t("es", "homeHeadline")).toBe(
      "Recupera el dinero de tu pedido a domicilio",
    );
    expect(t("es", "languageSuggestPrompt", { language: "English" })).toBe(
      "¿Prefieres English?",
    );
  });

  it("leaves unknown placeholders untouched", () => {
    expect(t("en", "languageSuggestPrompt", { other: "x" })).toBe(
      "Prefer {language}?",
    );
  });
});

describe("localePath", () => {
  it("prefixes non-default locales and keeps the deploy base", () => {
    vi.stubEnv("BASE_URL", "/ab578/");
    expect(localePath("en", "/")).toBe("/ab578/");
    expect(localePath("en", "/file")).toBe("/ab578/file");
    expect(localePath("es", "/")).toBe("/ab578/es/");
    expect(localePath("es", "/file")).toBe("/ab578/es/file");
    expect(localePath("zh-hant", "/file")).toBe("/ab578/zh-hant/file");
  });

  it("accepts a base without a trailing slash", () => {
    vi.stubEnv("BASE_URL", "/ab578");
    expect(localePath("ko", "/file")).toBe("/ab578/ko/file");
  });

  it("emits clean paths for a custom domain root base", () => {
    vi.stubEnv("BASE_URL", "/");
    expect(localePath("en", "/")).toBe("/");
    expect(localePath("en", "/file")).toBe("/file");
    expect(localePath("vi", "/file")).toBe("/vi/file");
  });
});

describe("localeFromTag", () => {
  it.each([
    ["en-US", "en"],
    ["es", "es"],
    ["es-MX", "es"],
    ["zh", "zh-hant"],
    ["zh-TW", "zh-hant"],
    ["zh-Hant-HK", "zh-hant"],
    ["zh-CN", "zh-hans"],
    ["zh-Hans", "zh-hans"],
    ["zh-SG", "zh-hans"],
    ["tl-PH", "tl"],
    ["fil-PH", "tl"],
    ["vi", "vi"],
    ["ko-KR", "ko"],
  ])("maps %s to %s", (tag, expected) => {
    expect(localeFromTag(tag)).toBe(expected);
  });

  it("returns undefined for unsupported languages", () => {
    expect(localeFromTag("fr")).toBeUndefined();
    expect(localeFromTag("pt-BR")).toBeUndefined();
    expect(localeFromTag("ja")).toBeUndefined();
  });
});

describe("pickSuggestedLocale", () => {
  it("suggests the first supported language that differs from the current locale", () => {
    expect(pickSuggestedLocale(["es-ES", "en-US"], "en")).toBe("es");
    expect(pickSuggestedLocale(["fr-FR", "zh-CN"], "en")).toBe("zh-hans");
  });

  it("suggests nothing when the top preference already matches the current locale", () => {
    expect(pickSuggestedLocale(["en-US", "es-ES"], "en")).toBeUndefined();
  });

  it("suggests nothing when no preference is supported", () => {
    expect(pickSuggestedLocale(["fr", "de"], "en")).toBeUndefined();
    expect(pickSuggestedLocale([], "en")).toBeUndefined();
  });
});

describe("Intl format helpers", () => {
  it("formats USD amounts", () => {
    expect(formatMoney("en", 12.5)).toBe("$12.50");
    expect(formatMoney("en", 0)).toBe("$0.00");
  });

  it("formats numbers", () => {
    expect(formatNumber("en", 1234.5)).toBe("1,234.5");
  });

  it("formats dates in UTC regardless of the host time zone", () => {
    expect(formatDate("en", "2026-01-02")).toBe("January 2, 2026");
  });
});

describe("translation parity", () => {
  const sourceKeys = ["a", "b", "c"];

  it("accepts empty catalogs while translations are pending", () => {
    expect(
      findParityIssues(sourceKeys, [{ locale: "es", live: true, keys: [] }]),
    ).toEqual([]);
  });

  it("accepts a complete catalog", () => {
    expect(
      findParityIssues(sourceKeys, [
        { locale: "es", live: true, keys: ["a", "b", "c"] },
      ]),
    ).toEqual([]);
  });

  it("fails a partially filled catalog", () => {
    const issues = findParityIssues(sourceKeys, [
      { locale: "es", live: true, keys: ["a"] },
    ]);
    expect(issues).toHaveLength(1);
    expect(issues[0]).toContain("missing keys that exist in en: b, c");
  });

  it("fails a catalog with keys absent from en", () => {
    const issues = findParityIssues(sourceKeys, [
      { locale: "es", live: true, keys: ["a", "b", "c", "zz"] },
    ]);
    expect(issues[0]).toContain("keys that do not exist in en: zz");
  });

  it("ignores locales that are not live", () => {
    expect(
      findParityIssues(sourceKeys, [
        { locale: "es", live: false, keys: ["a"] },
      ]),
    ).toEqual([]);
  });

  it("ships every non-default catalog empty or complete", () => {
    // Guards against committing a half-translated catalog: the real catalogs
    // must satisfy the same rule the CI script enforces.
    const sourceKeyList = Object.keys(catalogs[DEFAULT_LOCALE]);
    const checks = localeList
      .filter((locale) => locale !== DEFAULT_LOCALE)
      .map((locale) => ({
        locale,
        live: locales[locale].live,
        keys: Object.keys(catalogs[locale]),
      }));
    expect(findParityIssues(sourceKeyList, checks)).toEqual([]);
  });
});
