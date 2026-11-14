/**
 * Descriptive filenames for the finished evidence PDF, for example
 * `doordash-2026-11-14-evidence.pdf`. Pure, unit-tested in node.
 */

/**
 * Turn a platform name into a filename-safe slug: "Uber Eats" becomes
 * "uber-eats", "DoorDash (Caviar)" becomes "doordash-caviar". An empty or
 * entirely unsluggable name yields "delivery" so the filename always has a
 * meaningful prefix.
 */
export function slugifyPlatform(platform: string): string {
  const slug = platform
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug.length > 0 ? slug : "delivery";
}

/** Local calendar date as `YYYY-MM-DD`, zero-padded. */
export function isoDate(date: Date): string {
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

/**
 * Filename for the evidence PDF: `doordash-2026-11-14-evidence.pdf`.
 * The date is the incident date the user gave, or today when unknown.
 */
export function evidenceFilename(platform: string, date: Date): string {
  return `${slugifyPlatform(platform)}-${isoDate(date)}-evidence.pdf`;
}
