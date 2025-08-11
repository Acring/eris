'use client';
import { cva } from 'class-variance-authority';
import React, { useEffect, useMemo, useRef } from 'react';
import { EyeCloseLine16, EyeOpenLine16 } from '@xsky/eris-icons';
import { Tooltip, type TooltipProps } from '../Tooltip';
import { cn, useFocus } from '../../lib/utils';
import IconButton from '../IconButton/IconButton';

const PasswordInputVariants = cva(
  cn(
    'text-body text-text-1 flex-1 border-none p-0 font-sans outline-none transition',
    'placeholder:text-body placeholder:text-text-4 placeholder:font-normal',
    'disabled:bg-grey-50 disabled:text-text-4 disabled:placeholder:text-text-4 disabled:cursor-not-allowed',
  ),
);
const PasswordInputContainerVariants = cva(
  cn(
    'bg-fill-white group relative box-border inline-flex h-[34px] items-center rounded border border-solid px-1 outline-none transition',
  ),
  {
    variants: {
      error: {
        true: '',
        false: '',
      },
      focused: {
        true: '',
        false: '',
      },
      disabled: {
        true: cn('border-stroke-border-2 bg-grey-50 select-none'),
        false: '',
      },
      hasTooltip: {
        true: cn('w-full'),
        false: '',
      },
    },
    compoundVariants: [
      {
        focused: true,
        error: false,
        className: cn('border-primary-hover shadow-interactive-primary-focus'),
      },
      {
        focused: true,
        error: true,
        className: cn('border-danger-hover shadow-interactive-danger-active'),
      },
      {
        focused: false,
        error: false,
        className: cn('border-stroke-border-2'),
      },
      {
        disabled: false,
        error: false,
        className: cn('component-ring-primary component-border-primary'),
      },
      {
        disabled: false,
        error: true,
        className: cn('component-ring-danger component-border-danger border-danger-normal'),
      },
    ],
  },
);

export interface PasswordInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'disabled'> {
  error?: boolean;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, e: React.ChangeEvent<HTMLInputElement> | null) => void;
  disabled?: boolean;
  tooltip?: React.ReactNode;
  tooltipProps?: Omit<TooltipProps, 'children' | 'title'>;
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
}

const Password = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      className,
      error = false,
      value,
      defaultValue,
      onChange,
      disabled = false,
      tooltip,
      tooltipProps,
      onBlur,
      onFocus,
      visible,
      onVisibleChange,
      ...props
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const { focused, onBlur: onInnerBlur, onFocus: onInnerFocus } = useFocus();

    const [innerValue, setInnerValue] = React.useState(() => {
      return value !== undefined ? value : (defaultValue ?? '');
    });

    const [innerVisible, setInnerVisible] = React.useState(() => {
      return visible !== undefined ? visible : false;
    });

    const curValue = value ?? innerValue;

    useEffect(() => {
      if (visible !== undefined) {
        setInnerVisible(visible);
      }
    }, [visible]);

    const hasTooltip = tooltip !== undefined;

    const handleFocus = React.useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        onInnerFocus();
        onFocus?.(e);
      },
      [onFocus, onInnerFocus],
    );

    const handleBlur = React.useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        onInnerBlur();
        onBlur?.(e);
      },
      [onBlur, onInnerBlur],
    );

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (value === undefined) {
          setInnerValue(e.target.value);
        }
        onChange?.(e.target.value, e);
      },
      [onChange, value],
    );

    const handleVisible = React.useCallback(() => {
      if (!inputRef.current) {
        return;
      }
      if (visible === undefined) {
        setInnerVisible(!innerVisible);
      }
      onVisibleChange?.(!innerVisible);
      inputRef.current.focus();
    }, [innerVisible, onVisibleChange, visible]);

    const main = useMemo(() => {
      return (
        <div
          className={PasswordInputContainerVariants({
            className: tooltip ? '' : className,
            hasTooltip,
            error,
            focused,
            disabled,
          })}
          onClick={() => {
            !focused && inputRef.current?.focus();
          }}
        >
          <input
            className={PasswordInputVariants({})}
            disabled={disabled}
            ref={(e: HTMLInputElement | null) => {
              if (typeof ref === 'function') {
                ref(e);
              } else if (ref) {
                ref.current = e;
              }
              (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = e;
            }}
            type={innerVisible ? 'text' : 'password'}
            value={curValue}
            {...props}
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
          />
          <div
            className={cn('text-icon-outlined-displayed flex pl-1', {
              'text-text-4': disabled,
            })}
            onClick={handleVisible}
            onMouseDown={(e) => {
              e.preventDefault();
            }}
            onMouseUp={(e) => {
              e.preventDefault();
            }}
          >
            {innerVisible ? (
              <IconButton
                className={cn({
                  'text-icon-status-outlined-disable': disabled,
                })}
                disabled={disabled}
              >
                <EyeOpenLine16 />
              </IconButton>
            ) : (
              <IconButton
                className={cn({
                  'text-icon-status-outlined-disable': disabled,
                })}
                disabled={disabled}
              >
                <EyeCloseLine16 />
              </IconButton>
            )}
          </div>
        </div>
      );
    }, [
      className,
      disabled,
      error,
      focused,
      handleBlur,
      handleChange,
      handleFocus,
      handleVisible,
      hasTooltip,
      curValue,
      props,
      ref,
      tooltip,
      innerVisible,
    ]);

    if (tooltip !== undefined) {
      return (
        <Tooltip title={tooltip} {...tooltipProps}>
          <div className={cn('inline-flex', className)}>{main}</div>
        </Tooltip>
      );
    }

    return main;
  },
);

Password.displayName = 'Password';

export default Password;
