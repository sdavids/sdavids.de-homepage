#!/usr/bin/env sh

# SPDX-FileCopyrightText: © 2022 Sebastian Davids <sdavids@gmx.de>
# SPDX-License-Identifier: Apache-2.0

set -eu

readonly base_dir="${1:-$PWD}"

readonly build_dir="${base_dir}/dist"
readonly eslint_cache_dir="${base_dir}/node_modules/.cache/eslint"
readonly prettier_cache_dir="${base_dir}/node_modules/.cache/prettier"
readonly ts_build_cache_dir="${base_dir}/node_modules/.cache/tsc"
readonly generated_app_css_file="${base_dir}/src/s/app.css"
readonly reports_dir="${base_dir}/reports"
readonly playwright_dir="${base_dir}/.playwright"
readonly lhci_dir="${base_dir}/.lighthouseci"

rm -rf "${build_dir}" \
  "${eslint_cache_dir}" \
  "${prettier_cache_dir}" \
  "${ts_build_cache_dir}" \
  "${generated_app_css_file}" \
  "${reports_dir}" \
  "${playwright_dir}" \
  "${lhci_dir}"
