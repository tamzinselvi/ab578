import { describe, expect, it } from "vitest";
import { ISSUE_ORDER } from "../../src/lib/complaint/generate";
import { enTemplates } from "../../src/lib/complaint/templates/en";
import {
  getTemplates,
  templateFiles,
} from "../../src/lib/complaint/templates/index";
import type { ComplaintTemplates } from "../../src/lib/complaint/templates/types";
import type { Issue } from "../../src/lib/complaint/types";

const EN_KEYS = Object.keys(enTemplates) as (keyof ComplaintTemplates)[];

const ARGUED_ISSUES: Issue[] = [
  "wrong_items",
  "missing_items",
  "unusable_items",
];

/** Every module in the templates directory; structure is checked per file. */
const templateModules = import.meta.glob<
  Record<string, Partial<ComplaintTemplates>>
>("../../src/lib/complaint/templates/*.ts", { eager: true });

function templateExportNames(
  module: Record<string, Partial<ComplaintTemplates>>,
): string[] {
  return Object.keys(module).filter((key) => key.endsWith("Templates"));
}

function staticStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value))
    value.forEach((item) => staticStrings(item, out));
  else if (value && typeof value === "object")
    Object.values(value).forEach((item) => staticStrings(item, out));
  return out;
}

describe("template files", () => {
  const files = Object.entries(templateModules).filter(
    ([path]) =>
      !path.endsWith("/index.ts") &&
      !path.endsWith("/types.ts") &&
      !path.endsWith("/en.ts"),
  );

  it("English covers every issue in askRequest and issueClause", () => {
    for (const issue of ISSUE_ORDER) {
      expect(
        enTemplates.askRequest[issue],
        `askRequest for ${issue}`,
      ).toBeTruthy();
      expect(
        enTemplates.issueClause[issue],
        `issueClause for ${issue}`,
      ).toBeTruthy();
    }
  });

  it("English carries floor wording for every argued issue", () => {
    for (const issue of ARGUED_ISSUES) {
      expect(
        enTemplates.askFallback[issue],
        `askFallback for ${issue}`,
      ).toBeTruthy();
    }
  });

  for (const [path, module] of files) {
    it(`${path} keeps the English structure`, () => {
      const names = templateExportNames(module);
      expect(names.length, "exactly one *Templates export").toBe(1);
      const templates = module[names[0]];

      for (const key of Object.keys(
        templates,
      ) as (keyof ComplaintTemplates)[]) {
        expect(
          EN_KEYS.includes(key),
          `unknown template key "${key}" (not in English)`,
        ).toBe(true);
      }
      if (templates.askRequest) {
        for (const issue of ISSUE_ORDER) {
          expect(
            templates.askRequest[issue],
            `askRequest covers ${issue}`,
          ).toBeTruthy();
        }
      }
      if (templates.issueClause) {
        for (const issue of ISSUE_ORDER) {
          expect(
            templates.issueClause[issue],
            `issueClause covers ${issue}`,
          ).toBeTruthy();
        }
      }
      if (templates.askFallback) {
        for (const issue of ARGUED_ISSUES) {
          expect(
            templates.askFallback[issue],
            `askFallback covers argued issue ${issue}`,
          ).toBeTruthy();
        }
      }
      for (const text of staticStrings(templates)) {
        expect(text, "no em dashes in template strings").not.toContain(
          "\u2014",
        );
      }
    });
  }
});

describe("getTemplates fallback", () => {
  it("returns the English templates for en", () => {
    expect(getTemplates("en")).toBeDefined();
    expect(getTemplates("en")?.askRequest.missing_items).toBe(
      enTemplates.askRequest.missing_items,
    );
  });

  it("returns undefined for locales with no file", () => {
    expect(getTemplates("ko")).toBeUndefined();
  });

  it("returns undefined for an empty file (translations pending)", () => {
    templateFiles.tl = {};
    try {
      expect(getTemplates("tl")).toBeUndefined();
    } finally {
      delete templateFiles.tl;
    }
  });

  it("merges partial templates over English per key", () => {
    templateFiles["zh-hant"] = {
      issueClause: { ...enTemplates.issueClause, missing_items: "translated" },
    };
    try {
      const merged = getTemplates("zh-hant");
      expect(merged?.issueClause.missing_items).toBe("translated");
      expect(merged?.issueClause.not_delivered).toBe(
        enTemplates.issueClause.not_delivered,
      );
      expect(merged?.shortRequest).toBe(enTemplates.shortRequest);
    } finally {
      delete templateFiles["zh-hant"];
    }
  });
});
