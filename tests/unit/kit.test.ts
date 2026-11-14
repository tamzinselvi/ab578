import { describe, expect, it } from "vitest";
import { agFormFields, destinations } from "../../src/data/destinations";
import { generateKit } from "../../src/lib/complaint/generate";
import type {
  ComplaintKit,
  ContactInfo,
  Incident,
  LocalizedText,
} from "../../src/lib/complaint/types";
import {
  agMailInForm,
  askKind,
  buildRecordText,
  cardDestinations,
  floorLine,
  kitHasTranslation,
  kitPlatformName,
  languageName,
  outgoingText,
  pageLocale,
  recordFilename,
  sideText,
} from "../../src/components/kit/derive";

const CONTACT: ContactInfo = {
  firstName: "Maria",
  lastName: "Lopez",
  street: "1234 Palm Ave",
  city: "Los Angeles",
  state: "CA",
  zip: "90001",
};

function makeIncident(overrides: Partial<Incident> = {}): Incident {
  return {
    platform: "doordash",
    issues: ["missing_items", "no_human"],
    orderDate: "2026-11-01",
    orderTotal: 42.5,
    affectedItemsTotal: 18.25,
    refundStatus: "none",
    ...overrides,
  };
}

function findDestination(id: string) {
  const found = destinations.find((destination) => destination.id === id);
  if (!found) throw new Error(`missing destination ${id}`);
  return found;
}

describe("pageLocale", () => {
  it("maps the html lang attribute onto site locales", () => {
    expect(pageLocale("en")).toBe("en");
    expect(pageLocale("es")).toBe("es");
    expect(pageLocale("zh-Hant")).toBe("zh-hant");
    expect(pageLocale("vi")).toBe("vi");
  });

  it("falls back to English for anything unrecognized", () => {
    expect(pageLocale("fr")).toBe("en");
    expect(pageLocale("zh")).toBe("en");
    expect(pageLocale("")).toBe("en");
    expect(pageLocale(undefined)).toBe("en");
  });
});

describe("kitPlatformName", () => {
  it("resolves the platform from the kit's verified support URL", () => {
    const kit = generateKit(makeIncident());
    expect(kitPlatformName(kit, "en")).toBe("DoorDash");
  });

  it("falls back to a generic name for the free-text other platform", () => {
    const kit = generateKit(
      makeIncident({
        platform: "other",
        otherPlatformName: "HungryNow",
      }),
    );
    expect(kit.platformRequest.supportUrl).toBe("");
    expect(kitPlatformName(kit, "en")).toBe("the delivery app");
  });
});

describe("outgoing and side text", () => {
  const both: LocalizedText = {
    text: "Refund please",
    translation: "Reembolso",
  };
  const englishOnly: LocalizedText = { text: "1234 Palm Ave" };

  it("sends the outgoing text until the user toggles", () => {
    expect(outgoingText(both, false)).toBe("Refund please");
    expect(sideText(both, false)).toBe("Reembolso");
  });

  it("swaps to the translation after the toggle", () => {
    expect(outgoingText(both, true)).toBe("Reembolso");
    expect(sideText(both, true)).toBe("Refund please");
  });

  it("never swaps when no translation exists", () => {
    expect(outgoingText(englishOnly, true)).toBe("1234 Palm Ave");
    expect(sideText(englishOnly, true)).toBeUndefined();
  });
});

describe("kitHasTranslation", () => {
  it("is false for an English-only kit", () => {
    expect(kitHasTranslation(generateKit(makeIncident(), CONTACT))).toBe(false);
  });

  it("is true once any message carries a translation", () => {
    const kit = generateKit(makeIncident(), CONTACT);
    const stamped: ComplaintKit = {
      ...kit,
      demandLetter: { ...kit.demandLetter, translation: "ES" },
    };
    expect(kitHasTranslation(stamped)).toBe(true);
  });
});

describe("languageName", () => {
  it("uses each locale's own label", () => {
    expect(languageName("en")).toBe("English");
    expect(languageName("es")).toBe("Español");
    expect(languageName("ko")).toBe("한국어");
  });
});

