/**
 * generateKit: the one cross-task contract. The wizard produces an Incident,
 * this function turns it into a ComplaintKit, and KitView renders the kit.
 *
 * Legal structure lives here, never in templates: which section backs an
 * ask, whether it is settled, and the floor for argued readings. Every
 * statute quote is copied verbatim from src/data/law.ts. Outgoing messages
 * render in outgoingLocale (English by default); when the UI locale differs
 * and has templates, each message carries a side-by-side translation.
 */

import {
  agFormFacts,
  agFormFields,
  destinations,
} from "../../data/destinations";
import { readings, statuteRules } from "../../data/law";
import type {
  Destination,
  Platform,
  ReadingRule,
  StatuteRule,
} from "../../data/types";
import { getPlatform } from "../../data/platforms";
import { formatDate, formatMoney } from "../../i18n/format";
import type { Locale } from "../../i18n/index";
import { enTemplates, getTemplates } from "./templates";
import type { ComplaintTemplates, TemplateContext } from "./templates/types";
import type {
  AgKitField,
  Ask,
  Citation,
  ComplaintKit,
  ContactInfo,
  Incident,
  Issue,
  KitOptions,
  LocalizedText,
} from "./types";

/** Canonical issue order, used for asks and narrative clauses. */
export const ISSUE_ORDER: readonly Issue[] = [
  "not_delivered",
  "wrong_order",
  "wrong_items",
  "missing_items",
  "unusable_items",
  "credits_only",
  "refund_denied",
  "no_human",
  "not_covered",
];

const DELIVERY_ISSUE: Record<Issue, boolean> = {
  not_delivered: true,
  wrong_order: true,
  wrong_items: true,
  missing_items: true,
  unusable_items: true,
  credits_only: false,
  refund_denied: false,
  no_human: false,
  not_covered: false,
};

/** Argued readings from src/data/law.ts, keyed by the issue they back. */
const ARGUED_READING_ID: Partial<Record<Issue, string>> = {
  wrong_items: "reading-some-items-wrong",
  missing_items: "reading-missing-items",
  unusable_items: "reading-unusable-items",
};

const SECTION_FULL_REFUND = "§ 22599.2(a)";
const SECTION_PAYMENT_METHOD = "§ 22599.2(e)";
const SECTION_HUMAN = "§ 22599.1(f)";
const SECTION_RECEIPT = "§ 22599.1(b)";

interface AskRule {
  issue: Issue;
  basis?: string;
  settled: boolean;
  floorSection?: string;
  readingId?: string;
}

interface ResolvedPlatform {
  name: string;
  supportUrl: string;
  humanTips: string[];
  legalName?: string;
  mailingAddress?: string;
  mailingParts?: Platform["mailingParts"];
  phone?: string;
  website?: string;
  smallClaims: { allowed: boolean; note: string };
}

interface Rendered {
  short: string;
  long: string;
  agDescription: string;
  agResolution: string;
  demandLetter: string;
  checklist: string[];
}

function orderedIssues(incident: Incident): Issue[] {
  return ISSUE_ORDER.filter((issue) => incident.issues.includes(issue));
}

function moneyAsk(incident: Incident): boolean {
  return incident.issues.some(
    (issue) =>
      DELIVERY_ISSUE[issue] ||
      issue === "credits_only" ||
      issue === "refund_denied" ||
      issue === "not_covered",
  );
}

function refundClaimed(incident: Incident): boolean {
  return moneyAsk(incident) && incident.refundStatus !== "full";
}

function amountInDispute(incident: Incident): number {
  return Math.max(0, incident.orderTotal - (incident.refundedAmount ?? 0));
}

function askRuleFor(issue: Issue, incident: Incident): AskRule {
  switch (issue) {
    case "not_delivered":
    case "wrong_order":
      return { issue, basis: SECTION_FULL_REFUND, settled: true };
    case "wrong_items":
    case "missing_items":
    case "unusable_items": {
      const reading = readings.find((r) => r.id === ARGUED_READING_ID[issue]);
      if (!reading) {
        throw new Error(`No argued reading found for issue ${issue}`);
      }
      return {
        issue,
        basis: reading.section,
        settled: false,
        floorSection: reading.floorSection,
        readingId: reading.id,
      };
    }
    case "credits_only":
      return { issue, basis: SECTION_PAYMENT_METHOD, settled: true };
    case "refund_denied": {
      const delivery = incident.issues.filter((i) => DELIVERY_ISSUE[i]);
      if (delivery.length === 0) return { issue, settled: false };
      return {
        issue,
        basis: SECTION_FULL_REFUND,
        settled: delivery.every(
          (i) => i === "not_delivered" || i === "wrong_order",
        ),
      };
    }
    case "no_human":
      return { issue, basis: SECTION_HUMAN, settled: true };
    case "not_covered":
      return { issue, settled: false };
  }
}

