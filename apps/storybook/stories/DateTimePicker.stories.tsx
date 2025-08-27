import { DateTimePicker, Picker, cn } from '@xsky/eris-ui';
import { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

const meta: Meta<typeof DateTimePicker> = {
  component: DateTimePicker,
  title: 'DATA ENTRY/DateTimePicker',
  tags: ['visual-test'],
  argTypes: {
    disabled: {
      control: {
        type: 'boolean',
      },
      description: '是否禁用。',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    picker: {
      description: '选择器类型',
      table: {
        type: { summary: 'Picker' },
        defaultValue: { summary: 'Picker.date' },
      },
    },
    wholeHour: {
      description: '是否展示整点时间区间',
    },
    wholeRangeTime: {
      description: '日期(时间)区间选择器是否展示整点区间（开始日期 00:00 ~ 结束日期 23:59）',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    controlTime: {
      description: '是否自行控制时间区间',
    },
    width: {
      description: '输入框宽度',
    },
    placeholder: {
      description: '缺省文案',
    },
    showToday: {
      description: '是否展示“今天”快速选择器',
    },
    defaultValue: {
      description: '默认日期',
      control: 'date',
    },
    value: {
      description: '日期',
      control: 'date',
    },
    disabledDates: {
      description: '禁用的日期',
    },
    status: {
      control: 'select',
      options: ['error'],
      description: '状态',
      defaultValue: { summary: '默认为 ""' },
    },
    onChange: {
      description: '日期时间改变的回调',
    },
    onBlur: {
      description: '失去焦点的回调',
    },
    onOk: {
      description: '点击确定按钮的回调',
    },
    onOpenChange: {
      description: '弹出框打开/关闭时的回调',
    },
  },
};

type Story = StoryObj<typeof DateTimePicker> & {
  [key: string]: any;
};

const onChange = (date: Date | (Date | undefined)[] | null, dateString: string | string[]) => {
  console.log('onChange:', date, dateString);
};

const onBlur = (date: Date | (Date | undefined)[] | null, dateString: string | string[]) => {
  console.log('onBlur:', date, dateString);
};

const onOk = (date: Date | (Date | undefined)[], dateString: string | string[]) => {
  console.log('onOk:', date, dateString);
};

/**
 * 日期选择器
 */
export const BasicDate: Story = {
  render: (args) => <DateTimePicker {...args} onChange={onChange} />,
  args: {
    placeholder: '请选择日期',
    showToday: true,
    onBlur: onBlur,
  },
};

/**
 * 日期时间选择器
 */
export const DateTime: Story = {
  render: (args) => (
    <DateTimePicker
      picker={Picker.datetime}
      {...args}
      onBlur={onBlur}
      onChange={onChange}
      onOk={onOk}
      value="2023-12-23 23:22"
    />
  ),
  args: {
    placeholder: '年-月-日 时:分',
  },
};

/**
 * 日期区间选择器
 */
export const DateRange: Story = {
  render: (args) => <DateTimePicker picker={Picker.dateRange} {...args} onChange={onChange} />,
  args: {
    placeholder: ['开始日期', '结束日期'],
    onBlur: onBlur,
  },
};

/**
 * 日期时间区间选择器
 */
export const DateTimeRange: Story = {
  render: (args) => (
    <div>
      <div>
        <p>1. 默认 - 整点区间（开始日期 00:00 ～ 结束日期 23:59）</p>
        <div>
          <DateTimePicker
            picker={Picker.dateTimeRange}
            placeholder={args.placeholder}
            onChange={onChange}
            onOk={onOk}
          />
        </div>
      </div>
      <div>
        <p>2. 零点区间（开始日期：00:00 ～ 结束日期 00:00）</p>
        <div>
          <DateTimePicker
            placeholder={args.placeholder}
            wholeRangeTime={false}
            picker={Picker.dateTimeRange}
            onChange={onChange}
            onOk={onOk}
          />
        </div>
      </div>
    </div>
  ),
  args: {
    placeholder: ['开始日期', '结束日期'],
  },
};

/**
 * 时间区间选择器
 */
export const TimeRange: Story = {
  render: (args) => (
    <DateTimePicker picker={Picker.timeRange} {...args} onChange={onChange} onOk={onOk} />
  ),
  args: {
    placeholder: ['开始', '结束'],
  },
};

/**
 * 定时快照选择器
 */
export const SnapshotRange: Story = {
  tags: ['skip-test'],
  render: (args) => (
    <DateTimePicker
      wholeHour
      controlTime
      prefixEndHolder="次日"
      {...args}
      picker={Picker.timeRange}
      value={[new Date(), new Date()]}
      onChange={onChange}
      onBlur={onBlur}
      onOk={onOk}
    />
  ),
  args: {
    placeholder: ['开始', '结束'],
  },
};

export const Disabled: Story = {
  tags: ['skip-test'],
  args: {
    defaultValue: new Date('2024-10-18'),
    placeholder: '请选择日期',
    disabled: true,
  },
};

export const Placement: Story = {
  render: (args) => <DateTimePicker {...args} placeholder="请选择日期" onChange={onChange} />,
  args: {
    placement: 'start',
  },
};

export const ControlledDatePicker: Story = {
  args: {
    placeholder: '请输入',
    picker: Picker.date,
    value: new Date('2024-10-18'),
  },
  ControlledDatePickerWithHook: (args: React.ComponentProps<typeof DateTimePicker>) => {
    const [value, setValue] = useState(args.value);
    return (
      <div>
        <p>Controlled</p>
        <DateTimePicker
          placeholder="请选择"
          value={value}
          picker={args.picker}
          onChange={(v) => setValue(v as Date)}
        />
        <p>UnControlled</p>
        <DateTimePicker
          placeholder="请选择"
          picker={args.picker}
          defaultValue={value}
          onChange={(v) => setValue(v as Date)}
        />
      </div>
    );
  },
  render: (args) => <ControlledDatePicker.ControlledDatePickerWithHook {...args} />,
};

export const ControlledRangeDatePicker: Story = {
  args: {
    placeholder: ['请输入开始日期', '请输入结束日期'],
    picker: Picker.dateRange,
    value: [new Date('2024-10-18'), new Date('2024-10-18')],
  },
  render: (args) => <ControlledDatePicker.ControlledDatePickerWithHook {...args} />,
};

export const DisabledDates: Story = {
  render: (args) => (
    <div>
      <p>1. 禁用单个日期：2024-4-4 </p>
      <DateTimePicker {...args} onChange={onChange} disabledDates={[new Date('2024-4-4')]} />
      <p>2. 禁用多个日期：2024-4-4， 2024-4-6</p>
      <DateTimePicker
        {...args}
        onChange={onChange}
        disabledDates={[new Date('2024-4-4'), new Date('2024-4-6')]}
      />
      <p>3. 禁用日期区间：2024-4-4 ~ 2024-4-10</p>
      <DateTimePicker
        {...args}
        onChange={onChange}
        disabledDates={[{ from: new Date('2024-4-4'), to: new Date('2024-4-10') }]}
      />
      <p>4. 禁用某个日期之后不可选：2024-4-10 </p>
      <DateTimePicker
        {...args}
        onChange={onChange}
        disabledDates={[{ after: new Date('2024-4-10') }]}
      />
      <p>5. 禁用某个日期之前不可选：2024-4-10 </p>
      <DateTimePicker
        {...args}
        onChange={onChange}
        disabledDates={[{ before: new Date('2024-4-10') }]}
      />
    </div>
  ),
  args: {
    placeholder: '请选择日期',
    showToday: true,
  },
};

export const Status: Story = {
  args: {
    status: 'error',
    placeholder: '请选择日期',
  },
};

export default meta;
