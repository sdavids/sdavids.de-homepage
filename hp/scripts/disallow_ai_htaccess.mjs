// SPDX-FileCopyrightText: © 2025 Sebastian Davids <sdavids@gmx.de>
// SPDX-License-Identifier: Apache-2.0

/* eslint-disable no-console */

import { createReadStream } from 'node:fs';
import { createInterface } from 'node:readline';
import { access, readFile, writeFile } from 'fs/promises';
import { relative } from 'node:path';
import { cwd } from 'node:process';

if (process.argv.length < 4) {
  console.error(
    `Usage: ${relative(cwd(), import.meta.filename)} DISALLOWED_USER_AGENTS_FILE HTACCESS_FILE`,
  );
  process.exit(1);
}

const disallowedUserAgentsFile = process.argv[2];
const htaccessFile = process.argv[3];

try {
  await access(disallowedUserAgentsFile);
} catch {
  console.error(`${disallowedUserAgentsFile} does not exist`);
  process.exit(2);
}

try {
  await access(htaccessFile);
} catch {
  console.error(`${htaccessFile} does not exist`);
  process.exit(3);
}

const fileStream = createReadStream(disallowedUserAgentsFile);
const rl = createInterface({ input: fileStream, crlfDelay: Infinity });

let lines = [];
for await (const l of rl) {
  lines.push(l);
}
lines = Array.from(new Set(lines)).sort();

const htaccess = await readFile(htaccessFile, 'utf8');

const disallowedUserAgents = `# block AI bots
<IfModule mod_rewrite.c>
  RewriteEngine on
  RewriteBase /
  RewriteCond "%{HTTP_USER_AGENT}" "(${lines.join('|')})"
  RewriteRule "^" "-" [NC,F,L]
</IfModule>`;

const replaced = htaccess.replace(
  '###disallowed-user-agents###',
  disallowedUserAgents,
);

await writeFile(htaccessFile, replaced);
