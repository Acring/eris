import type { ReactNode } from 'react';
import { cva } from 'class-variance-authority';
import React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import type { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { Draggable } from 'react-beautiful-dnd';
import { DragLine16 } from '@xsky/eris-icons';
import { cn } from '@/lib/utils';
import TabButton, { tabChildVariant } from './TabButton';
import type { TabsProps } from './type';

export const iconShow = cva(cn('absolute left-0 flex !cursor-move group-hover:opacity-100'), {
  variants: {
    showIcon: {
      true: cn('opacity-100'),
      false: cn('opacity-0'),
    },
    isDragging: {
      true: cn('fill-primary-normal'),
    },
    size: {
      large: cn('scale-100'),
      small: cn('left-[-4px] scale-75'),
    },
  },
});

export const DraggableTab = (
  props: {
    label: ReactNode;
    disabled?: boolean;
    value: string;
    index: number;
    showIcon: boolean;
    hasOrder?: boolean;
  } & Pick<TabsProps, 'scrollable' | 'type' | 'size' | 'widthLimited' | 'closable' | 'onRemove'>,
) => {
  const { label, disabled, value, index, showIcon, widthLimited, ...rest } = props;
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    <Draggable draggableId={value} index={index}>
      {(draggableProvided: DraggableProvided, draggableSnapshot: DraggableStateSnapshot) => (
        <div
          className="group relative"
          {...draggableProvided.draggableProps}
          ref={draggableProvided.innerRef}
        >
          <TabsPrimitive.Trigger asChild disabled={disabled} value={value}>
            <TabButton
              {...rest}
              isDragging={draggableSnapshot.isDragging}
              tabKey={value}
              widthLimited={widthLimited}
            >
              <div
                className={cn(
                  iconShow({
                    showIcon,
                    isDragging: draggableSnapshot.isDragging,
                    size: props.size,
                  }),
                )}
                {...draggableProvided.dragHandleProps}
              >
                <DragLine16
                  className={cn('text-icon-outlined-displayed hover:text-primary-normal', {
                    'text-primary-normal': draggableSnapshot.isDragging,
                  })}
                />
              </div>
              <div className={cn(tabChildVariant({ widthLimited }))}>{label}</div>
            </TabButton>
          </TabsPrimitive.Trigger>
        </div>
      )}
    </Draggable>
  );
};
