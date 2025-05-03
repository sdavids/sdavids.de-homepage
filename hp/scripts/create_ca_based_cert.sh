#!/usr/bin/env bash

# SPDX-FileCopyrightText: © 2024 Sebastian Davids <sdavids@gmx.de>
# SPDX-License-Identifier: Apache-2.0

#  easyrsa needs to be in $PATH
#   Mac:
#     brew install easy-rsa
#   Linux:
#     https://easy-rsa.readthedocs.io/en/latest/#obtaining-and-using-easy-rsa

# https://github.com/OpenVPN/easy-rsa/blob/master/doc/EasyRSA-Readme.md
# https://github.com/OpenVPN/easy-rsa/blob/master/doc/EasyRSA-Advanced.md
# https://github.com/OpenVPN/easy-rsa/blob/master/README.quickstart.md

set -Eeu -o pipefail -o posix

# shellcheck disable=SC2143
if [ "$(easyrsa --version | grep -E -c 'Version:\s+3.1')" -ne 1 ]; then
  echo 'only version 3.1 of easyRSA supported' >&2
  exit 1
fi

readonly out_dir="${1:-$PWD}"

if [ -n "${2+x}" ]; then # $2 defined
  case $2 in
    '' | *[!0-9]*) # $2 is not a positive integer or 0
      echo "'$2' is not a positive integer" >&2
      exit 2
      ;;
    *) # $2 is a positive integer or 0
      days="$2"
      if [ "${days}" -lt 1 ]; then
        echo "'$2' is not a positive integer" >&2
        exit 3
      fi
      if [ "${days}" -gt 24855 ]; then
        echo "'$2' is too big; range: [1, 24855]" >&2
        exit 4
      fi
      if [ "${days}" -gt 180 ]; then
        printf "ATTENTION: '%s' exceeds 180 days, the certificate will not be accepted by Apple platforms or Safari; see https://support.apple.com/en-us/103214 for more information.\n\n" "$2"
      fi
      ;;
  esac
else # $2 undefined
  days=30
fi
readonly days

readonly host_name="${3:-localhost}"

if [ "${host_name}" = 'ca' ]; then
  echo "'ca' is not allowed due to it being the name of the certificate authority" >&2
  exit 5
fi

# https://easy-rsa.readthedocs.io/en/latest/advanced/#openssl-config
if [ -n "${EASYRSA_PKI+x}" ]; then
  readonly pki_dir="${EASYRSA_PKI}"
else
  config_dir="${HOME}/.easyrsa"
  if [ "$(uname)" = 'Darwin' ]; then
    config_dir="${HOME}/Library/Application\ Support/easyrsa"
  fi
  if [ -n "${XDG_DATA_HOME+x}" ]; then
    config_dir="${XDG_DATA_HOME}/easyrsa"
  fi
  readonly pki_dir="${config_dir}/pki"
  export EASYRSA_PKI="${pki_dir}"
  unset config_dir
fi

if [ ! -d "${pki_dir}" ]; then
  printf "The PKI directory '%s' does not exist; therefore the CA has not been created yet.\n\nExecute the create_ca.sh script to create the CA.\n" "${pki_dir}" >&2
  exit 6
fi

if [ -f "${pki_dir}/reqs/${host_name}.req" ]; then
  printf "A certificate for '%s' already exists.\n\nExecute the copy_ca_based_cert.sh script to copy it to a new location.\n" "${host_name}" >&2
  exit 7
fi

readonly cert_path="${out_dir}/cert.pem"
readonly key_path="${out_dir}/key.pem"

readonly easyrsa_key_path="${pki_dir}/private/${host_name}.key"
readonly easyrsa_cert_path="${pki_dir}/issued/${host_name}.crt"

export EASYRSA_EXTRA_EXTS="subjectAltName=DNS:${host_name}"

easyrsa --sbatch --silent-ssl --days="${days}" build-server-full "${host_name}" nopass

mkdir -p "${out_dir}"

if [ ! -e "${key_path}" ] && [ -f "${easyrsa_key_path}" ]; then
  cp "${easyrsa_key_path}" "${key_path}"
fi

if [ ! -e "${cert_path}" ] && [ -f "${easyrsa_cert_path}" ]; then
  cp "${easyrsa_cert_path}" "${cert_path}"
fi

chmod 600 "${key_path}" "${cert_path}"

if [ "$(uname)" = 'Darwin' ]; then
  # https://ss64.com/mac/security-cert-verify.html
  security verify-cert -q -n -L -r "${cert_path}"
fi

(
  cd "${out_dir}"

  if [ "$(git rev-parse --is-inside-work-tree 2>/dev/null)" != 'true' ]; then
    exit 0 # ${out_dir} not a git repository
  fi

  set +e
  git check-ignore --quiet key.pem
  key_ignored=$?

  git check-ignore --quiet cert.pem
  cert_ignored=$?
  set -e

  if [ $key_ignored -ne 0 ] || [ $cert_ignored -ne 0 ]; then
    printf "\nWARNING: key.pem and/or cert.pem is not ignored in '%s'\n\n" "$PWD/.gitignore"
    read -p 'Do you want me to modify your .gitignore file (Y/N)? ' -n 1 -r should_modify

    case "${should_modify}" in
      y | Y) printf '\n\n' ;;
      *)
        printf '\n'
        exit 0
        ;;
    esac
  fi

  if [ $key_ignored -eq 0 ]; then
    if [ $cert_ignored -eq 0 ]; then
      exit 0 # both already ignored
    fi
    printf 'cert.pem\n' >>.gitignore
  else
    if [ $cert_ignored -eq 0 ]; then
      printf 'key.pem\n' >>.gitignore
    else
      printf 'cert.pem\nkey.pem\n' >>.gitignore
    fi
  fi

  git status
)

if [ "${host_name}" = 'localhost' ]; then
  # https://man.archlinux.org/man/grep.1
  if [ "$(grep -E -i -c '127\.0\.0\.1\s+localhost' /etc/hosts)" -eq 0 ]; then
    printf "\nWARNING: /etc/hosts does not have an entry for '127.0.0.1 localhost'\n" >&2
  fi
else
  # https://man.archlinux.org/man/grep.1
  if [ "$(grep -E -i -c "127\.0\.0\.1.+${host_name//\./\.}" /etc/hosts)" -eq 0 ]; then
    printf "\nWARNING: /etc/hosts does not have an entry for '127.0.0.1 %s'\n" "${host_name}" >&2
  fi
fi
