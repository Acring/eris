import lodash from 'lodash';
import type { EChartsOption } from 'echarts';

import t from '@/i18n/index';
import xbytes from '@/lib/xbytes';
import bulk from '@/lib/bulk';
import { scaleCompute } from '@/lib/scaleCompute';
import type { UnitMapKeyTypes } from '@/lib/xbytes';

import {
  CHART_COLOR_PLATE2,
  LEGEND_REACT_ICON,
  LEGEND_PAGE_UP_ICON,
  LEGEND_PAGE_DOWN_ICON,
} from '../lib';
import {
  getChartMaxUnit,
  getMarkLineOption,
  transformValue,
  transformYAxisUnit,
  transformTooltip,
  transformSeriesUnit,
} from '../utils';
import type { ChartType, SeriesProps, Lang } from '../type';
import type { SeriesItem } from './BarChart';

function changeByteOptions(props: {
  title: string;
  series: SeriesItem[];
  options: Record<string, any>;
  suffix: string;
  direction: 'vertical' | 'horizontal';
  lang?: Lang;
  yInside?: boolean;
  markLineValue?: number;
  stack?: string;
}) {
  const { title, series, options, suffix, lang, yInside, markLineValue, direction, stack } = props;
  series.forEach((seriesItem, seriesItemIndex) => {
    const seriesData = seriesItem.dataItems.map((item) => {
      return typeof item === 'number' ? item : [item.time * 1000, item.value];
    });
    const seriesColor = getSeriesColor(seriesItemIndex, seriesItem?.color);
    (options.series as unknown as Record<string, any>[]).push(
      getBarOptionsSeries({
        seriesData,
        name: seriesItem.seriesName,
        color: seriesColor,
        markLineValue: typeof markLineValue === 'number' ? markLineValue : undefined,
        stack,
      }),
    );
  });

  options.legend = transformArrayLegend({
    legend: options.legend,
    series,
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

  if (direction === 'horizontal') {
    return transformDirectionFunc(options);
  }

  return options;
}

const changePercentOptions = (props: {
  title: string;
  series: SeriesItem[];
  options: Record<string, any>;
  suffix: string;
  direction: 'vertical' | 'horizontal';
  lang?: Lang;
  yInside?: boolean;
  markLineValue?: number;
  stack?: string;
}) => {
  const { series, options, lang, suffix, title, markLineValue, direction, stack } = props;

  series.forEach((seriesItem, seriesItemIndex) => {
    const seriesData = seriesItem?.dataItems.map((item) => {
      return typeof item === 'number' ? item : [item.time * 1000, item.value];
    });

    const seriesColor = getSeriesColor(seriesItemIndex, seriesItem?.color);

    (options.series as unknown as Record<string, any>[]).push(
      getBarOptionsSeries({
        seriesData,
        name: seriesItem.seriesName,
        color: seriesColor,
        // this is a percent chart, so we need (markLineValue * 100)
        markLineValue: typeof markLineValue === 'number' ? markLineValue * 100 : undefined,
        stack,
      }),
    );
  });

  options.legend = transformArrayLegend({
    legend: options.legend,
    series,
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
  });

  options.yAxis = transformPercentYAxis(options.yAxis, suffix);

  if (direction === 'horizontal') {
    return transformDirectionFunc(options);
  }

  return options;
};

function changeUnitOptions(props: {
  title: string;
  series: SeriesItem[];
  options: Record<string, any>;
  suffix: string;
  direction: 'vertical' | 'horizontal';
  lang?: Lang;
  yInside?: boolean;
  markLineValue?: number;
  stack?: string;
}) {
  const { series, options, lang, suffix, title, markLineValue, direction, stack } = props;

  series.forEach((seriesItem, seriesItemIndex) => {
    const seriesData = seriesItem?.dataItems.map((item) => {
      return typeof item === 'number' ? item : [item.time * 1000, item.value];
    });

    const seriesColor = getSeriesColor(seriesItemIndex, seriesItem?.color);

    (options.series as unknown as Record<string, any>[]).push(
      getBarOptionsSeries({
        seriesData,
        name: seriesItem.seriesName,
        color: seriesColor,
        markLineValue: typeof markLineValue === 'number' ? markLineValue : undefined,
        stack,
      }),
    );
  });

  options.legend = transformArrayLegend({
    legend: options.legend,
    series,
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
  });

  options.yAxis = transformBulkYAxis(options.yAxis, suffix, lang);

  if (direction === 'horizontal') {
    return transformDirectionFunc(options);
  }

  return options;
}

function getBarOptionsSeries(params: {
  name: string;
  seriesData: (number | number[])[];
  color?: string | ((v: Record<string, any>) => void);
  markLineValue?: number;
  stack?: string;
}) {
  const { name, seriesData, color, markLineValue, stack } = params;
  return {
    name,
    data: seriesData,
    type: 'bar',
    stack,
    barMinWidth: '2px',
    barMinHeight: typeof color === 'function' ? 1 : undefined,
    itemStyle: {
      color,
    },
    cursor: 'default',
    markLine: typeof markLineValue === 'number' ? getMarkLineOption(markLineValue) : undefined,
  };
}

function getInitialOptions({
  legendRight,
  legendData,
  showXAxis,
  xSplitNumber,
  legendLeft,
  gridTop,
  yInside,
  xAxisType = 'time',
  showLegend = true,
  categoryData,
  direction,
  customLegendIcon,
  enableDataZoom,
  legendType = 'scroll',
}: {
  legendRight?: boolean;
  legendData?: any[];
  showXAxis?: boolean;
  xSplitNumber?: number;
  legendLeft?: number;
  gridTop?: number;
  yInside?: boolean;
  xAxisType?: string;
  showLegend?: boolean;
  categoryData?: string[];
  direction?: string;
  customLegendIcon?: string;
  enableDataZoom?: boolean;
  legendType?: 'scroll' | 'plain';
}) {
  return {
    title: {
      show: false,
    },
    axisPointer: {
      snap: true,
    },
    xAxis: {
      show: showXAxis,
      type: xAxisType,
      splitNumber: xSplitNumber,
      data: categoryData,
      offset: xAxisType === 'time' ? 8 : undefined,
      boundaryGap: [0, 2],
      axisLabel:
        xAxisType === 'time'
          ? {
              show: showXAxis,
              align: 'center',
              hideOverlap: true,
              showMinLabel: false,
              showMaxLabel: false,
              inside: direction === 'horizontal',
              color: '#505774',
              formatter: {
                none: '{HH}:{mm}:{ss}',
                millisecond: '{HH}:{mm}:{ss}',
                day: `{MMM}{dd}${t('日')}`,
                week: `{MMM}{dd}${t('日')}`,
                month: `{MMM}{dd}${t('日')}`,
                year: `{yyyy}${t('年')}`,
              },
            }
          : {
              show: showXAxis,
            },
      axisLine: {
        show: false,
      },
      axisTick: {
        length: xAxisType === 'time' ? 0 : undefined,
      },
    },
    legend: {
      align: 'left',
      icon: customLegendIcon ? customLegendIcon : LEGEND_REACT_ICON,
      type: legendType,
      show: showLegend,
      orient: legendRight ? 'vertical' : 'horizontal',
      right: legendRight ? 0 : 'auto',
      left: legendRight ? 'auto' : legendLeft,
      top: legendRight ? 24 : 0,
      padding: legendRight ? [4, 0, 0, 0] : 0,
      itemGap: legendRight ? 0 : 16,
      itemWidth: 8,
      itemHeight: 8,
      selectedMode: true,
      data: legendData ? legendData : [],
      textStyle: {
        width: legendRight ? 90 : undefined,
        color: '#505774',
        lineHeight: legendRight ? 22 : 20,
        backgroundColor: 'transparent', // 文字块背景色，一定要加上，否则对齐不会生效
        rich: {
          a: {
            color: '#505774',
            width: legendRight ? 90 : 'auto',
          },
          title: {
            color: '#505774',
            font: '13px/16px PingFangSC-Regular, sans-serif',
          },
          value: {
            fontWeight: 500,
            color: '#505774',
            font: '13px/16px PingFangSC-Regular, sans-serif',
          },
          unit: {
            color: '#505774',
            font: '13px/16px PingFangSC-Regular, sans-serif',
          },
        },
      },
      // 自定义分页器 icon
      pageIcons: {
        horizontal: [LEGEND_PAGE_UP_ICON, LEGEND_PAGE_DOWN_ICON],
      },
      pageTextStyle: {
        color: '#505774',
      },
      pageIconColor: '#919bbe',
      pageIconInactiveColor: '#919bbe',
      pageIconSize: 12,
      pageButtonGap: 8,
    },
    yAxis: {
      axisLabel: {
        verticalAlign: yInside ? 'top' : 'middle',
        inside: yInside,
        margin: yInside ? 0 : 8,
        lineHeight: 20,
        showMinLabel: !yInside,
        showMaxLabel: direction !== 'horizontal',
        color: yInside ? '#505774' : '#7A829E',
      },
    },
    grid: {
      top: gridTop ? gridTop : legendRight ? 16 : 32,
      right: legendRight ? 120 : 0,
      left: yInside ? 16 : 60,
      bottom: showXAxis ? 8 : 4,
      containLabel: yInside || showXAxis,
    },
    tooltip: {
      show: true,
      trigger: 'axis',
      textStyle: {
        fontSize: 10,
        lineHeight: 8,
      },
      transitionDuration: 0,
      axisPointer: enableDataZoom
        ? {
            type: 'cross',
            animation: false,
            label: {
              backgroundColor: '#505765',
            },
          }
        : {
            type: xAxisType === 'time' ? 'line' : 'shadow',
            shadowStyle: {
              color: 'rgba(37, 44, 73, 0.05)',
            },
          },
    },
    toolbox: {
      showTitle: false,
      feature: {
        dataZoom: {
          show: enableDataZoom,
          iconStyle: {
            opacity: 0,
          },
          yAxisIndex: 'none',
        },
      },
    },
    color: CHART_COLOR_PLATE2,
    series: [],
  } as EChartsOption;
}

function transformArrayLegend(props: {
  legend: Record<string, unknown>;
  series: SeriesItem[];
  type: ChartType;
  suffix?: string;
  lang?: Lang;
}) {
  const { legend, series, type, suffix, lang } = props;
  const defaultLegend = {
    formatter(name: string) {
      const curName = name.length > 50 ? `${name.slice(0, 50)}...` : name; // 处理名称过长问题
      const seriesData = series.find((seriesItem) => seriesItem.seriesName === name);
      const myLastData = seriesData?.dataItems?.[seriesData?.dataItems?.length - 1];
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
      return [titleSpan, valueSpan, unitSpan].join('');
    },
  };
  return lodash.merge({}, defaultLegend, legend);
}

function getMinAndMax(series: Record<number, any>[]) {
  let min = 0;
  let max = 0;
  series.forEach((s: Record<string, any>) =>
    s.data.forEach(([_, value]: [string, number]) => {
      if (typeof min === 'undefined' || min > value) min = value;
      if (typeof max === 'undefined' || max < value) max = value;
    }),
  );
  return [min, max];
}

function transformYAxis(yAxis: Record<number, any>, series: Record<number, any>[]) {
  const [minValue, maxValue] = getMinAndMax(series);
  const defaultYAxis = scaleCompute({ max: maxValue, min: minValue });
  return lodash.merge({}, defaultYAxis, yAxis);
}

function getSeriesColor(
  seriesItemIndex: number,
  seriesItemColor?: string | ((v: Record<string, any>) => void),
) {
  const colorPlate1Length = CHART_COLOR_PLATE2.length - 1;
  const seriesColor = seriesItemColor
    ? seriesItemColor
    : CHART_COLOR_PLATE2[seriesItemIndex > colorPlate1Length ? colorPlate1Length : seriesItemIndex];

  return seriesColor;
}

function chartMaxByteFunc(value: number) {
  return xbytes.format(value, { splitUnit: true, capacityBase: 1000 });
}

function transformBulkYAxis(yAxis: EChartsOption['yAxis'], suffix?: string, lang?: Lang) {
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
}

function transformYAxisByteFunc(value: string, yInside?: boolean) {
  const parseValue = xbytes.parse(value);
  return typeof parseValue === 'number'
    ? (xbytes.format(parseValue, { unitSeparator: ' ', decimalPlaces: yInside ? undefined : 0 }) ??
        '')
    : '';
}

function transformPercentYAxis(yAxis: EChartsOption['yAxis'], suffix: string) {
  const defaultYAxis = {
    axisLabel: {
      formatter: (value: number) => `${lodash.round(value, 3)}${suffix}`,
    },
  };
  return lodash.merge({}, defaultYAxis, yAxis);
}

function transformTooltipByteFunc(value: number) {
  return (
    xbytes.format(value, {
      unitSeparator: ' ',
    }) ?? ''
  );
}

function transformSeriesByteFunc(value: number, maxUnit?: string) {
  return (
    xbytes.format(value, {
      toUnit: maxUnit as UnitMapKeyTypes,
      splitUnit: true,
    }) ?? []
  );
}

function transformDirectionFunc(options: EChartsOption) {
  const yAxis = options.yAxis;
  const xAxis = options.xAxis;
  lodash.set(options, 'xAxis', yAxis);
  lodash.set(options, 'yAxis', xAxis);
  return options;
}

export {
  changeByteOptions,
  changePercentOptions,
  changeUnitOptions,
  getInitialOptions,
  transformYAxis,
};
