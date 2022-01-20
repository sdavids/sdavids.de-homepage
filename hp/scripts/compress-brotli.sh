#!/usr/bin/env bash

# brotli needs to be in $PATH
# https://web.dev/uses-text-compression/
# https://developers.google.com/speed/webp/download
#   brew install brotli
#   apt-get install brotli
#   dnf install brotli

set -Eeuo pipefail

if [[ -z "$*" ]]; then echo "Usage: $0 FILE"; exit 1; fi
if [[ ! -f "$1" ]]; then echo "$1 does not exist"; exit 2; fi

brotli "$1" -o "$1.br"
