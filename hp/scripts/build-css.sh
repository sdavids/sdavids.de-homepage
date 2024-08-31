#!/usr/bin/env sh

# SPDX-FileCopyrightText: © 2022 Sebastian Davids <sdavids@gmx.de>
# SPDX-License-Identifier: Apache-2.0

set -eu

readonly base_dir="${1:-$PWD}"

cd "${base_dir}"

if [ ! -d 'node_modules' ]; then
  npm ci --ignore-scripts=false --fund=false
fi

npx --yes --quiet tailwindcss -c tailwind.config.mjs -i src/s/app.src.css -o src/s/app.css.tmp

npx --yes --quiet lightningcss --browserslist --minify src/s/app.css.tmp --output-file src/s/app.css

rm src/s/app.css.tmp
