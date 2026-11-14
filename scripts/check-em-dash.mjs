// Em dash check. Fails the build when any user-facing copy in src/pages,
// src/i18n, or src/components contains an em dash (U+2014), including the
// Chinese double dash, which is two U+2014 characters in a row. The arrow
// character in the File-a-complaint button is fine.
//
// Run with: npm run check:emdash
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ROOTS = ["src/pages", "src/i18n", "src/components"];
const EM_DASH = "\u2014";

function listFiles(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...listFiles(full));
    } else {
      files.push(full);
    }
  }
  return files;
}

let failed = false;
for (const root of ROOTS) {
  for (const file of listFiles(root)) {
    const lines = readFileSync(file, "utf8").split("\n");
    lines.forEach((line, index) => {
      if (line.includes(EM_DASH)) {
        failed = true;
        console.error(`${file}:${index + 1}: em dash (U+2014) found`);
      }
    });
  }
}

if (failed) {
  console.error(
    "Em dash check failed: remove all em dashes from user-facing copy.",
  );
  process.exit(1);
} else {
  console.log("Em dash check: OK");
}
