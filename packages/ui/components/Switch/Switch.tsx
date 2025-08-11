'use client';
import { cva } from 'class-variance-authority';
import React, { useState } from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { cn } from '../../lib/utils';
import { Tooltip } from '../Tooltip';
import type { TooltipProps } from '../Tooltip';

const SwitchRoot = SwitchPrimitive.Root;
const SwitchThumb = SwitchPrimitive.Thumb;

const switchRootVariants = cva(cn('rounded-full border-0 p-0'), {
  variants: {
    checked: { true: '' },
    disabled: {
      true: 'cursor-not-allowed',
      false: 'cursor-pointer',
    },
    size: {
      default: cn('h-[16px] w-[32px]'),
      small: cn('h-[10px] w-[16px]'),
    },
  },
  compoundVariants: [
    {
      checked: true,
      disabled: false,
      className: 'bg-success-normal hover:bg-success-hover active:bg-success-click',
    },
    {
      checked: false,
      disabled: false,
      className: 'bg-offline-normal hover:bg-offline-hover active:bg-offline-click',
    },
    {
      checked: true,
      disabled: true,
      className: 'bg-success-disable',
    },
    {
      checked: false,
      disabled: true,
      className: 'bg-offline-disable',
    },
  ],
});

const switchThumbVariants = cva(
  cn('block rounded-full bg-white transition-all duration-200 ease-in-out'),
  {
    variants: {
      checked: {
        true: '',
      },
      size: {
        default: cn('h-[12px] w-[12px]'),
        small: cn('h-[8px] w-[8px]'),
      },
    },
    compoundVariants: [
      {
        checked: true,
        size: 'default',
        className: 'translate-x-[18px]',
      },
      {
        checked: false,
        size: 'default',
        className: 'translate-x-[2px]',
      },
      {
        checked: true,
        size: 'small',
        className: 'translate-x-[7px]',
      },
      {
        checked: false,
        size: 'small',
        className: 'translate-x-[1px]',
      },
    ],
  },
);

const switchLoadingVariants = cva(cn('z-10 absolute left-[1px]  '), {
  variants: {
    size: {
      default: 'text-[10px] top-[-3.5px]',
      small: 'text-[6px] top-[-6px]',
    },
    checked: {
      false: 'text-offline-normal',
      true: 'text-success-normal',
    },
  },
});

const switchActiveVariants = cva(
  cn(
    'absolute inset-y-0 end-0 start-0 rounded-full bg-white transition-all duration-200 ease-in-out',
  ),
  {
    compoundVariants: [
      {
        checked: true,
        disabled: false,
        className: 'group-active:start-[-30%]',
      },
      {
        checked: false,
        disabled: false,
        className: 'group-active:end-[-30%]',
      },
    ],
    variants: {
      checked: {
        true: '',
        false: '',
      },
      disabled: {
        true: '',
        false: '',
      },
    },
  },
);

/**
 * Owner: 陈胜
 *
 * Figma: https://www.figma.com/file/Do849NlMKTXCv8djOFIFWA/%E9%80%9A%E7%94%A8%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?type=design&node-id=11723-60139&mode=design
 *
 * 开关组件
 */
const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      className,
      label,
      checked: controlledChecked,
      defaultChecked = false,
      disabled = false,
      tooltipProps,
      loading = false,
      tooltip,
      onChange,
      size = 'default',
      ...rest
    },
    ref,
  ) => {
    const [internalChecked, setInternalChecked] = useState(defaultChecked);

    const handleCheckedChange = (checked: boolean) => {
      setInternalChecked(checked);
      if (onChange) {
        onChange(checked);
      }
    };

    const finalChecked = controlledChecked ?? internalChecked;

    const item = (
      <div
        className={cn('text-body inline-flex flex-col leading-[22px]', className)}
        data-testid="Switch-root"
        {...rest}
      >
        <label
          className={cn('text-text-1 group flex items-center', {
            'cursor-pointer': !disabled && !loading,
            'text-text-4 cursor-not-allowed': disabled || loading,
          })}
        >
          <SwitchRoot
            checked={finalChecked}
            className={switchRootVariants({
              checked: finalChecked,
              disabled: disabled || loading,
              size,
            })}
            data-testid="Switch-toggle"
            disabled={disabled || loading}
            onCheckedChange={handleCheckedChange}
            ref={ref}
          >
            <SwitchThumb className={switchThumbVariants({ checked: finalChecked, size })}>
              {loading ? (
                <span className={switchLoadingVariants({ size, checked: finalChecked })}>
                  <svg
                    className="animate-spin"
                    data-icon="loading"
                    fill="currentColor"
                    height="1em"
                    viewBox="0 0 1024 1024"
                    width="1em"
                  >
                    <path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z" />
                  </svg>
                </span>
              ) : null}
              <span
                className={switchActiveVariants({
                  checked: finalChecked,
                  disabled: disabled || loading,
                })}
              />
            </SwitchThumb>
          </SwitchRoot>
          {typeof label === 'string' ? (
            <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap px-[4px]">
              {label}
            </span>
          ) : (
            label
          )}
        </label>
      </div>
    );

    if (tooltip !== undefined) {
      return (
        <Tooltip title={tooltip} {...tooltipProps}>
          {item}
        </Tooltip>
      );
    }
    return item;
  },
);

Switch.displayName = 'Switch';

export interface SwitchProps {
  size?: 'small' | 'default';
  label?: React.ReactNode;
  tooltip?: React.ReactNode;
  tooltipProps?: Omit<TooltipProps, 'children' | 'title'>;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  onChange?: (checked: boolean) => void;
}

export default Switch;
