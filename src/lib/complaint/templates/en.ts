/**
 * English templates: the source of truth for every other locale.
 *
 * Voice rules (design doc, Content rules): plain and firm, like a person
 * wrote it. Short sentences, contractions, concrete facts. No em dashes, no
 * threats, no stock phrases. Argued asks are stated firmly as the customer's
 * claim and always state the floor. Nothing here may put words in the
 * statute's mouth: the only quoted statute text is ctx.refundQuote, which
 * the generator copies verbatim from src/data/law.ts.
 */

import type { Issue } from "../types";
import type { ComplaintTemplates, TemplateContext } from "./types";

/** Static membership tables, per project convention. */
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

const ARGUED_ISSUE: Record<Issue, boolean> = {
  not_delivered: false,
  wrong_order: false,
  wrong_items: true,
  missing_items: true,
  unusable_items: true,
  credits_only: false,
  refund_denied: false,
  no_human: false,
  not_covered: false,
};

/** Issues the fact line names; credits, denial and no-human get their own lines. */
const FACT_LINE_ISSUE: Record<Issue, boolean> = {
  not_delivered: true,
  wrong_order: true,
  wrong_items: true,
  missing_items: true,
  unusable_items: true,
  credits_only: false,
  refund_denied: false,
  no_human: false,
  not_covered: true,
};

const issueClause: Record<Issue, string> = {
  not_delivered: "the order never arrived",
  wrong_order: "the wrong order was delivered",
  wrong_items: "some items were wrong",
  missing_items: "some items were missing",
  unusable_items: "some items arrived unusable",
  credits_only: "I was offered app credit only",
  refund_denied: "my refund request was denied",
  no_human: "I couldn't reach a person",
  not_covered: "the order had quality problems",
};

const askRequest: Record<Issue, string> = {
  not_delivered:
    "a full refund, including all taxes, commissions, fees, and gratuities, to my original payment method",
  wrong_order:
    "a full refund, including all taxes, commissions, fees, and gratuities, to my original payment method",
  wrong_items:
    "a full refund, including all taxes, commissions, fees, and gratuities, to my original payment method",
  missing_items:
    "a full refund, including all taxes, commissions, fees, and gratuities, to my original payment method",
  unusable_items:
    "a refund of the unusable items with their taxes, fees, and tip, or a full refund if the whole order is unusable, paid to my original payment method",
  credits_only: "my refund paid to my original payment method, not app credit",
  refund_denied:
    "reconsider the denial and pay the refund I'm owed, to my original payment method",
  no_human: "a prompt connection to a natural person",
  not_covered:
    "a refund under your own policy for what went wrong, paid to my original payment method",
};

const askFallback: Partial<Record<Issue, string>> = {
  wrong_items:
    "a refund of the wrong items with their taxes, fees, and tip, under § 22599.2(d)",
  missing_items:
    "a refund of the missing items with their taxes, fees, and tip, plus the option to lower the tip I added before delivery, under § 22599.2(d)",
  unusable_items:
    "a refund of the unusable items with their taxes, fees, and tip, under § 22599.2(d)",
};

const PAYMENT_LINE_CITED =
  "Send the refund to my original payment method, not app credit (§ 22599.2(e)).";
const PAYMENT_LINE_PLAIN =
  "Send the refund to my original payment method, not app credit.";
const HUMAN_LINE =
  "Your automated support couldn't resolve this. Please connect me with a person (§ 22599.1(f)).";

/** not_covered requests stay plain: no section may be cited. */
function citesLaw(ctx: TemplateContext): boolean {
  return ctx.incident.issues.some((issue) => issue !== "not_covered");
}

function paymentLine(ctx: TemplateContext): string {
  return citesLaw(ctx) ? PAYMENT_LINE_CITED : PAYMENT_LINE_PLAIN;
}

function joinList(parts: string[]): string {
  if (parts.length <= 1) return parts[0] ?? "";
  return `${parts.slice(0, -1).join(", ")} and ${parts[parts.length - 1]}`;
}

