import { describe, expect, it } from "vitest";
import { agFormFields, agFormInputs } from "../../src/data/destinations";
import {
  bookmarkletCode,
  bookmarkletHref,
  type BookmarkletMessages,
} from "../../src/lib/agfill/bookmarklet";
import {
  AGFILL_PREFIX,
  agFillPairs,
  buildAgFillPayload,
} from "../../src/lib/agfill/payload";
import { generateKit, ISSUE_ORDER } from "../../src/lib/complaint/generate";
import { AG_RESOLUTION_MAX } from "../../src/lib/complaint/templates/en";
import type {
  ContactInfo,
  Incident,
  PlatformId,
} from "../../src/lib/complaint/types";

const CONTACT: ContactInfo = {
  firstName: "Maria",
  lastName: "Lopez",
  street: "1234 Palm Ave",
  street2: "Apt 5",
  city: "Los Angeles",
  state: "CA",
  zip: "90001-1234",
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
    contactedPlatform: {
      date: "2026-11-02",
      method: "chat",
      result: "They offered $5 in app credit and ended the chat.",
    },
    ...overrides,
  };
}

const MESSAGES: BookmarkletMessages = {
  prompt: "Paste here",
  pasteLabel: "Paste box",
  wrongPage: "Wrong page",
  openForm: "Open form",
  notKit: "Not a kit",
  done: "Filled {count}",
  close: "Close",
};

function pairsFor(incident: Incident, contact?: ContactInfo) {
  const kit = generateKit(incident, contact);
  return new Map(agFillPairs(kit.agForm.fields));
}

describe("AG form input map", () => {
  it("only maps fields that exist on the form, with unique names", () => {
    const orders = new Set(agFormFields.map((field) => field.order));
    const names = new Set<string>();
    for (const [order, input] of Object.entries(agFormInputs)) {
      expect(orders.has(Number(order)), `order ${order}`).toBe(true);
      expect(names.has(input.name), input.name).toBe(false);
      names.add(input.name);
    }
  });

  it("never maps the affirmation, authorization or upload questions", () => {
    for (const order of [44, 45, 46, 47, 61, 62]) {
      expect(agFormInputs[order]).toBeUndefined();
    }
  });
});

describe("agFillPairs", () => {
  it("fills contact, company and complaint fields by their form names", () => {
    const pairs = pairsFor(makeIncident(), CONTACT);
    expect(pairs.get("submitted[enter_your_information][first_name]")).toBe(
      "Maria",
    );
    expect(pairs.get("submitted[enter_your_information][state]")).toBe("CA");
    expect(
      pairs.get("submitted[enter_your_information][confirm_email_address]"),
    ).toBe("maria@example.com");
    expect(pairs.get("submitted[enter_your_information][area_code]")).toBe(
      "213",
    );
    expect(pairs.get("submitted[enter_your_information][phone_number]")).toBe(
      "5550142",
    );
    expect(
      pairs.get(
        "submitted[business_information_complaint_against][company_name]",
      ),
    ).toBe("DoorDash, Inc.");
    expect(
      pairs.get(
        "submitted[business_information_complaint_against][company_address]",
      ),
    ).toBe("303 2nd Street, Suite 800");
    expect(
      pairs.get("submitted[complaint][complaint_description]"),
    ).toBeTruthy();
  });

  it("splits a ZIP+4 across the two boxes", () => {
    const pairs = pairsFor(makeIncident(), CONTACT);
    expect(pairs.get("submitted[enter_your_information][zip_code]")).toBe(
      "90001",
    );
    expect(pairs.get("submitted[enter_your_information][zip4]")).toBe("1234");
  });

  it("maps Yes/No answers to the radio values and puts choices first", () => {
    const kit = generateKit(makeIncident(), CONTACT);
    const pairs = agFillPairs(kit.agForm.fields);
    expect(new Map(pairs).get("submitted[complaint][contacte_company]")).toBe(
      "Y",
    );
    expect(
      new Map(pairs).get(
        "submitted[enter_your_information][submitting_on_behalf]",
      ),
    ).toBe("N");
    expect(
      new Map(pairs).get(
        "submitted[complaint][communication_means][select][select_or_other]",
      ),
    ).toBe("on");
    const firstText = pairs.findIndex(([name]) =>
      name.endsWith("[first_name]"),
    );
    const lastChoice = pairs.findIndex(([name]) =>
      name.endsWith("[select_or_other]"),
    );
    expect(lastChoice).toBeLessThan(firstText);
  });

  it("keeps every value within the form's maxlength", () => {
    const longResult = "x".repeat(400);
    const kit = generateKit(
      makeIncident({
        contactedPlatform: {
          date: "2026-11-02",
          method: "phone",
          result: longResult,
        },
      }),
      { ...CONTACT, street: "9".repeat(80) },
    );
    const byName = new Map(
      Object.values(agFormInputs).map((input) => [input.name, input]),
    );
    for (const [name, value] of agFillPairs(kit.agForm.fields)) {
      const max = byName.get(name)?.maxLength;
      if (max) expect(value.length, name).toBeLessThanOrEqual(max);
    }
  });

  it("works without contact details", () => {
    const pairs = pairsFor(makeIncident());
    expect(pairs.has("submitted[enter_your_information][first_name]")).toBe(
      false,
    );
    expect(
      pairs.get("submitted[complaint][reasonable_resolution]"),
    ).toBeTruthy();
  });
});

