'use client';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { MoreLine16 } from '@xsky/eris-icons';

import {
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './Component';
import Tooltip from '../Tooltip/Tooltip';
import Popover from '../Popover/Popover';
import { useBreadcrumbCollapse } from './useBreadcrumbCollapse';
import { IconButton } from '../IconButton';
import type { BreadcrumbProps, BreadcrumbRouteItem, maxWidth } from './type';

const BreadcrumbRoute = ({
  route,
  index,
  renderItem,
  onClickItem,
  className: breadcrumbRouteClassName,
}: {
  route: BreadcrumbRouteItem;
  index: number;
  renderItem?: (route: any, maxWidth?: maxWidth) => React.ReactNode;
  onClickItem?: (route: any, e: React.MouseEvent<HTMLSpanElement>) => void;
  className?: string;
}) => {
  const { routes, maxWidth, withTooltip, className } = route;
  const isEllipsis = !!routes?.length;
  const getItem = (route: BreadcrumbRouteItem) => {
    const { maxWidth, withTooltip, renderItem } = route;
    // 弹出框中仅对超出最大宽度的条目省略
    const showTooltip = withTooltip && maxWidth === 360;
    const content = renderItem ? (
      renderItem(route, maxWidth)
    ) : route.path ? (
      <BreadcrumbLink onClick={(e) => onClickItem && onClickItem(route, e)}>
        {route.name}
      </BreadcrumbLink>
    ) : (
      <BreadcrumbPage>{route.name}</BreadcrumbPage>
    );
    return showTooltip ? (
      <Tooltip className="max-w-[480px]" title={route.name}>
        {content}
      </Tooltip>
    ) : (
      <>{content}</>
    );
  };
  const content = renderItem ? (
    renderItem(route, maxWidth)
  ) : isEllipsis ? (
    <Popover
      className="max-w-[480px]"
      content={
        <BreadcrumbList className="max-w-[448px]">
          {routes.map((route, index) => {
            const isLast = index === routes.length - 1;
            return (
              <React.Fragment key={index}>
                {getItem(route)}
                {!isLast && <BreadcrumbSeparator />}
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      }
    >
      <IconButton className={cn('flex items-center justify-center')}>
        <MoreLine16 size={14} />
      </IconButton>
    </Popover>
  ) : withTooltip ? (
    <Tooltip className="max-w-[480px]" title={route.name}>
      <div className={cn('overflow-hidden text-ellipsis whitespace-nowrap')} style={{ maxWidth }}>
        {route.name}
      </div>
    </Tooltip>
  ) : (
    route.name
  );

  return (
    <BreadcrumbItem key={index}>
      {route.path ? (
        <BreadcrumbLink
          className={cn(className, breadcrumbRouteClassName)}
          onClick={(e) => onClickItem && onClickItem(route, e)}
        >
          {content}
        </BreadcrumbLink>
      ) : (
        <BreadcrumbPage className={cn(className, breadcrumbRouteClassName)}>
          {content}
        </BreadcrumbPage>
      )}
    </BreadcrumbItem>
  );
};

/**
 * Owner: 廖玉良
 *
 * Figma: https://www.figma.com/file/Do849NlMKTXCv8djOFIFWA/%E9%80%9A%E7%94%A8%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?type=design&node-id=11723-60167&mode=design
 *
 * 面包屑组件，用于展示面包屑。
 */
const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, routes, autoCollapse = true, onClickItem, ...props }, ref) => {
    const { displayRoutes, containerRef } = useBreadcrumbCollapse(routes, autoCollapse);
    return (
      <nav
        aria-label="breadcrumb"
        className={className}
        data-testid="Breadcrumb-root"
        ref={ref}
        {...props}
      >
        <div className="breadcrumb-container" ref={containerRef}>
          <BreadcrumbList className="flex-nowrap">
            {displayRoutes.map((route, index) => {
              const isLast = index === displayRoutes.length - 1;
              return (
                <React.Fragment key={index}>
                  <BreadcrumbRoute
                    className={cn({ 'text-text-1': isLast })}
                    index={index}
                    onClickItem={onClickItem}
                    renderItem={route.renderItem}
                    route={route}
                  />
                  {!isLast && <BreadcrumbSeparator />}
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </div>
      </nav>
    );
  },
);

Breadcrumb.displayName = 'Breadcrumb';

export default Breadcrumb;