/** 'DoorDash order 123456 from Pokeworks, November 14, 2026' */
function orderRef(ctx: TemplateContext): string {
  let ref = `${ctx.platformName} order`;
  if (ctx.incident.orderNumber) ref += ` ${ctx.incident.orderNumber}`;
  if (ctx.incident.restaurant) ref += ` from ${ctx.incident.restaurant}`;
  return `${ref}, ${ctx.date.orderDate}`;
}

function factClauses(ctx: TemplateContext): string[] {
  return ctx.incident.issues
    .filter((issue) => FACT_LINE_ISSUE[issue])
    .map((issue) => issueClause[issue]);
}

function arguedIssues(ctx: TemplateContext): Issue[] {
  return ctx.incident.issues.filter((issue) => ARGUED_ISSUE[issue]);
}

/** True when the messages still claim money. */
function refundClaimed(ctx: TemplateContext): boolean {
  const moneyAsk = ctx.incident.issues.some(
    (issue) =>
      DELIVERY_ISSUE[issue] ||
      issue === "credits_only" ||
      issue === "refund_denied" ||
      issue === "not_covered",
  );
  return moneyAsk && ctx.incident.refundStatus !== "full";
}

/**
 * The floor sentence, one per message. For missing items it always includes
 * the tip adjustment, stated prominently.
 */
function floorLine(ctx: TemplateContext): string {
  const argued = arguedIssues(ctx);
  if (argued.length === 0) return "";
  const items = joinList(
    argued.map((issue) => {
      switch (issue) {
        case "wrong_items":
          return "the wrong items";
        case "missing_items":
          return "the missing items";
        default:
          return "the unusable items";
      }
    }),
  );
  const tipOption = argued.includes("missing_items")
    ? ", and the option to lower the tip I added before delivery"
    : "";
  return `At minimum, § 22599.2(d) requires a refund of ${items} with their taxes, fees, and tip${tipOption}.`;
}

/** The firm claim for chat boxes: short, always cites § 22599.2(a). */
function shortClaim(ctx: TemplateContext): string {
  if (
    ctx.incident.issues.includes("not_delivered") ||
    ctx.incident.issues.includes("wrong_order")
  ) {
    return `Under § 22599.2(a), I'm owed a full refund of ${ctx.money.total}, including all taxes, fees, and gratuities.`;
  }
  if (
    ctx.incident.issues.includes("wrong_items") ||
    ctx.incident.issues.includes("missing_items")
  ) {
    return `That's not what I ordered, so the wrong order was delivered. Under § 22599.2(a), I'm owed a full refund of ${ctx.money.total}, including all taxes, fees, and gratuities.`;
  }
  if (ctx.incident.issues.includes("unusable_items")) {
    return `Some items arrived unusable, so I didn't receive them in usable form. Under § 22599.2(a), I'm owed a refund of those items with their taxes, fees, and tip, or a full refund if the whole order was unusable.`;
  }
  return `Please refund ${ctx.money.inDispute} under your own policy for this order.`;
}

/** The full claim for email and the AG form: firm, with the statute quote. */
function claimParagraph(ctx: TemplateContext): string {
  const quote = `§ 22599.2(a) says: ${ctx.refundQuote ?? ""}`;
  if (ctx.incident.issues.includes("not_delivered")) {
    return `The order was not delivered. ${quote} That means I'm owed a full refund of ${ctx.money.total}, including all taxes, commissions, fees, and gratuities.`;
  }
  if (ctx.incident.issues.includes("wrong_order")) {
    return `The wrong order was delivered. ${quote} That means I'm owed a full refund of ${ctx.money.total}, including all taxes, commissions, fees, and gratuities.`;
  }
  if (
    ctx.incident.issues.includes("wrong_items") ||
    ctx.incident.issues.includes("missing_items")
  ) {
    return `What arrived is not what I ordered, so the wrong order was delivered. ${quote} That means I'm owed a full refund of ${ctx.money.total}, including all taxes, commissions, fees, and gratuities.`;
  }
  if (ctx.incident.issues.includes("unusable_items")) {
    return `Some items arrived spilled, crushed, or opened, so they were not delivered to me in usable form. ${quote} That means I'm owed a refund of those items with their taxes, fees, and tip, or a full refund if the whole order was unusable.`;
  }
  return `This order was not usable as delivered. Under your own policy, please refund ${ctx.money.inDispute}.`;
}

