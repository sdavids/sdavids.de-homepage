// SPDX-FileCopyrightText: © 2025 Sebastian Davids <sdavids@gmx.de>
// SPDX-License-Identifier: Apache-2.0

// https://vitest.dev/config/

/// <reference types="vitest/config" />

import { defineConfig } from "vitest/config";

const config = defineConfig({
  test: {
    include: ["vitest/**/*.test.mjs"],
    exclude: [],
    environment: "happy-dom",
    setupFiles: ["vitest/vitest-setup.mjs"],
    deps: {
      optimizer: {
        web: {
          enabled: true,
        },
      },
    },
  },
});

export default config;
