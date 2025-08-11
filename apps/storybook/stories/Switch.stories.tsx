import { Switch } from '@xsky/eris-ui';
import { Meta, StoryObj } from '@storybook/react';

import React from 'react';

const meta: Meta<typeof Switch> = {
  component: Switch,
  title: 'DATA ENTRY/Switch',
  tags: ['visual-test'],
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
      description: '文本。',
      table: {
        type: { summary: 'string' },
      },
    },
    tooltip: {
      control: {
        type: 'text',
      },
      description: '提示框的内容。',
      table: {
        type: { summary: 'string' },
      },
    },
    checked: {
      control: {
        type: 'boolean',
      },
      description: '是否选中。',
      table: {
        type: { summary: 'boolean' },
      },
    },
    defaultChecked: {
      control: {
        type: 'boolean',
      },
      description: '默认是否选中。',
      table: {
        type: { summary: 'boolean' },
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
      description: '是否禁用。',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    loading: {
      control: {
        type: 'boolean',
      },
      description: '加载中的开关。',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    size: {
      description: '按钮大小 `default` | `small`',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    className: {
      control: {
        type: 'text',
      },
      description: '自定义样式类名。',
    },
    onChange: {
      control: null,
      description: '选中状态改变时的回调函数。',
      table: {
        type: { summary: 'function' },
      },
    },
  },
};

type Story = StoryObj<typeof Switch>;

export const Base: Story = {
  args: {
    label: 'default label',
    onChange: (checked: boolean) => {
      console.log('checked', checked);
    },
  },
};

export const Size: Story = {
  render: () => (
    <>
      <Switch size="small" className="px-1" />
      <Switch />
    </>
  ),
};

export const Disabled: Story = {
  render: () => (
    <>
      <div>
        <Switch disabled size="small" tooltip="禁用" />
        <Switch disabled checked className="px-1" size="small" tooltip="禁用" />
      </div>
      <div>
        <Switch disabled tooltip="禁用" />
        <Switch disabled checked className="px-1" tooltip="禁用" />
      </div>
    </>
  ),
};

export const Loading: Story = {
  tags: ['skip-test'],
  render: () => (
    <>
      <div>
        <Switch loading size="small" />
        <Switch loading checked className="px-1" size="small" />
      </div>
      <div>
        <Switch loading />
        <Switch loading checked className="px-1" />
      </div>
    </>
  ),
};

export const Control: Story = {
  render: () => (
    <>
      <div>
        <Switch checked={false} size="small" label="control unChecked" />
        <Switch checked size="small" label="control checked" />
      </div>
      <div>
        <Switch checked={false} className="px-1" label="control unChecked" />
        <Switch checked className="px-1" label="control checked" />
      </div>
    </>
  ),
};

export default meta;
