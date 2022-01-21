#!/usr/bin/env sh

set -eu

npm run tailwind:build

rm -rf dist
cp -rp src dist
npx esbuild src/j/app.js --bundle --splitting --outdir=dist/j --format=esm --target=es6 --minify

rm dist/s/app.src.css
