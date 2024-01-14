// https://tailwindcss.com/docs/configuration

// noinspection JSUnusedGlobalSymbols
/** @type {import('tailwindcss').Config} */
export default {
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
        noscript: { raw: '(scripting: none)' },
      },
    },
  },
};
