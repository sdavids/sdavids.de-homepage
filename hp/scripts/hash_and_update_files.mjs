// SPDX-FileCopyrightText: © 2023 Sebastian Davids <sdavids@gmx.de>
// SPDX-License-Identifier: Apache-2.0

import { createHash } from "node:crypto";
import { readFile, readdir, rename, writeFile } from "node:fs/promises";
import { parse, relative, resolve } from "node:path";
import { cwd } from "node:process";

/**
 * @param {string} path
 * @param {string | [string]} extensions
 * @returns {Iterable<string>}
 */
const getFilesWithExtension = async function* (path, extensions) {
  if (typeof extensions === "string") {
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
  const file = await readFile(path, "utf8");
  return createHash("sha1").update(file).digest("hex");
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
  let data = await readFile(path, "utf8");
  for (const { from, to } of replacements) {
    data = data.replaceAll(from, to);
  }
  await writeFile(path, data);
};

if (process.argv.length < 4) {
  console.error(
    `Usage: ${relative(cwd(), import.meta.filename)} DIR TO_HASH_EXTENSION TO_UPDATE_EXTENSIONS`,
  );
  process.exit(1);
}

try {
  const path = process.argv[2];
  const toHash = process.argv[3];
  const toUpdate = (process.argv[4] ?? "").split(",");

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
