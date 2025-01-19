// SPDX-FileCopyrightText: © 2025 Sebastian Davids <sdavids@gmx.de>
// SPDX-License-Identifier: Apache-2.0

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { configureCopyButton } from '../src/j/copy-button.js';

describe('configureCopyButton', () => {
  const createButton = (id) => {
    const button = document.createElement('button');
    button.id = `${id}-btn`;
    document.body.appendChild(button);
    return button;
  };

  beforeEach(() => {
    window.isSecureContext = true;
    document.body.innerHTML = '';
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('should ignore element not found', () => {
    const button = createButton('one');
    const spy = vi.spyOn(button, 'addEventListener');

    configureCopyButton('two');

    expect(spy).not.toHaveBeenCalled();
    expect(button).toBeEnabled();
    expect(button).not.toHaveClass('opacity-0');
  });

  it('should not attach listener in non-secure context', () => {
    window.isSecureContext = false;

    const id = 'found';

    const button = createButton(id);
    const spy = vi.spyOn(button, 'addEventListener');

    configureCopyButton(id);

    expect(spy).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
    expect(button).toHaveClass('opacity-0');
  });

  it('should not attach listener if no navigator.clipboard', () => {
    vi.stubGlobal('navigator', {
      clipboard: undefined,
    });

    const id = 'found';

    const button = createButton(id);
    const spy = vi.spyOn(button, 'addEventListener');

    configureCopyButton(id);

    expect(spy).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
    expect(button).toHaveClass('opacity-0');
  });

  it('should attach listener', () => {
    const id = 'found';

    const button = createButton(id);
    const spy = vi.spyOn(button, 'addEventListener');

    configureCopyButton(id);

    expect(spy).toHaveBeenCalled();
    expect(button).toBeEnabled();
    expect(button).not.toHaveClass('opacity-0');
  });
});
