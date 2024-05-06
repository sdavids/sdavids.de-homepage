#!/usr/bin/env node

// SPDX-FileCopyrightText: © 2023 Sebastian Davids <sdavids@gmx.de>
// SPDX-License-Identifier: Apache-2.0

// Prerequisite:
//   npm i --save-dev htmlparser2 domutils

import * as htmlparser2 from 'htmlparser2';
import { findOne, textContent } from 'domutils';
import { readFile, writeFile } from 'fs/promises';
import { createHash } from 'node:crypto';

/**
 * @param {ChildNode} node
 * @return {boolean}
 */
const isElement = (node) => node.nodeType === 1;

/**
 * @param {Element} elem
 * @return {boolean}
 */
const isImportMap = (elem) =>
  elem.name === 'script' && elem.attribs.type === 'importmap';

if (process.argv.length < 4) {
  process.exit(1);
}

const indexFile = process.argv[2];
const htaccessFile = process.argv[3];

const html = await readFile(indexFile, 'utf8');

const dom = htmlparser2.parseDocument(html);

const found = findOne(isImportMap, dom.children.filter(isElement), true);

if (found === null) {
  process.exit();
}

const text = textContent(found);

const hash = createHash('sha256').update(text).digest('base64');

const htaccess = await readFile(htaccessFile, 'utf8');

const replaced = htaccess.replace(
  "script-src 'self';",
  `script-src 'self' 'sha256-${hash}';`,
);

await writeFile(htaccessFile, replaced);
