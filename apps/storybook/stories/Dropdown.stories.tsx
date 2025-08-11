import { Button, Dropdown, cn } from '@xsky/eris-ui';
import { Meta, StoryObj } from '@storybook/react';
import { forwardRef, useRef, useState } from 'react';
import { InfoLine16, SetLine16, EditLine16, DownloadLine16, DeleteLine16 } from '@xsky/eris-icons';

const meta: Meta<typeof Dropdown> = {
  component: Dropdown,
  title: 'NAVIGATION/Dropdown',
  tags: ['visual-test'],
  argTypes: {
    className: {
      control: {
        type: 'text',
      },
      description: '类名',
    },
    type: {
      control: {
        type: 'inline-radio',
      },
      options: ['primary', 'secondary', 'outlined', 'text'],
      defaultValue: 'primary',
      description: '类型',
    },
    label: {
      control: {
        type: 'text',
      },
      description: '文案',
    },
    loading: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
      description: ' 是否加载中 ',
    },
    defaultOpen: {
      control: 'boolean',
      description: '默认展开',
    },
    open: {
      control: 'boolean',
      description: '展开',
    },
    placement: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: '对齐方式',
    },
    menuList: {
      control: 'object',
      description: '菜单列表',
      table: {
        type: {
          summary: 'Menu[]',
          detail: `interface Menu {\n key?: string;\n label?: string | React.ReactNode;\n disabled?: boolean;\n tooltips?: string | React.ReactNode;\n children?: Menu[];\n type?: 'divider';\n onClick?: (item: Menu) => void;\n icon?: React.ReactNode;\n }`,
        },
      },
    },
    trigger: {
      control: {
        type: 'object',
      },
      description: '展开类型',
    },
    onOpenChange: {
      description: '展开收起回调',
    },
    onMenuClick: {
      description: '菜单点击回调',
    },
    selectable: {
      control: 'boolean',
      description: '是否支持下拉选项选中功能',
    },
    defaultSelectedKey: {
      control: 'text',
      description: '默认选中项的key',
    },
    size: {
      control: {
        type: 'inline-radio',
      },
      options: ['xs', 'sm', 'md', 'lg'],
      defaultValue: 'md',
      description: '尺寸大小',
    },
  },
};

type Story = StoryObj<typeof Dropdown>;

const menuList = [
  { key: 'menu1', label: '点击操作菜单1' },
  { key: 'menu2', label: '点击操作菜单2' },
  { key: 'menu3', label: '点击操作菜单3' },
];

export const Default: Story = {
  render: () => (
    <div className="flex justify-center">
      <Dropdown
        label="操作"
        onMenuClick={(menuItem) => {
          alert(`你点击了：${menuItem.key}`);
        }}
        onOpenChange={console.log}
        menuList={[
          { label: 'NoKey' },
          {
            key: 'Edit',
            label: 'Edit',
            onClick: (menuItem) => {
              alert(`你点击了：${menuItem.key}【onClick】`);
            },
          },
          { key: 'Duplicate', label: 'Duplicate', disabled: true, tooltips: '禁止使用' },
          {
            key: 'ReactNode normal',
            label: (
              <span className={cn('text-red-500')} data-key="ReactNode normal">
                ReactNode normal
              </span>
            ),
          },
          {
            key: 'ReactNode disabled',
            disabled: true,
            label: <span className={cn('text-red-500')}>ReactNode disabled</span>,
          },
          { key: 'divider', type: 'divider' },
          { key: 'Archive', label: 'Archive' },
          {
            key: 'More',
            label: 'More',
            children: [
              { key: 'Move to project…', label: 'Move to project…' },
              {
                key: 'Move to folder…',
                label: 'Move to folder…',
                disabled: true,
                tooltips: '禁止使用2',
              },
              {
                key: 'Advanced options…',
                label: 'Advanced options…',
                children: [
                  { label: 'NoKey' },
                  {
                    key: 'options-3-1',
                    label: 'options-3-1',
                  },
                  {
                    key: 'divider',
                    type: 'divider',
                  },
                  {
                    key: 'options-3-2',
                    label: 'options-3-2',
                  },
                  {
                    key: 'options-3-3',
                    label: 'options-3-3',
                  },
                ],
              },
            ],
          },
          { key: 'Share', label: 'Share' },
          { key: 'Add to favorites', label: 'Add to favorites' },
          { key: 'Delete', label: 'Delete' },
        ]}
      />
    </div>
  ),
};

