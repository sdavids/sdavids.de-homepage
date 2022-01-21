// https://github.com/okonet/lint-staged#configuration

/* eslint-disable no-undef */
module.exports = {
  '*.{js,cjs,mjs,json}': ['eslint', 'prettier --write'],
  '*.yaml': ['prettier --write'],
};
