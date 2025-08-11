'use client';
import React from 'react';
import i18next from 'i18next';
// import dateFns from 'date-fns';

import {
  changeByteOptions,
  changePercentOptions,
  changeTimeOptions,
  changeUnitOptions,
} from './lib';
import { getInitialOptions } from '../utils';
import { CoreChart } from '../CoreChart';
import type { CoreChartProps } from '../CoreChart';
import type { LineSeriesItem, Lang } from '../type';

export interface LineChartProps {
  unit: 'byte' | 'number' | 'percent' | 'ms';
  xAxisType: 'time' | 'category';
  legendPosition: 'left-top' | 'right';
  series: LineSeriesItem[];
  title: string;
  height: number;
  titleIcon?: React.ReactNode;
  suffix?: string;
  group?: string;
  showXAxis?: boolean;
  enableArea?: boolean;
  fixedHorizontalTooltip?: boolean;
  onEvents?: CoreChartProps['onEvents'];
  className?: string;
  style?: React.CSSProperties;
  enableDataZoom?: boolean;
  legendType?: 'scroll' | 'plain';
  yInside?: boolean; // 是否将 y 轴标签放在折线图内部
  handleDataZoom?: ({ start, end }: { start: number; end: number }) => void;
}

const CHART_TITLE_AND_LEGEND_SPACING = 8;

/**
 * Owner: 袁德红
 *
 * Figma: https://www.figma.com/design/Do849NlMKTXCv8djOFIFWA/%E9%80%9A%E7%94%A8%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?node-id=14650-60177&p=f&m=dev
 *
 * 折线图组件
 */
function _LineChart(props: LineChartProps, _: React.ForwardedRef<HTMLDivElement>) {
  const {
    className,
    height,
    onEvents,
    series,
    style,
    title,
    titleIcon,
    unit,
    suffix = '',
    group,
    showXAxis,
    enableArea,
    fixedHorizontalTooltip,
    xAxisType,
    legendPosition,
    enableDataZoom,
    legendType,
    yInside = true,
    handleDataZoom,
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

  const initOptions = React.useMemo(() => {
    return getInitialOptions({
      titleName: title,
      legendLeft,
      legendData,
      legendRight: legendPosition === 'right',
      showXAxis,
      xSplitNumber: 3,
      yInside,
      xAxisType,
      enableDataZoom,
      legendType,
    });
  }, [
    legendData,
    legendLeft,
    legendPosition,
    showXAxis,
    title,
    xAxisType,
    enableDataZoom,
    legendType,
    yInside,
  ]);

  const lang = (i18next.language ?? 'zh-CN') as Lang;

  const options = React.useMemo(() => {
    if (unit === 'byte') {
      return changeByteOptions({
        title,
        series,
        options: initOptions,
        lang,
        suffix,
        yInside,
        fixedPosition: fixedHorizontalTooltip,
        enableArea,
      });
    }

    if (unit === 'ms') {
      return changeTimeOptions({
        title,
        series,
        options: initOptions,
        lang,
        suffix,
        fixedPosition: fixedHorizontalTooltip,
        enableArea,
      });
    }

    if (unit === 'percent') {
      return changePercentOptions({
        title,
        series,
        options: initOptions,
        lang,
        suffix: suffix ? suffix : ' %',
        fixedPosition: fixedHorizontalTooltip,
        enableArea,
      });
    }

    return changeUnitOptions({
      title,
      series,
      options: initOptions,
      lang,
      suffix,
      fixedPosition: fixedHorizontalTooltip,
      enableArea,
    });
  }, [unit, title, series, initOptions, lang, suffix, fixedHorizontalTooltip, enableArea, yInside]);

  React.useEffect(() => {
    setTitleWidth(titleRef.current?.offsetWidth ?? 0);
  }, [titleRef]);

  return (
    <div className="relative">
      <div
        className="absolute inline-flex items-center z-[2] text-text-1 font-medium"
        ref={titleRef}
        style={{
          right: legendPosition === 'right' ? 88 : undefined,
          left: legendPosition === 'left-top' ? 0 : undefined,
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

const LineChart = React.forwardRef(_LineChart);

export default LineChart;
