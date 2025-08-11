'use client';

import React, { forwardRef } from 'react';
import * as Collapsible from '@radix-ui/react-collapsible';
import { DownLine16, InfoLine16, UpLine16 } from '@xsky/eris-icons';
import lodash from 'lodash';
import { cn } from '@/lib/utils';
import { Tooltip } from '../Tooltip';
import { useControlOpen } from './hooks';
import type { CollapseProps } from './type';
import CardCollapse from './CardCollapse';
import { IconButton } from '../IconButton';

interface ComposedProps extends React.ForwardRefExoticComponent<CollapseProps> {
  Card: typeof CardCollapse;
}

/**
 * Owner: 樊梦文
 *
 * Figma: https://www.figma.com/file/Do849NlMKTXCv8djOFIFWA/%E9%80%9A%E7%94%A8%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?type=design&node-id=11723-60156&mode=design
 *
 * 折叠面板组件，用于展示折叠内容。
 */
const Collapse = forwardRef<HTMLDivElement, CollapseProps>((props, ref) => {
  const {
    children,
    open,
    defaultOpen = false,
    onOpenChange,
    title,
    triggerGap = 'md',
    description,
    className,
    tooltip,
    rightTitle,
    hoverStyle = {
      changeColor: true,
      cursorArea: 'default',
    },
    showIcon = true,
    iconButtonProps = {},
    forceRender = false,
  } = props;
  const [openInternal, setOpenInternal] = useControlOpen<boolean>({
    initialState: defaultOpen,
    externalValue: open,
    onExternalChange: onOpenChange,
  });

  const renderRightTitle = () => {
    if (!rightTitle) return null;
    const baseClass = 'flex items-center w-full justify-end';
    return hoverStyle.cursorArea === 'full' ? (
      <Collapsible.Trigger asChild>
        <div className={baseClass}>{rightTitle}</div>
      </Collapsible.Trigger>
    ) : (
      <div className={baseClass}>{rightTitle}</div>
    );
  };

  return (
    <Collapsible.Root
      className={cn(className)}
      data-testid="Collapse-root"
      onOpenChange={setOpenInternal}
      open={openInternal}
      ref={ref}
    >
      <div
        className={cn({
          'mb-[4px]': triggerGap === 'sm',
          'mb-[8px]': triggerGap === 'md',
          'mb-[12px]': triggerGap === 'lg',
          'cursor-pointer': hoverStyle.cursorArea === 'full',
        })}
      >
        <div className="flex">
          <Collapsible.Trigger asChild>
            <div
              className={cn('text-text-1 inline-flex items-center whitespace-nowrap', {
                'group hover:text-primary-hover': hoverStyle.changeColor,
                'cursor-pointer': hoverStyle.cursorArea === 'default',
              })}
              data-testid="Collapse-trigger"
            >
              {title}
              {tooltip ? (
                <Tooltip {...lodash.omit(tooltip, ['children'])} title={tooltip.title}>
                  <InfoLine16 className="ml-[4px] shrink-0" />
                </Tooltip>
              ) : null}
              {showIcon ? (
                <IconButton
                  className={cn('ml-[4px] mr-[4px]', {
                    'group-hover:text-primary-hover': hoverStyle.changeColor,
                  })}
                  clickableAreaInvisible
                  {...iconButtonProps}
                >
                  {openInternal ? <UpLine16 /> : <DownLine16 />}
                </IconButton>
              ) : null}
            </div>
          </Collapsible.Trigger>
          {renderRightTitle()}
        </div>
        {description ? (
          <div className="text-text-3 text-[14px] mt-[4px]" data-testid="Collapse-description">
            {description}
          </div>
        ) : null}
      </div>
      {
        // 强制渲染，不使用 Collapsible.Content
        forceRender ? (
          <div
            className={cn({
              block: openInternal,
              hidden: !openInternal,
            })}
          >
            {children}
          </div>
        ) : (
          <Collapsible.Content>{children}</Collapsible.Content>
        )
      }
    </Collapsible.Root>
  );
}) as ComposedProps;

Collapse.displayName = 'Collapse';

Collapse.Card = CardCollapse;

export default Collapse;
