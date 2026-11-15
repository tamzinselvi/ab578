/**
 * The clipboard payload the fill-the-AG-form bookmark reads.
 *
 * The kit copies one string: a fixed prefix followed by JSON holding
 * [inputName, value] pairs for the AG form. The bookmark itself holds no
 * personal data; the person pastes this payload into a small box the bookmark
 * opens on the AG page. Values are always the English text, because the AG
 * form is in English.
 */

import { agFormInputs } from "../../data/destinations";
import type { AgKitField } from "../complaint/types";

export const AGFILL_PREFIX = "AB578-AGFILL:v1:";

export interface AgFillPayload {
  v: 1;
  /** [input name, value] in the order the bookmark should apply them. */
  f: [string, string][];
}

function fit(value: string, maxLength?: number): string {
  const trimmed = value.trim();
  return maxLength && trimmed.length > maxLength
    ? trimmed.slice(0, maxLength).trimEnd()
    : trimmed;
}

/**
 * Turn the kit's AG fields into fill pairs. Radios and checkboxes come first
 * so the form's conditional sections are open before their fields are set.
 */
export function agFillPairs(fields: readonly AgKitField[]): [string, string][] {
  const choices: [string, string][] = [];
  const values: [string, string][] = [];
  for (const field of fields) {
    const input = agFormInputs[field.order];
    if (!input) continue;
    const text = field.value.text.trim();
    if (!text) continue;
    if (input.kind === "radio") {
      const mapped = input.values?.[text];
      if (mapped) choices.push([input.name, mapped]);
    } else if (input.kind === "checkbox") {
      if (text === "Yes") choices.push([input.name, "on"]);
    } else if (field.order === 8) {
      // ZIP+4 typed into one box: split across Zip Code and (+4).
      const zip = /^(\d{5})-?(\d{4})$/.exec(text);
      if (zip) {
        values.push([input.name, zip[1]]);
        const plus4 = agFormInputs[9];
        if (plus4) values.push([plus4.name, zip[2]]);
      } else {
        values.push([input.name, fit(text, input.maxLength)]);
      }
    } else {
      values.push([input.name, fit(text, input.maxLength)]);
    }
  }
  return [...choices, ...values];
}

/** The exact string the kit's "Copy my answers" button puts on the clipboard. */
export function buildAgFillPayload(fields: readonly AgKitField[]): string {
  const payload: AgFillPayload = { v: 1, f: agFillPairs(fields) };
  return AGFILL_PREFIX + JSON.stringify(payload);
}
