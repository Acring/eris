import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { useEffect } from 'react';
import { Popconfirm, Button } from '@xsky/eris-ui';

// gpt 生成
const meta: Meta<typeof Popconfirm> = {
  title: 'DATA DISPLAY/Popconfirm',
  component: Popconfirm,
  tags: ['skip-test'],
  argTypes: {
    side: {
      control: {
        type: 'inline-radio',
      },
      options: ['top', 'bottom', 'left', 'right'],
      description: '气泡框显示的位置。',
      table: {
        type: { summary: ['top', 'bottom', 'left', 'right'] },
        defaultValue: { summary: 'top' },
      },
    },
    arrow: {
      control: {
        type: 'boolean',
      },
      description: '是否显示箭头。',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    container: {
      control: {
        type: null,
      },
      description: '气泡框的容器元素。',
    },
    open: {
      control: {
        type: 'boolean',
      },
      description: '气泡框是否打开。当为 true 时，气泡框可见。',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    defaultOpen: {
      control: {
        type: 'boolean',
      },
      description: '气泡框的默认打开状态。',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onOpenChange: {
      control: null,
      description: '当气泡框的打开状态发生变化时的回调函数。',
    },
    trigger: {
      control: {
        type: 'check',
        options: ['hover', 'click'],
      },
      description: '触发气泡框显示的方式。', // 对 trigger 参数的中文描述
      table: {
        type: { summary: 'Array<“hover” | "click">' }, // 显示参数类型为字符串数组
        defaultValue: { summary: '["click"]' }, // 显示默认值为 ['hover']
      },
    },
    align: {
      control: {
        type: 'inline-radio',
      },
      options: ['start', 'center', 'end'],
      description: '气泡框显示的位置。',
      table: {
        type: { summary: ['start', 'center', 'end'] },
        defaultValue: { summary: 'center' },
      },
    },
    okText: {
      control: {
        type: 'text',
      },
      description: '确认按钮的文本。',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '确定' },
      },
    },
    okType: { control: 'text', description: '确认按钮的类型' },
    okLoading: {
      control: {
        type: 'boolean',
      },
      description: '确认按钮是否处于加载状态。',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    cancelText: {
      control: {
        type: 'text',
      },
      description: '取消按钮的文本。',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '取消' },
      },
    },
    cancelType: { control: 'text', description: '取消按钮的类型' },
    footerContent: {
      control: {
        type: 'text',
      },
      description: '页脚内容。',
    },
    onOk: {
      control: null,
      description: '点击确认按钮时的回调函数。',
    },
    onCancel: {
      control: null,
      description: '点击取消按钮时的回调函数。',
    },
  },
};

type Story = StoryObj<typeof Popconfirm>;

export const BasicConfirm: Story = {
  args: {
    title: 'title',
    content: 'This is a basic confirm',
    children: 'click me',
  },
};

export const CustomConfirm: Story = {
  args: {
    title: 'title',
    content: 'This is a basic confirm',
    children: 'click me',
    okType: 'secondary',
    okText: '删除',
    cancelType: 'outlined',
    cancelText: '取消',
    okLoading: true,
    onOk: () => console.log('handleOk'),
    onCancel: () => console.log('handleCancel'),
  },
};

const ControlInExternal = () => {
  const [open, setOpen] = useState(true);
  const handleOpenChange = (open: boolean) => {
    console.log('handle change cb!!', open);
    setOpen(open);
  };
  return (
    <div>
      <Popconfirm
        content="This is a basic popconfirm"
        onOpenChange={handleOpenChange}
        open={open}
        onOk={() => {
          console.log('handle ok cb!!');
          setOpen(false);
        }}
        onCancel={() => {
          console.log('handle cancel cb!!');
          setOpen(false);
        }}
      >
        click me
      </Popconfirm>
    </div>
  );
};

export const ControlConfirm: Story = {
  args: {
    content: 'This is a popover with children',
  },
  render: () => <ControlInExternal />,
};

export default meta;
