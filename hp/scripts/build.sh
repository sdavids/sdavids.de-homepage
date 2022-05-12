#!/usr/bin/env sh

# script needs to be invoked from the hp root directory

set -eu

npm run build:css

rm -rf dist
cp -rp src dist
npx esbuild src/j/app.js --bundle --splitting --outdir=dist/j --format=esm --target=es2017 --minify
# npx esbuild src/j/app.js --bundle --outfile=dist/j/app.es5.js --format=iife --target=es5 --minify

rm dist/s/app.src.css
