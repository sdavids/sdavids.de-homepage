// https://eslint.org/docs/user-guide/configuring

/* eslint-disable no-undef */
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2022: true,
  },
  parserOptions: {
    sourceType: 'module',
  },
  extends: [
    'eslint:all',
    'plugin:compat/recommended',
    'plugin:json/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist/*'],
  reportUnusedDisableDirectives: true,
  rules: {
    'capitalized-comments': 'off',
    'id-length': 'off',
    'sort-keys': 'off',
    'multiline-comment-style': 'off',
    'no-magic-numbers': 'off',
    'one-var': 'off',
    'prefer-destructuring': ['error', { object: true, array: false }],
    'sort-vars': 'off',
  },
};
