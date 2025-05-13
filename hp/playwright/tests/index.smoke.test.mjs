// SPDX-FileCopyrightText: © 2025 Sebastian Davids <sdavids@gmx.de>
// SPDX-License-Identifier: Apache-2.0

import { expect, test } from "@playwright/test";

test.describe("homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should have a title", async ({ page }) => {
    await expect(page).toHaveTitle("Sebastian Davids");
  });

  test("should have the correct copyright", async ({ page }) => {
    await expect(
      page.getByText(`© 2022-${new Date().getFullYear()} Sebastian Davids`),
    ).toBeVisible();
  });
});
