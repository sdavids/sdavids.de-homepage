/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{html,js}'],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      screens: {
        smh: { raw: '(max-height: 550px)' },
      },
    },
  },
};
