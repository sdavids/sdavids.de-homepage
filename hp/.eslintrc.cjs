// https://eslint.org/docs/user-guide/configuring

/* eslint-disable no-undef */
module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  parserOptions: {
    sourceType: 'module',
  },
  extends: ['eslint:all', 'plugin:json/recommended', 'prettier'],
  rules: {
    'capitalized-comments': 'off',
    'id-length': 'off',
    'no-console': 'off',
    'line-comment-position': 'off',
    'no-underscore-dangle': 'off',
    'no-inline-comments': 'off',
    'max-params': 'off',
    'no-magic-numbers': 'off',
    'no-ternary': 'off',
    'one-var': 'off',
    'sort-keys': 'off',
    'sort-imports': 'off',
  },
  ignorePatterns: ['dist/*'],
  reportUnusedDisableDirectives: true,
};
