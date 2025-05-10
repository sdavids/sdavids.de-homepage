// SPDX-FileCopyrightText: © 2025 Sebastian Davids <sdavids@gmx.de>
// SPDX-License-Identifier: Apache-2.0

// https://vitest.dev/config/

/// <reference types="vitest/config" />

import path from 'node:path';
// eslint-disable-next-line import-x/no-unresolved
import { defineConfig } from 'vitest/config';

// noinspection JSUnusedGlobalSymbols
export default defineConfig({
  test: {
    include: ['vitest/**/*.test.mjs'],
    exclude: [],
    environment: 'happy-dom',
    setupFiles: ['vitest/vitest-setup.mjs'],
    deps: {
      optimizer: {
        web: {
          enabled: true,
        },
      },
    },
    alias: {
      '@': path.resolve(import.meta.dirname, './src/j'),
    },
  },
});
