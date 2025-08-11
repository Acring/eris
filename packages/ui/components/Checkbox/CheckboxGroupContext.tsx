import { createContext } from 'react';
import type { CheckboxGroupContextProps, valueType } from './type';

const defaultContextValue: CheckboxGroupContextProps<valueType> = {};

export const CheckboxGroupContext =
  createContext<CheckboxGroupContextProps<valueType>>(defaultContextValue);
