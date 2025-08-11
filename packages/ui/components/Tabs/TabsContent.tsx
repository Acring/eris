import * as TabsPrimitive from '@radix-ui/react-tabs';
import React, { Suspense } from 'react';
import { Spinner } from '../Spinner';
import type { TabItemType } from './type';
import { cn } from '@/lib/utils';

export const TabsContent = (props: {
  tabs: TabItemType[];
  fullHeight?: boolean;
  className?: string;
}) => {
  return (
    <>
      {props.tabs
        .filter((tab) => !tab.hidden)
        .map(({ key, children }) => (
          <TabsPrimitive.Content
            className={cn(
              'pt-1 outline-none',
              {
                'flex-1 overflow-hidden': props.fullHeight,
              },
              props.className,
            )}
            key={key}
            value={key}
          >
            <Suspense fallback={<Spinner />}>{children}</Suspense>
          </TabsPrimitive.Content>
        ))}
    </>
  );
};
