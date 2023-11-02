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

readonly dir='dist'
readonly file="${dir}/index.html"

npx --no html-minifier -- "${file}" \
  --collapse-boolean-attributes \
  --collapse-whitespace \
  --collapse-inline-tag-whitespace \
  --decode-entities \
  --html5 \
  --minify-css \
  --quote-character \" \
  --remove-comments \
  --remove-empty-attributes \
  --remove-redundant-attributes \
  --remove-script-type-attributes \
  --remove-style-link-type-attributes \
  --sort-attributes \
  --sort-class-name \
  --use-short-doctype \
  -o "${file}.min"

mv "${file}.min" "${file}"
