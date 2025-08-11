import { Select } from '@xsky/eris-ui';
import { Meta, StoryObj } from '@storybook/react';
import { useRef } from 'react';
import { Button } from '@xsky/eris-ui';
import type { SelectRef } from '@xsky/eris-ui';

const metaSelect: Meta<typeof Select> = {
  title: 'DATA ENTRY/Select',
  component: Select,
  tags: ['visual-test'],
  argTypes: {
    options: {
      control: {
        type: 'object',
      },
      description: '选项数组。',
    },
    value: {
      control: {
        type: 'text',
      },
      description: '选中选项的值。',
    },
    defaultValue: {
      control: {
        type: 'text',
      },
      description: '选择器的默认值。',
    },
    placeholder: {
      control: {
        type: 'text',
      },
      description: '选择器的占位符。',
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      description: '禁用选择器。',
    },
    onChange: {
      control: {
        type: 'object',
      },
      description: '选项变化的回调函数。',
    },
    className: {
      control: {
        type: 'text',
      },
      description: '选择器的类名。',
    },
    dropdownMatchSelectWidth: {
      control: {
        type: 'boolean',
      },
      defaultValue: true,
      description: '下拉菜单是否与选择器宽度一致。',
    },
  },
};

type Story = StoryObj<typeof Select>;

export const Basic: Story = {
  args: {
    options: [
      { label: '选项1', value: '10' },
      {
        label: '选项2',
        value: '50',
        disabled: true,
        tooltip: '无法选择',
        tooltipProps: {
          side: 'right',
        },
      },
      {
        label: '选项3 but loooooooooooooooooooooong',
        value: '100',
        tooltip: '可选择',
        tooltipProps: {
          side: 'right',
        },
      },
      { label: '选项4', value: '200' },
    ],
    defaultValue: undefined,
    disabled: false,
    className: 'w-[120px]',
  },
};

export const Disabled: Story = {
  args: {
    options: [
      { label: '选项1', value: '10' },
      { label: '选项2', value: '50' },
      { label: '选项3', value: '100' },
      { label: '选项4', value: '200' },
    ],
    defaultValue: '10',
    placeholder: '请选择',
    disabled: true,
    className: 'w-[120px]',
    tooltip: 'Disabled',
  },
};

export const Small: Story = {
  args: {
    options: [
      { label: '选项1', value: '10' },
      { label: '选项2', value: '50' },
      { label: '选项3', value: '100' },
      { label: '选项4', value: '200' },
    ],
    defaultValue: '10',
    placeholder: '请选择',
    size: 'sm',
    className: 'w-[120px]',
  },
};

export const Scroll: Story = {
  args: {
    options: [
      { label: '选项1', value: '10' },
      { label: '选项2', value: '50' },
      { label: '选项3', value: '100' },
      { label: '选项4', value: '200' },
      { label: '选项5', value: '300' },
      { label: '选项6', value: '400' },
      { label: '选项7', value: '500' },
      { label: '选项8', value: '600' },
      { label: '选项9', value: '700' },
      { label: '选项10', value: '800' },
      { label: '选项11', value: '900' },
      { label: '选项12', value: '1000' },
      { label: '选项13', value: '1100' },
      { label: '选项14', value: '1200' },
      { label: '选项15', value: '1300' },
      { label: '选项16', value: '1400' },
      { label: '选项17', value: '1500' },
      { label: '选项18', value: '1600' },
      { label: '选项19', value: '1700' },
      { label: '选项20', value: '1800' },
    ],
    defaultValue: '10',
    placeholder: '请选择',
    size: 'md',
    className: 'w-[120px]',
  },
};

export const NoBorder: Story = {
  args: {
    options: [
      { label: '选项1', value: '10' },
      { label: '选项2', value: '50' },
      { label: '选项3', value: '100' },
      { label: '选项4', value: '200' },
    ],
    defaultValue: '10',
    placeholder: '请选择',
    size: 'md',
    noBorder: true,
    style: { width: '120px' },
  },
};

export const CustomDropdownWidth: Story = {
  args: {
    options: [
      { label: '这是一个很长很长的选项1', value: '10' },
      { label: '这是一个很长很长的选项2', value: '50' },
      { label: '这是一个很长很长的选项3', value: '100' },
      { label: '这是一个很长很长的选项4', value: '200' },
    ],
    defaultValue: '10',
    placeholder: '请选择',
    className: 'w-[120px]',
    dropdownMatchSelectWidth: false,
  },
};

function FocusStory() {
  const selectRef = useRef<SelectRef>(null);
  console.log('selectRef', selectRef);

  return (
    <div className="flex flex-col gap-2 items-start">
      <Select
        ref={selectRef}
        options={[
          { label: '选项1', value: '10' },
          { label: '选项2', value: '50' },
          { label: '选项3', value: '100' },
          { label: '选项4', value: '200' },
        ]}
        className="w-[120px]"
        placeholder="请选择"
        error
      />

      <Button className="mt-[900px]" onClick={() => selectRef.current?.focus()}>
        聚焦
      </Button>
    </div>
  );
}

/**
 * 通过 ref 调用 focus 方法来聚焦 Select 组件
 */
export const Focus: Story = {
  render: () => <FocusStory />,
};

export default metaSelect;
