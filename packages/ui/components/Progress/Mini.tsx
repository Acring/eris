import React from 'react';
import lodash from 'lodash';
import { cn } from '../../lib/utils';
import Circle from './Circle';
import type { MiniProgressProps } from './type';

const Mini = React.forwardRef<HTMLDivElement, MiniProgressProps>((props, ref) => {
  const { rightInfo, className, showInfo = false } = props;
  return (
    <div className={cn('inline-flex items-center', className)} ref={ref}>
      <Circle
        {...lodash.omit(props, ['rightInfo', 'className', 'ref'])}
        circleRadius={8}
        className="mr-[4px]"
        ringWidth={2.5}
        showInfo={false}
      />
      {showInfo ? <div className="text-text-1">{rightInfo || `${props.percent}%`}</div> : null}
    </div>
  );
});

Mini.displayName = 'Mini';

export default Mini;
