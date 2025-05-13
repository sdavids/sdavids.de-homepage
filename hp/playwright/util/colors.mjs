// SPDX-FileCopyrightText: © 2025 Sebastian Davids <sdavids@gmx.de>
// SPDX-License-Identifier: Apache-2.0

import { expect as baseExpect } from "@playwright/test";

export const expect = baseExpect.extend({
  /**
   * @param {import('@playwright/test').Locator} locator
   * @param {string} expected
   * @param {{ timeout?: number }} [options]
   */
  async toHaveColor(locator, expected, options) {
    const assertionName = "toHaveColor";
    let pass = false;
    let matcherResult = null;
    try {
      // eslint-disable-next-line playwright/no-standalone-expect
      await baseExpect(locator).toHaveCSS("color", expected, options);
      pass = true;
    } catch (e) {
      ({ matcherResult } = e);
    }
    const message = pass
      ? () =>
          // eslint-disable-next-line no-undefined
          `${this.utils.matcherHint(assertionName, undefined, undefined, { isNot: this.isNot })}\n\n` +
          `Locator: ${locator}\n` +
          `Expected: not ${this.utils.printExpected(expected)}\n${matcherResult ? `Received: ${this.utils.printReceived(matcherResult.actual)}` : ""}`
      : () =>
          // eslint-disable-next-line no-undefined
          `${this.utils.matcherHint(assertionName, undefined, undefined, { isNot: this.isNot })}\n\n` +
          `Locator: ${locator}\n` +
          `Expected: ${this.utils.printExpected(expected)}\n${matcherResult ? `Received: ${this.utils.printReceived(matcherResult.actual)}` : ""}`;
    return {
      message,
      pass,
      name: assertionName,
      expected,
      actual: matcherResult?.actual,
    };
  },
  /**
   * @param {import('@playwright/test').Locator} locator
   * @param {string} expected
   * @param {{ timeout?: number }} [options]
   */
  async toHaveBackgroundColor(locator, expected, options) {
    const assertionName = "toHaveBackgroundColor";
    let pass = false;
    let matcherResult = null;
    try {
      // eslint-disable-next-line playwright/no-standalone-expect
      await baseExpect(locator).toHaveCSS(
        "background-color",
        expected,
        options,
      );
      pass = true;
    } catch (e) {
      ({ matcherResult } = e);
    }
    const message = pass
      ? () =>
          // eslint-disable-next-line no-undefined
          `${this.utils.matcherHint(assertionName, undefined, undefined, { isNot: this.isNot })}\n\n` +
          `Locator: ${locator}\n` +
          `Expected: not ${this.utils.printExpected(expected)}\n${matcherResult ? `Received: ${this.utils.printReceived(matcherResult.actual)}` : ""}`
      : () =>
          // eslint-disable-next-line no-undefined
          `${this.utils.matcherHint(assertionName, undefined, undefined, { isNot: this.isNot })}\n\n` +
          `Locator: ${locator}\n` +
          `Expected: ${this.utils.printExpected(expected)}\n${matcherResult ? `Received: ${this.utils.printReceived(matcherResult.actual)}` : ""}`;
    return {
      message,
      pass,
      name: assertionName,
      expected,
      actual: matcherResult?.actual,
    };
  },
});
