#!/usr/bin/env bash

#
# Copyright (c) 2023, Sebastian Davids
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

set -Eeu -o pipefail -o posix

readonly dist_dir="dist"

readonly htaccess_file="${dist_dir}/.htaccess"

cp httpd/.htaccess "${htaccess_file}"

js_filename="$( find "${dist_dir}" -name 'app*.mjs' -type f -exec basename {} \; )"

if [ -z "${js_filename}" ]; then
  echo 'app.*.mjs not found'
  exit 1
fi

css_filename="$( find "${dist_dir}" -name 'app*.css' -type f -exec basename {} \; )"

if [ -z "${css_filename}" ]; then
  echo 'app.*.css not found'
  exit 2
fi

if [ "$(uname)" = 'Darwin' ]; then
  sed -i '' "s/\/j\/app\.mjs/\/j\/${js_filename}/g" "${htaccess_file}"
  sed -i '' "s/\/s\/app\.css/\/s\/${css_filename}/g" "${htaccess_file}"
else
  sed -i "s/\/j\/app\.mjs/\/j\/${js_filename}/g" "${htaccess_file}"
  sed -i "s/\/s\/app\.css/\/s\/${css_filename}/g" "${htaccess_file}"
fi
