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
//   npm i --save-dev htmlparser2 domutils dom-serializer

// Usage:
//   node scripts/minify-importmap.mjs index.html

import * as htmlparser2 from 'htmlparser2';
import { findOne, replaceElement, textContent } from 'domutils';
import { readFile, writeFile } from 'fs/promises';
import { render } from 'dom-serializer';

if (process.argv.length < 3) {
  process.exit(1);
}

const file = process.argv[2];

const html = await readFile(file, 'utf8');

const dom = htmlparser2.parseDocument(html);

const findImportMap = (elem) =>
  elem.name === 'script' && elem.attribs.type === 'importmap';

const found = findOne(findImportMap, dom.children, true);

if (found === null) {
  process.exit();
}

const text = textContent(found).trim();

if (text === '') {
  process.exit();
}

const minified = JSON.stringify(JSON.parse(text));

const newDom = htmlparser2.parseDocument(
  `<script type="importmap">${minified}</script>`,
);

const changed = findOne(findImportMap, newDom.children, true);

replaceElement(found, changed);

const updatedHtml = render(dom);

await writeFile(file, updatedHtml);
