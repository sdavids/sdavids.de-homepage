// SPDX-FileCopyrightText: © 2025 Sebastian Davids <sdavids@gmx.de>
// SPDX-License-Identifier: Apache-2.0

import os from 'node:os';
import { defineConfig, devices } from '@playwright/test';

const baseUrl = process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000';

// https://playwright.dev/docs/test-configuration
const projects = [
  {
    name: 'smoke',
    use: { ...devices['Desktop Chrome'], channel: 'chromium' },
    testMatch: '**/*.smoke.test.mjs',
  },
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'], channel: 'chromium' },
    testIgnore: '**/*.smoke.test.mjs',
  },
  {
    name: 'firefox',
    use: { ...devices['Desktop Firefox'] },
    testIgnore: '**/*.smoke.test.mjs',
  },
];

// https://endoflife.date/macos
const lastSupportedMacOsVersion = 22;
if (os.platform() === 'darwin') {
  const release = os.release();
  let major = release.split(/\./u, 1)[0];
  if (major !== release) {
    major = Number(major);
    if (!isNaN(major) && major >= lastSupportedMacOsVersion) {
      projects.push({
        name: 'safari',
        use: { ...devices['Desktop Safari'] },
        testIgnore: '**/*.smoke.test.mjs',
      });
    }
  }
}

let config = {
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
  projects,
};

const shouldStartWebServer = process.env.CI || process.env.GIT_PUSH_HOOK;

if (shouldStartWebServer) {
  config = {
    ...config,
    webServer: {
      command: 'node --run start',
      url: 'http://127.0.0.1:3000',
      reuseExistingServer: !shouldStartWebServer,
    },
  };
}

// noinspection JSUnusedGlobalSymbols
export default defineConfig(config);
