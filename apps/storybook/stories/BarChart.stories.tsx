import { Meta, StoryObj } from '@storybook/react';
import { BarChart, BarChartProps, CHART_COLOR_PLATE1 } from '@xsky/eris-ui';
import lodash from 'lodash';

export default {
  title: 'Charts 🆕 /BarChart',
  component: BarChart,
  tags: ['skip-test'],
  argTypes: {
    unit: {
      table: {
        type: { summary: "'byte' | 'number' | 'percent'" },
        defaultValue: { summary: '' },
      },
      description: '图表类型',
    },
    xAxisType: {
      table: {
        type: { summary: "'time' | 'category'" },
        defaultValue: { summary: '' },
      },
      description: 'x 轴类型',
    },
    series: {
      table: {
        type: { summary: 'SeriesItem[]' },
        defaultValue: { summary: '' },
      },
      description: '数据项',
    },
    title: {
      table: {
        type: { summary: 'string' },
      },
      description: '图表标题',
    },
    titleIcon: {
      table: {
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: 'undefined' },
      },
      description: '图表标题图标',
    },
    height: {
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '' },
      },
      description: '图表高度',
    },
    suffix: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
      description: '图表单位后缀',
    },
    direction: {
      table: {
        type: { summary: "'vertical' | 'horizontal'" },
        defaultValue: { summary: 'vertical' },
      },
      description: '图表方向，vertical: 柱状图， horizontal: 条形图',
    },
    group: {
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
      description: '对相同 group 图表启动事件联动',
    },
    showXAxis: {
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      description: '是否显示 x 轴',
    },
    enableDataZoom: {
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      description: '是否启用数据缩放',
    },
    stack: {
      table: {
        type: { summary: 'string' },
      },
      description: '数据堆叠，同个类目轴上系列配置相同的 stack 值可以堆叠放置(与 Group 一起使用)',
    },
    markLineValue: {
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 'undefined' },
      },
      description: '标记线值',
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
    handleDataZoom: {
      table: {
        type: { summary: '({ start: number, end: number }) => void' },
        defaultValue: { summary: 'undefined' },
      },
    },
  },
} as Meta;

type BarChartStory = StoryObj<BarChartProps>;

const data1 = [1, 2, 11];
const data2 = [3, 6, 1];
const dataTotal = [4, 8, 12];

const dataNumber1Items = [
  { time: 1641888000, value: 1 },
  { time: 1641891600, value: 2 },
  { time: 1641895200, value: 4 },
  { time: 1641898800, value: 8 },
  { time: 1641902400, value: 16 },
  { time: 1641906000, value: 32 },
  { time: 1641909600, value: 64 },
  { time: 1641913200, value: 128 },
  { time: 1641916800, value: 64 },
  { time: 1641920400, value: 32 },
  { time: 1641924000, value: 64 },
  { time: 1641927600, value: 128 },
  { time: 1641931200, value: 256 },
  { time: 1641934800, value: 64 },
  { time: 1641938400, value: 32 },
  { time: 1641942000, value: 8 },
  { time: 1641945600, value: 0 },
];

const dataNumber2Items = [
  { time: 1641888000, value: 11 },
  { time: 1641891600, value: 30 },
  { time: 1641895200, value: 90 },
  { time: 1641898800, value: 8 },
  { time: 1641902400, value: 16 },
  { time: 1641906000, value: 2 },
  { time: 1641909600, value: 64 },
  { time: 1641913200, value: 1 },
  { time: 1641916800, value: 64 },
  { time: 1641920400, value: 4 },
  { time: 1641924000, value: 64 },
  { time: 1641927600, value: 0 },
  { time: 1641931200, value: 80 },
  { time: 1641934800, value: 6 },
  { time: 1641938400, value: 8 },
  { time: 1641942000, value: 40 },
  { time: 1641945600, value: 20 },
];

const dataNumber3Items = [
  { time: 1641888000, value: 1 },
  { time: 1641891600, value: 2 },
  { time: 1641895200, value: 4 },
  { time: 1641898800, value: 2 },
  { time: 1641902400, value: 0 },
  { time: 1641906000, value: -2 },
  { time: 1641909600, value: -4 },
  { time: 1641913200, value: -8 },
  { time: 1641916800, value: -4 },
  { time: 1641920400, value: -2 },
  { time: 1641924000, value: 0 },
  { time: 1641927600, value: 4 },
  { time: 1641931200, value: 16 },
  { time: 1641934800, value: 64 },
  { time: 1641938400, value: 32 },
  { time: 1641942000, value: 8 },
  { time: 1641945600, value: 0 },
];

