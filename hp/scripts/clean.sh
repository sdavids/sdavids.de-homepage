#!/usr/bin/env sh

#
# Copyright (c) 2022-2023, Sebastian Davids
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

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
