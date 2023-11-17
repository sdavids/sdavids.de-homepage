// https://github.com/okonet/lint-staged#configuration

module.exports = {
  '*.{js,cjs,mjs,json}': ['eslint', 'prettier --check'],
  '*.{css,html,yaml}': ['prettier --check'],
};
