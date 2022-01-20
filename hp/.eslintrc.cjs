// https://eslint.org/docs/user-guide/configuring

module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  parserOptions: {
    sourceType: 'module',
  },
  extends: ['eslint:all', 'prettier'],
  rules: {
    'id-length': 'off',
  },
};
