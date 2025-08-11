import React from 'react';
import { cn } from '../../lib/utils';

interface FieldGroupProps {
  children: React.ReactNode;
  className?: string;
}

const FieldGroup = ({ children, className = '' }: FieldGroupProps) => {
  return (
    <div className={cn('PFormFieldGroup-root grid gap-y-2 grid-cols-[minmax(0,100%)]', className)}>
      {children}
    </div>
  );
};

FieldGroup.displayName = 'FieldGroup';

export default FieldGroup;
