// SPDX-FileCopyrightText: © 2025 Sebastian Davids <sdavids@gmx.de>
// SPDX-License-Identifier: Apache-2.0

import { writeClipboardText } from "./clipboard.js";

export const configureCopyButton = (/** @type {string}*/ id) => {
  const btn = /** @type {HTMLButtonElement} */ (
    document.getElementById(`${id}-btn`)
  );
  if (btn === null) {
    return;
  }

  if (window.isSecureContext && navigator.clipboard) {
    btn.addEventListener("click", () => writeClipboardText(id));
  } else {
    btn.disabled = true;
    btn.classList.add("opacity-0");
  }
};
