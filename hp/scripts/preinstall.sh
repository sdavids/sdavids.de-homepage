#!/usr/bin/env sh

# script needs to be invoked from the hp root directory

set -eu

if [ "$(uname)" = 'Darwin' ]; then
  if [ -d node_modules ]; then
      xattr -w com.apple.metadata:com_apple_backup_excludeItem com.apple.backupd node_modules
  fi
fi
