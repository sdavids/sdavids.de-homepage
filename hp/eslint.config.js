// https://eslint.org/docs/latest/use/configure/configuration-files-new

import globals from 'globals';
import js from '@eslint/js';

// 'plugin:json/recommended', 'prettier'
//
// https://github.com/prettier/eslint-plugin-prettier/issues/591
// https://github.com/azeemba/eslint-plugin-json/issues/80

export default [
  js.configs.all,
  {
    name: 'sdavids.de-homepage',
    ignores: ['dist/*'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    rules: {
      'id-length': 'off',
      'sort-keys': 'off',
      'multiline-comment-style': 'off',
    },
  },
];
