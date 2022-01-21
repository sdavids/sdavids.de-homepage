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
    'id-length': 'off',
    'sort-keys': 'off',
  },
  ignorePatterns: ['dist/*'],
};
