/**
 * Debug hook for the dev-only demo page (src/pages/dev/evidence.astro).
 * Lets the Playwright suite exercise the real decode/render functions in a
 * real browser, including checking caption pixels. Not part of the public
 * component API; the integrator can drop this file with the demo page.
 */
import { decodeImageFile, renderEvidenceJpeg } from "../../lib/evidence";

export interface EvidenceDebugHook {
  decodeImageFile: typeof decodeImageFile;
  renderEvidenceJpeg: typeof renderEvidenceJpeg;
}

export const evidenceDebugHook: EvidenceDebugHook = {
  decodeImageFile,
  renderEvidenceJpeg,
};

declare global {
  interface Window {
    __evidenceDebug?: EvidenceDebugHook;
  }
}
