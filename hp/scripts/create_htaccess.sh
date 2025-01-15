#!/usr/bin/env bash

# SPDX-FileCopyrightText: © 2022 Sebastian Davids <sdavids@gmx.de>
# SPDX-License-Identifier: Apache-2.0

set -Eeu -o pipefail -o posix

readonly base_dir="${1:-$PWD}"

readonly dist_dir="${base_dir}/dist"

readonly htaccess_file="${dist_dir}/.htaccess"

cp "${base_dir}/httpd/.htaccess" "${htaccess_file}"

js_filename="$(find "${dist_dir}" -name 'app*.js' -type f -exec basename {} \;)"
readonly js_filename

if [ -z "${js_filename}" ]; then
  echo 'app.*.js not found'
  exit 1
fi

css_filename="$(find "${dist_dir}" -name 'app*.css' -type f -exec basename {} \;)"
readonly css_filename

if [ -z "${css_filename}" ]; then
  echo 'app.*.css not found'
  exit 2
fi

if [ "$(uname)" = 'Darwin' ]; then
  sed -i '' "s/\/j\/app\.js/\/j\/${js_filename}/g" "${htaccess_file}"
  sed -i '' "s/\/s\/app\.css/\/s\/${css_filename}/g" "${htaccess_file}"
else
  sed -i "s/\/j\/app\.js/\/j\/${js_filename}/g" "${htaccess_file}"
  sed -i "s/\/s\/app\.css/\/s\/${css_filename}/g" "${htaccess_file}"
fi
