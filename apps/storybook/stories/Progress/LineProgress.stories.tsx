import { Meta, StoryObj } from '@storybook/react';
import { LineProgressProps, Progress } from '@xsky/eris-ui';
import React from 'react';

export default {
  title: 'FEEDBACK/Progress/LineProgress',
  component: Progress,
  tags: ['visual-test'],
  argTypes: {
    percent: {
      control: {
        type: 'number',
        min: 0,
        max: 100,
      },
      description: '进度百分比',
    },
    className: {
      control: {
        type: 'text',
      },
      description: '自定义类名',
    },
    showInfo: {
      control: {
        type: 'boolean',
      },
      description: '是否显示右边信息',
    },
    rightInfo: {
      control: {
        type: 'text',
      },
      defaultValue: true,
      description: '右侧信息',
      table: {
        type: {
          summary: 'boolean | ReactNode',
        },
      },
    },
    popoverProps: {
      description: '弹出框属性',
      table: {
        type: {
          summary: 'PopoverProps',
        },
      },
    },
    disable: {
      control: {
        type: 'number',
        min: 0,
      },
      description: '禁用量',
    },
    color: {
      type: {
        name: 'enum',
        value: ['default', 'active', 'warning', 'danger', 'updating'],
      },
      defaultValue: 'default',
      description: '颜色',
    },
    strokeColor: {
      control: {
        type: 'text',
      },
      defaultValue: '',
      description: '进度条自定义填充颜色（优先级高于color）',
    },
    segmentation: {
      control: {
        type: 'object',
      },
      description: '分段展示已完成进度，按照传入 key 的顺序依次展示',
    },
    size: {
      type: {
        name: 'enum',
        value: ['sm', 'lg'],
      },
      defaultValue: 'sm',
      description: '进度条大小',
    },
  },
} as Meta;

type Story = StoryObj<LineProgressProps>;

export const Default: Story = {
  args: {
    percent: 50,
  },
};

export const RightInfo: Story = {
  render: () => {
    return (
      <>
        <div>
          <Progress percent={50} />
        </div>
        <div>
          <Progress percent={50} rightInfo={'进行中：50%'} />
        </div>
      </>
    );
  },
};

export const Color: Story = {
  render: () => {
    return (
      <>
        <div>
          <Progress percent={50} color="default" />
        </div>
        <div>
          <Progress percent={80} rightInfo={'进行中：80%'} color="warning" />
        </div>
        <div>
          <Progress percent={80} color="danger" disable={10} />
        </div>
      </>
    );
  },
};

export const Popover: Story = {
  args: {
    percent: 50,
    popoverProps: {
      content: '进行中：50%',
    },
  },
};

export const Segmentation: Story = {
  args: {
    segmentation: {
      active: 10,
      warning: 20,
      danger: 30,
      default: 10,
    },
  },
};

export const Size: Story = {
  render: () => {
    return (
      <>
        <div>
          <Progress percent={50} color="default" />
        </div>
        <div>
          <Progress percent={60} color="warning" size="lg" />
        </div>
      </>
    );
  },
};

export const StrokeColor: Story = {
  args: {
    percent: 50,
    strokeColor: '#C9CDD4',
  },
};
