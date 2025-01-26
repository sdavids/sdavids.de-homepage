// SPDX-FileCopyrightText: © 2023 Sebastian Davids <sdavids@gmx.de>
// SPDX-License-Identifier: Apache-2.0

// https://eslint.org/docs/latest/use/configure/configuration-files

import globals from 'globals';
import js from '@eslint/js';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import compat from 'eslint-plugin-compat';
import vitest from '@vitest/eslint-plugin';
import testingLibrary from 'eslint-plugin-testing-library';
import jestDom from 'eslint-plugin-jest-dom';

// noinspection JSUnusedGlobalSymbols
export default [
  {
    ignores: ['dist/*'],
    name: 'global/ignores',
  },
  {
    files: ['**/*.{js,mjs}'],
    ...js.configs.all,
    name: 'eslint/js/all',
  },
  {
    files: ['**/*.json'],
    ignores: ['package-lock.json'],
    language: 'json/json',
    plugins: {
      json,
    },
    ...json.configs.recommended,
    name: 'eslint/json/recommended',
  },
  {
    files: ['**/*.md'],
    language: 'markdown/gfm',
    plugins: {
      markdown,
    },
    name: 'eslint/markdown/recommended',
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
    files: ['**/*.{js,mjs}'],
    rules: {
      'capitalized-comments': 'off',
      'func-names': ['error', 'always', { generators: 'as-needed' }],
      'id-length': 'off',
      'max-lines': 'off',
      'max-lines-per-function': 'off',
      'max-params': 'off',
      'max-statements': 'off',
      'no-continue': 'off',
      'no-magic-numbers': 'off',
      'no-param-reassign': 'off',
      'no-plusplus': 'off',
      'no-ternary': 'off',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_$' }],
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
        // align with esbuild_target in build.sh
        ecmaVersion: 2021,
      },
    },
    name: 'sdavids/js/browser',
  },
  {
    files: ['scripts/*.mjs'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    name: 'sdavids/js/node',
  },
  {
    files: ['vitest/*.test.mjs', 'vitest/**/*.test.mjs'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'init-declarations': 'off',
      'no-shadow': 'off',
      'no-undefined': 'off',
    },
    name: 'sdavids/js/vitest',
  },
];
