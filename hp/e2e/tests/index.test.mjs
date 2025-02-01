// SPDX-FileCopyrightText: © 2025 Sebastian Davids <sdavids@gmx.de>
// SPDX-License-Identifier: Apache-2.0

import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should not have any automatically detectable accessibility issues', async ({
    page,
  }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have stable aria tree', async ({ page }) => {
    await expect(page.getByRole('main')).toMatchAriaSnapshot(`
      - main:
        - article "Sebastian Davids":
          - heading "Sebastian Davids" [level=1]
          - region "Email address":
            - heading "Email address" [level=2]
            - link "sebastian@sdavids.de"
          - region "iMessage":
            - heading "iMessage" [level=2]
            - text: APKTIDVw2zk8ZQeSkpWLUD9UGI hH00TtYdMRkryMUZUtBJRxeCSA
            - group:
              - heading "Usage" [level=3]
          - region "GPG":
            - heading "GPG" [level=2]
            - link "GPG public key"
            - link "keys.openpgp.org"
            - text: /3B05 1F8E AA0B 63D1 \\d+ 168C 99A9 7C77 8DCD F19F/
            - group:
              - heading "Usage" [level=3]
          - region "age":
            - heading "age" [level=2]
            - link "age public key"
            - group:
              - heading "Usage" [level=3]
    `);
    await expect(page.getByRole('contentinfo')).toMatchAriaSnapshot(`
      - contentinfo:
        - navigation "social links":
          - list:
            - listitem:
              - link "GitHub"
            - listitem:
              - link "Gravatar"
        - paragraph: /© \\d+-\\d+ Sebastian Davids/
    `);
  });
});
