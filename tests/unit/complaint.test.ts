import { describe, expect, it } from "vitest";
import { agFormFields } from "../../src/data/destinations";
import { readings, statuteRules } from "../../src/data/law";
import { getPlatform } from "../../src/data/platforms";
import { generateKit, ISSUE_ORDER } from "../../src/lib/complaint/generate";
import { enTemplates } from "../../src/lib/complaint/templates/en";
import { templateFiles } from "../../src/lib/complaint/templates/index";
import type {
  ComplaintKit,
  ContactInfo,
  Incident,
  Issue,
  PlatformId,
} from "../../src/lib/complaint/types";

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

function makeIncident(overrides: Partial<Incident> = {}): Incident {
  return {
    platform: "doordash",
    issues: ["missing_items"],
    orderDate: "2026-11-01",
    orderTotal: 42.5,
    refundStatus: "none",
    ...overrides,
  };
}

const ALL_ISSUES: Issue[] = [
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

const PLATFORMS: PlatformId[] = ["doordash", "ubereats", "grubhub", "other"];

const ARGUED: ReadonlySet<Issue> = new Set([
  "wrong_items",
  "missing_items",
  "unusable_items",
]);
const SETTLED: ReadonlySet<Issue> = new Set([
  "not_delivered",
  "wrong_order",
  "credits_only",
  "no_human",
]);

function collectStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value))
    value.forEach((item) => collectStrings(item, out));
  else if (value && typeof value === "object")
    Object.values(value).forEach((item) => collectStrings(item, out));
  return out;
}

function messageTexts(kit: ComplaintKit): Record<string, string> {
  const description = kit.agForm.fields.find(
    (field) => field.label === "Complaint description",
  );
  const resolution = kit.agForm.fields.find(
    (field) =>
      field.label ===
      "Briefly state what you would consider a reasonable resolution from the company",
  );
  return {
    short: kit.platformRequest.short.text,
    long: kit.platformRequest.long.text,
    demandLetter: kit.demandLetter.text,
    agDescription: description?.value.text ?? "",
    agResolution: resolution?.value.text ?? "",
  };
}

const verbatimCorpus = statuteRules.map((rule) => rule.verbatimText);

function expectHonestKit(kit: ComplaintKit): void {
  const strings = collectStrings(kit);
  for (const text of strings) {
    expect(text, "no em dashes anywhere in the kit").not.toContain("\u2014");
    expect(text, "no SSN or bank account mentions").not.toMatch(
      /social security|\bssn\b|bank account|routing number/i,
    );
  }
  for (const text of strings) {
    const quotes = text.match(/\u201C([^\u201D]+)\u201D/g) ?? [];
    for (const quote of quotes) {
      const body = quote.slice(1, -1);
      expect(
        verbatimCorpus.some((verbatim) => verbatim.includes(body)),
        `quoted statute text must appear verbatim in law.ts: ${body}`,
      ).toBe(true);
    }
  }
}

function expectValidCitations(kit: ComplaintKit): void {
  for (const citation of kit.citations) {
    const statute = statuteRules.find((rule) => rule.id === citation.id);
    const reading = readings.find((rule) => rule.id === citation.id);
    const source = statute ?? reading;
    expect(source, `citation ${citation.id} exists in law data`).toBeTruthy();
    if (statute) expect(citation.argued).toBe(false);
    if (reading) {
      expect(citation.argued).toBe(true);
      expect(citation.floorSection).toBe(reading.floorSection);
    }
    expect(citation.section).toBe(source?.section);
    expect(citation.sourceUrl).toBe(source?.sourceUrl);
    expect(citation.verifiedOn).toBe(source?.verifiedOn);
  }
}

function expectAgFieldsWellFormed(kit: ComplaintKit): void {
  const orders = agFormFields.map((field) => field.order);
  let previous = 0;
  for (const field of kit.agForm.fields) {
    const match = agFormFields.find(
      (form) => form.label === field.label && form.order > previous,
    );
    expect(match, `label "${field.label}" appears on the AG form`).toBeTruthy();
    expect(field.order).toBeGreaterThan(previous);
    expect(field.order).toBe(match?.order);
    previous = field.order;
    expect(orders).toContain(field.order);
    expect(field.value.text.length).toBeGreaterThan(0);
  }
}

