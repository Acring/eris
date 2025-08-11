import * as React from 'react';
import lodash from 'lodash';
import { cn } from '../../lib/utils';
import { Popover } from '../Popover';
import { formatPercent, getBgColor } from './utils';
import { DEFAULT_COLOR_VALUE, PRIMARY_BG_COLOR } from './constant';

import Rectangle from './Rectangle';
import Circle from './Circle';
import Mini from './Mini';
import type { LineProgressProps } from './type';

interface ProgressProps extends React.ForwardRefExoticComponent<LineProgressProps> {
  Rectangle: typeof Rectangle;
  Circle: typeof Circle;
  Mini: typeof Mini;
}

/**
 * Owner: 陈胜
 *
 * Figma: https://www.figma.com/file/Do849NlMKTXCv8djOFIFWA/%E9%80%9A%E7%94%A8%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?type=design&node-id=11723-60155&mode=design
 *
 * 进度条组件
 */
const Progress = React.forwardRef<HTMLDivElement, LineProgressProps>((props, ref) => {
  const {
    className,
    disable,
    popoverProps,
    showInfo = true,
    rightInfo,
    color = DEFAULT_COLOR_VALUE,
    segmentation,
    size = 'sm',
    strokeColor,
  } = props;
  const percent = formatPercent(props);

  const currentSegmentation = React.useMemo(() => {
    return lodash.isEmpty(segmentation)
      ? {
          [color]: percent,
        }
      : segmentation;
  }, [percent, segmentation, color]);

  const lastColor = lodash.last(lodash.keys(currentSegmentation));

  const currentPopoverProps = React.useMemo(() => {
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
    <div
      className={cn('w-full', className, {
        'inline-flex': showInfo && !!rightInfo,
      })}
      ref={ref}
    >
      <div className="mr-[8px] pt-[8px] w-full">
        <Popover {...currentPopoverProps}>
          <div
            className={cn('relative mb-[4px] flex overflow-hidden rounded-full', PRIMARY_BG_COLOR, {
              'h-[6px]': size === 'sm',
              'h-[8px]': size === 'lg',
            })}
            data-testid="Progress-full"
          >
            {lodash.map(currentSegmentation, (percent, color) => {
              return (
                <div
                  className={cn(
                    'ease-[cubic-bezier(0.65, 0, 0.35, 1)] h-full transition-transform duration-700',
                    getBgColor(color, segmentation),
                    lodash.keys(currentSegmentation).length === 1 && 'rounded-full',
                    lastColor !== color && 'mr-[1px]',
                    disable && 'rounded-r-none',
                  )}
                  data-testid="Progress-cover"
                  key={color}
                  style={{
                    width: (percent as number) >= 100 ? '100%' : `${percent}%`,
                    minWidth: percent && percent > 0 ? '1px' : 0,
                    marginRight: (percent as number) >= 100 ? 0 : '1px',
                    backgroundColor: strokeColor,
                  }}
                />
              );
            })}
            {disable ? (
              <div
                className={cn('ml-auto h-full')}
                style={{
                  flex: `0 0 ${disable}%`,
                  minWidth: disable > 0 ? '1px' : 0,
                  background: `repeating-linear-gradient(
                    -45deg,
                    var(--text-4) 0.01px,
                    white 2px,
                    white 3px,
                    var(--text-4) 0.04px
                  )`,
                }}
              />
            ) : null}
          </div>
        </Popover>
      </div>
      {showInfo ? (
        <div className="text-text-1 whitespace-nowrap">{rightInfo || `${percent}%`}</div>
      ) : null}
    </div>
  );
}) as ProgressProps;

Progress.displayName = 'Progress';

Progress.Rectangle = Rectangle;
Progress.Circle = Circle;
Progress.Mini = Mini;

export default Progress;
