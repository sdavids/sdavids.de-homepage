#!/usr/bin/env sh

# SPDX-FileCopyrightText: © 2024 Sebastian Davids <sdavids@gmx.de>
# SPDX-License-Identifier: Apache-2.0

# script needs to be invoked from the project's root directory

set -eu

if [ "$(git rev-parse --is-inside-work-tree 2>/dev/null)" != 'true' ]; then
  echo "'$PWD' is not a git repository" >&2
  exit 1
fi

while getopts ':n' opt; do
  case "${opt}" in
    n) dry_run='--dry-run'
      ;;
    ?)
      echo "Usage: $0 [-n]" >&2
      exit 1
      ;;
  esac
done

readonly dry_run="${dry_run:-}"

# shellcheck disable=SC2086
git clean -fdx \
  ${dry_run} \
  -e .fleet \
  -e .idea \
  -e .vscode \
  -e hp/.fleet \
  -e hp/.idea \
  -e hp/.vscode \
  .

if [ -n "${dry_run}" ]; then
  exit 0
fi

origin_url="$(git remote get-url origin 2> /dev/null || echo '')"
if [ -n "${origin_url}" ]; then
  set +e
  git ls-remote --exit-code --heads origin refs/heads/main > /dev/null 2> /dev/null
  remote_exits=$?
  set -e

  if [ ${remote_exits} -eq 0 ]; then
    git remote prune origin 1> /dev/null
  else
    git remote remove origin 1> /dev/null
  fi
fi

git repack -d --quiet
git prune-packed --quiet
git reflog expire --expire=1.month.ago --expire-unreachable=now 1> /dev/null
git gc --aggressive