describe("generateKit: issue by platform matrix", () => {
  for (const platform of PLATFORMS) {
    for (const issue of ALL_ISSUES) {
      it(`${issue} on ${platform}`, () => {
        const incident = makeIncident({
          platform,
          issues: [issue],
          ...(platform === "other" ? { otherPlatformName: "ChowNow" } : {}),
          ...(ARGUED.has(issue) ? { affectedItemsTotal: 18.25 } : {}),
          orderNumber: "DD-1234",
          restaurant: "Pokeworks",
        });
        const kit = generateKit(incident, CONTACT);

        expect(kit.outgoingLocale).toBe("en");
        expect(kit.asks).toHaveLength(1);
        const ask = kit.asks[0];
        expect(ask.issue).toBe(issue);
        expect(ask.request).toBe(enTemplates.askRequest[issue]);
        if (ARGUED.has(issue)) {
          expect(ask.settled).toBe(false);
          expect(ask.basis).toBe("§ 22599.2(a)");
          expect(ask.fallback).toBeTruthy();
          expect(ask.fallback).toContain("§ 22599.2(d)");
          expect(kit.refundEstimate).toBeDefined();
          expect(kit.refundEstimate?.amount).toBe(18.25);
        }
        if (SETTLED.has(issue)) {
          expect(ask.settled).toBe(true);
          expect(ask.fallback).toBeUndefined();
        }
        if (issue === "not_covered") {
          expect(ask.basis).toBeUndefined();
          expect(ask.settled).toBe(false);
          expect(kit.refundEstimate).toBeUndefined();
        }
        if (issue === "refund_denied") {
          expect(ask.basis).toBeUndefined();
          expect(ask.settled).toBe(false);
        }

        const texts = messageTexts(kit);
        for (const [name, text] of Object.entries(texts)) {
          expect(text.length, `${name} is non-empty`).toBeGreaterThan(0);
          if (ARGUED.has(issue)) {
            expect(text, `${name} states the floor for argued asks`).toContain(
              "§ 22599.2(d)",
            );
          }
        }
        if (issue === "not_covered") {
          expect(texts.short).not.toContain("22599");
        }
        if (issue === "missing_items") {
          expect(texts.short).toContain("lower the tip");
        }
        expect(
          texts.short.length,
          "short version fits a chat box",
        ).toBeLessThanOrEqual(600);

        expectHonestKit(kit);
        if (issue === "not_covered") {
          expect(kit.citations).toHaveLength(0);
        } else {
          expect(kit.citations.length).toBeGreaterThan(0);
        }
        expectValidCitations(kit);
        expectAgFieldsWellFormed(kit);

        const companyName = kit.agForm.fields.find(
          (field) => field.label === "Company Name",
        );
        if (platform === "other") {
          expect(companyName?.value.text).toBe("ChowNow");
          expect(kit.platformRequest.supportUrl).toBe("");
          expect(kit.platformRequest.short.text).toContain("ChowNow");
        } else {
          expect(companyName?.value.text).toBe(getPlatform(platform).legalName);
          expect(kit.platformRequest.supportUrl).toBe(
            getPlatform(platform).supportUrl,
          );
        }
      });
    }
  }
});

