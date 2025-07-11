#!/usr/bin/env sh

# SPDX-FileCopyrightText: © 2025 Sebastian Davids <sdavids@gmx.de>
# SPDX-License-Identifier: Apache-2.0

# pnpm needs to be in $PATH
# https://pnpm.io/installation

# https://github.com/devcontainers/features/tree/main/src/docker-outside-of-docker#1-use-the-localworkspacefolder-as-environment-variable-in-your-code
if [ -n "${LOCAL_WORKSPACE_FOLDER+x}" ]; then
  pnpm exec playwright show-report --host 0.0.0.0 reports/playwright
else
  pnpm exec playwright show-report reports/playwright
fi
