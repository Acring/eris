'use client';
import { Dialog, DialogContent } from '../Dialog';
import * as React from 'react';
import { Command as CommandPrimitive, useCommandState } from '@acring/cmdk';
import { cn } from '@/lib/utils';
import { DialogOverlay, type DialogProps } from '@radix-ui/react-dialog';
import { Spinner } from '../Spinner';
import { Empty } from '../Empty';
import { ScrollArea } from '../ScrollArea';
import { animated, useTransition } from 'react-spring';

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => {
  const { onValueChange } =
    (props as React.ComponentPropsWithoutRef<typeof CommandPrimitive>) ?? {};
  const scrollId = React.useRef<number>();

  const innerRef = React.useRef<HTMLDivElement>(null);

  const handleValueChange = (value: string) => {
    if (scrollId.current) {
      clearTimeout(scrollId.current);
    }
    scrollId.current = setTimeout(() => {
      innerRef?.current
        ?.querySelector('[data-radix-scroll-area-viewport]')
        ?.scrollTo({ top: 0, behavior: 'smooth' });
    }, 0) as unknown as number;
    onValueChange?.(value);
  };

  return (
    <commandContext.Provider value={{ onSearchChange: handleValueChange }}>
      <CommandPrimitive
        className={cn('flex h-full w-[600px] flex-col overflow-hidden bg-white', className)}
        data-testid="CommandPalette-root"
        ref={(e: HTMLInputElement | null) => {
          if (typeof ref === 'function') {
            ref(e);
          } else if (ref) {
            ref.current = e;
          }
          (innerRef as React.MutableRefObject<HTMLDivElement | null>).current = e;
        }}
        {...props}
      />
    </commandContext.Provider>
  );
});
Command.displayName = CommandPrimitive.displayName;

export interface CommandDialogProps extends DialogProps {
  className?: string;
  commandProps?: React.ComponentProps<typeof CommandPrimitive>;
}

const commandContext = React.createContext<{
  onSearchChange: (value: string) => void;
}>({
  onSearchChange: () => {},
});

const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
  const { className, open, commandProps, ...rest } = props;

  const maskTransitions = useTransition(open, {
    from: { opacity: 0 },
    enter: { opacity: 0.4 },
    config: {
      duration: 200,
      ease: 'cubic-bezier(0.25, 0.60, 0.35, 1)',
    },
  });

  return (
    <Dialog {...rest} open={open}>
      {maskTransitions((styles, item) => {
        return item ? (
          <DialogOverlay>
            <animated.div
              className={cn('fixed inset-0 bg-black opacity-40 z-modal')}
              style={styles}
            />
          </DialogOverlay>
        ) : null;
      })}
      <DialogContent
        centered
        className={cn(
          'max-w-[600px] overflow-auto p-0 top-[10%] mb-[10vh] translate-y-0',
          className,
        )}
        motion
        open={open}
      >
        <Command {...commandProps}>{children}</Command>
      </DialogContent>
    </Dialog>
  );
};

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => {
  const { onSearchChange } = React.useContext(commandContext);
  return (
    <CommandPrimitive.Input
      className={cn(
        'text-body placeholder:text-text-4  box-border  w-full bg-transparent outline-none border-none p-0',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      data-testid="CommandPalette-input"
      ref={ref}
      {...props}
      onValueChange={(value) => {
        props.onValueChange?.(value);
        onSearchChange(value);
      }}
    />
  );
});

CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <ScrollArea maxHeight={554} type="always">
    <CommandPrimitive.List
      className={cn(
        'w-[600px] overflow-y-auto overflow-x-hidden bg-fill-1 p-2 min-h-[100px] box-border',
        '[&_[cmdk-list-sizer]]:flex [&_[cmdk-list-sizer]]:flex-col [&_[cmdk-list-sizer]]:gap-2',
        className,
      )}
      ref={ref}
      {...props}
    />
  </ScrollArea>
));

CommandList.displayName = CommandPrimitive.List.displayName;

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty> & {
    description?: React.ReactNode;
  }
>((props, ref) => (
  <CommandPrimitive.Empty className="-my-2 pt-[40px] pb-[60px]" ref={ref} {...props}>
    <Empty description={props.description} />
  </CommandPrimitive.Empty>
));

CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandLoading = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Loading>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Loading> & {
    tip: string;
  }
>((props, ref) => (
  <CommandPrimitive.Loading
    className="absolute top-0 left-0 bg-fill-1 flex items-center justify-center min-h-[100px] w-full z-10 h-full"
    ref={ref}
    {...props}
  >
    <Spinner tip={props.tip} tipPosition="right" />
  </CommandPrimitive.Loading>
));

CommandLoading.displayName = CommandPrimitive.Loading.displayName;

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    className={cn(
      '[&_[cmdk-group-items]]:bg-white [&_[cmdk-group-items]]:rounded-md [&_[cmdk-group-items]]:p-1 [&_[cmdk-group-items]]:gap-[4px]',
      '[&_[cmdk-group-heading]]:text-text-2 [&_[cmdk-group-heading]]:pb-[4px] [&_[cmdk-group-heading]]:text-caption [&_[cmdk-group-heading]]:font-medium',
      className,
    )}
    ref={ref}
    {...props}
  />
));

CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    className={cn(
      'text-text-2 relative select-none pl-1 pr-2 py-1 rounded-md text-base outline-none border-l border-transparent cursor-pointer whitespace-nowrap',
      'data-[disabled="true"]:pointer-events-none data-[disabled="true"]:text-text-4',
      'aria-selected:bg-fill-2 [&[aria-selected="true"]_[cmdk-item-tip]]:opacity-100 aria-selected:active:bg-fill-3',
      '[&[hidden]]:hidden',
      className,
    )}
    ref={ref}
    {...props}
  />
));

type CommandItemTipProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

const CommandItemTip = React.forwardRef<HTMLDivElement, CommandItemTipProps>(
  ({ className, ...props }, ref) => (
    <div
      className={cn('text-text-3 text-caption opacity-0', className)}
      // eslint-disable-next-line react/no-unknown-property
      cmdk-item-tip=""
      ref={ref}
      {...props}
    />
  ),
);

CommandItemTip.displayName = 'CommandItemTip';

export default CommandItemTip;

CommandItemTip.displayName = 'CommandItemTip';

CommandItem.displayName = CommandPrimitive.Item.displayName;

const CommandPalette = {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandLoading,
  CommandGroup,
  CommandItem,
  CommandItemTip,
  useCommandState,
};
export { CommandPalette };
