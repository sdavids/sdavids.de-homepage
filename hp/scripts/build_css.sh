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

pnpm --silent dlx @tailwindcss/cli --input src/s/app.src.css --output src/s/app.css --minify

# delete tailwind license header
if [ "$(uname)" = 'Darwin' ]; then
  sed -i '' '1d' src/s/app.css
else
  sed -i '1d' src/s/app.css
fi
