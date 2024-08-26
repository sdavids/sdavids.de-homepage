#!/usr/bin/env sh

# SPDX-FileCopyrightText: © 2023 Sebastian Davids <sdavids@gmx.de>
# SPDX-License-Identifier: Apache-2.0

set -eu

readonly container_name='sdavids.de-homepage'

container_id="$(docker container ls --all --quiet --filter="name=^/${container_name}$")"
readonly container_id

if [ -n "${container_id}" ]; then
  docker stop "${container_id}" >/dev/null
fi

readonly network_name='sdavids.de-homepage'

if docker network inspect "${network_name}" >/dev/null 2>&1 ; then
  docker network rm "${network_name}" >/dev/null
fi
