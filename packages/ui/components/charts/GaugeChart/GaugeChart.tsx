'use client';
import React from 'react';

import { CoreChart } from '../CoreChart';
import { getCapacityGaugeOption } from './lib';
import type { CoreChartProps } from '../CoreChart';
import type { BindParams } from '../type';

export interface Capacity {
  total: number;
  used: number;
  criticalPercent: number;
  reservedPercent?: number;
}

export type GaugeChartProps = {
  height: number;
  progressWidth?: number;
  className?: string;
  onEvents?: CoreChartProps['onEvents'];
  style?: React.CSSProperties;
} & BindParams<{
  type: 'capacity';
  capacity: Capacity;
}>;

function _GaugeChart(props: GaugeChartProps, _: React.ForwardedRef<HTMLDivElement>) {
  const { className, height, onEvents, progressWidth, style } = props;

  const option = React.useMemo(() => {
    return getCapacityGaugeOption({
      height,
      total: props.capacity?.total ?? 0,
      used: props.capacity?.used ?? 0,
      criticalPercent: props.capacity?.criticalPercent ?? 0.85,
      reservedPercent: props.capacity?.reservedPercent,
      progressWidth,
    });
  }, [
    height,
    progressWidth,
    props.capacity?.criticalPercent,
    props.capacity?.reservedPercent,
    props.capacity?.total,
    props.capacity?.used,
  ]);

  return (
    <CoreChart
      className={className}
      fullWidth
      onEvents={onEvents}
      options={option}
      style={{ ...style, height }}
    />
  );
}

const GaugeChart = React.forwardRef(_GaugeChart);

export default GaugeChart;
