'use client';
import * as React from 'react';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { useRef } from 'react';
import { cn, useFocus, useFitContentWidth } from '../../lib/utils';
import { Tooltip, type TooltipProps } from '../Tooltip';
import Counter from './Counter';
import Clear from './Clear';
import Textarea from './Textarea';
import Password from './Password';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange' | 'disabled'>,
    VariantProps<typeof InputContainerVariants>,
    VariantProps<typeof InputVariants> {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, e: React.ChangeEvent<HTMLInputElement> | null) => void;
  onCompositionStart?: (e: React.CompositionEvent<HTMLInputElement>) => void;
  onCompositionEnd?: (e: React.CompositionEvent<HTMLInputElement>) => void;
  disableComposition?: boolean;
  allowClear?: boolean;
  disabled?: boolean;
  tooltip?: React.ReactNode;
  tooltipProps?: Omit<TooltipProps, 'children' | 'title'>;
  maxCount?: number;
  endAdornment?: React.ReactNode;
  startAdornment?: React.ReactNode;
}

export const InputVariants = cva(
  cn(
    'text-body text-text-1 min-w-[30px] flex-1 border-none p-0 font-sans outline-none transition bg-transparent',
    'placeholder:text-body placeholder:text-text-4 placeholder:font-normal',
    'disabled:text-text-4 disabled:placeholder:text-text-4 disabled:cursor-not-allowed',
  ),
  {
    variants: {
      size: {
        sm: cn('text-caption'),
        md: cn('text-body'),
        lg: cn('text-body'),
      },
    },
  },
);
export const InputContainerVariants = cva(
  cn(
    'bg-form-bg-normal group relative box-border inline-flex items-center rounded border border-solid outline-none transition',
  ),
  {
    variants: {
      size: {
        sm: cn('px-1 py-[2px]'),
        md: cn('h-[34px] px-1'),
        lg: cn('px-1 py-[10px]'),
      },
      error: {
        true: '',
        false: '',
      },
      focused: {
        true: '',
        false: '',
      },
      disabled: {
        true: cn('border-form-border-default-disable bg-form-bg-disable select-none'),
        false: '',
      },
      fitContent: {
        true: cn('w-[fit-content]'),
        false: cn('w-full'),
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
        className: cn('border-form-border-default-hover shadow-interactive-primary-focus'),
      },
      {
        focused: true,
        error: true,
        className: cn('border-form-border-danger-hover shadow-interactive-danger-active'),
      },
      {
        focused: false,
        error: false,
        className: cn('border-form-border-default-normal'),
      },
      {
        disabled: false,
        error: false,
        className: cn('component-ring-primary component-border-primary'),
      },
      {
        disabled: false,
        error: true,
        className: cn(
          'component-ring-danger component-border-danger border-form-border-danger-normal',
        ),
      },
    ],
  },
);
interface InputWithStatics
  extends React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>,
    Omit<VariantProps<typeof InputContainerVariants>, 'isFocus'> {
  Textarea: typeof Textarea;
  Password: typeof Password;
}

