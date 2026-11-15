/**
 * Builds the fill-the-AG-form bookmark link from bookmarklet-source.ts.
 *
 * The link is generic: it carries only UI messages in the person's language,
 * the AG form's id and URL, and the URL of this site's handoff page. It never
 * carries their answers. Answers reach the AG page through the handoff popup
 * (see handoff.ts) or, as a fallback, the clipboard (see payload.ts).
 */

import {
  agFormElementId,
  agFormFacts,
  agFormUpload,
} from "../../data/destinations";
import { BOOKMARKLET_SOURCE as source } from "./bookmarklet-source";
import { HANDOFF_MESSAGE_TYPE } from "./handoff";

export interface BookmarkletMessages {
  /** Shown while the popup fetches the answers from the kit. */
  waiting: string;
  /** Shown with the paste box when the popup is blocked. */
  prompt: string;
  /** Shown with the paste box when the popup found no saved answers. */
  noHandoff: string;
  /** Placeholder and label of the paste box. */
  pasteLabel: string;
  /** Shown when the bookmark is clicked anywhere but the AG form. */
  wrongPage: string;
  /** Link text to the AG form, shown with wrongPage. */
  openForm: string;
  /** Shown when the pasted text is not a kit payload. */
  notKit: string;
  /** Shown after filling without a PDF; {count} is the number of answers. */
  done: string;
  /** Shown after filling and attaching the evidence PDF. */
  doneFile: string;
  close: string;
}

export interface BookmarkletConfig {
  /** Absolute URL of this site's /agfill/ handoff page. */
  handoffUrl: string;
}

/** The bookmark's JavaScript, ready to run, with messages and config filled in. */
export function bookmarkletCode(
  messages: BookmarkletMessages,
  config: BookmarkletConfig,
): string {
  const fullConfig = {
    formId: agFormElementId,
    formUrl: agFormFacts.formUrl,
    handoffUrl: config.handoffUrl,
    messageType: HANDOFF_MESSAGE_TYPE,
    upload: agFormUpload,
  };
  return source
    .replace(/\{\s*"?__AB578_MESSAGES__"?\s*:\s*1\s*\}/, () =>
      JSON.stringify(messages),
    )
    .replace(/\{\s*"?__AB578_CONFIG__"?\s*:\s*1\s*\}/, () =>
      JSON.stringify(fullConfig),
    );
}

/** The javascript: URL for the draggable bookmark link. */
export function bookmarkletHref(
  messages: BookmarkletMessages,
  config: BookmarkletConfig,
): string {
  return `javascript:${encodeURIComponent(bookmarkletCode(messages, config))}`;
}
