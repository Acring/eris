import { Form, Input } from '@xsky/eris-ui';
import { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'DATA ENTRY/Form/FieldGroup',
  component: Form.FieldGroup,
  tags: ['visual-test'],
  argTypes: {
    children: {
      type: 'function',
      description: '子组件',
    },
    className: {
      type: 'string',
      description: '自定义类名',
    },
  },
} as Meta;

type FieldGroupStory = StoryObj<typeof Form.FieldGroup>;

export const BaseFieldGroup: FieldGroupStory = {
  render: (args) => (
    <Form.FieldGroup>
      <Form.Field label="姓名" name="name">
        <Input />
      </Form.Field>
      <Form.Field label="年龄" name="age">
        <Input />
      </Form.Field>
    </Form.FieldGroup>
  ),
};
