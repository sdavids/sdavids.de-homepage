# syntax=docker/dockerfile:1

#
# Copyright (c) 2023, Sebastian Davids
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

# https://docs.docker.com/engine/reference/builder/

# https://hub.docker.com/_/httpd/
FROM httpd:2.4.58-alpine3.19

EXPOSE 443

# docker run --rm httpd:2.4.58-alpine cat /usr/local/apache2/conf/httpd.conf > httpd.conf
COPY --chown=www-data:www-data ./httpd.conf /usr/local/apache2/conf/httpd.conf

# docker run --rm httpd:2.4.58-alpine cat /usr/local/apache2/conf/extra/httpd-ssl.conf > httpd-ssl.conf
COPY --chown=www-data:www-data ./httpd-ssl.conf /usr/local/apache2/conf/extra/httpd-ssl.conf

ARG git_commit
ARG created_at

# https://github.com/opencontainers/image-spec/blob/master/annotations.md
LABEL org.opencontainers.image.revision="${git_commit}" \
      org.opencontainers.image.created="${created_at}" \
      org.opencontainers.image.licenses="Apache-2.0" \
      org.opencontainers.image.vendor="Sebastian Davids" \
      org.opencontainers.image.title="sdavids.de-homepage-httpd" \
      de.sdavids.docker.group="sdavids.de-homepage" \
      de.sdavids.docker.type="development"
