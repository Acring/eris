import React, { forwardRef, useState } from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import type { DropResult } from 'react-beautiful-dnd';
import { DragDropContext } from 'react-beautiful-dnd';
import { cn, reorder } from '../../lib/utils';
import type { TabItemType, TabsProps } from './type';
import { TabList } from './TabList';
import { TabsContent } from './TabsContent';

const DraggableTabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    { fullHeight, tabs, onOrder, defaultActiveKey, onChange, activeKey, className, ...rest },
    ref,
  ) => {
    const [showIcon, setShowIcon] = useState(false);
    const handleDragEnd = (result: DropResult) => {
      setShowIcon(false); // 拖拽结束时，将非 hover 的 Tab 取消 Icon 显示
      document.body.style.cursor = '';
      if (!result.destination) return;
      const items = reorder(tabs, result.source.index, result.destination.index);
      onOrder && onOrder(items as TabItemType[]);
    };

    const handleDragStart = () => {
      // 除了 hover 在 Tab 需要显示 Icon， 当开始拖拽时也需要显示其他非拖拽的 Tab 前的 Icon;
      setShowIcon(true);
      document.body.style.cursor = 'move';
    };

    return (
      <TabsPrimitive.Root
        className={cn('flex flex-col', { 'h-full': fullHeight }, className)}
        data-testid="Tabs-root"
        defaultValue={defaultActiveKey}
        onValueChange={onChange}
        ref={ref}
        value={activeKey}
      >
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-expect-error */}
        <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
          <TabList onOrder={onOrder} showIcon={showIcon} tabs={tabs} {...rest} />
          <TabsContent className={rest.classes?.tabContent} fullHeight={fullHeight} tabs={tabs} />
        </DragDropContext>
      </TabsPrimitive.Root>
    );
  },
);

DraggableTabs.displayName = 'DraggableTabs';

export default DraggableTabs;
