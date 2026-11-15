import { describe, expect, it } from "vitest";
import { statuteRules } from "../../src/data/law";
import { generateKit } from "../../src/lib/complaint/generate";
import type {
  ComplaintKit,
  ContactInfo,
  Incident,
} from "../../src/lib/complaint/types";

/**
 * English output snapshots, checked line by line against src/data/law.ts:
 * every quoted statute span is asserted verbatim by the engine tests, and
 * these snapshots pin the exact wording around it.
 */

const CONTACT: ContactInfo = {
  firstName: "Maria",
  lastName: "Lopez",
  street: "1234 Palm Ave",
  street2: "Apt 5",
  city: "Los Angeles",
  state: "CA",
  zip: "90001",
  email: "maria@example.com",
  phone: "(213) 555-0142",
};

function messageTexts(kit: ComplaintKit) {
  const description = kit.agForm.fields.find(
    (field) => field.label === "Complaint description",
  );
  const resolution = kit.agForm.fields.find(
    (field) =>
      field.label ===
      "Briefly state what you would consider a reasonable resolution from the company",
  );
  return {
    asks: kit.asks,
    estimate: kit.refundEstimate ?? null,
    short: kit.platformRequest.short.text,
    long: kit.platformRequest.long.text,
    agDescription: description?.value.text ?? "",
    agResolution: resolution?.value.text ?? "",
    demandLetter: kit.demandLetter.text,
    checklist: kit.evidenceChecklist,
    citations: kit.citations.map((citation) => citation.section),
  };
}

