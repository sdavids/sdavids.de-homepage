#!/usr/bin/env sh

# SPDX-FileCopyrightText: © 2022 Sebastian Davids <sdavids@gmx.de>
# SPDX-License-Identifier: Apache-2.0

set -eu

readonly base_dir="${1:-$PWD}"

readonly build_dir="${base_dir}/dist"
readonly prettier_cache_file="${base_dir}/node_modules/.cache/prettier/.prettier-cache"
readonly ts_build_info_file="${base_dir}/node_modules/.cache/tsc/.tsbuildcache"
readonly eslint_cache_dir="${base_dir}/node_modules/.cache/eslint"
readonly generated_app_css_file="${base_dir}/src/s/app.css"
readonly reports_dir="${base_dir}/reports"
readonly playwright_dir="${base_dir}/.playwright"
readonly lhci_dir="${base_dir}/.lighthouseci"

rm -rf "${build_dir}" \
  "${prettier_cache_file}" \
  "${ts_build_info_file}" \
  "${eslint_cache_dir}" \
  "${generated_app_css_file}" \
  "${reports_dir}" \
  "${playwright_dir}" \
  "${lhci_dir}"
