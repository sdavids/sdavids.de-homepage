#!/usr/bin/env sh

set -eu

git clean -fdx \
  -e .idea \
  -e .vscode \
  -e hp/.idea \
  -e hp/.vscode \
  .
git remote prune origin
git repack
git prune-packed
git reflog expire --expire=1.month.ago
git gc --aggressive