'use client';

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enUS from './locale/en-US.json';
import zhCN from './locale/zh-CN.json';
import viVN from './locale/vi-VN.json';

const locales = {
  'en-US': enUS,
  'zh-CN': zhCN,
  'vi-VN': viVN,
};

export type Locale = keyof typeof locales;

export function initLocale(locale: Locale = 'zh-CN') {
  const languages = Object.keys(locales);
  const defaultNS = 'translation';
  i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
      resources: {
        [locale]: {
          translation: locales[locale],
        },
      },
      lng: locale,
      fallbackLng: locale,
      debug: false,
      interpolation: {
        escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        useRawValueToEscape: false,
      },
      returnObjects: false,
      supportedLngs: languages,
      fallbackNS: defaultNS,
      defaultNS,
      ns: defaultNS,
      react: {
        defaultTransParent: 'div', // a valid react element - required before react 16
        // https://react.i18next.com/latest/trans-component#trans-props
        transEmptyNodeValue: '', // what to return for empty Trans
        transSupportBasicHtmlNodes: true, // allow <br/> and simple html elements in translations
        transKeepBasicHtmlNodesFor: ['span', 'a', 'Button', 'Link'], // don't convert to <1></1> if simple react elements
        // Wrap text nodes in a user-specified element.
        // i.e. set it to 'span'. By default, text nodes are not wrapped.
        // Can be used to work around a well-known Google Translate issue with React apps. See: https://github.com/facebook/react/issues/11538
        // (v11.10.0)
        transWrapTextNodes: '',
      },
      contextSeparator: '_::_', // char to split context from key.
      detection: {
        order: ['querystring', 'cookie', 'localStorage', 'htmlTag', 'navigator'],
        caches: ['cookie', 'localStorage'],
      },
    });
}

export default function t(...args: any) {
  return i18next.t(...args);
}
