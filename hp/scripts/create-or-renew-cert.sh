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

# https://github.com/OpenVPN/easy-rsa/blob/master/doc/EasyRSA-Readme.md
# https://github.com/OpenVPN/easy-rsa/blob/master/doc/EasyRSA-Advanced.md
# https://gist.github.com/powerman/060a6e10d3c901fa5c4085c166a51c03

set -eu

readonly certs_dir="${PWD}/certs"

readonly server_cert="${certs_dir}/server.crt"
readonly server_key="${certs_dir}/server.key"

config_dir="${HOME}/.easyrsa"

if [ "$(uname)" = 'Darwin' ]; then
  config_dir="${HOME}/Library/Application\ Support/easyrsa"
fi

if [ -n "${XDG_DATA_HOME}" ]; then
  config_dir="${XDG_DATA_HOME}/easyrsa"
fi

readonly pki_dir="${config_dir}/pki"

if [ ! -d "${pki_dir}" ]; then
  printf "CA has not been created and imported.\n\nExecute scripts/create-ca.sh\n"

  exit 1
fi

readonly server_name="httpd.local"

readonly easyrsa_key="${pki_dir}/private/${server_name}.key"
readonly easyrsa_cert="${pki_dir}/issued/${server_name}.crt"
readonly easyrsa_renew_cert="${pki_dir}/renewed/issued/${server_name}.crt"

export EASYRSA_PKI="${pki_dir}"

if [ ! -f "${easyrsa_key}" ]; then
  easyrsa --sbatch --silent-ssl --days=180 build-server-full "${server_name}" nopass

  printf "\nPlease add %s to your /etc/hosts:\n\n127.0.0.1 localhost %s\n" "${server_name}" "${server_name}"
else
  if [ -f "${easyrsa_renew_cert}" ]; then
    rm -f "${easyrsa_renew_cert}"
  fi

  easyrsa --sbatch --silent-ssl renew "${server_name}"
fi

if [ ! -d "${certs_dir}" ]; then
  mkdir -p "${certs_dir}"
fi

if [ ! -e "${server_cert}" ] && [ -f "${easyrsa_cert}" ]; then
  cp "${easyrsa_cert}" "${server_cert}"
fi

if [ ! -e "${server_key}" ] && [ -f "${easyrsa_key}" ]; then
  cp "${easyrsa_key}" "${server_key}"
fi
