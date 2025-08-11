'use client';
import type { HTMLAttributes, ChangeEvent } from 'react';
import { Big } from 'big.js';
import React, { useMemo, useEffect, useState, useCallback, useRef } from 'react';
import { isNull } from 'lodash';
import { UpLine12, DownLine12 } from '@xsky/eris-icons';
import { cn, useFitContentWidth, useFocus } from '../../lib/utils';
import { InputContainerVariants, InputVariants } from '../Input/Input';
import { Tooltip } from '../Tooltip';
import { IconButton } from '../IconButton';

export interface InputNumberProps
  extends Omit<
    HTMLAttributes<HTMLInputElement>,
    'type' | 'onChange' | 'onBlur' | 'value' | 'defaultValue' | 'required'
  > {
  disableDecimal?: boolean;
  value?: number | null;
  defaultValue?: number | null;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (
    val: number | undefined | null,
    e?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>, val: number | undefined | null) => void;
  onStep?: (val: number, info: { offset: number; type: 'up' | 'down' }) => void;
  max?: number;
  maxTooltip?: React.ReactNode;
  min?: number;
  minTooltip?: React.ReactNode;
  step?: number;
  size?: 'sm' | 'md' | 'lg';
  error?: boolean;
  fitContent?: boolean;
  tooltip?: React.ReactNode;
  endAdornment?: React.ReactNode;
  startAdornment?: React.ReactNode;
  hideControl?: boolean;
  required?: boolean;
}

/**
 * Owner: 樊梦文
 *
 * Figma: https://www.figma.com/file/Do849NlMKTXCv8djOFIFWA/%E9%80%9A%E7%94%A8%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?type=design&node-id=11723-60156&mode=design
 *
 * 输入框组件，用于输入数字。
 */
