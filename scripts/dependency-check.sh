#!/usr/bin/env bash

# script needs to be invoked from the project root directory

set -Eeuo pipefail

readonly base_dir="$PWD"

cd "${base_dir}/hp"

if [[ ! -d "node_modules" ]]; then npm install --ignore-scripts=false; fi

npm outdated --long
