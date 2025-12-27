// SPDX-FileCopyrightText: © 2023 Sebastian Davids <sdavids@gmx.de>
// SPDX-License-Identifier: Apache-2.0

// https://eslint.org/docs/latest/use/configure/configuration-files

import globals from "globals";
import js from "@eslint/js";
import json from "@eslint/json";
import css from "@eslint/css";
import { tailwind4 } from "tailwind-csstree";
import compat from "eslint-plugin-compat";
import { configs as dependConfigs } from "eslint-plugin-depend";
import { flatConfigs as importConfigs } from "eslint-plugin-import-x";
import vitest from "@vitest/eslint-plugin";
import testingLibrary from "eslint-plugin-testing-library";
import jestDom from "eslint-plugin-jest-dom";
import playwright from "eslint-plugin-playwright";

export default [
  {
    linterOptions: {
      reportUnusedDisableDirectives: "error",
      reportUnusedInlineConfigs: "error",
    },
    name: "global/report-unused",
  },
  {
    ignores: ["dist/*"],
    name: "global/ignores",
  },
  {
    files: ["**/*.json"],
    ignores: [
      "package-lock.json",
      ".devcontainer/devcontainer.json",
      ".devcontainer/devcontainer-lock.json",
    ],
    language: "json/json",
    plugins: {
      json,
    },
    rules: {
      ...json.configs.recommended.rules,
    },
    name: "eslint/json/recommended",
  },
  {
    files: [".devcontainer/devcontainer.json"],
    language: "json/jsonc",
    plugins: {
      json,
    },
    rules: {
      ...json.configs.recommended.rules,
    },
    name: "eslint/jsonc/recommended",
  },
  {
    files: ["**/*.css"],
    ignores: ["src/s/app.css", "src/s/app.css.tmp"],
    plugins: {
      css,
    },
    language: "css/css",
    languageOptions: {
      customSyntax: tailwind4,
    },
    rules: {
      ...css.configs.recommended.rules,
      // https://github.com/eslint/css/pull/177
      "css/no-invalid-properties": "off",
      // "css/no-invalid-properties": [
      //   "error",
      //   {
      //     allowUnknownVariables: true,
      //   },
      // ],
      "css/prefer-logical-properties": "error",
      // https://github.com/eslint/css/issues/193
      // "css/relative-font-units": [
      //   "error",
      //   {
      //     allowUnits: ["rem"],
      //   },
      // ],
      "css/use-baseline": [
        "error",
        {
          // align with the js config below,
          // esbuild_target in build.sh,
          // browserslist in package.json, and
          // compilerOptions.target and .lib in jsconfig.json
          available: 2023,
        },
      ],
      "css/use-layers": "error",
    },
    name: "eslint/css/recommended",
  },
  {
    files: ["**/*.{js,mjs}"],
    ...js.configs.all,
    name: "eslint/js/all",
  },
  {
    files: ["src/j/*.js", "src/j/**/*.js"],
    ...compat.configs["flat/recommended"],
    name: "eslint/browser-compat",
  },
  importConfigs.recommended,
  {
    files: ["**/*.{js,mjs}"],
    rules: {
      "import-x/exports-last": "error",
      "import-x/extensions": ["error", "ignorePackages"],
      "import-x/first": "error",
      "import-x/group-exports": "error",
      "import-x/newline-after-import": "error",
      "import-x/no-absolute-path": "error",
      "import-x/no-deprecated": "error",
      "import-x/no-empty-named-blocks": "error",
      "import-x/no-mutable-exports": "error",
      "import-x/no-named-as-default": "error",
      "import-x/no-named-as-default-member": "error",
      "import-x/no-named-default": "error",
      "import-x/no-namespace": "error",
      "import-x/no-self-import": "error",
      "import-x/no-unassigned-import": ["error", { allow: ["**/*.css"] }],
      "import-x/no-useless-path-segments": "error",
      "import-x/order": "error",
    },
    name: "eslint/js/import",
  },
  dependConfigs["flat/recommended"],
  {
    rules: {
      "depend/ban-dependencies": [
        "error",
        {
          allowed: ["lint-staged"],
        },
      ],
    },
    name: "workaround/es-tooling/module-replacements/issues/214",
  },
  {
    files: ["vitest/*.test.mjs", "vitest/**/*.test.mjs"],
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.all.rules,
      ...vitest.configs.recommended.rules,
      "import-x/no-unresolved": [
        "error",
        {
          ignore: ["^@src"],
        },
      ],
      "vitest/max-expects": "off",
      "vitest/no-done-callback": "off",
      "vitest/no-hooks": "off",
      "vitest/padding-around-after-all-blocks": "off",
      "vitest/padding-around-after-each-blocks": "off",
      "vitest/padding-around-before-all-blocks": "off",
      "vitest/padding-around-before-each-blocks": "off",
      "vitest/padding-around-describe-blocks": "off",
      "vitest/padding-around-expect-groups": "off",
      "vitest/padding-around-test-blocks": "off",
      "vitest/prefer-describe-function-title": "off",
      "vitest/prefer-expect-assertions": "off",
    },
    name: "eslint/vitest",
  },
  {
    files: ["vitest/*.test.mjs", "vitest/**/*.test.mjs"],
    ...testingLibrary.configs["flat/dom"],
    rules: {
      ...testingLibrary.configs["flat/dom"].rules,
      "testing-library/prefer-explicit-assert": "error",
      "testing-library/prefer-user-event": "error",
    },
    name: "eslint/testing-library",
  },
  {
    files: ["vitest/*.test.mjs", "vitest/**/*.test.mjs"],
    ...jestDom.configs["flat/all"],
    name: "eslint/jest-dom",
  },
  {
    ...playwright.configs["flat/recommended"],
    files: ["playwright/**/*.mjs"],
    rules: {
      ...playwright.configs["flat/recommended"].rules,
      "playwright/no-skipped-test": [
        "error",
        {
          allowConditional: true,
        },
      ],
    },
    name: "eslint/playwright",
  },
  {
    files: ["**/*.{js,mjs}"],
    rules: {
      "capitalized-comments": "off",
      "func-names": ["error", "always", { generators: "as-needed" }],
      "id-length": "off",
      "line-comment-position": "off",
      "max-lines": "off",
      "max-lines-per-function": "off",
      "max-params": "off",
      "max-statements": "off",
      "multiline-comment-style": "off",
      "no-continue": "off",
      "no-inline-comments": "off",
      "no-magic-numbers": "off",
      "no-param-reassign": "off",
      "no-plusplus": "off",
      "no-shadow": "off",
      "no-ternary": "off",
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "no-warning-comments": "off",
      "one-var": "off",
      "prefer-destructuring": ["error", { object: true, array: false }],
      radix: "off",
      "sort-keys": "off",
      "sort-imports": ["error", { ignoreDeclarationSort: true }],
      "sort-vars": "off",
    },
    name: "sdavids/js/defaults",
  },
  {
    files: ["src/j/*.js", "src/j/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        // align with the CSS config above,
        // esbuild_target in build.sh,
        // browserslist in package.json, and
        // compilerOptions.target and .lib in jsconfig.json
        ecmaVersion: 2023,
      },
    },
    rules: {
      "import-x/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: false,
          optionalDependencies: false,
          peerDependencies: false,
        },
      ],
      "import-x/no-nodejs-modules": "error",
    },
    name: "sdavids/js/browser",
  },
  {
    files: ["vitest/**/*.mjs"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: "latest",
      },
    },
    rules: {
      "import-x/no-extraneous-dependencies": [
        "error",
        {
          optionalDependencies: false,
          peerDependencies: false,
        },
      ],
      "init-declarations": "off",
      "no-shadow": "off",
      "no-undefined": "off",
    },
    name: "sdavids/js/vitest",
  },
  {
    files: ["playwright/**/*.mjs"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: "latest",
      },
    },
    rules: {
      "import-x/no-extraneous-dependencies": [
        "error",
        {
          optionalDependencies: false,
          peerDependencies: false,
        },
      ],
    },
    name: "sdavids/js/playwright",
  },
  {
    files: ["*.mjs", "scripts/*.mjs", ".husky/*.mjs"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: "latest",
      },
    },
    rules: {
      "import-x/no-extraneous-dependencies": [
        "error",
        {
          optionalDependencies: false,
          peerDependencies: false,
        },
      ],
      "no-console": "off",
    },
    name: "sdavids/js/node",
  },
];
