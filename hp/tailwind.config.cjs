/** @type {import('tailwindcss').Config} */

'use strict';

module.exports = {
  content: ['./src/**/*.{html,js}'],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      future: {
        hoverOnlyWhenSupported: true,
      },
      screens: {
        smh: { raw: '(max-height: 550px)' },
      },
    },
  },
};
