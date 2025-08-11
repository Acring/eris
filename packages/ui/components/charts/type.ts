type BindParams<T> = { [P in keyof T]?: never } | T;

interface ChartType {
  isByte?: boolean;
  isBulk?: boolean;
  isPercent?: boolean;
  isTime?: boolean;
}

interface TimeDataItem {
  time: number;
  value: number;
}

type CategoryDataItem = number;

interface LineSeriesItem {
  dataItems: TimeDataItem[] | CategoryDataItem[];
  seriesName: string;
  color?: string;
  tooltipLink?: {
    text: string;
    url?: string;
  };
  tooltipSubLink?: {
    text: string;
    url?: string;
  };
}

type SeriesProps = {
  data: number[][] | number[];
  name: string;
  type: string;
  [key: string]: any;
} & BindParams<{
  tooltipLink: {
    text: string;
    url?: string;
  };
  tooltipSubLink: {
    text: string;
    url?: string;
  };
}>;

interface TooltipParams {
  color: string;
  seriesName: string;
  value: number[] | number | string;
  axisValueLabel?: string;
  data: number[][] | number[];
  seriesIndex: number;
}

interface LegendPosition {
  type: 'right' | 'bottom';
  top?: number | string;
  bottom?: number | string;
  right?: number | string;
  left?: number | string;
}

type Lang = 'zh-CN' | 'en-US' | 'vi-VM';

export type {
  BindParams,
  ChartType,
  SeriesProps,
  LineSeriesItem,
  TooltipParams,
  Lang,
  LegendPosition,
};
