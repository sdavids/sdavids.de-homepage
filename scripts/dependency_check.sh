#!/usr/bin/env sh

# SPDX-FileCopyrightText: © 2022 Sebastian Davids <sdavids@gmx.de>
# SPDX-License-Identifier: Apache-2.0

# script needs to be invoked from the project root directory

set -eu

readonly base_dir="$PWD"

hp/scripts/dependency_check_node.sh "${base_dir}/hp"
