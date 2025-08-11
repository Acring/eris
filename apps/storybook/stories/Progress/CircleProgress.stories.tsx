import { Meta, StoryObj } from '@storybook/react';
import { Progress, CircleProgressProps } from '@xsky/eris-ui';

export default {
  title: 'FEEDBACK/Progress/CircleProgress',
  component: Progress.Circle,
  tags: ['visual-test'],
  parameters: {
    docs: {
      controls: { exclude: ['circleRadius', 'ringWidth'] },
    },
  },
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
        type: 'text',
      },
      description: '自定义类名',
    },
    middleInfo: {
      description: '中间信息',
      control: {
        type: 'text',
      },
    },
    showInfo: {
      control: {
        type: 'boolean',
      },
      description: '是否显示中间信息',
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

type Story = StoryObj<CircleProgressProps>;

export const Default: Story = {
  args: {
    percent: 50,
  },
};

export const Popover: Story = {
  args: {
    percent: 50,
    popoverProps: {
      content: '50%',
      className: 'bg-grey-1000',
      contentClass: 'text-white',
      arrowClass: 'bg-grey-1000',
    },
  },
};

export const StrokeColor: Story = {
  args: {
    percent: 50,
    strokeColor: '#C9CDD4',
  },
};
