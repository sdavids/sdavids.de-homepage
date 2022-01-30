#!/usr/bin/env sh

# script needs to be invoked from the project root directory

set -eu

readonly base_dir="$(pwd)"

cd "${base_dir}/hp"
npm outdated --long
