// SPDX-FileCopyrightText: © 2025 Sebastian Davids <sdavids@gmx.de>
// SPDX-License-Identifier: Apache-2.0

import { writeClipboardText } from './clipboard.js';

export const configureCopyButton = (id) => {
  /** @type HTMLButtonElement */
  const btn = document.getElementById(`${id}-btn`);
  if (btn === null) {
    return;
  }

  if (window.isSecureContext && navigator.clipboard) {
    btn.addEventListener('click', () => writeClipboardText(id));
  } else {
    btn.disabled = true;
    btn.classList.add('opacity-0');
  }
};
