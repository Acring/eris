import { ScrollArea, TabItemType, Tabs } from '@xsky/eris-ui';
import { Meta, StoryObj } from '@storybook/react';
import React, { useRef } from 'react';

const items = [
  {
    key: '1',
    label: `Tab 1`,
    children: `Content of Tab Pane 1`,
  },
  {
    key: '2',
    label: `Tab 2`,
    children: `Content of Tab Pane 2`,
  },
  {
    key: '3',
    label: `Tab 3`,
    children: `Content of Tab Pane 3`,
  },
  {
    key: '323232',
    label: `Tab 3222`,
    children: `Content of Tab Pane 3`,
  },
  {
    key: '333232523236',
    label: `Tab 3332326`,
    children: `Content of Tab Pane 3`,
  },
  {
    key: '4',
    label: `Tab 4`,
    children: `Content of Tab Pane 4`,
    disabled: true,
  },
];

const itemsWithLongLabel = [
  {
    key: '1',
    label: `我也是一个比较长的1Tab名字`,
    children: `Content of Tab Pane 1`,
  },
  {
    key: '2',
    label: `我也是一个比较长的2Tab名字`,
    children: `Content of Tab Pane 2`,
  },
  {
    key: '3',
    label: `我也是一个比较长的3Tab名字`,
    children: `Content of Tab Pane 3`,
  },
  {
    key: '4',
    label: `我也是一个比较长的4Tab名字`,
    children: `Content of Tab Pane 4`,
  },
  {
    key: '5',
    label: `我也是一个比较长的5Tab名字`,
    children: `Content of Tab Pane 5`,
  },
  {
    key: '6',
    label: `我也是一个比较长的6Tab名字`,
    children: `Content of Tab Pane 6`,
  },
  {
    key: '7',
    label: `我也是一个比较长的7Tab名字`,
    children: `Content of Tab Pane 7`,
  },
  {
    key: '8',
    label: `我也是一个比较长的8Tab名字`,
    children: `Content of Tab Pane 8`,
  },
  {
    key: '9',
    label: `我也是一个比较长的9Tab名字`,
    children: `Content of Tab Pane 9`,
  },
  {
    key: '10',
    label: `我也是一个比较长的10Tab名字`,
    children: `Content of Tab Pane 10`,
  },
];

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  title: 'DATA DISPLAY/Tabs',
  tags: ['visual-test'],
  argTypes: {
    tabs: {
      control: {
        type: 'object',
      },
      description: 'tab 列表',
      table: {
        type: {
          summary: 'TabItemType[]',
          detail:
            'interface TabItemType {\n  key: string;\n  label: ReactNode;\n  children: ReactNode;\n  disabled?: boolean;\n  hidden?: boolean;\n}',
        },
      },
    },
    fullHeight: { control: 'boolean', description: '内容区域是否根据父元素撑满高度' },
    disabledAdd: { control: 'boolean', description: '是否禁用添加按钮' },
    type: {
      control: 'select',
      options: ['line', 'button', 'card'],
      description: '样式类型',
      defaultValue: { summary: '默认为 line' },
    },
    classes: {
      control: 'object',
      description: '自定义类名',
      table: {
        type: {
          summary: 'TabsClassName',
          detail: 'interface TabsClassName {\n  tabList: string;\n  tabContent: string;\n}',
        },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'large'],
      description: '尺寸',
      defaultValue: { summary: '默认为 large' },
    },
    widthLimited: {
      control: 'boolean',
      description: '是否限制 tab 宽度',
      defaultValue: { summary: '默认为 true', default: true },
    },
    closable: {
      control: 'boolean',
      description: '是否显示关闭按钮',
      defaultValue: { summary: '默认为 true', default: true },
    },
    direction: { control: 'select', options: ['right'], description: '添加按钮的位置' },
    defaultActiveKey: { control: 'text', description: '默认激活的 tab 面板的 key' },
    scrollable: { control: 'boolean', description: '是否支持滚动' },
    activeKey: { control: 'text', description: '当前激活 tab 面板的 key' },
    onChange: { action: 'changed', description: '切换面板的回调' },
    onOrder: { control: false, action: 'ordered', description: '拖拽排序的回调' },
    onAdd: {
      action: 'added',
      description: '添加 tab 的回调',
      control: false,
    },
    onRemove: {
      control: false,
      if: { arg: 'closable', exists: true },
      description: '删除 tab 的回调',
    },
  },
};

