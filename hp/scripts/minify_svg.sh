#!/usr/bin/env sh

# SPDX-FileCopyrightText: © 2022 Sebastian Davids <sdavids@gmx.de>
# SPDX-License-Identifier: Apache-2.0

# pnpm needs to be in $PATH
# https://pnpm.io/installation

set -eu

readonly base_dir="${1:-$PWD}"

# https://github.com/svg/svgo
# https://github.com/svg/svgo/blob/main/lib/svgo/coa.js
find "${base_dir}" -type f -name '*.svg' -exec \
  pnpm --silent dlx svgo {} \
  --eol lf \
  --multipass \
  --quiet \
  --output "{}.tmp" \;

# rename *.svg.tmp to *.svg
find "${base_dir}" \
  -type f \
  -name '*.svg.tmp' \
  -exec sh -c 'f="$1"; mv -- "$f" "${f%.svg.tmp}.svg"' shell {} \;
