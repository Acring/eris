import { Input } from '@xsky/eris-ui';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

export default {
  title: 'DATA ENTRY/Input/Textarea',
  component: Input.Textarea,
  tags: ['visual-test'],
  argTypes: {
    placeholder: {
      type: 'string',
      description: '输入框的占位符。',
      defaultValue: '请输入213',
    },
    value: {
      type: 'string',
      description: '输入框的值。',
      defaultValue: '123',
    },
    disabled: {
      type: 'boolean',
      description: '是否禁用输入框。',
      defaultValue: false,
    },
    error: {
      type: 'boolean',
      defaultValue: false,
      description: '是否处于错误状态。',
    },
    tooltip: {
      type: 'string',
      defaultValue: '',
      description: '提示框的内容。',
    },
    maxCount: {
      type: 'number',
      defaultValue: 0,
      description: '最大输入长度。',
    },
  },
} as Meta;

type TextareaStroy = StoryObj<typeof Input.Textarea>;

/**
 * 基础 Textarea
 */
export const Base: TextareaStroy = {
  args: {
    placeholder: '请输入',
  },
  render: (args) => <Input.Textarea {...args} className="w-full" />,
};

const ControlledTextareaWithHook: TextareaStroy['render'] = (args) => {
  const [value, setValue] = useState(args.value);
  return (
    <div className="flex w-[200px] flex-col gap-1">
      <p>Controlled</p>
      <Input.Textarea
        {...args}
        value={value}
        onChange={(v) => {
          setValue(v);
        }}
      />
      <Input.Textarea {...args} value={value} onChange={(v) => setValue(v)} />
      <p>UnControlled</p>
      <Input.Textarea defaultValue={value} onChange={(v) => setValue(v)} />
    </div>
  );
};

/**
 * 受控组件
 */
export const Controlled: TextareaStroy = {
  args: {
    placeholder: '请输入',
    value: 'value',
  },
  render: (args) => <ControlledTextareaWithHook {...args} />,
};

/**
 * 禁用状态
 */
export const Disabled: TextareaStroy = {
  args: {
    placeholder: '请输入',
    disabled: true,
  },
  render: (args) => <Input.Textarea {...args} />,
};

/**
 * 错误状态
 */
export const Error: TextareaStroy = {
  args: {
    placeholder: '请输入',
    error: true,
  },
  render: (args) => <Input.Textarea {...args} />,
};

/**
 * 最大输入长度
 */
export const MaxCount: TextareaStroy = {
  args: {
    placeholder: '请输入',
    maxCount: 10,
    className: 'max-h-[200px]',
  },
  render: (args) => <Input.Textarea {...args} />,
};

export const WithTooltip: TextareaStroy = {
  args: {
    placeholder: '请输入',
    tooltip: '这是一个提示',
    disabled: true,
  },
  render: (args) => <Input.Textarea {...args} />,
};

export const ResizeEvent: TextareaStroy = {
  args: {
    placeholder: '请输入',
    onResize: (width, height) => {
      console.log(width, height);
    },
  },
  render: (args) => {
    return (
      <div className="flex w-[200px] flex-col gap-1">
        <Input.Textarea {...args} />
      </div>
    );
  },
};

export const MaxHeight: TextareaStroy = {
  args: {
    placeholder: '请输入',
  },
  render: (args) => {
    return (
      <div className="flex  w-[200px] flex-col gap-1">
        <span>限制最大高度为 240px</span>
        <Input.Textarea {...args} className="max-h-[240px]" />
      </div>
    );
  },
};
