// SPDX-FileCopyrightText: © 2025 Sebastian Davids <sdavids@gmx.de>
// SPDX-License-Identifier: Apache-2.0

import { test } from "@playwright/test";
import { AxeBuilder } from "@axe-core/playwright";
import { expect } from "../util/colors.mjs";

test.describe("index - a11y", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should not have any automatically detectable accessibility issues", async ({
    page,
  }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toStrictEqual([]);
  });

  test("should have a stable aria tree - desktop", async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile);
    await expect(page.getByRole("main")).toMatchAriaSnapshot(`
      - main:
        - article "Sebastian Davids":
          - heading "Sebastian Davids" [level=1]
          - region "Email address":
            - heading "Email address" [level=2]
            - link "sebastian@sdavids.de"
          - region "GPG":
            - heading "GPG" [level=2]
            - link "GPG public key"
            - text: /3B05 1F8E AA0B 63D1 \\d+ 168C 99A9 7C77 8DCD F19F/
            - group:
              - heading "Usage" [level=3]
          - region "age":
            - heading "age" [level=2]
            - link "age public key"
            - group:
              - heading "Usage" [level=3]
          - region "iMessage":
            - heading "iMessage" [level=2]
            - text: APKTIDVw2zk8ZQeSkpWLUD9UGIhH00TtYdMRkryMUZUtBJRxeCSA
            - group:
              - heading "Usage" [level=3]
    `);
    await expect(page.getByRole("contentinfo")).toMatchAriaSnapshot(`
      - contentinfo:
        - navigation "social links":
          - list:
            - listitem:
              - link "GitHub"
        - paragraph: /© \\d+-\\d+ Sebastian Davids/
    `);
  });

  test("should have a stable aria tree - mobile", async ({
    page,
    isMobile,
  }) => {
    test.skip(!isMobile);
    await expect(page.getByRole("main")).toMatchAriaSnapshot(`
      - main:
        - article "Sebastian Davids":
          - heading "Sebastian Davids" [level=1]
          - region "Email address":
            - heading "Email address" [level=2]
            - link "sebastian@sdavids.de"
          - region "GPG":
            - heading "GPG" [level=2]
            - link "GPG public key":
              - /url: sdavids.gpg
              - text: Public key
            - text: 3B05 1F8E AA0B 63D1 7220 168C 99A9 7C77 8DCD F19F
          - region "age":
            - heading "age" [level=2]
            - link "age public key":
              - /url: sdavids.age
              - text: Public key
          - region "SSH":
            - heading "SSH" [level=2]
            - link "SSH public key":
              - /url: sdavids.pub
              - text: Public key
          - region "iMessage":
            - heading "iMessage" [level=2]
            - text: APKTIDVw2zk8ZQeSkpWLUD9UGIhH00TtYdMRkryMUZUtBJRxeCSA
            - group:
              - heading "Usage" [level=3]
    `);
    await expect(page.getByRole("contentinfo")).toMatchAriaSnapshot(`
      - contentinfo:
        - navigation "social links":
          - list:
            - listitem:
              - link "GitHub"
        - paragraph: /© \\d+-\\d+ Sebastian Davids/
    `);
  });
});

test.describe("index - light mode", () => {
  test.use({ colorScheme: "light" });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should have a dark heading - non-webkit", async ({
    browserName,
    page,
  }) => {
    test.skip(
      browserName === "webkit",
      "oklch reported with less fractions on non-webkit",
    );
    await expect(
      page.getByRole("heading", { name: "Sebastian Davids" }),
    ).toHaveColor("oklch(0.21 0.034 264.665)");
  });

  test("should have a dark heading - webkit", async ({ browserName, page }) => {
    test.skip(
      browserName !== "webkit",
      "oklch reported with more fractions on webkit",
    );
    await expect(
      page.getByRole("heading", { name: "Sebastian Davids" }),
    ).toHaveColor("oklch(0.21 0.034 264.665009)");
  });

  test("should have a light background", async ({ page }) => {
    await expect(
      page.getByRole("article", { name: "Sebastian Davids" }),
    ).toHaveBackgroundColor("rgb(255, 255, 255)");
  });
});

test.describe("index - dark mode", () => {
  test.use({ colorScheme: "dark" });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should have a light heading - non-webkit", async ({
    browserName,
    page,
  }) => {
    test.skip(
      browserName === "webkit",
      "oklch reported with less fractions on non-webkit",
    );
    await expect(
      page.getByRole("heading", { name: "Sebastian Davids" }),
    ).toHaveColor("oklch(0.928 0.006 264.531)");
  });

  test("should have a light heading - webkit", async ({
    browserName,
    page,
  }) => {
    test.skip(
      browserName !== "webkit",
      "oklch reported with more fractions on webkit",
    );
    await expect(
      page.getByRole("heading", { name: "Sebastian Davids" }),
    ).toHaveColor("oklch(0.928 0.006 264.531006)");
  });

  test("should have a dark background - non-webkit", async ({
    browserName,
    page,
  }) => {
    test.skip(
      browserName === "webkit",
      "oklch reported with less fractions on non-webkit",
    );
    await expect(
      page.getByRole("article", { name: "Sebastian Davids" }),
    ).toHaveBackgroundColor("oklch(0.274 0.006 286.033)");
  });

  test("should have a dark background - webkit", async ({
    browserName,
    page,
  }) => {
    test.skip(
      browserName !== "webkit",
      "oklch reported with more fractions on webkit",
    );
    await expect(
      page.getByRole("article", { name: "Sebastian Davids" }),
    ).toHaveBackgroundColor("oklch(0.274 0.006 286.03299)");
  });
});
