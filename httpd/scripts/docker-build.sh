#!/usr/bin/env sh

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

# script needs to be invoked from httpd root directory

set -eu

readonly tag="${1:-local}"

readonly group='sdavids.de-homepage'
readonly artifact='sdavids-httpd'

readonly container_name="${group}/${artifact}"

if [ -n "${GITHUB_SHA:-}" ]; then
  # https://docs.github.com/en/actions/learn-github-actions/variables#default-environment-variables
  readonly commit="${GITHUB_SHA}"
else
  commit="$(git rev-parse --verify HEAD)"
  if [ -n "$(git status --porcelain=v1 2>/dev/null)" ]; then
    commit="${commit}-next"
  fi
fi

docker buildx build \
  --compress \
  --tag "${container_name}:latest" \
  --tag "${container_name}:${tag}" \
  --build-arg "git_commit=${commit}" \
  .
