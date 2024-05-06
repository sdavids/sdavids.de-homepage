#!/usr/bin/env sh

# SPDX-FileCopyrightText: © 2022 Sebastian Davids <sdavids@gmx.de>
# SPDX-License-Identifier: Apache-2.0

# script needs to be invoked from the hp root directory

set -eu

if [ -z "$*" ]; then
  echo "Usage: $0 DIRECTORY"
  exit 1
fi

if [ ! -d "$1" ]; then
  echo "$1 does not exist or is not a directory"
  exit 2
fi

readonly dir="$PWD/$1"

printf 'google-site-verification: google1f621af14435aa51.html' > "${dir}/google1f621af14435aa51.html"