const LEGEND_ICON_BASE64 =
  'image://data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOCIgaGVpZ2h0PSI4IiB2aWV3Qm94PSIwIDAgOCA4IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDBfMTc2MDNfMTY0OTUyKSI+CjxwYXRoIGQ9Ik0wIDFDMCAwLjQ0NzcxNSAwLjQ0NzcxNSAwIDEgMEg3QzcuNTUyMjggMCA4IDAuNDQ3NzE1IDggMVYzSDBWMVoiIGZpbGw9IiM5QTgxRkIiLz4KPHBhdGggZD0iTTAgNUg4VjdDOCA3LjU1MjI4IDcuNTUyMjggOCA3IDhIMUMwLjQ0NzcxNSA4IDAgNy41NTIyOCAwIDdWNVoiIGZpbGw9IiM0NDhBRkYiLz4KPC9nPgo8ZGVmcz4KPGNsaXBQYXRoIGlkPSJjbGlwMF8xNzYwM18xNjQ5NTIiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSJ3aGl0ZSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPgo=';

/**
 * Owner: dehong@xsky.com
 *
 *  柱状图（或称条形图）是一种通过柱形的高度（横向的情况下则是宽度）来表现数据大小的一种常用图表类型。
 *
 */
export const Basic: BarChartStory = {
  args: {
    unit: 'number',
    xAxisType: 'category',
    showXAxis: true,
    title: '动物数量',
    height: 300,
    suffix: '只',
    yInside: false,
    categoryData: ['🐈', '🐶', '🐱'],
    series: [
      {
        dataItems: dataTotal,
        seriesName: '动物数量',
      },
    ],
  },
};

export const Group: BarChartStory = {
  args: {
    unit: 'number',
    xAxisType: 'category',
    showXAxis: true,
    title: '动物数量',
    height: 300,
    suffix: '只',
    categoryData: ['🐈', '🐶', '🐱'],
    series: [
      {
        dataItems: data1,
        seriesName: '雌',
      },
      {
        dataItems: data2,
        seriesName: '雄',
      },
    ],
  },
};

export const Stack: BarChartStory = {
  args: {
    unit: 'number',
    xAxisType: 'category',
    showXAxis: true,
    title: '动物数量',
    height: 300,
    suffix: '只',
    categoryData: ['🐈', '🐶', '🐱'],
    stack: '雌',
    series: [
      {
        dataItems: data1,
        seriesName: '雌',
      },
      {
        dataItems: data2,
        seriesName: '雄',
      },
    ],
  },
};

export const Direction: BarChartStory = {
  args: {
    unit: 'number',
    xAxisType: 'category',
    showXAxis: true,
    title: '动物数量',
    height: 300,
    suffix: '只',
    direction: 'horizontal',
    yInside: false,
    categoryData: ['🐈', '🐶', '🐱'],
    series: [
      {
        dataItems: data1,
        seriesName: '雌',
      },
      {
        dataItems: data2,
        seriesName: '雄',
      },
    ],
  },
};

export const Time: BarChartStory = {
  args: {
    unit: 'number',
    xAxisType: 'time',
    showXAxis: true,
    title: '动物数量',
    height: 300,
    suffix: '只',
    series: [
      {
        dataItems: dataNumber1Items,
        seriesName: '🐈',
      },
      {
        dataItems: dataNumber2Items,
        seriesName: '🐶',
      },
    ],
  },
};

export const CustomLegendIcon: BarChartStory = {
  args: {
    unit: 'number',
    xAxisType: 'time',
    showXAxis: true,
    title: '猫咪出生变化量',
    height: 300,
    suffix: '只',
    customLegendIcon: LEGEND_ICON_BASE64,
    series: [
      {
        dataItems: dataNumber3Items,
        seriesName: '🐈',
        color: (data) => {
          const value = lodash.get(data, 'value.1', 0);
          return value > 0 ? CHART_COLOR_PLATE1[0] : CHART_COLOR_PLATE1[1];
        },
      },
    ],
  },
};

export const EnableDataZoom: BarChartStory = {
  args: {
    unit: 'number',
    xAxisType: 'time',
    showXAxis: true,
    title: '猫咪出生变化量',
    height: 300,
    suffix: '只',
    customLegendIcon: LEGEND_ICON_BASE64,
    enableDataZoom: true,
    handleDataZoom: ({ start, end }) => {
      console.log('== start ==', start);
      console.log('== end ==', end);
    },
    series: [
      {
        dataItems: dataNumber3Items,
        seriesName: '🐈',
        color: (data) => {
          const value = lodash.get(data, 'value.1', 0);
          return value > 0 ? CHART_COLOR_PLATE1[0] : CHART_COLOR_PLATE1[1];
        },
      },
    ],
  },
};
