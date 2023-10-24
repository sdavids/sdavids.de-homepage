#!/usr/bin/env sh

# script needs to be invoked from the hp root directory

set -eu

readonly base_dir="${PWD}"

readonly build_dir="${base_dir}/dist"
readonly eslint_cache_file="${base_dir}/.eslintcache"
readonly prettier_cache_file="${base_dir}/node_modules/.cache/prettier/.prettier-cache"
readonly npm_logs_dir="${base_dir}/_logs"
readonly npm_cache_dir="${base_dir}/_cacache"
readonly generated_app_css_file="${base_dir}/src/s/app.css"

rm -rf "${build_dir}" \
       "${eslint_cache_file}" \
       "${prettier_cache_file}" \
       "${npm_logs_dir}" \
       "${npm_cache_dir}" \
       "${generated_app_css_file}"
