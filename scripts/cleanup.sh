#!/usr/bin/env sh

# script needs to be invoked from the project root directory

set -eu

git clean -fdx \
  -e .idea \
  -e .fleet \
  -e .vscode \
  -e hp/.idea \
  -e hp/.fleet \
  -e hp/.vscode \
  -e hp/.envrc \
  .

origin_url="$(git remote get-url origin 2> /dev/null || echo '')"
if [ -n "${origin_url}" ]; then
  set +e
  git ls-remote --exit-code --heads origin refs/heads/main > /dev/null 2> /dev/null
  remote_exits=$?
  set -e

  if [ ${remote_exits} -eq 0 ]; then
    git remote prune origin
  else
    git remote remove origin
  fi
fi

git repack
git prune-packed
git reflog expire --expire=1.month.ago
git gc --aggressive
