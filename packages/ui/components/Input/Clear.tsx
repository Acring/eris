import { ErrorLine16 } from '@xsky/eris-icons';
import React from 'react';
import { IconButton } from '../IconButton';

/**
 * Input 及 Textarea 的清空按钮
 * @param param0
 * @returns
 */
export default function Clear({
  onClear,
  className,
  ...rest
}: {
  onClear: () => void;
  className?: string;
}) {
  return (
    <IconButton className={className} onClick={onClear} {...rest}>
      <ErrorLine16 />
    </IconButton>
  );
}