export const DropdownRender: Story = {
  render: () => (
    <div className="flex justify-center">
      <Dropdown
        label={<Button type="primary">custom label render</Button>}
        placement="end"
        onOpenChange={console.log}
        onMenuClick={(menuItem) => {
          alert(`你点击了：${menuItem.key}`);
        }}
        menuList={[
          {
            key: 'Edit',
            label: 'Edit',
            onClick: (menuItem) => {
              alert(`你点击了：${menuItem.key}【onClick】`);
            },
          },
          { key: 'Duplicate', label: 'Duplicate', disabled: true, tooltips: '禁止使用' },
          {
            key: 'ReactNode',
            label: (
              <span className={cn('text-red-500')}>
                <label>ReactNode</label>
              </span>
            ),
          },
          { key: 'divider', type: 'divider' },
          { key: 'Archive', label: 'Archive' },
          {
            key: 'More',
            label: 'More',
            children: [
              { key: 'Move to project…', label: 'Move to project…' },
              {
                key: 'Move to folder…',
                label: 'Move to folder…',
                disabled: true,
                tooltips: '禁止使用2',
              },
            ],
          },
        ]}
      />
    </div>
  ),
};

export const Loading: Story = {
  args: {
    label: '操作',
    loading: true,
    onOpenChange: console.log,
  },
};

export const Type: Story = {
  render: (args) => (
    <>
      <div>
        <h3>正常状态</h3>
        <div className={'flex gap-2'}>
          <Dropdown label="操作" type="primary" menuList={menuList} onOpenChange={console.log} />
          <Dropdown label="操作" type="secondary" menuList={menuList} />
          <Dropdown label="操作" type="outlined" menuList={menuList} />
          <Dropdown label="操作" type="text" menuList={menuList} />
          <div className="flex items-center">
            <Dropdown type="more" menuList={menuList} placement="end" />
          </div>
        </div>
      </div>
      <div>
        <h3>禁用状态</h3>
        <div className={'flex gap-2'}>
          <Dropdown label="操作" type="primary" menuList={menuList} disabled />
          <Dropdown label="操作" type="secondary" menuList={menuList} disabled />
          <Dropdown label="操作" type="outlined" menuList={menuList} disabled />
          <Dropdown label="操作" type="text" menuList={menuList} disabled />
          <div className="flex items-center">
            <Dropdown type="more" menuList={menuList} placement="end" disabled />
          </div>
        </div>
      </div>
    </>
  ),
};

export const Size: Story = {
  render: () => {
    return (
      <div>
        <h3>尺寸大小（默认：md）</h3>
        <div className={'flex gap-2'}>
          <div className="flex flex-col items-center gap-2">
            <Dropdown
              size="xs"
              label="操作"
              type="outlined"
              menuList={menuList}
              onOpenChange={console.log}
            />
            <div className="text-sm">xs</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Dropdown size="sm" label="操作" type="outlined" menuList={menuList} />
            <div className="text-sm">sm</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Dropdown size="md" label="操作" type="outlined" menuList={menuList} />
            <div className="text-sm">md</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Dropdown size="lg" label="操作" type="outlined" menuList={menuList} />
            <div className="text-sm">lg</div>
          </div>
        </div>
      </div>
    );
  },
};

export const TriggerClick: Story = {
  render: (args) => (
    <div className={'flex justify-center'}>
      <Dropdown
        {...args}
        label="点击操作"
        menuList={[
          { key: 'menu1', label: '点击操作菜单1' },
          { key: 'menu2', label: '点击操作菜单2' },
          { key: 'menu3', label: '点击操作菜单3' },
        ]}
      />
    </div>
  ),
  args: {
    trigger: ['click'],
  },
};

export const Tooltips: Story = {
  render: (args) => (
    <div className={'flex justify-center'}>
      <Dropdown
        {...args}
        label="点击操作"
        menuList={[
          { key: 'menu1', label: '点击操作菜单1' },
          { key: 'menu2', label: '点击操作菜单2' },
          { key: 'menu3', label: '点击操作菜单3' },
        ]}
      />
    </div>
  ),
  args: {
    trigger: ['click'],
    tooltipProps: {
      title: '测试一下',
      side: 'right',
    },
  },
};

export const TriggerHover: Story = {
  render: (args) => (
    <div className={'flex justify-center'}>
      <Dropdown
        {...args}
        label="hover操作"
        menuList={[
          { key: 'menu1', label: 'hover操作菜单1' },
          { key: 'menu2', label: 'hover操作菜单2' },
          { key: 'menu3', label: 'hover操作菜单3' },
        ]}
      />
    </div>
  ),
  args: {
    trigger: ['hover'],
  },
};

export const Placement: Story = {
  render: (args) => (
    <div className={'flex justify-center'}>
      <Dropdown
        {...args}
        label="操作"
        menuList={[
          { key: 'menu1', label: '操作菜单1' },
          { key: 'menu2', label: '操作菜单2' },
          { key: 'menu3', label: '操作菜单3' },
        ]}
      />
    </div>
  ),
  args: {
    placement: 'start',
  },
};

