#!/usr/bin/env bash

# SPDX-FileCopyrightText: © 2023 Sebastian Davids <sdavids@gmx.de>
# SPDX-License-Identifier: Apache-2.0

# script needs to be invoked from the hp root directory

set -Eeu -o pipefail -o posix

readonly skip_build="${1:-}"

readonly http_port='8080'
readonly https_port='8443'

readonly tag='local'

# https://docs.docker.com/reference/cli/docker/image/tag/#description
readonly namespace='sdavids.de'
readonly repository='sdavids.de-homepage'

readonly label_group='de.sdavids.docker.group'

readonly label="${label_group}=${repository}"

readonly image_name="${namespace}/${repository}"

readonly container_name="sdavids.de-homepage"

# needs entry in /etc/hosts to work:
# 127.0.0.1 localhost httpd.internal
# tag::server-name[]
readonly host_name='httpd.internal'
# end::server-name[]

# https://man.archlinux.org/man/grep.1
if [ "$(grep -E -i -c "127\.0\.0\.1\s+localhost.+${host_name//\./\.}" /etc/hosts)" -eq 0 ]; then
  echo "/etc/hosts does not have an entry for '127.0.0.1 localhost ${host_name}'" >&2
  exit 1
fi

readonly network_name='sdavids.de-homepage'

readonly site_dir="${PWD}/dist"

readonly certs_dir="${PWD}/certs"

if [ ! -d "${certs_dir}" ]; then
  printf "certificate directory '%s' does not exist\n" "${certs_dir}" >&2
  exit 2
fi

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
  npm run minify:webmanifest
  npm run minify:traffic-advice
  npm run minify:robots
  npm run legal:robots
  npm run compress:files
  npm run create:google-verification-file
  npm run create:timestamp-file dist/.deploy-timestamp
fi

docker network inspect "${network_name}" >/dev/null 2>&1 \
  || docker network create \
       --driver bridge "${network_name}" \
       --label "${label_group}=${namespace}" >/dev/null

# to ensure ${label} is set, we use --label "${label}"
# which might overwrite the label ${label_group} of the image
docker container run \
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
  --mount "type=bind,source=${certs_dir}/cert.pem,target=/usr/local/apache2/conf/server.crt,readonly" \
  --mount "type=bind,source=${certs_dir}/key.pem,target=/usr/local/apache2/conf/server.key,readonly" \
  --name "${container_name}" \
  --label "${label}" \
  "${image_name}:${tag}" \
  httpd-foreground -C 'PidFile /tmp/httpd.pid' >/dev/null

# https://googlechrome.github.io/lighthouse-ci/docs/configuration.html#startserverreadypattern
printf '\nListen local: https://%s\n' "${host_name}:${https_port}"
