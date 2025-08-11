'use client';
import type { ReactNode } from 'react';
import React, { forwardRef, useState, useRef } from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cn } from '@/lib/utils';

const collisionPadding = {
  top: 16,
  bottom: 16,
  left: 4,
  right: 4,
};

const PopoverContent = forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, side = 'top', sideOffset = 4, children, ...props }, ref) => {
  const localRef = useRef<HTMLDivElement>(null);

  return (
    <PopoverPrimitive.Content
      className="popover-content z-tooltip"
      collisionPadding={collisionPadding}
      ref={(e: HTMLInputElement | null) => {
        if (typeof ref === 'function') {
          ref(e);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLInputElement | null>).current = e;
        }
        (localRef as React.MutableRefObject<HTMLInputElement | null>).current = e;
      }}
      side={side}
      sideOffset={sideOffset}
      {...props}
    >
      <div
        className={cn(
          'border-stroke-border-2 text-body shadow-elevation-2-bottom box-border',
          'min-w-[180px] max-w-[280px] rounded-[4px] border-[1px] border-solid bg-white p-2 outline-0',
          'max-h-[var(--radix-popper-available-height)]',
          className,
        )}
      >
        {children}
      </div>
    </PopoverPrimitive.Content>
  );
});
PopoverContent.displayName = 'PopoverContent';

export type PopoverProps = Omit<
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>,
  'content' | 'title'
> & {
  children: ReactNode;
  title?: ReactNode;
  extra?: ReactNode;
  arrow?: boolean;
  container?: HTMLElement | null;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  content: ReactNode;
  contentClass?: string;
  arrowClass?: string;
  trigger?: ('hover' | 'click')[];
};

const POPOVER_HOVER_DELAY = 200;

/**
 * Owner: 包尧
 *
 * Figma: https://www.figma.com/file/Do849NlMKTXCv8djOFIFWA/%E9%80%9A%E7%94%A8%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?type=design&node-id=14650-60173&mode=design
 *
 * 气泡卡片组件
 */
const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      children,
      defaultOpen = false,
      open: controlledOpen,
      onOpenChange,
      arrow = true,
      container,
      title,
      content,
      contentClass,
      arrowClass,
      trigger = ['hover'],
      extra,
      ...props
    },
    ref,
  ) => {
    const hoverTimer = useRef<NodeJS.Timeout | null>(null);
    const leaveTimer = useRef<NodeJS.Timeout | null>(null);

    const triggerRef = useRef<any>(null);
    const [internalOpen, setInternalOpen] = useState<boolean>(defaultOpen);
    const changeOpenFun = controlledOpen === undefined ? setInternalOpen : onOpenChange;

    const handleTriggerMouseEnter = () => {
      leaveTimer.current && clearTimeout(leaveTimer.current);
      hoverTimer.current = setTimeout(() => {
        if (trigger.includes('hover')) {
          changeOpenFun?.(true);
        }
      }, POPOVER_HOVER_DELAY);
    };

    const handleTriggerMouseLeave = () => {
      hoverTimer.current && clearTimeout(hoverTimer.current);
      leaveTimer.current = setTimeout(() => {
        if (trigger.includes('hover')) {
          changeOpenFun?.(false);
        }
      }, POPOVER_HOVER_DELAY);
    };

    const finalOpen = controlledOpen === undefined ? internalOpen : controlledOpen;
    return (
      <PopoverPrimitive.Root
        defaultOpen={defaultOpen}
        onOpenChange={(open) => {
          if (trigger.includes('click')) {
            changeOpenFun?.(open);
          }
        }}
        open={finalOpen}
      >
        <PopoverPrimitive.Trigger
          asChild
          onMouseEnter={handleTriggerMouseEnter}
          onMouseLeave={handleTriggerMouseLeave}
          ref={triggerRef}
        >
          {React.isValidElement(children) ? children : <span>{children}</span>}
        </PopoverPrimitive.Trigger>
        <PopoverPrimitive.Portal container={container}>
          <PopoverContent
            className={cn('flex flex-col', props.className)}
            onMouseEnter={(e) => {
              handleTriggerMouseEnter();
              props.onMouseEnter?.(e);
            }}
            onMouseLeave={(e) => {
              handleTriggerMouseLeave();
              props.onMouseLeave?.(e);
            }}
            ref={ref}
            {...props}
          >
            {title ? (
              <div className="text-text-1 text-body mb-[16px] font-medium">{title}</div>
            ) : null}
            <div className={cn('max-h-[100%] flex-1 overflow-auto text-text-1', contentClass)}>
              {content}
            </div>
            {extra}
            {arrow ? (
              <PopoverPrimitive.Arrow asChild className={cn('bg-white', arrowClass)}>
                <div className="border-stroke-border-2 mt-[-5px] box-border  h-[10px] w-[10px] rotate-45 transform border-[1px] border-l-0	 border-t-0 border-solid transition-none popover-arrow" />
              </PopoverPrimitive.Arrow>
            ) : null}
          </PopoverContent>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
    );
  },
);

Popover.displayName = 'Popover';

export default Popover;
