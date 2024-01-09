#!/usr/bin/env bash

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

# https://github.com/OpenVPN/easy-rsa/blob/master/doc/EasyRSA-Readme.md
# https://github.com/OpenVPN/easy-rsa/blob/master/doc/EasyRSA-Advanced.md
# https://gist.github.com/powerman/060a6e10d3c901fa5c4085c166a51c03

set -Eeu -o pipefail -o posix

config_dir="${HOME}/.easyrsa"

if [ "$(uname)" = 'Darwin' ]; then
  config_dir="${HOME}/Library/Application\ Support/easyrsa"
fi

if [ -n "${XDG_DATA_HOME}" ]; then
  config_dir="${XDG_DATA_HOME}/easyrsa"
fi

readonly pki_dir="${config_dir}/pki"

if [ -d "${pki_dir}" ]; then
  exit 0
fi

export EASYRSA_PKI="${pki_dir}"

host_name="$(hostname -f)"

easyrsa --sbatch init-pki

touch "${EASYRSA_PKI}/vars"

echo "Local CA ${host_name}" | easyrsa --sbatch --silent-ssl build-ca nopass

readonly ca_cert="${pki_dir}/ca.crt"

if [ "$(uname)" = 'Darwin' ]; then
  printf '\nNow import the root certificate authority into Keychain Access.\n\n'
  printf 'Add "Easy-RSA CA" to the "System" keychain and double click on it afterwards.\n\n'
  printf 'Select "Always trust" under "Secure Sockets Layer (SSL)."\n'

  {
    printf "\nPress any key to start the import\n"
    read -r -s -n 1
  } 1>&2

  open "${ca_cert}"
else
  printf "Please consult your browser's or distribution's documentation on how to import and trust the following CA certificate:\n%s\n" "${ca_cert}"
fi
