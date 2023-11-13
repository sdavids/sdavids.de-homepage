// https://github.com/okonet/lint-staged#configuration

/* eslint-disable no-undef */
module.exports = {
  '*.{js,cjs,mjs,json}': ['eslint', 'prettier --check'],
  '*.{css,html,yaml}': ['prettier --check'],
};
