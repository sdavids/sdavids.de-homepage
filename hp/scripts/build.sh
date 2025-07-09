#!/usr/bin/env sh

# SPDX-FileCopyrightText: © 2022 Sebastian Davids <sdavids@gmx.de>
# SPDX-License-Identifier: Apache-2.0

# pnpm needs to be in $PATH
# https://pnpm.io/installation

set -eu

readonly base_dir="${1:-$PWD}"

if [ ! -d "${base_dir}" ]; then
  printf "The directory '%s' does not exist.\n" "${base_dir}" >&2
  exit 1
fi

cd "${base_dir}"

if [ ! -d 'node_modules' ]; then
  pnpm --silent install
fi

# align with css/use-baseline and parserOptions.ecmaVersion in
# eslint.config.mjs, browserslist in package.json,
# and compilerOptions.target and .lib in jsconfig.json
readonly esbuild_target="${1:-es2022}"
readonly dir='dist'

pnpm run build:css

rm -rf "${dir}"
cp -rp src "${dir}"

pnpm --silent dlx esbuild 'src/j/app.js' --bundle --splitting --outdir="${dir}/j" --format=esm --target="${esbuild_target}" --minify --legal-comments=none

rm "${dir}/s/app.src.css"
