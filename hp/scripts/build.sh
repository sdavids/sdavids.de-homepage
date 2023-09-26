#!/usr/bin/env sh

# script needs to be invoked from the hp root directory

set -eu

npm run build:css

rm -rf dist
cp -rp src dist

npx esbuild src/j/app.js --bundle --splitting --outdir=dist/j --format=esm --target=es2017 --minify --legal-comments=none

npx esbuild --bundle dist/s/app.css --outfile=dist/s/app.css --allow-overwrite --minify --legal-comments=none

rm dist/s/app.src.css

readonly js_filename="$(npm run hash:filename -- dist/j/app.js -e | sed -nr "s/.*(app.[0-9a-f]+\.js)/\1/p")"
readonly css_filename="$(npm run hash:filename -- dist/s/app.css -e| sed -nr "s/.*(app.[0-9a-f]+\.css)/\1/p")"

if [[ "$(uname)" == "Darwin" ]]; then
  sed -i '' "s/app\.js/${js_filename}/g" dist/index.html
  sed -i '' "s/app\.css/${css_filename}/g" dist/index.html
else
  sed -i "s/app\.js/${js_filename}/g" dist/index.html
  sed -i "s/app\.css/${css_filename}/g" dist/index.html
fi
