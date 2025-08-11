import type * as React from 'react';

export type maxWidth = number | 'auto';

export interface BreadcrumbRoute {
  className?: string;
  name: string;
  path?: string;
  renderItem?: (route: BreadcrumbRoute, maxWidth?: maxWidth) => React.ReactNode;
}

export interface BreadcrumbRouteItem extends BreadcrumbRoute {
  maxWidth?: maxWidth;
  routes?: BreadcrumbRoute[];
  withTooltip?: boolean;
}

export interface BreadcrumbProps extends React.ComponentPropsWithoutRef<'nav'> {
  routes: BreadcrumbRoute[];
  autoCollapse?: boolean;
  onClickItem?: (item: BreadcrumbRoute, e: React.MouseEvent) => void;
}
