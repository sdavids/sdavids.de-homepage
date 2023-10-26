#!/usr/bin/env sh

set -eu

readonly name='sdavids-homepage'

container_id="$(docker ps --all --quiet --filter="name=${name}")"

if [ -n "${container_id}" ]; then
  docker stop "${container_id}" > /dev/null
fi

readonly network_name='sdavids.de-homepage'

if docker network inspect "${network_name}" > /dev/null 2>&1 ; then
    docker network rm "${network_name}" > /dev/null
fi
