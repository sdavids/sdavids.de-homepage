// SPDX-FileCopyrightText: © 2025 Sebastian Davids <sdavids@gmx.de>
// SPDX-License-Identifier: Apache-2.0

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/dom';
import { writeClipboardText } from '../src/j/clipboard.js';

describe('writeClipboardText', () => {
  const createCode = (id, text) => {
    const code = document.createElement('code');
    code.id = `${id}-code`;
    code.textContent = text;
    document.body.appendChild(code);
  };

  const createButton = (id) => {
    const button = document.createElement('button');
    button.id = `${id}-btn`;
    button.dataset.type = 'copy-button';
    button.innerHTML = `<svg><g data-testid="${id}"></g></svg>`;
    document.body.appendChild(button);
  };

  beforeEach(async () => {
    vi.useFakeTimers();
    window.isSecureContext = true;
    document.body.innerHTML = '';
    await navigator.clipboard.writeText('');
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('should do nothing in non-secure context', async () => {
    window.isSecureContext = false;

    const id = 'found';
    const text = '💣';

    createCode(id, text);
    createButton(id);

    await writeClipboardText(id);

    expect(await navigator.clipboard.readText()).not.toBe(text);
    expect(screen.getByTestId(id)).not.toHaveClass('opacity-0');
  });

  it('should do nothing if no navigator.clipboard', async () => {
    vi.stubGlobal('navigator', {
      clipboard: undefined,
    });

    const id = 'found';

    createCode(id, '💣');
    createButton(id);

    await writeClipboardText(id);

    expect(screen.getByTestId(id)).not.toHaveClass('opacity-0');
  });

  it('should do nothing if the code element is not found', async () => {
    const id = 'one';
    const text = '💣';

    createCode(id, text);
    createButton(id);

    await writeClipboardText('two');

    expect(await navigator.clipboard.readText()).not.toBe(text);
    expect(screen.getByTestId(id)).not.toHaveClass('opacity-0');
  });

  it('should copy text to navigator.clipboard', async () => {
    const id = 'found';
    const text = 'text 1 ü € 👷';

    createCode(id, text);

    await writeClipboardText(id);

    expect(await navigator.clipboard.readText()).toBe(text);
  });

  it('should toggle opacity of svg groups', async () => {
    const id = 'found';
    const other = 'other';

    createCode(id, 'test');
    createButton(id);
    createButton(other);

    const group = screen.getByTestId(id);
    const otherGroup = screen.getByTestId(other);

    expect(group).not.toHaveClass('opacity-0');
    expect(otherGroup).not.toHaveClass('opacity-0');

    await writeClipboardText(id);

    expect(group).not.toHaveClass('opacity-0');
    expect(otherGroup).toHaveClass('opacity-0');

    vi.advanceTimersByTime(500);

    expect(group).toHaveClass('opacity-0');
    expect(otherGroup).toHaveClass('opacity-0');
  });
});
