// https://github.com/okonet/lint-staged#configuration

'use strict';

module.exports = {
  '*.{cjs,js,mjs}': ['eslint'],
  '*.{cjs,css,html,js,json,mjs}': ['prettier --check'],
  '*.yaml': [
    'prettier --check',
    'yamllint --strict -c ../.github/.yamllint.yaml',
  ],
  '*.sh': ['shellcheck'],
};
