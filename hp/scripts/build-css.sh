#!/usr/bin/env sh

# SPDX-FileCopyrightText: © 2022 Sebastian Davids <sdavids@gmx.de>
# SPDX-License-Identifier: Apache-2.0

# script needs to be invoked from the hp root directory

set -eu

npx --yes --quiet tailwindcss -c tailwind.config.mjs -i src/s/app.src.css -o src/s/app.css.tmp

npx --yes --quiet lightningcss --browserslist --minify src/s/app.css.tmp --output-file src/s/app.css

rm src/s/app.css.tmp
