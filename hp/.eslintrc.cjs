// https://eslint.org/docs/user-guide/configuring

/* eslint-disable no-undef */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2017: true,
  },
  parserOptions: {
    sourceType: 'module',
  },
  extends: ['eslint:all', 'plugin:json/recommended', 'prettier'],
  ignorePatterns: ['dist/*'],
  reportUnusedDisableDirectives: true,
  rules: {
    'id-length': 'off',
    'sort-keys': 'off',
  },
};
