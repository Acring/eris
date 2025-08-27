import { Meta, StoryObj } from '@storybook/react';
import { Collapse, CollapseProps, Divider, IconButton } from '@xsky/eris-ui';
import React, { useState } from 'react';
import { EditLine16 } from '@xsky/eris-icons';

export default {
  title: 'DATA DISPLAY/Collapse/Default',
  component: Collapse,
  tags: ['visual-test'],
  argTypes: {
    className: {
      control: {
        type: 'text',
      },
      description: '用于自定义样式的额外CSS类。',
      table: {
        type: { summary: 'string' },
      },
    },
    open: {
      control: {
        type: 'boolean',
      },
      description: '指定折叠面板是否展开。',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onOpenChange: {
      control: {
        type: 'object',
      },
      description: '当展开状态发生变化时的回调函数。',
      table: {
        type: { summary: 'function' },
      },
    },
    defaultOpen: {
      control: {
        type: 'boolean',
      },
      description: '折叠面板的默认展开状态。',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    title: {
      control: {
        type: 'text',
      },
      description: '折叠面板的标题。',
      table: {
        type: { summary: 'string' },
      },
    },
    rightTitle: {
      control: {
        type: 'text',
      },
      description: '显示在折叠面板右侧的标题。',
      table: {
        type: { summary: 'string' },
      },
    },
    description: {
      control: {
        type: 'text',
      },
      description: '额外的描述或内容。',
      table: {
        type: { summary: 'string' },
      },
    },
    children: {
      description: '折叠面板的内容。',
    },
    tooltip: {
      control: {
        type: 'object',
      },
      description: '用于提供额外信息的工具提示属性。',
    },
    hoverStyle: {
      control: {
        type: 'object',
      },
      description: '定义鼠标悬停时的样式行为，包括颜色和光标样式。',
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: '{ changeColor: true, cursorArea: "default" }' },
      },
    },
    showIcon: {
      control: {
        type: 'boolean',
      },
      description: '是否显示折叠面板的图标。',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    iconButtonProps: {
      control: {
        type: 'object',
      },
      description: '传递给图标按钮的额外属性。',
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: '{}' },
      },
    },
  },
} as Meta;

type Story = StoryObj<CollapseProps> & {
  [key: string]: any;
};

const Content = () => {
  return (
    <div className="bg-grey-100 p-[8px]">
      <li>{'内容内容内容内容内容内容'}</li>
      <li>{'内容内容内容内容内容内容'}</li>
      <li>{'内容内容内容内容内容内容'}</li>
      <li>{'内容内容内容内容内容内容'}</li>
    </div>
  );
};

export const Default: Story = {
  args: {
    title: '高级选项',
    children: <Content />,
  },
};

export const DefaultOpened: Story = {
  args: {
    title: '高级选项',
    children: <Content />,
    defaultOpen: true,
  },
};

export const Description: Story = {
  args: {
    title: '高级选项',
    children: <Content />,
    description: '描述描述描述',
  },
};

export const Tooltip: Story = {
  args: {
    title: '高级选项',
    children: <Content />,
    tooltip: {
      title: '提示提示提示提示',
    },
  },
};

export const RightTitle: Story = {
  args: {
    className: 'w-[300px]',
    title: '高级选项',
    children: <Content />,
    rightTitle: (
      <IconButton onClick={() => alert('右侧可操作')}>
        <EditLine16 />
      </IconButton>
    ),
  },
};

export const Control: Story = {
  ControlInExternal: () => {
    const [open, setOpen] = useState(true);
    const handleOpenChange = (value: boolean) => {
      setOpen(value);
      console.log('callback...');
    };
    return (
      <Collapse open={open} onOpenChange={handleOpenChange} title={open ? '收起' : '展开'}>
        <Content />
      </Collapse>
    );
  },
  render: () => {
    return <Control.ControlInExternal />;
  },
};

export const DividerCollapse: Story = {
  DividerCollapseDemo: () => {
    const [open, setOpen] = useState(true);
    const handleOpenChange = (value: boolean) => {
      setOpen(value);
      console.log('callback...');
    };
    return (
      <Collapse
        className="w-[300px]"
        open={open}
        title={'高级选项'}
        onOpenChange={handleOpenChange}
        rightTitle={<Divider type="horizontal" dashed />}
        hoverStyle={{
          changeColor: false,
          cursorArea: 'full',
        }}
        iconButtonProps={{
          clickableAreaInvisible: false,
          tooltip: open ? '收起' : '展开',
        }}
      >
        <Content />
      </Collapse>
    );
  },
  render: () => {
    return <DividerCollapse.DividerCollapseDemo />;
  },
};

export const ForceRender: Story = {
  args: {
    title: '高级选项',
    children: <Content />,
    forceRender: true,
  },
};

export const TriggerGap: Story = {
  render: () => {
    return (
      <div className="w-[300px]">
        <Collapse title="高级选项" triggerGap="sm">
          <Content />
        </Collapse>
        <Collapse title="高级选项" triggerGap="md">
          <Content />
        </Collapse>
        <Collapse title="高级选项" triggerGap="lg">
          <Content />
        </Collapse>
      </div>
    );
  },
};
