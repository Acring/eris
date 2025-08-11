import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { InputTag, Tag } from '@xsky/eris-ui';

const metaInputTag: Meta = {
  title: 'DATA ENTRY/InputTag',
  component: InputTag,
  tags: ['visual-test'],
  argTypes: {
    disableBackspaceRemove: {
      control: {
        type: 'boolean',
      },
      description: '是否禁用 Backspace 键删除标签功能。',
      defaultValue: { summary: 'false' },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      description: '是否禁用输入标签。',
      defaultValue: { summary: 'false' },
    },
    error: {
      control: {
        type: 'boolean',
      },
      description: '是否显示错误状态。',
      defaultValue: { summary: 'false' },
    },
    isEditOnRemove: {
      control: {
        type: 'boolean',
      },
      description: '标签删除时是否编辑最后一个标签。',
      defaultValue: { summary: 'false' },
    },
    name: {
      control: {
        type: 'text',
      },
      description: '输入标签的 input 的 name 值。',
    },
    onBlur: {
      description: '失去焦点时的回调函数。',
    },
    onChange: {
      description: '标签变化时的回调函数。',
    },
    onClick: {
      description: '点击输入标签区域的回调函数。',
    },
    onFocus: {
      description: '获取焦点时的回调函数。',
    },
    onKeyUp: {
      description: '键盘按键抬起时的回调函数。',
    },
    onRemoved: {
      description: '标签被删除时的回调函数。',
    },
    onClear: {
      description: '清除所有标签时的回调函数。',
    },
    onExisting: {
      description: '已存在标签被添加时的回调函数。',
    },
    placeholder: {
      control: {
        type: 'text',
      },
      description: '输入标签的占位符。',
    },
    renderTag: {
      description: '自定义标签渲染函数。',
    },
    showClear: {
      control: {
        type: 'boolean',
      },
      description: '是否显示清除所有标签的按钮。',
      defaultValue: { summary: 'true' },
    },
    size: {
      control: {
        type: 'select',
        options: ['sm', 'md', 'lg'],
      },
      description: '输入标签的尺寸。',
      defaultValue: { summary: 'md' },
    },
    tagClassName: {
      control: {
        type: 'text',
      },
      description: '标签的自定义样式类名。',
    },
    value: {
      control: {
        type: 'object',
      },
      description: '输入标签的初始值。',
    },
    tooltip: {
      type: 'string',
      defaultValue: '',
      description: '提示框的内容。',
    },
    maxHeight: {
      control: {
        type: 'text',
      },
      description: '设置标签显示区域的最大高度，可以是字符串或数字。',
      defaultValue: { summary: 100 },
    },
  },
};

type Story = StoryObj<typeof InputTag>;

export const Default: Story = {
  args: {
    placeholder: 'Enter a tag...',
  },
};

export const BeforeAddValidateExample: Story = {
  args: {
    beforeAddValidate: (tag, existingTags) => {
      const disabledTags = ['1', '2'];
      if (disabledTags.includes(tag)) {
        alert('系统预设标签内容，不能输入！！！');
        return false;
      }
      if (existingTags.includes(tag)) {
        alert('重复标签！！！');
        return false;
      }
      return true;
    },
    placeholder: '系统预设标签内容 1、2 不让输入',
    value: [],
    maxHeight: 'auto',
  },
};

export const DisableBackspaceRemoveExample: Story = {
  args: {
    disableBackspaceRemove: true,
    placeholder: 'Enter a tag...',
    value: ['tag1', 'tag2', 'tag3'],
  },
};

export const DisabledExample: Story = {
  args: {
    disabled: true,
    placeholder: 'Enter a tag...',
    value: ['tag1', 'tag2', 'tag3'],
  },
};

export const IsEditOnRemoveExample: Story = {
  args: {
    isEditOnRemove: true,
    placeholder: 'Enter a tag...',
    value: ['tag1', 'tag2', 'tag3'],
  },
};

export const OnRemovedAndOnExistingExample: Story = {
  args: {
    onRemoved: (tag) => {
      console.log(`Tag removed: ${tag}`);
    },
    onExisting: (tag) => {
      console.log(`Tag already exists: ${tag}`);
    },
    placeholder: 'Enter a tag...',
    value: [],
  },
};

const ControlItem = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');
  return (
    <div>
      <button onClick={() => setTags([...tags, input])}>set tags</button>
      <input type="text" onChange={(e) => setInput(e.target.value)} />
      <InputTag value={tags} onChange={(tags) => setTags(tags)} />
    </div>
  );
};

export const ControlExample: Story = {
  render: () => <ControlItem />,
};

export const RenderTagExample: Story = {
  args: {
    renderTag: ({ value, closable, onClose }, index, tagClass) => {
      const statusTag: Record<string, 'active' | 'danger'> = {
        tag1: 'active',
        tag2: 'danger',
      };
      const disabledTags = ['tag3'];
      return (
        <Tag
          className={`${tagClass}`}
          onClose={onClose}
          showClose={closable}
          disabledClose={disabledTags.includes(value)}
          type={statusTag[value] || 'default'}
        >
          {value}
        </Tag>
      );
    },
    placeholder: 'Enter a tag...',
    value: ['tag1', 'tag2', 'tag3'],
  },
};

export const ErrorTagsInput: Story = {
  args: {
    isEditOnRemove: true,
    placeholder: 'Enter a tag...',
    error: true,
    value: ['tag1', 'tag2', 'tag3'],
  },
};

export const SizeTagsInput: Story = {
  render: () => (
    <div>
      <InputTag placeholder="请输入" size="sm" className="mb-[4px]" />
      <InputTag placeholder="请输入" size="md" className="mb-[4px]" />
      <InputTag placeholder="请输入" size="lg" className="mb-[4px]" />
    </div>
  ),
  args: {},
};

export const WithTooltip: Story = {
  args: {
    placeholder: '请输入',
    tooltip: '这是 tooltip 内容',
  },
  render: (args) => (
    <div className="w-[200px]">
      <InputTag {...args} />
    </div>
  ),
};

export default metaInputTag;