export const DefaultOpen: Story = {
  render: (args) => (
    <div className={'flex justify-center'}>
      <Dropdown
        {...args}
        label="操作"
        menuList={[
          { key: 'menu1', label: '操作菜单1' },
          { key: 'menu2', label: '操作菜单2' },
          { key: 'menu3', label: '操作菜单3' },
        ]}
      />
    </div>
  ),
  args: {
    defaultOpen: true,
  },
};

export const Open: Story = {
  render: (args) => (
    <div className={'flex justify-center'}>
      <Dropdown
        {...args}
        label="操作"
        menuList={[
          { key: 'menu1', label: '操作菜单1' },
          { key: 'menu2', label: '操作菜单2' },
          { key: 'menu3', label: '操作菜单3' },
        ]}
      />
    </div>
  ),
  args: {
    open: true,
  },
};

export const MenuTitle: Story = {
  args: {
    menuTitle: '菜单标题',
    label: '操作',
    menuList: [
      { key: 'menu1', label: '操作菜单1' },
      { key: 'menu2', label: '操作菜单2' },
      { key: 'menu3', label: '操作菜单3' },
    ],
  },
};

export const MinWidth: Story = {
  tags: ['skip-test'],
  render: () => {
    return (
      <div className="flex">
        <div>
          <Dropdown
            defaultOpen
            label="操作"
            menuList={[
              { key: 'menu1', label: '打开' },
              { key: 'menu2', label: '关闭' },
              { key: 'menu3', label: '删除' },
            ]}
          />
        </div>
        <div className="ml-4 flex items-center">
          <Dropdown
            defaultOpen
            type="more"
            menuList={[
              { key: 'menu1', label: '打开' },
              { key: 'menu2', label: '关闭' },
              { key: 'menu3', label: '删除' },
            ]}
          />
        </div>
      </div>
    );
  },
};

export const ContextMenu: Story = {
  render: () => {
    const menuList = [
      {
        key: 'menu1',
        label: '操作菜单1',
        onClick: console.log,
        icon: <InfoLine16 />,
      },
      {
        key: 'menu2',
        label: '操作菜单2',
        children: [
          {
            key: 'menu2-1',
            label: '操作菜单2-1',
            icon: <EditLine16 />,
          },
          {
            key: 'menu2-2',
            label: '操作菜单2-1',
            disabled: true,
            tooltips: '禁止使用',
            icon: <SetLine16 />,
          },
        ],
      },
      { key: 'menu3', label: '操作菜单3', icon: <SetLine16 /> },
    ];
    // eslint-disable-next-line react/display-name
    const Father = forwardRef<any, any>((props, ref) => {
      return (
        <Dropdown
          // @ts-ignore
          trigger={{ type: 'contextMenu', ref: ref }}
          onMenuClick={console.log}
          menuTitle="已选 X 项"
          menuList={menuList}
        />
      );
    });
    const Demo = () => {
      let triggerRef = useRef<HTMLDivElement | null>(null);

      return (
        <div className="bg-slate-400 w-[300px] h-[300px]" ref={triggerRef}>
          <Father ref={triggerRef} />
        </div>
      );
    };

    return <Demo></Demo>;
  },
};

export const ContextMenuControl: Story = {
  render: () => {
    const Child = (props: { show: boolean; position: { x: number; y: number } }) => {
      if (!props.show) {
        return null;
      }

      return (
        <div className="fixed" style={{ top: props.position.y, left: props.position.x }}>
          <Dropdown
            onMenuClick={(menuItem) => {
              alert(`你点击了：${menuItem.key}`);
            }}
            open
            menuTitle="已选 X 项"
            menuList={[
              {
                key: 'menu1',
                label: '操作菜单1',
                onClick: (menuItem) => {
                  alert(`你点击了：${menuItem.key}`);
                },
              },
              {
                key: 'menu2',
                label: '操作菜单2',
                children: [
                  {
                    key: 'menu2-1',
                    label: '操作菜单2-1',
                  },
                  {
                    key: 'menu2-2',
                    label: '操作菜单2-1',
                    disabled: true,
                    tooltips: '禁止使用',
                  },
                ],
              },
              { key: 'menu3', label: '操作菜单3' },
              { key: 'menu4', label: '操作菜单4' },
              { key: 'menu5', label: '操作菜单5' },
              { key: 'menu6', label: '操作菜单6' },
              { key: 'menu7', label: '操作菜单7' },
              { key: 'menu8', label: '操作菜单8' },
              { key: 'menu9', label: '操作菜单9' },
              { key: 'menu10', label: '操作菜单10' },
              { key: 'menu11', label: '操作菜单11' },
              { key: 'menu12', label: '操作菜单12' },
            ]}
          />
        </div>
      );
    };

    const Demo = () => {
      const [show, setShow] = useState(false);
      const [position, setPosition] = useState({ x: 0, y: 0 });

      const handleTriggerContextMenu = (e: MouseEvent) => {
        e.preventDefault();
        setShow(false);
        setPosition({ x: e.pageX, y: e.pageY });
        setTimeout(() => {
          setShow(true);
        }, 0);
      };

      return (
        <div
          className="bg-slate-400 w-[300px] h-[300px]"
          // @ts-ignore
          onContextMenu={handleTriggerContextMenu}
          onClick={() => setShow(false)}
        >
          <Child show={show} position={position} />
        </div>
      );
    };

    return <Demo></Demo>;
  },
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex justify-center">
      <Dropdown
        label="操作"
        onMenuClick={(menuItem) => {
          console.log(`你点击了：${menuItem.key}`);
        }}
        menuList={[
          {
            key: 'view',
            label: '查看',
            icon: <InfoLine16 />,
          },
          {
            key: 'edit',
            label: '编辑',
            icon: <EditLine16 />,
          },
          {
            key: 'settings',
            label: '设置',
            icon: <SetLine16 />,
          },
          { key: 'divider1', type: 'divider' },
          {
            key: 'download',
            label: '下载',
            icon: <DownloadLine16 />,
          },
          {
            key: 'delete',
            label: '删除',
            disabled: true,
            tooltips: '无权删除',
            icon: <DeleteLine16 className="text-danger-normal" />,
          },
          { key: 'divider2', type: 'divider' },
          {
            key: 'more',
            label: '更多操作',
            children: [
              {
                key: 'copy',
                label: '复制',
                icon: <EditLine16 />,
              },
              {
                key: 'share',
                label: '分享',
                icon: <DownloadLine16 />,
              },
            ],
          },
        ]}
      />
    </div>
  ),
};

