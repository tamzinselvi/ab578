/**
 * Minimal PNG encoder for Playwright fixtures. No image libraries: builds
 * RGB PNGs (IHDR, one IDAT, IEND) with node:zlib, so the e2e suite can
 * attach screenshot-like buffers of controlled size and compressibility.
 */
import { deflateSync } from "node:zlib";

export type PaintPixel = (
  x: number,
  y: number,
) => readonly [red: number, green: number, blue: number];

function crc32(buffer: Buffer): number {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit += 1) {
      crc = crc & 1 ? (crc >>> 1) ^ 0xedb88320 : crc >>> 1;
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type: string, data: Buffer): Buffer {
  const out = Buffer.alloc(12 + data.length);
  out.writeUInt32BE(data.length, 0);
  out.write(type, 4, "ascii");
  data.copy(out, 8);
  out.writeUInt32BE(crc32(out.subarray(4, 8 + data.length)), 8 + data.length);
  return out;
}

/** Encode a width x height RGB PNG with a per-pixel paint function. */
export function pngFixture(
  width: number,
  height: number,
  paint: PaintPixel,
): Buffer {
  const header = Buffer.alloc(13);
  header.writeUInt32BE(width, 0);
  header.writeUInt32BE(height, 4);
  header[8] = 8; // bit depth
  header[9] = 2; // color type: truecolor RGB
  const raw = Buffer.alloc(height * (1 + width * 3));
  let offset = 0;
  for (let y = 0; y < height; y += 1) {
    raw[offset] = 0; // filter: none
    offset += 1;
    for (let x = 0; x < width; x += 1) {
      const [red, green, blue] = paint(x, y);
      raw[offset] = red;
      raw[offset + 1] = green;
      raw[offset + 2] = blue;
      offset += 3;
    }
  }
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", header),
    chunk("IDAT", deflateSync(raw, { level: 6 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

const clampChannel = (value: number): number =>
  Math.max(0, Math.min(255, Math.round(value)));

/** Uniform color, for fixtures whose pixels must be predictable. */
export function solidPaint(
  color: readonly [number, number, number],
): PaintPixel {
  return () => color;
}

/**
 * Seeded noise around a base color. Noise defeats JPEG compression, so these
 * fixtures exercise the size-budget ladder like real photos would.
 */
export function noisePaint(
  seed: number,
  base: readonly [number, number, number],
  strength: number,
): PaintPixel {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    const jitter = (((state >>> 16) & 0xffff) / 65535 - 0.5) * strength;
    return [
      clampChannel(base[0] + jitter),
      clampChannel(base[1] + jitter),
      clampChannel(base[2] + jitter),
    ];
  };
}

/** White page with dark text-like rows, resembling an order receipt. */
export function receiptPaint(width: number): PaintPixel {
  return (x, y) => {
    const inMargin = x > width * 0.08 && x < width * 0.92;
    if (inMargin && y % 26 < 7 && y > 40) {
      return [24, 24, 24];
    }
    return [252, 252, 250];
  };
}
