'use client';
import type { ButtonHTMLAttributes } from 'react';
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Spinner } from '@/components/Spinner';
import type { SizeType } from '@/lib/type';
import { cn } from '@/lib/utils';
import type { TooltipProps } from '../Tooltip/Tooltip';
import Tooltip from '../Tooltip/Tooltip';

const buttonVariants = cva(
  cn(
    'text-body inline-flex cursor-pointer select-none items-center justify-center',
    'disabled:cursor-not-allowed disabled:shadow-none',
    'whitespace-nowrap rounded-sm border border-solid font-normal outline-none transition',
  ),
  {
    variants: {
      type: {
        primary: cn('border-transparent text-white focus:border-transparent'),
        secondary: cn(
          'bg-button-bg-secondary-normal hover:bg-button-bg-secondary-hover focus-visible:bg-button-bg-secondary-click active:bg-button-bg-secondary-click',
          'border-transparent',
        ),
        outlined: cn('border bg-transparent'),
        text: cn(
          'hover:bg-button-bg-text-hover focus-visible:bg-button-bg-text-click active:bg-button-bg-text-click border-transparent bg-transparent',
        ),
      },
      color: {
        primary: '',
        danger: '',
        default: '',
      },
      size: {
        xs: cn('text-caption h-[24px] px-[7px]'),
        sm: cn('h-[28px] px-[7px]'),
        md: cn('h-[34px] px-[15px]'),
        lg: cn('px-[15px] py-[10px]'),
      },
    },
    compoundVariants: [
      {
        type: 'primary',
        color: 'default',
        className: cn(
          'component-border-primary component-ring-primary bg-primary-normal',
          'hover:bg-primary-hover focus-visible:bg-primary-click active:bg-primary-click hover:border-transparent',
          'disabled:bg-primary-disable disabled:border-transparent',
        ),
      },
      {
        type: 'primary',
        color: 'primary',
        className: cn(
          'component-border-primary component-ring-primary bg-primary-normal',
          'hover:bg-primary-hover focus-visible:bg-primary-click active:bg-primary-click hover:border-transparent',
          'disabled:bg-primary-disable disabled:border-transparent',
        ),
      },
      {
        type: 'primary',
        color: 'danger',
        className: cn(
          'component-border-danger component-ring-danger bg-danger-normal',
          'hover:bg-danger-hover focus-visible:bg-danger-click active:bg-danger-click',
          'disabled:bg-danger-disable disabled:border-transparent',
        ),
      },
      {
        type: 'secondary',
        color: 'default',
        className: cn(
          'text-text-2',
          'disabled:bg-button-bg-secondary-disable disabled:text-text-4',
        ),
      },
      {
        type: 'secondary',
        color: 'primary',
        className: cn(
          'text-primary-normal',
          'disabled:bg-button-bg-secondary-disable disabled:text-button-text-secondary_primary-disable',
        ),
      },
      {
        type: 'secondary',
        color: 'danger',
        className: cn(
          'text-danger-normal',
          'disabled:bg-button-bg-secondary-disable disabled:text-button-text-secondary_danger-disable',
        ),
      },
      {
        type: 'outlined',
        color: 'default',
        className: cn(
          'border-stroke-border-2 text-text-2',
          'hover:bg-grey-100 focus-visible:bg-grey-200 active:bg-grey-200',
          'disabled:text-text-4 disabled:border-stroke-border-2 disabled:hover:bg-transparent',
        ),
      },
      {
        type: 'outlined',
        color: 'primary',
        className: cn(
          'component-border-primary component-ring-primary border-primary-normal text-primary-normal',
          'focus:border-primary-normal hover:bg-purple-50 focus-visible:bg-purple-100 active:bg-purple-100',
          'disabled:border-button-border-outline_primary-disable disabled:text-button-text-outline_primary-disable disabled:hover:bg-transparent',
        ),
      },
      {
        type: 'outlined',
        color: 'danger',
        className: cn(
          'component-border-danger component-ring-danger border-danger-normal text-danger-normal',
          'focus:border-danger-normal hover:bg-red-50 focus-visible:bg-red-100 active:bg-red-100',
          'disabled:border-button-border-outline_danger-disable disabled:text-button-text-outline_danger-disable disabled:hover:bg-transparent',
        ),
      },
      {
        type: 'text',
        color: 'default',
        className: cn('text-text-2', 'disabled:text-text-4 disabled:bg-transparent'),
      },
      {
        type: 'text',
        color: 'primary',
        className: cn(
          'text-primary-normal',
          'disabled:text-button-text-text_primary-disable disabled:bg-transparent',
        ),
      },
      {
        type: 'text',
        color: 'danger',
        className: cn(
          'text-danger-normal',
          'disabled:text-button-text-text_danger-disable disabled:bg-transparent',
        ),
      },
    ],
  },
);

const iconVariants = cva('hidden', {
  variants: {
    loading: {
      true: 'mr-0-5 inline-flex',
    },
    hasIcon: {
      true: 'mr-0-5 inline-flex',
    },
  },
});

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'color'>,
    VariantProps<typeof buttonVariants> {
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  tooltip?: React.ReactNode;
  tooltipProps?: Omit<TooltipProps, 'title' | 'children'>;
  size?: SizeType;
  htmlType?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

/**
 * Owner: 刘圳
 *
 * Figma: https://www.figma.com/file/Do849NlMKTXCv8djOFIFWA/%E9%80%9A%E7%94%A8%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?type=design&node-id=11723-60136&mode=design
 *
 * 按钮用于开始一个即时操作，触发业务逻辑时使用。
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      type = 'primary',
      color = 'default',
      size = 'md',
      loading,
      icon,
      htmlType = 'button',
      tooltip,
      tooltipProps,
      ...props
    },
    ref,
  ) => {
    const spinner = React.useMemo(() => {
      if (!loading) return;
      const spinColor = type === 'primary' ? 'white' : color === 'danger' ? 'danger' : 'default';
      return <Spinner className="text-inherit" color={spinColor} size="sm" />;
    }, [color, loading, type]);

    const main = React.useMemo(() => {
      return (
        <button
          className={cn(buttonVariants({ type, color, size, className }))}
          data-testid="Button-root"
          ref={ref}
          // https://github.com/jsx-eslint/eslint-plugin-react/issues/1555
          // eslint-disable-next-line react/button-has-type
          type={htmlType}
          {...props}
        >
          <div className={cn(iconVariants({ loading, hasIcon: Boolean(icon) }))}>
            {loading ? spinner : (icon ?? icon)}
          </div>
          {children}
        </button>
      );
    }, [children, className, color, htmlType, icon, loading, props, ref, size, spinner, type]);

    if (tooltip !== undefined) {
      return (
        <Tooltip title={tooltip} {...tooltipProps}>
          {main}
        </Tooltip>
      );
    }

    return main;
  },
);

Button.displayName = 'Button';

export default Button;

export { buttonVariants };
