import type { Messages } from "./en";

// Translations land with task AB-578-COMPLAINT-A-8. Until then the site shows
// the English fallback for every key, and the CI parity check allows an empty
// catalog. A partially filled catalog fails the parity check.
export const es: Partial<Messages> = {};
