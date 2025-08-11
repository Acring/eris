import React, { useMemo } from 'react';
import { cn, uuid } from '../../lib/utils';
import { Popover } from '../Popover';
import type { RectangleProps } from './type';
import { DEFAULT_COLOR_VALUE, PRIMARY_BG_COLOR } from './constant';
import { getBgColor } from './utils';

const RECTANGLE_COUNT = 10;

const ONE_RECTANGLE_DIV_WIDTH = 5;

const MIN_ONE_RECTANGLE_DIV_WIDTH = 1; //存在进度最小宽度

const MAX_ONE_RECTANGLE_DIV_WIDTH = ONE_RECTANGLE_DIV_WIDTH - MIN_ONE_RECTANGLE_DIV_WIDTH; //进度未满最大宽度

const RectangleProgress = React.forwardRef<HTMLDivElement, RectangleProps>((props, ref) => {
  const {
    className,
    percent = 0,
    color = DEFAULT_COLOR_VALUE,
    rightInfo,
    showInfo = true,
    popoverProps,
    strokeColor,
  } = props;

  const rectangleList = useMemo(() => {
    const rectangles: React.ReactNode[] = [];

    for (let i = 0; i < RECTANGLE_COUNT; i++) {
      let currentFontDivWidth =
        ((percent - i * RECTANGLE_COUNT) / RECTANGLE_COUNT) * ONE_RECTANGLE_DIV_WIDTH;
      if (currentFontDivWidth < MIN_ONE_RECTANGLE_DIV_WIDTH && currentFontDivWidth > 0) {
        currentFontDivWidth = MIN_ONE_RECTANGLE_DIV_WIDTH;
      } else if (
        currentFontDivWidth > MAX_ONE_RECTANGLE_DIV_WIDTH &&
        currentFontDivWidth < ONE_RECTANGLE_DIV_WIDTH
      ) {
        currentFontDivWidth = MAX_ONE_RECTANGLE_DIV_WIDTH;
      } else if (currentFontDivWidth >= ONE_RECTANGLE_DIV_WIDTH) {
        currentFontDivWidth = ONE_RECTANGLE_DIV_WIDTH;
      }
      const currentBackDivWidth = ONE_RECTANGLE_DIV_WIDTH - currentFontDivWidth;
      rectangles.push(
        <div
          className={cn('flex h-[6px] w-[5px] rounded-[1px]', {
            'mr-[2px]': i !== 9,
          })}
          key={uuid()}
        >
          {currentFontDivWidth > 0 && (
            <div
              className={cn('h-[6px] rounded-l-[1px]', getBgColor(color), {
                'rounded-r-[1px]': currentFontDivWidth >= ONE_RECTANGLE_DIV_WIDTH,
              })}
              style={{
                width: currentFontDivWidth,
                backgroundColor: strokeColor,
              }}
            />
          )}
          {currentBackDivWidth > 0 && (
            <div
              className={cn('h-[6px] rounded-r-[1px]', PRIMARY_BG_COLOR, {
                'rounded-l-[1px]': currentFontDivWidth <= 0,
              })}
              style={{
                width: currentBackDivWidth,
              }}
            />
          )}
        </div>,
      );
    }

    return rectangles;
  }, [color, percent]);

  const rightInfoComponent = React.useMemo(() => {
    return showInfo ? (
      <div className="text-text-1 h-[22px]">{rightInfo || `${percent}%`}</div>
    ) : null;
  }, [rightInfo, percent, showInfo]);

  const currentPopoverProps = useMemo(() => {
    return popoverProps
      ? {
          ...popoverProps,
          className: cn('min-w-min py-1', popoverProps.className),
        }
      : {
          open: false,
          content: '',
        };
  }, [popoverProps]);

  return (
    <div className={cn('inline-flex', className)} ref={ref}>
      <Popover {...currentPopoverProps}>
        <div className="mr-[8px] flex pt-[8px]" data-testid="RectangleProgress-full">
          {rectangleList.map((rectangle) => rectangle)}
        </div>
      </Popover>
      {rightInfoComponent}
    </div>
  );
});

RectangleProgress.displayName = 'RectangleProgress';

export default RectangleProgress;
