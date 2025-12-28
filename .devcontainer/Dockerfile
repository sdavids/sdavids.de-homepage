# syntax=docker/dockerfile:1
# check=error=true

# SPDX-FileCopyrightText: © 2025 Sebastian Davids <sdavids@gmx.de>
# SPDX-License-Identifier: Apache-2.0

# https://docs.docker.com/engine/reference/builder/

# https://hub.docker.com/_/debian
FROM debian:13.2-slim

SHELL ["/bin/bash", "-Eeuo", "pipefail", "-c"]

# hadolint ignore=DL3008
RUN export DEBIAN_FRONTEND=noninteractive \
  && apt-get update \
# for lhci
  && apt-get --yes install --no-install-recommends ca-certificates curl gnupg2 \
  && curl -s https://dl.google.com/linux/linux_signing_key.pub | gpg --dearmor -o /usr/share/keyrings/google-chrome.gpg \
  && mkdir -p /etc/apt/sources.list.d \
  && echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/google-chrome.gpg] https://dl.google.com/linux/chrome/deb/ stable main" >/etc/apt/sources.list.d/google-chrome.list \
  && apt-get update \
#
  && apt-get --yes upgrade --no-install-recommends \
  && apt-get --yes install --no-install-recommends \
    libstdc++6 \
    locales \
    sudo \
    openssh-client \
    openssl \
    git \
    jq \
    reuse \
    shellcheck \
    brotli \
    zstd \
    easy-rsa \
    neovim \
# for lhci
    google-chrome-stable \
# clean up
  && apt-get --yes autoremove \
  && apt-get --yes clean \
  && rm -rf /var/lib/apt/lists/* \
# ensure en_US.UTF-8 locale is available
  && echo 'en_US.UTF-8 UTF-8' >>/etc/locale.gen \
  && locale-gen \
# create node user/group as sudoer
  && groupadd --gid 1000 node \
  && useradd -u 1000 -g node -s /bin/bash -m node \
  && echo node ALL=\(root\) NOPASSWD:ALL >/etc/sudoers.d/node \
  && chmod 0440 /etc/sudoers.d/node

ENV SHELL=/bin/bash
