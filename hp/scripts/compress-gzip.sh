#!/usr/bin/env sh

set -eu

if [ -z "$*" ]; then
  echo "Usage: $0 FILE"
  exit 1
fi

if [ ! -f "$1" ]; then
  echo "$1 does not exist"
  exit 2
fi

gzip --best --keep "$1"
touch -c -r "$1" "$1.gz"
