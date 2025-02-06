// SPDX-FileCopyrightText: © 2025 Sebastian Davids <sdavids@gmx.de>
// SPDX-License-Identifier: Apache-2.0

// eslint-disable-next-line init-declarations
let copiedTimeout;

export const writeClipboardText = async (id) => {
  if (window.isSecureContext && navigator.clipboard) {
    const addOpacity0 = (element) => {
      const svgG = element.querySelector('g');
      if (svgG === null) {
        return;
      }
      svgG.classList.add('opacity-0');
    };
    const removeOpacity0 = (element) => {
      const svgG = element.querySelector('g');
      if (svgG === null) {
        return;
      }
      svgG.classList.remove('opacity-0');
    };

    const code = document.getElementById(`${id}-code`);
    if (code === null) {
      return;
    }

    document.querySelectorAll('[data-type="copy-button"]').forEach(addOpacity0);

    try {
      await navigator.clipboard.writeText(
        code.textContent?.trim().replace(/\s+/gu, ' ') ?? '',
      );
      const btn = document.getElementById(`${id}-btn`);
      if (btn === null) {
        return;
      }
      removeOpacity0(btn);
      clearTimeout(copiedTimeout);
      copiedTimeout = setTimeout(() => addOpacity0(btn), 500);
    } catch {
      // ignore
    }
  }
};
