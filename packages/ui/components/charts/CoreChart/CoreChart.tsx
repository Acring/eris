'use client';
import React from 'react';
import i18next from 'i18next';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { BarChart, LineChart, PieChart, ScatterChart, GaugeChart } from 'echarts/charts';
import {
  GridComponent,
  SingleAxisComponent,
  GraphicComponent,
  TooltipComponent,
  AxisPointerComponent,
  TitleComponent,
  TimelineComponent,
  MarkLineComponent,
  LegendComponent,
  LegendScrollComponent,
  TransformComponent,
  DatasetComponent,
  DataZoomComponent,
  DataZoomInsideComponent,
  DataZoomSliderComponent,
  ToolboxComponent,
} from 'echarts/components';
import { SVGRenderer } from 'echarts/renderers';
import { upperCase, get, throttle } from 'lodash';
import type { EChartsOption } from 'echarts';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import langVI from 'echarts/lib/i18n/langVI';

type ChartRef = any;

type OnEventsFunction = (e: any) => void;

interface CoreChartProps {
  options: EChartsOption;
  group?: string;
  onEvents?: Record<string, OnEventsFunction>;
  fullWidth?: boolean; // 设置图表最外层 width 为 100%, 使其改变浏览器宽度时可以自适应 width
  className?: string;
  style?: React.CSSProperties;
  enableDataZoom?: boolean; // 是否启用数据缩放
  handleDataZoom?: ({ start, end }: { start: number; end: number }) => void;
}

// register the required components
echarts.use &&
  echarts.use([
    // charts
    BarChart,
    LineChart,
    PieChart,
    ScatterChart,
    GaugeChart,

    // components
    TitleComponent,
    LegendComponent,
    LegendScrollComponent,
    GridComponent,
    DataZoomComponent,
    DataZoomInsideComponent,
    DataZoomSliderComponent,
    TooltipComponent,
    AxisPointerComponent,
    SingleAxisComponent,
    TimelineComponent,
    GraphicComponent,
    DatasetComponent,
    MarkLineComponent,
    TransformComponent,
    ToolboxComponent,

    // renderers
    SVGRenderer,
  ]);

// register language: VI -> https://github.com/apache/echarts/blob/release/src/i18n/langVI.ts
echarts.registerLocale('VI', langVI);

const echartsCore = echarts;

function _CoreChart(props: CoreChartProps, _: React.ForwardedRef<HTMLDivElement>) {
  const {
    options,
    group,
    onEvents: events,
    fullWidth,
    className,
    style,
    enableDataZoom,
    handleDataZoom,
  } = props;

  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  const chartRef = React.useRef<ChartRef | null>(null);
  const onEvents = React.useMemo(() => events, [events]);
  const memoOptions = React.useMemo(() => options, [options]);
  const locale = React.useMemo(() => {
    // language formate: zh-CN -> ZH, en-US -> EN, vi-VM -> VI
    const i18nLanguage = i18next.language ?? 'zh-CN';
    const lang = upperCase(i18nLanguage.split('-')[0]);
    return lang;
  }, []);

  const throttledDataZoom = React.useMemo(
    () =>
      throttle(({ start, end }: { start: number; end: number }) => {
        handleDataZoom?.({ start, end });
      }, 500),
    [handleDataZoom],
  );

  // 处理图表初始化
  const handleChartReady = React.useCallback(
    (chart: any) => {
      // 触发数据区间选择事件
      if (enableDataZoom) {
        chart.dispatchAction({
          type: 'takeGlobalCursor',
          key: 'dataZoomSelect',
          dataZoomSelectActive: true, // 允许缩放
        });

        // 监听数据区间选择器的变化
        chart.on('dataZoom', function (param: any) {
          const start = get(param, 'batch.0.startValue');
          const end = get(param, 'batch.0.endValue');
          if (handleDataZoom) {
            throttledDataZoom({ start, end });
          }
        });
      }
    },
    [enableDataZoom, handleDataZoom, throttledDataZoom],
  );

  React.useEffect(() => {
    const chartsEle = chartRef.current?.ele;
    const instance = chartRef.current?.getEchartsInstance();
    if (group && instance) {
      instance.group = group;
      chartRef.current?.echarts.connect(group);
    }
    if (fullWidth && chartsEle) {
      chartsEle.children[0].style.width = '100%';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ReactEChartsCore
      className={className}
      echarts={echarts}
      onChartReady={handleChartReady}
      onEvents={onEvents}
      option={memoOptions}
      opts={{ renderer: 'svg', locale }}
      ref={(e) => {
        chartRef.current = e;
      }}
      style={style}
    />
  );
}

const CoreChart = React.forwardRef(_CoreChart);

export default CoreChart;

export { echartsCore };

export type { CoreChartProps, EChartsOption };
