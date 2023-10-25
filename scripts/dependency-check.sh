#!/usr/bin/env sh

# script needs to be invoked from the project root directory

set -eu

readonly base_dir="${PWD}"

cd "${base_dir}/hp"

if [ ! -d "node_modules" ]; then
  npm install --ignore-scripts=false --fund=false
fi

npm outdated --long
