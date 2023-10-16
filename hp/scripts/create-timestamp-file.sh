#!/usr/bin/env sh

set -eu

if [ -z "$*" ]; then
  echo "Usage: $0 FILE"
  exit 1
fi

readonly file="$1"

printf '%s\n' "$(date -Iseconds -u | sed -e 's/+00:00$/Z/')" > "${file}"
