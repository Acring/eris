'use client';
import { cva } from 'class-variance-authority';
import type { MouseEvent } from 'react';
import React, { useEffect, useRef } from 'react';
import { UnfoldLine12 } from '@xsky/eris-icons';
import { cn, useFocus } from '../../lib/utils';
import { Tooltip, type TooltipProps } from '../Tooltip';
import { ScrollArea } from '../ScrollArea';
import Counter from './Counter';
import useComposing from '@/lib/useComposing';

const TextareaMinHeight = 32;

const TextareaVariants = cva(
  cn(
    'text-body text-text-1 box-border h-[32px] w-full resize-none overflow-hidden rounded border-none px-1 py-[5px] font-sans outline-none transition bg-transparent',
    'placeholder:text-body placeholder:text-text-4 placeholder:font-normal',
    'disabled:bg-grey-50 disabled:text-text-4 disabled:placeholder:text-text-4 disabled:cursor-not-allowed',
  ),
);
const TextareaContainerVariants = cva(
  cn(
    'max-w-full bg-fill-white group relative box-border flex min-h-[34px] flex-col items-start ',
    'rounded border border-solid  outline-none transition',
    'text-[0px] leading-none',
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
        false: cn(''),
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
export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange' | 'onResize'> {
  error?: boolean;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  onChange?: (value: string, e: React.ChangeEvent<HTMLTextAreaElement> | null) => void;
  maxCount?: number;
  tooltip?: React.ReactNode;
  tooltipProps?: TooltipProps;
  onResize?: (width: number, height: number) => void;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      value,
      defaultValue,
      onChange,
      error = false,
      onFocus,
      onBlur,
      disabled = false,
      maxCount,
      tooltip,
      tooltipProps,
      onResize,
      onCompositionEnd,
      onCompositionStart,
      style,
      ...props
    },
    ref,
  ) => {
    const [innerValue, setInnerValue] = React.useState(() => {
      return value !== undefined ? value : (defaultValue ?? '');
    });
    const { focused, onBlur: onInnerBlur, onFocus: onInnerFocus } = useFocus();
    const hasTooltip = tooltip !== undefined;

    const { isComposing, ...composingProps } = useComposing({
      onCompositionEnd: (e) => {
        onCompositionEnd?.(e);
        handleChange(e as unknown as React.ChangeEvent<HTMLTextAreaElement>);
      },
      onCompositionStart: (e) => {
        onCompositionStart?.(e);
      },
    });

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const textareaContainerRef = useRef<HTMLDivElement>(null);

    const curValue = React.useMemo(() => {
      if (isComposing.current) {
        return innerValue;
      }
      return value ?? innerValue;
    }, [innerValue, isComposing, value]);

    // 根据 curValue 计算高度
    useEffect(() => {
      if (textareaRef.current) {
        const textarea = textareaRef.current;
        textarea.style.height = '0';
        textarea.style.height = `${textarea.scrollHeight}px`;

        // 计算 textarea container 高度，保证滚动条会显示
        if (textareaContainerRef.current) {
          const textareaContainer = textareaContainerRef.current;
          textareaContainer.style.height = '0';

          // 22 为 Counter 的高度，8 为 Counter 的 margin-bottom
          if (maxCount) {
            textareaContainer.style.height = `${textarea.scrollHeight + 2 + 22 + 8}px`;
          } else {
            // 2 为 textarea 的 border
            textareaContainer.style.height = `${textarea.scrollHeight + 2}px`;
          }
        }
      }
    }, [curValue, maxCount]);

    const handleMouseDown = React.useCallback(
      (e: MouseEvent<HTMLDivElement>) => {
        const textarea = textareaContainerRef.current;
        if (!textarea || disabled) return;
        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = textarea.offsetWidth;
        const startHeight = textarea.offsetHeight;

        const doDrag = (e: any) => {
          textarea.style.width = `${startWidth + e.clientX - startX}px`;
          if (maxCount) {
            textarea.style.height = `${Math.max(
              startHeight + e.clientY - startY,
              TextareaMinHeight + 2 + 22 + 8, // 22 为 Counter 的高度，8 为 Counter 的 margin-bottom , 2 为 textarea 的 border
            )}px`;
          } else {
            textarea.style.height = `${Math.max(
              startHeight + e.clientY - startY,
              TextareaMinHeight + 2, // 2 为 textarea 的 border
            )}px`;
          }
          onResize?.(startWidth + e.clientX - startX, startHeight + e.clientY - startY);
        };

        const stopDrag = () => {
          document.documentElement.removeEventListener('mousemove', doDrag, false);
          document.documentElement.removeEventListener('mouseup', stopDrag, false);
        };

        document.documentElement.addEventListener('mousemove', doDrag, false);
        document.documentElement.addEventListener('mouseup', stopDrag, false);
      },
      [disabled, maxCount, onResize],
    );

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (value === undefined) {
          setInnerValue(e.target.value);
        }
        if (!isComposing.current) {
          onChange?.(e.target.value, e);
        } else {
          setInnerValue(e.target.value);
        }
      },
      [isComposing, onChange, value],
    );

    const handleFocus = React.useCallback(
      (e: React.FocusEvent<HTMLTextAreaElement>) => {
        onInnerFocus();
        onFocus?.(e);
      },
      [onFocus, onInnerFocus],
    );

    const handleBlur = React.useCallback(
      (e: React.FocusEvent<HTMLTextAreaElement>) => {
        onInnerBlur();
        onBlur?.(e);
      },
      [onBlur, onInnerBlur],
    );

    const main = React.useMemo(() => {
      return (
        <div
          className={cn(
            TextareaContainerVariants({
              className: tooltip ? '' : className,
              hasTooltip,
              error,
              focused,
              disabled,
            }),
          )}
          onClick={() => {
            !focused && textareaRef.current?.focus();
          }}
          ref={textareaContainerRef}
          style={style}
        >
          <ScrollArea className="flex-1" width="100%">
            <textarea
              className={TextareaVariants({})}
              disabled={disabled}
              ref={(e: HTMLTextAreaElement | null) => {
                if (typeof ref === 'function') {
                  ref(e);
                } else if (ref) {
                  ref.current = e;
                }
                (textareaRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = e;
              }}
              {...props}
              {...composingProps}
              onBlur={handleBlur}
              onChange={handleChange}
              onFocus={handleFocus}
              value={curValue}
            />
          </ScrollArea>
          {Boolean(maxCount) && (
            <div className="box-border flex w-full justify-end pb-1 pr-1">
              <Counter
                className={cn('', {
                  'text-danger-normal': error,
                  'text-text-4': disabled,
                })}
                maxCount={maxCount}
                value={curValue}
              />
            </div>
          )}
          <div
            className={cn(
              'text-icon-outlined-displayed absolute bottom-0 right-0 flex cursor-se-resize',
            )}
            onMouseDown={handleMouseDown}
          >
            <UnfoldLine12 />
          </div>
        </div>
      );
    }, [
      className,
      composingProps,
      disabled,
      error,
      focused,
      handleBlur,
      handleChange,
      handleFocus,
      handleMouseDown,
      hasTooltip,
      curValue,
      maxCount,
      props,
      ref,
      tooltip,
      style,
    ]);

    if (tooltip !== undefined) {
      return (
        <Tooltip title={tooltip} {...tooltipProps}>
          <div className={cn('flex', className)}>{main}</div>
        </Tooltip>
      );
    }

    return main;
  },
);

Textarea.displayName = 'Textarea';

export default Textarea;
