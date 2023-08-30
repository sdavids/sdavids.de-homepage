#!/usr/bin/env sh

# script needs to be invoked from the hp root directory

set -eu

npm run build:css

rm -rf dist
cp -rp src dist

npx esbuild src/j/app.js --bundle --splitting --outdir=dist/j --format=esm --target=es2017 --minify --legal-comments=none

npx esbuild --bundle dist/s/app.css --outfile=dist/s/app.css --allow-overwrite --minify --legal-comments=none

rm dist/s/app.src.css
