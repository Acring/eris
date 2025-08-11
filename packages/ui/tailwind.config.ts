import type { Config } from 'tailwindcss';

// 只是方便开发时的自动补全，不会影响编译结果
const config: Config = {
  content: ['./components/**/*.{js,ts,jsx,tsx,mdx}'],
  plugins: [],
  presets: [require('@xsky/eris-ui-preset')],
};
export default config;