describe("AG resolution length", () => {
  const platforms: PlatformId[] = ["doordash", "ubereats", "grubhub", "other"];
  it(`stays within ${AG_RESOLUTION_MAX} characters for every issue mix`, () => {
    for (const platform of platforms) {
      for (const issue of ISSUE_ORDER) {
        for (const extra of [[], ["no_human"], ["credits_only", "no_human"]]) {
          const issues = Array.from(
            new Set([issue, ...extra]),
          ) as Incident["issues"];
          const kit = generateKit(
            makeIncident({
              platform,
              otherPlatformName: platform === "other" ? "FoodNow" : undefined,
              issues,
              orderTotal: 1234.56,
            }),
            CONTACT,
          );
          const field = kit.agForm.fields.find((f) => f.order === 28);
          expect(field?.value.text.length ?? 0).toBeLessThanOrEqual(
            AG_RESOLUTION_MAX,
          );
          expect(field?.value.text.length ?? 0).toBeGreaterThan(0);
        }
      }
    }
  });
});

describe("buildAgFillPayload", () => {
  it("is the prefix plus versioned JSON", () => {
    const kit = generateKit(makeIncident(), CONTACT);
    const payload = buildAgFillPayload(kit.agForm.fields);
    expect(payload.startsWith(AGFILL_PREFIX)).toBe(true);
    const data = JSON.parse(payload.slice(AGFILL_PREFIX.length));
    expect(data.v).toBe(1);
    expect(Array.isArray(data.f)).toBe(true);
    expect(data.f.length).toBeGreaterThan(15);
  });
});

describe("bookmarklet", () => {
  it("is valid JavaScript with the messages and form details filled in", () => {
    const code = bookmarkletCode(MESSAGES);
    expect(() => new Function(code)).not.toThrow();
    expect(code).toContain('"wrongPage":"Wrong page"');
    expect(code).toContain("webform-client-form-572546");
    expect(code).toContain(
      "https://oag.ca.gov/contact/consumer-complaint-against-business-or-company",
    );
    expect(code).not.toContain("__AB578_");
    expect(code.startsWith("(function")).toBe(true);
  });

  it("never submits the form or writes HTML", () => {
    const code = bookmarkletCode(MESSAGES);
    expect(code).not.toMatch(/\.submit\s*\(/);
    expect(code).not.toMatch(/innerHTML|outerHTML|insertAdjacentHTML/);
  });

  it("builds a javascript: link that decodes back to the code", () => {
    const href = bookmarkletHref(MESSAGES);
    expect(href.startsWith("javascript:")).toBe(true);
    expect(decodeURIComponent(href.slice("javascript:".length))).toBe(
      bookmarkletCode(MESSAGES),
    );
  });

  it("escapes messages safely", () => {
    const code = bookmarkletCode({ ...MESSAGES, close: 'Cl"ose </script>' });
    expect(() => new Function(code)).not.toThrow();
  });
});
