/**
 * Public API of the evidence PDF bundler. The wizard and kit screens import
 * from here; render internals stay behind their own modules.
 */
export { computeScaledSize, MAX_EDGE_PRESETS } from "./scale";
export {
  formatBytes,
  pickPreset,
  SIZE_BUDGET_BYTES,
  type BudgetChoice,
} from "./budget";
export { wrapCaptionLines } from "./caption";
export { evidenceFilename, isoDate, slugifyPlatform } from "./filename";
export {
  buildEvidencePdf,
  PDF_PAGE_WIDTH_PT,
  QUALITY_PRESETS,
  type BuildProgressEvent,
  type BuildEvidenceOptions,
  type BuiltEvidencePdf,
  type EvidenceInput,
} from "./pdf";
export {
  decodeImageFile,
  renderEvidenceJpeg,
  type DecodedImage,
  type RenderedEvidence,
} from "./render";
