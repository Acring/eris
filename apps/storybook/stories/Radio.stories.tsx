import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Radio } from '@xsky/eris-ui';

const metaRadio: Meta<typeof Radio> = {
  title: 'DATA ENTRY/Radio',
  component: Radio,
  tags: ['visual-test'],
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
      description: '单选框的内容。',
      table: {
        type: { summary: 'string' },
      },
    },
    value: {
      control: {
        type: 'text',
      },
      description: '单选框的 value 属性。',
      table: {
        type: { summary: 'string' },
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      description: '单选框是否被禁用。',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    defaultChecked: {
      control: {
        type: 'boolean',
      },
      description: '单选框的默认选中状态。',
      table: {
        type: { summary: 'boolean' },
      },
    },
    checked: {
      control: {
        type: 'boolean',
      },
      description: '单选框的当前选中状态。',
      table: {
        type: { summary: 'boolean' },
      },
    },
    name: {
      control: {
        type: 'text',
      },
      description: '单选框的 name 属性。',
      table: {
        type: { summary: 'string' },
      },
    },
    tooltip: {
      control: {
        type: 'text',
      },
      description: '当悬停在单选框上方时显示的工具提示内容。',
      table: {
        type: { summary: 'string' },
      },
    },
    optionInfo: {
      control: {
        type: 'text',
      },
      description: '单选框的额外信息。',
      table: {
        type: { summary: 'string' },
      },
    },
    onChange: {
      control: {
        type: 'object',
      },
      description: '单选框的值发生变化时的回调。',
      table: {
        type: { summary: 'function' },
      },
    },
    allowUncheck: {
      control: {
        type: 'boolean',
      },
      description: '是否支持取消选中',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    children: {
      control: {
        type: 'object',
      },
      description: 'Radio 的内容，正常情况下推荐使用label。支持传入函数完全自定义渲染。',
    },
  },
};

type Story = StoryObj<typeof Radio>;

export const DefaultRadio: Story = {
  args: {
    label: 'Default Radio',
    value: 'default',
  },
};

export const DefaultRadioChild: Story = {
  args: {
    label: 'Default Radio',
    value: 'default',
  },
};

export const CheckedRadio: Story = {
  args: {
    label: 'Checked Radio',
    value: 'checked',
    checked: true,
  },
};

export const DisabledRadio: Story = {
  args: {
    label: 'Disabled Radio',
    value: 'disabled',
    disabled: true,
  },
};

export const DisabledCheckedRadio: Story = {
  args: {
    label: 'Disabled checked Radio',
    value: 'disabled',
    disabled: true,
    checked: true,
  },
};

export const TooltipRadio: Story = {
  args: {
    label: 'Tooltip Radio',
    value: 'tooltip',
    tooltip: 'This is a tooltip',
  },
};

export const WithExtra: Story = {
  args: {
    label: 'Radio',
    value: 'tooltip',
    extra: <span>extra</span>,
  },
};

export const AllowUnchecked: Story = {
  args: {
    label: 'AllowUnchecked',
    value: 'tooltip',
    allowUncheck: true,
  },
};

export const ControlRadio: Story = {
  args: {},
  render: () => {
    const ControlledRadio = () => {
      const [checked, setChecked] = React.useState(false);
      const handleCheckedChange = (value: string) => {
        setChecked(!!value);
      };
      return (
        <div>
          <button onClick={() => setChecked(true)}>选中</button>
          <button onClick={() => setChecked(false)}>取消</button>
          <div>
            <Radio value="default" checked={checked} onChange={handleCheckedChange} allowUncheck>
              control checked and allowUncheck
            </Radio>
          </div>
        </div>
      );
    };
    return <ControlledRadio />;
  },
};

export const StopPropagation: Story = {
  args: {
    children: (
      <span>
        <span>check</span>
        <span
          id="fruit"
          className="mx-[5px] text-red-500"
          onClick={(e) => {
            // 单选支持取消选中，是通过click事件来实现的，所以需要阻止冒泡
            e.stopPropagation();
          }}
        >
          click not check
        </span>
        <span>check after</span>
      </span>
    ),
    extra: <span>extra</span>,
  },
};

export default metaRadio;
