#!/usr/bin/env node

/*
 Copyright (c) 2023, Sebastian Davids

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

// Prerequisite:
//   npm i --save-dev htmlparser2 domutils

// Usage:
//   node scripts/update-importmap-hash-in-htaccess.mjs index.html .htaccess

import * as htmlparser2 from 'htmlparser2';
import { findOne, textContent } from 'domutils';
import { readFile, writeFile } from 'fs/promises';
import { createHash } from 'node:crypto';

if (process.argv.length < 4) {
  process.exit(1);
}

const indexFile = process.argv[2];
const htaccessFile = process.argv[3];

const html = await readFile(indexFile, 'utf8');

const dom = htmlparser2.parseDocument(html);

const findImportMap = (elem) =>
  elem.name === 'script' && elem.attribs.type === 'importmap';

const found = findOne(findImportMap, dom.children, true);

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