describe("generateKit: floors and firmness for argued asks", () => {
  for (const issue of [
    "wrong_items",
    "missing_items",
    "unusable_items",
  ] as const) {
    it(`${issue}: settled false, floor cited, firm claim`, () => {
      const kit = generateKit(
        makeIncident({ issues: [issue], affectedItemsTotal: 18.25 }),
        CONTACT,
      );
      const ask = kit.asks[0];
      expect(ask.settled).toBe(false);
      expect(ask.fallback).toContain("§ 22599.2(d)");
      const reading = readings.find((r) =>
        kit.citations.some((c) => c.id === r.id),
      );
      expect(reading).toBeTruthy();
      const texts = messageTexts(kit);
      expect(texts.short).toContain("§ 22599.2(a)");
      expect(texts.short).toContain("original payment method");
      expect(texts.long).toContain("§ 22599.2(a) says:");
      expect(texts.demandLetter).toContain("14 days");
      expect(texts.demandLetter).toContain("small claims");
    });
  }

  it("settled issues never mention the floor section", () => {
    for (const issue of ["not_delivered", "wrong_order"] as const) {
      const kit = generateKit(makeIncident({ issues: [issue] }), CONTACT);
      const texts = messageTexts(kit);
      for (const text of Object.values(texts)) {
        expect(text).not.toContain("§ 22599.2(d)");
      }
      expect(kit.asks[0].settled).toBe(true);
    }
  });

  it("quotes § 22599.2(a) verbatim from law.ts in the long request", () => {
    const kit = generateKit(makeIncident({ issues: ["wrong_items"] }), CONTACT);
    const statute = statuteRules.find((rule) => rule.id === "bpc-22599-2-a");
    expect(statute).toBeTruthy();
    const body = statute?.verbatimText.replace(/^\([a-z0-9]+\)\s*/, "");
    expect(kit.platformRequest.long.text).toContain(`\u201C${body}\u201D`);
  });

  it("pre-empts the nondelivery exception with facts the customer confirmed", () => {
    const kit = generateKit(
      makeIncident({ issues: ["not_delivered"], atAddressConfirmed: true }),
      CONTACT,
    );
    const texts = messageTexts(kit);
    expect(texts.long).toContain("I was at the delivery address");
    expect(texts.agDescription).toContain("I was at the delivery address");
  });

  it("never states the at-address fact unless the customer confirmed it", () => {
    const kit = generateKit(
      makeIncident({ issues: ["not_delivered"] }),
      CONTACT,
    );
    const texts = messageTexts(kit);
    expect(texts.long).not.toContain("I was at the delivery address");
    expect(texts.agDescription).not.toContain("I was at the delivery address");
    expect(kit.demandLetter.text).not.toContain(
      "I was at the delivery address",
    );
  });
});

describe("generateKit: refund statuses", () => {
  it("none: no refund received yet", () => {
    const kit = generateKit(makeIncident({ refundStatus: "none" }), CONTACT);
    expect(kit.platformRequest.long.text).toContain(
      "I haven't received any refund.",
    );
  });

  it("credits: app credit refused, original payment method demanded", () => {
    const kit = generateKit(
      makeIncident({
        issues: ["missing_items", "credits_only"],
        refundStatus: "credits",
      }),
      CONTACT,
    );
    const texts = messageTexts(kit);
    expect(texts.short).toContain("app credit only");
    expect(texts.short).toContain("§ 22599.2(e)");
    const creditsAsk = kit.asks.find((ask) => ask.issue === "credits_only");
    expect(creditsAsk?.settled).toBe(true);
    expect(creditsAsk?.basis).toBe("§ 22599.2(e)");
  });

  it("partial: refunded amount and remaining dispute stated", () => {
    const kit = generateKit(
      makeIncident({ refundStatus: "partial", refundedAmount: 10 }),
      CONTACT,
    );
    const texts = messageTexts(kit);
    expect(texts.short).toContain("$42.50");
    expect(texts.long).toContain("$10.00");
    expect(texts.long).toContain("The rest is still owed.");
    const dispute = kit.agForm.fields.find(
      (field) => field.label === "Amount in dispute",
    );
    // The AG form's amount field is numeric, so no currency symbol.
    expect(dispute?.value.text).toBe("32.50");
  });

  it("full: no refund claim, facts only", () => {
    const kit = generateKit(
      makeIncident({
        issues: ["missing_items", "no_human"],
        refundStatus: "full",
      }),
      CONTACT,
    );
    const texts = messageTexts(kit);
    expect(texts.short).not.toContain("I'm owed");
    expect(texts.long).toContain("I received a full refund of $42.50.");
    expect(texts.agResolution).toContain("natural person");
    expect(texts.short).not.toContain("§ 22599.2(e)");
  });
});

