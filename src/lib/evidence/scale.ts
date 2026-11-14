/**
 * Pure image-scaling math for the evidence bundler. No DOM APIs, so unit
 * tests run in node.
 */

/**
 * Edge-length presets tried from best to worst when the PDF would exceed the
 * size budget. Ordered longest edge to shortest; index 0 is the default.
 */
export const MAX_EDGE_PRESETS: readonly number[] = [1600, 1280, 1024, 800];

/**
 * Scaled output dimensions for an image, preserving aspect ratio.
 *
 * Never upscales: an image already within `maxEdge` keeps its size. Results
 * are whole pixels of at least 1, so tiny or degenerate inputs stay usable.
 */
export function computeScaledSize(
  width: number,
  height: number,
  maxEdge: number,
): { width: number; height: number } {
  const safeWidth = Math.max(1, Math.floor(width) || 1);
  const safeHeight = Math.max(1, Math.floor(height) || 1);
  const longest = Math.max(safeWidth, safeHeight);
  const scale = longest > maxEdge ? maxEdge / longest : 1;
  return {
    width: Math.max(1, Math.round(safeWidth * scale)),
    height: Math.max(1, Math.round(safeHeight * scale)),
  };
}
