#!/usr/bin/env sh

# script needs to be invoked from the hp root directory

set -eu

readonly dir='dist'
readonly file="${dir}/sitemap.xml"

npx --no minify-xml "${file}" \
  --in-place
