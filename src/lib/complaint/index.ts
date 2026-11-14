/**
 * Public surface of the complaint engine. The wizard, kit screen and tests
 * import from here; see README.md for the full contract.
 */

export { generateKit, ISSUE_ORDER } from "./generate";
export type * from "./types";
export { getTemplates, templateFiles } from "./templates";
export type { ComplaintTemplates, TemplateContext } from "./templates/types";
