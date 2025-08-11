'use client';

import React, { forwardRef, useEffect } from 'react';
import { autoUpdate, flip, offset, size, useFloating, FloatingPortal } from '@floating-ui/react';
import type { ElementRects, Elements } from '@floating-ui/react';
import { useCommandState } from '@acring/cmdk';

import { cn } from '../../lib/utils';
import type { FloatingContentProps } from './type';

const DEFAULT_EMPTY_WIDTH = 200;
const DEFAULT_EMPTY_HEIGHT = 210;
const DEFAULT_POPUP_HEIGHT = 264;
const DEFAULT_POPUP_MAX_WIDTH = 720;
const DEFAULT_BOUNDARY_PADDING = 16;

const FloatingContent = forwardRef<HTMLDivElement, FloatingContentProps>(
  (
    {
      open,
      setOnScrollbar,
      children,
      referenceElement,
      popupMaxWidth,
      popupWidth,
      portalContainer,
      placement = 'bottom-start',
      POPUP_MAX_WIDTH = DEFAULT_POPUP_MAX_WIDTH,
      BOUNDARY_PADDING = DEFAULT_BOUNDARY_PADDING,
      EMPTY_WIDTH = DEFAULT_EMPTY_WIDTH,
      EMPTY_HEIGHT = DEFAULT_EMPTY_HEIGHT,
      POPUP_HEIGHT = DEFAULT_POPUP_HEIGHT,
    }: FloatingContentProps,
    ref,
  ) => {
    const filteredCount = useCommandState((state) => state.filtered.count);
    const search = useCommandState((state) => state.search);

    const stateRef = React.useRef({ filteredCount, search });
    React.useEffect(() => {
      stateRef.current = { filteredCount, search };
    }, [filteredCount, search]);

    const { refs, floatingStyles, update } = useFloating({
      whileElementsMounted: autoUpdate,
      placement,
      elements: {
        reference: referenceElement,
      },
      middleware: [
        offset(4),
        flip(),
        size({
          apply: ({
            rects,
            elements,
            availableHeight,
            availableWidth,
          }: {
            rects: ElementRects;
            elements: Elements;
            availableHeight: number;
            availableWidth: number;
          }) => {
            const { filteredCount, search } = stateRef.current;
            let maxWidth;
            let minWidth;

            // 计算弹出框的宽度
            if (popupMaxWidth !== undefined) {
              maxWidth = typeof popupMaxWidth === 'number' ? popupMaxWidth : POPUP_MAX_WIDTH;
            } else if (filteredCount === 0 && search.length > 0) {
              maxWidth =
                POPUP_MAX_WIDTH > availableWidth - BOUNDARY_PADDING
                  ? availableWidth - BOUNDARY_PADDING
                  : POPUP_MAX_WIDTH;
              minWidth = rects.reference.width > EMPTY_WIDTH ? rects.reference.width : EMPTY_WIDTH;
            } else {
              maxWidth =
                POPUP_MAX_WIDTH > availableWidth - BOUNDARY_PADDING
                  ? availableWidth - BOUNDARY_PADDING
                  : POPUP_MAX_WIDTH;
              minWidth = rects.reference.width;
            }

            // 计算弹出框的高度
            let maxHeight = POPUP_HEIGHT;

            if (filteredCount === 0 && search.length > 0) {
              maxHeight = EMPTY_HEIGHT;
            }

            if (availableHeight - BOUNDARY_PADDING < maxHeight) {
              maxHeight = availableHeight - BOUNDARY_PADDING;
            }

            Object.assign(elements.floating.style, {
              width: popupWidth ? popupWidth : 'auto',
              minWidth: typeof minWidth === 'number' ? `${minWidth}px` : minWidth,
              maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
              maxHeight: `${maxHeight}px`,
            });
            const scrollAreaViewport = elements.floating.querySelector(
              '[data-radix-scroll-area-viewport]',
            );
            if (scrollAreaViewport) {
              (scrollAreaViewport as HTMLElement).style.maxHeight = `${maxHeight}px`;
            }
          },
        }),
      ],
    });

    useEffect(() => {
      update();
    }, [filteredCount, search, update]);

    if (!open) return null;

    return (
      <FloatingPortal root={portalContainer}>
        <div
          className={cn(
            'shadow-elevation-2-bottom rounded-sm border border-stroke-border-2 border-solid bg-white box-border',
            'overflow-hidden z-tooltip',
          )}
          data-state={open ? 'open' : 'closed'}
          data-testid="FloatingContent-root"
          onMouseEnter={() => {
            setOnScrollbar?.(true);
          }}
          onMouseLeave={() => {
            setOnScrollbar?.(false);
          }}
          ref={(el) => {
            refs.setFloating(el);
            if (typeof ref === 'function') {
              ref(el);
            } else if (ref) {
              ref.current = el;
            }
          }}
          style={floatingStyles}
        >
          {children}
        </div>
      </FloatingPortal>
    );
  },
);

FloatingContent.displayName = 'FloatingContent';

export default FloatingContent;
