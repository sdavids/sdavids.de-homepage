#!/usr/bin/env sh

# script needs to be invoked from the hp root directory

set -eu

readonly dir='dist'
readonly file="${dir}/index.html"

npx --no html-minifier -- "${file}" \
  --collapse-boolean-attributes \
  --collapse-whitespace \
  --html5 \
  --minify-css \
  --remove-comments \
  --remove-empty-attributes \
  --remove-redundant-attributes \
  --remove-script-type-attributes \
  --remove-style-link-type-attributes \
  --use-short-doctype \
  -o "${file}.min"

mv "${file}.min" "${file}"
