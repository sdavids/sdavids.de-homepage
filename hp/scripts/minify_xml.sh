#!/usr/bin/env sh

# SPDX-FileCopyrightText: © 2023 Sebastian Davids <sdavids@gmx.de>
# SPDX-License-Identifier: Apache-2.0

# pnpm needs to be in $PATH
# https://pnpm.io/installation

set -eu

readonly base_dir="${1:-$PWD}"

# https://www.npmjs.com/package/minify-xml#options
find "${base_dir}" -type f -name '*.xml' -exec \
  pnpm --silent dlx minify-xml {} \
  --remove-schema-location-attributes \
  --in-place \;