/**
 * Owner: 刘圳
 *
 * Figma: https://www.figma.com/file/Do849NlMKTXCv8djOFIFWA/%E9%80%9A%E7%94%A8%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?type=design&node-id=11723-60140&mode=design
 *
 * 输入框组件
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      value,
      defaultValue,
      size = 'md',
      error = false,
      onFocus,
      onBlur,
      onChange,
      allowClear = false,
      disabled = false,
      tooltip,
      tooltipProps,
      maxCount,
      endAdornment,
      fitContent = false,
      onCompositionStart,
      onCompositionEnd,
      disableComposition = false,
      startAdornment,
      ...props
    },
    ref,
  ) => {
    const [innerValue, setInnerValue] = React.useState(() => {
      return value !== undefined ? value : (defaultValue ?? '');
    });
    const inputRef = useRef<HTMLInputElement>(null);
    // 处理输入法
    const isComposing = useRef<boolean>(false);

    const { focused, onBlur: onInnerBlur, onFocus: onInnerFocus } = useFocus();
    const hasTooltip = Boolean(tooltip);

    const contentWidth = useFitContentWidth({
      label: innerValue,
      fontSize: inputRef.current ? parseInt(getComputedStyle(inputRef.current).fontSize) : 0,
      fontWeight: inputRef.current ? parseInt(getComputedStyle(inputRef.current).fontWeight) : 0,
    });

    const curValue = React.useMemo(() => {
      if (isComposing.current) {
        return innerValue;
      }
      return value ?? innerValue;
    }, [innerValue, value]);

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
        if (!isComposing.current) {
          onChange?.(e.target.value, e);
        } else {
          setInnerValue(e.target.value);
        }
      },
      [onChange, value],
    );

    const handleClear = React.useCallback(() => {
      setInnerValue('');
      onChange?.('', null);
    }, [onChange]);

    const handleComposition = React.useCallback(
      (e: React.CompositionEvent<HTMLInputElement>) => {
        if (disableComposition) return;
        if (e.type === 'compositionend') {
          isComposing.current = false;
          onCompositionEnd?.(e);
          handleChange(e as unknown as React.ChangeEvent<HTMLInputElement>);
        } else {
          isComposing.current = true;
          onCompositionStart?.(e);
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [handleChange],
    );

    const input = React.useMemo(() => {
      return (
        <input
          className={InputVariants({})}
          data-testid="Input-input"
          disabled={disabled}
          onBlur={handleBlur}
          onChange={handleChange}
          onCompositionEnd={handleComposition}
          onCompositionStart={handleComposition}
          onFocus={handleFocus}
          ref={(e: HTMLInputElement | null) => {
            if (typeof ref === 'function') {
              ref(e);
            } else if (ref) {
              ref.current = e;
            }
            (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = e;
          }}
          style={{
            width: fitContent ? contentWidth : undefined,
          }}
          value={curValue}
          {...props}
        />
      );
    }, [
      contentWidth,
      curValue,
      disabled,
      fitContent,
      handleBlur,
      handleChange,
      handleComposition,
      handleFocus,
      props,
      ref,
    ]);

    const clear = React.useMemo(() => {
      return (
        allowClear && (
          <Clear
            className={cn('ml-1', 'hover:opacity-100', 'opacity-0', {
              'opacity-1': focused,
              'opacity-0 hover:opacity-0': !curValue?.length || disabled,
              'group-hover:opacity-100': curValue?.length && !disabled,
            })}
            data-testid="Input-clear"
            onClear={handleClear}
          />
        )
      );
    }, [allowClear, disabled, focused, handleClear, curValue?.length]);

    const maxCountRender = React.useMemo(() => {
      return (
        Boolean(maxCount) && (
          <Counter
            className={cn('pl-1', {
              'text-danger-normal': error,
              'text-text-4': disabled,
            })}
            maxCount={maxCount}
            value={curValue}
          />
        )
      );
    }, [curValue, disabled, error, maxCount]);

    const main = React.useMemo(() => {
      return (
        <div
          className={cn(
            InputContainerVariants({
              className: tooltip ? '' : className,
              hasTooltip,
              size,
              error,
              focused,
              disabled,
              fitContent,
            }),
          )}
          data-testid="Input-root"
          onClick={() => {
            !focused && inputRef.current?.focus();
          }}
        >
          {startAdornment ? <div className="pr-1">{startAdornment}</div> : null}
          {input}
          {clear}
          {maxCountRender}
          {endAdornment ? <div className="pl-1">{endAdornment}</div> : null}
        </div>
      );
    }, [
      className,
      clear,
      disabled,
      endAdornment,
      startAdornment,
      error,
      fitContent,
      focused,
      hasTooltip,
      input,
      maxCountRender,
      size,
      tooltip,
    ]);

    if (tooltip !== undefined) {
      return (
        <Tooltip title={tooltip} {...tooltipProps}>
          <div className={cn(fitContent ? 'w-[fit-content]' : 'w-full', className)}>{main}</div>
        </Tooltip>
      );
    }

    return main;
  },
) as InputWithStatics;

Input.displayName = 'Input';

Input.Textarea = Textarea;
Input.Password = Password;
export default Input;
