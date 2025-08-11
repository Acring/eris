'use client';
import type { ReactNode } from 'react';
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const TextLinkVariants = cva(
  cn('flex cursor-pointer items-center border-none bg-transparent p-0 underline transition'),
  {
    variants: {
      disabled: {
        true: 'cursor-not-allowed opacity-40',
        false: 'opacity-100',
      },
      type: {
        normal: cn('text-text-link-primary-normal'),
        active: cn('text-text-link-success-normal'),
        second: cn('text-text-link-second-normal'),
        danger: cn('text-text-link-danger-normal'),
        updating: cn('text-text-link-updating-normal'),
        critical: cn('text-text-link-critical-normal'),
        warning: cn('text-text-link-warning-normal'),
      },
      noUnderline: {
        true: cn('no-underline hover:underline active:underline'),
      },
    },
    compoundVariants: [
      {
        noUnderline: true,
        disabled: true,
        className: cn('hover:no-underline active:no-underline'),
      },
      {
        type: 'normal',
        noUnderline: false,
        disabled: false,
        className: cn(
          'text-text-2 hover:text-text-link-primary-hover active:text-text-link-primary-click',
        ),
      },
      {
        type: 'normal',
        noUnderline: true,
        disabled: false,
        className: cn('hover:text-text-link-primary-hover active:text-text-link-primary-click'),
      },
      {
        type: 'second',
        noUnderline: false,
        disabled: false,
        className: cn(
          'text-text-1 hover:text-text-link-primary-hover active:text-text-link-primary-click',
        ),
      },
      {
        type: 'second',
        noUnderline: true,
        disabled: false,
        className: cn('hover:text-text-link-second-hover active:text-text-link-second-click'),
      },
      {
        type: 'active',
        disabled: false,
        className: 'hover:text-text-link-success-hover active:text-text-link-success-click',
      },
      {
        type: 'danger',
        disabled: false,
        className: cn('hover:text-text-link-danger-hover active:text-text-link-danger-click'),
      },
      {
        type: 'critical',
        disabled: false,
        className: 'hover:text-text-link-critical-hover active:text-text-link-critical-click',
      },
      {
        type: 'updating',
        disabled: false,
        className: 'hover:text-text-link-updating-hover active:text-text-link-updating-click',
      },
      {
        type: 'warning',
        disabled: false,
        className: 'hover:text-text-link-warning-hover active:text-text-link-warning-click',
      },
    ],
  },
);

export interface TextLinkProps
  extends Omit<React.HtmlHTMLAttributes<HTMLSpanElement>, 'type'>,
    VariantProps<typeof TextLinkVariants> {
  children: ReactNode;
  icon?: ReactNode;
  iconPosition?: 'front' | 'rear';
  disabled?: boolean;
}

/**
 * Owner: 陈胜
 *
 * Figma: https://www.figma.com/file/Do849NlMKTXCv8djOFIFWA/%E9%80%9A%E7%94%A8%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?type=design&node-id=14490-59547&mode=design&t=aUDkFCQpO8YuadRt-4
 *
 * 文本链接组件，用于页面内跳转或外部链接跳转。
 */
const TextLink = React.forwardRef<HTMLSpanElement, TextLinkProps>(
  (
    {
      children,
      type = 'normal',
      icon,
      iconPosition = 'front',
      noUnderline = false,
      className,
      disabled = false,
      ...props
    },
    ref,
  ) => {
    const onClick = (e: React.MouseEvent<HTMLSpanElement>) => {
      if (disabled) {
        e.preventDefault();
        return null;
      }
      return props.onClick?.(e);
    };

    return (
      <span
        className={cn(TextLinkVariants({ type, noUnderline, disabled }), { disabled }, className)}
        ref={ref}
        {...props}
        onClick={onClick}
      >
        {iconPosition === 'front' && Boolean(icon) && icon}
        <span>{children}</span>
        {iconPosition === 'rear' && Boolean(icon) && icon}
      </span>
    );
  },
);

TextLink.displayName = 'TextLink';

export default TextLink;
