#!/usr/bin/env sh

# SPDX-FileCopyrightText: © 2022 Sebastian Davids <sdavids@gmx.de>
# SPDX-License-Identifier: Apache-2.0

# script needs to be invoked from the hp root directory

set -eu

if [ -z "$*" ]; then
  echo "Usage: $0 DIRECTORY" >&2
  exit 1
fi

if [ ! -d "$1" ]; then
  echo "'$1' does not exist or is not a directory" >&2
  exit 2
fi

readonly dir="$PWD/$1"

find "${dir}" \( -name '*.age' -o -name '*.css' -o -name '*.gpg' -o -name '*.html' -o -name '*.mjs' -o -name '*.keys' -o -name 'site.webmanifest' -o -name 'sitemap.xml' -o -name '*.svg' -type f \) -exec scripts/compress-zstd.sh {} ';'
find "${dir}" \( -name '*.age' -o -name '*.css' -o -name '*.gpg' -o -name '*.html' -o -name '*.mjs' -o -name '*.keys' -o -name 'site.webmanifest' -o -name 'sitemap.xml' -o -name '*.svg' -type f \) -exec scripts/compress-brotli.sh {} ';'
find "${dir}" \( -name '*.age' -o -name '*.css' -o -name '*.gpg' -o -name '*.html' -o -name '*.mjs' -o -name '*.keys' -o -name 'site.webmanifest' -o -name 'sitemap.xml' -o -name '*.svg' -type f \) -exec scripts/compress-gzip.sh {} ';'
