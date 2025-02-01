// SPDX-FileCopyrightText: © 2025 Sebastian Davids <sdavids@gmx.de>
// SPDX-License-Identifier: Apache-2.0

import { expect as baseExpect } from '@playwright/test';

/**
 * @param {string} hex `#RRGGBB` or `RRGGBB`
 * @return {{red: number, green: number, blue: number}}
 */
const convertHexToRGB = (hex) => {
  hex = hex.replace(/^#/u, '');
  const red = parseInt(hex.substring(0, 2), 16);
  const green = parseInt(hex.substring(2, 4), 16);
  const blue = parseInt(hex.substring(4, 6), 16);
  return { red, green, blue };
};

export const expect = baseExpect.extend({
  /**
   * @param {import('@playwright/test').Locator} locator
   * @param {string | {red: number, green: number, blue: number, alpha?: number}} expected
   * @param {{ timeout?: number }} [options]
   */
  async toHaveColor(locator, expected, options) {
    if (typeof expected === 'string') {
      expected = convertHexToRGB(expected);
    }
    expected =
      // eslint-disable-next-line eqeqeq,no-eq-null
      expected.alpha == null
        ? `rgb(${expected.red}, ${expected.green}, ${expected.blue})`
        : `rgba(${expected.red}, ${expected.green}, ${expected.blue}, ${expected.alpha})`;
    const assertionName = 'toHaveColor';
    let pass = false;
    let matcherResult = null;
    try {
      // eslint-disable-next-line playwright/no-standalone-expect
      await baseExpect(locator).toHaveCSS('color', expected, options);
      pass = true;
    } catch (e) {
      ({ matcherResult } = e);
    }
    const message = pass
      ? () =>
          `${this.utils.matcherHint(assertionName, undefined, undefined, { isNot: this.isNot })}\n\n` +
          `Locator: ${locator}\n` +
          `Expected: not ${this.utils.printExpected(expected)}\n${matcherResult ? `Received: ${this.utils.printReceived(matcherResult.actual)}` : ''}`
      : () =>
          `${this.utils.matcherHint(assertionName, undefined, undefined, { isNot: this.isNot })}\n\n` +
          `Locator: ${locator}\n` +
          `Expected: ${this.utils.printExpected(expected)}\n${matcherResult ? `Received: ${this.utils.printReceived(matcherResult.actual)}` : ''}`;
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
   * @param {string | {red: number, green: number, blue: number, alpha?: number}} expected
   * @param {{ timeout?: number }} [options]
   */
  async toHaveBackgroundColor(locator, expected, options) {
    if (typeof expected === 'string') {
      expected = convertHexToRGB(expected);
    }
    expected =
      // eslint-disable-next-line eqeqeq,no-eq-null
      expected.alpha == null
        ? `rgb(${expected.red}, ${expected.green}, ${expected.blue})`
        : `rgba(${expected.red}, ${expected.green}, ${expected.blue}, ${expected.alpha})`;
    const assertionName = 'toHaveBackgroundColor';
    let pass = false;
    let matcherResult = null;
    try {
      // eslint-disable-next-line playwright/no-standalone-expect
      await baseExpect(locator).toHaveCSS(
        'background-color',
        expected,
        options,
      );
      pass = true;
    } catch (e) {
      ({ matcherResult } = e);
    }
    const message = pass
      ? () =>
          `${this.utils.matcherHint(assertionName, undefined, undefined, { isNot: this.isNot })}\n\n` +
          `Locator: ${locator}\n` +
          `Expected: not ${this.utils.printExpected(expected)}\n${matcherResult ? `Received: ${this.utils.printReceived(matcherResult.actual)}` : ''}`
      : () =>
          `${this.utils.matcherHint(assertionName, undefined, undefined, { isNot: this.isNot })}\n\n` +
          `Locator: ${locator}\n` +
          `Expected: ${this.utils.printExpected(expected)}\n${matcherResult ? `Received: ${this.utils.printReceived(matcherResult.actual)}` : ''}`;
    return {
      message,
      pass,
      name: assertionName,
      expected,
      actual: matcherResult?.actual,
    };
  },
});
