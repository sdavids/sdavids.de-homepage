#!/usr/bin/env sh

# SPDX-FileCopyrightText: © 2025 Sebastian Davids <sdavids@gmx.de>
# SPDX-License-Identifier: Apache-2.0

# script needs to be invoked from the hp root directory

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
  node --run clean
  rm -rf node_modules
  npm ci --ignore-scripts=true --fund=false --audit=false
  node node_modules/esbuild/install.js
fi

node --run build
node --run hash:css
node --run hash:js
node --run minify:json-tags
node --run minify:html
node --run create:htaccess
node --run disallow:ai:htaccess
node --run hash:importmap
node --run minify:svg
node --run hash:svg
node --run minify:xml
node --run minify:webmanifest
node --run minify:traffic-advice
node --run minify:json
node --run disallow:ai:robots
node --run minify:robots
node --run legal:robots
node --run compress:files
node --run create:google-verification-file
node --run create:timestamp-file