export const Selectable: Story = {
  render: () => {
    const menuList = [
      {
        key: 'low',
        label: '低',
        icon: <InfoLine16 />,
      },
      {
        key: 'middle',
        label: '中',
        icon: <EditLine16 />,
      },
      {
        key: 'high',
        label: '高',
        icon: <SetLine16 />,
      },
    ];
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="mb-4">
          <h3 className="mb-2">默认选择第一项</h3>
          <h4 className="mb-2">默认不显示箭头</h4>
          <div className="flex gap-2">
            <Dropdown
              label="图表操作"
              selectable
              type="primary"
              menuList={menuList}
              onMenuClick={console.log}
            />
            <Dropdown
              label="图表操作"
              selectable
              type="secondary"
              menuList={menuList}
              onMenuClick={console.log}
            />
            <Dropdown
              label="图表操作"
              selectable
              type="outlined"
              menuList={menuList}
              onMenuClick={console.log}
            />
            <Dropdown
              label="图表操作"
              selectable
              type="text"
              menuList={menuList}
              onMenuClick={console.log}
            />
          </div>
          <h4 className="mb-2">显示箭头</h4>
          <div className="flex gap-2">
            <Dropdown
              label="图表操作"
              selectable
              arrow
              type="primary"
              menuList={menuList}
              onMenuClick={console.log}
            />
            <Dropdown
              label="图表操作"
              selectable
              arrow
              type="secondary"
              menuList={menuList}
              onMenuClick={console.log}
            />
            <Dropdown
              label="图表操作"
              selectable
              arrow
              type="outlined"
              menuList={menuList}
              onMenuClick={console.log}
            />
            <Dropdown
              label="图表操作"
              selectable
              arrow
              type="text"
              menuList={menuList}
              onMenuClick={console.log}
            />
          </div>
        </div>

        <div className="mb-4">
          <h3 className="mb-2">指定默认选中项</h3>
          <Dropdown
            label="图表操作"
            selectable
            defaultSelectedKey="high"
            onMenuClick={(menuItem) => {
              console.log(`你点击了：${menuItem.key}`);
            }}
            menuList={[
              {
                key: 'low',
                label: '低',
                icon: <InfoLine16 />,
              },
              {
                key: 'middle',
                label: '中',
                icon: <EditLine16 />,
              },
              {
                key: 'high',
                label: '高',
                icon: <SetLine16 />,
              },
            ]}
          />
        </div>

        <div className="mb-4">
          <h3 className="mb-2">自定义元素</h3>
          <Dropdown
            label="图表操作"
            selectable
            defaultSelectedKey="custom"
            onMenuClick={(menuItem) => {
              console.log(`你点击了：${menuItem.key}`);
            }}
            menuList={[
              {
                key: 'low',
                label: '低',
                icon: <InfoLine16 className="text-blue-500" />,
              },
              {
                key: 'middle',
                label: '中',
                icon: <EditLine16 className="text-green-500" />,
              },
              {
                key: 'custom',
                label: <span className="text-red-500">自定义</span>,
                icon: <SetLine16 className="text-red-500" />,
              },
            ]}
          />
        </div>
      </div>
    );
  },
};

export default meta;
