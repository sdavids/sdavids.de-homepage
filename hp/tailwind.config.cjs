// https://tailwindcss.com/docs/configuration


'use strict';

/** @type {import('tailwindcss').Config} */
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
