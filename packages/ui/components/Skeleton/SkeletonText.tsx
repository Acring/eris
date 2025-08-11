/**
 * 用于展示文本骨架屏
 */
import React from 'react';

import Skeleton from './Skeleton';
import { cn } from '../../lib/utils';

function SkeletonText({
  rows,
  className,
  startRow = 1,
}: {
  rows: number;
  className?: string;
  startRow?: number;
}) {
  const lines = [
    { width: cn('w-skeleton-width-md') },
    { width: cn('w-skeleton-width-xl') },
    { width: cn('w-skeleton-width-lg') },
    { width: cn('w-skeleton-width-sm') },
    { width: cn('w-skeleton-width-lg') },
    { width: cn('w-skeleton-width-md') },
    { width: cn('w-skeleton-width-lg') },
    { width: cn('w-skeleton-width-md') },
    { width: cn('w-skeleton-width-xl') },
    { width: cn('w-skeleton-width-lg') },
  ];
  return (
    <div className={cn('grid gap-y-2', className)}>
      {[...Array(rows)].map((_, index) => (
        <Skeleton className={lines[(index + startRow - 1) % lines.length].width} key={index} />
      ))}
    </div>
  );
}

SkeletonText.displayName = 'SkeletonText';

export default SkeletonText;
