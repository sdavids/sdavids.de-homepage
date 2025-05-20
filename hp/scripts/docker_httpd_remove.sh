#!/usr/bin/env sh

# SPDX-FileCopyrightText: © 2024 Sebastian Davids <sdavids@gmx.de>
# SPDX-License-Identifier: Apache-2.0

set -eu

readonly container_name='sdavids.de-homepage'

if [ -n "$(docker container ls --all --quiet --filter="name=^/${container_name}$")" ]; then
  docker container stop "${container_name}"
fi

# container not started with --rm ?
if [ -n "$(docker container ls --all --quiet --filter="name=^/${container_name}$")" ]; then
  docker container remove --force --volumes "${container_name}"
fi

readonly network_name='sdavids_homepage'

if docker network inspect "${network_name}" >/dev/null 2>&1; then
  docker network rm "${network_name}" >/dev/null
fi
