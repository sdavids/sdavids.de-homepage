#!/usr/bin/env sh

# script needs to be invoked from the hp root directory

set -eu

if npx is-ci ; then
 exit 0
fi

cd .. && npx husky install hp/.husky
