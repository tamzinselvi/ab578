/**
 * AB 578 statutory data, verbatim from the official California code.
 *
 * Source: Business and Professions Code, Division 8, Chapter 22.4, "Food
 * Delivery Platforms", read on leginfo.legislature.ca.gov on 2026-11-14 (plain
 * HTTP fetches return 403; the pages were read in a real browser).
 * AB 578 (Bauer-Kahan), Chapter 341, Statutes of 2025, amended
 * Section 22599.1 and added Section 22599.2, effective January 1, 2026.
 *
 * verbatimText is copied exactly from the official display text, starting
 * with the subsection marker, curly quotes and all. Never edit it by hand
 * into a paraphrase; re-verify against sourceUrl instead.
 *
 * The export `readings` holds this app's argued, consumer-favorable
 * interpretations. They are marked kind: 'reading' and never carry statute
 * text, so they can never be rendered as quotes from the law.
 */

import type { StatuteRule, ReadingRule } from "./types";

export const lawSource = {
  code: "California Business and Professions Code",
  division: "Division 8 (Special Business Regulations)",
  chapter: "Chapter 22.4, Food Delivery Platforms (Sections 22598 to 22599.6)",
  bill: "AB 578 (Bauer-Kahan), Chapter 341, Statutes of 2025, effective January 1, 2026",
  chapterUrl:
    "https://leginfo.legislature.ca.gov/faces/codes_displayText.xhtml?lawCode=BPC&division=8.&title=&part=&chapter=22.4.&article=",
  verifiedOn: "2026-11-14",
} as const;

