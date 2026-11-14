import { locales, type Locale } from "./index";

/**
 * Locale-aware formatting helpers. Dates are formatted in UTC so the output
 * never depends on the visitor's time zone.
 */

export function formatDate(locale: Locale, isoDate: string): string {
  return new Intl.DateTimeFormat(locales[locale].htmlLang, {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(isoDate));
}

export function formatMoney(locale: Locale, amountUsd: number): string {
  return new Intl.NumberFormat(locales[locale].htmlLang, {
    style: "currency",
    currency: "USD",
  }).format(amountUsd);
}

export function formatNumber(locale: Locale, value: number): string {
  return new Intl.NumberFormat(locales[locale].htmlLang).format(value);
}
