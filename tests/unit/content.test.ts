import { describe, expect, it } from "vitest";
import { en } from "../../src/i18n/en";
import { statuteRules } from "../../src/data/law";

/**
 * Content contract tests for the English catalog.
 *
 * 1. Every statute citation written in user-facing copy must match a section
 *    recorded in src/data/law.ts, so the site can never cite a section the
 *    verified legal data does not carry.
 * 2. The owner's story is approved copy and must stay verbatim.
 */

/** All sections the verified legal data carries, e.g. "§ 22599.2(a)". */
const recordedSections = new Set(statuteRules.map((rule) => rule.section));

/** Extract "§ 22599.2(a)" citations, including "(x) and (y)" continuations. */
function citationsIn(text: string): string[] {
  const pattern =
    /§\s*(\d{5}(?:\.\d)?)\s*\(([a-z])\)(?:\s*and\s*\(([a-z])\))?/gu;
  const found: string[] = [];
  for (const match of text.matchAll(pattern)) {
    found.push(`§ ${match[1]}(${match[2]})`);
    if (match[3]) {
      found.push(`§ ${match[1]}(${match[3]})`);
    }
  }
  return found;
}

const allCopy = Object.entries(en);

describe("statute citations in copy", () => {
  it("every citation matches a section in src/data/law.ts", () => {
    const unknown: string[] = [];
    for (const [key, text] of allCopy) {
      for (const citation of citationsIn(text)) {
        if (!recordedSections.has(citation)) {
          unknown.push(`${key}: ${citation}`);
        }
      }
    }
    expect(unknown).toEqual([]);
  });

  it("the scanner itself finds the expected citations", () => {
    expect(citationsIn("covers § 22599(a) and (d) plus § 22599.2(a)")).toEqual([
      "§ 22599(a)",
      "§ 22599(d)",
      "§ 22599.2(a)",
    ]);
  });
});

describe("approved copy stays verbatim", () => {
  it("keeps the owner's story exactly as approved", () => {
    expect(en.aboutStoryHeading).toBe("Why did you build this?");
    expect(en.aboutStoryP1).toBe(
      "I'm a vegetarian. More than once, a delivery order showed up with meat in a dish I ordered without it, and I took a bite before I noticed. It might sound extreme, but I felt violated. The delivery app couldn't have cared less. It sent me around an automated loop that made it impossible to get compensated.",
    );
    expect(en.aboutStoryP2).toBe(
      "I built this so anyone can file a complaint with the Attorney General and hold these companies accountable. It's unacceptable that these corporations abuse us.",
    );
  });

  it("keeps the home page to the approved headline, subhead, button and link", () => {
    expect(en.homeHeadline).toBe("Get your delivery order money back");
    expect(en.homeSubhead).toBe("Demand the AG enforce AB 578");
    expect(en.homeCta).toBe("File a complaint →");
    expect(en.homeHow).toBe("How?");
  });
});
