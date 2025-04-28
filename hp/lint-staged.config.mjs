// SPDX-FileCopyrightText: © 2022 Sebastian Davids <sdavids@gmx.de>
// SPDX-License-Identifier: Apache-2.0

// https://github.com/okonet/lint-staged#configuration

// noinspection JSUnusedGlobalSymbols
/** @type {import('lint-staged').Configuration} */
export default {
  '*.{js,mjs}': ['eslint'],
  'src/j/**/*.js': [() => 'tsc --project jsconfig.prod.json'],
  '../**/*.{css,html,js,json,mjs,webmanifest}': [
    'prettier --config prettier.config.mjs --check',
  ],
  '../**/*.{svg,xml}': [
    'prettier --config prettier.config.mjs --plugin=@prettier/plugin-xml --check',
  ],
  '../**/*.yaml': [
    'prettier --config prettier.config.mjs --check',
    'yamllint --strict',
  ],
  '../**/*.sh': [
    'shellcheck',
    'shfmt --diff --indent 2 --case-indent --binary-next-line --simplify',
  ],
  '../**/Dockerfile': ['hadolint --no-color -c ../.hadolint.yaml'],
};
