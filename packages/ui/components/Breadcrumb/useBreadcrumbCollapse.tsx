'use client';
import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { useMemo, useEffect, useState } from 'react';

import { BreadcrumbPage } from './Component';
import type { BreadcrumbRouteItem, BreadcrumbRoute } from './type';
import _ from 'lodash';

const getElementWidth = (element: HTMLElement | null) => {
  return element ? element.offsetWidth : 0;
};

const getItemsWidth = async (
  routes: BreadcrumbRoute[],
  setMinimizedMaxRoutes: React.Dispatch<React.SetStateAction<number[]>>,
) => {
  const maxItemWidth = 360;

  const getWidthsPromise = (routes: BreadcrumbRoute[], maxItemWidth: number) => {
    const promises = routes.map((route, index) => {
      const tempDiv = document.createElement('div');
      tempDiv.style.position = 'absolute';
      tempDiv.style.visibility = 'hidden';

      return new Promise((resolve) => {
        const root = ReactDOM.createRoot(tempDiv);
        root.render(
          route.renderItem ? (
            route.renderItem(route)
          ) : (
            <BreadcrumbPage className="max-w-none">{route.name}</BreadcrumbPage>
          ),
        );
        const observerObject = new ResizeObserver(() => {
          const width = tempDiv.offsetWidth;
          if (width) {
            const isOverflow = maxItemWidth < width;
            document.body.removeChild(tempDiv);
            root.unmount();
            if (isOverflow) {
              setMinimizedMaxRoutes((prev) => [...prev, index]);
            }
            observerObject.disconnect();
            resolve(isOverflow ? maxItemWidth : width);
          }
        });
        document.body.appendChild(tempDiv);
        observerObject?.observe(tempDiv);
      });
    });

    return Promise.all(promises);
  };

  const widths = await getWidthsPromise(routes, maxItemWidth);
  return widths as number[];
};

/**
 * 面包屑导航多层级截断规则
 *
 * 当面包屑导航栏的空间不足以显示所有层级时，将按照以下规则进行文本省略和折叠：
 * 1. 首先判断面包屑组件空间是否足够，如果不足够时按下面逻辑展示
 * 2. 第2个历史页面条目至倒数第2个进行文本省略规则：
 *    - 优先从第2个历史页面条目开始进行文本省略。
 *    - 每个被省略的文本的最小宽度为48px，如果某个文本的宽度不足48px，则跳过不进行省略。
 *    - 当第2个至倒数第2个条目的所有文本省略后的总宽度达到最小宽度要求后，按顺序进行折叠隐藏，折叠会用占位符...来展示（...的宽度计算为16），鼠标移上去用popover展示隐藏项，
 * 3. 当第2个至倒数第2个条目进行折叠后宽度仍然不够，则对第1个历史页面条目进行文本折叠
 * 4. 当第一个历史页面条目折叠后仍然不足，对当前页面条目进行文本省略，但该条目的省略最小宽度为180px。
 */

