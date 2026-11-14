/**
 * Translation key parity check. Fails when a live locale catalog contains any
 * key but misses keys present in the English source: a live locale must ship
 * every key or none at all. Empty catalogs are allowed while translations are
 * pending (the site falls back to English at runtime).
 *
 * Run with: npm run check:i18n
 */
import { pathToFileURL } from "node:url";
import {
  catalogs,
  DEFAULT_LOCALE,
  localeList,
  locales,
} from "../src/i18n/index";
import { en } from "../src/i18n/en";

export interface CatalogCheck {
  locale: string;
  live: boolean;
  keys: string[];
}

/** Pure core, unit tested. Returns one error string per problem found. */
export function findParityIssues(
  sourceKeys: string[],
  checks: CatalogCheck[],
): string[] {
  const issues: string[] = [];
  for (const check of checks) {
    if (!check.live || check.keys.length === 0) continue;
    const missing = sourceKeys.filter((key) => !check.keys.includes(key));
    if (missing.length > 0) {
      issues.push(
        `${check.locale}: missing keys that exist in en: ${missing.join(", ")}`,
      );
    }
    const extra = check.keys.filter((key) => !sourceKeys.includes(key));
    if (extra.length > 0) {
      issues.push(
        `${check.locale}: keys that do not exist in en: ${extra.join(", ")}`,
      );
    }
  }
  return issues;
}

function main() {
  const sourceKeys = Object.keys(en);
  const checks: CatalogCheck[] = localeList
    .filter((locale) => locale !== DEFAULT_LOCALE)
    .map((locale) => ({
      locale,
      live: locales[locale].live,
      keys: Object.keys(catalogs[locale]),
    }));
  const issues = findParityIssues(sourceKeys, checks);
  if (issues.length > 0) {
    console.error("Translation key parity check failed:");
    for (const issue of issues) {
      console.error(`  ${issue}`);
    }
    process.exitCode = 1;
    return;
  }
  console.log(`Translation key parity: OK (${sourceKeys.length} source keys)`);
}

const isDirectRun =
  process.argv[1] !== undefined &&
  import.meta.url === pathToFileURL(process.argv[1]).href;
if (isDirectRun) {
  main();
}
