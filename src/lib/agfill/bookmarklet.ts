/**
 * Builds the fill-the-AG-form bookmark link from bookmarklet-source.ts.
 *
 * The link is generic: it carries only UI messages in the person's language
 * and the AG form's id and URL, never their answers. Answers travel through
 * the clipboard (see payload.ts).
 */

import { agFormElementId, agFormFacts } from "../../data/destinations";
import { BOOKMARKLET_SOURCE as source } from "./bookmarklet-source";

export interface BookmarkletMessages {
  /** Shown on the AG form: tells the person to paste. */
  prompt: string;
  /** Placeholder and label of the paste box. */
  pasteLabel: string;
  /** Shown when the bookmark is clicked anywhere but the AG form. */
  wrongPage: string;
  /** Link text to the AG form, shown with wrongPage. */
  openForm: string;
  /** Shown when the pasted text is not a kit payload. */
  notKit: string;
  /** Shown after filling; {count} is the number of answers set. */
  done: string;
  close: string;
}

/** The bookmark's JavaScript, ready to run, with messages filled in. */
export function bookmarkletCode(messages: BookmarkletMessages): string {
  const body = source.replace(/^(?:\s*\/\*[\s\S]*?\*\/)+\s*/, "");
  const withMessages = body.replace(
    /\{\s*"?__AB578_MESSAGES__"?\s*:\s*1\s*\}/,
    () => JSON.stringify(messages),
  );
  return withMessages
    .replace('"__AB578_FORM_ID__"', () => JSON.stringify(agFormElementId))
    .replace('"__AB578_FORM_URL__"', () => JSON.stringify(agFormFacts.formUrl));
}

/** The javascript: URL for the draggable bookmark link. */
export function bookmarkletHref(messages: BookmarkletMessages): string {
  return `javascript:${encodeURIComponent(bookmarkletCode(messages))}`;
}
