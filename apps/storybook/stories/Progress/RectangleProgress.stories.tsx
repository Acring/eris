import { Meta, StoryObj } from '@storybook/react';
import { Progress, RectangleProps } from '@xsky/eris-ui';

export default {
  title: 'FEEDBACK/Progress/RectangleProgress',
  component: Progress.Rectangle,
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
    className: {
      control: {
        type: 'string',
      },
      description: '自定义类名',
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
    showInfo: {
      control: {
        type: 'boolean',
      },
      description: '是否显示右边信息',
    },
    popoverProps: {
      description: '弹出框属性',
      table: {
        type: {
          summary: 'PopoverProps',
        },
      },
    },
  },
} as Meta;

type Story = StoryObj<RectangleProps>;

export const Default: Story = {
  args: {
    percent: 50,
  },
};

export const RightInfo: Story = {
  args: {
    percent: 50,
    rightInfo: '进行中：50%',
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

export const StrokeColor: Story = {
  args: {
    percent: 50,
    strokeColor: '#C9CDD4',
  },
};
