#!/usr/bin/env bash

# SPDX-FileCopyrightText: © 2023 Sebastian Davids <sdavids@gmx.de>
# SPDX-License-Identifier: Apache-2.0

# script needs to be invoked from httpd root directory

set -Eeu -o pipefail -o posix

while getopts ':nt:' opt; do
  case "${opt}" in
    n) no_cache='--no-cache'
      ;;
    t) tag="${OPTARG}"
      ;;
    ?)
      echo "Usage: $0 [-d Dockerfile] [-n] [-t tag]" >&2
      exit 1
      ;;
  esac
done

readonly no_cache="${no_cache:-}"

readonly tag="${tag:-local}"

# https://docs.docker.com/reference/cli/docker/image/tag/#description
readonly namespace='sdavids.de'
readonly repository='sdavids.de-homepage'

readonly label_group='de.sdavids.docker.group'

readonly label="${label_group}=${repository}"

readonly image_name="${namespace}/${repository}"

# https://reproducible-builds.org/docs/source-date-epoch/
if [ -z "${SOURCE_DATE_EPOCH:-}" ]; then
  if [ -z "$(git status --porcelain=v1 2>/dev/null)" ]; then
    SOURCE_DATE_EPOCH="$(git log --max-count=1 --pretty=format:%ct)"
  else
    SOURCE_DATE_EPOCH="$(date +%s)"
  fi
  export SOURCE_DATE_EPOCH
fi

if [ "$(uname)" = 'Darwin' ]; then
  created_at="$(date -r "${SOURCE_DATE_EPOCH}" -Iseconds -u | sed -e 's/+00:00$/Z/')"
else
  created_at="$(date -d "@${SOURCE_DATE_EPOCH}" -Iseconds -u | sed -e 's/+00:00$/Z/')"
fi
readonly created_at

if [ -n "${GITHUB_SHA:-}" ]; then
  # https://docs.github.com/en/actions/learn-github-actions/variables#default-environment-variables
  commit="${GITHUB_SHA}"
elif [ "$(git rev-parse --is-inside-work-tree 2>/dev/null)" != 'true' ]; then
  commit='N/A'
else
  if [ -z "$(git status --porcelain=v1 2>/dev/null)" ]; then
    ext=''
  else
    ext='-next'
  fi
  commit="$(git rev-parse --verify HEAD)${ext}"
  unset ext
fi
readonly commit

# to ensure ${label} is set, we use --label "${label}"
# which might overwrite the LABEL ${label_group} of the Dockerfile
# shellcheck disable=SC2086
docker image build \
  ${no_cache} \
  --compress \
  --tag "${image_name}:latest" \
  --tag "${image_name}:${tag}" \
  --build-arg "git_commit=${commit}" \
  --build-arg "created_at=${created_at}" \
  --label "${label}" \
  .

echo

docker image inspect -f '{{json .Config.Labels}}' "${image_name}:${tag}"
