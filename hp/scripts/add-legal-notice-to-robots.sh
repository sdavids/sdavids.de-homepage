#!/usr/bin/env sh

#
# Copyright (c) 2023-2024, Sebastian Davids
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

# script needs to be invoked from the hp root directory

set -eu

readonly dir='dist'
readonly file="${dir}/robots.txt"

printf '\n# Legal notice: sdavids.de expressly reserves the right to use its content for commercial text and data mining (§ 44b Urheberrechtsgesetz).\n# The use of robots or other automated means to access sdavids.de or collect or mine data without the express permission of sdavids.de is strictly prohibited.\n# sdavids.de may, in its discretion, permit certain automated access to certain sdavids.de pages,\n# if you would like to apply for permission to crawl sdavids.de, collect or use data, please email info@sdavids.de\n' \
 >> "${file}"
