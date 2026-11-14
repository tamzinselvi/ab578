/**
 * Template registry and English fallback.
 *
 * Locales fall back per key: a partial template file merges over the English
 * source. A locale with no file (or an empty one, while translations are
 * pending) renders purely in English and produces no side-by-side
 * translations.
 *
 * The translation task adds one file per locale here: import `<locale>Templates`
 * from './<locale>' and add it to templateFiles. The structure test in
 * tests/unit/complaint-templates.test.ts picks new files up automatically.
 */

import type { Locale } from "../../../i18n/index";
import { enTemplates } from "./en";
import type { ComplaintTemplates } from "./types";

export type { ComplaintTemplates } from "./types";
export { enTemplates } from "./en";

/** Locale template files. Only English ships with the engine itself. */
export const templateFiles: Partial<
  Record<Locale, Partial<ComplaintTemplates>>
> = {
  en: enTemplates,
};

/**
 * The templates for a locale, merged over English per key. Returns undefined
 * when the locale has no template file or an empty one, so callers can skip
 * side-by-side translation instead of rendering English twice.
 */
export function getTemplates(locale: Locale): ComplaintTemplates | undefined {
  const own = templateFiles[locale];
  if (!own || Object.keys(own).length === 0) return undefined;
  return { ...enTemplates, ...own };
}
