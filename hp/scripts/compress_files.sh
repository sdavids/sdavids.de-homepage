#!/usr/bin/env sh

# SPDX-FileCopyrightText: © 2022 Sebastian Davids <sdavids@gmx.de>
# SPDX-License-Identifier: Apache-2.0

set -eu

if [ -z "$*" ]; then
  echo "Usage: $0 DIRECTORY" >&2
  exit 1
fi

if [ ! -d "$1" ]; then
  printf "The directory '%s' does not exist.\n" "$1" >&2
  exit 2
fi

find "$1" \( -name '*.age' -o -name '*.css' -o -name '*.gpg' -o -name '*.html' -o -name '*.js' -o -name '*.pub' -o -name 'site.webmanifest' -o -name 'sitemap.xml' -o -name '*.svg' -type f \) -exec scripts/compress_zstd.sh {} \;
find "$1" \( -name '*.age' -o -name '*.css' -o -name '*.gpg' -o -name '*.html' -o -name '*.js' -o -name '*.pub' -o -name 'site.webmanifest' -o -name 'sitemap.xml' -o -name '*.svg' -type f \) -exec scripts/compress_brotli.sh {} \;
find "$1" \( -name '*.age' -o -name '*.css' -o -name '*.gpg' -o -name '*.html' -o -name '*.js' -o -name '*.pub' -o -name 'site.webmanifest' -o -name 'sitemap.xml' -o -name '*.svg' -type f \) -exec scripts/compress_gzip.sh {} \;
