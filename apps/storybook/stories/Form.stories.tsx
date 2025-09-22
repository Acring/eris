import { Button, Drawer, Form, Input } from '@xsky/eris-ui';
import { StoryObj } from '@storybook/react';
import * as yup from 'yup';
import { useRef, useState } from 'react';

export default {
  title: 'DATA ENTRY/Form/Form',
  component: Form,
  tags: ['visual-test'],
  argTypes: {
    defaultValues: {
      type: 'object',
      description: '表单的默认值',
      defaultValue: {},
    },
    onSubmit: {
      type: 'function',
      description: '表单提交事件',
      defaultValue: () => {},
    },
    children: {
      type: Object,
      description: '表单内容',
      defaultValue: null,
    },
    className: {
      type: 'string',
      description: '自定义类名',
      defaultValue: '',
    },
    mode: {
      type: 'string',
      description: '表单提交前的校验模式',
      defaultValue: 'onBlur',
    },
    reValidateMode: {
      type: 'string',
      description: '表单提交后的校验模式',
      defaultValue: 'onBlur',
    },
    onSubmitError: {
      type: 'function',
      description: '表单提交错误事件',
      defaultValue: () => {},
    },
    schema: {
      type: Object,
      description: '表单的Schema',
      defaultValue: null,
    },
    id: {
      type: 'string',
      description: '表单元素的 id 属性',
      defaultValue: '',
    },
  },
};

type FormStory = StoryObj<typeof Form> & {
  [key: string]: any;
};

export const Default: FormStory = {
  FormWithHook: () => {
    const BaseMessage = () => {
      const {
        control,
        formState: { errors },
      } = Form.useFormContext();

      return (
        <div className="grid grid-cols-3 gap-1 w-full">
          <div>
            <Form.Field label="名称" required errors={errors} name="name">
              <Form.Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input placeholder="1～128个字符，支持中英文和特殊字符" {...field} />
                )}
              />
            </Form.Field>
            <Button htmlType="submit" className="mt-2">
              保存
            </Button>
          </div>
        </div>
      );
    };

    const defaultValues = {
      name: '',
    };

    const schema = yup.object({
      name: yup
        .string()
        .min(1, '名称不能为空')
        .matches(/^[\u4e00-\u9fa5A-Za-z0-9\._\-]{1,128}$/, '名称不能包含特殊字符'),
    });

    const warningSchema = yup.object({
      name: yup.string().max(5, '建议名称不超过5个字符'),
    });

    const handleSubmit = (data: any) => {
      alert(JSON.stringify(data));
    };

    return (
      <Form
        defaultValues={defaultValues}
        mode="onBlur"
        reValidateMode="onBlur"
        schema={schema}
        warningSchema={warningSchema}
        onSubmit={handleSubmit}
      >
        <BaseMessage />
      </Form>
    );
  },
  render: (args) => <Default.FormWithHook {...args} />,
};

export const WithWarningSchema: FormStory = {
  render: (args) => <Default.FormWithHook {...args} />,
};

export const WithRef: FormStory = {
  render: (args) => {
    function WithRef() {
      const formRef = useRef<any>(null);
      const defaultValues = {
        name: '',
      };
      const schema = yup.object({
        name: yup.string().required('名称不能为空'),
      });
      const handleSubmit = (data: any) => {
        console.log('handleSubmit', data);
        alert(JSON.stringify(data));
      };
      const [open, setOpen] = useState(false);

      return (
        <>
          <Button onClick={() => setOpen(true)}>打开表单</Button>
          <Drawer
            open={open}
            onCancel={() => setOpen(false)}
            onOk={() => {
              console.log('onOk');
              const result = formRef.current.submit();
              console.log('result', result);
              // setOpen(false);
            }}
          >
            <Form
              ref={formRef}
              defaultValues={defaultValues}
              schema={schema}
              onSubmit={handleSubmit}
            >
              <FormContent />
            </Form>
          </Drawer>
        </>
      );

      function FormContent() {
        const {
          control,
          formState: { errors },
        } = Form.useFormContext();

        return (
          <Form.Field label="名称" required errors={errors} name="name">
            <Form.Controller
              name="name"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Field>
        );
      }
    }
    return <WithRef />;
  },
};
