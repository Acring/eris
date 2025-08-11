import React from 'react';
import { withThemeByClassName } from '@storybook/addon-themes';
import type { Preview } from '@storybook/react';
import { ConfigProvider } from '@xsky/eris-ui';
import './storybook.css';
import theme from './theme';

const preview: Preview = {
  globalTypes: {
    locale: {
      description: 'Internationalization locale',
      defaultValue: 'zh-CN',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'en-US', right: '🇺🇸', title: 'English' },
          { value: 'zh-CN', right: '🇨🇳', title: '简体中文' },
          { value: 'vi-VN', right: '🇻🇳', title: 'Tiếng Việt' },
        ],
      },
    },
  },

  parameters: {
    doc: {
      theme: theme,
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: 'white',
        },
        {
          name: 'grey',
          value: '#eff1f9',
        },
        {
          name: 'dark',
          value: '#1c1c1c',
        },
      ],
    },
    // actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },

  decorators: [
    withThemeByClassName({
      themes: {
        light: '',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
    // eris 全局设置
    (Story, context) => {
      const { locale } = context.globals;

      return (
        <ConfigProvider locale={locale}>
          <Story />
        </ConfigProvider>
      );
    },
  ],

  tags: ['autodocs'],
};

export default preview;
