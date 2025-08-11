import { CloseLine16, SearchLine16 } from '@xsky/eris-icons';
import { CommandPalette, IconButton, Tag, cn } from '@xsky/eris-ui';
import { Meta, StoryObj } from '@storybook/react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { findAll } from 'highlight-words-core';

export default {
  title: 'OTHER/CommandPalette',
  component: CommandPalette.Command,
  tags: ['visual-test'],
} as Meta;

type Story = StoryObj<typeof CommandPalette.Command>;

function useGetData({ value }: { value: string }) {
  const [data, setData] = React.useState<string[]>(['AA', 'AB', 'AC']);
  const [data2, setData2] = React.useState<string[]>(['WAA', 'WB', 'WC']);
  const [loading, setLoading] = React.useState(true);
  const timer = useRef<NodeJS.Timeout>();

  React.useEffect(() => {
    setLoading(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      if (value) {
        setData([]);
        setData2([]);
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          setData(['AA', 'AB', 'AC'].filter((item) => item.includes(value)));
          setData2(['WAA', 'WB', 'WC'].filter((item) => item.includes(value)));
        }, 1000);
      } else {
        setData([]);
        setData2([]);
        setLoading(true);
        setTimeout(() => {
          setData(['AA', 'AB', 'AC']);
          setData2(['WAA', 'WB', 'WC']);
        }, 100);
        setLoading(false);
      }
    }, 500);

    return () => {
      clearTimeout(timer.current);
    };
  }, [setLoading, value]);

  return {
    data,
    data2,
    loading,
  };
}

const {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  useCommandState,
  CommandLoading,
  CommandGroup,
  CommandItem,
  CommandItemTip,
} = CommandPalette;

interface TResourceDetailTab {
  name: string;
  key: string;
  url: string;
}

