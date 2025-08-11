import { Meta, StoryObj } from '@storybook/react';
import { GaugeChart, GaugeChartProps } from '@xsky/eris-ui';

export default {
  title: 'Charts 🆕 /GaugeChart',
  component: GaugeChart,
  tags: ['skip-test'],
  argTypes: {
    height: {
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '' },
      },
      description: '图表高度',
    },
    progressWidth: {
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '8' },
      },
      description: '进度条宽度',
    },
    capacity: {
      table: {
        type: { summary: 'Capacity' },
        defaultValue: { summary: '{}' },
      },
      description: '图表容量配置',
    },
    className: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    style: {
      table: {
        type: { summary: 'CSSProperties' },
        defaultValue: { summary: '{}' },
      },
    },
    onEvents: {
      table: {
        type: { summary: 'Record<string, OnEventsFunction>' },
        defaultValue: { summary: '{}' },
      },
    },
  },
} as Meta;

type GaugeChartStory = StoryObj<GaugeChartProps>;

/**
 * Owner: dehong@xsky.com
 *
 * 仪表盘图表组件：是让用户能够直观地了解设备的运行状态，以便更好地调整设备。
 *
 */
export const Basic: GaugeChartStory = {
  args: {
    height: 120,
    progressWidth: 8,
    capacity: {
      total: 1024 * 1024 * 1024 * 3,
      used: 1024 * 1024 * 1024 * 2,
      criticalPercent: 0.95,
    },
  },
};

export const Success: GaugeChartStory = {
  args: {
    height: 120,
    progressWidth: 8,
    capacity: {
      total: 1024 * 1024 * 1024 * 3,
      used: 1024 * 1024 * 1024 * 3 * 0.35,
      criticalPercent: 0.95,
    },
  },
};

export const Warning: GaugeChartStory = {
  args: {
    height: 120,
    progressWidth: 8,
    capacity: {
      total: 1024 * 1024 * 1024 * 3,
      used: 1024 * 1024 * 1024 * 3 * 0.75,
      criticalPercent: 0.95,
    },
  },
};

export const Error: GaugeChartStory = {
  args: {
    height: 120,
    progressWidth: 8,
    capacity: {
      total: 1024 * 1024 * 1024 * 3,
      used: 1024 * 1024 * 1024 * 3 * 0.88,
      criticalPercent: 0.95,
    },
  },
};

export const Critical: GaugeChartStory = {
  args: {
    height: 120,
    progressWidth: 8,
    capacity: {
      total: 1024 * 1024 * 1024 * 3,
      used: 1024 * 1024 * 1024 * 3 * 0.96,
      criticalPercent: 0.95,
    },
  },
};

export const PartiallyDisabled: GaugeChartStory = {
  args: {
    height: 120,
    progressWidth: 8,
    capacity: {
      total: 1024 * 1024 * 1024 * 3,
      used: 1024 * 1024 * 1024 * 2,
      criticalPercent: 0.95,
      reservedPercent: 0.1,
    },
  },
};
