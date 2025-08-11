import { Button, Input } from '@xsky/eris-ui';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

export default {
  title: 'DATA ENTRY/Input/Password',
  component: Input.Password,
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
  },
} as Meta;

type InputStory = StoryObj<typeof Input.Password>;

/**
 * 基础展示
 */
export const Base: InputStory = {
  args: {
    placeholder: '请输入密码',
  },
  render: (args) => <Input.Password {...args} />,
};

const ControlledPasswordWithHook: InputStory['render'] = (args) => {
  const [value, setValue] = useState(args.value);
  const [visible, setVisible] = useState(args.visible);

  return (
    <div className="flex w-[200px] flex-col items-start gap-1">
      <p>Controlled</p>
      <Button onClick={() => setVisible(!visible)}>{visible ? '隐藏' : '显示'}</Button>
      <Input.Password
        {...args}
        visible={visible}
        onVisibleChange={(visible) => setVisible(visible)}
        value={value}
        onChange={(v) => {
          setValue(v);
        }}
      />
      <p className="text-body">{value}</p>
    </div>
  );
};

/**
 * 受控模式
 */
export const Controlled: InputStory = {
  args: {
    placeholder: '请输入密码',
    value: '123',
  },
  render: (args) => <ControlledPasswordWithHook {...args} />,
};

export const Disabled: InputStory = {
  args: {
    placeholder: '请输入密码',
    disabled: true,
  },
  render: (args) => <Input.Password {...args} />,
};

export const Error: InputStory = {
  args: {
    placeholder: '请输入密码',
    error: true,
    tooltip: '密码错误',
  },
  render: (args) => <Input.Password {...args} />,
};
