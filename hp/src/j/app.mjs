/*
 * Copyright (c) 2022-2024, Sebastian Davids
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
    } catch (error) {
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
