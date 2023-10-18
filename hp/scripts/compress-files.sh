#!/usr/bin/env sh

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

find "${dir}" \( -name '*.css' -o -name '*.html' -o -name '*.js' -o -name '*.svg' -type f \) -exec scripts/compress-brotli.sh {} ';'
find "${dir}" \( -name '*.css' -o -name '*.html' -o -name '*.js' -o -name 'sitemap.xml' -o -name '*.svg' -type f \) -exec scripts/compress-gzip.sh {} ';'
