/**
 * Wizard state and persistence.
 *
 * Two localStorage keys, deliberately split:
 * - DRAFT_STORAGE_KEY holds the answers only. It is written on every change
 *   (draft autosave) and never contains contact details.
 * - CONTACT_STORAGE_KEY holds contact details and is written only while
 *   "Remember on this device" is checked (opt-in, per the on-device data
 *   decision). Unchecking removes it.
 *
 * clearAllWizardData() backs the "Clear my data" control: it removes both
 * keys plus the saved language choice.
 */

import {
  ISSUE_ORDER,
  type ContactInfo,
  type ContactedPlatform,
  type Incident,
  type Issue,
  type PlatformId,
  type RefundStatus,
} from "../../lib/complaint";
import { LANGUAGE_STORAGE_KEY } from "../../i18n/index";

export type WizardStep = "issues" | "platform" | "details" | "kit";

/** Route order. The hash for each step is `#<step>`. */
export const STEPS: readonly WizardStep[] = [
  "issues",
  "platform",
  "details",
  "kit",
];

export const DRAFT_STORAGE_KEY = "ab578.wizard.draft";
export const CONTACT_STORAGE_KEY = "ab578.wizard.contact";

export type ContactMethod = ContactedPlatform["method"];

export interface ContactedDraft {
  done: boolean;
  date: string;
  method: ContactMethod;
  result: string;
}

export interface WizardDraft {
  v: 1;
  step: WizardStep;
  issues: Issue[];
  platform: PlatformId | null;
  otherPlatformName: string;
  orderDate: string;
  orderTotal: string;
  refundStatus: RefundStatus;
  refundedAmount: string;
  affectedItemsTotal: string;
  orderNumber: string;
  restaurant: string;
  itemsAffected: string;
  contacted: ContactedDraft;
  /** User confirmed they were at the delivery address (never-arrived orders). */
  atAddress: boolean;
}