function statuteCitation(rule: StatuteRule): Citation {
  return {
    id: rule.id,
    section: rule.section,
    sourceUrl: rule.sourceUrl,
    verifiedOn: rule.verifiedOn,
    argued: false,
  };
}

function readingCitation(rule: ReadingRule): Citation {
  return {
    id: rule.id,
    section: rule.section,
    sourceUrl: rule.sourceUrl,
    verifiedOn: rule.verifiedOn,
    argued: true,
    floorSection: rule.floorSection,
  };
}

function buildCitations(
  incident: Incident,
  rules: AskRule[],
  estimateIncluded: boolean,
): Citation[] {
  const sections = new Set<string>();
  const readingIds = new Set<string>();
  for (const rule of rules) {
    if (rule.basis) sections.add(rule.basis);
    if (rule.floorSection) sections.add(rule.floorSection);
    if (rule.readingId) readingIds.add(rule.readingId);
  }
  const citesLaw = incident.issues.some((issue) => issue !== "not_covered");
  if (
    citesLaw &&
    (refundClaimed(incident) || incident.issues.includes("credits_only"))
  ) {
    sections.add(SECTION_PAYMENT_METHOD);
  }
  if (incident.issues.includes("no_human")) sections.add(SECTION_HUMAN);
  if (estimateIncluded) sections.add(SECTION_RECEIPT);

  const citations = statuteRules
    .filter((rule) => sections.has(rule.section))
    .map(statuteCitation);
  for (const rule of readings) {
    if (readingIds.has(rule.id)) citations.push(readingCitation(rule));
  }
  return citations;
}

function resolvePlatform(incident: Incident): ResolvedPlatform {
  if (incident.platform === "other") {
    return {
      name: incident.otherPlatformName?.trim() || "the delivery platform",
      supportUrl: "",
      humanTips: [
        "Open the app or website Help section and start a refund request from the order page.",
      ],
      smallClaims: { allowed: false, note: "" },
    };
  }
  const platform: Platform = getPlatform(incident.platform);
  const humanTips = [
    `Start at the help center: ${platform.supportUrl}`,
    platform.humanContact,
  ];
  if (platform.phone) humanTips.push(`Or call ${platform.phone}.`);
  return {
    name: platform.name,
    supportUrl: platform.supportUrl,
    humanTips,
    legalName: platform.legalName,
    mailingAddress: platform.mailingAddress,
    mailingParts: platform.mailingParts,
    phone: platform.phone,
    website: platform.website,
    smallClaims: {
      allowed: platform.smallClaimsAllowed,
      note: platform.smallClaimsNote,
    },
  };
}

/**
 * The verbatim body of a subsection, minus its leading marker, wrapped in
 * curly quotes. Still exactly the law's words: the marker moves outside the
 * quote as the citation, nothing else changes.
 */
function quotedBody(rule: StatuteRule): string {
  return `“${rule.verbatimText.replace(/^\([a-z0-9]+\)\s*/, "")}”`;
}

function senderBlock(contact?: ContactInfo): string[] {
  if (!contact) {
    return ["[Your name]", "[Your street address]", "[City, state ZIP]"];
  }
  return [
    `${contact.firstName} ${contact.lastName}`,
    contact.street,
    ...(contact.street2 ? [contact.street2] : []),
    `${contact.city}, ${contact.state} ${contact.zip}`,
  ];
}

interface Plan {
  incident: Incident;
  issues: Issue[];
  rules: AskRule[];
  platform: ResolvedPlatform;
  citations: Citation[];
  inDispute: number;
  estimateAmount?: number;
}

function planKit(incident: Incident): Plan {
  const issues = orderedIssues(incident);
  const rules = issues.map((issue) => askRuleFor(issue, incident));
  const argued = rules.some((rule) => rule.floorSection);
  const estimateAmount =
    argued &&
    incident.affectedItemsTotal != null &&
    incident.affectedItemsTotal > 0
      ? Math.round(incident.affectedItemsTotal * 100) / 100
      : undefined;
  return {
    incident,
    issues,
    rules,
    platform: resolvePlatform(incident),
    citations: buildCitations(incident, rules, estimateAmount !== undefined),
    inDispute: amountInDispute(incident),
    estimateAmount,
  };
}

