#!/usr/bin/env sh

# SPDX-FileCopyrightText: © 2025 Sebastian Davids <sdavids@gmx.de>
# SPDX-License-Identifier: Apache-2.0

# script needs to be invoked from the hp root directory

# pnpm needs to be in $PATH
# https://pnpm.io/installation

set -eu

while getopts ':s' opt; do
  case "${opt}" in
    s)
      skip_install='true'
      ;;
    ?)
      echo "Usage: $0 [-s]" >&2
      exit 1
      ;;
  esac
done

readonly skip_install="${skip_install:-false}"

export CI=true

if [ "${skip_install}" = 'true' ]; then
  rm -rf dist
else
  pnpm run clean
  rm -rf node_modules
  pnpm --silent install
fi

pnpm run build
pnpm run hash:css
pnpm run hash:js
pnpm run minify:json-tags
pnpm run minify:html
pnpm run create:htaccess
pnpm run hash:importmap
pnpm run minify:svg
pnpm run hash:svg
pnpm run minify:xml
pnpm run minify:webmanifest
pnpm run minify:traffic-advice
pnpm run minify:json
pnpm run minify:robots
pnpm run legal:robots
pnpm run compress:files
pnpm run create:google-verification-file
pnpm run create:timestamp-file