function statusSentence(ctx: TemplateContext): string {
  switch (ctx.incident.refundStatus) {
    case "none":
      return "I haven't received any refund.";
    case "credits":
      return "I was offered app credit only, which I don't want.";
    case "partial":
      return `I was refunded ${ctx.money.refunded ?? ""} of the ${ctx.money.total} total. The rest is still owed.`;
    case "full":
      return `I received a full refund of ${ctx.money.total}.`;
  }
}

function orderSentence(ctx: TemplateContext): string {
  const bits: string[] = [];
  if (ctx.incident.orderNumber) bits.push(`order ${ctx.incident.orderNumber}`);
  if (ctx.incident.itemsAffected)
    bits.push(`including ${ctx.incident.itemsAffected}`);
  return `On ${ctx.date.orderDate} I ordered from ${
    ctx.incident.restaurant ?? "a restaurant"
  } through ${ctx.platformName}${
    bits.length > 0 ? ` (${bits.join(", ")})` : ""
  }. The total charged was ${ctx.money.total}.`;
}

function atAddressSentence(): string {
  return "I was at the delivery address at the time of delivery, and nothing was delivered.";
}

function contactSentence(ctx: TemplateContext): string {
  const contact = ctx.incident.contactedPlatform;
  if (!contact) return "";
  return `I contacted ${ctx.platformName} by ${contact.method} on ${
    ctx.date.lastContact ?? contact.date
  }. ${contact.result}`;
}

function shortRequest(ctx: TemplateContext): string {
  const parts: string[] = [];
  const clauses = factClauses(ctx);
  parts.push(
    clauses.length > 0
      ? `${orderRef(ctx)}: ${joinList(clauses)}.`
      : `${orderRef(ctx)}.`,
  );
  if (ctx.incident.issues.includes("credits_only"))
    parts.push("I was offered app credit only.");
  if (ctx.incident.issues.includes("refund_denied"))
    parts.push("My refund request was denied.");
  if (refundClaimed(ctx)) {
    parts.push(shortClaim(ctx));
    const floor = floorLine(ctx);
    if (floor) parts.push(floor);
    parts.push(paymentLine(ctx));
  }
  if (ctx.incident.issues.includes("no_human")) parts.push(HUMAN_LINE);
  if (refundClaimed(ctx)) parts.push("Please confirm the refund today.");
  return parts.join(" ");
}

function longRequest(ctx: TemplateContext): string {
  const paragraphs: string[] = [];
  const subjectBits = [ctx.platformName, "order"];
  if (ctx.incident.orderNumber) subjectBits.push(ctx.incident.orderNumber);
  paragraphs.push(`Subject: Refund demand, ${subjectBits.join(" ")}`);
  paragraphs.push(`${ctx.platformName} support,\n\n${orderSentence(ctx)}`);

  const clauses = factClauses(ctx);
  if (clauses.length > 0)
    paragraphs.push(`What went wrong: ${joinList(clauses)}.`);
  if (
    ctx.incident.issues.includes("not_delivered") &&
    ctx.incident.atAddressConfirmed === true
  )
    paragraphs.push(atAddressSentence());

  if (refundClaimed(ctx)) {
    paragraphs.push(claimParagraph(ctx));
    const floor = floorLine(ctx);
    if (floor) paragraphs.push(floor);
    paragraphs.push(`${statusSentence(ctx)} ${paymentLine(ctx)}`);
  } else {
    paragraphs.push(statusSentence(ctx));
  }

  if (ctx.incident.issues.includes("no_human"))
    paragraphs.push(
      "Your automated support couldn't resolve this. § 22599.1(f) requires a way to promptly connect with a natural person. Please connect me with a person now.",
    );

  if (ctx.contact) {
    paragraphs.push(
      `Please confirm the refund within 5 business days.\n\n${ctx.contact.firstName} ${ctx.contact.lastName}`,
    );
  } else {
    paragraphs.push("Please confirm the refund within 5 business days.");
  }
  return paragraphs.join("\n\n");
}

