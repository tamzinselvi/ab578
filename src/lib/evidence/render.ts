/**
 * Browser-side image decoding and canvas rendering for the evidence bundler.
 *
 * Captions are drawn onto the image with a canvas using system fonts, so any
 * script (Chinese, Korean, Vietnamese) renders without embedding PDF fonts.
 */
import { computeScaledSize } from "./scale";
import { wrapCaptionLines } from "./caption";

/** A decoded image plus its natural pixel size. */
export interface DecodedImage {
  source: CanvasImageSource;
  width: number;
  height: number;
}

/** One rendered evidence page: a JPEG sized for the PDF. */
export interface RenderedEvidence {
  blob: Blob;
  width: number;
  height: number;
}

/**
 * Decode an image file the browser can handle: JPEG and PNG everywhere,
 * HEIC where the browser decodes it (Safari). Falls back from
 * createImageBitmap to an <img> element, which sometimes accepts formats
 * the bitmap API rejects. Throws when neither path decodes the file.
 */
export async function decodeImageFile(file: File): Promise<DecodedImage> {
  if (typeof createImageBitmap === "function") {
    try {
      const bitmap = await createImageBitmap(file, {
        imageOrientation: "from-image",
      });
      return { source: bitmap, width: bitmap.width, height: bitmap.height };
    } catch {
      // Fall through to the <img> path.
    }
  }
  const url = URL.createObjectURL(file);
  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const element = new Image();
      element.onload = () => resolve(element);
      element.onerror = () =>
        reject(new Error(`This browser could not read ${file.name}`));
      element.src = url;
    });
    if (image.naturalWidth === 0 || image.naturalHeight === 0) {
      throw new Error(`${file.name} has no image data`);
    }
    return {
      source: image,
      width: image.naturalWidth,
      height: image.naturalHeight,
    };
  } finally {
    URL.revokeObjectURL(url);
  }
}

/**
 * Render one evidence page: downscale to `maxEdge`, draw the caption band,
 * and encode as JPEG at `quality`.
 */
export async function renderEvidenceJpeg(
  image: DecodedImage,
  caption: string,
  maxEdge: number,
  quality: number,
): Promise<RenderedEvidence> {
  const { width, height } = computeScaledSize(
    image.width,
    image.height,
    maxEdge,
  );
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas 2D drawing is unavailable in this browser");
  }
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(image.source, 0, 0, width, height);
  const text = caption.trim();
  if (text.length > 0) {
    drawCaptionBand(ctx, width, height, text);
  }
  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/jpeg", quality),
  );
  if (!blob) {
    throw new Error("JPEG encoding failed");
  }
  return { blob, width, height };
}

// Matches the global stack in src/styles/global.css so UI and captions agree.
const CAPTION_FONT_STACK =
  'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, ' +
  '"Noto Sans", "PingFang TC", "PingFang SC", "Microsoft JhengHei", ' +
  '"Microsoft YaHei", "Noto Sans CJK TC", "Noto Sans CJK SC", "Noto Sans KR", ' +
  '"Malgun Gothic", sans-serif';

/**
 * Draw the caption as a solid dark band across the bottom of the page with
 * white text. An opaque band keeps the JPEG small and the text readable over
 * any screenshot.
 */
function drawCaptionBand(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  caption: string,
): void {
  const fontSize = Math.min(56, Math.max(18, Math.round(width / 24)));
  const lineHeight = Math.round(fontSize * 1.45);
  const padX = Math.round(fontSize * 0.8);
  const padY = Math.round(fontSize * 0.55);
  ctx.font = `bold ${fontSize}px ${CAPTION_FONT_STACK}`;
  const lines = wrapCaptionLines(
    caption,
    width - padX * 2,
    (line) => ctx.measureText(line).width,
  );
  if (lines.length === 0) return;
  const bandHeight = lines.length * lineHeight + padY * 2;
  ctx.fillStyle = "#101418";
  ctx.fillRect(0, height - bandHeight, width, bandHeight);
  ctx.fillStyle = "#ffffff";
  ctx.textBaseline = "alphabetic";
  let baseline = height - bandHeight + padY + fontSize;
  for (const line of lines) {
    ctx.fillText(line, padX, baseline);
    baseline += lineHeight;
  }
}