interface TResource {
  name: string;
  key: string;
  value: string;
  type: '虚拟机' | '节点';
  keywords?: string[];
  attributes?: string[];
  url?: string;
}
function BasicStory() {
  const [search, setSearch] = React.useState('');
  const [value, setValue] = useState<string>('--');
  const [page, setPage] = React.useState<'resource'>();
  const [resourcePageData, setResourcePageData] = React.useState<{
    type: string;
    key: string;
    name: string;
  }>();

  const routes = useMemo(
    () => [
      {
        name: '虚拟机',
        path: '计算 > 云主机管理 > 虚拟机',
        url: '',
      },
      {
        name: '节点',
        path: '计算 > 资源管理 > 节点',
        url: '',
      },
    ],
    [],
  );

  const resourceDetailMap: Record<string, TResourceDetailTab[]> = useMemo(
    () => ({
      虚拟机: [
        {
          name: '详情',
          key: 'detail',
          url: '',
        },
        {
          name: '日志',
          key: 'log',
          url: '',
        },
      ],

      节点: [
        {
          name: '详情',
          key: 'detail',
          url: '',
        },
        {
          name: '性能',
          key: 'performance',
          url: '',
        },

        {
          name: '日志',
          key: 'log',
          url: '',
        },
      ],
    }),
    [],
  );
  const resources: TResource[] = useMemo(
    () => [
      {
        name: 'scheduledSnapshotPolicy',
        value: '计算 云主机管理',
        key: 'pluto-route-scheduledSnapshotPolicy',
        type: '虚拟机',
        keywords: ['scheduled snapshot policy', '定时快照策略', 'dingshikuazhaoceli'],
        attributes: ['IP: 10.0.0.1'],
        url: '',
      },
      {
        name: 'vm2',
        key: 'vm2',
        type: '虚拟机',
        value: 'vm2',
        keywords: ['10.0.0.2'],
        attributes: ['IP: 10.0.0.2'],
        url: '',
      },
      {
        name: 'node',
        value: 'node-1',
        keywords: ['node'],
        key: 'node1',
        type: '节点',
      },
    ],
    [],
  );

  return (
    <Command
      className="rounded-lg border border-solid border-gray-100 shadow-md"
      vimBindings
      value={value}
      onValueChange={(value) => setValue(value)}
      onKeyDown={(e) => {
        // backspace when value is empty
        if (e.key === 'Backspace' && !search && !!page) {
          setPage(undefined);
        }
      }}
    >
      <div
        className={cn(
          'justify-between flex px-2 border-t-0 border-l-0 border-r-0 border-b border-solid border-fill-on-grey-1 items-center gap-1',
        )}
      >
        <div className="flex items-center flex-1 gap-1">
          <SearchLine16 className="text-icon-filled-normal" />
          {page === 'resource' && (
            <div className="flex gap-[4px]">
              <Tag size="sm">{resourcePageData?.type}</Tag>
              <span className="text-text-1">{resourcePageData?.name}</span>/
            </div>
          )}
          <CommandInput
            placeholder="Type a command or search..."
            className="flex-1 py-[12px]"
            value={search}
            onValueChange={setSearch}
          />
        </div>
        <IconButton>
          <CloseLine16 />
        </IconButton>
      </div>

      <CommandList>
        {page === 'resource' && resourcePageData && (
          <>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {resourceDetailMap[resourcePageData?.type].map((item) => (
                <CommandItem
                  key={item.key}
                  value={item.name}
                  hidden={false}
                  onSelect={() => {
                    console.log('select', item);
                  }}
                >
                  <ItemContent>
                    <HighLight>{item.name}</HighLight>
                    <CommandItemTip>按 Enter 跳转</CommandItemTip>
                  </ItemContent>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}
        {!page && (
          <>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="路由">
              {routes.map((item) => (
                <CommandItem
                  key={item.name}
                  value={item.name}
                  keywords={item.path.split(' > ')}
                  hidden={false}
                  onSelect={() => {
                    console.log('select', item);
                  }}
                >
                  <ItemContent>
                    <div className="flex flex-col gap-1">
                      <div>
                        <HighLight>{item.name}</HighLight>
                      </div>
                      <div className="text-text-3 text-caption flex gap-[4px]">
                        {item.path.split(' > ').map((item, i: number) => (
                          <>
                            <HighLight key={item}>{item}</HighLight> {i === 2 ? '' : ' > '}
                          </>
                        ))}
                      </div>
                    </div>
                    <CommandItemTip>按 Enter 跳转</CommandItemTip>
                  </ItemContent>
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandGroup heading="资源">
              {resources.map((item) => (
                <CommandItem
                  key={item.name}
                  value={item.value}
                  keywords={item.keywords}
                  hidden={false}
                  onSelect={() => {
                    console.log('select', item);
                  }}
                  onTab={() => {
                    setSearch('');
                    setPage('resource');
                    setValue(resourceDetailMap[item.type][0].name);
                    setResourcePageData({ type: item.type, key: item.key, name: item.name });
                  }}
                >
                  <ItemContent>
                    <div className="flex flex-col gap-1">
                      <div className="flex gap-[4px]">
                        <Tag size="sm">{item.type}</Tag>
                        <HighLight>{item.name}</HighLight>
                      </div>
                      <div className="text-text-3 text-caption flex gap-[4px]">
                        {item.attributes?.map((item) => (
                          <div key={item} className="text-text-3 text-caption">
                            <HighLight>{item}</HighLight>
                          </div>
                        ))}
                      </div>
                    </div>
                    <CommandItemTip className="gap-2 flex">
                      <div>
                        <Tag size="sm">Enter</Tag> 进入
                      </div>
                      <div>
                        <Tag size="sm">Tab</Tag> 搜索该资源
                      </div>
                    </CommandItemTip>
                  </ItemContent>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}
      </CommandList>
    </Command>
  );
}

export const Basic: Story = {
  render: () => <BasicStory />,
};

function CommandDialogStory() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = useState('--');

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'j' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      <p className="text-muted-foreground text-sm w-full flex justify-center items-center gap-1 z-10 absolute bg-white h-[100px]">
        Press
        <span className="text-xs">⌘ + J</span>
      </p>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        commandProps={{
          value: value,
          onValueChange: setValue,
        }}
      >
        <div className="py-[12px] flex px-2 border-t-0 border-l-0 border-r-0 border-b border-solid border-gray-200 items-center gap-1">
          <SearchLine16 />
          <CommandInput placeholder="Type a command or search..." />
        </div>
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <span>Search Emoji</span>
            </CommandItem>
            <CommandItem>
              <span>Launch</span>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Settings">
            <CommandItem>
              <ItemContent>
                <span className="flex gap-[4px] flex-1 overflow-hidden items-center">
                  <Tag>test</Tag>
                  <span className="truncate">
                    Profileasdfas
                    <span className="text-red-500">dfasdfasdf</span>
                    aProfileasdfasdfasdfasdfaProfileasdfasdfasdfasdfaProfileasdfasdfasdfasdfaProfileasdfasdfasdfasdfa
                  </span>
                </span>
                <div>⌘P</div>
              </ItemContent>
            </CommandItem>
            <CommandItem>
              <ItemContent>
                <span>Mail</span>
                <div>⌘B</div>
              </ItemContent>
            </CommandItem>
            <CommandItem>
              <ItemContent>
                <span>Settings</span>
                <div>⌘S</div>
              </ItemContent>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

export const OpenDialog: Story = {
  render: () => <CommandDialogStory />,
};

function ItemContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-between items-center whitespace-nowrap gap-1">{children}</div>
  );
}

function HighLight({
  children,
  caseSensitive = false,
}: {
  children: string;
  caseSensitive?: boolean;
}) {
  const search = useCommandState((state) => state.search);

  const highlights = search.split('');

  const chunks = useMemo(() => {
    return findAll({
      textToHighlight: children,
      searchWords: highlights,
      caseSensitive,
    });
  }, [caseSensitive, highlights, children]);

  return (
    <div>
      {chunks.map(({ end, highlight, start }, index) => {
        const label = children.substr(start, end - start);
        return (
          <React.Fragment key={index}>
            {highlight ? <span className="text-text-1 font-medium">{label}</span> : label}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function SyncLoadingStory() {
  const [value, setValue] = useState('');

  const { data, data2, loading } = useGetData({ value });

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'j' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      <p className="text-muted-foreground text-sm w-full h-full flex justify-center items-center gap-1">
        Press
        <span className="text-xs">⌘ + J</span>
      </p>
      <CommandDialog
        commandProps={{
          loading,
        }}
        open={open}
        onOpenChange={setOpen}
        className="rounded-lg border border-solid border-gray-100 shadow-md"
      >
        <div
          className={cn(
            'justify-between flex px-2 border-t-0 border-l-0 border-r-0 border-b border-solid border-fill-on-grey-1 items-center gap-1',
          )}
        >
          <div className="flex items-center flex-1 gap-1">
            <SearchLine16 className="text-icon-filled-normal" />
            <CommandInput
              placeholder="Type a command or search..."
              className="flex-1 py-[12px]"
              value={value}
              onValueChange={setValue}
            />
          </div>
          <IconButton>
            <CloseLine16 />
          </IconButton>
        </div>

        <CommandList className="relative">
          {loading && <CommandLoading tip={'搜索中...'}>Loading...</CommandLoading>}
          {!loading && <CommandEmpty description={'暂无搜索结果，请重新输入'}></CommandEmpty>}

          <CommandGroup heading="Suggestions">
            {data2.map((item) => (
              <CommandItem
                key={item}
                value={item}
                hidden={false}
                onSelect={() => {
                  console.log('select', item);
                }}
                onTab={() => {
                  console.log('tab', item);
                }}
              >
                <ItemContent>
                  <HighLight>{item}</HighLight>
                </ItemContent>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandGroup heading="Resource">
            {data.map((item) => (
              <CommandItem
                key={item}
                value={item}
                hidden={false}
                onSelect={() => {
                  console.log('select', item);
                }}
                onTab={() => {
                  console.log('tab', item);
                }}
              >
                <ItemContent>
                  <HighLight>{item}</HighLight>
                </ItemContent>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
export const SyncLoading: Story = {
  render: () => <SyncLoadingStory />,
};

function LargeDataStory() {
  const data = useMemo(() => Array.from({ length: 100 }, (_, i) => `item ${i}`), []);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = useState('');
  const [search, setSearch] = useState('');

  const loading = false;

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'j' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      <p className="text-muted-foreground text-sm w-full h-full flex justify-center items-center gap-1">
        Press
        <span className="text-xs">⌘ + J</span>
      </p>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        className="rounded-lg border border-solid border-gray-100 shadow-md"
        commandProps={{
          value: value,
          onValueChange: setValue,
        }}
      >
        <div
          className={cn(
            'justify-between flex px-2 border-t-0 border-l-0 border-r-0 border-b border-solid border-fill-on-grey-1 items-center gap-1',
          )}
        >
          <div className="flex items-center flex-1 gap-1">
            <SearchLine16 className="text-icon-filled-normal" />
            <CommandInput
              placeholder="Type a command or search..."
              className="flex-1 py-[12px]"
              value={search}
              onValueChange={setSearch}
            />
          </div>
          <IconButton>
            <CloseLine16 />
          </IconButton>
        </div>

        <CommandList className="relative">
          {!loading && <CommandEmpty description={'暂无搜索结果，请重新输入'}></CommandEmpty>}

          <CommandGroup heading="Resource">
            {data.map((item) => (
              <CommandItem
                key={item}
                value={item}
                hidden={false}
                keywords={[item]}
                onSelect={() => {
                  console.log('select', item);
                }}
                onTab={() => {
                  console.log('tab', item);
                }}
              >
                <ItemContent>
                  <HighLight>{item}</HighLight>
                </ItemContent>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
export const LargeData: Story = {
  render: () => <LargeDataStory />,
};
