'use client';
import type { HTMLAttributes } from 'react';
import React, { forwardRef, useState } from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cn } from '../../lib/utils';
import { RadioItem } from './Radio';
import { RadioGroupContext } from './RadioGroupContext';
import type { RadioOption } from './type';

export interface RadioGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'dir'> {
  options?: RadioOption[];
  name?: string;
  defaultValue?: string;
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  direction?: 'horizontal' | 'vertical';
  allowUncheck?: boolean;
}

/**
 * Owner: zhang.huan@xsky.com
 *
 * 单选框组
 */
const RadioGroup: React.FC<RadioGroupProps> = forwardRef<HTMLInputElement, RadioGroupProps>(
  (
    {
      defaultValue,
      value,
      className,
      disabled = false,
      onChange,
      options = [],
      direction = 'horizontal',
      allowUncheck = false,
      children,
      ...rest
    },
    ref,
  ) => {
    const [selectedValue, setSelectedValue] = useState<string>(defaultValue || '');
    const isVertical = direction === 'vertical';
    const isUnControlled = value === undefined;
    const valueResult = isUnControlled ? selectedValue : value;

    const getOptionObject = (option: string | RadioOption): RadioOption => {
      if (typeof option === 'object') {
        return option;
      }
      return { label: String(option), value: option };
    };

    const radioOptions = options.map((option) => getOptionObject(option));

    const handleChange = (newValue: string) => {
      if (allowUncheck && newValue === selectedValue) {
        if (isUnControlled) {
          setSelectedValue('');
        }
        onChange?.('');
      } else if (newValue !== selectedValue) {
        if (isUnControlled) {
          setSelectedValue(newValue);
        }
        onChange?.(newValue);
      }
    };

    const contextProp = {
      value: valueResult,
      disabled,
      name: rest.name,
      onChange,
      group: true,
      handleChangeValue: handleChange,
    };

    return (
      <RadioGroupContext.Provider value={contextProp}>
        <RadioGroupPrimitive.Root
          className={cn(
            'flex [&>button]:hidden gap-2',
            { 'flex-col gap-1': isVertical },
            className,
          )}
          ref={ref}
          {...rest}
        >
          {children
            ? children
            : radioOptions.map((option) => (
                <RadioItem
                  key={option.value}
                  {...option}
                  checked={option.value === selectedValue}
                  disabled={disabled || option.disabled}
                  tooltip={option.tooltip}
                />
              ))}
        </RadioGroupPrimitive.Root>
      </RadioGroupContext.Provider>
    );
  },
);

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;
