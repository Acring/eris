import React, { forwardRef } from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import type { TabsProps } from './type';
import { TabList } from './TabList';
import { TabsContent } from './TabsContent';
import { cn } from '@/lib/utils';

const NormalTabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ fullHeight, tabs, defaultActiveKey, onChange, activeKey, className, ...rest }, ref) => {
    return (
      <TabsPrimitive.Root
        className={cn('flex flex-col', { 'h-full': fullHeight }, className)}
        data-testid="Tabs-root"
        defaultValue={defaultActiveKey}
        /**
         * 因为禁用了 onMouseDown 事件，导致了 onValueChange 不会出现回调；通过重写了 onClick 事件来实现了点击事件，并且手动来触发 onChange 事件。
         * https://github.com/radix-ui/primitives/issues/1879
         * */
        onValueChange={onChange}
        ref={ref}
        value={activeKey}
      >
        <TabList activeKey={activeKey} defaultActiveKey={defaultActiveKey} tabs={tabs} {...rest} />
        <TabsContent className={rest.classes?.tabContent} fullHeight={fullHeight} tabs={tabs} />
      </TabsPrimitive.Root>
    );
  },
);

NormalTabs.displayName = 'NormalTabs';

export default NormalTabs;