type Story = StoryObj<typeof Tabs>;

export const Basic: Story = {
  args: {
    tabs: items,
    onAdd: undefined,
    onChange: console.log,
    onOrder: undefined,
  },
};

export const Type: Story = {
  args: {
    tabs: items,
    type: 'button',
    onAdd: undefined,
    onChange: console.log,
    onOrder: undefined,
  },
};

export const DefaultActive: Story = {
  args: {
    tabs: items,
    defaultActiveKey: '2',
    onAdd: undefined,
    onChange: console.log,
    onOrder: undefined,
  },
};

export const WithEditButton: Story = {
  render: () => {
    const AddDemo = () => {
      const [tabs, setTabs] = React.useState<TabItemType[]>(items);
      const [activeKey, setActiveKey] = React.useState<string>(items[0].key);
      const newTabIndex = useRef(0);

      const handleAddTab = () => {
        const newActiveKey = `newTab${newTabIndex.current++}`;
        setTabs((pre: TabItemType[]) => {
          const newTab = {
            key: newActiveKey,
            label: `Tab-${newActiveKey}`,
            children: <div>Content of Tab Pane {newActiveKey}</div>,
          };
          return [...pre, newTab];
        });
        setActiveKey(newActiveKey);
      };

      const handleRemoveTab = (key: string) => {
        // 查找当前删除 tab 的索引
        let targetIndex = tabs.findIndex((tab) => tab.key === key);
        // 过滤掉当前需要删除的 tab
        const newPanels = tabs.filter((tab) => tab.key !== key);
        if (newPanels.length && key === activeKey) {
          if (targetIndex === newPanels.length || newPanels[targetIndex].disabled) {
            // 判断删除的前一个是否为禁用状态，如果是则继续往前找
            while (newPanels[targetIndex - 1]?.disabled) {
              targetIndex--;
            }
            targetIndex--;
          }
          if (newPanels[targetIndex]?.key !== undefined) {
            setActiveKey(newPanels[targetIndex]?.key);
          }
        }
        setTabs(newPanels);
      };

      const onChange = (key: string) => {
        setActiveKey(key);
      };

      return (
        <Tabs
          closable
          tabs={tabs}
          onAdd={handleAddTab}
          onRemove={handleRemoveTab}
          activeKey={activeKey}
          onChange={onChange}
          scrollable
        />
      );
    };

    return <AddDemo />;
  },
};

export const Draggable: Story = {
  render: () => {
    const DraggableDemo = () => {
      const newTabIndex = useRef(0);
      const [tabs, setTabs] = React.useState<TabItemType[]>(items);
      const [activeKey, setActiveKey] = React.useState<string>(items[0].key);

      const handleAddTab = () => {
        const newActiveKey = `newTab${newTabIndex.current++}`;
        setTabs((pre: TabItemType[]) => {
          const newTab = {
            key: newActiveKey,
            label: `Tab-${newActiveKey}`,
            children: <div>Content of Tab Pane {newActiveKey}</div>,
          };
          return [...pre, newTab];
        });
        setActiveKey(newActiveKey);
      };

      const handleOrder = (data: TabItemType[]) => {
        setTabs(data);
      };

      const onChange = (key: string) => {
        setActiveKey(key);
      };

      return (
        <Tabs
          type="line"
          tabs={tabs}
          onChange={onChange}
          onOrder={handleOrder}
          onAdd={handleAddTab}
          activeKey={activeKey}
          scrollable
        />
      );
    };

    return <DraggableDemo />;
  },
};

