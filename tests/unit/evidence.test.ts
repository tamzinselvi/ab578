import { describe, expect, it } from "vitest";
import { computeScaledSize } from "../../src/lib/evidence/scale";
import {
  formatBytes,
  pickPreset,
  SIZE_BUDGET_BYTES,
} from "../../src/lib/evidence/budget";
import { wrapCaptionLines } from "../../src/lib/evidence/caption";
import {
  evidenceFilename,
  isoDate,
  slugifyPlatform,
} from "../../src/lib/evidence/filename";

describe("computeScaledSize", () => {
  it("downscales landscape images to the max edge, keeping the ratio", () => {
    expect(computeScaledSize(4000, 3000, 1600)).toEqual({
      width: 1600,
      height: 1200,
    });
  });

  it("downscales portrait phone screenshots by their long edge", () => {
    expect(computeScaledSize(1170, 2532, 1600)).toEqual({
      width: 739,
      height: 1600,
    });
  });

  it("never upscales an image already within the edge", () => {
    expect(computeScaledSize(800, 600, 1600)).toEqual({
      width: 800,
      height: 600,
    });
    expect(computeScaledSize(1600, 900, 1600)).toEqual({
      width: 1600,
      height: 900,
    });
  });

  it("clamps degenerate dimensions to one pixel without distorting the other", () => {
    expect(computeScaledSize(0, 0, 1600)).toEqual({ width: 1, height: 1 });
    expect(computeScaledSize(-40, 300, 1600)).toEqual({
      width: 1,
      height: 300,
    });
  });

  it("preserves the aspect ratio within a pixel after rounding", () => {
    const { width, height } = computeScaledSize(1447, 2081, 1024);
    expect(width).toBe(712);
    expect(height).toBe(1024);
    expect(Math.abs(width / height - 1447 / 2081)).toBeLessThan(0.005);
  });
});

describe("pickPreset (size budget)", () => {
  it("keeps the best preset that fits the budget", () => {
    expect(pickPreset([5_000_000, 3_000_000, 2_000_000], 4_000_000)).toEqual({
      index: 1,
      overBudget: false,
    });
  });

  it("takes the first preset when even the best quality fits", () => {
    expect(pickPreset([100, 90, 80], SIZE_BUDGET_BYTES)).toEqual({
      index: 0,
      overBudget: false,
    });
  });

  it("falls back to the smallest preset and flags over budget when nothing fits", () => {
    expect(pickPreset([9_000_000, 8_000_000, 7_000_000], 4_000_000)).toEqual({
      index: 2,
      overBudget: true,
    });
  });

  it("treats a total exactly at the budget as fitting", () => {
    expect(pickPreset([SIZE_BUDGET_BYTES, 1], SIZE_BUDGET_BYTES)).toEqual({
      index: 0,
      overBudget: false,
    });
  });

  it("rejects empty measurements instead of guessing", () => {
    expect(() => pickPreset([], SIZE_BUDGET_BYTES)).toThrow();
  });
});

describe("formatBytes", () => {
  it("shows bytes, KB and MB at readable precision", () => {
    expect(formatBytes(0)).toBe("0 B");
    expect(formatBytes(512)).toBe("512 B");
    expect(formatBytes(1536)).toBe("1.5 KB");
    expect(formatBytes(900 * 1024)).toBe("900 KB");
    expect(formatBytes(1.5 * 1024 * 1024)).toBe("1.5 MB");
    expect(formatBytes(SIZE_BUDGET_BYTES)).toBe("4 MB");
  });

  it("clamps negative and non-finite input instead of printing NaN", () => {
    expect(formatBytes(-100)).toBe("0 KB");
    expect(formatBytes(Number.NaN)).toBe("0 KB");
  });
});

describe("wrapCaptionLines", () => {
  // Monospace fake measurer: every character is 10 units wide.
  const measure = (line: string) => line.length * 10;

  it("wraps space-separated text at word boundaries", () => {
    expect(wrapCaptionLines("the quick brown fox", 100, measure)).toEqual([
      "the quick",
      "brown fox",
    ]);
  });

  it("splits a single unbreakable run per character", () => {
    expect(wrapCaptionLines("abcdefghij", 55, measure)).toEqual([
      "abcde",
      "fghij",
    ]);
  });

  it("wraps CJK text, which has no spaces, per character", () => {
    expect(wrapCaptionLines("订单截图送错了菜", 50, measure)).toEqual([
      "订单截图送",
      "错了菜",
    ]);
  });

  it("wraps Korean syllables per character", () => {
    expect(wrapCaptionLines("주문내역누락", 40, measure)).toEqual([
      "주문내역",
      "누락",
    ]);
  });

  it("keeps a short caption on one line", () => {
    expect(wrapCaptionLines("wrong order", 200, measure)).toEqual([
      "wrong order",
    ]);
  });

  it("drops whitespace-only captions to zero lines", () => {
    expect(wrapCaptionLines("   \t  ", 200, measure)).toEqual([]);
  });

  it("mixes space-broken and character-broken runs", () => {
    expect(wrapCaptionLines("hello 世界世界", 60, measure)).toEqual([
      "hello",
      "世界世界",
    ]);
  });
});

describe("evidenceFilename", () => {
  it("builds the descriptive filename from platform and date", () => {
    expect(evidenceFilename("DoorDash", new Date(2026, 10, 14))).toBe(
      "doordash-2026-11-14-evidence.pdf",
    );
  });

  it("slugifies spaced and punctuated platform names", () => {
    expect(evidenceFilename("Uber Eats", new Date(2026, 0, 2))).toBe(
      "uber-eats-2026-01-02-evidence.pdf",
    );
    expect(slugifyPlatform("Grubhub (Seamless)")).toBe("grubhub-seamless");
    expect(slugifyPlatform("Café")).toBe("cafe");
  });

  it("falls back to a meaningful prefix for an empty platform", () => {
    expect(evidenceFilename("", new Date(2026, 10, 14))).toBe(
      "delivery-2026-11-14-evidence.pdf",
    );
    expect(slugifyPlatform("???")).toBe("delivery");
  });

  it("zero-pads the local calendar date", () => {
    expect(isoDate(new Date(2026, 0, 5))).toBe("2026-01-05");
    expect(isoDate(new Date(2026, 10, 14))).toBe("2026-11-14");
  });
});
