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

if [ -z "$*" ]; then
  echo "Usage: $0 DIRECTORY"
  exit 1
fi

if [ ! -d "$1" ]; then
  echo "$1 does not exist or is not a directory"
  exit 2
fi

readonly dir="${PWD}/$1"

find "${dir}" \( -name '*.age' -o -name '*.css' -o -name '*.gpg' -o -name '*.html' -o -name '*.js' -o -name '*.mjs' -o -name '*.keys' -o -name '*.svg' -type f \) -exec scripts/compress-brotli.sh {} ';'
find "${dir}" \( -name '*.age' -o -name '*.css' -o -name '*.gpg' -o -name '*.html' -o -name '*.js' -o -name '*.mjs' -o -name '*.keys' -o -name 'sitemap.xml' -o -name '*.svg' -type f \) -exec scripts/compress-gzip.sh {} ';'
