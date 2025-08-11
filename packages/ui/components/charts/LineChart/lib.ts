import lodash from 'lodash';
import { graphic } from 'echarts/core';
import colorJS from 'color-js';
import type { EChartsOption } from 'echarts';

import xbytes from '@/lib/xbytes';
import xtime from '@/lib/xtime';
import bulk from '@/lib/bulk';
import { getAlphaColor } from '@/lib/utils';
import type { UnitMapKeyTypes } from '@/lib/xbytes';
import type { MapKeyTypes } from '@/lib/xtime';

import {
  transformSeriesUnit,
  transformTooltip,
  transformValue,
  transformYAxisUnit,
  getMarkLineOption,
  getChartMaxUnit,
} from '../utils';
import { CHART_COLOR_PLATE1 } from '../lib';
import type { ChartType, SeriesProps, LineSeriesItem, Lang } from '../type';

const getSeriesColor = (seriesItemIndex: number, seriesItemColor?: string) => {
  const colorPlate1Length = CHART_COLOR_PLATE1.length - 1;
  const seriesColor = seriesItemColor
    ? seriesItemColor
    : CHART_COLOR_PLATE1[seriesItemIndex > colorPlate1Length ? colorPlate1Length : seriesItemIndex];

  return seriesColor;
};

const chartMaxByteFunc = (value: number) =>
  xbytes.format(value, { splitUnit: true, capacityBase: 1000 });

const transformSeriesByteFunc = (value: number, maxUnit?: string) =>
  xbytes.format(value, {
    toUnit: maxUnit as UnitMapKeyTypes,
    splitUnit: true,
  }) ?? [];

const transformYAxisByteFunc = (value: string, yInside?: boolean) => {
  const parseValue = xbytes.parse(value);
  return typeof parseValue === 'number'
    ? xbytes.format(parseValue, { unitSeparator: ' ', decimalPlaces: yInside ? undefined : 0 }) ??
        ''
    : '';
};

const transformTooltipByteFunc = (value: number) =>
  xbytes.format(value, {
    unitSeparator: ' ',
  }) ?? '';

const changeByteOptions = (props: {
  title: string;
  series: LineSeriesItem[];
  options: EChartsOption;
  lang: Lang;
  suffix: string;
  yInside?: boolean;
  fixedPosition?: boolean;
  enableArea?: boolean;
}) => {
  const { series, options, lang, suffix, yInside, fixedPosition, title, enableArea } = props;

  series.forEach((seriesItem, seriesItemIndex) => {
    const seriesDataItems = seriesItem?.dataItems.map((item) => {
      return typeof item === 'number' ? item : [item.time * 1000, item.value];
    });
    const seriesColor = getSeriesColor(seriesItemIndex, seriesItem?.color);

    (options.series as any[]).push(
      getLineOptionsSeries({
        seriesLength: series?.length || 0,
        seriesData: seriesDataItems,
        name: seriesItem?.seriesName,
        primaryColor: seriesColor,
        tooltipLink: seriesItem.tooltipLink,
        tooltipSubLink: seriesItem.tooltipSubLink,
        enableArea,
      }),
    );
  });

  options.legend = transformLineChartArrayLegend({
    legend: options.legend,
    seriesList: series,
    type: { isByte: true },
    suffix,
    lang,
  });

  options.tooltip = transformTooltip({
    tooltip: options.tooltip,
    suffix,
    func: transformTooltipByteFunc,
    rowSeries: options.series as unknown as SeriesProps[],
    showHeader: true,
    title,
    fixedPosition,
  });

  const maxUnit = getChartMaxUnit(options.series as unknown as SeriesProps[], chartMaxByteFunc);

  options.yAxis = transformYAxisUnit(
    options.yAxis,
    maxUnit,
    suffix,
    transformYAxisByteFunc,
    yInside,
  );

  // 转换 series 单位，需要在最后执行，否则会导致 tooltip 显示错误
  options.series = transformSeriesUnit(
    options.series as unknown as SeriesProps[],
    transformSeriesByteFunc,
    maxUnit,
  );

  return options;
};

const transformPercentYAxis = (yAxis: EChartsOption['yAxis'], suffix: string) => {
  const defaultYAxis = {
    axisLabel: {
      formatter: (value: number) => `${lodash.round(value, 3)}${suffix}`,
    },
  };
  return lodash.merge({}, defaultYAxis, yAxis);
};

