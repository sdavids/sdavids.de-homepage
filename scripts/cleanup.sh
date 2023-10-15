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
  .
git remote prune origin
git repack
git prune-packed
git reflog expire --expire=1.month.ago
git gc --aggressive
