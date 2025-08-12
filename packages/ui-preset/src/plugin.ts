import plugin from 'tailwindcss/plugin';
import { theme as themeObj } from './theme/extension/theme';
import custom from './theme/custom/custom';
import { getRootColors, getBodyColors } from './theme/tokens/colors';
import { components } from './theme/custom/components';

export default plugin(
  function medusaUi({ addBase, addComponents, config, theme }) {
    const [darkMode, className = '.dark'] = ([] as string[]).concat(config('darkMode', 'media'));

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

    if (darkMode === 'class') {
      addBase({
        [className]: { ...getRootColors(true), ...getBodyColors(true, theme) },
      });
    } else {
      addBase({
        '@media (prefers-color-scheme: dark)': {
          ':root': { ...getRootColors(true) },
          body: { ...getBodyColors(true, theme) },
        },
      });
    }
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
