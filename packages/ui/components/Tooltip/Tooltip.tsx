'use client';
import type { ReactNode, ElementRef } from 'react';
import { useMemo } from 'react';
import React, { forwardRef, useRef, useState } from 'react';
import lodash from 'lodash';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from '@/lib/utils';

// 悬浮层距离边界的距离
const collisionPadding = {
  top: 16,
  bottom: 16,
  left: 4,
  right: 4,
};

const TooltipContent = forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(
  (
    { className, sideOffset = 4, align = 'center', side = 'top', forceMount = true, ...props },
    ref,
  ) => (
    <TooltipPrimitive.Content
      align={align}
      className={cn(
        'tooltip-content shadow-elevation-2-bottom z-tooltip bg-grey-1000 box-border max-w-[280px] rounded-sm p-1 text-[14px] text-white',
        className,
      )}
      collisionPadding={collisionPadding}
      forceMount={forceMount}
      ref={ref}
      side={side}
      sideOffset={sideOffset}
      {...props}
    />
  ),
);
TooltipContent.displayName = 'TooltipContent';

export interface TooltipProps
  extends Omit<React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>, 'title'> {
  children: ReactNode;
  title: ReactNode;
  arrow?: boolean;
  container?: HTMLElement | null;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  disableHoverableContent?: boolean;
  delayDuration?: number;
}
/**
 * Owner: 廖玉良
 *
 * Figma: https://www.figma.com/file/Do849NlMKTXCv8djOFIFWA/%E9%80%9A%E7%94%A8%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?type=design&node-id=11723-60147&mode=design
 *
 * 文字提示气泡框
 * 鼠标移入则显示提示，移出消失，气泡浮层不承载复杂文本和操作。
 */
const Tooltip = forwardRef<ElementRef<typeof TooltipContent>, TooltipProps>(
  (
    {
      children,
      title,
      open: controlledOpen,
      defaultOpen,
      onOpenChange,
      arrow = true,
      container,
      disableHoverableContent,
      delayDuration = 200,
      ...props
    },
    ref,
  ) => {
    const triggerRef = useRef(null);
    const triggerByChild = useRef<boolean>(false);
    const [isOpen, setIsOpen] = useState(defaultOpen || false);
    const finalOpen = controlledOpen === undefined ? isOpen : controlledOpen;
    const timerRef = useRef<NodeJS.Timeout | undefined>();

    const changeOpen = (open: boolean) => {
      if (controlledOpen === undefined) {
        setIsOpen(open);
      }
      onOpenChange?.(open);
    };

    const handleOpenChange = (open: boolean) => {
      if (!triggerByChild.current) {
        changeOpen(open);
      } else {
        triggerByChild.current = false;
      }
    };

    const triggerDom = useMemo(
      () => (lodash.isString(children) ? <span>{children}</span> : children),
      [children],
    );

    if (!title) {
      return triggerDom;
    }

    return (
      <TooltipPrimitive.Provider delayDuration={delayDuration}>
        <TooltipPrimitive.Root
          defaultOpen={defaultOpen}
          disableHoverableContent={disableHoverableContent}
          onOpenChange={handleOpenChange}
          open={finalOpen}
        >
          <TooltipPrimitive.Trigger
            asChild
            onClick={() => {
              // onClick 会触发 onOpenChange 且返回false，导致点击trigger区域tooltip消失
              // 使用  event.preventDefault() 可以阻止 onOpenChange 的触发，但会导致表单的一些默认事件失效，如：button type="submit" 的事件
              // 这里给 onOpenChange 添加开关控制，onClick 时，关掉开关，在后续触发一次 onOpenChange 时，把开关重制为 正常
              triggerByChild.current = true;
              timerRef.current && clearTimeout(timerRef.current);
              timerRef.current = setTimeout(() => {
                changeOpen(true);
              }, 200);
            }}
            onMouseLeave={() => {
              timerRef.current && clearTimeout(timerRef.current);
            }}
            ref={triggerRef}
          >
            {triggerDom}
          </TooltipPrimitive.Trigger>
          <TooltipPrimitive.Portal container={container}>
            <TooltipContent
              {...props}
              // 点击trigger区域，tooltip消失问题
              // https://github.com/radix-ui/primitives/issues/2632
              // https://github.com/radix-ui/primitives/blob/main/packages/react/tooltip/src/Tooltip.stories.tsx#L659-L687
              onPointerDownOutside={(event) => {
                if (event.target === triggerRef.current) event.preventDefault();
                props?.onPointerDownOutside?.(event);
              }}
              ref={ref}
            >
              {title}
              {arrow ? (
                <TooltipPrimitive.Arrow
                  className="fill-grey-1000"
                  height={6}
                  offset={4}
                  width={12}
                />
              ) : null}
            </TooltipContent>
          </TooltipPrimitive.Portal>
        </TooltipPrimitive.Root>
      </TooltipPrimitive.Provider>
    );
  },
);
Tooltip.displayName = 'Tooltip';

export default Tooltip;
