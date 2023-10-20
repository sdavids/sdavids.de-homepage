#!/usr/bin/env sh

# script needs to be invoked from the hp root directory

set -eu

if npx --no is-ci ; then
  exit 0
fi

cd .. && npx --no husky install hp/.husky
