/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './mdx-components.tsx',
    '../../node_modules/@xsky/eris-ui/components/**/*.{js,ts,jsx,tsx,mdx}',
    '../../node_modules/@xsky/eris-ui/charts/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class', '[data-mode="dark"]'],
  plugins: [],
  presets: [require('@xsky/eris-ui-preset')],
};
