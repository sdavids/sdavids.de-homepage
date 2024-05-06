#!/usr/bin/env sh

# SPDX-FileCopyrightText: © 2022 Sebastian Davids <sdavids@gmx.de>
# SPDX-License-Identifier: Apache-2.0

# script needs to be invoked from the hp root directory

set -eu

npx --yes --quiet browser-sync src -f src -b 'google chrome' --no-notify --no-ghost-mode
