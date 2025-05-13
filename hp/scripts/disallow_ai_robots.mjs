// SPDX-FileCopyrightText: © 2025 Sebastian Davids <sdavids@gmx.de>
// SPDX-License-Identifier: Apache-2.0

import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";
import { access, readFile, writeFile } from "fs/promises";
import { relative } from "node:path";
import { cwd } from "node:process";

if (process.argv.length < 4) {
  console.error(
    `Usage: ${relative(cwd(), import.meta.filename)} DISALLOWED_USER_AGENTS_FILE HTACCESS_FILE`,
  );
  process.exit(1);
}

const disallowedUserAgentsFile = process.argv[2];
const robotsFile = process.argv[3];

try {
  await access(disallowedUserAgentsFile);
} catch {
  console.error(`${disallowedUserAgentsFile} does not exist`);
  process.exit(2);
}

try {
  await access(robotsFile);
} catch {
  console.error(`${robotsFile} does not exist`);
  process.exit(3);
}

const fileStream = createReadStream(disallowedUserAgentsFile);
const rl = createInterface({ input: fileStream, crlfDelay: Infinity });

let lines = [];
for await (const l of rl) {
  lines.push(l);
}
// eslint-disable-next-line new-cap
lines = Array.from(new Set(lines)).sort(Intl.Collator().compare);

let disallowedUserAgents = [];
for (const l of lines) {
  disallowedUserAgents.push(`
User-agent: ${l}
Disallow: /`);
}
disallowedUserAgents = disallowedUserAgents.join("\n");

const robots = await readFile(robotsFile, "utf8");

const replaced = robots.replace(
  "###disallowed-user-agents###",
  disallowedUserAgents,
);

await writeFile(robotsFile, replaced);
