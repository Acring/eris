import React, { useMemo } from 'react';
import { Popover } from '../Popover';
import { cn } from '../../lib/utils';
import { DEFAULT_COLOR_VALUE, VARIANTS } from './constant';
import type { CircleProgressProps } from './type';
//圆的半径
const CIRCLE_RADIUS = 56;

//环的宽度
const RING_WIDTH = 6;

const Circle = React.forwardRef<HTMLDivElement, CircleProgressProps>((props, ref) => {
  const {
    percent = 0,
    color = DEFAULT_COLOR_VALUE,
    className = '',
    popoverProps,
    middleInfo,
    showInfo = true,
    circleRadius,
    ringWidth,
    strokeColor,
  } = props;
  const currentCircleRadius = circleRadius || CIRCLE_RADIUS;
  const currentDiameter = currentCircleRadius * 2;
  const currentRingWidth = ringWidth || RING_WIDTH;
  const circumference = 2 * Math.PI * (currentCircleRadius - currentRingWidth);
  const offset = (1 - percent / 100) * circumference;

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
    <Popover {...currentPopoverProps}>
      <div
        className={cn('relative', className)}
        ref={ref}
        style={{
          width: `${currentDiameter}px`,
          height: `${currentDiameter}px`,
        }}
      >
        {showInfo ? (
          <div className="text-text-1 text-title absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
            {middleInfo || `${percent}%`}
          </div>
        ) : null}
        <svg height={currentDiameter} width={currentDiameter}>
          <circle
            className="stroke-progress-bg"
            cx={currentCircleRadius}
            cy={currentCircleRadius}
            fill="transparent"
            r={currentCircleRadius - currentRingWidth}
            strokeWidth={currentRingWidth}
          />
          <circle
            cx={currentCircleRadius}
            cy={currentCircleRadius}
            fill="transparent"
            r={currentCircleRadius - currentRingWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeWidth={currentRingWidth}
            style={{
              stroke: strokeColor
                ? strokeColor
                : `var(--${VARIANTS[color]?.color || 'primary-normal'})`,
            }}
            transform={`rotate(-90 ${currentCircleRadius} ${currentCircleRadius})`}
          />
        </svg>
      </div>
    </Popover>
  );
});

Circle.displayName = 'Circle';

export default Circle;
