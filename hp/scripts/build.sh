#!/usr/bin/env sh

# SPDX-FileCopyrightText: © 2022 Sebastian Davids <sdavids@gmx.de>
# SPDX-License-Identifier: Apache-2.0

set -eu

readonly base_dir="${1:-$PWD}"

cd "${base_dir}"

if [ ! -d 'node_modules' ]; then
  npm ci --ignore-scripts=false --fund=false
fi

# align with parserOptions.ecmaVersion in eslint.config.mjs
readonly esbuild_target="${1:-es2021}"
readonly dir='dist'

node --run build:css

rm -rf "${dir}"
cp -rp src "${dir}"

npx --yes --quiet esbuild 'src/j/app.mjs' --bundle --splitting --outdir="${dir}/j" --out-extension:.js=.mjs --format=esm --target="${esbuild_target}" --minify --legal-comments=none

rm "${dir}/s/app.src.css"
