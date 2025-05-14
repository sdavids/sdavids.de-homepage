#!/usr/bin/env sh

# SPDX-FileCopyrightText: © 2024 Sebastian Davids <sdavids@gmx.de>
# SPDX-License-Identifier: Apache-2.0

set -eu

# https://docs.docker.com/reference/cli/docker/image/tag/#description
readonly namespace='sdavids.de'
readonly repository='sdavids.de-homepage'

readonly label_group='de.sdavids.docker.group'

readonly label="${label_group}=${repository}"

docker container prune --force --filter="label=${label}"

docker volume prune --force --filter="label=${label}"

docker image prune --force --filter="label=${label}" --all

docker network prune --force --filter="label=${label_group}=${namespace}"
