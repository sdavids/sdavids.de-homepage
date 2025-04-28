#!/usr/bin/env sh

# SPDX-FileCopyrightText: © 2025 Sebastian Davids <sdavids@gmx.de>
# SPDX-License-Identifier: Apache-2.0

# https://github.com/microsoft/vscode-dev-containers/issues/559
bash -i -c 'cd hp && nvm install -b --no-progress && npm i --silent --ignore-scripts=false --fund=false --audit=false && npx playwright install --with-deps --no-shell'
