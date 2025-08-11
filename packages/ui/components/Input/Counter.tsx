import React from 'react';
import { cn } from '../../lib/utils';

/**
 * Input 及 Textarea 的计数器
 * @param param0
 * @returns
 */
export default function Counter({
  value,
  maxCount,
  className,
}: {
  value: string;
  maxCount?: number;
  className?: string;
}) {
  return (
    <div className={cn('text-body text-text-3', className)}>
      {value.length}/{maxCount}
    </div>
  );
}
