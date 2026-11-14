import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  clearAllWizardData,
  clearRememberedContact,
  CONTACT_STORAGE_KEY,
  DRAFT_STORAGE_KEY,
  draftToIncident,
  initialDraft,
  loadDraft,
  loadRememberedContact,
  parseISODate,
  parseMoney,
  saveDraft,
  saveRememberedContact,
  todayISO,
  withPreselectedPlatform,
} from "../../src/components/wizard/state";
import { ISSUE_ORDER } from "../../src/lib/complaint";
import { LANGUAGE_STORAGE_KEY } from "../../src/i18n/index";
import type { ContactInfo } from "../../src/lib/complaint";

/** Minimal localStorage stand-in; the site module only uses these methods.
 * Backed by a Map because entries come and go at runtime. */
interface TestStorage {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
  dump: () => Map<string, string>;
}

function stubStorage(): TestStorage {
  const store = new Map<string, string>();
  return {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => void store.set(key, value),
    removeItem: (key: string) => void store.delete(key),
    dump: () => store,
  };
}

let storage: TestStorage;

beforeEach(() => {
  storage = stubStorage();
  // The wizard module reads the global localStorage inside try/catch, so a
  // plain object global is enough in the node environment.
  Reflect.set(globalThis, "localStorage", storage);
});

afterEach(() => {
  Reflect.deleteProperty(globalThis, "localStorage");
});

const CONTACT: ContactInfo = {
  firstName: "Dana",
  lastName: "Moreno",
  street: "123 Palm Ave",
  city: "Fresno",
  state: "CA",
  zip: "93701",
};

describe("parseMoney", () => {
  it("accepts keypad-style input including a trailing dot while typing", () => {
    expect(parseMoney("24")).toBe(24);
    expect(parseMoney("24.5")).toBe(24.5);
    expect(parseMoney("24.50")).toBe(24.5);
    expect(parseMoney("24.")).toBe(24);
    expect(parseMoney(" 12 ")).toBe(12);
  });

  it("rejects everything a money field must never take", () => {
    for (const bad of [
      "",
      "0",
      "-5",
      "$12",
      "12,50",
      "1.234",
      "abc",
      "100000",
    ]) {
      expect(parseMoney(bad)).toBeNull();
    }
  });
});

describe("parseISODate", () => {
  it("accepts real calendar dates only", () => {
    expect(parseISODate("2026-11-14")?.toISOString().slice(0, 10)).toBe(
      "2026-11-14",
    );
    expect(parseISODate("2026-13-01")).toBeNull();
    expect(parseISODate("not-a-date")).toBeNull();
    expect(parseISODate("11/14/2026")).toBeNull();
  });
});

describe("draft persistence", () => {
  it("round-trips a filled draft and reports it as restored", () => {
    const draft = {
      ...initialDraft(),
      issues: ["missing_items" as const, "credits_only" as const],
      platform: "doordash" as const,
      orderTotal: "31.40",
      step: "details" as const,
    };
    saveDraft(draft);
    const loaded = loadDraft();
    expect(loaded.restored).toBe(true);
    expect(loaded.draft.issues).toEqual(draft.issues);
    expect(loaded.draft.platform).toBe("doordash");
    expect(loaded.draft.step).toBe("details");
  });

  it("starts fresh on corrupt or wrong-version data and drops unknown values", () => {
    storage.setItem(DRAFT_STORAGE_KEY, "{not json");
    expect(loadDraft().restored).toBe(false);

    const bogus = { ...initialDraft(), v: 99 as 1 };
    storage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(bogus));
    expect(loadDraft().restored).toBe(false);

    const stray = {
      ...initialDraft(),
      step: "nonsense" as never,
      issues: ["missing_items", "time-travel" as never],
    };
    storage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(stray));
    const loaded = loadDraft();
    expect(loaded.draft.step).toBe("issues");
    expect(loaded.draft.issues).toEqual(["missing_items"]);
  });

  it("never stores contact details inside the draft key", () => {
    const draft = initialDraft();
    saveDraft(draft);
    const stored = storage.dump().get(DRAFT_STORAGE_KEY) ?? "";
    expect(stored).not.toContain("firstName");
    expect(stored).not.toContain("Dana");
  });
});

