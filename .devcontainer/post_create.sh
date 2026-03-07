#!/usr/bin/env sh

# SPDX-FileCopyrightText: © 2025 Sebastian Davids <sdavids@gmx.de>
# SPDX-License-Identifier: Apache-2.0

find hp -type d -name node_modules -exec rm -rf {} +

pnpm_version="$(jq -r .devEngines.packageManager.version hp/package.json)"
readonly pnpm_version

node_version="$(jq -r .devEngines.runtime.version hp/package.json)"
readonly node_version

curl -fsSL https://get.pnpm.io/install.sh | env PNPM_VERSION="${pnpm_version}" sh -

bash -i -c "cd hp && pnpm env use --global ${node_version} && pnpm install && export DEBIAN_FRONTEND=noninteractive && pnpm exec playwright install --with-deps"

sudo apt-get autoremove -y
sudo apt-get clean -y
sudo rm -rf /var/lib/apt/lists/*
