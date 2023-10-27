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

# gpg needs to be in $PATH
#   Mac:
#     https://gpgtools.org
#   Linux:
#     apt-get install gpg

readonly email='security@sdavids.de'
readonly fingerprint='3B051F8EAA0B63D17220168C99A97C778DCDF19F'
readonly security_txt_file='src/.well-known/security.txt'
readonly tmp_file="${security_txt_file}.tmp"

if [ "$(uname)" = 'Darwin' ]; then
    expires="$(date -Iseconds -u -v +365d | sed -e 's/+00:00$/Z/')"
else
    expires="$(date -Iseconds -u -d '+365 days' | sed -e 's/+00:00$/Z/')"
fi

printf '%s\n%s\n%s\n%s\n%s\n' \
  "Contact: mailto:${email}" \
  'Preferred-Languages: en, de' \
  "Encryption: openpgp4fpr:${fingerprint}" \
  'Canonical: https://sdavids.de/.well-known/security.txt' \
  "Expires: ${expires}" > "${tmp_file}"

gpg --clearsign --local-user "${email}" --output "${security_txt_file}" --yes "${tmp_file}"

rm "${tmp_file}"
