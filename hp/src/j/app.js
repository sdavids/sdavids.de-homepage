// SPDX-FileCopyrightText: © 2022 Sebastian Davids <sdavids@gmx.de>
// SPDX-License-Identifier: Apache-2.0

import { configureCopyButton } from './copy-button.js';

for (const id of [
  'encrypt-age',
  'encrypt-gpg',
  'fingerprint-gpg',
  'import-gpg',
]) {
  configureCopyButton(id);
}
