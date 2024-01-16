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

readonly skip_build="${1:-}"

readonly group='sdavids.de-homepage'
readonly artifact='sdavids-httpd'
readonly version='local'

readonly container_name="${group}/${artifact}"

readonly name='sdavids.de-homepage'

readonly http_port='8080'
readonly https_port='8443'

# needs entry in /etc/hosts to work:
# 127.0.0.1 localhost httpd.local
# tag::server-name[]
readonly host_name='httpd.local'
# end::server-name[]

readonly site_dir="${PWD}/dist"

readonly certs_dir="${PWD}/certs"

export CI=true

if [ "${skip_build}" != '--skip-build' ]; then
  npm run clean
  rm -rf node_modules
  npm ci --fund=false --audit=false
  npm run build
  npm run hash:css
  npm run hash:js
  npm run minify:json-tags
  npm run minify:html
  npm run create:htaccess
  npm run hash:importmap
  npm run minify:svg
  npm run hash:svg
  npm run minify:xml
  npm run minify:json
  npm run minify:robots
  npm run legal:robots
  npm run compress:files
  npm run create:google-verification-file
  npm run create:timestamp-file dist/.deploy-timestamp
fi

readonly network_name='sdavids.de-homepage'

docker network inspect "${network_name}" > /dev/null 2>&1 \
  || docker network create \
       --driver bridge "${network_name}" \
       --label "de.sdavids.docker.group=${group}"> /dev/null

docker run \
  --init \
  --detach \
  --interactive \
  --tty \
  --rm \
  --user www-data \
  --read-only \
  --tmpfs /tmp:rw,noexec,nosuid \
  --security-opt='no-new-privileges=true' \
  --cap-add net_bind_service \
  --cap-drop=all \
  --network="${network_name}" \
  --publish "${http_port}:80/tcp" \
  --publish "${https_port}:443/tcp" \
  --hostname="${host_name}" \
  --mount "type=bind,source=${site_dir},target=/usr/local/apache2/htdocs/,readonly" \
  --mount "type=bind,source=${certs_dir}/server.crt,target=/usr/local/apache2/conf/server.crt,readonly" \
  --mount "type=bind,source=${certs_dir}/server.key,target=/usr/local/apache2/conf/server.key,readonly" \
  --name "${name}" \
  "${container_name}:${version}" \
  httpd-foreground -C 'PidFile /tmp/httpd.pid' > /dev/null

printf '\nListen local: https://%s\n' "${host_name}:${https_port}"
