#!/usr/bin/env sh

# SPDX-FileCopyrightText: © 2022 Sebastian Davids <sdavids@gmx.de>
# SPDX-License-Identifier: Apache-2.0

set -eu

readonly container_name='sdavids.de-homepage'

docker container exec \
  --interactive \
  --tty \
  "${container_name}" \
  sh
