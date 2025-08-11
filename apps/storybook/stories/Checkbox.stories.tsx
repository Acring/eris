import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '@xsky/eris-ui';

const metaCheckboxGroup: Meta<typeof Checkbox> = {
  title: 'DATA ENTRY/Checkbox',
  component: Checkbox,
  tags: ['visual-test'],
  argTypes: {
    checked: {
      control: {
        type: 'boolean',
      },
      description: '是否选中。',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    defaultChecked: {
      control: {
        type: 'boolean',
      },
      description: '默认是否选中。',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      description: '是否禁用。',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    name: {
      control: {
        type: 'text',
      },
      description: '复选框的名称。',
      table: {
        type: { summary: 'string' },
      },
    },
    onChange: {
      control: null,
      description: '选中状态改变时的回调函数。',
      table: {
        type: { summary: 'function' },
      },
    },
    indeterminate: {
      control: {
        type: 'boolean',
      },
      description: '是否半选状态。',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
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
    children: {
      control: {
        type: null,
      },
      description: 'Checkbox 的内容，正常情况下推荐使用label。支持传入函数完全自定义渲染。',
    },
  },
};

type Story = StoryObj<typeof Checkbox>;

export const BasicCheckbox: Story = {
  args: {
    children: 'defualt label',
  },
};

export const CheckedCheckbox: Story = {
  args: {
    checked: true,
  },
};

export const DisabledCheckbox: Story = {
  args: {
    disabled: true,
    checked: true,
    children: 'disabled',
  },
};

export const IndeterminateCheckbox: Story = {
  args: {
    indeterminate: true,
  },
};

export const WithTooltip: Story = {
  args: {
    tooltip: 'This is a tooltip',
  },
};

export const WithExtra: Story = {
  args: {
    children: 'checkBox',
    extra: <span>extra</span>,
  },
};

export const WithOptionInfo: Story = {
  args: {
    children: 'checkBox',
    extra: <span>extra</span>,
    disabled: true,
    tooltip: '禁用',
    optionInfo: <span>不会触发 checkbox 的 tooltip</span>,
  },
};

export const StopPropagation: Story = {
  args: {
    children: (
      <span>
        <span>check</span>
        <span id="fruit" className="mx-[5px] text-red-500" onClick={(e) => e.preventDefault()}>
          click not check
        </span>
        <span>check after</span>
      </span>
    ),
    extra: <span>extra</span>,
  },
};

const ContainerItem = () => {
  return (
    <div className="h-[200px] overflow-y-auto">
      <div>
        <h4>indeterminate false</h4>
        <div
          className="flex justify-between"
          onClick={(e) => {
            console.log('test', e);
          }}
        >
          <Checkbox>normal</Checkbox>
          <Checkbox checked>checked</Checkbox>
          <Checkbox disabled>disabled</Checkbox>
          <Checkbox checked disabled>
            checked && disabled
          </Checkbox>
        </div>
      </div>
      <div>
        <h4>indeterminate true</h4>
        <div className="flex justify-between">
          <Checkbox indeterminate>indeterminate</Checkbox>
          <Checkbox indeterminate checked>
            indeterminate && checked
          </Checkbox>
          <Checkbox indeterminate disabled>
            disabled && disabled
          </Checkbox>
          <Checkbox indeterminate disabled checked>
            disabled && disabled && checked
          </Checkbox>
        </div>
      </div>
    </div>
  );
};

export const CustomCheckbox: Story = {
  tags: ['skip-test'],
  args: {},
  render: () => <ContainerItem />,
};

const ControlledCheckbox = () => {
  const [checked, setChecked] = React.useState(false);
  const [indeterminate, setIndeterminate] = React.useState(false);
  const handleCheckedChange = (newChecked: boolean) => setChecked(newChecked);
  console.log('controlled checked', checked);
  return (
    <div>
      <button onClick={() => setChecked(true)}>选中</button>
      <button onClick={() => setChecked(false)}>取消</button>
      <button onClick={() => setIndeterminate(true)}>半选</button>
      <button onClick={() => setIndeterminate(false)}>取消半选</button>
      <div>
        <Checkbox checked={checked} onChange={handleCheckedChange} indeterminate={indeterminate}>
          control checked
        </Checkbox>
      </div>
    </div>
  );
};

export const ControlCheckbox: Story = {
  args: {},
  render: () => <ControlledCheckbox />,
};

export default metaCheckboxGroup;
