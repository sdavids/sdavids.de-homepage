#!/usr/bin/env sh

# script needs to be invoked from the hp root directory

set -eu

readonly dir="dist"

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
