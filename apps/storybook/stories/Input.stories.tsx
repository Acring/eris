// Input.stories.tsx

import { Button, Input } from '@xsky/eris-ui';
import { StoryObj, Meta } from '@storybook/react';
import { SearchLine16, MailLine16 } from '@xsky/eris-icons';
import { useState } from 'react';
import React from 'react';

export default {
  title: 'DATA ENTRY/Input/Input',
  component: Input,
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
    defaultValue: {
      type: 'string',
      description: '输入框的默认值。',
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
    size: {
      type: {
        name: 'enum',
        value: ['sm', 'md', 'lg'],
      },
      defaultValue: 'sm',
      description: '输入框的大小。',
    },
    allowClear: {
      type: 'boolean',
      defaultValue: false,
      description: '是否允许清除。',
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

type InputStory = StoryObj<typeof Input>;

/**
 * 基础样式
 */
export const BaseInput: InputStory = {
  args: {
    placeholder: '请输入',
    size: 'md',
  },
  render: (args) => (
    <div className="w-[200px]">
      <Input {...args} />
    </div>
  ),
};

/**
 * Input 处于错误状态
 */
export const ErrorInput: InputStory = {
  args: {
    placeholder: '请输入',
    error: true,
  },
  render: (args) => (
    <div className="w-[200px]">
      <Input {...args} />
    </div>
  ),
};

/**
 * Input 的大小
 */
export const Size: InputStory = {
  args: {
    placeholder: '请输入',
    size: 'sm',
  },
  render: (args) => (
    <div className="flex w-[200px] flex-col gap-1">
      <Input {...args} />
      <Input {...args} size="md" />
      <Input {...args} size="lg" />
    </div>
  ),
};

/**
 * Input 禁用清除按钮
 */
export const AllowClear: InputStory = {
  args: {
    placeholder: '请输入',
    allowClear: true,
  },
  render: (args) => (
    <div className="w-[200px]">
      <Input {...args} />
    </div>
  ),
};

/**
 * 受控 Input
 */
export const ControlledInput: InputStory = {
  args: {
    placeholder: '请输入',
    value: 'value',
  },
  render: (args) => {
    const ControlledInputWithHook: InputStory['render'] = (args) => {
      const [value, setValue] = useState<string | undefined>(undefined);
      return (
        <div className="flex w-[200px] flex-col gap-1">
          <p>Controlled</p>
          <Input {...args} value={value} onChange={(v) => setValue(v)} />
          <Input {...args} value={value} onChange={(v) => setValue(v)} />
          <p>UnControlled</p>
          <Input defaultValue={value} onChange={(v) => setValue(v)} />
        </div>
      );
    };
    return <ControlledInputWithHook {...args} />;
  },
};

/**
 * Input 禁用状态
 */
export const DisabledInput: InputStory = {
  args: {
    placeholder: '请输入',
    disabled: true,
    tooltip: '这是一个提示',
  },
  render: (args) => (
    <div className="w-[200px]">
      <Input {...args} />
    </div>
  ),
};

/**
 * with Tooltip
 */
export const WithTooltip: InputStory = {
  args: {
    placeholder: '请输入',
    tooltip: '这是一个提示',
  },
  render: (args) => (
    <div className="w-[200px]">
      <Input {...args} />
    </div>
  ),
};

/**
 * 最大输入长度
 */
export const MaxCount: InputStory = {
  args: {
    placeholder: '请输入',
    maxCount: 10,
  },
  render: (args) => {
    const MaxCountStorybook: InputStory['render'] = (args) => {
      const [value, setValue] = useState('123123123123123123');

      return (
        <div className="w-[200px]">
          <p>需要业务根据 value 设置 error</p>
          <Input
            {...args}
            value={value}
            error={value.length > (args.maxCount ?? 0)}
            onChange={(value) => setValue(value)}
          />
          {value.length > (args.maxCount ?? 0) && (
            <span className="mt-0-5 text-danger-normal">超过最大长度限制</span>
          )}
        </div>
      );
    };
    return <MaxCountStorybook {...args} />;
  },
};

/**
 * 后缀按钮或者其他文本
 */
export const EndAdornment: InputStory = {
  args: {
    placeholder: '请输入',
  },
  render: (args) => (
    <div className="flex w-[200px] flex-col gap-1">
      <Input
        {...args}
        endAdornment={
          <Button
            onClick={() => {
              alert('发送');
            }}
            type="text"
            color="primary"
            size="sm"
          >
            发送
          </Button>
        }
      />
      <Input {...args} endAdornment={<p className="text-body">kg</p>} />
    </div>
  ),
};

/**
 * 宽度自适应
 */
export const FitContent: InputStory = {
  args: {
    placeholder: '请输入',
    size: 'md',
    fitContent: true,
    tooltip: '这是一个提示',
  },
  render: (args) => <Input {...args} />,
};

/**
 * 外部控制
 */
export const ForwardRef: InputStory = {
  args: {
    placeholder: '请输入',
    size: 'sm',
  },
  render: (args) => {
    function ForwardRefInput(props: InputStory['args']) {
      const ref = React.useRef<HTMLInputElement>(null);

      return (
        <div className="flex flex-col items-start gap-1">
          <Button
            onClick={() => {
              ref.current?.focus();
            }}
          >
            聚焦
          </Button>
          <Input {...props} ref={ref} />
        </div>
      );
    }
    return <ForwardRefInput {...args} />;
  },
};

/**
 * 前置/后置内容
 */
export const Adornments: InputStory = {
  args: {
    placeholder: '请输入',
  },
  render: (args) => (
    <div className="flex w-[200px] flex-col gap-1">
      <Input
        {...args}
        startAdornment={<SearchLine16 className="text-text-3 flex" />}
        placeholder="带搜索图标"
      />
      <Input
        {...args}
        endAdornment={
          <Button
            onClick={() => {
              alert('发送');
            }}
            type="text"
            color="primary"
            size="sm"
          >
            发送
          </Button>
        }
        placeholder="带发送按钮"
      />
      <Input
        {...args}
        startAdornment={<MailLine16 className="text-text-3 flex" />}
        endAdornment={<p className="text-body">@example.com</p>}
        placeholder="邮箱地址"
      />
      <Input
        {...args}
        startAdornment={<span className="text-text-3 ">￥</span>}
        endAdornment={<p className="text-body">元</p>}
        placeholder="输入金额"
      />
    </div>
  ),
};

/**
 * 禁用输入法输入
 */
export const DisableComposition: InputStory = {
  args: {
    placeholder: '请输入',
    size: 'md',
    disableComposition: true,
  },
  render: (args) => (
    <div className="w-[200px]">
      <Input {...args} />
    </div>
  ),
};
