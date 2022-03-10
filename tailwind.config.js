const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    'src/pages/**/*.{js,ts,jsx,tsx}',
    'src/common/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      spacing: {
        128: '43.75rem',
      },
    },
    fontFamily: {
      sans: ['ui-sans-serif', 'system-ui'],
      serif: ['ui-serif', 'Georgia'],
      mono: ['SFMono-Regular', 'Menlo'],
      hanson: ['Rubik Mono One', 'ui-sans-serif'],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      indigo: colors.indigo,
      red: colors.red,
      yellow: colors.amber,
      green: colors.green,
      blue: colors.blue,
      ukrblue: '#4378ff',
      ukryellow: '#ffd600',
    },
    maxWidth: {
      '3xl': '1980px',
    },
  },
  plugins: [],
};