export const Scrollable: Story = {
  render: (args) => {
    const tabs = new Array(30).fill({}).map((item, index) => {
      return {
        key: index + 1,
        label: `Tab ${index + 1}`,
        children: `Content of Tab Pane ${index + 1}`,
      } as any;
    });
    return <Tabs {...args} tabs={tabs} scrollable />;
  },
  args: {
    onAdd: undefined,
    onChange: undefined,
    onOrder: undefined,
    size: 'large',
  },
};

export const FullHeight: Story = {
  render: (args) => {
    const fullHeightItems = [
      {
        key: '1',
        label: `Tab 1`,
        children: (
          <ScrollArea height="100%">
            <div className="h-[500px]">Content of Tab Pane 1</div>
          </ScrollArea>
        ),
      },
      {
        key: '2',
        label: `Tab 2`,
        children: (
          <ScrollArea height="100%">
            <div className="h-[500px]">Content of Tab Pane 2</div>
          </ScrollArea>
        ),
      },
      {
        key: '3',
        label: `Tab 3`,
        children: (
          <ScrollArea height="100%">
            <div className="h-[500px]">Content of Tab Pane 3</div>
          </ScrollArea>
        ),
        disabled: true,
      },
    ];
    return (
      <div className="h-[300px] rounded-sm shadow-lg">
        <Tabs {...args} tabs={fullHeightItems} fullHeight />
      </div>
    );
  },
  args: {
    onAdd: undefined,
    onChange: undefined,
    onOrder: undefined,
  },
};

export const Size: Story = {
  args: {
    tabs: items,
    size: 'large',
    onAdd: undefined,
    onChange: undefined,
    onOrder: undefined,
  },
};

export const WidthLimited: Story = {
  args: {
    tabs: itemsWithLongLabel,
    scrollable: true,
    widthLimited: false,
    onAdd: undefined,
    onChange: undefined,
    onOrder: undefined,
  },
};

export const Classes: Story = {
  args: {
    tabs: items,
    scrollable: true,
    classes: {
      tabList: 'w-[300px]',
      tabContent: 'text-primary-normal',
    },
    onAdd: undefined,
    onChange: undefined,
  },
};

export const Controlled: Story = {
  render: () => {
    const Demo = () => {
      const [activeKey, setActiveKey] = React.useState<string>(items[0].key);
      const onChange = (key: string) => {
        setActiveKey(key);
      };
      return <Tabs tabs={items} activeKey={activeKey} onChange={onChange} scrollable />;
    };

    return <Demo></Demo>;
  },
};

export const WithHiddenTabs: Story = {
  name: '隐藏标签页',
  parameters: {
    docs: {
      description: {
        story: '通过设置 hidden 属性来控制标签页的显示和隐藏。',
      },
    },
  },
  render: () => {
    const HiddenDemo = () => {
      const [tabs, setTabs] = React.useState<TabItemType[]>([
        {
          key: '1',
          label: 'Tab 1',
          children: 'Content of Tab 1',
        },
        {
          key: '2',
          label: 'Tab 2',
          children: 'Content of Tab 2',
          hidden: true,
        },
        {
          key: '3',
          label: 'Tab 3',
          children: 'Content of Tab 3',
        },
      ]);

      const toggleTab = (key: string) => {
        setTabs((prevTabs) =>
          prevTabs.map((tab) => (tab.key === key ? { ...tab, hidden: !tab.hidden } : tab)),
        );
      };

      return (
        <div className="space-y-4">
          <div className="space-x-2">
            <button
              className="px-4 py-2 text-sm font-medium text-white bg-primary-normal rounded hover:bg-primary-hover"
              onClick={() => toggleTab('2')}
            >
              {tabs.find((tab) => tab.key === '2')?.hidden ? '显示 Tab 2' : '隐藏 Tab 2'}
            </button>
          </div>
          <Tabs tabs={tabs} />
        </div>
      );
    };

    return <HiddenDemo />;
  },
};

export default meta;
