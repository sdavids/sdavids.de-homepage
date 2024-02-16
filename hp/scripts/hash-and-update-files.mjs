#!/usr/bin/env node

/*
Copyright (c) 2023-2024, Sebastian Davids

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

/* eslint-disable no-console */

import { readFile, readdir, rename, writeFile } from 'node:fs/promises';
import { parse, resolve } from 'node:path';
import { createHash } from 'node:crypto';

/**
 * @param {string} path
 * @param {string | [string]} extensions
 * @returns {Iterable<string>}
 */
const getFilesWithExtension = async function* (path, extensions) {
  if (typeof extensions === 'string') {
    extensions = [extensions];
  }
  const dirEntries = await readdir(path, { withFileTypes: true });
  for (const entry of dirEntries) {
    const file = resolve(path, entry.name);
    if (entry.isDirectory()) {
      yield* getFilesWithExtension(file, extensions);
    } else if (extensions.some((e) => entry.name.endsWith(e))) {
      yield file;
    }
  }
};

/**
 * @param {string} path
 * @returns {Promise<string>}
 */
const getFileHash = async (path) => {
  const file = await readFile(path, 'utf8');
  return createHash('sha1').update(file).digest('hex');
};

/**
 * @param {string} file
 * @param {string} hash
 * @return {{name: string, path:string}}
 */
const getFileWithHash = (file, hash) => {
  const path = parse(file);
  const shortHash = hash.slice(0, 7);
  const name = `${path.name}.${shortHash}${path.ext}`;
  return {
    name,
    path: `${path.dir}/${name}`,
  };
};

/**
 * @param {string} path
 * @param {[{from:string, to: string}]} replacements
 */
const updateFile = async (path, replacements) => {
  let data = await readFile(path, 'utf8');
  for (const { from, to } of replacements) {
    data = data.replaceAll(from, to);
  }
  await writeFile(path, data);
};

if (process.argv.length < 4) {
  console.error('You need to supply the path and extension');
  process.exit(1);
}

try {
  const path = process.argv[2];
  const toHash = process.argv[3];
  const toUpdate = (process.argv[4] ?? '').split(',');

  /** @type {[{from:string, to: string}]} */
  const renames = [];

  for await (const file of getFilesWithExtension(path, toHash)) {
    const hash = await getFileHash(file);
    const fileName = parse(file).base;
    const newFile = getFileWithHash(file, hash);
    await rename(file, newFile.path);
    renames.push({ from: fileName, to: newFile.name });
  }
  for await (const file of getFilesWithExtension(path, toUpdate)) {
    await updateFile(file, renames);
  }
} catch (e) {
  console.error(e);
}
