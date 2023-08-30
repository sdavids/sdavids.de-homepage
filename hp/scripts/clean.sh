#!/usr/bin/env sh

# script needs to be invoked from the hp root directory

set -eu

readonly base_dir="$(pwd)"

readonly build_dir="${base_dir}/dist"
readonly eslint_cache_file="${base_dir}/.eslintcache"
readonly generated_app_css_file="${base_dir}/src/s/app.css"

rm -rf "${build_dir}" \
       "${eslint_cache_file}" \
       "${generated_app_css_file}"