const changePercentOptions = (props: {
  title: string;
  series: LineSeriesItem[];
  options: EChartsOption;
  lang: Lang;
  suffix: string;
  fixedPosition?: boolean;
  enableArea?: boolean;
}) => {
  const { series, options, lang, suffix, fixedPosition, title, enableArea } = props;

  series.forEach((seriesItem, seriesItemIndex) => {
    const seriesDataItems = seriesItem?.dataItems.map((item) => {
      return typeof item === 'number' ? item : [item.time * 1000, item.value];
    });

    const seriesColor = getSeriesColor(seriesItemIndex, seriesItem?.color);

    (options.series as any[]).push(
      getLineOptionsSeries({
        seriesLength: series?.length || 0,
        seriesData: seriesDataItems,
        name: seriesItem?.seriesName,
        primaryColor: seriesColor,
        tooltipLink: seriesItem.tooltipLink,
        tooltipSubLink: seriesItem.tooltipSubLink,
        enableArea,
      }),
    );
  });

  options.legend = transformLineChartArrayLegend({
    legend: options.legend,
    seriesList: series,
    type: { isPercent: true },
    suffix,
    lang,
  });

  options.tooltip = transformTooltip({
    tooltip: options.tooltip,
    suffix,
    rowSeries: options.series as unknown as SeriesProps[],
    showHeader: true,
    title,
    fixedPosition,
  });

  options.yAxis = transformPercentYAxis(options.yAxis, suffix);

  return options;
};

const chartMaxTimeFunc = (value: number) => xtime.format(value, { splitUnit: true }) as string[];

const transformTimeYAxis = (yAxis: EChartsOption['yAxis'], unit: string, suffix: string) => {
  const defaultYAxis = {
    axisLabel: {
      formatter: (value: number) => {
        const str =
          unit !== 'μs'
            ? (xtime.format(value, { unit: unit as MapKeyTypes, unitSeparator: ' ' }) as string)
            : (xtime.format(value, { unitSeparator: ' ' }) as string);
        return `${str}${suffix}`;
      },
    },
  };
  return lodash.merge({}, defaultYAxis, yAxis);
};

const transformSeriesTimeFunc = (value: number, maxUnit?: string) =>
  xtime.format(value, {
    toUnit: maxUnit as MapKeyTypes,
    splitUnit: true,
  }) as string[];

const transformTooltipTimeFunc = (value: number) =>
  xtime.format(value, {
    unitSeparator: ' ',
    splitUnit: false,
  }) as string;

const changeTimeOptions = (props: {
  title: string;
  series: LineSeriesItem[];
  options: EChartsOption;
  lang: Lang;
  suffix: string;
  fixedPosition?: boolean;
  enableArea?: boolean;
}) => {
  const { series, options, lang, suffix, fixedPosition, title, enableArea } = props;

  series.forEach((seriesItem, seriesItemIndex) => {
    const seriesDataItems = seriesItem?.dataItems.map((item) => {
      return typeof item === 'number' ? item : [item.time * 1000, item.value];
    });

    const seriesColor = getSeriesColor(seriesItemIndex, seriesItem?.color);

    (options.series as any[]).push(
      getLineOptionsSeries({
        seriesLength: series?.length || 0,
        seriesData: seriesDataItems,
        name: seriesItem?.seriesName,
        primaryColor: seriesColor,
        tooltipLink: seriesItem.tooltipLink,
        tooltipSubLink: seriesItem.tooltipSubLink,
        enableArea,
      }),
    );
  });

  options.legend = transformLineChartArrayLegend({
    legend: options.legend,
    seriesList: series,
    type: { isTime: true },
    suffix,
    lang,
  });

  options.tooltip = transformTooltip({
    tooltip: options.tooltip,
    suffix,
    func: transformTooltipTimeFunc,
    rowSeries: options.series as unknown as SeriesProps[],
    showHeader: true,
    title,
    fixedPosition,
  });

  const maxUnit = getChartMaxUnit(options.series as unknown as SeriesProps[], chartMaxTimeFunc);

  options.yAxis = transformTimeYAxis(options.yAxis, maxUnit, suffix);

  options.series = transformSeriesUnit(
    options.series as unknown as SeriesProps[],
    transformSeriesTimeFunc,
    maxUnit,
  );

  return options;
};

const transformBulkYAxis = (yAxis: EChartsOption['yAxis'], suffix?: string, lang?: Lang) => {
  const defaultYAxis = {
    axisLabel: {
      formatter: (value: number) => {
        return `${
          value > 1000 ? (bulk(value, undefined, lang) as string) : lodash.round(value, 3)
        }${suffix}`; // 对于 bulk 只有大于 1000 才需要会处理
      },
    },
  };
  return lodash.merge({}, defaultYAxis, yAxis);
};

