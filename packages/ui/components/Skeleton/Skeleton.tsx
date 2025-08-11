import React from 'react';

import { cn } from '../../lib/utils';

/**
 * Owner: 廖玉良
 *
 * Figma: https://www.figma.com/file/Do849NlMKTXCv8djOFIFWA/%E9%80%9A%E7%94%A8%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?type=design&node-id=11723-60161&mode=design
 *
 * 骨架屏组件，用于展示加载状态。
 */
function Skeleton(props: React.HTMLAttributes<HTMLDivElement>) {
  const { className, ...rest } = props;
  return (
    <div
      className={cn(
        'h-skeleton-height-xs w-skeleton-width-xl rounded-sm animate-skeleton bg-grey-400',
        className,
      )}
      {...rest}
    />
  );
}

Skeleton.displayName = 'Skeleton';

export default Skeleton;
