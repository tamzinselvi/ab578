/**
 * The complaint engine's public contract.
 *
 * The wizard builds an Incident, generateKit turns it into a ComplaintKit,
 * and KitView renders the kit. Everything here is the frozen surface the
 * wizard, kit and translation tasks build against; see README.md in this
 * directory for the full API.
 *
 * Legal structure (which section backs an ask, whether it is settled, what
 * the floor is) lives in the generator, never in templates, so a translation
 * can never change what the law is claimed to say. Templates own the words.
 */

import type {
  Destination,
  PlatformId as DataPlatformId,
} from "../../data/types";
import type { Locale } from "../../i18n/index";

/** Site locales, reused from src/i18n. */
export type { Locale };

/** The three verified platforms plus the wizard's free-text 'other'. */
export type PlatformId = DataPlatformId | "other";

/** What went wrong with the order. 'not_covered' covers late, cold or poor quality. */
export type Issue =
  | "not_delivered"
  | "wrong_order"
  | "wrong_items"
  | "missing_items"
  | "unusable_items"
  | "credits_only"
  | "refund_denied"
  | "no_human"
  | "not_covered";

export type RefundStatus = "none" | "credits" | "partial" | "full";

/** How the customer contacted the platform, for the AG form's contact block. */
export interface ContactedPlatform {
  /** ISO date, YYYY-MM-DD. */
  date: string;
  method: "chat" | "phone" | "email" | "other";
  /** What happened, in the customer's words. */
  result: string;
}

export interface Incident {
  platform: PlatformId;
  /** Free-text platform name, used when platform is 'other'. */
  otherPlatformName?: string;
  issues: Issue[];
  /** ISO date, YYYY-MM-DD. Defaults to today in the wizard. */
  orderDate: string;
  /** Order total in dollars, as charged. */
  orderTotal: number;
  /** Menu price total of the missing, wrong or unusable items. */
  affectedItemsTotal?: number;
  refundStatus: RefundStatus;
  refundedAmount?: number;
  orderNumber?: string;
  restaurant?: string;
  /** Free text naming the affected items, e.g. '2 x chicken teriyaki'. */
  itemsAffected?: string;
  contactedPlatform?: ContactedPlatform;
  reachedHuman?: boolean;
  /**
   * The customer confirmed they were at the delivery address when the order
   * was marked delivered. Only then do messages state that fact.
   */
  atAddressConfirmed?: boolean;
}

/** The customer's own contact details, for the AG form's consumer block. */
export interface ContactInfo {
  firstName: string;
  lastName: string;
  street: string;
  street2?: string;
  city: string;
  state: string;
  zip: string;
  email?: string;
  phone?: string;
}

export interface KitOptions {
  /** What the user reads. Defaults to 'en'. */
  uiLocale: Locale;
  /** What gets sent. Defaults to 'en'. */
  outgoingLocale: Locale;
}

/**
 * A message in the outgoing locale, with a side-by-side translation in the
 * UI locale when the two differ and a translation exists. The translation is
 * dropped when it would be identical to the text.
 */
export interface LocalizedText {
  text: string;
  translation?: string;
}

/**
 * One demand, one per selected issue.
 *
 * settled: true means the law clearly requires it. settled: false covers
 * both argued consumer-favorable readings (which always carry fallback, the
 * floor the law clearly guarantees) and asks with no legal basis at all
 * (not_covered), which never cite a section.
 *
 * Argued asks are worded as the customer's firm claim and never attribute
 * words to the statute that are not in it.
 */
export interface Ask {
  issue: Issue;
  /** What the customer is owed, phrased as a demand. */
  request: string;
  /** Citation like '§ 22599.2(a)'. Absent for asks with no legal basis. */
  basis?: string;
  settled: boolean;
  /** The floor the law clearly guarantees, for argued asks. */
  fallback?: string;
}

/** Refund estimate for argued delivery issues. Labeled as an estimate; doubles as the floor amount. */
export interface RefundEstimate {
  /** Dollars. The menu-price total of the affected items. */
  amount: number;
  /** Explains what the amount covers and the floor, in the UI locale. */
  note: string;
}

/** One AG form field the kit can fill, with its exact form label. */
export interface AgKitField {
  /** 1-based position on the AG form. Disambiguates repeated labels like Zip Code. */
  order: number;
  /** The label exactly as shown on the AG form, in English. */
  label: string;
  /** The label in the UI locale, when it differs and a translation exists. */
  labelTranslation?: string;
  value: LocalizedText;
}

export interface PlatformRequestKit {
  /** About 600 characters, for chat boxes. */
  short: LocalizedText;
  /** For email or web forms. */
  long: LocalizedText;
  /** Platform help entry point. Empty string for 'other'. */
  supportUrl: string;
  /** How to reach a human at this platform, from verified data. */
  humanTips: string[];
}

export interface AgFormKit {
  formUrl: string;
  /** Only the fields the kit can fill, in the form's own order. */
  fields: AgKitField[];
}

/** A rule the kit relies on, from src/data/law.ts. */
export interface Citation {
  /** Stable rule id, e.g. 'bpc-22599-2-a' or 'reading-missing-items'. */
  id: string;
  /** Citation as printed, e.g. '§ 22599.2(a)'. */
  section: string;
  sourceUrl: string;
  verifiedOn: string;
  /** True when this citation backs the app's argued reading, not settled law. */
  argued: boolean;
  /** For argued citations: the section that clearly guarantees the floor. */
  floorSection?: string;
}

export interface ComplaintKit {
  outgoingLocale: Locale;
  asks: Ask[];
  refundEstimate?: RefundEstimate;
  platformRequest: PlatformRequestKit;
  agForm: AgFormKit;
  demandLetter: LocalizedText;
  /** Tailored to the selected issues, in the UI locale. */
  evidenceChecklist: string[];
  /** Every destination except the AG online form, which agForm covers. */
  otherDestinations: readonly Destination[];
  citations: Citation[];
}
