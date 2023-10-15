#!/usr/bin/env sh

# script needs to be invoked from the hp root directory

set -eu

readonly dir='dist'

npm run build:css

rm -rf "${dir}"
cp -rp src "${dir}"

npx esbuild 'src/j/app.js' --bundle --splitting --outdir="${dir}/j" --format=esm --target=es2017 --minify --legal-comments=none

npx esbuild --bundle "${dir}/s/app.css" --outfile="${dir}/s/app.css" --allow-overwrite --minify --legal-comments=none

rm "${dir}/s/app.src.css"

js_filename="$(npm run hash:filename -- dist/j/app.js -e | sed -nr 's/.*(app.[0-9a-f]+\.js)/\1/p')"
css_filename="$(npm run hash:filename -- dist/s/app.css -e| sed -nr 's/.*(app.[0-9a-f]+\.css)/\1/p')"

readonly index_file="${dir}/index.html"

if [ "$(uname)" = 'Darwin' ]; then
  sed -i '' "s/app\.js/${js_filename}/g" "${index_file}"
  sed -i '' "s/app\.css/${css_filename}/g" "${index_file}"
else
  sed -i "s/app\.js/${js_filename}/g" "${index_file}"
  sed -i "s/app\.css/${css_filename}/g" "${index_file}"
fi
