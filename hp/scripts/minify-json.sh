#!/usr/bin/env sh

#
# Copyright (c) 2022-2023, Sebastian Davids
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

# jq needs to be in $PATH
#   Mac:
#     brew install jq
#   Linux:
#     apt-get install jq

set -eu

readonly dir='dist'

readonly traffic_advice_file="${dir}/.well-known/traffic-advice"
readonly traffic_advice_tmp_file="${traffic_advice_file}.tmp"

mv "${traffic_advice_file}" "${traffic_advice_tmp_file}"
jq -c . "${traffic_advice_tmp_file}" > "${traffic_advice_file}"
rm "${traffic_advice_tmp_file}"

readonly webmanifest_file="${dir}/site.webmanifest"
readonly webmanifest_tmp_file="${traffic_advice_file}.tmp"

mv "${webmanifest_file}" "${webmanifest_tmp_file}"
jq -c . "${webmanifest_tmp_file}" > "${webmanifest_file}"
rm "${webmanifest_tmp_file}"
