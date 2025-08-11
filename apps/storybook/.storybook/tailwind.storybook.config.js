/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'stories/**/*.{js,ts,jsx,tsx,mdx}',
    '../../node_modules/@xsky/eris-ui/components/**/*.{js,ts,jsx,tsx,mdx}',
    '../../node_modules/@xsky/eris-ui/charts/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  corePlugins: {
    preflight: false,
  },
  darkMode: ['class'],
  presets: [require('@xsky/eris-ui-preset')],
};