const changeUnitOptions = (props: {
  title: string;
  series: LineSeriesItem[];
  options: EChartsOption;
  lang: Lang;
  suffix: string;
  fixedPosition?: boolean;
  enableArea?: boolean;
}): EChartsOption => {
  const { series, options, lang, suffix, fixedPosition, title, enableArea } = props;

  series.forEach((seriesItem, seriesItemIndex) => {
    const seriesDataItems = seriesItem?.dataItems.map((item) => {
      return typeof item === 'number' ? item : [item.time * 1000, item.value];
    });

    const seriesColor = getSeriesColor(seriesItemIndex, seriesItem?.color);

    (options.series as any[]).push(
      getLineOptionsSeries({
        seriesLength: series?.length || 0,
        seriesData: seriesDataItems,
        name: seriesItem?.seriesName,
        primaryColor: seriesColor,
        tooltipLink: seriesItem.tooltipLink,
        tooltipSubLink: seriesItem.tooltipSubLink,
        enableArea,
      }),
    );
  });

  options.legend = transformLineChartArrayLegend({
    legend: options.legend,
    seriesList: series,
    type: { isBulk: true },
    suffix,
    lang,
  });

  options.tooltip = transformTooltip({
    tooltip: options.tooltip,
    suffix,
    rowSeries: options.series as unknown as SeriesProps[],
    showHeader: true,
    title,
    fixedPosition,
  });

  options.yAxis = transformBulkYAxis(options.yAxis, suffix, lang);

  return options;
};

function getLineOptionsSeries(params: {
  seriesData: any[];
  name: string;
  primaryColor?: string;
  markLineValue?: number;
  seriesLength?: number;
  tooltipLink?: {
    text: string;
    url?: string;
  };
  tooltipSubLink?: {
    text: string;
    url?: string;
  };
  enableArea?: boolean;
}) {
  const {
    seriesData,
    name,
    primaryColor = CHART_COLOR_PLATE1[0],
    markLineValue = undefined,
    seriesLength,
    tooltipLink,
    tooltipSubLink,
    enableArea = true,
  } = params;
  const needChangeOpacity = primaryColor === CHART_COLOR_PLATE1[2];
  return {
    name,
    type: 'line',
    silent: true,
    itemStyle: {
      color: primaryColor,
    },
    areaStyle: {
      opacity: enableArea ? (needChangeOpacity ? 0.4 : 0.8) : 0,
      color: new graphic.LinearGradient(0, 0, 0, 1, [
        {
          offset: 0,
          color: colorJS(primaryColor)
            .setAlpha(seriesLength && seriesLength > 3 ? 0.03 : 0.16)
            .toString(),
        },
        {
          offset: 1,
          color: getAlphaColor(primaryColor, 0),
        },
      ]),
    },
    animationEasing: 'elasticOut',
    animationDelay(idx: number) {
      return idx * 10;
    },
    animationDelayUpdate(idx: number) {
      return idx * 10;
    },
    lineStyle: {
      width: 1,
    },
    emphasis: {
      lineStyle: {
        width: 1,
      },
    },
    showSymbol: false,
    symbol: 'circle',
    symbolSize: 8,
    data: seriesData,
    markLine: typeof markLineValue === 'number' ? getMarkLineOption(markLineValue) : undefined,
    tooltipLink,
    tooltipSubLink,
  } as any;
}

function transformLineChartArrayLegend(props: {
  legend: EChartsOption['legend'];
  seriesList: LineSeriesItem[];
  type: ChartType;
  suffix?: string;
  lang?: Lang;
}) {
  const { legend, seriesList, type, suffix, lang } = props;
  const defaultLegend = {
    formatter(name: string) {
      const curName = name.length > 50 ? `${name.slice(0, 50)}...` : name; // 处理名称过长问题
      const curSeriesData = seriesList.find((series) => series.seriesName === name);
      const myLastData = curSeriesData?.dataItems?.[curSeriesData?.dataItems?.length - 1];
      const myLastValue = typeof myLastData === 'number' ? myLastData : myLastData?.value;
      const lastValue = typeof myLastValue === 'number' ? myLastValue : '-';
      const TIME_REG =
        /^\d{4}([/:-\S])(1[0-2]|0?[1-9])\1(0?[1-9]|[1-2]\d|30|31) (?:[01]\d|2[0-3]):[0-5]\d$/;
      if (TIME_REG.test(name)) return curName;
      if (lastValue === '-') return `{a|${curName}: -}`;
      const [v, u] = transformValue(type, lastValue, lang);
      const titleSpan = `{title|${curName}: }`;
      const valueSpan = `{value|${v}}`;
      const unitSpan = `{unit|${u + suffix}}`;
      return [titleSpan, valueSpan, unitSpan].join(' ');
    },
  };
  return lodash.merge({}, defaultLegend, legend);
}

export { changeByteOptions, changePercentOptions, changeTimeOptions, changeUnitOptions };
