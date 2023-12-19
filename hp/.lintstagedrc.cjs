// https://github.com/okonet/lint-staged#configuration

'use strict';

module.exports = {
  '*.{js,cjs,mjs,json}': ['eslint', 'prettier --check'],
  '*.{css,html}': ['prettier --check'],
  '*.yaml': [
    'prettier --check',
    'yamllint --strict -c ../.github/.yamllint.yaml',
  ],
  '*.sh': ['shellcheck'],
};
