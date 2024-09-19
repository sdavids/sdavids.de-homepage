#!/usr/bin/env sh

# SPDX-FileCopyrightText: © 2022 Sebastian Davids <sdavids@gmx.de>
# SPDX-License-Identifier: Apache-2.0

set -eu

readonly base_dir="${1:-$PWD}"

readonly build_dir="${base_dir}/dist"
readonly eslint_cache_file="${base_dir}/.eslintcache"
readonly prettier_cache_file="${base_dir}/node_modules/.cache/prettier/.prettier-cache"
readonly generated_app_css_file="${base_dir}/src/s/app.css"
readonly lighthouseci_dir="${base_dir}/.lighthouseci"

rm -rf "${build_dir}" \
  "${eslint_cache_file}" \
  "${prettier_cache_file}" \
  "${generated_app_css_file}" \
  "${lighthouseci_dir}"
