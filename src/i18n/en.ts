/**
 * English source catalog. Every user-facing string on the site starts here.
 * Other locale catalogs fall back to these strings for any missing key.
 *
 * Copy rules: no em dashes (U+2014, including the Chinese double dash) in any
 * locale. The arrow character in homeCta is allowed.
 */
const source = {
  siteName: "AB 578 Complaint Kit",
  metaDescription:
    "File a food delivery refund complaint under California AB 578 in about a minute. Free, private, no account.",
  skipToContent: "Skip to content",
  languageLabel: "Languages",
  languageSuggestRegion: "Language suggestion",
  languageSuggestPrompt: "Prefer {language}?",
  languageSuggestDismiss: "Dismiss",
  homeHeadline: "Get your delivery order money back",
  homeSubhead: "Demand the AG enforce AB 578",
  homeCta: "File a complaint →",
  homeHow: "How?",
  fileTitle: "File a complaint",
  fileHeading: "File a complaint",
  fileBody:
    "The complaint wizard is being built. It will ask what went wrong with your order and turn your answers into a refund demand and an Attorney General complaint in about a minute.",
  fileBackHome: "Back to the home page",
  aboutTitle: "How this works",
  aboutHeading: "How this works",
  aboutBody:
    "This page will explain how the complaint kit works, why we ask for a full refund, and what California law requires. It is being written now.",
  notFoundTitle: "Page not found",
  notFoundHeading: "Page not found",
  notFoundBody: "That page does not exist.",
  notFoundHome: "Go to the home page",
  footerDisclaimer:
    "Not legal advice. Not affiliated with the State of California or any delivery company.",
  footerTranslatedNote:
    "Translated automatically. The English version is the official one.",
} as const;

/** All keys a catalog may define. Values are plain strings in every locale. */
export type Messages = { readonly [K in keyof typeof source]: string };

/** A message key, shared by every locale catalog. */
export type MessageKey = keyof Messages;

export const en: Messages = source;
