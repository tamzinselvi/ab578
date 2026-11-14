/**
 * Debug hook for the dev-only kit page (src/pages/dev/kit.astro).
 * Lets the Playwright suite exercise the real decode/render functions in a
 * real browser, including checking caption pixels. Not part of the public
 * component API; the integrator can drop this file with the dev page.
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