describe("English output snapshots", () => {
  it("argued case: missing items, credit offered, no human", () => {
    const incident: Incident = {
      platform: "doordash",
      issues: ["missing_items", "credits_only", "no_human"],
      orderDate: "2026-11-01",
      orderTotal: 42.5,
      affectedItemsTotal: 18.25,
      refundStatus: "credits",
      orderNumber: "DD-1234",
      restaurant: "Pokeworks",
      itemsAffected: "2 x chicken teriyaki",
      contactedPlatform: {
        date: "2026-11-02",
        method: "chat",
        result: "The bot offered app credit and closed the chat.",
      },
    };
    const kit = generateKit(incident, CONTACT);
    expect(messageTexts(kit)).toMatchInlineSnapshot(`
      {
        "agDescription": "On November 1, 2026 I ordered from Pokeworks through DoorDash (order DD-1234, including 2 x chicken teriyaki). The total charged was $42.50.

      What went wrong: some items were missing.

      I contacted DoorDash by chat on November 2, 2026. The bot offered app credit and closed the chat.

      I was offered app credit only, which I don't want.

      What arrived is not what I ordered, so the wrong order was delivered. § 22599.2(a) says: “A food delivery platform shall provide a full refund, including all taxes, commissions, fees, and gratuities, to the customer if an order is not delivered or the wrong order is delivered, unless the food delivery platform determines that the customer was responsible for the nondelivery or finds evidence indicating the refund request may be fraudulent.” That means I'm owed a full refund of $42.50, including all taxes, commissions, fees, and gratuities.

      At minimum, § 22599.2(d) requires a refund of the missing items with their taxes, fees, and tip, and the option to lower the tip I added before delivery.

      Send the refund to my original payment method, not app credit (§ 22599.2(e)).

      Your automated support couldn't resolve this. Please connect me with a person (§ 22599.1(f)).

      The rules that apply: § 22599.1(b): Platforms must prominently disclose an accurate, clearly identified, itemized cost breakdown of each transaction to the customer and the food facility, covering menu price, any fee charged to the facility, each customer fee, and the tip. § 22599.1(f): Platforms must include a clear and conspicuous customer service feature to contact a natural person. An automated system may come first, but if it cannot address the concern the customer must be able to promptly connect with a person. § 22599.2(a): Full refund, including all taxes, commissions, fees and gratuities, when an order is not delivered or the wrong order is delivered, unless the platform determines the customer was responsible for the nondelivery or finds evidence the request may be fraudulent. § 22599.2(d): For an order that is only partially fulfilled, the customer is charged only for the portion received, with taxes, fees and gratuities tied to the undelivered items adjusted, and the platform must provide a way to adjust a gratuity added before delivery. § 22599.2(e): Along with any other refund options (credits stay allowed), the platform must provide a mechanism to request that the refund go back to the original method of payment. § 22599.2(a): Missing items are the most contested argued reading. The app demands a full refund under Section 22599.2(a) and always states the floor at the same time: under Section 22599.2(d) the customer must at least be charged only for the items received, with their taxes, fees and tip adjusted, and must be able to lower a tip added before delivery.",
        "agResolution": "Full refund of $42.50 to my original payment method. At minimum, no charge for items not received (§ 22599.2(d)).",
        "asks": [
          {
            "basis": "§ 22599.2(a)",
            "fallback": "a refund of the missing items with their taxes, fees, and tip, plus the option to lower the tip I added before delivery, under § 22599.2(d)",
            "issue": "missing_items",
            "request": "a full refund, including all taxes, commissions, fees, and gratuities, to my original payment method",
            "settled": false,
          },
          {
            "basis": "§ 22599.2(e)",
            "issue": "credits_only",
            "request": "my refund paid to my original payment method, not app credit",
            "settled": true,
          },
          {
            "basis": "§ 22599.1(f)",
            "issue": "no_human",
            "request": "a prompt connection to a natural person",
            "settled": true,
          },
        ],
        "checklist": [
          "Order confirmation: a screenshot of the order in the app, showing the order number, restaurant, date and total.",
          "Itemized receipt: a screenshot showing each menu price, each fee, and the tip.",
          "A photo of what arrived next to the order list, showing the missing items.",
          "A screenshot of the app credit offer.",
          "Screenshots of the support chat or menu, showing where the automated help stopped.",
          "Copies of your messages with support, with dates.",
          "Remove personal and confidential information from every file before you upload it.",
        ],
        "citations": [
          "§ 22599.1(b)",
          "§ 22599.1(f)",
          "§ 22599.2(a)",
          "§ 22599.2(d)",
          "§ 22599.2(e)",
          "§ 22599.2(a)",
        ],
        "demandLetter": "Maria Lopez
      1234 Palm Ave
      Apt 5
      Los Angeles, CA 90001
      [Date]

      DoorDash
      DoorDash, Inc., 303 2nd Street, Suite 800, San Francisco, CA 94107

      Re: Demand for refund, DoorDash order DD-1234 (Pokeworks) placed November 1, 2026

      To whom it may concern:

      On November 1, 2026 I ordered from Pokeworks through DoorDash (order DD-1234, including 2 x chicken teriyaki). The total charged was $42.50.

      What went wrong: some items were missing.

      I contacted DoorDash by chat on November 2, 2026. The bot offered app credit and closed the chat.

      I was offered app credit only, which I don't want.

      What arrived is not what I ordered, so the wrong order was delivered. § 22599.2(a) says: “A food delivery platform shall provide a full refund, including all taxes, commissions, fees, and gratuities, to the customer if an order is not delivered or the wrong order is delivered, unless the food delivery platform determines that the customer was responsible for the nondelivery or finds evidence indicating the refund request may be fraudulent.” That means I'm owed a full refund of $42.50, including all taxes, commissions, fees, and gratuities.

      At minimum, § 22599.2(d) requires a refund of the missing items with their taxes, fees, and tip, and the option to lower the tip I added before delivery.

      I demand payment of $42.50 to my original payment method, not app credit (§ 22599.2(e)), within 14 days of the date of this letter.

      If this is not resolved, I will file my claim in California small claims court, which your own terms allow for individual claims.

      Sincerely,
      Maria Lopez",
        "estimate": {
          "amount": 18.25,
          "note": "Estimate: $18.25 covers the menu prices of the affected items. The taxes, fees, and tip charged on those items come on top; your itemized receipt (§ 22599.1(b)) shows the exact amounts. At minimum, § 22599.2(d) requires this refund.",
        },
        "long": "Subject: Refund demand, DoorDash order DD-1234

      DoorDash support,

      On November 1, 2026 I ordered from Pokeworks through DoorDash (order DD-1234, including 2 x chicken teriyaki). The total charged was $42.50.

      What went wrong: some items were missing.

      What arrived is not what I ordered, so the wrong order was delivered. § 22599.2(a) says: “A food delivery platform shall provide a full refund, including all taxes, commissions, fees, and gratuities, to the customer if an order is not delivered or the wrong order is delivered, unless the food delivery platform determines that the customer was responsible for the nondelivery or finds evidence indicating the refund request may be fraudulent.” That means I'm owed a full refund of $42.50, including all taxes, commissions, fees, and gratuities.

      At minimum, § 22599.2(d) requires a refund of the missing items with their taxes, fees, and tip, and the option to lower the tip I added before delivery.

      I was offered app credit only, which I don't want. Send the refund to my original payment method, not app credit (§ 22599.2(e)).

      Your automated support couldn't resolve this. § 22599.1(f) requires a way to promptly connect with a natural person. Please connect me with a person now.

      Please confirm the refund within 5 business days.

      Maria Lopez",
        "short": "DoorDash order DD-1234 from Pokeworks, November 1, 2026: some items were missing. I was offered app credit only. That's not what I ordered, so the wrong order was delivered. Under § 22599.2(a), I'm owed a full refund of $42.50, including all taxes, fees, and gratuities. At minimum, § 22599.2(d) requires a refund of the missing items with their taxes, fees, and tip, and the option to lower the tip I added before delivery. Send the refund to my original payment method, not app credit (§ 22599.2(e)). Your automated support couldn't resolve this. Please connect me with a person (§ 22599.1(f)). Please confirm the refund today.",
      }
    `);
  });

  it("settled case: order never arrived, nothing optional", () => {
    const incident: Incident = {
      platform: "ubereats",
      issues: ["not_delivered"],
      orderDate: "2026-11-01",
      orderTotal: 31.0,
      refundStatus: "none",
    };
    const kit = generateKit(incident);
    expect(messageTexts(kit)).toMatchInlineSnapshot(`
      {
        "agDescription": "On November 1, 2026 I ordered from a restaurant through Uber Eats. The total charged was $31.00.

      What went wrong: the order never arrived.

      I haven't received any refund.

      The order was not delivered. § 22599.2(a) says: “A food delivery platform shall provide a full refund, including all taxes, commissions, fees, and gratuities, to the customer if an order is not delivered or the wrong order is delivered, unless the food delivery platform determines that the customer was responsible for the nondelivery or finds evidence indicating the refund request may be fraudulent.” That means I'm owed a full refund of $31.00, including all taxes, commissions, fees, and gratuities.

      Send the refund to my original payment method, not app credit (§ 22599.2(e)).

      The rules that apply: § 22599.2(a): Full refund, including all taxes, commissions, fees and gratuities, when an order is not delivered or the wrong order is delivered, unless the platform determines the customer was responsible for the nondelivery or finds evidence the request may be fraudulent. § 22599.2(e): Along with any other refund options (credits stay allowed), the platform must provide a mechanism to request that the refund go back to the original method of payment.",
        "agResolution": "Full refund of $31.00 with fees and tip, to my original payment method, not app credit.",
        "asks": [
          {
            "basis": "§ 22599.2(a)",
            "issue": "not_delivered",
            "request": "a full refund, including all taxes, commissions, fees, and gratuities, to my original payment method",
            "settled": true,
          },
        ],
        "checklist": [
          "Order confirmation: a screenshot of the order in the app, showing the order number, restaurant, date and total.",
          "Itemized receipt: a screenshot showing each menu price, each fee, and the tip.",
          "Delivery status: a screenshot of the tracking or 'delivered' notice with its timestamp, plus anything showing you were at the delivery address at that time.",
          "Remove personal and confidential information from every file before you upload it.",
        ],
        "citations": [
          "§ 22599.2(a)",
          "§ 22599.2(e)",
        ],
        "demandLetter": "[Your name]
      [Your street address]
      [City, state ZIP]
      [Date]

      Uber Eats
      Uber Technologies, Inc., Attn: Legal Department, 1725 3rd Street, San Francisco, CA 94158

      Re: Demand for refund, Uber Eats order placed November 1, 2026

      To whom it may concern:

      On November 1, 2026 I ordered from a restaurant through Uber Eats. The total charged was $31.00.

      What went wrong: the order never arrived.

      I haven't received any refund.

      The order was not delivered. § 22599.2(a) says: “A food delivery platform shall provide a full refund, including all taxes, commissions, fees, and gratuities, to the customer if an order is not delivered or the wrong order is delivered, unless the food delivery platform determines that the customer was responsible for the nondelivery or finds evidence indicating the refund request may be fraudulent.” That means I'm owed a full refund of $31.00, including all taxes, commissions, fees, and gratuities.

      I demand payment of $31.00 to my original payment method, not app credit (§ 22599.2(e)), within 14 days of the date of this letter.

      If this is not resolved, I will file my claim in California small claims court, which your own terms allow for individual claims.

      Sincerely,
      [Your name]",
        "estimate": null,
        "long": "Subject: Refund demand, Uber Eats order

      Uber Eats support,

      On November 1, 2026 I ordered from a restaurant through Uber Eats. The total charged was $31.00.

      What went wrong: the order never arrived.

      The order was not delivered. § 22599.2(a) says: “A food delivery platform shall provide a full refund, including all taxes, commissions, fees, and gratuities, to the customer if an order is not delivered or the wrong order is delivered, unless the food delivery platform determines that the customer was responsible for the nondelivery or finds evidence indicating the refund request may be fraudulent.” That means I'm owed a full refund of $31.00, including all taxes, commissions, fees, and gratuities.

      I haven't received any refund. Send the refund to my original payment method, not app credit (§ 22599.2(e)).

      Please confirm the refund within 5 business days.",
        "short": "Uber Eats order, November 1, 2026: the order never arrived. Under § 22599.2(a), I'm owed a full refund of $31.00, including all taxes, fees, and gratuities. Send the refund to my original payment method, not app credit (§ 22599.2(e)). Please confirm the refund today.",
      }
    `);
  });

  it("not covered: quality problem with no legal citation", () => {
    const incident: Incident = {
      platform: "grubhub",
      issues: ["not_covered"],
      orderDate: "2026-11-01",
      orderTotal: 27.75,
      refundStatus: "none",
    };
    const kit = generateKit(incident);
    expect(messageTexts(kit)).toMatchInlineSnapshot(`
      {
        "agDescription": "On November 1, 2026 I ordered from a restaurant through Grubhub. The total charged was $27.75.

      What went wrong: the order had quality problems.

      I haven't received any refund.

      This order was not usable as delivered. Under your own policy, please refund $27.75.

      Send the refund to my original payment method, not app credit.",
        "agResolution": "Refund of $27.75 under the app's own policy, to my original payment method.",
        "asks": [
          {
            "issue": "not_covered",
            "request": "a refund under your own policy for what went wrong, paid to my original payment method",
            "settled": false,
          },
        ],
        "checklist": [
          "Order confirmation: a screenshot of the order in the app, showing the order number, restaurant, date and total.",
          "Itemized receipt: a screenshot showing each menu price, each fee, and the tip.",
          "Remove personal and confidential information from every file before you upload it.",
        ],
        "citations": [],
        "demandLetter": "[Your name]
      [Your street address]
      [City, state ZIP]
      [Date]

      Grubhub
      Grubhub, Attn: Dispute Resolutions, 222 W Merchandise Mart Plaza, Suite 800, Chicago, IL 60654

      Re: Demand for refund, Grubhub order placed November 1, 2026

      To whom it may concern:

      On November 1, 2026 I ordered from a restaurant through Grubhub. The total charged was $27.75.

      What went wrong: the order had quality problems.

      I haven't received any refund.

      This order was not usable as delivered. Under your own policy, please refund $27.75.

      I demand payment of $27.75 to my original payment method, not app credit, within 14 days of the date of this letter.

      If this is not resolved, I will file my claim in California small claims court, which your own terms allow for individual claims.

      Sincerely,
      [Your name]",
        "estimate": null,
        "long": "Subject: Refund demand, Grubhub order

      Grubhub support,

      On November 1, 2026 I ordered from a restaurant through Grubhub. The total charged was $27.75.

      What went wrong: the order had quality problems.

      This order was not usable as delivered. Under your own policy, please refund $27.75.

      I haven't received any refund. Send the refund to my original payment method, not app credit.

      Please confirm the refund within 5 business days.",
        "short": "Grubhub order, November 1, 2026: the order had quality problems. Please refund $27.75 under your own policy for this order. Send the refund to my original payment method, not app credit. Please confirm the refund today.",
      }
    `);
  });

  it("snapshots quote § 22599.2(a) exactly as law.ts has it", () => {
    const kit = generateKit({
      platform: "doordash",
      issues: ["wrong_order"],
      orderDate: "2026-11-01",
      orderTotal: 20,
      refundStatus: "none",
    });
    const statute = statuteRules.find((rule) => rule.id === "bpc-22599-2-a");
    expect(statute).toBeTruthy();
    const body = statute?.verbatimText.replace(/^\([a-z0-9]+\)\s*/, "");
    expect(kit.platformRequest.long.text).toContain(`\u201C${body}\u201D`);
    expect(kit.demandLetter.text).toContain(`\u201C${body}\u201D`);
  });
});