describe("generateKit: optional fields and contact info", () => {
  it("works with only the required incident fields", () => {
    const kit = generateKit({
      platform: "doordash",
      issues: ["wrong_order"],
      orderDate: "2026-11-01",
      orderTotal: 42.5,
      refundStatus: "none",
    });
    expect(kit.asks).toHaveLength(1);
    expect(kit.refundEstimate).toBeUndefined();
    const labels = kit.agForm.fields.map((field) => field.label);
    expect(labels).not.toContain("First Name");
    expect(kit.platformRequest.long.text).toContain("a restaurant");
    expect(kit.demandLetter.text).toContain("[Your name]");
    expectHonestKit(kit);
  });

  it("fills the AG consumer block from contact info", () => {
    const kit = generateKit(makeIncident(), CONTACT);
    const byLabel = (label: string) =>
      kit.agForm.fields.find((field) => field.label === label)?.value.text;
    expect(byLabel("First Name")).toBe("Maria");
    expect(byLabel("Last Name")).toBe("Lopez");
    expect(byLabel("Address Line")).toBe("1234 Palm Ave");
    expect(byLabel("Address Line 2")).toBe("Apt 5");
    expect(byLabel("City")).toBe("Los Angeles");
    expect(byLabel("Zip Code")).toBe("90001");
    expect(byLabel("Email Address")).toBe("maria@example.com");
    expect(kit.agForm.fields.find((f) => f.order === 12)?.value.text).toBe(
      "213",
    );
    expect(kit.agForm.fields.find((f) => f.order === 13)?.value.text).toBe(
      "5550142",
    );
    expect(kit.agForm.fields.find((f) => f.order === 14)?.value.text).toBe(
      "No",
    );
  });

  it("answers the contacted-company block from incident data", () => {
    const kit = generateKit(
      makeIncident({
        contactedPlatform: {
          date: "2026-11-02",
          method: "chat",
          result: "The bot offered credit and closed the chat.",
        },
      }),
      CONTACT,
    );
    const byOrder = (order: number) =>
      kit.agForm.fields.find((field) => field.order === order)?.value.text;
    expect(byOrder(29)).toBe("Yes");
    expect(byOrder(30)).toBe("November 2, 2026");
    expect(byOrder(35)).toBe("Yes");
    expect(byOrder(36)).toBe("Chat");
    expect(byOrder(38)).toBe("The bot offered credit and closed the chat.");
    expect(kit.agForm.formUrl).toBe(
      "https://oag.ca.gov/contact/consumer-complaint-against-business-or-company",
    );
  });

  it("marks phone contact with the phone checkbox", () => {
    const kit = generateKit(
      makeIncident({
        contactedPlatform: {
          date: "2026-11-02",
          method: "phone",
          result: "No refund.",
        },
      }),
      CONTACT,
    );
    const orders = kit.agForm.fields.map((field) => field.order);
    expect(orders).toContain(33);
    expect(orders).not.toContain(35);
  });
});

describe("generateKit: issue ordering and structure", () => {
  it("orders asks canonically and drops duplicates", () => {
    const kit = generateKit(
      makeIncident({ issues: ["no_human", "missing_items", "no_human"] }),
      CONTACT,
    );
    expect(kit.asks.map((ask) => ask.issue)).toEqual([
      "missing_items",
      "no_human",
    ]);
  });

  it("derives the refund_denied basis from delivery issues", () => {
    const settled = generateKit(
      makeIncident({ issues: ["not_delivered", "refund_denied"] }),
      CONTACT,
    );
    const settledAsk = settled.asks.find(
      (ask) => ask.issue === "refund_denied",
    );
    expect(settledAsk?.basis).toBe("§ 22599.2(a)");
    expect(settledAsk?.settled).toBe(true);

    const argued = generateKit(
      makeIncident({ issues: ["missing_items", "refund_denied"] }),
      CONTACT,
    );
    const arguedAsk = argued.asks.find((ask) => ask.issue === "refund_denied");
    expect(arguedAsk?.basis).toBe("§ 22599.2(a)");
    expect(arguedAsk?.settled).toBe(false);
  });

  it("exposes the canonical issue order for the wizard", () => {
    expect(ISSUE_ORDER).toHaveLength(9);
    expect(new Set(ISSUE_ORDER).size).toBe(9);
  });

  it("lists every destination except the AG online form", () => {
    const kit = generateKit(makeIncident(), CONTACT);
    const ids = kit.otherDestinations.map((destination) => destination.id);
    expect(ids).not.toContain("ca-ag-complaint-form");
    expect(ids).toContain("ftc-reportfraud");
    expect(ids).toContain("ca-courts-small-claims");
  });

  it("tailors the evidence checklist to the issues", () => {
    const kit = generateKit(
      makeIncident({ issues: ["missing_items", "no_human"] }),
      CONTACT,
    );
    const joined = kit.evidenceChecklist.join("\n");
    expect(joined).toContain("missing items");
    expect(joined).toContain("automated help stopped");
    expect(joined).toContain("Remove personal and confidential information");
  });

  it("splits platform phones into area code and number", () => {
    const grubhub = generateKit(makeIncident({ platform: "grubhub" }), CONTACT);
    expect(grubhub.agForm.fields.find((f) => f.order === 22)?.value.text).toBe(
      "877",
    );
    expect(grubhub.agForm.fields.find((f) => f.order === 23)?.value.text).toBe(
      "5857878",
    );
    const uber = generateKit(makeIncident({ platform: "ubereats" }), CONTACT);
    expect(uber.agForm.fields.some((field) => field.order === 22)).toBe(false);
  });
});

