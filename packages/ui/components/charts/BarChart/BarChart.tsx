'use client';
import React from 'react';
import i18next from 'i18next';

import {
  changeByteOptions,
  changePercentOptions,
  changeUnitOptions,
  getInitialOptions,
} from './lib';
import { CoreChart } from '../CoreChart';
import type { CoreChartProps } from '../CoreChart';
import type { Lang } from '../type';

export interface TimeDataItem {
  time: number;
  value: number;
}

export interface TooltipContent {
  text: string;
  url?: string;
}

export interface SeriesItem {
  seriesName: string;
  dataItems: number[] | TimeDataItem[];
  color?: string | ((v: Record<string, any>) => void);
  tollTipContent?: TooltipContent;
}

export interface BarChartProps {
  unit: 'byte' | 'number' | 'percent';
  xAxisType: 'time' | 'category';
  direction: 'vertical' | 'horizontal'; // vertical: 柱状图， horizontal: 条形图
  series: SeriesItem[];
  height: number;
  title: string;
  titleIcon?: React.ReactNode;
  suffix?: string;
  group?: string;
  showXAxis?: boolean;
  stack?: string;
  customLegendIcon?: string;
  showLegend?: boolean;
  onEvents?: CoreChartProps['onEvents'];
  className?: string;
  style?: React.CSSProperties;
  markLineValue?: number;
  categoryData?: string[]; // category 类型的 x 轴数据, category 时必须传入
  enableDataZoom?: boolean;
  legendType?: 'scroll' | 'plain';
  yInside?: boolean; // 是否将 y 轴标签放在柱状图内部
  handleDataZoom?: ({ start, end }: { start: number; end: number }) => void;
}

const CHART_TITLE_AND_LEGEND_SPACING = 8;

/**
 * Owner: 袁德红
 *
 * Figma: https://www.figma.com/design/Do849NlMKTXCv8djOFIFWA/%E9%80%9A%E7%94%A8%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?node-id=14650-60177&p=f&m=dev
 *
 * 柱状图组件
 */
function _BarChart(props: BarChartProps, _: React.ForwardedRef<HTMLDivElement>) {
  const {
    className,
    height,
    onEvents,
    series,
    style,
    showXAxis,
    title,
    titleIcon,
    suffix = '',
    markLineValue,
    group,
    xAxisType,
    unit,
    categoryData,
    direction = 'vertical',
    stack,
    customLegendIcon,
    showLegend = true,
    enableDataZoom,
    legendType,
    handleDataZoom,
    yInside = true,
  } = props;

  const titleRef = React.useRef<HTMLDivElement>(null);
  const [titleWidth, setTitleWidth] = React.useState(0);

  const legendLeft = React.useMemo(
    () => titleWidth + CHART_TITLE_AND_LEGEND_SPACING * 2,
    [titleWidth],
  );

  const legendData = React.useMemo(() => {
    const seriesNameList = series.map((item) => item.seriesName);
    return seriesNameList;
  }, [series]);

  const lang = (i18next.language ?? 'zh-CN') as Lang;

  const initOptions = React.useMemo(() => {
    return getInitialOptions({
      legendLeft,
      legendData,
      legendRight: false,
      showXAxis,
      yInside,
      xAxisType,
      showLegend,
      categoryData,
      direction,
      customLegendIcon,
      enableDataZoom,
      legendType,
    });
  }, [
    legendData,
    legendLeft,
    showXAxis,
    xAxisType,
    categoryData,
    direction,
    showLegend,
    customLegendIcon,
    enableDataZoom,
    legendType,
    yInside,
  ]);

  const options = React.useMemo(() => {
    if (unit === 'byte') {
      return changeByteOptions({
        title,
        series,
        options: initOptions,
        lang,
        suffix,
        yInside: false,
        markLineValue,
        direction,
        stack,
      });
    }

    if (unit === 'percent') {
      return changePercentOptions({
        title,
        series,
        options: initOptions,
        lang,
        suffix: suffix ? suffix : ' %',
        markLineValue,
        direction,
        stack,
      });
    }

    return changeUnitOptions({
      title,
      series,
      options: initOptions,
      lang,
      suffix,
      markLineValue,
      direction,
      stack,
    });
  }, [unit, title, series, initOptions, lang, suffix, markLineValue, direction, stack]);

  React.useEffect(() => {
    setTitleWidth(titleRef.current?.offsetWidth ?? 0);
  }, [titleRef]);

  return (
    <div className="relative">
      <div
        className="absolute inline-flex items-center z-[2] text-text-1 font-medium"
        ref={titleRef}
        style={{
          left: 0,
        }}
      >
        {title}
        {titleIcon}
      </div>
      <CoreChart
        className={className}
        enableDataZoom={enableDataZoom}
        fullWidth
        group={group}
        handleDataZoom={handleDataZoom}
        onEvents={onEvents}
        options={options}
        style={{ ...style, height }}
      />
    </div>
  );
}

const BarChart = React.forwardRef(_BarChart);

export default BarChart;
