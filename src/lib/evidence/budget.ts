/**
 * Size-budget math for the evidence PDF. Pure functions, unit-tested in node.
 */

/**
 * Target ceiling for the finished PDF: 4 MB, the stricter of the two limits
 * the Attorney General upload page states.
 */
export const SIZE_BUDGET_BYTES = 4 * 1024 * 1024;

/**
 * Result of choosing an encoding preset under a byte budget.
 *
 * `index` is always a valid preset index: when nothing fits, it is the last
 * (smallest) preset and `overBudget` is true so the UI can warn honestly
 * instead of failing silently.
 */
export interface BudgetChoice {
  index: number;
  overBudget: boolean;
}

/**
 * Pick the first preset whose total encoded size fits the budget.
 *
 * `totalBytesPerPreset` holds the estimated total PDF size when every image
 * is encoded at that preset, best quality first. Presets are assumed ordered
 * best to worst.
 */
export function pickPreset(
  totalBytesPerPreset: readonly number[],
  budgetBytes: number,
): BudgetChoice {
  if (totalBytesPerPreset.length === 0) {
    throw new Error("pickPreset needs at least one preset measurement");
  }
  for (let index = 0; index < totalBytesPerPreset.length; index += 1) {
    if (totalBytesPerPreset[index] <= budgetBytes) {
      return { index, overBudget: false };
    }
  }
  return { index: totalBytesPerPreset.length - 1, overBudget: true };
}

/**
 * Human-readable file size for UI display, for example "2.1 MB" or "890 KB".
 * Uses 1 MB = 1024 KB, matching how upload limits are usually stated.
 */
export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) {
    return "0 KB";
  }
  if (bytes < 1024) {
    return `${Math.round(bytes)} B`;
  }
  const kb = bytes / 1024;
  if (kb < 1024) {
    return `${kb < 10 ? Math.round(kb * 10) / 10 : Math.round(kb)} KB`;
  }
  const mb = kb / 1024;
  return `${mb < 10 ? Math.round(mb * 10) / 10 : Math.round(mb)} MB`;
}
