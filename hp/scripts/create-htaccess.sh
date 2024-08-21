#!/usr/bin/env bash

# SPDX-FileCopyrightText: © 2022 Sebastian Davids <sdavids@gmx.de>
# SPDX-License-Identifier: Apache-2.0

# script needs to be invoked from the hp root directory

set -Eeu -o pipefail -o posix

readonly dist_dir='dist'

readonly htaccess_file="${dist_dir}/.htaccess"

cp httpd/.htaccess "${htaccess_file}"

js_filename="$( find "${dist_dir}" -name 'app*.mjs' -type f -exec basename {} \; )"
readonly js_filename

if [ -z "${js_filename}" ]; then
  echo 'app.*.mjs not found'
  exit 1
fi

css_filename="$( find "${dist_dir}" -name 'app*.css' -type f -exec basename {} \; )"
readonly css_filename

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
