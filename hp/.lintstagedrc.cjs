// https://github.com/okonet/lint-staged#configuration

'use strict';

module.exports = {
  '*.{cjs,js,mjs}': ['eslint'],
  '*.{cjs,css,html,js,json,mjs,webmanifest}': ['prettier --check'],
  '../**/*.yaml': ['prettier --check', 'yamllint --strict .'],
  '../**/*.sh': ['shellcheck'],
  '../**/Dockerfile': ['hadolint --no-color'],
};
