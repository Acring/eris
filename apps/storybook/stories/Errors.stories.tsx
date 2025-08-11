import { Form } from '@xsky/eris-ui';
import { Meta, StoryObj } from '@storybook/react';
export default {
  title: 'DATA ENTRY/Form/Errors',
  component: Form.Errors,
  tags: ['visual-test'],
  argTypes: {
    errors: {
      type: Object,
      description: '错误信息',
      defaultValue: {},
    },
    name: {
      type: String,
      description: '错误信息名称',
      defaultValue: '',
    },
  },
};

type ErrorsStory = StoryObj<typeof Form.Errors>;

export const BaseErrors: ErrorsStory = {
  args: {
    errors: {
      name: {
        message: '请输入名称',
        type: 'required',
      },
    },
    name: 'name',
  },
  render: (args) => <Form.Errors {...args} />,
};
