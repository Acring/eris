'use client';
import { createContext } from 'react';
import type { Locale } from '.';

export interface LocaleContextProps {
  locale: Locale;
}

const LocaleContext = createContext<LocaleContextProps | null>(null);

export default LocaleContext;
