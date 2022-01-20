#!/usr/bin/env bash

# script needs to be executed from homepage root

set -Eeuo pipefail

if [[ -z "$*" ]]; then echo "Usage: $0 DIRECTORY"; exit 1; fi
if [[ ! -d "$1" ]]; then echo "$1 does not exist or is not a directory"; exit 2; fi

readonly dir="$(pwd)/$1"

find "${dir}" \( -name '*.html' -o -name '*.css' -o -name '*.js' -type f \) -exec scripts/compress-brotli.sh {} ';'
find "${dir}" \( -name '*.html' -o -name '*.css' -o -name '*.js' -type f \) -exec scripts/compress-gzip.sh {} ';'
