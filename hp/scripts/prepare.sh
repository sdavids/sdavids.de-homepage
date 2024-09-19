#!/usr/bin/env sh

# SPDX-FileCopyrightText: © 2022 Sebastian Davids <sdavids@gmx.de>
# SPDX-License-Identifier: Apache-2.0

# script needs to be invoked from the hp root directory

set -eu

if npx --yes --quiet is-ci; then
  exit 0
fi

cd .. && npx --yes --quiet husky hp/.husky
