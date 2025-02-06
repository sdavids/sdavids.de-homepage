#!/usr/bin/env sh

# SPDX-FileCopyrightText: © 2022 Sebastian Davids <sdavids@gmx.de>
# SPDX-License-Identifier: Apache-2.0

set -eu

readonly base_dir="${1:-$PWD}"

if [ ! -d "${base_dir}" ]; then
  printf "The directory '%s' does not exist.\n" "${base_dir}" >&2
  exit 1
fi

cd "${base_dir}"

if [ ! -d 'node_modules' ]; then
  npm ci --ignore-scripts=false --fund=false
fi

# align with parserOptions.ecmaVersion in eslint.config.mjs and
# compilerOptions.target in jsconfig.json
readonly esbuild_target="${1:-es2021}"
readonly dir='dist'

node --run build:css

rm -rf "${dir}"
cp -rp src "${dir}"

npx --yes --quiet esbuild 'src/j/app.js' --bundle --splitting --outdir="${dir}/j" --format=esm --target="${esbuild_target}" --minify --legal-comments=none

rm "${dir}/s/app.src.css"
