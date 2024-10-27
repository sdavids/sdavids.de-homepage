// SPDX-FileCopyrightText: © 2023 Sebastian Davids <sdavids@gmx.de>
// SPDX-License-Identifier: Apache-2.0

// https://eslint.org/docs/latest/use/configure/configuration-files

import globals from 'globals';
import js from '@eslint/js';
import json from '@eslint/json';
import compat from 'eslint-plugin-compat';

// noinspection JSUnusedGlobalSymbols
export default [
  {
    ignores: ['dist/*'],
    name: 'global/ignores',
  },
  {
    files: ['**/*.mjs'],
    name: 'eslint/js/all',
    ...js.configs.all,
  },
  {
    files: ['**/*.mjs'],
    name: 'sdavids/defaults/js',
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
      'one-var': 'off',
      'prefer-destructuring': ['error', { object: true, array: false }],
      'sort-keys': 'off',
      'sort-imports': ['error', { ignoreDeclarationSort: true }],
      'sort-vars': 'off',
      radix: 'off',
    },
  },
  {
    files: ['src/j/**/*.mjs'],
    name: 'sdavids/js/web',
    ...compat.configs['flat/recommended'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        // align with esbuild_target in build.sh
        ecmaVersion: 2021,
      },
    },
  },
  {
    files: ['scripts/*.mjs'],
    name: 'sdavids/js/nodejs',
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ['**/*.json'],
    ignores: ['package-lock.json'],
    language: 'json/json',
    plugins: {
      json,
    },
    name: 'eslint/json/recommended',
    ...json.configs.recommended,
  },
];
