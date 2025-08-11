/**
 * 用于展示段落的骨架屏
 */
import React from 'react';

import Skeleton from './Skeleton';
import { cn } from '../../lib/utils';

const SkeletonParagraph = ({ rows, className }: { rows: number; className?: string }) => {
  return (
    <div className={cn('grid gap-y-2', className)}>
      {[...Array(rows)].map((_, index) => (
        <Skeleton className="last:w-skeleton-width-md" key={index} />
      ))}
    </div>
  );
};

SkeletonParagraph.displayName = 'SkeletonParagraph';

export default SkeletonParagraph;
