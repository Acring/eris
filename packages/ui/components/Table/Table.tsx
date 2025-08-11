import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Owner: 刘圳
 *
 * Figma: https://www.figma.com/file/Do849NlMKTXCv8djOFIFWA/%E9%80%9A%E7%94%A8%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?type=design&node-id=11723-60146&mode=design
 *
 * 表格组件
 */
const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <table
      className={cn('text-text-1 w-full border-separate border-spacing-0', className)}
      ref={ref}
      {...props}
    />
  ),
);
Table.displayName = 'Table';

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => <thead className={cn('', className)} ref={ref} {...props} />);
TableHeader.displayName = 'TableHeader';

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => <tbody className={cn('', className)} ref={ref} {...props} />);
TableBody.displayName = 'TableBody';

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    className={cn('bg-primary text-primary-foreground font-medium', className)}
    ref={ref}
    {...props}
  />
));
TableFooter.displayName = 'TableFooter';

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement> & { isSubTable?: boolean }
>(({ className, isSubTable = false, ...props }, ref) => (
  <tr
    className={cn('transition-colors', isSubTable ? 'group/sub-row' : 'group/row', className)}
    ref={ref}
    {...props}
  />
));
TableRow.displayName = 'TableRow';

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    className={cn(
      'bg-fill-1 text-body text-text-3 box-border px-2 py-[12px] text-left align-middle font-normal transition',
      'first:pl-3',
      className,
    )}
    ref={ref}
    {...props}
  />
));
TableHead.displayName = 'TableHead';

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    className={cn(
      'text-body text-text-1 box-border bg-white px-2 py-[12px] align-middle transition',
      'border-b-divider-solid border-0 border-b border-solid',
      'group-hover/row:bg-grey-50 group-active/row:bg-grey-100',
      'group-active/expand-wrapper:bg-fill-1',
      'group-hover/sub-row:bg-fill-2 group-active/sub-row:!bg-fill-2',
      'first:pl-3',
      className,
    )}
    ref={ref}
    {...props}
  />
));
TableCell.displayName = 'TableCell';

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell };
