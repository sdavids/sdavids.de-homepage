// https://eslint.org/docs/latest/use/configure/configuration-files-new

import globals from 'globals';
import js from '@eslint/js';

export default [
  {
    ignores: ['dist/*'],
  },
  js.configs.all,
  {
    name: 'sdavids.de-homepage',
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    rules: {
      'capitalized-comments': 'off',
      'func-names': ['error', 'always', { generators: 'as-needed' }],
      'id-length': 'off',
      'sort-keys': 'off',
      'multiline-comment-style': 'off',
      'no-continue': 'off',
      'no-magic-numbers': 'off',
      'no-ternary': 'off',
      'one-var': 'off',
      'prefer-destructuring': ['error', { object: true, array: false }],
      'sort-vars': 'off',
    },
  },
];