function agDescription(ctx: TemplateContext): string {
  const parts: string[] = [orderSentence(ctx)];
  const clauses = factClauses(ctx);
  if (clauses.length > 0) parts.push(`What went wrong: ${joinList(clauses)}.`);
  if (
    ctx.incident.issues.includes("not_delivered") &&
    ctx.incident.atAddressConfirmed === true
  )
    parts.push(atAddressSentence());
  const contact = contactSentence(ctx);
  if (contact) parts.push(contact);
  parts.push(statusSentence(ctx));
  if (refundClaimed(ctx)) {
    parts.push(claimParagraph(ctx));
    const floor = floorLine(ctx);
    if (floor) parts.push(floor);
    parts.push(paymentLine(ctx));
  }
  if (ctx.incident.issues.includes("no_human")) parts.push(HUMAN_LINE);
  if (ctx.ruleGlosses.length > 0) {
    parts.push(
      `The rules that apply: ${ctx.ruleGlosses
        .map((gloss) => `${gloss.section}: ${gloss.plain}`)
        .join(" ")}`,
    );
  }
  return parts.join("\n\n");
}

/**
 * The AG form's resolution field holds at most AG_RESOLUTION_MAX characters
 * (the form's maxlength; longer text is cut off or rejected). The full
 * reasoning, including the floor, lives in the complaint description.
 */
export const AG_RESOLUTION_MAX = 128;

function agResolution(ctx: TemplateContext): string {
  const parts: string[] = [];
  const fullRefundAsk =
    ctx.incident.issues.includes("not_delivered") ||
    ctx.incident.issues.includes("wrong_order") ||
    ctx.incident.issues.includes("wrong_items") ||
    ctx.incident.issues.includes("missing_items");
  const argued = arguedIssues(ctx).length > 0;
  if (refundClaimed(ctx)) {
    if (fullRefundAsk) {
      parts.push(
        argued
          ? `Full refund of ${ctx.money.total} to my original payment method.`
          : `Full refund of ${ctx.money.total} with fees and tip, to my original payment method, not app credit.`,
      );
    } else if (ctx.incident.issues.includes("unusable_items")) {
      parts.push("Refund of the unusable items to my original payment method.");
    } else {
      parts.push(
        `Refund of ${ctx.money.inDispute} under the app's own policy, to my original payment method.`,
      );
    }
    // The floor is required for argued asks and must survive the limit.
    if (argued) {
      parts.push(
        "At minimum, no charge for items not received (§ 22599.2(d)).",
      );
    }
    if (ctx.incident.issues.includes("no_human")) {
      parts.push("And access to a natural person.");
    }
  } else if (ctx.incident.issues.includes("no_human")) {
    parts.push("A prompt connection to a natural person who can resolve this.");
  } else {
    parts.push("I was refunded. I want the practice recorded and stopped.");
  }
  // Add sentences only while they fit the form's limit.
  let out = "";
  for (const part of parts) {
    const next = out ? `${out} ${part}` : part;
    if (next.length > AG_RESOLUTION_MAX) break;
    out = next;
  }
  return out;
}

