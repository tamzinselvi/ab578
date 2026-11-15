/**
 * Weekly check that the AG complaint form still has every field the
 * fill-the-form bookmark sets. Fetches the live form and fails (exit 1) when
 * the form id or any mapped input name is missing, so a redesign of the AG's
 * form is caught before people hit a bookmark that silently fills nothing.
 *
 * Run: npm run check:ag-form
 */

import {
  agFormElementId,
  agFormFacts,
  agFormInputs,
} from "../src/data/destinations";

const response = await fetch(agFormFacts.formUrl, {
  headers: { "User-Agent": "ab578-form-check (+https://ab578.com)" },
});
if (!response.ok) {
  console.error(`AG form returned HTTP ${response.status}`);
  process.exit(1);
}
const html = await response.text();

const missing: string[] = [];
if (!html.includes(`id="${agFormElementId}"`)) {
  missing.push(`form id ${agFormElementId}`);
}
for (const [order, input] of Object.entries(agFormInputs)) {
  if (!html.includes(`name="${input.name}"`)) {
    missing.push(`field ${order}: ${input.name}`);
  }
}

if (missing.length > 0) {
  console.error(
    "The AG form changed. Update agFormInputs in src/data/destinations.ts:",
  );
  for (const item of missing) console.error(`  missing ${item}`);
  process.exit(1);
}
console.log(
  `AG form check: OK (${Object.keys(agFormInputs).length} fields present)`,
);
