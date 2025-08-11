'use client';
import React from 'react';
import i18next from 'i18next';

import { getInitPieOptions, changePieOptions, getFinalHeight } from './lib';
import { CoreChart } from '../CoreChart';
import type { CoreChartProps } from '../CoreChart';
import type { Lang, LegendPosition } from '../type.ts';

export interface PieChartDataItem {
  name: string;
  value: number;
  color?: string;
}

export interface PieChartProps {
  unit: 'byte' | 'number';
  totalTitle: string;
  series: PieChartDataItem[];
  height: number;
  barGap: number;
  labelEmphasis?: boolean;
  onEvents?: CoreChartProps['onEvents'];
  className?: string;
  style?: React.CSSProperties;
  legendType?: 'scroll' | 'plain';
  legendPosition?: LegendPosition;
}

/**
 * Owner: 袁德红
 *
 * Figma: https://www.figma.com/design/Do849NlMKTXCv8djOFIFWA/%E9%80%9A%E7%94%A8%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?node-id=14650-60177&p=f&m=dev
 *
 * 饼图组件
 */
function _PieChart(props: PieChartProps, _: React.ForwardedRef<HTMLDivElement>) {
  const {
    barGap = 6,
    className,
    height,
    onEvents,
    series,
    style,
    totalTitle,
    unit,
    labelEmphasis,
    legendType,
    legendPosition = {
      type: 'right',
    },
  } = props;

  const seriesNum = series.length;

  const lang = (i18next.language ?? 'zh-CN') as Lang;
  let options = getInitPieOptions({
    title: totalTitle,
    height,
    barGap,
    unit,
    labelEmphasis,
    lang,
    legendType,
    legendPosition,
    seriesNum,
  });
  options = changePieOptions(options, series, unit, lang);
  const finalHeight = getFinalHeight({ height, legendPosition, seriesNum });

  return (
    <CoreChart
      className={className}
      fullWidth
      onEvents={onEvents}
      options={options}
      style={{ ...style, height: finalHeight }}
    />
  );
}

const PieChart = React.forwardRef(_PieChart);

export default PieChart;
