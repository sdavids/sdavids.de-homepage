#!/usr/bin/env sh

# SPDX-FileCopyrightText: © 2023 Sebastian Davids <sdavids@gmx.de>
# SPDX-License-Identifier: Apache-2.0

set -eu

readonly base_dir="${1:-$PWD/dist}"

readonly file="${base_dir}/robots.txt"

printf '\n# Legal notice: sdavids.de expressly reserves the right to use its content for commercial text and data mining (§ 44b Urheberrechtsgesetz).\n# The use of robots or other automated means to access sdavids.de or collect or mine data without the express permission of sdavids.de is strictly prohibited.\n# sdavids.de may, in its discretion, permit certain automated access to certain sdavids.de pages,\n# if you would like to apply for permission to crawl sdavids.de, collect or use data, please email info@sdavids.de\n' \
  >>"${file}"