function buildContext(
  locale: Locale,
  plan: Plan,
  asks: Ask[],
  contact?: ContactInfo,
): TemplateContext {
  const { incident } = plan;
  const cited = new Set(plan.citations.map((c) => c.id));
  const glosses: { section: string; plain: string }[] = [];
  for (const rule of statuteRules) {
    if (cited.has(rule.id))
      glosses.push({ section: rule.section, plain: rule.plainSummary });
  }
  for (const reading of readings) {
    if (cited.has(reading.id))
      glosses.push({ section: reading.section, plain: reading.plainSummary });
  }
  const fullRefundRule = statuteRules.find(
    (rule) => rule.section === SECTION_FULL_REFUND,
  );
  return {
    incident,
    platformName: plan.platform.name,
    asks,
    date: {
      orderDate: formatDate(locale, incident.orderDate),
      lastContact: incident.contactedPlatform
        ? formatDate(locale, incident.contactedPlatform.date)
        : undefined,
    },
    money: {
      total: formatMoney(locale, incident.orderTotal),
      refunded:
        incident.refundedAmount != null
          ? formatMoney(locale, incident.refundedAmount)
          : undefined,
      inDispute: formatMoney(locale, plan.inDispute),
      estimate:
        plan.estimateAmount != null
          ? formatMoney(locale, plan.estimateAmount)
          : undefined,
    },
    refundQuote:
      refundClaimed(incident) &&
      incident.issues.some((i) => DELIVERY_ISSUE[i]) &&
      fullRefundRule
        ? quotedBody(fullRefundRule)
        : undefined,
    ruleGlosses: glosses,
    senderBlock: senderBlock(contact),
    platformAddress: plan.platform.mailingAddress,
    smallClaims: plan.platform.smallClaims,
    contact,
  };
}

function renderMessages(
  templates: ComplaintTemplates,
  ctx: TemplateContext,
): Rendered {
  return {
    short: templates.shortRequest(ctx),
    long: templates.longRequest(ctx),
    agDescription: templates.agDescription(ctx),
    agResolution: templates.agResolution(ctx),
    demandLetter: templates.demandLetter(ctx),
    checklist: templates.evidenceChecklist(ctx),
  };
}

function localized(text: string, uiText?: string): LocalizedText {
  return {
    text,
    translation: uiText !== undefined && uiText !== text ? uiText : undefined,
  };
}

/** Exact AG form label for a field position; data is the source of truth. */
function formLabel(order: number): string {
  const field = agFormFields.find((f) => f.order === order);
  if (!field) {
    throw new Error(
      `AG form field ${order} is missing from src/data/destinations.ts`,
    );
  }
  return field.label;
}

function splitPhone(phone: string): { area?: string; rest: string } {
  let digits = phone.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) digits = digits.slice(1);
  if (digits.length === 10) {
    return { area: digits.slice(0, 3), rest: digits.slice(3) };
  }
  return { rest: phone };
}

interface FieldDraft {
  order: number;
  text: string;
  /** Translation for composed messages; plain data values have none. */
  uiText?: string;
}

function agFieldDrafts(
  plan: Plan,
  out: Rendered,
  ui: Rendered | undefined,
  contact: ContactInfo | undefined,
  locale: Locale,
): FieldDraft[] {
  const drafts: FieldDraft[] = [];
  const { incident, platform, inDispute } = plan;

  if (contact) {
    drafts.push({ order: 1, text: contact.firstName });
    drafts.push({ order: 3, text: contact.lastName });
    drafts.push({ order: 4, text: contact.street });
    if (contact.street2) drafts.push({ order: 5, text: contact.street2 });
    drafts.push({ order: 6, text: contact.city });
    drafts.push({ order: 7, text: contact.state });
    drafts.push({ order: 8, text: contact.zip });
    if (contact.email) {
      drafts.push({ order: 10, text: contact.email });
      drafts.push({ order: 11, text: contact.email });
    }
    const phone = splitPhone(contact.phone ?? "");
    if (contact.phone) {
      if (phone.area) drafts.push({ order: 12, text: phone.area });
      drafts.push({ order: 13, text: phone.rest });
    }
  }
  drafts.push({ order: 14, text: "No" });
  if (platform.legalName) {
    drafts.push({ order: 15, text: platform.legalName });
  } else if (incident.otherPlatformName?.trim()) {
    drafts.push({ order: 15, text: incident.otherPlatformName.trim() });
  }
  // The AG form splits the company address and limits the street line to 50
  // characters, so use the structured parts, not the one-line address.
  if (platform.mailingParts) {
    drafts.push({ order: 16, text: platform.mailingParts.street });
    drafts.push({ order: 18, text: platform.mailingParts.city });
    drafts.push({ order: 19, text: platform.mailingParts.state });
    drafts.push({ order: 20, text: platform.mailingParts.zip });
  }
  if (platform.phone) {
    const phone = splitPhone(platform.phone);
    if (phone.area) drafts.push({ order: 22, text: phone.area });
    drafts.push({ order: 23, text: phone.rest });
  }
  if (platform.website) drafts.push({ order: 25, text: platform.website });
  // The AG form's amount field is numeric: digits and a decimal point only.
  if (inDispute > 0) drafts.push({ order: 26, text: inDispute.toFixed(2) });
  drafts.push({
    order: 27,
    text: out.agDescription,
    uiText: ui?.agDescription,
  });
  drafts.push({
    order: 28,
    text: out.agResolution,
    uiText: ui?.agResolution,
  });

  const contacted = incident.contactedPlatform;
  drafts.push({ order: 29, text: contacted ? "Yes" : "No" });
  if (contacted) {
    drafts.push({ order: 30, text: formatDate(locale, contacted.date) });
    if (contacted.method === "email") drafts.push({ order: 31, text: "Yes" });
    if (contacted.method === "phone") drafts.push({ order: 33, text: "Yes" });
    if (contacted.method === "chat" || contacted.method === "other") {
      drafts.push({ order: 35, text: "Yes" });
      drafts.push({
        order: 36,
        text: contacted.method === "chat" ? "Chat" : "Other",
      });
    }
    drafts.push({ order: 38, text: contacted.result });
  }
  return drafts.sort((a, b) => a.order - b.order);
}

