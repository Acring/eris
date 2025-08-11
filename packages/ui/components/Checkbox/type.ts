import type { ReactNode, HTMLAttributes } from 'react';

export type valueType = string | number;

export interface CheckboxOption<T extends valueType = valueType> {
  label: string;
  value: T;
  disabled?: boolean;
  tooltip?: ReactNode;
  extra?: React.ReactNode;
  stopPropagationSelector?: string;
  optionInfo?: ReactNode;
}

export interface CheckboxProps<T extends valueType = valueType>
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'children'> {
  className?: string;
  children?: ReactNode | ((value: { checked: boolean }) => ReactNode);
  checked?: boolean;
  value?: T;
  label?: ReactNode;
  defaultChecked?: boolean;
  disabled?: boolean;
  name?: string;
  onChange?: (checked: boolean) => void;
  indeterminate?: boolean;
  tooltip?: ReactNode;
  optionInfo?: ReactNode;
  extra?: ReactNode;
  stopPropagationSelector?: string;
}

export interface CheckboxGroupProps<T extends valueType = valueType>
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'dir' | 'defaultValue'> {
  disabled?: boolean;
  name?: string;
  options?: (T | CheckboxOption<T>)[];
  value?: T[];
  defaultValue?: T[];
  onChange?: (value: T[]) => void;
  direction?: 'horizontal' | 'vertical';
}

export interface CheckboxGroupContextProps<T extends valueType> {
  value?: CheckboxGroupProps['value'];
  disabled?: boolean;
  name?: CheckboxGroupProps['name'];
  group?: boolean;
  handleChangeValue?: (value: T) => void;
}
