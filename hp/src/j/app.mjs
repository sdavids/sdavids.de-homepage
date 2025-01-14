// SPDX-FileCopyrightText: © 2022 Sebastian Davids <sdavids@gmx.de>
// SPDX-License-Identifier: Apache-2.0

// eslint-disable-next-line init-declarations
let copiedTimeout;

const writeClipboardText = async (id) => {
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

    document.querySelectorAll('button.sd-copy').forEach(addOpacity0);

    const code = document.getElementById(`${id}-code`);
    if (code === null) {
      return;
    }
    try {
      await navigator.clipboard.writeText(
        code.textContent.trim().replace(/\s+/gu, ' '),
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

const configureCopyButton = (id) => {
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

for (const id of [
  'encrypt-age',
  'encrypt-gpg',
  'fingerprint-gpg',
  'import-gpg',
]) {
  configureCopyButton(id);
}
