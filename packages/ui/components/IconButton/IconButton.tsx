'use client';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import React, { useMemo } from 'react';
import { cn } from '../../lib/utils';
import type { TooltipProps } from '../Tooltip';
import { Tooltip } from '../Tooltip';

export interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    VariantProps<typeof IconButtonVariants> {
  clickableAreaInvisible?: boolean;
  tooltip?: React.ReactNode;
  color?: 'default' | 'primary' | 'danger';
  active?: boolean;
  tooltipProps?: Omit<TooltipProps, 'children' | 'title'>;
  filled?: boolean; // 面性图标
}

/**
 * Owner: 刘圳
 *
 * Figma: https://www.figma.com/file/Do849NlMKTXCv8djOFIFWA/%E9%80%9A%E7%94%A8%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?type=design&node-id=11723-60136&mode=design
 *
 * 图标按钮用于展示一个图标的交互状态，如：hover、active、disabled 等。
 *
 */
const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      clickableAreaInvisible = false,
      children,
      tooltip,
      active = false,
      tooltipProps,
      color = 'default',
      filled = false,
      ...props
    },
    ref,
  ) => {
    const main = useMemo(() => {
      return (
        <button
          className={cn(
            IconButtonVariants({
              clickableAreaInvisible,
              color,
              filled,
              active,
              className,
            }),
          )}
          data-testid="IconButton-root"
          ref={ref}
          type="button"
          {...props}
        >
          {children}
        </button>
      );
    }, [active, children, className, clickableAreaInvisible, color, filled, props, ref]);

    if (tooltip !== undefined) {
      return (
        <Tooltip title={tooltip} {...tooltipProps}>
          <div className={cn('w-[fit-content]')}>{main}</div>
        </Tooltip>
      );
    }

    return main;
  },
);

IconButton.displayName = 'IconButton';

export default IconButton;

export const IconButtonVariants = cva(
  cn(
    'text-icon-outlined-operable relative flex cursor-pointer rounded-sm border-none bg-transparent p-0 outline-none transition',
    'disabled:text-icon-status-filled-disable disabled:cursor-not-allowed disabled:select-none',
    'before:absolute before:left-[50%] before:top-[50%] before:h-full before:w-full before:translate-x-[-50%] before:translate-y-[-50%] before:rounded-sm before:p-[2px] before:content-[""] ',
    'before:box-content before:bg-transparent disabled:before:hover:bg-transparent [&_svg]:relative',
  ),
  {
    variants: {
      color: {
        default: cn(
          'hover:text-icon-status-outlined-hover focus-visible:text-icon-status-outlined-active active:text-icon-status-outlined-click',
        ),
        primary: cn(
          'hover:text-primary-hover focus-visible:text-primary-click active:text-primary-click',
        ),
        danger: cn(
          'hover:text-danger-hover focus-visible:text-danger-click active:text-danger-click',
        ),
      },
      active: {
        true: 'text-primary-normal hover:text-primary-normal focus:text-primary-normal active:text-primary-normal',
        false: '',
      },
      clickableAreaInvisible: {
        true: cn('before:hover:bg-transparent active:bg-transparent'),
        false: cn(
          'before:hover:bg-icon-bg-default-hover',
          'active:before:bg-icon-bg-default-click focus-visible:before:bg-icon-bg-default-hover',
        ),
      },
      filled: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        filled: true,
        className: cn('text-icon-filled-normal '),
      },
      {
        color: 'default',
        filled: true,
        className: cn(
          'text-icon-filled-normal hover:text-icon-status-filled-hover focus:text-icon-status-filled-click active:text-icon-status-filled-click',
        ),
      },
      {
        color: 'danger',
        clickableAreaInvisible: false,
        className: cn(
          'before:hover:bg-icon-bg-danger-hover active:before:bg-icon-bg-danger-click focus-visible:before:bg-icon-bg-danger-hover',
        ),
      },
      {
        color: 'primary',
        active: true,
        className:
          'text-primary-normal hover:text-primary-normal focus:text-primary-normal active:text-primary-normal',
      },
      {
        color: 'danger',
        active: true,
        className: 'text-danger-normal',
      },
    ],
  },
);
