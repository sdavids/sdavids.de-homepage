/* eslint-disable no-undef */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {},
  },
  plugins: [require('postcss-100vh-fix')],
};
