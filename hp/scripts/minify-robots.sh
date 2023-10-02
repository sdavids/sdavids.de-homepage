#!/usr/bin/env sh

# script needs to be invoked from the hp root directory

set -eu

readonly dir="dist"
readonly file="${dir}/robots.txt"

if [ "$(uname)" = "Darwin" ]; then
  sed -i '' "/^[@#]/ d" "${file}"
else
  sed -i "/^[@#]/ d" "${file}"
fi
