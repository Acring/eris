'use client';

import React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { RightLine16 } from '@xsky/eris-icons';
import { cn } from '../../lib/utils';
import { IconButton } from '../IconButton';

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, _ref) => {
  return (
    <>
      <AccordionPrimitive.Header asChild>
        <div onClick={(ev) => ev.stopPropagation()}>
          <AccordionPrimitive.Trigger
            asChild
            className={cn(
              'flex cursor-pointer items-center border-none bg-transparent pl-0 mr-[4px] transition-all first:[&[data-state=open]>svg]:rotate-90 ',
              className,
            )}
            {...props}
          >
            <IconButton>
              <RightLine16 />
            </IconButton>
          </AccordionPrimitive.Trigger>
        </div>
      </AccordionPrimitive.Header>
      {children}
    </>
  );
});
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, _ref) => (
  <AccordionPrimitive.Content
    className={cn(
      'data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden transition-all',
      className,
    )}
    {...props}
  >
    {children}
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { AccordionContent, AccordionTrigger };
