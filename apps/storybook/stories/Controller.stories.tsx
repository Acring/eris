import { Form, Input } from '@xsky/eris-ui';
import { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'DATA ENTRY/Form/Controller',
  component: Form.Controller,
  tags: ['visual-test'],
  argTypes: {
    name: {
      type: String,
      description: '表单字段名称',
      defaultValue: 'field',
    },
    control: {
      type: Object,
      description: '表单字段控制器',
      defaultValue: {},
    },
    render: {
      type: Function,
      description: '表单字段控制器渲染',
      defaultValue: () => {},
    },
    defaultValue: {
      type: Object,
      description: '表单字段默认值',
      defaultValue: {},
    },
    disabled: {
      type: Boolean,
      description: '表单字段是否禁用',
      defaultValue: false,
    },
  },
};

type ControllerStory = StoryObj<typeof Form.Controller>;

const ControlledInputWithHook: ControllerStory['render'] = (args) => {
  const defaultValue = {
    field: '123',
  };
  const { control, watch, setValue } = Form.useForm({
    defaultValues: defaultValue,
    mode: 'onChange',
  });

  return (
    <>
      <div className="flex">
        <p>输入值：</p>
        <p>{watch('field')}</p>
      </div>
      <Form.Controller
        name="field"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            onChange={(value) => {
              setValue('field', value);
            }}
          />
        )}
      />
    </>
  );
};

export const BaseController: ControllerStory = {
  render: (args) => <ControlledInputWithHook {...args} />,
};
