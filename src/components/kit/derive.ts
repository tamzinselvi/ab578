/**
 * Pure derivations for the kit screen. KitView owns layout and state; these
 * helpers own every decision that can be made without the DOM, so they are
 * unit-testable in node. No hooks, no I/O.
 */

import { destinations } from "../../data/destinations";
import { platforms } from "../../data/platforms";
import type { Destination } from "../../data/types";
import { formatDate, formatMoney } from "../../i18n/format";
import { isLocale, locales, t, type Locale } from "../../i18n";
import type {
  Ask,
  ComplaintKit,
  LocalizedText,
} from "../../lib/complaint/types";

/** The UI locale KitView reads the page in. Equals <html lang>, lowercased. */
export function pageLocale(lang: string | undefined): Locale {
  const raw = (lang ?? "").toLowerCase();
  return isLocale(raw) ? raw : "en";
}

/**
 * The platform's own display name, derived from the kit by matching the
 * support URL against verified platform data. Falls back to a generic name
 * for the wizard's free-text 'other' platform, whose support URL is empty.
 */
export function kitPlatformName(kit: ComplaintKit, locale: Locale): string {
  const match = platforms.find(
    (platform) => platform.supportUrl === kit.platformRequest.supportUrl,
  );
  return match?.name ?? t(locale, "kitPlatformFallbackName");
}

/**
 * The text that gets sent: the outgoing-locale string, or the side-by-side
 * translation once the user toggles "send in my language". Copy buttons and
 * the share sheet must use exactly this, never the side text.
 */
export function outgoingText(item: LocalizedText, sendInUiLanguage: boolean) {
  return sendInUiLanguage && item.translation ? item.translation : item.text;
}

/** The side-by-side text: the one that is not being sent, when both exist. */
export function sideText(
  item: LocalizedText,
  sendInUiLanguage: boolean,
): string | undefined {
  if (!item.translation) return undefined;
  return sendInUiLanguage ? item.text : item.translation;
}

/** Whether any message carries a translation the toggle could switch to. */
export function kitHasTranslation(kit: ComplaintKit): boolean {
  return (
    kit.platformRequest.short.translation !== undefined ||
    kit.platformRequest.long.translation !== undefined ||
    kit.demandLetter.translation !== undefined ||
    kit.agForm.fields.some((field) => field.value.translation !== undefined)
  );
}

/** The language name a locale's own community uses, for toggle labels. */
export function languageName(locale: Locale): string {
  return locale === "en" ? "English" : locales[locale].label;
}

export type AskKind = "settled" | "argued" | "plain";

/**
 * Which label an ask carries. Settled asks state what the law requires.
 * Argued asks (settled false with a basis) state our reading. not_covered
 * asks cite nothing and get the plain label; neither legal label may be
 * attached to them.
 */
export function askKind(ask: Ask): AskKind {
  if (ask.settled) return "settled";
  return ask.basis ? "argued" : "plain";
}

/**
 * The floor line for an argued ask: the estimated money amount when the kit
 * has one (the estimate doubles as the floor), otherwise the engine's floor
 * wording. Settled and plain asks have no floor line.
 */
export function floorLine(
  ask: Ask,
  kit: ComplaintKit,
  locale: Locale,
): string | undefined {
  if (askKind(ask) !== "argued") return undefined;
  if (kit.refundEstimate) {
    return t(locale, "kitFloorLine", {
      amount: formatMoney(locale, kit.refundEstimate.amount),
    });
  }
  if (ask.fallback) {
    return t(locale, "kitFloorFallback", { fallback: ask.fallback });
  }
  return undefined;
}

/** AG mail-in form destination for the UI locale, when one exists. es, zh, vi only. */
export function agMailInForm(
  uiLocale: Locale,
  all: readonly Destination[] = destinations,
): Destination | undefined {
  const idByLocale: Record<string, string> = {
    es: "ca-ag-complaint-form-pdf-es",
    "zh-hant": "ca-ag-complaint-form-pdf-zh",
    "zh-hans": "ca-ag-complaint-form-pdf-zh",
    vi: "ca-ag-complaint-form-pdf-vi",
  };
  const id = idByLocale[uiLocale];
  return id ? all.find((destination) => destination.id === id) : undefined;
}

/** Card 3 destinations in display order: DA roster, FTC, small claims. */
export function cardDestinations(all: readonly Destination[]): Destination[] {
  const order = [
    "cdaa-da-roster",
    "ftc-reportfraud",
    "ca-courts-small-claims",
  ] as const;
  return order
    .map((id) => all.find((destination) => destination.id === id))
    .filter((destination): destination is Destination => !!destination);
}

/** File name for the dated plain-text record. */
export function recordFilename(isoDate: string): string {
  return `ab578-complaint-kit-${isoDate}.txt`;
}

/**
 * The whole kit as one dated plain-text record, in the outgoing language:
 * what the user asked for, the messages they send, every AG answer, the
 * demand letter, the other destinations and the citations behind the claims.
 */
export function buildRecordText(
  kit: ComplaintKit,
  locale: Locale,
  isoDate: string,
): string {
  const lines: string[] = [
    t(locale, "kitRecordTitle"),
    t(locale, "kitRecordSaved", { date: formatDate(locale, isoDate) }),
    "",
    t(locale, "kitRecordAsks"),
  ];
  for (const ask of kit.asks) {
    lines.push(`- ${ask.request}`);
    if (ask.basis) lines.push(`  (${ask.basis})`);
    const floor = floorLine(ask, kit, locale);
    if (floor) lines.push(`  ${floor}`);
  }
  if (kit.refundEstimate) {
    lines.push("", t(locale, "kitEstimateHeading"), kit.refundEstimate.note);
  }
  lines.push(
    "",
    t(locale, "kitRecordPlatformMessage"),
    `${t(locale, "kitMessageShortLabel")}:`,
    kit.platformRequest.short.text,
    "",
    `${t(locale, "kitMessageLongLabel")}:`,
    kit.platformRequest.long.text,
  );
  lines.push(
    "",
    t(locale, "kitRecordAgForm"),
    t(locale, "kitRecordAgFormUrl", { url: kit.agForm.formUrl }),
  );
  for (const field of kit.agForm.fields) {
    lines.push(`${field.label}: ${field.value.text}`);
  }
  lines.push("", t(locale, "kitRecordDemandLetter"), kit.demandLetter.text);
  lines.push("", t(locale, "kitRecordDestinations"));
  for (const destination of kit.otherDestinations) {
    lines.push(`- ${destination.name}: ${destination.url}`);
  }
  lines.push("", t(locale, "kitRecordCitations"));
  for (const citation of kit.citations) {
    const argued =
      citation.argued && citation.floorSection
        ? ` ${t(locale, "kitCitationArgued", { section: citation.floorSection })}`
        : "";
    lines.push(
      `- ${citation.section}${argued} ${t(locale, "kitCitationVerified", { date: citation.verifiedOn })} ${citation.sourceUrl}`,
    );
  }
  lines.push("", t(locale, "footerDisclaimer"));
  return lines.join("\n");
}