/** Local-time ISO date (YYYY-MM-DD) for "today" defaults. */
export function todayISO(): string {
  const now = new Date();
  const month = `${now.getMonth() + 1}`.padStart(2, "0");
  const day = `${now.getDate()}`.padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

export function initialDraft(): WizardDraft {
  return {
    v: 1,
    step: "issues",
    issues: [],
    atAddress: false,
    platform: null,
    otherPlatformName: "",
    orderDate: todayISO(),
    orderTotal: "",
    refundStatus: "none",
    refundedAmount: "",
    affectedItemsTotal: "",
    orderNumber: "",
    restaurant: "",
    itemsAffected: "",
    contacted: { done: false, date: todayISO(), method: "chat", result: "" },
  };
}

export function isWizardStep(value: string): value is WizardStep {
  return (STEPS as readonly string[]).includes(value);
}

/**
 * Parse a money string typed or keyed into the wizard. Accepts "24", "24.5",
 * "24.50" and "24." while typing; rejects anything else (no minus, no
 * thousands separators). Returns dollars rounded to cents, or null.
 */
export function parseMoney(raw: string): number | null {
  const trimmed = raw.trim();
  if (!/^\d+(\.\d{0,2})?$/.test(trimmed)) return null;
  const value = Number(trimmed);
  if (!Number.isFinite(value) || value <= 0 || value > 99_999) return null;
  return Math.round(value * 100) / 100;
}

/** Parse an ISO date string; returns null when invalid, including dates the
 * Date constructor would silently normalize (2026-13-01). */
export function parseISODate(raw: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(raw)) return null;
  const date = new Date(`${raw}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString().slice(0, 10) === raw ? date : null;
}

function readJSON<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null; // Storage unavailable or corrupt: start fresh.
  }
}

/** Load the saved draft. Returns the initial draft when none is usable. */
export function loadDraft(): { draft: WizardDraft; restored: boolean } {
  const saved = readJSON<WizardDraft>(DRAFT_STORAGE_KEY);
  if (!saved || saved.v !== 1 || !Array.isArray(saved.issues)) {
    return { draft: initialDraft(), restored: false };
  }
  const base = initialDraft();
  // Only keep known steps and issues; anything odd falls back to the default.
  const step = isWizardStep(saved.step) ? saved.step : base.step;
  const issues = saved.issues.filter((issue) =>
    (ISSUE_ORDER as readonly Issue[]).includes(issue),
  );
  const draft: WizardDraft = {
    ...base,
    ...saved,
    step,
    issues,
    contacted: { ...base.contacted, ...saved.contacted },
  };
  return { draft, restored: true };
}

export function saveDraft(draft: WizardDraft): void {
  try {
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
  } catch {
    // Storage unavailable (private mode): the wizard still works in memory.
  }
}

/** Contact details saved by explicit opt-in only. */
export function loadRememberedContact(): ContactInfo | null {
  const saved = readJSON<ContactInfo>(CONTACT_STORAGE_KEY);
  if (!saved || typeof saved.firstName !== "string") return null;
  return saved;
}

export function saveRememberedContact(contact: ContactInfo): void {
  try {
    localStorage.setItem(CONTACT_STORAGE_KEY, JSON.stringify(contact));
  } catch {
    // Storage unavailable: not remembered, and the wizard still works.
  }
}

export function clearRememberedContact(): void {
  try {
    localStorage.removeItem(CONTACT_STORAGE_KEY);
  } catch {
    // Ignore: nothing was stored.
  }
}

/** "Clear my data": answers, remembered contact and the language choice. */
export function clearAllWizardData(): void {
  try {
    localStorage.removeItem(DRAFT_STORAGE_KEY);
    localStorage.removeItem(CONTACT_STORAGE_KEY);
    localStorage.removeItem(LANGUAGE_STORAGE_KEY);
  } catch {
    // Ignore: nothing was stored.
  }
}

/**
 * Turn a draft into the engine's Incident, or null while required answers
 * are still missing (at least one issue, a platform and a valid total).
 */
export function draftToIncident(draft: WizardDraft): Incident | null {
  if (draft.issues.length === 0) return null;
  if (draft.platform == null) return null;
  const orderTotal = parseMoney(draft.orderTotal);
  const orderDate = parseISODate(draft.orderDate);
  if (orderTotal == null || orderDate == null) return null;

  const incident: Incident = {
    platform: draft.platform,
    issues: ISSUE_ORDER.filter((issue) => draft.issues.includes(issue)),
    orderDate: draft.orderDate,
    orderTotal,
    refundStatus: draft.refundStatus,
  };
  if (draft.platform === "other" && draft.otherPlatformName.trim()) {
    incident.otherPlatformName = draft.otherPlatformName.trim();
  }
  if (draft.refundStatus === "partial") {
    const refunded = parseMoney(draft.refundedAmount);
    if (refunded != null && refunded < orderTotal)
      incident.refundedAmount = refunded;
  }
  const affected = parseMoney(draft.affectedItemsTotal);
  if (affected != null) incident.affectedItemsTotal = affected;
  if (draft.orderNumber.trim()) incident.orderNumber = draft.orderNumber.trim();
  if (draft.restaurant.trim()) incident.restaurant = draft.restaurant.trim();
  if (draft.itemsAffected.trim()) {
    incident.itemsAffected = draft.itemsAffected.trim();
  }
  if (draft.contacted.done && draft.contacted.result.trim()) {
    incident.contactedPlatform = {
      date: parseISODate(draft.contacted.date)
        ? draft.contacted.date
        : todayISO(),
      method: draft.contacted.method,
      result: draft.contacted.result.trim(),
    };
  }
  if (draft.issues.includes("no_human")) incident.reachedHuman = false;
  if (draft.issues.includes("not_delivered") && draft.atAddress === true) {
    incident.atAddressConfirmed = true;
  }
  return incident;
}

/** Apply a `?platform=` entry-link preselect. Returns the draft with the
 * platform set when the id is one the wizard offers. */
export function withPreselectedPlatform(
  draft: WizardDraft,
  param: string | null,
): WizardDraft {
  if (param !== "doordash" && param !== "ubereats" && param !== "grubhub") {
    return draft;
  }
  return { ...draft, platform: param };
}
