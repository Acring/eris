import { createContext } from 'react';
import type { RadioGroupContextProps } from './type';

const defaultContextValue: RadioGroupContextProps = {};

export const RadioGroupContext = createContext<RadioGroupContextProps>(defaultContextValue);
