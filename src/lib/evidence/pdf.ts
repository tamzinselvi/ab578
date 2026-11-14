/**
 * Assembles the evidence PDF entirely in the browser.
 *
 * pdf-lib is dynamically imported so it stays out of the initial bundle: it
 * is only fetched when the user actually builds the PDF. No network requests
 * beyond that same-origin chunk fetch happen during bundling.
 */
import { pickPreset, SIZE_BUDGET_BYTES } from "./budget";
import { evidenceFilename } from "./filename";
import {
  decodeImageFile,
  renderEvidenceJpeg,
  type DecodedImage,
  type RenderedEvidence,
} from "./render";
import { MAX_EDGE_PRESETS } from "./scale";

/**
 * Encoding presets tried best-first until the PDF fits the size budget.
 * Index i pairs MAX_EDGE_PRESETS[i] with QUALITY_PRESETS[i].
 */
export const QUALITY_PRESETS: readonly number[] = [0.82, 0.72, 0.58, 0.42];

/** Page width in PDF points (US Letter width); height follows the image. */
export const PDF_PAGE_WIDTH_PT = 612;

// xref, page objects and metadata add a few KB on top of the JPEG stream.
const PDF_OVERHEAD_BYTES = 8 * 1024;

/** One image to bundle, with the caption to draw onto it. */
export interface EvidenceInput {
  file: File;
  caption: string;
}

/** The finished PDF plus the facts the UI needs to show. */
export interface BuiltEvidencePdf {
  blob: Blob;
  bytes: number;
  pages: number;
  filename: string;
  overBudget: boolean;
  /** Files that could not be decoded and were left out of the PDF. */
  skipped: string[];
  maxEdge: number;
  quality: number;
}

export type BuildProgressEvent =
  | { phase: "rendering"; done: number; total: number }
  | { phase: "assembling"; done: number; total: number };

export interface BuildEvidenceOptions {
  /** Platform name for the filename, for example "DoorDash". */
  platform?: string;
  /** Incident date used in the filename; defaults to today. */
  date?: Date;
  /** Byte ceiling for the finished PDF. Defaults to SIZE_BUDGET_BYTES. */
  budgetBytes?: number;
  onProgress?: (event: BuildProgressEvent) => void;
}

/**
 * Build one PDF from the picked images: decode, compress on a canvas (with
 * captions drawn in system fonts), retry smaller presets while over budget,
 * then assemble with pdf-lib.
 */
export async function buildEvidencePdf(
  inputs: readonly EvidenceInput[],
  options: BuildEvidenceOptions = {},
): Promise<BuiltEvidencePdf> {
  if (inputs.length === 0) {
    throw new Error("No images to bundle");
  }
  const budget = options.budgetBytes ?? SIZE_BUDGET_BYTES;

  const decoded: { image: DecodedImage; caption: string }[] = [];
  const skipped: string[] = [];
  for (const input of inputs) {
    try {
      decoded.push({
        image: await decodeImageFile(input.file),
        caption: input.caption,
      });
    } catch {
      skipped.push(input.file.name);
    }
  }
  if (decoded.length === 0) {
    throw new Error(
      `None of the files could be read as images: ${skipped.join(", ")}`,
    );
  }

  const presetCount = Math.min(MAX_EDGE_PRESETS.length, QUALITY_PRESETS.length);
  const totals: number[] = [];
  let pages: RenderedEvidence[] = [];
  let presetIndex = presetCount - 1;
  let overBudget = true;
  for (let index = 0; index < presetCount; index += 1) {
    const rendered: RenderedEvidence[] = [];
    for (let image = 0; image < decoded.length; image += 1) {
      rendered.push(
        await renderEvidenceJpeg(
          decoded[image].image,
          decoded[image].caption,
          MAX_EDGE_PRESETS[index],
          QUALITY_PRESETS[index],
        ),
      );
      options.onProgress?.({
        phase: "rendering",
        done: image + 1,
        total: decoded.length,
      });
    }
    pages = rendered;
    totals.push(
      rendered.reduce((sum, page) => sum + page.blob.size, 0) +
        PDF_OVERHEAD_BYTES,
    );
    const choice = pickPreset(totals, budget);
    presetIndex = choice.index;
    overBudget = choice.overBudget;
    if (!overBudget || index === presetCount - 1) break;
  }

  // Lazy import keeps pdf-lib out of every bundle that never builds a PDF.
  const { PDFDocument } = await import("pdf-lib");
  const pdf = await PDFDocument.create();
  for (let index = 0; index < pages.length; index += 1) {
    const image = await pdf.embedJpg(await pages[index].blob.arrayBuffer());
    const height = Math.max(
      60,
      Math.round(
        (PDF_PAGE_WIDTH_PT * pages[index].height) / pages[index].width,
      ),
    );
    const page = pdf.addPage([PDF_PAGE_WIDTH_PT, height]);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: PDF_PAGE_WIDTH_PT,
      height,
    });
    options.onProgress?.({
      phase: "assembling",
      done: index + 1,
      total: pages.length,
    });
  }
  const saved = await pdf.save({ useObjectStreams: false });
  const arrayBuffer = saved.buffer.slice(
    saved.byteOffset,
    saved.byteOffset + saved.byteLength,
  ) as ArrayBuffer;
  const blob = new Blob([arrayBuffer], { type: "application/pdf" });

  return {
    blob,
    bytes: blob.size,
    pages: pages.length,
    filename: evidenceFilename(
      options.platform ?? "",
      options.date ?? new Date(),
    ),
    overBudget,
    skipped,
    maxEdge: MAX_EDGE_PRESETS[presetIndex],
    quality: QUALITY_PRESETS[presetIndex],
  };
}