export const useBreadcrumbCollapse = (routes: BreadcrumbRoute[], autoCollapse = true) => {
  const [minimizedRoutes, setMinimizedRoutes] = useState<number[]>([]);
  const [minimizedMaxRoutes, setMinimizedMaxRoutes] = useState<number[]>([]);
  const [collapsedRoutes, setCollapsedRoutes] = useState<number[]>([]);
  const [waitCalculate, setWaitCalculate] = useState<boolean>(false);
  const [remainingWidth, setRemainingWidth] = useState<number>(0);
  const [itemsWidth, setItemsWidth] = useState<number[]>([]);
  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (routes.length > 0) {
      // 重置相关状态，避免使用过时的数据
      setMinimizedMaxRoutes([]);
      setItemsWidth([]);
      setMinimizedRoutes([]);
      setCollapsedRoutes([]);
      setRemainingWidth(0);

      getItemsWidth(routes, setMinimizedMaxRoutes).then(setItemsWidth);
    } else {
      setItemsWidth([]);
      setMinimizedRoutes([]);
      setCollapsedRoutes([]);
      setRemainingWidth(0);
    }
  }, [routes]);

  const calculateCollapse = React.useCallback(() => {
    if (!autoCollapse) return;
    // 确保 itemsWidth 和 routes 的长度匹配，避免使用不一致的数据
    if (itemsWidth?.length === 0 || itemsWidth.length !== routes.length) return;

    const containerWidth = getElementWidth(containerRef.current);
    const minItemWidth = 48;
    const minCurrentItemWidth = 180;
    const ellipsisWidth = 16;
    const separatorWidth = 16 + 2 * 4; // 分隔符宽度 + 间隔
    const newCollapsedRouteIndex: number[] = []; // 折叠项
    const newMinimizedRouteIndex: number[] = []; // 空间不够省略... 项

    let remainingWidth = containerWidth;
    let isCurrentEllipsis = false;

    // 只有在需要复杂计算时才设置等待状态
    setWaitCalculate(true);

    const addCollapsedRouteIndex = (start: number, end: number) => {
      for (let i = start; i < end; i++) {
        newCollapsedRouteIndex.push(i);
      }
    };
    // 计算当前条目
    const calculateCurrent = () => {
      const index = routes.length - 1;
      const currentItemWidth = itemsWidth[index];
      const minItemWidth = minCurrentItemWidth;
      if (remainingWidth < currentItemWidth) {
        newMinimizedRouteIndex.push(index);
        isCurrentEllipsis = true;
        remainingWidth -= minItemWidth;
      } else {
        remainingWidth -= itemsWidth[index];
      }
    };
    // 第一个条目
    const calculateFirst = () => {
      if (remainingWidth > 0) {
        if (remainingWidth < itemsWidth[0]) {
          if (remainingWidth >= minItemWidth) {
            newMinimizedRouteIndex.push(0);
            remainingWidth -= minItemWidth;
          } else {
            newCollapsedRouteIndex.push(0);
            remainingWidth -= ellipsisWidth;
          }
        } else {
          remainingWidth -= itemsWidth[0];
        }
      } else {
        newCollapsedRouteIndex.push(0);
      }
    };
    // 计算中间条目
    const calculateMiddle = (start: number, end: number) => {
      let allMinimized = true;

      for (let i = start; i <= end; i++) {
        const itemWidth = Math.min(itemsWidth[i], minItemWidth);
        if (remainingWidth >= itemWidth + separatorWidth) {
          remainingWidth -= itemWidth + separatorWidth;
        } else {
          remainingWidth -= itemWidth + separatorWidth;
          allMinimized = false;
        }
      }

      return allMinimized;
    };

    switch (routes.length) {
      case 0:
        break;
      case 1:
        calculateCurrent();
        break;
      case 2:
        // 预留折叠的宽度
        remainingWidth -= separatorWidth + ellipsisWidth;
        calculateCurrent();
        if (!isCurrentEllipsis) {
          remainingWidth += ellipsisWidth;
          calculateFirst();
        }
        break;
      default:
        // 预留折叠的宽度
        remainingWidth -= separatorWidth + ellipsisWidth;
        calculateCurrent();
        if (!isCurrentEllipsis) {
          // 首先还原折叠的宽度 ellipsisWidth，预留中间条目折叠时的宽度 separatorWidth + ellipsisWidth
          remainingWidth -= separatorWidth;
          calculateFirst();
          const collapsedOtherRoute =
            newMinimizedRouteIndex.includes(0) || newCollapsedRouteIndex.includes(0);
          if (!collapsedOtherRoute) {
            // 先判断所有条目都省略到最小宽度时，剩余宽度是否足够
            remainingWidth += separatorWidth + ellipsisWidth;
            const allMinimized = calculateMiddle(1, routes.length - 2);

            if (allMinimized) {
              // 如果剩余宽度足够，从倒数第2个条目到第2个条目进行全量展示
              let tempMinimized = false; // 如果该条目已经省略，那么之后的也省略
              for (let i = routes.length - 2; i >= 1; i--) {
                if (tempMinimized) {
                  newMinimizedRouteIndex.push(i);
                } else {
                  // 剩余状态和全展示状态的差值
                  const subWidth = Math.min(itemsWidth[i], minItemWidth);
                  const itemWidth = itemsWidth[i];
                  if (remainingWidth >= itemWidth - subWidth) {
                    remainingWidth -= itemWidth - subWidth > 0 ? itemWidth - subWidth : 0;
                  } else {
                    newMinimizedRouteIndex.push(i);
                    tempMinimized = true;
                  }
                }
              }
            } else {
              // 如果剩余宽度不够，从第2个条目到倒数第2个条目进行折叠
              let collapsing = false;
              remainingWidth -= ellipsisWidth + separatorWidth;
              for (let i = 1; i < routes.length - 1; i++) {
                if (collapsing) {
                  newMinimizedRouteIndex.push(i);
                } else {
                  const subWidth = Math.min(itemsWidth[i], minItemWidth);
                  newCollapsedRouteIndex.push(i);
                  remainingWidth += subWidth + separatorWidth;
                  if (remainingWidth > 0) {
                    collapsing = true;
                  }
                }
              }
            }
          } else {
            addCollapsedRouteIndex(1, routes.length - 1);
          }
        } else {
          addCollapsedRouteIndex(0, routes.length - 1);
        }
        break;
    }
    setMinimizedRoutes(newMinimizedRouteIndex);
    setCollapsedRoutes(newCollapsedRouteIndex);
    setWaitCalculate(false);
    setRemainingWidth(remainingWidth);
  }, [routes, autoCollapse, itemsWidth]);

  useEffect(() => {
    if (!containerRef.current || itemsWidth.length === 0) {
      return;
    }
    calculateCollapse();

    const observerObject = new ResizeObserver(
      _.debounce(() => {
        calculateCollapse();
      }, 100),
    );
    observerObject?.observe(containerRef.current);
    return () => {
      observerObject.disconnect();
    };
  }, [calculateCollapse]);

  const displayRoutes = useMemo<BreadcrumbRouteItem[]>(() => {
    // 在计算期间或数据不一致时，返回基础的路由映射而不是空数组，避免闪烁
    if (waitCalculate || itemsWidth.length !== routes.length || itemsWidth.length === 0) {
      return routes.map((route) => ({
        ...route,
        withTooltip: false,
        maxWidth: 'auto' as const,
      }));
    }

    const startIndex = collapsedRoutes.includes(0) ? 0 : 1;
    const resultRoutes = routes.map((val, ind) => {
      const isLast = ind === routes?.length - 1;
      const maxWidth = minimizedRoutes.includes(ind)
        ? isLast
          ? 180
          : 48
        : minimizedMaxRoutes.includes(ind)
          ? 360
          : 0;
      const withTooltip = !!maxWidth;
      const addIndex = _.max(_.difference(minimizedRoutes, collapsedRoutes));
      const maxWidthVal = addIndex === ind ? maxWidth + remainingWidth : maxWidth;
      return {
        ...val,
        withTooltip,
        maxWidth: !maxWidthVal ? 'auto' : maxWidthVal,
      };
    }, []) as BreadcrumbRouteItem[];
    if (collapsedRoutes?.length === 0) {
      return resultRoutes;
    }
    const collapsedRoute = resultRoutes.slice(startIndex, startIndex + collapsedRoutes.length);
    const ellipsisRoute: BreadcrumbRouteItem = {
      name: '...',
      maxWidth: 'auto',
      routes: collapsedRoute,
    };
    resultRoutes.splice(startIndex, collapsedRoutes.length, ellipsisRoute);
    return resultRoutes;
  }, [
    collapsedRoutes,
    minimizedRoutes,
    waitCalculate,
    minimizedMaxRoutes,
    remainingWidth,
    routes,
    itemsWidth,
  ]);
  return { displayRoutes, containerRef };
};
