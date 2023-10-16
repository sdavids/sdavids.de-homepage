#!/usr/bin/env sh

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
