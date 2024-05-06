// SPDX-FileCopyrightText: © 2022 Sebastian Davids <sdavids@gmx.de>
// SPDX-License-Identifier: Apache-2.0

// eslint-disable-next-line init-declarations
let copiedTimeout;

const writeClipboardText = async (id) => {
  if (window.isSecureContext && navigator.clipboard) {
    const addOpacity0 = (e) => e.querySelector('g').classList.add('opacity-0');

    document.querySelectorAll('button.sd-copy').forEach(addOpacity0);

    const code = document.getElementById(`${id}-code`);
    try {
      await navigator.clipboard.writeText(
        code.textContent.trim().replace(/\s+/gu, ' '),
      );
      const btn = document.getElementById(`${id}-btn`);
      btn.querySelector('g').classList.remove('opacity-0');
      clearTimeout(copiedTimeout);
      copiedTimeout = setTimeout(() => addOpacity0(btn), 500);
    } catch {
      // ignore
    }
  }
};

for (const id of [
  'import-gpg',
  'fingerprint-gpg',
  'encrypt-gpg',
  'encrypt-age',
  'encrypt-ssh',
]) {
  document
    .getElementById(`${id}-btn`)
    .addEventListener('click', () => writeClipboardText(id));
}
