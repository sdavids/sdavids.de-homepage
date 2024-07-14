#!/usr/bin/env sh

# SPDX-FileCopyrightText: © 2022 Sebastian Davids <sdavids@gmx.de>
# SPDX-License-Identifier: Apache-2.0

# script needs to be invoked from the hp root directory

set -eu

# align with parserOptions.ecmaVersion in eslint.config.mjs
readonly esbuild_target="${1:-es2021}"
readonly dir='dist'

npm run build:css

rm -rf "${dir}"
cp -rp src "${dir}"

npx --yes --quiet esbuild 'src/j/app.mjs' --bundle --splitting --outdir="${dir}/j" --out-extension:.js=.mjs --format=esm --target="${esbuild_target}" --minify --legal-comments=none

rm "${dir}/s/app.src.css"
