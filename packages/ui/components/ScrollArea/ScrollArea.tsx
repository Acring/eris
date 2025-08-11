'use client';
import React from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import useScrollToEdge from './useScrollToEdge';

export interface ScrollAreaProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'dir'>,
    Pick<ScrollAreaPrimitive.ScrollAreaProps, 'type' | 'dir'> {
  width?: string | number;
  height?: string | number;
  maxHeight?: string | number;
  maxWidth?: string | number;
  color?: string;
  thumbSize?: 'thin' | 'default';
  disabledHorizontal?: boolean;
  disabledVertical?: boolean;
  forceMountVertical?: boolean;
  forceMountHorizontal?: boolean;
  onScroll?: (e?: React.UIEvent<HTMLDivElement>) => void;
  showEdgeShadow?: boolean;
  // 监听滚动边缘状态
  onScrollToEdge?: (state: {
    isAtTop: boolean;
    isAtBottom: boolean;
    isAtLeft: boolean;
    isAtRight: boolean;
  }) => void;
}
const ThumbCornerWidth = 2;

const ScrollbarClass =
  'box-border flex touch-none select-none bg-transparent transition-all duration-200 ease-out';
const ScrollbarVerticalVariant = cva(
  cn(ScrollbarClass, 'z-50 py-[4px] pl-[4px] pr-[2px] hover:pl-[2px]'),
  {
    variants: {
      thumbSize: {
        thin: cn('w-[10px]'),
        default: cn('w-[12px]'),
      },
    },
  },
);
const ScrollbarHorizontalVariant = cva(
  cn(ScrollbarClass, 'z-50 flex-col px-[4px] pb-[2px] pt-[4px] hover:pt-[2px]'),
  {
    variants: {
      thumbSize: {
        thin: cn('h-[10px]'),
        default: cn('h-[12px]'),
      },
    },
  },
);
const thumbClass =
  'bg-grey-1050 relative flex-1 rounded-xl opacity-20 hover:opacity-40 active:opacity-60';

/**
 * Owner: 樊梦文
 *
 * Figma: https://www.figma.com/file/Do849NlMKTXCv8djOFIFWA/%E9%80%9A%E7%94%A8%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?type=design&node-id=14143-59014&mode=design
 *
 * 滚动条组件，用于滚动内容。
 */
const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  (
    {
      width = 'auto',
      height = 'auto',
      maxHeight = '100%',
      maxWidth = '100%',
      color,
      thumbSize = 'default',
      disabledHorizontal = false,
      disabledVertical = false,
      forceMountVertical = false,
      forceMountHorizontal = true,
      onScroll: onScrollProp,
      onScrollToEdge,
      className,
      children,
      showEdgeShadow,
      type,
      style,
      ...props
    },
    ref,
  ) => {
    const { isAtTop, isAtBottom, isAtLeft, isAtRight, onScroll } = useScrollToEdge();

    const viewportRef = React.useRef<HTMLDivElement | null>(null);

    // 监听滚动边缘状态变化
    React.useEffect(() => {
      onScrollToEdge?.({
        isAtTop,
        isAtBottom,
        isAtLeft,
        isAtRight,
      });
    }, [isAtTop, isAtBottom, isAtLeft, isAtRight, onScrollToEdge]);

    React.useEffect(() => {
      if (!viewportRef.current) return;

      const scrollAreaRoot =
        viewportRef.current.closest('[data-radix-scroll-area-root]') ||
        viewportRef.current.parentElement;
      if (!scrollAreaRoot) return;

      const resizeObserver = new ResizeObserver(() => {
        if (viewportRef.current) {
          // 重新检查滚动边缘状态
          const simulatedEvent = { target: viewportRef.current } as any;
          onScroll(simulatedEvent);
        }
      });

      // 当滚动区域大小改变时触发检查
      resizeObserver.observe(viewportRef.current);

      return () => {
        resizeObserver.disconnect();
      };
    }, [onScroll]);

    // 模拟初始的滚动状态
    React.useEffect(() => {
      if (viewportRef.current) {
        const simulatedEvent = { target: viewportRef.current } as any;
        onScroll(simulatedEvent);
      }
      // eslint-disable-next-line
    }, [onScroll, viewportRef.current]);
    // 需要区分 undefined 和 false
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
    const showTopShadow = showEdgeShadow && isAtTop === false;
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
    const showBottomShadow = showEdgeShadow && isAtBottom === false;
    return (
      <ScrollAreaPrimitive.Root
        className={cn('overflow-hidden', className)}
        scrollHideDelay={300}
        style={{ width, height, maxWidth, ...style }}
        type={type}
        {...props}
      >
        {/* 垂直阴影 */}
        {showTopShadow ? (
          <div className="shadow-elevation-1-bottom absolute left-0 right-0 top-[-10px] h-[10px]" />
        ) : null}
        {showBottomShadow ? (
          <div className="shadow-elevation-1-top absolute bottom-0 left-0 right-0 mb-[-10px] h-[10px]" />
        ) : null}
        <ScrollAreaPrimitive.Viewport
          className={cn('h-full w-full', disabledHorizontal && '[&>div]:!block')}
          onScroll={(e) => {
            onScroll(e);
            onScrollProp?.(e);
          }}
          ref={(e: HTMLDivElement | null) => {
            if (typeof ref === 'function') {
              ref(e);
            } else if (ref) {
              ref.current = e;
            }
            viewportRef.current = e;
          }}
          style={{
            maxHeight,
          }}
        >
          {children}
        </ScrollAreaPrimitive.Viewport>

        {/* 垂直滚动条 */}
        {!disabledVertical && (
          <ScrollAreaPrimitive.Scrollbar
            className={cn(ScrollbarVerticalVariant({ thumbSize }), 'vertical-thumb')}
            forceMount={!forceMountVertical ? undefined : true}
            orientation="vertical"
            style={{ bottom: ThumbCornerWidth }}
          >
            <ScrollAreaPrimitive.Thumb
              className={cn(thumbClass, 'vertical-thumb')}
              onMouseDown={(e) => {
                e.preventDefault();
              }}
              style={{ backgroundColor: color }}
            />
          </ScrollAreaPrimitive.Scrollbar>
        )}

        {/* 水平滚动条 */}
        {!disabledHorizontal && (
          <ScrollAreaPrimitive.Scrollbar
            className={cn(ScrollbarHorizontalVariant({ thumbSize }), 'horizontal-thumb')}
            forceMount={!forceMountHorizontal ? undefined : true}
            orientation="horizontal"
            style={{ right: ThumbCornerWidth }}
          >
            <ScrollAreaPrimitive.Thumb
              className={cn(thumbClass, 'horizontal-thumb')}
              onMouseDown={(e) => {
                e.preventDefault();
              }}
              style={{ backgroundColor: color }}
            />
          </ScrollAreaPrimitive.Scrollbar>
        )}
      </ScrollAreaPrimitive.Root>
    );
  },
);
ScrollArea.displayName = 'ScrollArea';

export default ScrollArea;
