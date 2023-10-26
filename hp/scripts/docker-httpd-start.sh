#!/usr/bin/env sh

# script needs to be invoked from the hp root directory

set -eu

readonly skip_build="${1:-}"

readonly group='sdavids'
readonly artifact='sdavids-httpd'
readonly version='latest'

readonly container_name="${group}/${artifact}"

readonly name='sdavids-homepage'

readonly port='8080'

readonly site_dir="${PWD}/dist"

if [ "${skip_build}" != '--skip-build' ]; then
  npm run clean
  npm run clean:node
  npm install --fund=false --audit=false
  npm run build
  npm run minify:html
  npm run minify:xml
  npm run minify:json
  npm run minify:robots
  npm run compress:files
  npm run create:google-verification-file
  npm run create:timestamp-file dist/.deploy-timestamp
fi

cp ../.deploy-now/.htaccess.template "${site_dir}/.htaccess"

readonly network_name='sdavids.de-homepage'

docker network inspect "${network_name}" > /dev/null 2>&1 \
  || docker network create --driver bridge "${network_name}" > /dev/null

docker run \
  --detach \
  --interactive \
  --tty \
  --rm \
  --user www-data \
  --read-only \
  --tmpfs /tmp:rw,noexec,nosuid \
  --security-opt=no-new-privileges \
  --cap-add net_bind_service \
  --cap-drop=all \
  --network="${network_name}" \
  --publish "${port}:80/tcp" \
  --mount "type=bind,source=${site_dir},target=/usr/local/apache2/htdocs/,readonly" \
  --name "${name}" \
  "${container_name}:${version}" \
  httpd-foreground -C 'PidFile /tmp/httpd.pid' > /dev/null

printf "\nLocal: http://localhost:%s\n" "${port}"
