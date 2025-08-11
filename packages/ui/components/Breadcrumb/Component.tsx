'use client';
// update by https://ui.shadcn.com/docs/components/breadcrumb
import * as React from 'react';
import { RightLine16 } from '@xsky/eris-icons';

import { cn } from '@/lib/utils';

const BreadcrumbList = React.forwardRef<HTMLOListElement, React.ComponentPropsWithoutRef<'ol'>>(
  ({ className, ...props }, ref) => (
    <ol
      className={cn(
        'text-body text-text-2 m-0 flex flex-wrap items-center gap-[4px] overflow-hidden break-words p-0',
        className,
      )}
      data-testid="Breadcrumb-list"
      ref={ref}
      {...props}
    />
  ),
);
BreadcrumbList.displayName = 'BreadcrumbList';

const BreadcrumbItem = React.forwardRef<HTMLLIElement, React.ComponentPropsWithoutRef<'li'>>(
  ({ className, ...props }, ref) => (
    <li
      className={cn('inline-flex items-center', className)}
      data-testid="Breadcrumb-item"
      ref={ref}
      {...props}
    />
  ),
);
BreadcrumbItem.displayName = 'BreadcrumbItem';

const breadTextCommon =
  'max-w-[360px] overflow-hidden text-ellipsis whitespace-nowrap inline-block';

const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, React.ComponentPropsWithoutRef<'span'>>(
  ({ className, ...props }, ref) => {
    return (
      <span
        className={cn(
          'text-text-2 hover:text-primary-hover cursor-pointer',
          breadTextCommon,
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
BreadcrumbLink.displayName = 'BreadcrumbLink';

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<'span'>>(
  ({ className, ...props }, ref) => (
    <span className={cn('text-text-2', breadTextCommon, className)} ref={ref} {...props} />
  ),
);
BreadcrumbPage.displayName = 'BreadcrumbPage';

const BreadcrumbSeparator = ({ children, className, ...props }: React.ComponentProps<'li'>) => (
  <li
    aria-hidden="true"
    className={cn('inline-flex list-none items-center text-icon-filled-normal', className)}
    role="presentation"
    {...props}
  >
    {children ?? <RightLine16 />}
  </li>
);
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

export { BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator };
