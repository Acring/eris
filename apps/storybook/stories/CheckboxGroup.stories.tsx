import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { CheckboxGroup, CheckboxItem, Button } from '@xsky/eris-ui';

const meta: Meta<typeof CheckboxGroup> = {
  title: 'DATA ENTRY/CheckboxGroup', // 故事的标题
  component: CheckboxGroup, // 组件的名称
  tags: ['visual-test'],
  argTypes: {
    disabled: {
      control: {
        type: 'boolean',
      },
      description: '是否禁用。', // 对 disabled 参数的中文描述
      table: {
        type: { summary: 'boolean' }, // 显示参数类型为布尔值
        defaultValue: { summary: 'false' }, // 显示默认值为 false
      },
    },
    name: {
      control: {
        type: 'text',
      },
      description: '复选框的名称。', // 对 name 参数的中文描述
      table: {
        type: { summary: 'string' }, // 显示参数类型为字符串
      },
    },
    onChange: {
      control: null,
      description: '选中状态改变时的回调函数。', // 对 onChange 参数的中文描述
      table: {
        type: { summary: 'function' }, // 显示参数类型为函数
      },
    },
    direction: {
      control: {
        type: 'inline-radio',
      },
      options: ['horizontal', 'vertical'],
      description: '复选框的布局方向。', // 对 direction 参数的中文描述
      table: {
        type: { summary: ['horizontal', 'vertical'] }, // 显示参数类型为水平或垂直
        defaultValue: { summary: 'horizontal' }, // 显示默认值为水平布局
      },
    },
    options: {
      control: null,
      description: '复选框的选项列表。', // 对 options 参数的中文描述
      table: {
        type: { summary: 'CheckboxOption[]' }, // 显示参数类型为 CheckboxOption 数组
      },
    },
    value: {
      control: null,
      description: '当前选中的复选框的值列表。', // 对 value 参数的中文描述
      table: {
        type: { summary: 'T[]' }, // 显示参数类型为泛型数组
      },
    },
  },
};

type Story = StoryObj<typeof CheckboxGroup>;

const options = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear disabled', value: 'Pear', disabled: true, tooltip: 'Pear disabled' },
  { label: 'Orange with tooltip', value: 'Orange', tooltip: 'orange desc' },
];

export const BasicCheckboxGroup: Story = {
  args: {
    options,
    name: 'fruit2222',
  },
};

export const DisabledCheckboxGroup: Story = {
  args: {
    disabled: true,
    options,
  },
};

export const VerticalCheckboxGroup: Story = {
  args: {
    direction: 'vertical',
    options,
  },
};

export const DisabledAndVerticalCheckboxGroup: Story = {
  args: {
    disabled: true,
    direction: 'vertical',
    options,
  },
};

const extraOptions = [
  { label: 'Apple', value: 'Apple', extra: 'Apple extra' },
  {
    label: 'Pear disabled',
    value: 'Pear',
    disabled: true,
    tooltip: 'Pear disabled',
    extra: 'Pear extra',
  },
  { label: 'Orange with tooltip', value: 'Orange', tooltip: 'orange desc', extra: 'Orange extra' },
];

export const ExtraAndVerticalCheckboxGroup: Story = {
  args: {
    direction: 'vertical',
    options: extraOptions,
  },
};

const ContainerGroup = () => {
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const onChange = (list: string[]) => {
    setCheckedList(list);
  };
  return (
    <>
      <div className="h-[500px] overflow-y-auto">
        <form>
          <h4>CheckboxGroup with form</h4>
          <CheckboxGroup<string>
            name="fruit"
            options={[
              { label: 'Apple', value: 'Apple' },
              { label: 'Pear disabled', value: 'Pear', disabled: true, tooltip: 'Pear disabled' },
              { label: 'Orange with tooltip', value: 'Orange', tooltip: 'orange desc' },
            ]}
            value={checkedList}
            onChange={onChange}
          />
        </form>
        <div>
          <h4>CheckboxGroup vertical</h4>
          <CheckboxGroup<string>
            name="fruit"
            direction="vertical"
            options={[
              { label: 'Apple', value: 'Apple' },
              { label: 'Pear disabled', value: 'Pear', disabled: true, tooltip: 'Pear disabled' },
              { label: 'Orange with tooltip', value: 'Orange', tooltip: 'orange desc' },
            ]}
            value={checkedList}
            onChange={onChange}
          />
        </div>
        <div>
          <h4>CheckboxGroup disable</h4>
          <CheckboxGroup<string>
            name="fruit"
            disabled
            direction="vertical"
            options={[
              { label: 'Apple', value: 'Apple' },
              { label: 'Pear disabled', value: 'Pear', tooltip: 'Pear disabled' },
              { label: 'Orange with tooltip', value: 'Orange', tooltip: 'orange desc' },
            ]}
            value={checkedList}
            onChange={onChange}
          />
        </div>
        <div>
          <h4>CheckboxGroup number option</h4>
          <CheckboxGroup<number> name="numberName" options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />
        </div>
      </div>
    </>
  );
};

export const CustomCheckboxGroup: Story = {
  args: {},
  render: () => <ContainerGroup />,
};

export const CustomRadioChildren: Story = {
  args: {
    options,
  },
  render: () => {
    return (
      <CheckboxGroup<string>
        defaultValue={[options[0].value]}
        onChange={(value: string[]) => console.log(`select radio ${value}`)}
        onClick={() => console.log('click radio')}
      >
        {options.map((option) => (
          <CheckboxItem
            value={option.value}
            key={option.value}
            onClick={() => console.log('click RadioItem', option.value)}
          >
            {({ checked }) => {
              return (
                <Button
                  tabIndex={-1}
                  type={checked ? 'primary' : 'secondary'}
                  onClick={() => console.log('click button', option.value)}
                >
                  {option.label}
                </Button>
              );
            }}
          </CheckboxItem>
        ))}
      </CheckboxGroup>
    );
  },
};

export default meta;