describe("contact persistence", () => {
  it("round-trips only through the dedicated opt-in key", () => {
    saveRememberedContact(CONTACT);
    expect(loadRememberedContact()).toEqual(CONTACT);
    expect(storage.dump().has(CONTACT_STORAGE_KEY)).toBe(true);

    clearRememberedContact();
    expect(loadRememberedContact()).toBeNull();
    expect(storage.dump().has(CONTACT_STORAGE_KEY)).toBe(false);
  });

  it("ignores junk in the contact key", () => {
    storage.setItem(CONTACT_STORAGE_KEY, "nope");
    expect(loadRememberedContact()).toBeNull();
  });
});

describe("clearAllWizardData", () => {
  it("removes draft, contact and the saved language choice", () => {
    saveDraft(initialDraft());
    saveRememberedContact(CONTACT);
    storage.setItem(LANGUAGE_STORAGE_KEY, "vi");
    clearAllWizardData();
    expect(storage.dump().size).toBe(0);
  });
});

describe("draftToIncident", () => {
  it("returns null until the required answers exist", () => {
    expect(draftToIncident(initialDraft())).toBeNull();

    const noPlatform = {
      ...initialDraft(),
      issues: ["missing_items" as const],
    };
    expect(draftToIncident(noPlatform)).toBeNull();

    const noTotal = {
      ...initialDraft(),
      issues: ["missing_items" as const],
      platform: "doordash" as const,
    };
    expect(draftToIncident(noTotal)).toBeNull();

    const badDate = {
      ...noTotal,
      orderTotal: "20",
      orderDate: "yesterday",
    };
    expect(draftToIncident(badDate)).toBeNull();
  });

  it("builds a complete incident, canonically ordering issues", () => {
    const draft = {
      ...initialDraft(),
      issues: ["no_human" as const, "missing_items" as const],
      platform: "other" as const,
      otherPlatformName: "  ChowNow  ",
      orderTotal: "42.10",
      refundStatus: "none" as const,
      affectedItemsTotal: "18",
      orderNumber: " DD-7 ",
      restaurant: "Palm Teriyaki",
      itemsAffected: " 2 x chicken teriyaki ",
    };
    const incident = draftToIncident(draft);
    expect(incident).not.toBeNull();
    expect(incident?.issues).toEqual(
      ISSUE_ORDER.filter((issue) =>
        ["missing_items", "no_human"].includes(issue),
      ),
    );
    expect(incident?.otherPlatformName).toBe("ChowNow");
    expect(incident?.orderTotal).toBe(42.1);
    expect(incident?.affectedItemsTotal).toBe(18);
    expect(incident?.orderNumber).toBe("DD-7");
    expect(incident?.restaurant).toBe("Palm Teriyaki");
    expect(incident?.itemsAffected).toBe("2 x chicken teriyaki");
    expect(incident?.reachedHuman).toBe(false);
    expect(incident?.contactedPlatform).toBeUndefined();
  });

  it("carries refundedAmount only for partial refunds below the total", () => {
    const partial = {
      ...initialDraft(),
      issues: ["missing_items" as const],
      platform: "doordash" as const,
      orderTotal: "30",
      refundStatus: "partial" as const,
      refundedAmount: "7.25",
    };
    expect(draftToIncident(partial)?.refundedAmount).toBe(7.25);

    const credits = { ...partial, refundStatus: "credits" as const };
    expect(draftToIncident(credits)?.refundedAmount).toBeUndefined();

    const overfull = { ...partial, refundedAmount: "99" };
    expect(draftToIncident(overfull)?.refundedAmount).toBeUndefined();
  });

  it("includes the contact block only when a result is written", () => {
    const checked = {
      ...initialDraft(),
      issues: ["refund_denied" as const],
      platform: "grubhub" as const,
      orderTotal: "15",
      contacted: {
        done: true,
        date: "2026-11-10",
        method: "chat" as const,
        result: "  offered credit only ",
      },
    };
    expect(draftToIncident(checked)?.contactedPlatform).toEqual({
      date: "2026-11-10",
      method: "chat",
      result: "offered credit only",
    });

    const unanswered = {
      ...checked,
      contacted: { ...checked.contacted, result: "" },
    };
    expect(draftToIncident(unanswered)?.contactedPlatform).toBeUndefined();
  });
});

describe("entry-link preselect", () => {
  it("preselects known platforms and ignores everything else", () => {
    const draft = initialDraft();
    expect(withPreselectedPlatform(draft, "doordash").platform).toBe(
      "doordash",
    );
    expect(withPreselectedPlatform(draft, "instacart").platform).toBeNull();
    expect(withPreselectedPlatform(draft, null).platform).toBeNull();
  });
});

describe("todayISO", () => {
  it("produces a parseable local ISO date", () => {
    expect(parseISODate(todayISO())).not.toBeNull();
  });
});
