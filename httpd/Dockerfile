# syntax=docker/dockerfile:1

# SPDX-FileCopyrightText: © 2023 Sebastian Davids <sdavids@gmx.de>
# SPDX-License-Identifier: Apache-2.0

# https://docs.docker.com/engine/reference/builder/

# https://hub.docker.com/_/httpd/
FROM httpd:2.4.61-alpine3.20

EXPOSE 443

# docker run --rm httpd:2.4.61-alpine3.20 cat /usr/local/apache2/conf/httpd.conf > httpd.conf
COPY --chown=www-data:www-data ./httpd.conf /usr/local/apache2/conf/httpd.conf

# docker run --rm httpd:2.4.61-alpine3.20 cat /usr/local/apache2/conf/extra/httpd-ssl.conf > httpd-ssl.conf
COPY --chown=www-data:www-data ./httpd-ssl.conf /usr/local/apache2/conf/extra/httpd-ssl.conf

# https://github.com/opencontainers/image-spec/blob/master/annotations.md
LABEL org.opencontainers.image.licenses="Apache-2.0" \
      org.opencontainers.image.vendor="Sebastian Davids" \
      org.opencontainers.image.title="sdavids.de-homepage-httpd" \
      de.sdavids.docker.group="sdavids.de-homepage" \
      de.sdavids.docker.type="development"
