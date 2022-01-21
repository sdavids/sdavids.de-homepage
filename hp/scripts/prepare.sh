#!/usr/bin/env sh

set -eu

if npx is-ci ; then
 exit 0
fi

cd .. && npx husky install hp/.husky
