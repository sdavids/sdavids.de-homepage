// SPDX-FileCopyrightText: © 2023 Sebastian Davids <sdavids@gmx.de>
// SPDX-License-Identifier: Apache-2.0

// https://eslint.org/docs/latest/use/configure/configuration-files

import globals from 'globals';
import js from '@eslint/js';
import json from '@eslint/json';
import css from '@eslint/css';
// eslint-disable-next-line import-x/no-unresolved
import { tailwindSyntax } from '@eslint/css/syntax';
import compat from 'eslint-plugin-compat';
import * as depend from 'eslint-plugin-depend';
import * as pluginImportX from 'eslint-plugin-import-x';
import vitest from '@vitest/eslint-plugin';
import testingLibrary from 'eslint-plugin-testing-library';
import jestDom from 'eslint-plugin-jest-dom';
import playwright from 'eslint-plugin-playwright';

export default [
  {
    ignores: ['dist/*'],
    name: 'global/ignores',
  },
  {
    files: ['**/*.json'],
    ignores: ['package-lock.json'],
    language: 'json/json',
    plugins: {
      json,
    },
    rules: {
      ...json.configs.recommended.rules,
    },
    name: 'eslint/json/recommended',
  },
  {
    files: ['**/*.css'],
    ignores: ['src/s/app.css', 'src/s/app.css.tmp'],
    plugins: {
      css,
    },
    language: 'css/css',
    languageOptions: {
      customSyntax: tailwindSyntax,
    },
    rules: {
      ...css.configs.recommended.rules,
      'css/use-baseline': [
        'error',
        {
          // align with js config below,
          // esbuild_target in build.sh,
          // browserslist in package.json,
          // and compilerOptions.target and .lib in jsconfig.json
          available: 2022,
        },
      ],
    },
    name: 'eslint/css/recommended',
  },
  pluginImportX.flatConfigs.recommended,
  {
    files: ['**/*.{js,mjs}'],
    ...js.configs.all,
    name: 'eslint/js/all',
  },
  {
    files: ['src/j/*.js', 'src/j/**/*.js'],
    ...compat.configs['flat/recommended'],
    name: 'eslint/browser-compat',
  },
  {
    files: ['vitest/*.test.mjs', 'vitest/**/*.test.mjs'],
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
    },
    name: 'eslint/vitest',
  },
  {
    files: ['vitest/*.test.mjs', 'vitest/**/*.test.mjs'],
    ...testingLibrary.configs['flat/dom'],
    name: 'eslint/testing-library',
  },
  {
    files: ['vitest/*.test.mjs', 'vitest/**/*.test.mjs'],
    ...jestDom.configs['flat/all'],
    name: 'eslint/jest-dom',
  },
  {
    ...playwright.configs['flat/recommended'],
    files: ['e2e/**/*.mjs'],
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      'playwright/no-skipped-test': [
        'error',
        {
          allowConditional: true,
        },
      ],
    },
    name: 'eslint/playwright',
  },
  depend.configs['flat/recommended'],
  {
    files: ['**/*.{js,mjs}'],
    rules: {
      'capitalized-comments': 'off',
      'func-names': ['error', 'always', { generators: 'as-needed' }],
      'id-length': 'off',
      'line-comment-position': 'off',
      'max-lines': 'off',
      'max-lines-per-function': 'off',
      'max-params': 'off',
      'max-statements': 'off',
      'multiline-comment-style': 'off',
      'no-continue': 'off',
      'no-inline-comments': 'off',
      'no-magic-numbers': 'off',
      'no-param-reassign': 'off',
      'no-plusplus': 'off',
      'no-shadow': 'off',
      'no-ternary': 'off',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-warning-comments': 'off',
      'one-var': 'off',
      'prefer-destructuring': ['error', { object: true, array: false }],
      'sort-keys': 'off',
      'sort-imports': ['error', { ignoreDeclarationSort: true }],
      'sort-vars': 'off',
      radix: 'off',
    },
    name: 'sdavids/js/defaults',
  },
  {
    files: ['src/j/*.js', 'src/j/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        // align with css config above and
        // esbuild_target in build.sh,
        // browserslist in package.json,
        // and compilerOptions.target and .lib in jsconfig.json
        ecmaVersion: 2022,
      },
    },
    name: 'sdavids/js/browser',
  },
  {
    files: ['vitest/**/*.mjs'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: 'latest',
      },
    },
    rules: {
      'init-declarations': 'off',
      'no-shadow': 'off',
      'no-undefined': 'off',
    },
    name: 'sdavids/js/vitest',
  },
  {
    files: ['e2e/**/*.mjs'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: 'latest',
      },
    },
    name: 'sdavids/js/playwright',
  },
  {
    files: ['*.mjs', 'scripts/*.mjs'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: 'latest',
      },
    },
    rules: {
      'no-console': 'off',
    },
    name: 'sdavids/js/node',
  },
];
