import type { ReactNode } from 'react';

export interface RadioOption {
  label?: ReactNode;
  labelClassName?: string;
  value: string;
  disabled?: boolean;
  tooltip?: ReactNode;
  optionInfo?: ReactNode;
  className?: string;
  extra?: ReactNode;
  stopPropagationSelector?: string;
  id?: string;
}

export interface RadioGroupProps {
  options?: RadioOption[];
  name?: string;
  defaultValue?: string;
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  direction?: 'horizontal' | 'vertical';
  allowUncheck?: boolean;
  children?: ReactNode;
}

export interface RadioGroupContextProps {
  value?: RadioGroupProps['value'];
  disabled?: boolean;
  name?: RadioGroupProps['name'];
  onChange?: RadioGroupProps['onChange'];
  group?: boolean;
  handleChangeValue?: (value: string) => void;
}
