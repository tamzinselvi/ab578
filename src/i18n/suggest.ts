import { isLocale, type Locale } from "./index";

/**
 * Map a BCP 47 browser language tag to a supported site locale.
 * A bare 'zh' maps to Traditional Chinese; script and region subtags
 * (zh-Hant, zh-TW, zh-Hans, zh-CN) pick the script explicitly.
 */
export function localeFromTag(tag: string): Locale | undefined {
  const lower = tag.toLowerCase();
  if (lower === "zh" || lower.startsWith("zh-hant")) return "zh-hant";
  if (lower.startsWith("zh-hans")) return "zh-hans";
  if (
    ["zh-tw", "zh-hk", "zh-mo", "zh-sg", "zh-cn"].some((r) =>
      lower.startsWith(r),
    )
  ) {
    return lower.startsWith("zh-sg") || lower.startsWith("zh-cn")
      ? "zh-hans"
      : "zh-hant";
  }
  const primary = lower.split("-")[0];
  if (primary === "fil") return "tl";
  return isLocale(primary) ? primary : undefined;
}

/**
 * Pick a locale to suggest from the browser's preferred languages. The first
 * tag that matches any supported locale decides: if it is the locale the
 * visitor is already reading, there is nothing to suggest.
 */
export function pickSuggestedLocale(
  browserLanguages: readonly string[],
  current: Locale,
): Locale | undefined {
  for (const tag of browserLanguages) {
    const match = localeFromTag(tag);
    if (match) return match === current ? undefined : match;
  }
  return undefined;
}
