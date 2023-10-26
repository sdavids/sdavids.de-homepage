#!/usr/bin/env sh

set -eu

readonly name='sdavids-homepage'

container_id="$(docker ps --all --quiet --filter="name=${name}")"

if [ -n "${container_id}" ]; then
  docker stop "${container_id}" > /dev/null
fi
