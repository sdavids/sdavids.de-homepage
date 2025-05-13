// SPDX-FileCopyrightText: © 2023 Sebastian Davids <sdavids@gmx.de>
// SPDX-License-Identifier: Apache-2.0

// Prerequisite:
//   npm i --save-dev domutils dom-serializer htmlparser2

import { access, readFile, writeFile } from "node:fs/promises";
import { relative } from "node:path";
import { cwd } from "node:process";
import { findAll, findOne, replaceElement, textContent } from "domutils";
import { parseDocument } from "htmlparser2";
import { render } from "dom-serializer";

/**
 * @param {ChildNode} node
 * @return {boolean}
 */
const isElement = (node) => node.nodeType === 1;

/**
 * @param {Element} elem
 * @return {boolean}
 */
const findJsonStructuredScriptTags = (elem) => {
  if (elem.name !== "script") {
    return false;
  }
  const { type } = elem.attribs;
  if (type === "importmap") {
    return true;
    // eslint-disable-next-line require-unicode-regexp
  } else if (/^application\/(?:.+\+)?json$/.test(type)) {
    return true;
  }
  return false;
};

if (process.argv.length < 3) {
  console.error(`Usage: ${relative(cwd(), import.meta.filename)} FILE`);
  process.exit(1);
}

const file = process.argv[2];

try {
  await access(file);
} catch {
  console.error(`${file} does not exist`);
  process.exit(2);
}

const html = await readFile(file, "utf8");

const dom = parseDocument(html);

const jsonTags = findAll(
  findJsonStructuredScriptTags,
  dom.children.filter(isElement),
);

if (jsonTags.length === 0) {
  process.exit();
}

for (const jsonTag of jsonTags) {
  const text = textContent(jsonTag).trim();
  if (text === "") {
    continue;
  }
  const minified = JSON.stringify(JSON.parse(text));
  const { type } = jsonTag.attribs;
  const newDom = parseDocument(`<script type="${type}">${minified}</script>`);
  const changed = findOne(findJsonStructuredScriptTags, newDom.children);
  replaceElement(jsonTag, changed);
}

const updatedHtml = render(dom);

await writeFile(file, updatedHtml);