function buildAgForm(
  drafts: FieldDraft[],
  uiTemplates: ComplaintTemplates | undefined,
): AgKitField[] {
  return drafts.map((draft) => {
    const label = formLabel(draft.order);
    const labelTranslation = uiTemplates?.agLabels?.[label];
    return {
      order: draft.order,
      label,
      ...(labelTranslation ? { labelTranslation } : {}),
      value: localized(draft.text, draft.uiText),
    };
  });
}

/**
 * Build the full complaint kit from an incident.
 *
 * @param incident What the wizard collected.
 * @param contact Optional customer contact details for the AG form and the
 *   demand letter. Never required, never persisted here.
 * @param options UI and outgoing locales. Both default to English.
 */
export function generateKit(
  incident: Incident,
  contact?: ContactInfo,
  options?: KitOptions,
): ComplaintKit {
  const uiLocale: Locale = options?.uiLocale ?? "en";
  const outgoingLocale: Locale = options?.outgoingLocale ?? "en";
  const plan = planKit(incident);

  const outTemplates = getTemplates(outgoingLocale) ?? enTemplates;
  const asks: Ask[] = plan.rules.map((rule) => ({
    issue: rule.issue,
    request: outTemplates.askRequest[rule.issue],
    ...(rule.basis ? { basis: rule.basis } : {}),
    settled: rule.settled,
    ...(rule.floorSection
      ? { fallback: outTemplates.askFallback[rule.issue] }
      : {}),
  }));
  const outCtx = buildContext(outgoingLocale, plan, asks, contact);
  const out = renderMessages(outTemplates, outCtx);

  const uiTemplates =
    uiLocale !== outgoingLocale ? getTemplates(uiLocale) : undefined;
  let ui: Rendered | undefined;
  let uiCtx: TemplateContext | undefined;
  if (uiTemplates) {
    const uiAsks: Ask[] = plan.rules.map((rule) => ({
      issue: rule.issue,
      request: uiTemplates.askRequest[rule.issue],
      ...(rule.basis ? { basis: rule.basis } : {}),
      settled: rule.settled,
      ...(rule.floorSection
        ? { fallback: uiTemplates.askFallback[rule.issue] }
        : {}),
    }));
    uiCtx = buildContext(uiLocale, plan, uiAsks, contact);
    ui = renderMessages(uiTemplates, uiCtx);
  }

  const noteTemplates = uiTemplates ?? outTemplates;
  const noteCtx = uiCtx ?? outCtx;
  const otherDestinations: readonly Destination[] = destinations.filter(
    (d) => d.id !== "ca-ag-complaint-form",
  );

  return {
    outgoingLocale,
    asks,
    ...(plan.estimateAmount !== undefined
      ? {
          refundEstimate: {
            amount: plan.estimateAmount,
            note: noteTemplates.estimateNote(noteCtx),
          },
        }
      : {}),
    platformRequest: {
      short: localized(out.short, ui?.short),
      long: localized(out.long, ui?.long),
      supportUrl: plan.platform.supportUrl,
      humanTips: plan.platform.humanTips,
    },
    agForm: {
      formUrl: agFormFacts.formUrl,
      fields: buildAgForm(
        agFieldDrafts(plan, out, ui, contact, outgoingLocale),
        uiTemplates,
      ),
    },
    demandLetter: localized(out.demandLetter, ui?.demandLetter),
    evidenceChecklist: noteTemplates.evidenceChecklist(noteCtx),
    otherDestinations,
    citations: plan.citations,
  };
}
