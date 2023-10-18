#!/usr/bin/env sh

# script needs to be invoked from httpd root directory

set -eu

readonly tag="${1:-local}"

readonly group='sdavids'
readonly artifact='sdavids-httpd'

readonly container_name="${group}/${artifact}"

docker buildx build \
  --no-cache \
  --compress \
  --tag "${container_name}:latest" \
  --tag "${container_name}:${tag}" \
  .
