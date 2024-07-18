// SPDX-FileCopyrightText: © 2022 Sebastian Davids <sdavids@gmx.de>
// SPDX-License-Identifier: Apache-2.0

// https://github.com/okonet/lint-staged#configuration

// noinspection JSUnusedGlobalSymbols
export default {
  '*.{js,mjs}': ['eslint'],
  '../**/*.{css,html,js,json,mjs,webmanifest}': ['prettier --check'],
  '../**/*.{svg,xml}': ['prettier --plugin=@prettier/plugin-xml --check'],
  '../**/*.yaml': ['prettier --check', 'yamllint --strict'],
  '../**/*.sh': ['shellcheck'],
  '../**/Dockerfile': ['hadolint --no-color -c ../.hadolint.yaml'],
};