const InputNumber = React.forwardRef<HTMLInputElement, InputNumberProps>(
  (
    {
      disableDecimal,
      value,
      defaultValue,
      placeholder,
      disabled = false,
      onChange,
      onFocus,
      error = false,
      size = 'md',
      max,
      maxTooltip,
      min,
      minTooltip,
      step = 1,
      fitContent = false,
      className,
      tooltip,
      onStep,
      startAdornment,
      endAdornment,
      hideControl,
      onBlur,
      required = false,
      ...props
    },
    ref,
  ) => {
    const [inputValue, setInputValue] = useState(value || defaultValue || '');
    const divRef = useRef<HTMLDivElement>(null);

    const { focused, onBlur: onInnerBlur, onFocus: onInnerFocus } = useFocus();

    const inputRef = React.useRef<HTMLInputElement>(null);

    const contentWidth = useFitContentWidth({
      label: inputValue.toString(),
      fontSize: inputRef.current ? parseInt(getComputedStyle(inputRef.current).fontSize) : 0,
      fontWeight: inputRef.current ? parseInt(getComputedStyle(inputRef.current).fontWeight) : 0,
    });

    const isInvalid = useCallback((val: string | number) => {
      const strValue = String(val).trim();

      // 检查是否为空字符串或 null/undefined
      if (strValue === '' || val === null || val === undefined) {
        return true;
      }

      const numValue = Number(strValue);

      // 检查转换后的值是否为 NaN
      return Number.isNaN(numValue);
    }, []);

    const upDisabled = useMemo(() => {
      return (
        disabled ||
        (!isInvalid(inputValue) && typeof max === 'number' && parseFloat(`${inputValue}`) >= max)
      );
    }, [max, disabled, inputValue, isInvalid]);

    const downDisabled = useMemo(() => {
      return (
        disabled ||
        (!isInvalid(inputValue) && typeof min === 'number' && parseFloat(`${inputValue}`) <= min)
      );
    }, [min, disabled, inputValue, isInvalid]);

    // 最大值最小值变化时，如果当前值超出范围，需要重新设置
    useEffect(() => {
      if (value === undefined) {
        return;
      }
      if (value === null) {
        setInputValue('');
        return;
      }
      // 如果是点击加减按钮或键盘上下键，触发
      setInputValue(value ?? '');

      // 如果当前焦点在 input 上，不触发事件
      if (document.activeElement === inputRef.current) {
        return;
      }

      const parsedValue = parseFloat(`${value}`);
      if (typeof max === 'number' && parsedValue > max) {
        setInputValue(max);
        onChange?.(max);
      } else if (typeof min === 'number' && parsedValue < min) {
        setInputValue(min);
        onChange?.(min);
      }
    }, [value, max, min]);

    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value;
        if (disableDecimal) {
          val = val.replace(/[^\d]/g, '');
        } else {
          val = val.replace(/[^0-9.-]/g, '').replace(/(\..*?)\..*/g, '$1');
        }
        setInputValue(val);
      },
      [disableDecimal],
    );

    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        const relatedTarget = e.relatedTarget as Node | null;
        // 如果焦点在加减按钮，不触发 blur 事件
        if (divRef.current && divRef.current.contains(relatedTarget)) {
          return;
        }
        onInnerBlur();
        const numValue = inputValue ? parseFloat(`${inputValue}`) : null;

        if (isNull(numValue)) {
          if (required) {
            const defaultValue = typeof min === 'number' ? min : 0;
            setInputValue(defaultValue.toString());
            onChange?.(defaultValue);
            onBlur?.(e, defaultValue);
            return;
          }
          onBlur?.(e, numValue);
          return;
        }

        if (typeof max === 'number' && numValue > max) {
          setInputValue(max.toString());
          onChange?.(max);
          onBlur?.(e, max);
          return;
        }
        if (typeof min === 'number' && numValue < min) {
          setInputValue(min.toString());
          onChange?.(min);
          onBlur?.(e, min);
          return;
        }

        setInputValue(numValue);
        onChange?.(numValue);
        onBlur?.(e, numValue);
      },
      [inputValue, max, min, onBlur, onChange, onInnerBlur, required],
    );

    const handleFocus = React.useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        onInnerFocus();
        onFocus?.(e);
      },
      [onFocus, onInnerFocus],
    );

    const getNextValue = React.useCallback(
      (up?: boolean) => {
        if (!isInvalid(inputValue)) {
          let newValue;
          newValue = up ? new Big(inputValue).plus(step) : new Big(inputValue).minus(step);
          if (disableDecimal) {
            newValue = newValue.round();
          }
          // step 完的值超出最大值，返回最大值
          if (typeof max === 'number' && newValue.gt(max)) {
            return max;
          }
          // step 完的值小于最小值，返回最小值
          if (typeof min === 'number' && newValue.lt(min)) {
            return min;
          }

          return Number(newValue.toString());
        }
        // 默认从最小值、最大值开始增减数值
        return up ? min : max;
      },
      [disableDecimal, inputValue, isInvalid, max, min, step],
    );

    const handleInternalStep = React.useCallback(
      (up?: boolean) => {
        if ((up && upDisabled) || (!up && downDisabled) || disabled) {
          return;
        }
        let val = getNextValue(up);
        val = typeof val === 'number' ? val : 1;

        setInputValue(val.toString());
        onChange?.(val);
        onStep?.(val, { offset: step, type: up ? 'up' : 'down' });
        if (!inputRef.current) {
          return;
        }
        inputRef?.current.focus();
      },
      [disabled, downDisabled, getNextValue, onChange, onStep, step, upDisabled],
    );

    const handelKeyDown: React.KeyboardEventHandler<HTMLInputElement> = useCallback(
      (event) => {
        const { key } = event;
        if (['Up', 'ArrowUp', 'Down', 'ArrowDown'].includes(key)) {
          event.preventDefault();
          handleInternalStep(key === 'Up' || key === 'ArrowUp');
        }
        if (key === 'Backspace') {
          setTimeout(() => {
            const value = inputRef?.current?.value || '';
            const isValid = !isInvalid(value);

            onChange?.(isValid ? parseFloat(value) : null);
          }, 0);
        }
      },
      [handleInternalStep, isInvalid, onChange],
    );

    const UpButton = React.useMemo(() => {
      const upNode = (
        <IconButton
          className={cn('h-[12px] p-0', {
            'active:text-primary-click': !upDisabled,
          })}
          data-testid="InputNumber-up"
          disabled={!!upDisabled}
          onClick={() => {
            handleInternalStep(true);
          }}
        >
          <UpLine12 />
        </IconButton>
      );
      if (maxTooltip !== undefined && upDisabled && inputValue) {
        return <Tooltip title={maxTooltip}>{upNode}</Tooltip>;
      }

      return upNode;
    }, [handleInternalStep, inputValue, maxTooltip, upDisabled]);

    const DownButton = React.useMemo(() => {
      const downNode = (
        <IconButton
          className={cn('h-[12px] p-0', {
            'active:text-primary-click': !downDisabled,
          })}
          data-testid="InputNumber-down"
          disabled={!!downDisabled}
          onClick={() => {
            handleInternalStep();
          }}
        >
          <DownLine12 />
        </IconButton>
      );
      if (minTooltip !== undefined && downDisabled && inputValue) {
        return <Tooltip title={minTooltip}>{downNode}</Tooltip>;
      }

      return downNode;
    }, [handleInternalStep, inputValue, minTooltip, downDisabled]);

    const main = React.useMemo(() => {
      return (
        <div
          className={cn(
            InputContainerVariants({
              size,
              error,
              focused,
              disabled,
              fitContent,
              className,
            }),
          )}
          data-testid="InputNumber-root"
          onClick={() => {
            !focused && inputRef.current?.focus();
          }}
          onKeyDown={handelKeyDown}
        >
          {startAdornment ? (
            <div
              className="pr-[8px]"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {startAdornment}
            </div>
          ) : null}
          <input
            {...props}
            className={cn(InputVariants({ size }), 'min-w-[8px]', {
              'text-center': fitContent,
            })}
            data-testid="InputNumber-input"
            disabled={disabled}
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            placeholder={placeholder}
            ref={(e: HTMLInputElement | null) => {
              if (typeof ref === 'function') {
                ref(e);
              } else if (ref) {
                ref.current = e;
              }
              (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = e;
            }}
            step={step}
            style={{
              width: fitContent ? contentWidth : undefined,
            }}
            type="text"
            value={inputValue}
          />
          {hideControl ? null : (
            <div
              className={cn('pl-[8px]  opacity-0 transition-all duration-200 ease-linear', {
                'group-hover:opacity-100': !disabled,
              })}
              onClick={(e) => {
                e.preventDefault();
              }}
              ref={divRef}
            >
              <div className="flex flex-col">
                {UpButton}
                {DownButton}
              </div>
            </div>
          )}
          {endAdornment ? (
            <div
              className="pl-[4px]"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {endAdornment}
            </div>
          ) : null}
        </div>
      );
    }, [
      size,
      error,
      focused,
      disabled,
      fitContent,
      className,
      handelKeyDown,
      startAdornment,
      props,
      handleBlur,
      handleChange,
      handleFocus,
      placeholder,
      step,
      contentWidth,
      inputValue,
      hideControl,
      UpButton,
      DownButton,
      endAdornment,
      ref,
    ]);
    if (tooltip !== undefined) {
      return (
        <Tooltip title={tooltip}>
          <div className="w-[fit-content]">{main}</div>
        </Tooltip>
      );
    }

    return main;
  },
);

InputNumber.displayName = 'InputNumber';

export default InputNumber;
