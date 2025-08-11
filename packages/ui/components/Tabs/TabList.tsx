import * as TabsPrimitive from '@radix-ui/react-tabs';
import React, { useRef, useState, useEffect } from 'react';
import { LeftLine16, RightLine16, PlusLine16 } from '@xsky/eris-icons';
import type { DroppableProvided, DroppableStateSnapshot } from 'react-beautiful-dnd';
import { Droppable } from 'react-beautiful-dnd';
import { cn } from '../../lib/utils';
import TabButton from './TabButton';
import type { TabsProps } from './type';
import { DraggableTab } from './DraggableTab';
import { tabListContainerVariants, arrowVariants, tabListVariants } from './commonComponents';
import { IconButton } from '../IconButton';

export const TabList = (props: TabsProps & { showIcon?: boolean }) => {
  const leftScrollDistance = useRef<number[]>([]);
  const rightScrollDistance = useRef<number[]>([]);

  const { tabs, scrollable, disabledAdd, showIcon = false, onAdd, onOrder, ...rest } = props;
  const tabListRef = useRef<HTMLDivElement>(null);
  const [tabListWidth, setTabListWidth] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [lineData, setLineData] = useState({ left: 0, width: 0 });
  const [init, setInit] = useState(true);

  useEffect(() => {
    // 查找选中的元素，定位偏移量和选中元素的宽度
    const activeButton = tabListRef.current?.querySelector(
      `button[data-value="${props.activeKey || props.defaultActiveKey}"]`,
    ) as HTMLButtonElement;
    if (activeButton) {
      setLineData({ left: activeButton.offsetLeft, width: activeButton.clientWidth });
    }
  }, [props.activeKey, props.defaultActiveKey]);

  useEffect(() => {
    if (tabListRef.current) {
      // 减去向右按钮的宽度
      setTabListWidth(tabListRef.current.clientWidth - 34);
    }
  }, []);

  const handleScroll = () => {
    if (tabListRef.current) {
      const canScrollRight =
        tabListRef.current.scrollLeft <
        tabListRef.current.scrollWidth - tabListRef.current.clientWidth;
      setShowRightArrow(canScrollRight);
      setShowLeftArrow(tabListRef.current.scrollLeft > 0);
    }
  };

  const handleArrowClick = (arrowDirection: string) => {
    if (tabListRef.current) {
      const scrollLeft = showLeftArrow ? tabListWidth - 34 : tabListWidth;
      const isFullScroll =
        tabListRef.current.scrollWidth - tabListRef.current.scrollLeft >=
        tabListRef.current.clientWidth;
      if (arrowDirection === 'left') {
        const leftScroll = leftScrollDistance.current.pop() || scrollLeft;
        tabListRef.current.scrollLeft -= leftScroll;
        rightScrollDistance.current.push(isFullScroll ? leftScroll : tabListWidth);
      } else {
        const rightScroll = rightScrollDistance.current.pop() || scrollLeft;
        tabListRef.current.scrollLeft += rightScroll;
        leftScrollDistance.current.push(tabListWidth ? rightScroll : tabListWidth);
      }
    }
  };

  useEffect(() => {
    setShowRightArrow(tabListRef.current?.scrollWidth !== tabListRef.current?.offsetWidth);
  }, [tabs]);

  return (
    <div className={cn(tabListContainerVariants())}>
      {scrollable ? (
        <IconButton
          className={cn('relative', arrowVariants({ showLeftArrow, left: true, size: rest.size }))}
          onClick={() => {
            handleArrowClick('left');
          }}
        >
          <LeftLine16 />
          <span className="absolute right-[-8px] top-0 block h-full w-[6px] shadow-[rgba(0,0,0,0.05)_3px_0px_3px_-3px_inset,rgba(0,0,0,0.03)_4px_0px_4px_-4px_inset,rgba(0,0,0,0.06)_8px_0px_8px_-8px_inset]" />
        </IconButton>
      ) : null}
      {onOrder ? (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        <Droppable direction="horizontal" droppableId="dropTabs">
          {(
            droppableProvided: DroppableProvided,
            droppableStateSnapshot: DroppableStateSnapshot,
          ) => (
            <div
              className={cn(tabListVariants({ scrollable }), props.classes?.tabList)}
              onScroll={handleScroll}
              ref={tabListRef}
            >
              <TabsPrimitive.List
                className={cn('flex', { 'bg-grey-300': droppableStateSnapshot.isDraggingOver })}
                ref={droppableProvided.innerRef}
                {...droppableProvided.droppableProps}
              >
                {tabs
                  .filter((tab) => !tab.hidden)
                  .map(({ key, label, disabled }, index) => {
                    return (
                      <DraggableTab
                        {...rest}
                        disabled={disabled}
                        hasOrder={Boolean(onOrder)}
                        index={index}
                        key={key}
                        label={label}
                        scrollable={scrollable}
                        showIcon={showIcon}
                        value={key}
                      />
                    );
                  })}
                {droppableProvided.placeholder as any}
              </TabsPrimitive.List>
            </div>
          )}
        </Droppable>
      ) : (
        <TabsPrimitive.List
          className={cn(tabListVariants({ scrollable }), props.classes?.tabList)}
          onClick={() => setInit(false)}
          onScroll={handleScroll}
          ref={tabListRef}
        >
          {tabs
            .filter((tab) => !tab.hidden)
            .map(({ key, label, disabled }) => (
              <TabsPrimitive.Trigger asChild disabled={disabled} key={key} value={key}>
                <TabButton {...props} onChange={void 0} scrollable={scrollable} tabKey={key}>
                  {label}
                </TabButton>
              </TabsPrimitive.Trigger>
            ))}
          {rest.type === 'line' && rest.activeKey !== '' && (
            <div
              className={cn('absolute bottom-0 h-[2px] bg-primary-normal', {
                'transition-[left,width] duration-300': !init,
              })}
              style={{ left: `${lineData.left}px`, width: `${lineData.width}px` }}
            />
          )}
        </TabsPrimitive.List>
      )}
      {scrollable ? (
        <IconButton
          className={cn('relative', arrowVariants({ showRightArrow, size: rest.size }))}
          onClick={() => {
            handleArrowClick('right');
          }}
        >
          <RightLine16 />
          <span className="absolute left-[-8px] top-0 block h-full w-[6px] shadow-[rgba(0,0,0,0.05)_-3px_0px_3px_-3px_inset,rgba(0,0,0,0.03)_-4px_0px_4px_-4px_inset,rgba(0,0,0,0.06)_-8px_0px_8px_-8px_inset]" />
        </IconButton>
      ) : null}
      {onAdd ? (
        <IconButton
          className={cn(arrowVariants({ size: rest.size }), 'align-items flex ml-[2px]')}
          data-control="add"
          disabled={disabledAdd}
          onClick={onAdd}
        >
          <PlusLine16 />
        </IconButton>
      ) : null}
    </div>
  );
};
