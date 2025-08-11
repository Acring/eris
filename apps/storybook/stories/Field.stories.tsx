import { Form, Input } from '@xsky/eris-ui';
import { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'DATA ENTRY/Form/Field',
  component: Form.Field,
  tags: ['visual-test'],
  argTypes: {
    name: {
      type: 'string',
      description: '表单字段名称',
      defaultValue: 'field',
    },
    label: {
      type: Object,
      description: '标签文本',
      defaultValue: '标签',
    },
    errors: {
      type: Object,
      description: '表单字段校验未通过时，报错信息',
      defaultValue: '',
    },
    titleRight: {
      type: Object,
      description: '标题右侧内容',
      defaultValue: '',
    },
    required: {
      type: 'boolean',
      description: '是否必填',
      defaultValue: false,
    },
    helpText: {
      type: Object,
      description: '帮助文本',
      defaultValue: '',
    },
    className: {
      type: 'string',
      description: '自定义类名',
      defaultValue: '',
    },
    children: {
      type: Object,
      description: '子组件',
      defaultValue: '',
    },
    isValidating: {
      type: 'boolean',
      description: '是否处于校验状态',
      defaultValue: false,
    },
  },
} as Meta;

type FieldStory = StoryObj<typeof Form.Field>;

export const BaseField: FieldStory = {
  args: {
    label: '标签',
  },
  render: (args) => (
    <Form.Field {...args}>
      <Input />
    </Form.Field>
  ),
};

/**
 * 报错信息
 */
export const Errors: FieldStory = {
  args: {
    label: '标签',
    errors: {
      field: {
        message: '错误信息',
        type: 'validate',
      },
    },
    name: 'field',
  },
  render: (args) => (
    <Form.Field {...args}>
      <Input isError />
    </Form.Field>
  ),
};

/**
 * 必填标识
 */
export const Required: FieldStory = {
  args: {
    label: '标签',
    required: true,
  },
  render: (args) => (
    <Form.Field {...args}>
      <Input />
    </Form.Field>
  ),
};

/**
 * 帮助文本
 */
export const HelpText: FieldStory = {
  args: {
    label: '标签',
    helpText: '帮助文本',
  },
  render: (args) => (
    <Form.Field {...args}>
      <Input />
    </Form.Field>
  ),
};

/**
 * 标题右侧内容
 */
export const TitleRight: FieldStory = {
  args: {
    label: '标签',
    titleRight: '标题右侧内容',
  },
  render: (args) => (
    <Form.Field {...args}>
      <Input />
    </Form.Field>
  ),
};

/**
 * 是否处于校验状态
 */
export const IsValidating: FieldStory = {
  args: {
    label: '标签',
    isValidating: true,
  },
  render: (args) => (
    <Form.Field {...args}>
      <Input />
    </Form.Field>
  ),
};
