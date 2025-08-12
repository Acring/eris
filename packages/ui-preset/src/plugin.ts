import plugin from 'tailwindcss/plugin';
import { theme as themeObj } from './theme/extension/theme';
import custom from './theme/custom/custom';
import { getRootColors, getBodyColors } from './theme/tokens/colors';
import { components } from './theme/custom/components';

export default plugin(
  function medusaUi({ addBase, addComponents, theme }) {
    addComponents(components(theme));

    addBase({
      html: {
        '@apply font-sans text-body text-text-2': {},
      },
      button: {
        '@apply font-sans text-body': {},
      },
    });

    addBase({
      ':root': { ...getRootColors(false) },
      body: { ...getBodyColors(false, theme) },
    });

    addBase({
      '.dark': { ...getRootColors(true), ...getBodyColors(true, theme) },
    });
  },
  {
    theme: {
      extend: {
        ...themeObj.extend,
        ...custom.extend,
      },
    },
  },
);
