'use client';
import type { CommandDialogProps } from '@xsky/eris-ui';
import { CommandPalette as ErisCommandPalette, ScrollArea } from '@xsky/eris-ui';
import React, { useEffect, useImperativeHandle, useMemo } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useRouter } from 'next/navigation';
import { DetailsLine16, MetadataClusterLine16, SearchLine16 } from '@xsky/eris-icons';
import pubsub from 'pubsub-js';
import type { Route } from './route';
import { GroupType, routes } from './route';
import type { CommandPaletteHandler } from './type';
import { Highlight } from './Highlight';
import { commandPaletteEvent } from './event';

const { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } =
  ErisCommandPalette;

const TypeIconMap = {
  [GroupType.components]: <MetadataClusterLine16 />,
  [GroupType.design]: <DetailsLine16 />,
  [GroupType.develop]: <DetailsLine16 />,
  [GroupType.other]: <DetailsLine16 />,
};

const CommandPalette = React.forwardRef<CommandPaletteHandler, CommandDialogProps>(
  (props: CommandDialogProps, ref) => {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState('');

    const router = useRouter();

    useEffect(() => {
      const unsubscribe = pubsub.subscribe(commandPaletteEvent.OPEN, () => {
        setOpen(true);
      });

      return () => {
        pubsub.unsubscribe(unsubscribe);
      };
    }, []);

    useHotkeys(
      'mod+k',
      () => {
        setOpen((open) => !open);
      },
      {
        enableOnFormTags: ['INPUT'],
      },
    );

    useImperativeHandle(ref, () => {
      return {
        open: () => {
          setOpen(true);
        },
        close: () => {
          setOpen(false);
        },
      };
    });

    const groups = useMemo(() => {
      return [GroupType.components, GroupType.design, GroupType.develop, GroupType.other];
    }, []);

    return (
      <CommandDialog
        onOpenChange={(open) => {
          if (!open) setValue('');
          setOpen(open);
        }}
        open={open}
        {...props}
      >
        <div className="py-[12px] flex px-2 border-t-0 border-l-0 border-r-0 border-b border-solid border-gray-200 items-center gap-1">
          <SearchLine16 />
          <CommandInput
            onValueChange={(v) => setValue(v)}
            placeholder="Type a command or search..."
            value={value}
          />
        </div>
        <ScrollArea maxHeight={560}>
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {groups.map((group) => (
              <CommandGroup heading={group} key={group}>
                {routes
                  .filter((route) => route.group === group)
                  .map((route, i) => (
                    <Item
                      hidden={i > 4 && !value}
                      key={route.name}
                      route={route}
                      router={router}
                      setOpen={setOpen}
                      setValue={setValue}
                    />
                  ))}
              </CommandGroup>
            ))}
          </CommandList>
        </ScrollArea>
      </CommandDialog>
    );
  },
);

CommandPalette.displayName = 'CommandPalette';

export default CommandPalette;

function Item({
  route,
  router,
  setOpen,
  setValue,
  hidden,
}: {
  route: Route;
  router: any;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  hidden?: boolean;
}) {
  return (
    <CommandItem
      disabled={hidden}
      hidden={hidden}
      key={route.name}
      keywords={[...(route.keywords ?? []), route.name]}
      onSelect={() => {
        router.push(route.path);
        setOpen(false);
        setValue('');
      }}
    >
      <div className="flex gap-[4px] items-center">
        {route.icon ? route.icon : TypeIconMap[route.group]}
        <Highlight>{route.name}</Highlight>
      </div>
    </CommandItem>
  );
}
