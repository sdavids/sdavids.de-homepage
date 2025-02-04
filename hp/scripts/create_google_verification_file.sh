#!/usr/bin/env sh

# SPDX-FileCopyrightText: © 2022 Sebastian Davids <sdavids@gmx.de>
# SPDX-License-Identifier: Apache-2.0

set -eu

if [ -z "$*" ]; then
  echo "Usage: $0 DIRECTORY"
  exit 1
fi

if [ ! -d "$1" ]; then
  printf "The directory '%s' does not exist.\n" "$1" >&2
  exit 2
fi

printf 'google-site-verification: google1f621af14435aa51.html' >"$1/google1f621af14435aa51.html"