export const statuteRules: readonly StatuteRule[] = [
  {
    kind: "statute",
    id: "bpc-22598-b",
    section: "§ 22598(b)",
    verbatimText:
      "(b) “Food delivery platform” means an online business that acts as an intermediary between consumers and multiple food facilities to submit food and beverage orders from a consumer to a participating food facility, and to arrange for, or to complete, the delivery of the order from the food facility to the consumer.",
    plainSummary:
      'Defines "food delivery platform": an online business that acts as an intermediary between consumers and multiple food facilities, submitting orders and arranging or completing delivery. This is who the chapter covers.',
    sourceUrl:
      "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=22598",
    verifiedOn: "2026-11-14",
    enactmentCredit:
      "(Amended by Stats. 2024, Ch. 898, Sec. 1. (SB 1490) Effective January 1, 2025.)",
  },
  {
    kind: "statute",
    id: "bpc-22598-c",
    section: "§ 22598(c)",
    verbatimText:
      "(c) “Food facility” means a food facility, as defined in Section 113789 of the Health and Safety Code.",
    plainSummary:
      'Defines "food facility" by reference to Section 113789 of the Health and Safety Code, which covers operations that provide food at the retail level.',
    sourceUrl:
      "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=22598",
    verifiedOn: "2026-11-14",
    enactmentCredit:
      "(Amended by Stats. 2024, Ch. 898, Sec. 1. (SB 1490) Effective January 1, 2025.)",
  },
  {
    kind: "statute",
    id: "bpc-22599-a",
    section: "§ 22599(a)",
    verbatimText:
      "(a) A food delivery platform shall not arrange for the delivery of an order from a food facility without first obtaining an agreement with the food facility expressly authorizing the food delivery platform to take orders and deliver meals prepared by the food facility.",
    plainSummary:
      "A food delivery platform may not deliver for a food facility without an agreement with that facility authorizing it to take orders and deliver its meals.",
    sourceUrl:
      "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=22599",
    verifiedOn: "2026-11-14",
    enactmentCredit:
      "(Amended by Stats. 2024, Ch. 898, Sec. 2. (SB 1490) Effective January 1, 2025.)",
  },
  {
    kind: "statute",
    id: "bpc-22599-d",
    section: "§ 22599(d)",
    verbatimText:
      "(d) A food delivery platform shall inform a food facility of all of the following:\n\n(1) How charges for customer order and delivery errors are calculated.\n\n(2) How charges related to errors are allocated between the food delivery platform and the food facility.\n\n(3) The process for food facilities to dispute charges related to errors, including whether disputes may be subject to automatic resolution.",
    plainSummary:
      "Platforms must tell each food facility how charges for customer order and delivery errors are calculated, how those charges are split between platform and facility, and how a facility can dispute them.",
    sourceUrl:
      "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=22599",
    verifiedOn: "2026-11-14",
    enactmentCredit:
      "(Amended by Stats. 2024, Ch. 898, Sec. 2. (SB 1490) Effective January 1, 2025.)",
  },
  {
    kind: "statute",
    id: "bpc-22599-1-a",
    section: "§ 22599.1(a)",
    verbatimText:
      "(a) It is unlawful for a food delivery platform to do any of the following:\n\n(1) Charge a customer any purchase price for food or beverage that is higher than the price posted on the food delivery platform’s internet website by the food facility at the time of the order.\n\n(2) Retain any portion of amounts designated as a tip or gratuity. Any tip or gratuity for a delivery order shall be paid by a food delivery platform, in its entirety, to the person delivering the food or beverage. Any tip or gratuity for a pickup order shall be paid by a food delivery platform, in its entirety, to the food facility.\n\n(3) Maintain a payment model that uses any amount designated as tips or gratuity to offset the base pay to the person delivering the food or beverage.",
    plainSummary:
      "Unlawful to charge a customer more than the menu price the food facility posted, to retain any part of a tip or gratuity, or to run a payment model that uses tips to offset a driver's base pay.",
    sourceUrl:
      "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=22599.1",
    verifiedOn: "2026-11-14",
    enactmentCredit:
      "(Amended by Stats. 2025, Ch. 341, Sec. 1. (AB 578) Effective January 1, 2026.)",
  },
  {
    kind: "statute",
    id: "bpc-22599-1-b",
    section: "§ 22599.1(b)",
    verbatimText:
      "(b) A food delivery platform shall prominently disclose to the customer and to the food facility an accurate, clearly identified, and itemized cost breakdown of each transaction, including, but not limited to, all of the following information:\n\n(1) The purchase price of the food and beverage.\n\n(2) A notice, if applicable, that the food delivery platform charges a fee, commission, or cost to the food facility, unless the food facility directs that the food delivery platform disclose to customers the delivery fee charged to the food facility and each fee, commission, or cost charged to the food facility.\n\n(3) Each fee, commission, and any other cost charged to the customer by the food delivery platform.\n\n(4) Any tip or gratuity payable to the delivery driver or food facility.",
    plainSummary:
      "Platforms must prominently disclose an accurate, clearly identified, itemized cost breakdown of each transaction to the customer and the food facility, covering menu price, any fee charged to the facility, each customer fee, and the tip.",
    sourceUrl:
      "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=22599.1",
    verifiedOn: "2026-11-14",
    enactmentCredit:
      "(Amended by Stats. 2025, Ch. 341, Sec. 1. (AB 578) Effective January 1, 2026.)",
  },
  {
    kind: "statute",
    id: "bpc-22599-1-e",
    section: "§ 22599.1(e)",
    verbatimText:
      "(e) A food delivery platform shall clearly and regularly disclose to the food facility and the customer the status of the order, including all of the following:\n\n(1) The method of delivery.\n\n(2) The anticipated date and time of the delivery of the order.\n\n(3) Confirmation that the order has been successfully delivered or that the delivery cannot be completed.",
    plainSummary:
      "Platforms must clearly and regularly disclose order status to the facility and the customer: the method of delivery, the anticipated delivery date and time, and confirmation that the order was delivered or cannot be completed.",
    sourceUrl:
      "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=22599.1",
    verifiedOn: "2026-11-14",
    enactmentCredit:
      "(Amended by Stats. 2025, Ch. 341, Sec. 1. (AB 578) Effective January 1, 2026.)",
  },
  {
    kind: "statute",
    id: "bpc-22599-1-f",
    section: "§ 22599.1(f)",
    verbatimText:
      "(f) A food delivery platform shall include a clear and conspicuous customer service feature that allows a customer to contact a natural person. The food delivery platform may use an automated system to address customer service concerns. However, if the automated system is unable to address the customer’s concerns, the food delivery platform shall ensure that the customer is able to promptly connect with the natural person in order to address the concern.",
    plainSummary:
      "Platforms must include a clear and conspicuous customer service feature to contact a natural person. An automated system may come first, but if it cannot address the concern the customer must be able to promptly connect with a person.",
    sourceUrl:
      "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=22599.1",
    verifiedOn: "2026-11-14",
    enactmentCredit:
      "(Amended by Stats. 2025, Ch. 341, Sec. 1. (AB 578) Effective January 1, 2026.)",
  },
  {
    kind: "statute",
    id: "bpc-22599-2-a",
    section: "§ 22599.2(a)",
    verbatimText:
      "(a) A food delivery platform shall provide a full refund, including all taxes, commissions, fees, and gratuities, to the customer if an order is not delivered or the wrong order is delivered, unless the food delivery platform determines that the customer was responsible for the nondelivery or finds evidence indicating the refund request may be fraudulent.",
    plainSummary:
      "Full refund, including all taxes, commissions, fees and gratuities, when an order is not delivered or the wrong order is delivered, unless the platform determines the customer was responsible for the nondelivery or finds evidence the request may be fraudulent.",
    sourceUrl:
      "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=22599.2",
    verifiedOn: "2026-11-14",
    enactmentCredit:
      "(Added by Stats. 2025, Ch. 341, Sec. 2. (AB 578) Effective January 1, 2026.)",
  },
  {
    kind: "statute",
    id: "bpc-22599-2-b",
    section: "§ 22599.2(b)",
    verbatimText:
      "(b) The food delivery platform shall refund the amount of the original paid gratuity to the customer but shall not take or deduct the original gratuity amount from the delivery driver.",
    plainSummary:
      "When an order is refunded, the gratuity the customer paid is refunded to the customer, but the platform may not take or deduct it from the delivery driver.",
    sourceUrl:
      "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=22599.2",
    verifiedOn: "2026-11-14",
    enactmentCredit:
      "(Added by Stats. 2025, Ch. 341, Sec. 2. (AB 578) Effective January 1, 2026.)",
  },
  {
    kind: "statute",
    id: "bpc-22599-2-c",
    section: "§ 22599.2(c)",
    verbatimText:
      "(c) If it is not feasible for the food delivery platform to refund the paid gratuity to the customer in the original method of payment, the food delivery platform shall provide an alternate refund method for the paid gratuity.",
    plainSummary:
      "If the paid gratuity cannot feasibly be refunded to the original payment method, the platform must provide an alternate refund method for it.",
    sourceUrl:
      "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=22599.2",
    verifiedOn: "2026-11-14",
    enactmentCredit:
      "(Added by Stats. 2025, Ch. 341, Sec. 2. (AB 578) Effective January 1, 2026.)",
  },
  {
    kind: "statute",
    id: "bpc-22599-2-d",
    section: "§ 22599.2(d)",
    verbatimText:
      "(d) In the event that a customer receives an order that is only partially fulfilled, the food delivery platform shall do the following:\n\n(1) Charge the customer only for the portion of the order the customer received. Any taxes, fees, or gratuities directly associated with the undelivered items shall be adjusted to reflect the reduced order.\n\n(2) Provide a mechanism that allows the customer to adjust any gratuity that was included in the order prior to its delivery.",
    plainSummary:
      "For an order that is only partially fulfilled, the customer is charged only for the portion received, with taxes, fees and gratuities tied to the undelivered items adjusted, and the platform must provide a way to adjust a gratuity added before delivery.",
    sourceUrl:
      "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=22599.2",
    verifiedOn: "2026-11-14",
    enactmentCredit:
      "(Added by Stats. 2025, Ch. 341, Sec. 2. (AB 578) Effective January 1, 2026.)",
  },
  {
    kind: "statute",
    id: "bpc-22599-2-e",
    section: "§ 22599.2(e)",
    verbatimText:
      "(e) Along with any other refund options, the food delivery platform shall provide a mechanism that allows the customer to request that the amount of the refund be returned to the original method of payment.",
    plainSummary:
      "Along with any other refund options (credits stay allowed), the platform must provide a mechanism to request that the refund go back to the original method of payment.",
    sourceUrl:
      "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=22599.2",
    verifiedOn: "2026-11-14",
    enactmentCredit:
      "(Added by Stats. 2025, Ch. 341, Sec. 2. (AB 578) Effective January 1, 2026.)",
  },
  {
    kind: "statute",
    id: "bpc-22599-2-f",
    section: "§ 22599.2(f)",
    verbatimText:
      "(f) This section does not prohibit a food delivery platform from removing a customer from the platform if the platform has a reasonable suspicion that the customer has committed or is committing fraud.",
    plainSummary:
      "The refund section does not stop a platform from removing a customer it reasonably suspects of fraud.",
    sourceUrl:
      "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=22599.2",
    verifiedOn: "2026-11-14",
    enactmentCredit:
      "(Added by Stats. 2025, Ch. 341, Sec. 2. (AB 578) Effective January 1, 2026.)",
  },
] as const;

