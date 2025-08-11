'use client';
import type { HTMLAttributes, ReactNode, MouseEvent } from 'react';
import React, { useCallback } from 'react';
import { cva } from 'class-variance-authority';
import { CloseLine12, InfoLine16 } from '@xsky/eris-icons';
import { cn } from '@/lib/utils';
import { IconButton } from '../IconButton';
import { Tooltip } from '../Tooltip';

const tagVariants = cva(
  cn('text-body text-text-4 box-border inline-flex items-center rounded-[2px] leading-[20px]'),
  {
    variants: {
      type: {
        active: cn('bg-tag-active text-text-link-success-normal'),
        updating: cn('bg-tag-updating text-text-link-updating-normal'),
        warning: cn('bg-tag-warning text-text-link-warning-normal'),
        danger: cn('bg-tag-danger text-text-link-danger-normal'),
        critical: cn('bg-tag-critical text-text-link-critical-normal'),
        default: cn('bg-tag-grey text-text-2'),
        primary: cn('bg-tag-primary text-primary-normal'),
      },
      rounded: {
        true: 'rounded-full',
        false: 'rounded-[2px]',
      },
      clickAble: {
        true: 'cursor-pointer underline',
        false: 'cursor-auto',
      },
      disabled: {
        true: 'opacity-40',
        false: '',
      },
      size: {
        lg: 'text-body px-[8px] py-[3px]',
        md: 'text-caption px-[8px] py-[1px] text-[14px]',
        sm: 'text-caption px-[4px]',
      },
      defaultEditable: {
        true: 'text-text-1',
        false: '',
      },
    },
    compoundVariants: [
      {
        type: 'active',
        clickAble: true,
        className:
          'text-text-link-success-normal hover:text-text-link-success-hover active:text-text-link-success-click',
      },
      {
        type: 'updating',
        clickAble: true,
        className:
          'text-text-link-updating-normal hover:text-text-link-updating-hover active:text-text-link-updating-click',
      },
      {
        type: 'warning',
        clickAble: true,
        className:
          'text-text-link-warning-normal hover:text-text-link-warning-hover active:text-text-link-warning-click',
      },
      {
        type: 'danger',
        clickAble: true,
        className:
          'text-text-link-danger-normal hover:text-text-link-danger-hover active:text-text-link-danger-click',
      },
      {
        type: 'critical',
        clickAble: true,
        className:
          'text-text-link-critical-normal hover:text-text-link-critical-hover active:text-text-link-critical-click',
      },
      {
        type: 'default',
        clickAble: true,
        className: 'hover:text-text-link-primary-hover active:text-text-link-primary-click',
      },
      {
        type: 'primary',
        clickAble: true,
        className:
          'text-text-link-primary-normal hover:text-text-link-primary-hover active:text-text-link-primary-click',
      },
    ],
  },
);

export type TagType =
  | 'active'
  | 'updating'
  | 'warning'
  | 'danger'
  | 'critical'
  | 'default'
  | 'primary';

export interface TagProps extends Omit<HTMLAttributes<HTMLElement>, 'type'> {
  type?: TagType;
  size?: 'sm' | 'md' | 'lg';
  disabledClose?: boolean;
  closeIcon?: ReactNode;
  showClose?: boolean;
  rounded?: boolean;
  tooltip?: ReactNode | string;
  onClose?: (e?: React.MouseEvent<HTMLSpanElement> | null) => void;
}

/**
 * Owner: 许小静
 *
 * Figma: https://www.figma.com/file/Do849NlMKTXCv8djOFIFWA/%E9%80%9A%E7%94%A8%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?type=design&node-id=14650-60174&mode=design
 *
 * 进行标记和分类的标签
 */
const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      className,
      type = 'default',
      showClose = false,
      children,
      rounded = false,
      disabledClose = false,
      onClose,
      closeIcon: providedCloseIcon,
      size = 'lg',
      tooltip,
      ...rest
    },
    ref,
  ) => {
    const clickAble = Boolean(rest.onClick);
    const showCloseIcon = showClose || providedCloseIcon || !!onClose;

    const handleTagClose = useCallback(
      (e: MouseEvent<HTMLSpanElement> | null) => {
        if (!disabledClose) {
          onClose?.(e);
        }
      },
      [onClose, disabledClose],
    );

    return (
      <span
        className={cn(
          tagVariants({
            type,
            clickAble,
            rounded,
            disabled: disabledClose,
            size,
            defaultEditable: !!showCloseIcon && type === 'default',
          }),
          className,
        )}
        data-testid="Tag-root"
        data-value={typeof children === 'string' ? children : undefined}
        ref={ref}
        {...rest}
      >
        {typeof children === 'string' ? (
          <span className="line-clamp-1 break-words" title={children}>
            {children}
          </span>
        ) : (
          children
        )}

        {!!tooltip && (
          <Tooltip title={tooltip}>
            <InfoLine16 className="ml-[4px] text-icon-outlined-displayed" />
          </Tooltip>
        )}

        {showCloseIcon ? (
          <IconButton
            className={cn('ml-[4px] inline-flex h-full cursor-pointer items-center text-center', {
              'cursor-not-allowed opacity-40': disabledClose,
            })}
            data-testid="Tag-close"
            onClick={handleTagClose}
            role="button"
            tabIndex={0}
          >
            {providedCloseIcon || <CloseLine12 className="tag-close-icon" />}
          </IconButton>
        ) : null}
      </span>
    );
  },
);

Tag.displayName = 'Tag';

export default Tag;
