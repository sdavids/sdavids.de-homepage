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
//   node scripts/minify-json-tags.mjs index.html

import * as htmlparser2 from 'htmlparser2';
import { findAll, findOne, replaceElement, textContent } from 'domutils';
import { readFile, writeFile } from 'fs/promises';
import { render } from 'dom-serializer';

if (process.argv.length < 3) {
  process.exit(1);
}

const file = process.argv[2];

const html = await readFile(file, 'utf8');

const dom = htmlparser2.parseDocument(html);

const findJsonStructuredScriptTags = (elem) => {
  if (elem.name !== 'script') {
    return false;
  }
  const { type } = elem.attribs;
  if (type === 'importmap') {
    return true;
    // eslint-disable-next-line require-unicode-regexp
  } else if (/^application\/(?:.+\+)?json$/.test(type)) {
    return true;
  }
  return false;
};

const jsonTags = findAll(findJsonStructuredScriptTags, dom.children);

if (jsonTags.length === 0) {
  process.exit();
}

for (const jsonTag of jsonTags) {
  const text = textContent(jsonTag).trim();
  if (text === '') {
    continue;
  }
  const minified = JSON.stringify(JSON.parse(text));
  const { type } = jsonTag.attribs;
  const newDom = htmlparser2.parseDocument(
    `<script type="${type}">${minified}</script>`,
  );
  const changed = findOne(findJsonStructuredScriptTags, newDom.children);
  replaceElement(jsonTag, changed);
}

const updatedHtml = render(dom);

await writeFile(file, updatedHtml);
