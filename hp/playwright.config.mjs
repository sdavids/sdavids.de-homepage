// SPDX-FileCopyrightText: © 2025 Sebastian Davids <sdavids@gmx.de>
// SPDX-License-Identifier: Apache-2.0

import { defineConfig, devices } from '@playwright/test';

// https://playwright.dev/docs/test-configuration

const baseUrl = process.env.CI ? 'https://sdavids.de' : 'http://localhost:3000';

// noinspection JSUnusedGlobalSymbols
export default defineConfig({
  testDir: 'e2e/tests',
  reporter: process.env.CI ? 'github' : 'html',
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: baseUrl,
    locale: 'de-DE',
    timezoneId: 'Europe/Berlin',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'smoke',
      testMatch: '**/*.smoke.test.mjs',
    },
    // https://github.com/microsoft/playwright/blob/main/packages/playwright-core/src/server/deviceDescriptorsSource.json
    {
      name: 'chromium',
      // https://playwright.dev/docs/browsers#chromium-new-headless-mode
      use: { ...devices['Desktop Chrome'], channel: 'chromium' },
      testIgnore: '**/*.smoke.test.mjs',
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      testIgnore: '**/*.smoke.test.mjs',
    },
  ],
});
