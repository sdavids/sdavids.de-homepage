// https://eslint.org/docs/user-guide/configuring

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
  ],
  ignorePatterns: ['dist/*'],
  reportUnusedDisableDirectives: true,
  rules: {
    'capitalized-comments': 'off',
    'func-names': ['error', 'always', { generators: 'as-needed' }],
    'id-length': 'off',
    'sort-keys': 'off',
    'multiline-comment-style': 'off',
    'no-magic-numbers': 'off',
    'no-ternary': 'off',
    'one-var': 'off',
    'prefer-destructuring': ['error', { object: true, array: false }],
    'sort-vars': 'off',
  },
};
