// @ts-check
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";
import prettierConfig from "eslint-config-prettier";
import globals from "globals";

export default tseslint.config(
  {
    ignores: [
      "dist/**",
      ".astro/**",
      "node_modules/**",
      "playwright-report/**",
      "test-results/**",
      "coverage/**",
    ],
  },
  eslint.configs.recommended,
  {
    files: ["**/*.{mjs,cjs}"],
    languageOptions: { globals: globals.node },
  },
  ...tseslint.configs.recommended,
  ...astro.configs["flat/recommended"],
  prettierConfig,
);
