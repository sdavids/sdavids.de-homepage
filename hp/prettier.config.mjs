// SPDX-FileCopyrightText: © 2022 Sebastian Davids <sdavids@gmx.de>
// SPDX-License-Identifier: Apache-2.0

// https://prettier.io/docs/en/options.html

/** @type {import('prettier').Config} */
export default {
  singleQuote: true,
  // https://github.com/prettier/plugin-xml#configuration
  xmlQuoteAttributes: 'double',
  xmlSortAttributesByKey: true,
  xmlWhitespaceSensitivity: 'ignore',
};