/**
 * Argued readings. Each is the app's consumer-favorable interpretation of an
 * ambiguous part of the law, paired with the floor the statute settles for
 * even if a court rejects the reading. Attorneys reviewing the launch should
 * start with the missing-items reading, the most contested.
 */
export const readings: readonly ReadingRule[] = [
  {
    kind: "reading",
    id: "reading-some-items-wrong",
    section: "§ 22599.2(a)",
    reading:
      "When some of the items in an order are wrong, the order that arrived is not the order that was placed. The wrong order was delivered, so Section 22599.2(a) requires a full refund, including all taxes, commissions, fees, and gratuities.",
    floorSection: "§ 22599.2(d)",
    plainSummary:
      "Partly wrong orders are argued to be the wrong order under Section 22599.2(a), which would mean a full refund. The settled floor under Section 22599.2(d) is that the customer is charged only for the items actually received in usable form, with their taxes, fees and tip adjusted, and the option to lower a tip added before delivery.",
    counterArgument:
      "Section 22599.2(d) addresses partially fulfilled orders specifically, and Code of Civil Procedure Section 1859 makes a particular provision control an inconsistent general one, which supports treating subdivision (d) as the measure for any partial order.",
    sourceUrl:
      "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=22599.2",
    verifiedOn: "2026-11-14",
  },
  {
    kind: "reading",
    id: "reading-missing-items",
    section: "§ 22599.2(a)",
    reading:
      "When items are missing from an order, the order that arrived is not the order that was placed. The wrong order was delivered, so Section 22599.2(a) requires a full refund, including all taxes, commissions, fees, and gratuities.",
    floorSection: "§ 22599.2(d)",
    plainSummary:
      "Missing items are the most contested argued reading. The app demands a full refund under Section 22599.2(a) and always states the floor at the same time: under Section 22599.2(d) the customer must at least be charged only for the items received, with their taxes, fees and tip adjusted, and must be able to lower a tip added before delivery.",
    counterArgument:
      "Section 22599.2(d) speaks directly to partially fulfilled orders, and Code of Civil Procedure Section 1859 makes the particular provision control the general one, which cuts against reading missing items into the wrong-order trigger of Section 22599.2(a).",
    sourceUrl:
      "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=22599.2",
    verifiedOn: "2026-11-14",
  },
  {
    kind: "reading",
    id: "reading-unusable-items",
    section: "§ 22599.2(a)",
    reading:
      "Items that arrive unusable, for example spilled, crushed, or opened, were not delivered to the customer in any usable form. The customer did not receive them, so Section 22599.2(a) entitles the customer to a refund of those items together with their taxes, fees and tip, or to a full refund if the whole order is unusable.",
    floorSection: "§ 22599.2(d)",
    plainSummary:
      "Unusable items are argued to count as not delivered under Section 22599.2(a). The floor under Section 22599.2(d) is a refund of those items with their share of taxes, fees and tip, plus the option to lower a tip added before delivery.",
    counterArgument:
      "The statute says nothing about the condition in which food arrives, so a platform can argue an item was delivered even if unusable, which would leave only the Section 22599.2(d) adjustment.",
    sourceUrl:
      "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=BPC&sectionNum=22599.2",
    verifiedOn: "2026-11-14",
  },
] as const;
