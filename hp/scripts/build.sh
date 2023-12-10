#!/usr/bin/env sh

#
# Copyright (c) 2022-2023, Sebastian Davids
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

# script needs to be invoked from the hp root directory

set -eu

readonly esbuild_target="${1:-es2020}"
readonly dir='dist'

npm run build:css

rm -rf "${dir}"
cp -rp src "${dir}"

npx --no esbuild -- 'src/j/app.mjs' --bundle --splitting --outdir="${dir}/j" --out-extension:.js=.mjs --format=esm --target="${esbuild_target}" --minify --legal-comments=none

rm "${dir}/s/app.src.css"

if [ "$(uname)" = 'Darwin' ]; then
  js_filename="$(npm run hash:filename -- dist/j/app.mjs -e | sed -nE 's/.*(app.[0-9a-f]+\.mjs)/\1/p')"
  css_filename="$(npm run hash:filename -- dist/s/app.css -e| sed -nE 's/.*(app.[0-9a-f]+\.css)/\1/p')"

  find "${dir}" -type f -name "*.html" -print0 | xargs -0 sed -i '' "s/app\.mjs/${js_filename}/g"
  find "${dir}" -type f -name "*.html" -print0 | xargs -0 sed -i '' "s/app\.css/${css_filename}/g"
else
  js_filename="$(npm run hash:filename -- dist/j/app.mjs -e | sed -nr 's/.*(app.[0-9a-f]+\.mjs)/\1/p')"
  css_filename="$(npm run hash:filename -- dist/s/app.css -e| sed -nr 's/.*(app.[0-9a-f]+\.css)/\1/p')"

  find "${dir}" -type f -name "*.html" -print0 | xargs -0 sed -i "s/app\.mjs/${js_filename}/g"
  find "${dir}" -type f -name "*.html" -print0 | xargs -0 sed -i "s/app\.css/${css_filename}/g"
fi
