/**
 * The template contract: one file per locale in this directory, each
 * exporting a Partial<ComplaintTemplates> named `<locale>Templates`.
 *
 * Templates own the words only. Legal structure (which section backs an
 * ask, settled or argued, the floor) is decided by the generator, and every
 * statute quote arrives verbatim from src/data/law.ts inside the context, so
 * a translation can never change what the law is claimed to say.
 *
 * Rules for every locale, from the design doc's content rules:
 * - plain and firm, like a person wrote it: short sentences, no jargon;
 * - no em dashes (U+2014), including the Chinese double dash;
 * - never attribute words to the statute that are not in it;
 * - keep ctx.refundQuote as the English original next to any translation of
 *   it, labeled an unofficial translation;
 * - no threats, no stock phrases.
 */

import type { Ask, ContactInfo, Incident, Issue } from "../types";

/**
 * Everything a template needs to compose one locale's messages. Numbers and
 * dates arrive already formatted for that locale, so templates stay pure
 * string composition.
 */
export interface TemplateContext {
  incident: Incident;
  /** 'DoorDash', or the typed name when platform is 'other'. */
  platformName: string;
  /** The final asks, wording resolved for this locale. */
  asks: Ask[];
  /** Formatted for the output locale. */
  date: { orderDate: string; lastContact?: string };
  /** Formatted for the output locale. */
  money: {
    total: string;
    refunded?: string;
    inDispute: string;
    estimate?: string;
  };
  /**
   * The verbatim body of Business and Professions Code § 22599.2(a) wrapped
   * in curly quotes, straight from src/data/law.ts. Present whenever the
   * messages claim a refund. Embed it as-is.
   */
  refundQuote?: string;
  /**
   * Plain-English glosses for the rules the kit cites, in citation order,
   * from src/data/law.ts. Always English: the law's words are not translated.
   */
  ruleGlosses: { section: string; plain: string }[];
  /** Letter header lines: the sender's name and address, or bracketed placeholders. */
  senderBlock: string[];
  /** Mailing address from verified platform data, for the demand letter. Absent for 'other'. */
  platformAddress?: string;
  /** Small-claims position from verified platform data. */
  smallClaims: { allowed: boolean; note: string };
  contact?: ContactInfo;
}

export interface ComplaintTemplates {
  /** One short clause per issue, lowercase, usable inside a fact sentence. */
  issueClause: Record<Issue, string>;
  /** The demand, phrased as what the customer is owed. Required for every issue. */
  askRequest: Record<Issue, string>;
  /**
   * Floor wording for argued issues. When present for a locale it must cover
   * every argued issue (wrong_items, missing_items, unusable_items); the
   * sentence is reused verbatim as the message floor line.
   */
  askFallback: Partial<Record<Issue, string>>;
  /** About 600 characters, for chat boxes. */
  shortRequest(ctx: TemplateContext): string;
  /** For email or web forms. */
  longRequest(ctx: TemplateContext): string;
  /** The AG form's Complaint description. */
  agDescription(ctx: TemplateContext): string;
  /** The AG form's reasonable-resolution field. */
  agResolution(ctx: TemplateContext): string;
  /** Printable small-claims demand letter. */
  demandLetter(ctx: TemplateContext): string;
  /** Evidence items tailored to the selected issues. */
  evidenceChecklist(ctx: TemplateContext): string[];
  /** Labeled estimate note; explains the floor. */
  estimateNote(ctx: TemplateContext): string;
  /**
   * AG form label translations keyed by the exact English label. Only
   * non-English locales provide this; the English file omits it.
   */
  agLabels?: Record<string, string>;
}
