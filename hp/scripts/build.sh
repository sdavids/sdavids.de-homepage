#!/usr/bin/env sh

set -eu

npm run tailwind:build

rm -rf dist
cp -rp src dist
rm dist/s/app.src.css
