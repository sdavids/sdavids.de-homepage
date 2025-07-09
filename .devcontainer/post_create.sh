#!/usr/bin/env sh

# SPDX-FileCopyrightText: © 2025 Sebastian Davids <sdavids@gmx.de>
# SPDX-License-Identifier: Apache-2.0

find hp -type d -name node_modules -exec rm -rf {} +

curl -fsSL https://get.pnpm.io/install.sh | env PNPM_VERSION="$(jq -r .devEngines.packageManager.version hp/package.json)" sh -

bash -i -c "cd hp && pnpm env use --global $(perl <hp/pnpm-workspace.yaml -n -e '/useNodeVersion: (.*)/ && print $1') && pnpm install && export DEBIAN_FRONTEND=noninteractive && pnpm exec playwright install --with-deps"

sudo apt-get autoremove -y
sudo apt-get clean -y
sudo rm -rf /var/lib/apt/lists/*
