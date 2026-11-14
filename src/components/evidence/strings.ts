/**
 * English strings for the evidence PDF bundler.
 *
 * INTEGRATOR NOTE: these strings belong in the i18n catalog
 * (src/i18n/en.ts and the other locale catalogs) once the evidence bundler
 * is embedded in the kit screen. They live in this module so the evidence
 * task never edits src/i18n/*, which other delegates own in parallel. Move
 * the values verbatim, keep the {placeholder} convention, and route them
 * through t() at the call sites.
 *
 * Copy rules: plain, firm, no em dashes (U+2014), in any language.
 */
export const evidenceStrings = {
  heading: "Turn your screenshots into one PDF",
  intro:
    "The complaint form accepts PDF, Word or Excel files, not images. Pick your screenshots, add a caption to each if you like, and download one PDF ready to attach. Everything happens on your device. Nothing is uploaded.",
  addImages: "Add screenshots",
  addMore: "Add more screenshots",
  imageCount: "{count} images",
  captionLabel: "Caption for {name}",
  captionHint: "Captions are drawn onto the image, in any language.",
  captionPlaceholder: "For example: this is not what I ordered",
  moveEarlier: "Move {name} earlier",
  moveLater: "Move {name} later",
  removeImage: "Remove {name}",
  build: "Build the PDF",
  building: "Building the PDF",
  compressingProgress: "Compressing image {done} of {total}",
  assemblingProgress: "Assembling the PDF, page {done} of {total}",
  resultHeading: "Your evidence PDF is ready",
  resultPages: "{pages} pages",
  resultSize: "File size: {size}",
  overBudgetWarning:
    "This PDF is over the 4 MB upload limit. Remove a screenshot or two and build again.",
  download: "Download {filename}",
  skippedFiles:
    "Left out because this browser could not read them: {names}. Another browser may open them.",
  buildFailed:
    "Building the PDF failed. Try again, or use fewer or smaller screenshots.",
  emptyHint: "JPEG or PNG screenshots work best.",
} as const;

export type EvidenceStringKey = keyof typeof evidenceStrings;