function demandLetter(ctx: TemplateContext): string {
  const lines: string[] = [...ctx.senderBlock, "[Date]", ""];
  lines.push(ctx.platformName);
  lines.push(ctx.platformAddress ?? "[Platform address]");
  lines.push("");
  const reBits = [
    ctx.platformName,
    "order",
    ctx.incident.orderNumber,
    ctx.incident.restaurant ? `(${ctx.incident.restaurant})` : undefined,
    `placed ${ctx.date.orderDate}`,
  ].filter(Boolean);
  lines.push(`Re: Demand for refund, ${reBits.join(" ")}`);
  lines.push("", "To whom it may concern:", "");

  const body: string[] = [orderSentence(ctx)];
  const clauses = factClauses(ctx);
  if (clauses.length > 0) body.push(`What went wrong: ${joinList(clauses)}.`);
  if (
    ctx.incident.issues.includes("not_delivered") &&
    ctx.incident.atAddressConfirmed === true
  )
    body.push(atAddressSentence());
  const contact = contactSentence(ctx);
  if (contact) body.push(contact);
  body.push(statusSentence(ctx));
  if (refundClaimed(ctx)) {
    body.push(claimParagraph(ctx));
    const floor = floorLine(ctx);
    if (floor) body.push(floor);
    body.push(
      `I demand payment of ${ctx.money.inDispute} to my original payment method, not app credit${
        citesLaw(ctx) ? " (§ 22599.2(e))" : ""
      }, within 14 days of the date of this letter.`,
    );
    body.push(
      ctx.smallClaims.allowed
        ? "If this is not resolved, I will file my claim in California small claims court, which your own terms allow for individual claims."
        : "If this is not resolved, I will pursue the claim in California small claims court.",
    );
  } else if (ctx.incident.issues.includes("no_human")) {
    body.push(
      "I ask that you connect customers like me with a natural person when your automated support cannot resolve an issue (§ 22599.1(f)).",
    );
  }
  lines.push(body.join("\n\n"));
  lines.push(
    "",
    "Sincerely,",
    ctx.contact
      ? `${ctx.contact.firstName} ${ctx.contact.lastName}`
      : "[Your name]",
  );
  return lines.join("\n");
}

function evidenceChecklist(ctx: TemplateContext): string[] {
  const items: string[] = [
    "Order confirmation: a screenshot of the order in the app, showing the order number, restaurant, date and total.",
    "Itemized receipt: a screenshot showing each menu price, each fee, and the tip.",
  ];
  const selected = new Set(ctx.incident.issues);
  if (selected.has("not_delivered"))
    items.push(
      "Delivery status: a screenshot of the tracking or 'delivered' notice with its timestamp, plus anything showing you were at the delivery address at that time.",
    );
  if (selected.has("wrong_order"))
    items.push(
      "Photos of everything that arrived, including containers and any receipt in the bag.",
    );
  if (selected.has("wrong_items"))
    items.push("Photos of the wrong items next to the order list.");
  if (selected.has("missing_items"))
    items.push(
      "A photo of what arrived next to the order list, showing the missing items.",
    );
  if (selected.has("unusable_items"))
    items.push(
      "Photos of the spilled, crushed, or opened items as they arrived.",
    );
  if (selected.has("credits_only"))
    items.push("A screenshot of the app credit offer.");
  if (selected.has("refund_denied"))
    items.push("A screenshot or copy of the refund denial.");
  if (selected.has("no_human"))
    items.push(
      "Screenshots of the support chat or menu, showing where the automated help stopped.",
    );
  if (ctx.incident.contactedPlatform)
    items.push("Copies of your messages with support, with dates.");
  items.push(
    "Remove personal and confidential information from every file before you upload it.",
  );
  return items;
}

function estimateNote(ctx: TemplateContext): string {
  return `Estimate: ${ctx.money.estimate ?? ""} covers the menu prices of the affected items. The taxes, fees, and tip charged on those items come on top; your itemized receipt (§ 22599.1(b)) shows the exact amounts. At minimum, § 22599.2(d) requires this refund.`;
}

export const enTemplates: ComplaintTemplates = {
  issueClause,
  askRequest,
  askFallback,
  shortRequest,
  longRequest,
  agDescription,
  agResolution,
  demandLetter,
  evidenceChecklist,
  estimateNote,
};