describe("generateKit: locales", () => {
  it("defaults to English with no translation fields", () => {
    const kit = generateKit(makeIncident(), CONTACT);
    expect(kit.outgoingLocale).toBe("en");
    expect(kit.platformRequest.short.translation).toBeUndefined();
    expect(kit.demandLetter.translation).toBeUndefined();
  });

  it("falls back cleanly when the UI locale has no templates", () => {
    const kit = generateKit(makeIncident(), CONTACT, {
      uiLocale: "es",
      outgoingLocale: "en",
    });
    expect(kit.platformRequest.short.translation).toBeUndefined();
    expect(kit.platformRequest.short.text).toContain("missing");
    expectHonestKit(kit);
  });

  it("renders outgoing text in the outgoing locale with English fallback", () => {
    const kit = generateKit(makeIncident(), CONTACT, {
      uiLocale: "es",
      outgoingLocale: "es",
    });
    expect(kit.outgoingLocale).toBe("es");
    expect(kit.platformRequest.short.text).toContain("§ 22599.2(a)");
  });

  it("adds side-by-side translations when UI templates exist", () => {
    templateFiles.es = {
      shortRequest: (ctx) => `ES ${enTemplates.shortRequest(ctx)}`,
      longRequest: (ctx) => `ES ${enTemplates.longRequest(ctx)}`,
      agDescription: (ctx) => `ES ${enTemplates.agDescription(ctx)}`,
      agResolution: (ctx) => `ES ${enTemplates.agResolution(ctx)}`,
      demandLetter: (ctx) => `ES ${enTemplates.demandLetter(ctx)}`,
      agLabels: { "Complaint description": "Descripción de la queja" },
    };
    try {
      const kit = generateKit(
        makeIncident({ affectedItemsTotal: 18.25 }),
        CONTACT,
        { uiLocale: "es", outgoingLocale: "en" },
      );
      expect(kit.platformRequest.short.translation).toMatch(/^ES /);
      // The translation formats money and dates for the UI locale.
      expect(kit.platformRequest.short.translation).toContain("42,50");
      expect(kit.platformRequest.short.translation).toContain(
        "1 de noviembre de 2026",
      );
      expect(kit.demandLetter.translation).toMatch(/^ES /);
      const description = kit.agForm.fields.find(
        (field) => field.label === "Complaint description",
      );
      expect(description?.labelTranslation).toBe("Descripción de la queja");
      expect(description?.value.translation).toMatch(/^ES /);
      // Ask wording falls back to English per key.
      expect(kit.asks[0].request).toBe(enTemplates.askRequest.missing_items);
      // User-facing strings fall back to English per key when the locale
      // template omits them.
      const englishKit = generateKit(
        makeIncident({ affectedItemsTotal: 18.25 }),
        CONTACT,
      );
      expect(kit.evidenceChecklist).toEqual(englishKit.evidenceChecklist);
      expect(kit.refundEstimate?.note).toContain("Estimate:");
      expect(kit.refundEstimate?.note).toContain("18,25");
      expectHonestKit(kit);
    } finally {
      delete templateFiles.es;
    }
  });

  it("never ships translations identical to the outgoing text", () => {
    const englishShort = generateKit(makeIncident(), CONTACT).platformRequest
      .short.text;
    templateFiles.vi = {
      shortRequest: () => englishShort,
    };
    try {
      const kit = generateKit(makeIncident(), CONTACT, {
        uiLocale: "vi",
        outgoingLocale: "en",
      });
      expect(kit.platformRequest.short.translation).toBeUndefined();
    } finally {
      delete templateFiles.vi;
    }
  });
});
