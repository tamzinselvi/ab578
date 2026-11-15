/**
 * Types for the AB 578 complaint app's verified data modules.
 *
 * Every exported fact in src/data/ carries a sourceUrl and a verifiedOn date
 * (ISO YYYY-MM-DD) naming where and when it was checked. Anything that could
 * not be confirmed from an official source carries unconfirmed: true rather
 * than a guess.
 *
 * This module must not import from outside src/data/.
 */

/** ISO calendar date, YYYY-MM-DD, on which a fact was checked against its source. */
export type VerifiedOn = string;

/**
 * A rule of law the app cites.
 *
 * kind is a discriminated union so argued readings can never be rendered as
 * verbatim statutory text: only StatuteRule carries verbatimText.
 */
export type LawRule = StatuteRule | ReadingRule;

/** Verbatim text of an official code section, as displayed on leginfo. */
export interface StatuteRule {
  readonly kind: "statute";
  /** Stable id, e.g. 'bpc-22599-2-a'. */
  readonly id: string;
  /** Citation as the app prints it, e.g. '§ 22599.2(a)'. */
  readonly section: string;
  /**
   * The subsection's text, copied exactly from the official code, starting
   * with the subsection marker and including its numbered paragraphs.
   * Never paraphrase inside this field.
   */
  readonly verbatimText: string;
  readonly plainSummary: string;
  readonly sourceUrl: string;
  readonly verifiedOn: VerifiedOn;
  /** Enactment or amendment credit line printed with the section, e.g. the AB 578 chapter citation. */
  readonly enactmentCredit?: string;
}

/** The app's argued, consumer-favorable reading of an ambiguous section. Never statute text. */
export interface ReadingRule {
  readonly kind: "reading";
  /** Stable id, e.g. 'reading-missing-items-wrong-order'. */
  readonly id: string;
  /** The section being read, e.g. '§ 22599.2(a)'. */
  readonly section: string;
  /** The reading itself, stated as the customer's claim. */
  readonly reading: string;
  /** The guarantee the law clearly settles for, even if the reading is rejected, e.g. '§ 22599.2(d)'. */
  readonly floorSection: string;
  readonly plainSummary: string;
  /** The strongest counter-argument, for honest labeling and attorney review. */
  readonly counterArgument?: string;
  readonly sourceUrl: string;
  readonly verifiedOn: VerifiedOn;
}

/** The three delivery platforms the app ships with. The wizard's 'other' is handled outside src/data. */
export type PlatformId = "doordash" | "ubereats" | "grubhub";

export interface Platform {
  readonly id: PlatformId;
  /** Consumer brand name, e.g. 'DoorDash'. */
  readonly name: string;
  /** Brands covered by the same terms and support (e.g. Caviar under DoorDash). */
  readonly subsidiaries: readonly string[];
  /** Legal entity name for the AG complaint form's Company Name field. */
  readonly legalName: string;
  /** Mailing address for legal notices, quoted from the current terms. */
  readonly mailingAddress: string;
  /**
   * The same address split for the AG form's Company Address, City, State
   * and Zip Code fields. The street part must fit the form's 50-character
   * limit (no company name or attention line).
   */
  readonly mailingParts: {
    readonly street: string;
    readonly city: string;
    readonly state: string;
    readonly zip: string;
  };
  /** Published customer support phone number, when one exists. */
  readonly phone?: string;
  readonly website: string;
  /** Main help or support entry point for order and refund problems. */
  readonly supportUrl: string;
  /** Official help article documenting the refund path, when one exists. */
  readonly refundHelpUrl?: string;
  /** Documented in-app (or web) path to report an issue and request a refund. */
  readonly inAppRefundPath: string;
  /** How to reach a human: chat, callback, phone, and availability. */
  readonly humanContact: string;
  /** Platform page about California refunds or AB 578, if one exists. */
  readonly caRefundPageUrl?: string;
  /** Whether the current terms allow small claims court despite the arbitration clause. */
  readonly smallClaimsAllowed: boolean;
  /** The small-claims clause (quoted or summarized) with its terms URL and version date. */
  readonly smallClaimsNote: string;
  readonly verifiedOn: VerifiedOn;
  /** Present when any fact on this record could not be confirmed from an official source. */
  readonly unconfirmed?: true;
}

export interface Destination {
  /** Stable id, e.g. 'ca-ag-complaint-form'. */
  readonly id: string;
  readonly name: string;
  readonly url: string;
  /** What this destination is for, e.g. 'state-complaint', 'local-enforcement', 'small-claims'. */
  readonly role: string;
  readonly notes: string;
  readonly verifiedOn: VerifiedOn;
  /** Present when any fact on this record could not be confirmed from an official source. */
  readonly unconfirmed?: true;
}

export type AgFormFieldType =
  | "text"
  | "email"
  | "tel"
  | "select"
  | "textarea"
  | "radio"
  | "checkbox"
  | "file";

/** One field of the California AG consumer complaint form, in the form's own order. */
export interface AgFormField {
  /** 1-based position in the form. */
  readonly order: number;
  /** Label text exactly as shown on the form. The required asterisk is carried by `required`, not the label. */
  readonly label: string;
  readonly required: boolean;
  readonly type: AgFormFieldType;
}
