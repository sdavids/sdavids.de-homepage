#!/usr/bin/env bash

set -Eeuo pipefail

if [[ -z "$*" ]]; then echo "Usage: $0 FILE"; exit 1; fi

readonly file="$1"
readonly echo="${2:-}"

if [[ ! -f "${file}" ]]; then echo "${file} does not exist"; exit 2; fi

sha=$(sha1sum "${file}")
hash=$(echo "${sha}" | cut -c 1-7)
filename=$(rev <<< "${file}" | cut -d "." -f2- | rev)

readonly extension="${1##*.}"

if [[ "${filename}" == "${extension}" ]]; then
  filename_hashed="${filename}.${hash[0]}"
  mv "${file}" "${filename_hashed}"
else
  filename_hashed="${filename}.${hash[0]}.${extension}"
  mv "${file}" "${filename_hashed}"
fi

if [[ "${echo}" = "-e" ]]; then echo "${filename_hashed}"; fi
