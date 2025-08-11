import { Meta, StoryObj } from '@storybook/react';
import { LineChart, LineChartProps, IconButton, Tooltip } from '@xsky/eris-ui';
import { InfoLine16 } from '@xsky/eris-icons';

export default {
  title: 'Charts 🆕 /LineChart',
  component: LineChart,
  tags: ['skip-test'],
  argTypes: {
    unit: {
      table: {
        type: { summary: "'byte' | 'number' | 'percent' | 'ms'" },
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
    legendPosition: {
      table: {
        type: { summary: "'left-top' | 'right'" },
        defaultValue: { summary: '' },
      },
      description: '图例位置',
    },
    series: {
      table: {
        type: { summary: 'LineSeriesItem[]' },
        defaultValue: { summary: '' },
      },
      description: '数据项',
    },
    title: {
      table: {
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: 'undefined' },
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
    enableArea: {
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
      description: '是否开启面积图',
    },
    enableDataZoom: {
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      description: '是否启用数据缩放',
    },
    fixedHorizontalTooltip: {
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      description: '是否固定水平 tooltip',
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

type LineChartStory = StoryObj<LineChartProps>;

const dataWriteItems = [
  { time: 1641888000, value: 11094816 },
  { time: 1641891600, value: 11194816 },
  { time: 1641895200, value: 11294816 },
  { time: 1641898800, value: 11394816 },
  { time: 1641902400, value: 11494816 },
  { time: 1641906000, value: 11594816 },
  { time: 1641909600, value: 11694816 },
  { time: 1641913200, value: 11094816 },
  { time: 1641916800, value: 11194816 },
  { time: 1641920400, value: 11194816 },
  { time: 1641924000, value: 11094816 },
  { time: 1641927600, value: 11094816 },
  { time: 1641931200, value: 11094816 },
  { time: 1641934800, value: 11394816 },
  { time: 1641938400, value: 11294816 },
  { time: 1641942000, value: 11194816 },
  { time: 1641945600, value: 11194816 },
];

const dataPercentItems = [
  { time: 1641888000, value: 0.11 },
  { time: 1641891600, value: 0.12 },
  { time: 1641895200, value: 0.22 },
  { time: 1641898800, value: 0.42 },
  { time: 1641902400, value: 0.62 },
  { time: 1641906000, value: 0.12 },
  { time: 1641909600, value: 0.72 },
  { time: 1641913200, value: 0.72 },
  { time: 1641916800, value: 0.82 },
  { time: 1641920400, value: 0.92 },
  { time: 1641924000, value: 1.02 },
  { time: 1641927600, value: 0.82 },
  { time: 1641931200, value: 0.62 },
  { time: 1641934800, value: 0.52 },
  { time: 1641938400, value: 0.32 },
  { time: 1641942000, value: 0.22 },
  { time: 1641945600, value: 0.12 },
];

const dataTimeItems = [
  { time: 1641888000, value: 30 },
  { time: 1641891600, value: 20 },
  { time: 1641895200, value: 10 },
  { time: 1641898800, value: 5 },
  { time: 1641902400, value: 4 },
  { time: 1641906000, value: 2 },
  { time: 1641909600, value: 1 },
  { time: 1641913200, value: 30 },
  { time: 1641916800, value: 60 },
  { time: 1641920400, value: 90 },
  { time: 1641924000, value: 120 },
  { time: 1641927600, value: 90 },
  { time: 1641931200, value: 60 },
  { time: 1641934800, value: 30 },
  { time: 1641938400, value: 15 },
  { time: 1641942000, value: 10 },
  { time: 1641945600, value: 0 },
];

const dataNumberItems = [
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

const dataNumber1Items = [
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

const dataNumber2Items = [1, 0, 11, 2, 3, 45, 2, 5, 35, 60, 67, 212, 159, 79, 90, 67, 10];
const dataNumber3Items = [11, 0, 111, 3, 32, 5, 12, 54, 135, 10, 67, 12, 59, 19, 10, 37, 0];

/**
 * Owner: dehong@xsky.com
 *
 *  折线图表核心组件用于：将各个数据点标志连接起来的图表，用于展现数据的变化趋势。
 *
 */
export const Basic: LineChartStory = {
  args: {
    unit: 'number',
    xAxisType: 'time',
    legendPosition: 'left-top',
    showXAxis: true,
    title: '动物数量',
    height: 300,
    yInside: false,
    series: [
      {
        dataItems: dataNumberItems,
        seriesName: '🐈',
      },
      {
        dataItems: dataNumber1Items,
        seriesName: '🐶',
      },
    ],
  },
};

export const Byte: LineChartStory = {
  args: {
    unit: 'byte',
    xAxisType: 'time',
    legendPosition: 'left-top',
    showXAxis: true,
    title: '带宽',
    height: 300,
    series: [
      {
        dataItems: dataWriteItems,
        seriesName: '写',
      },
    ],
  },
};

export const Time: LineChartStory = {
  args: {
    unit: 'ms',
    xAxisType: 'time',
    legendPosition: 'left-top',
    showXAxis: true,
    title: '延迟',
    height: 300,
    series: [
      {
        dataItems: dataPercentItems,
        seriesName: '读',
      },
    ],
  },
};

export const Percent: LineChartStory = {
  args: {
    unit: 'percent',
    xAxisType: 'time',
    legendPosition: 'left-top',
    showXAxis: true,
    title: '使用率',
    height: 300,
    series: [
      {
        dataItems: dataTimeItems,
        seriesName: 'CPU 利用率',
      },
    ],
  },
};

export const Number: LineChartStory = {
  args: {
    unit: 'number',
    xAxisType: 'time',
    legendPosition: 'left-top',
    showXAxis: true,
    title: '丢包率',
    suffix: ' 个/s',
    height: 300,
    series: [
      {
        dataItems: dataNumberItems,
        seriesName: '10.10.10.10',
      },
    ],
  },
};

export const TitleIcon: LineChartStory = {
  args: {
    unit: 'number',
    xAxisType: 'time',
    legendPosition: 'left-top',
    showXAxis: true,
    title: '丢包率',
    suffix: ' 个/s',
    titleIcon: (
      <Tooltip title="This is a chart title icon tooltip">
        <IconButton color="default">
          <InfoLine16 />
        </IconButton>
      </Tooltip>
    ),
    height: 300,
    series: [
      {
        dataItems: dataNumberItems,
        seriesName: '10.10.10.10',
      },
    ],
  },
};

export const EnableArea: LineChartStory = {
  args: {
    unit: 'number',
    xAxisType: 'time',
    legendPosition: 'left-top',
    showXAxis: true,
    title: '不开启面积图',
    height: 300,
    enableArea: false,
    series: [
      {
        dataItems: dataNumberItems,
        seriesName: 'line-1',
      },
      {
        dataItems: dataNumber1Items,
        seriesName: 'line-2',
      },
    ],
  },
};

export const XAxisCategory: LineChartStory = {
  args: {
    unit: 'number',
    xAxisType: 'category',
    legendPosition: 'left-top',
    showXAxis: true,
    title: '数量',
    height: 300,
    series: [
      {
        dataItems: dataNumber2Items,
        seriesName: 'line-1',
      },
    ],
  },
};

export const LegendPositionRight: LineChartStory = {
  args: {
    unit: 'number',
    xAxisType: 'category',
    legendPosition: 'right',
    showXAxis: true,
    title: '数量',
    height: 300,
    series: [
      {
        dataItems: dataNumber2Items,
        seriesName: 'line-1',
      },
      {
        dataItems: dataNumber3Items,
        seriesName: 'line-2',
      },
      {
        dataItems: dataNumber3Items,
        seriesName: 'line-3',
      },
    ],
  },
};

export const Group: LineChartStory = {
  render: (args) => (
    <div className="gap-4">
      <div>
        <LineChart
          {...args}
          unit="ms"
          xAxisType="time"
          legendPosition="left-top"
          title="延迟"
          height={300}
          group="group-1"
          series={[
            {
              dataItems: dataPercentItems,
              seriesName: '读',
            },
          ]}
        />
      </div>
      <div>
        <LineChart
          {...args}
          unit="percent"
          xAxisType="time"
          legendPosition="left-top"
          title="使用率"
          height={300}
          group="group-1"
          series={[
            {
              dataItems: dataTimeItems,
              seriesName: 'CPU 利用率',
            },
          ]}
        />
      </div>
      <div>
        <LineChart
          {...args}
          unit="number"
          showXAxis
          xAxisType="time"
          legendPosition="left-top"
          title="丢包率"
          height={300}
          group="group-1"
          series={[
            {
              dataItems: dataNumberItems,
              seriesName: '10.10.10.10',
            },
          ]}
        />
      </div>
    </div>
  ),
};

export const EnableDataZoom: LineChartStory = {
  render: (args) => (
    <div className="gap-4">
      <div>
        <LineChart
          {...args}
          unit="ms"
          xAxisType="time"
          legendPosition="left-top"
          title="延迟"
          height={300}
          group="group-1"
          series={[
            {
              dataItems: dataPercentItems,
              seriesName: '读',
            },
          ]}
          enableDataZoom
        />
      </div>
      <div>
        <LineChart
          {...args}
          unit="percent"
          xAxisType="time"
          legendPosition="left-top"
          title="使用率"
          height={300}
          group="group-1"
          series={[
            {
              dataItems: dataTimeItems,
              seriesName: 'CPU 利用率',
            },
          ]}
          enableDataZoom
        />
      </div>
      <div>
        <LineChart
          {...args}
          unit="number"
          showXAxis
          xAxisType="time"
          legendPosition="left-top"
          title="丢包率"
          height={300}
          group="group-1"
          series={[
            {
              dataItems: dataNumberItems,
              seriesName: '10.10.10.10',
            },
          ]}
          enableDataZoom
          handleDataZoom={({ start, end }) => {
            console.log('== start ==', start);
            console.log('== end ==', end);
          }}
        />
      </div>
    </div>
  ),
};
