#!/usr/bin/env sh

set -eu

readonly base_dir="${1:-$PWD}"

find "${base_dir}" -type f -name '*.sh' -not -path '*/node_modules/*' -not -path '*/.husky/*' -print0 | xargs -0L1 shellcheck
