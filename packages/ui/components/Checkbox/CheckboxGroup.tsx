'use client';
import type { ForwardedRef } from 'react';
import React, { useState, forwardRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Checkbox from './Checkbox';
import { CheckboxGroupContext } from './CheckboxGroupContext';
import type {
  CheckboxGroupProps,
  CheckboxOption,
  valueType,
  CheckboxGroupContextProps,
} from './type';

const CheckboxGroup = <T extends valueType = string>(
  {
    disabled,
    name,
    options = [],
    value,
    defaultValue,
    onChange,
    direction = 'horizontal',
    children,
  }: CheckboxGroupProps<T>,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  const [selectedValues, setSelectedValues] = useState<T[]>(defaultValue || []);
  const isVertical = direction === 'vertical';

  useEffect(() => {
    if (value !== undefined) {
      setSelectedValues(value || []);
    }
  }, [value]);

  const getOptionObject = (option: T | CheckboxOption<T>): CheckboxOption<T> => {
    if (typeof option === 'object') {
      return option;
    }
    return { label: String(option), value: option };
  };

  const checkboxOptions = options.map((option) => getOptionObject(option));

  const handleChangeValue = (value: T) => {
    if (selectedValues.includes(value)) {
      const updatedValues = selectedValues.filter((v) => v !== value);
      setSelectedValues(updatedValues);
      if (onChange) {
        onChange(updatedValues);
      }
    } else {
      const updatedValues = [...selectedValues, value];
      setSelectedValues(updatedValues);
      if (onChange) {
        onChange(updatedValues);
      }
    }
  };
  const contextProp: CheckboxGroupContextProps<T> = {
    value: selectedValues,
    disabled,
    name,
    group: true,
    handleChangeValue,
  };

  // React 的 Context.Provider 并不支持范型参数，所以这里需要断言
  return (
    <CheckboxGroupContext.Provider value={contextProp as CheckboxGroupContextProps<valueType>}>
      <div className={cn('flex', { 'flex-col': isVertical })} ref={ref}>
        {children
          ? children
          : checkboxOptions.map((option, index) => (
              <Checkbox
                {...option}
                checked={selectedValues.includes(option.value)}
                className={cn({
                  'mr-2': !isVertical && index < options.length - 1,
                  'mb-1': isVertical && index < options.length - 1 && !option.extra,
                })}
                disabled={option.disabled || disabled}
                key={option.value}
                name={name}
                tooltip={option.tooltip}
              />
            ))}
      </div>
    </CheckboxGroupContext.Provider>
  );
};

CheckboxGroup.displayName = 'CheckboxGroup';

export default forwardRef(CheckboxGroup) as <T extends valueType = string>(
  props: CheckboxGroupProps<T> & { ref?: ForwardedRef<HTMLDivElement> },
) => React.ReactElement;