describe("askKind", () => {
  it("separates settled, argued and plain asks", () => {
    const kit = generateKit(makeIncident());
    const byIssue = new Map(kit.asks.map((ask) => [ask.issue, ask]));
    expect(byIssue.get("no_human")?.settled).toBe(true);
    expect(askKind(byIssue.get("no_human")!)).toBe("settled");
    expect(askKind(byIssue.get("missing_items")!)).toBe("argued");

    const plain = generateKit(
      makeIncident({ issues: ["not_covered"], affectedItemsTotal: undefined }),
    ).asks[0];
    expect(plain.basis).toBeUndefined();
    expect(askKind(plain)).toBe("plain");
  });
});

describe("floorLine", () => {
  it("uses the estimate as the floor amount when present", () => {
    const kit = generateKit(makeIncident());
    const argued = kit.asks.find((ask) => !ask.settled && ask.basis)!;
    expect(floorLine(argued, kit, "en")).toBe(
      "At minimum, they owe you $18.25",
    );
  });

  it("falls back to the engine's floor wording without an estimate", () => {
    const kit = generateKit(makeIncident({ affectedItemsTotal: undefined }));
    expect(kit.refundEstimate).toBeUndefined();
    const argued = kit.asks.find((ask) => !ask.settled && ask.basis)!;
    expect(argued.fallback).toContain("§ 22599.2(d)");
    expect(floorLine(argued, kit, "en")).toBe(`At minimum: ${argued.fallback}`);
  });

  it("formats the floor in the UI locale", () => {
    const kit = generateKit(makeIncident());
    const argued = kit.asks.find((ask) => !ask.settled && ask.basis)!;
    expect(floorLine(argued, kit, "es")).toContain("18,25");
  });

  it("shows no floor for settled asks", () => {
    const kit = generateKit(makeIncident());
    const settled = kit.asks.find((ask) => ask.settled)!;
    expect(floorLine(settled, kit, "en")).toBeUndefined();
  });
});

describe("agMailInForm", () => {
  it("finds the mail-in PDF for Spanish, Chinese and Vietnamese", () => {
    expect(agMailInForm("es")?.url).toBe(
      findDestination("ca-ag-complaint-form-pdf-es").url,
    );
    expect(agMailInForm("zh-hant")?.id).toBe("ca-ag-complaint-form-pdf-zh");
    expect(agMailInForm("zh-hans")?.id).toBe("ca-ag-complaint-form-pdf-zh");
    expect(agMailInForm("vi")?.id).toBe("ca-ag-complaint-form-pdf-vi");
  });

  it("stays hidden for English, Tagalog and Korean", () => {
    expect(agMailInForm("en")).toBeUndefined();
    expect(agMailInForm("tl")).toBeUndefined();
    expect(agMailInForm("ko")).toBeUndefined();
  });
});

describe("cardDestinations", () => {
  it("picks the DA roster, FTC and small claims guide in order", () => {
    const picked = cardDestinations(destinations);
    expect(picked.map((destination) => destination.id)).toEqual([
      "cdaa-da-roster",
      "ftc-reportfraud",
      "ca-courts-small-claims",
    ]);
  });
});

describe("buildRecordText", () => {
  const kit = generateKit(makeIncident(), CONTACT);
  const record = buildRecordText(kit, "en", "2026-11-14");

  it("carries the date, the asks and the outgoing messages", () => {
    expect(record).toContain("Saved on November 14, 2026");
    expect(record).toContain(kit.asks[0].request);
    expect(record).toContain("At minimum, they owe you $18.25");
    expect(record).toContain(kit.platformRequest.short.text);
    expect(record).toContain(kit.platformRequest.long.text);
  });

  it("carries every AG answer under its exact form label, in form order", () => {
    const orders = kit.agForm.fields.map((field) => field.order);
    expect(orders).toEqual([...orders].sort((a, b) => a - b));
    for (const field of kit.agForm.fields) {
      const formField = agFormFields.find(
        (entry) => entry.order === field.order,
      );
      expect(formField?.label).toBe(field.label);
      expect(record).toContain(`${field.label}: ${field.value.text}`);
    }
    expect(record).toContain(`Form: ${kit.agForm.formUrl}`);
  });

  it("carries destinations, citations and the disclaimer", () => {
    expect(record).toContain(findDestination("ftc-reportfraud").url);
    expect(record).toContain("§ 22599.2");
    expect(record).toContain("Not legal advice");
  });

  it("contains no em dash in any language", () => {
    expect(record.includes("\u2014")).toBe(false);
  });

  it("names the file with the ISO date", () => {
    expect(recordFilename("2026-11-14")).toBe(
      "ab578-complaint-kit-2026-11-14.txt",
    );
  });
});
