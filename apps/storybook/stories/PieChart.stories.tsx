import { Meta, StoryObj } from '@storybook/react';
import { PieChartProps, PieChart, CHART_COLOR_PLATE1 } from '@xsky/eris-ui';

export default {
  title: 'Charts 🆕 /PieChart',
  component: PieChart,
  tags: ['skip-test'],
  argTypes: {
    unit: {
      table: {
        type: { summary: 'byte | number' },
        defaultValue: { summary: '' },
      },
      description: '图表类型',
    },
    totalTitle: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
      description: '自定义求总的主题名称，例如：总计、总量、总条数、总数等',
    },
    series: {
      table: {
        type: { summary: 'PieChartDataItem[]' },
        defaultValue: { summary: '' },
      },
      description: '- 数据项',
    },
    barGap: {
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '6' },
      },
      description: '饼图内外半径的间隙',
    },
    height: {
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '' },
      },
      description: '图表高度',
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
    labelEmphasis: {
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      description: '是否开启 label 动画，即 hover 图例或者图表在饼图中间显示hover 的名字和占比数量',
    },
  },
} as Meta;

type PieChartStory = StoryObj<PieChartProps>;

/**
 * Owner: dehong@xsky.com
 *
 * 饼图图表组件：主要用于表现不同类目的数据在总和中的占比。每个的弧度表示数据数量的比例。
 *
 */
export const Byte: PieChartStory = {
  args: {
    unit: 'byte',
    totalTitle: '总计',
    series: [
      {
        name: '已用',
        value: 1024 * 1024 * 1024,
      },
      {
        name: '未用',
        value: 2 * 1024 * 1024 * 1024,
      },
    ],
    barGap: 6,
    height: 114,
  },
};

export const ByteEmphasis: PieChartStory = {
  args: {
    unit: 'byte',
    totalTitle: '总计',
    series: [
      {
        name: '已用',
        value: 1024 * 1024 * 1024,
      },
      {
        name: '未用',
        value: 2 * 1024 * 1024 * 1024,
      },
    ],
    barGap: 6,
    height: 114,
    labelEmphasis: true,
  },
};

export const Number: PieChartStory = {
  args: {
    unit: 'number',
    totalTitle: '总数',
    series: [
      {
        name: '猕猴桃',
        value: 11223,
        color: CHART_COLOR_PLATE1[3],
      },
      {
        name: '香蕉',
        value: 31231,
        color: CHART_COLOR_PLATE1[0],
      },
      {
        name: '西瓜',
        value: 12830,
        color: CHART_COLOR_PLATE1[9],
      },
      {
        name: '西瓜1',
        value: 12830,
      },
      {
        name: '西瓜2',
        value: 12830,
      },
      {
        name: '西瓜3',
        value: 12830,
      },
      {
        name: '西瓜4',
        value: 12830,
      },
      {
        name: '西瓜5',
        value: 12830,
      },
      {
        name: '西瓜6',
        value: 12830,
      },
    ],
    barGap: 6,
    height: 114,
  },
};

export const NumberEmphasis: PieChartStory = {
  args: {
    unit: 'number',
    totalTitle: '总数',
    series: [
      {
        name: '健康的',
        value: 11223,
        color: CHART_COLOR_PLATE1[7],
      },
      {
        name: '恢复的',
        value: 31231,
        color: CHART_COLOR_PLATE1[0],
      },
      {
        name: '降级的',
        value: 12830,
        color: CHART_COLOR_PLATE1[5],
      },
      {
        name: '不可用',
        value: 12830,
        color: CHART_COLOR_PLATE1[9],
      },
    ],
    barGap: 6,
    height: 114,
    labelEmphasis: true,
  },
};

export const LegendPositionBottom: PieChartStory = {
  args: {
    unit: 'byte',
    totalTitle: '总计',
    legendPosition: {
      type: 'bottom',
      left: 8,
    },
    series: [
      {
        name: '已用',
        value: 1024 * 1024 * 1024,
      },
      {
        name: '未用',
        value: 2 * 1024 * 1024 * 1024,
      },
    ],
    barGap: 6,
    height: 114,
  },
};
