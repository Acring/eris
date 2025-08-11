import type { SortDirection } from '@tanstack/react-table';
import React from 'react';
import { cn } from '../../lib/utils';

export default function TableSort({ order }: { order: SortDirection | false }) {
  return (
    <div
      className={cn(
        'group box-border flex h-2 w-2 flex-col items-center justify-between px-[4.5px] py-[2.5px]',
      )}
      data-sort-order={order}
    >
      <div
        className={cn(
          'width-0 height-0 transition',
          'border-b-icon-filled-normal border-x-4 border-b-4 border-t-0 border-solid border-x-transparent',
          'group-data-[sort-order="asc"]:border-b-primary-normal',
        )}
      />
      <div
        className={cn(
          'width-0 height-0 transition',
          ' border-t-icon-filled-normal border-x-4 border-b-0 border-t-4 border-solid border-x-transparent',
          'group-data-[sort-order="desc"]:border-t-primary-normal',
        )}
      />
    </div>
  );
}
