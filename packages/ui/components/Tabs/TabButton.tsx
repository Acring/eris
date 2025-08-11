import { cva } from 'class-variance-authority';
import lodash from 'lodash';
import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { CloseLine16 } from '@xsky/eris-icons';
import type { TabsProps } from './type';

export interface TabButtonProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    Pick<
      TabsProps,
      'type' | 'size' | 'scrollable' | 'widthLimited' | 'closable' | 'onRemove' | 'onActiveTabKey'
    > {
  tabKey: string;
  isDragging?: boolean;
  hasOrder?: boolean;
}

const tabButtonVariant = cva(
  cn(
    'text-body text-text-2 hover:text-primary-hover active:text-primary-click disabled:hover:text-text-2 disabled:active:text-text-2 aria-selected:text-primary-normal aria-selected:hover:text-primary-normal flex cursor-pointer items-center justify-center   pt-0 outline-none transition disabled:cursor-not-allowed disabled:opacity-50',
  ),
  {
    variants: {
      type: {
        line: cn(
          'border-x-0 border-b-2 border-t-0 border-solid border-b-transparent bg-[initial] ',
        ),
        button: cn(
          'disabled:border-stroke-border-1 border-stroke-default border-stroke-border-2 bg-fill-white aria-selected:border-primary-normal aria-selected:shadow-primary-normal border-[1px] border-l-0 border-solid first:border-l-[1px] aria-selected:shadow-[-1px_0_0_0] first:aria-selected:shadow-none',
        ),
        card: cn(
          'disabled:border-stroke-border-1 border-stroke-default aria-selected:bg-fill-white bg-fill-on-grey-1 border-stroke-border-2 disabled:bg-grey-200 aria-selected:shadow-primary-normal border-[1px] border-l-0 border-solid first:border-l-[1px] first:aria-selected:shadow-none',
        ),
      },
      hasOrder: {
        true: cn('pl-0'),
      },
      isDragging: {
        true: cn('bg-grey-100'),
      },
      scrollable: {
        true: cn('whitespace-nowrap'),
      },
      size: {
        small: cn('h-[24px] px-[8px] leading-[24px]'),
        large: cn('h-[34px] px-[16px] leading-[34px]'),
      },
    },
    compoundVariants: [
      {
        type: 'line',
        hasOrder: true,
        className: cn('aria-selected:border-b-primary-normal'),
      },
    ],
  },
);

export const tabChildVariant = cva('', {
  variants: {
    widthLimited: {
      true: cn('block max-w-[168px] overflow-hidden text-ellipsis whitespace-nowrap'),
    },
  },
});

const TabButton = forwardRef<HTMLButtonElement, TabButtonProps>(
  (
    {
      children,
      type,
      hasOrder,
      isDragging,
      scrollable,
      size,
      widthLimited,
      closable,
      onActiveTabKey,
      onRemove,
      tabKey,
      ...rest
    }: TabButtonProps,
    _ref,
  ) => {
    const handleRemoveTab = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onRemove?.(tabKey);
    };

    return (
      <button
        className={cn(tabButtonVariant({ type, hasOrder, isDragging, scrollable, size }))}
        data-testid="Tabs-tab"
        data-value={tabKey}
        {...lodash.omit(rest, ['onAdd', 'defaultActiveKey', 'tabs', 'activeKey', 'onOrder'])}
        onClick={() => {
          onActiveTabKey?.(tabKey);
        }}
        onMouseDown={(e: React.MouseEvent) => {
          e.preventDefault();
        }}
        ref={_ref}
        title={typeof children === 'string' && widthLimited ? children : ''}
        type="button"
      >
        {hasOrder ? (
          children
        ) : (
          <div className={cn(tabChildVariant({ widthLimited }))}>{children}</div>
        )}
        {closable ? (
          <CloseLine16
            className={cn('ml-[4px]')}
            onClick={(e) => handleRemoveTab(e)}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          />
        ) : null}
      </button>
    );
  },
);

TabButton.displayName = 'TabButton';

export default TabButton;
