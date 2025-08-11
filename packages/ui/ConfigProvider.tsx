'use client';
import React from 'react';
import type { Locale } from './i18n';
import { initLocale } from './i18n';

export interface ConfigProviderProps {
  spinnerIndicator?: SpinnerContextType;
  locale?: Locale;
  themeColor?: string;
  children?: React.ReactNode;
}

interface SpinnerContextType {
  default?: {
    sm?: React.ReactNode;
    md?: React.ReactNode;
    lg?: React.ReactNode;
  };
  white?: {
    sm?: React.ReactNode;
    md?: React.ReactNode;
    lg?: React.ReactNode;
  };
  danger?: {
    sm?: React.ReactNode;
    md?: React.ReactNode;
    lg?: React.ReactNode;
  };
}

interface ConfigContextType {
  locale?: Locale;
  spinnerIndicator?: SpinnerContextType;
  themeColor?: string;
}

export const ConfigContext = React.createContext<ConfigContextType | null>(null);

const ConfigProvider: React.FC<ConfigProviderProps> = ({
  locale,
  children,
  spinnerIndicator,
  themeColor,
}) => {
  const outerConfig = useConfigProvider();

  const config = React.useMemo(() => {
    const localeConfig = {
      locale: locale || 'zh-CN',
      spinnerIndicator: spinnerIndicator || {},
      themeColor: themeColor || '',
    };
    const output = outerConfig === null ? { ...localeConfig } : { ...outerConfig, ...localeConfig };

    // 初始化i18n
    if (output.locale) {
      initLocale(output.locale);
    }

    return output;
  }, [locale, spinnerIndicator, themeColor, outerConfig]);

  return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>;
};

export function useConfigProvider() {
  const config = React.useContext(ConfigContext);
  return config;
}

export default ConfigProvider;
