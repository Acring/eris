'use client';

import React, { forwardRef } from 'react';
import * as Collapsible from '@radix-ui/react-collapsible';
import { DownLine16, InfoLine16, UpLine16 } from '@xsky/eris-icons';
import lodash from 'lodash';
import { cn } from '@/lib/utils';
import { Tooltip } from '../Tooltip';
import { IconButton } from '../IconButton';
import { useControlOpen } from './hooks';
import type { CardCollapseProps } from './type';

const CardCollapse = forwardRef<HTMLDivElement, CardCollapseProps>((props, ref) => {
  const {
    children,
    open,
    defaultOpen = false,
    onOpenChange,
    title,
    description,
    triggerGap = 'md',
    className,
    tooltip,
    rightTitle,
    forceRender = false,
  } = props;
  const [openInternal, setOpenInternal] = useControlOpen<boolean>({
    initialState: defaultOpen,
    externalValue: open,
    onExternalChange: onOpenChange,
  });

  return (
    <Collapsible.Root
      className={cn('shadow-elevation-2-bottom rounded-[4px] bg-fill-white', className)}
      onOpenChange={setOpenInternal}
      open={openInternal}
      ref={ref}
    >
      <Collapsible.Trigger asChild>
        <div
          className={cn('text-subhead', 'text-text-1', 'cursor-pointer p-[16px]', {
            'pb-0': openInternal,
            'mb-[4px]': triggerGap === 'sm',
            'mb-[8px]': triggerGap === 'md',
            'mb-[12px]': triggerGap === 'lg',
          })}
        >
          <div className={cn('inline-flex w-full items-center whitespace-nowrap')}>
            {title}
            {tooltip ? (
              <Tooltip {...lodash.omit(tooltip, ['children'])} title={tooltip.title}>
                <InfoLine16 className=" ml-[4px] shrink-0" />
              </Tooltip>
            ) : null}
            <IconButton className="ml-[4px] mr-[4px]">
              {openInternal ? <UpLine16 /> : <DownLine16 />}
            </IconButton>
            <div className="w-full flex items-center justify-end">{rightTitle}</div>
          </div>
          {description ? (
            <div className="text-text-3 text-[14px] mt-[4px]">{description}</div>
          ) : null}
        </div>
      </Collapsible.Trigger>
      {
        // 强制渲染，不使用 Collapsible.Content
        forceRender ? (
          <div
            className={cn('p-[16px] pt-0', {
              block: openInternal,
              hidden: !openInternal,
            })}
          >
            {children}
          </div>
        ) : (
          <Collapsible.Content className={cn('p-[16px] pt-0')}>{children}</Collapsible.Content>
        )
      }
    </Collapsible.Root>
  );
});

CardCollapse.displayName = 'CardCollapse';

export default CardCollapse;
