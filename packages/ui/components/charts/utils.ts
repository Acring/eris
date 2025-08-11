import lodash from 'lodash';
import { format, subDays } from 'date-fns';
import type { EChartsOption } from 'echarts';

import t from '@/i18n/index';
import bulk from '@/lib/bulk';
import xtime from '@/lib/xtime';
import xbytes from '@/lib/xbytes';
import { CHART_COLOR_PLATE1, CHART_COLOR_STATUS_PLATE, LEGEND_REACT_ICON } from './lib';
import type { ChartType, SeriesProps, TooltipParams, Lang } from './type';

function getInitialOptions({
  titleName,
  legendRight,
  legendData,
  showXAxis,
  xSplitNumber,
  legendLeft,
  titleFontWeight,
  gridTop,
  yInside,
  xAxisType = 'time',
  showLegend = true,
  categoryData,
  enableDataZoom = false,
  legendType = 'scroll',
}: {
  titleName: string;
  legendRight?: boolean;
  legendData?: any[];
  showXAxis?: boolean;
  xSplitNumber?: number;
  legendLeft?: number;
  titleFontWeight?: number;
  gridTop?: number;
  yInside?: boolean;
  xAxisType?: string;
  showLegend?: boolean;
  categoryData?: string[];
  enableDataZoom?: boolean;
  legendType?: 'scroll' | 'plain';
}) {
  return {
    title: {
      show: false,
      text: [`{a|${titleName}}`].join(''),
      left: legendRight ? 'right' : 'auto',
      top: legendRight ? 5 : 0,
      padding: 0,
      textStyle: {
        fontSize: 14,
        overflow: 'truncate',
        lineHeight: 22,
        rich: {
          a: {
            fontSize: 14,
            color: CHART_COLOR_PLATE1[0],
            fontWeight: titleFontWeight || 22,
            backgroundColor: 'transparent',
            width: legendRight ? 104 : 'auto',
            align: 'left',
          },
        },
      },
    },
    axisPointer: {
      snap: true,
    },
    xAxis: {
      show: showXAxis,
      type: xAxisType,
      splitNumber: xSplitNumber,
      data: categoryData,
      offset: 8,
      boundaryGap: false,
      axisLabel: {
        show: showXAxis,
        align: 'center',
        hideOverlap: true,
        showMinLabel: false,
        showMaxLabel: false,
        color: '#505774',
        formatter:
          xAxisType === 'time'
            ? {
                none: '{HH}:{mm}:{ss}',
                millisecond: '{HH}:{mm}:{ss}',
                day: `{MMM}{dd}${t('日')}`,
                week: `{MMM}{dd}${t('日')}`,
                month: `{MMM}{dd}${t('日')}`,
                year: `{yyyy}${t('年')}`,
              }
            : undefined,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        length: 0,
      },
    },
    legend: {
      align: 'left',
      icon: LEGEND_REACT_ICON,
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
        horizontal: [
          'M7.11133 2.11133L7.81843 2.81843L4.63645 6.00042L7.81843 9.1824L7.11133 9.8895L3.22224 6.00042L7.11133 2.11133Z',
          'M4.88867 9.88867L4.18157 9.18157L7.36355 5.99958L4.18156 2.8176L4.88867 2.1105L8.77776 5.99958L4.88867 9.88867Z',
        ],
      },
      pageTextStyle: {
        color: '#505774',
      },
      pageIconColor: '#919bbe',
      pageIconInactiveColor: '#919bbe', // TODO: opacity 0.4
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
      axisPointer: enableDataZoom
        ? {
            type: 'cross',
            animation: false,
            label: {
              backgroundColor: '#505765',
            },
          }
        : undefined,
      transitionDuration: 0,
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
    color: CHART_COLOR_PLATE1,
    series: [],
  } as EChartsOption;
}

function getMarkLineOption(value: number) {
  const markLineOption = {
    silent: true,
    symbol: 'none',
    animation: false,
    lineStyle: {
      type: 'dashed',
      color: CHART_COLOR_STATUS_PLATE[2],
    },
    label: {
      position: 'insideEndBottom',
      distance: [2, 5],
      color: CHART_COLOR_STATUS_PLATE[2],
      formatter(data: Record<string, any>) {
        return `${data.value}`;
      },
    },
    data: [
      {
        yAxis: value,
        value,
      },
    ],
  };
  return markLineOption;
}

/**
 * Query the maximum value in the data to determine the maximum unit of the chart
 * @param series
 * @param func
 * @returns
 */
function getChartMaxUnit(series: SeriesProps[], func: (value: number) => string[] | null) {
  const allValues = lodash.flatten(
    series?.map((s) =>
      s?.data?.map((point) => {
        if (typeof point === 'number') return Math.abs(point);
        return Math.abs(point[1]);
      }),
    ),
  );
  const maxValue = lodash.max(allValues) || 0;
  const formatValue = func(maxValue);
  const [, maxUnit] = formatValue ?? [];
  return maxUnit;
}

function transformValue(type: ChartType, value: number | string, lang?: Lang) {
  const { isByte, isBulk, isPercent, isTime } = type;
  if (isByte && typeof value === 'number') {
    return xbytes.format(value, { splitUnit: true }) ?? [];
  } else if (isBulk) {
    const [v, u] = bulk(+value, { splitUnit: true }, lang) as [number, string];
    return [`${v}`, u];
  } else if (isPercent) {
    return [`${lodash.round(lodash.toNumber(value) * 100, 2)}`, ''];
  } else if (isTime) {
    return xtime.format(+value, { unitSeparator: ' ', splitUnit: true }) as [string, string];
  }
  return ['--', ''];
}

/**
 * Convert all byte data to the specified unit
 * @param series
 * @param unit
 * @param func
 * @returns
 */
function transformSeriesUnit(
  series: SeriesProps[],
  func: (value: number, maxUnit?: string) => string[],
  maxUnit?: string,
) {
  return series?.map(({ data, ...rest }) => ({
    ...rest,
    data: data?.map((point) => {
      if (typeof point === 'number') {
        const [transformedYValue] = func(point, maxUnit);
        return transformedYValue;
      }
      const [x, y] = point;
      if (typeof y === 'number') {
        const [transformedY] = func(y);
        return [x, +transformedY];
      }
      return [x, y];
    }),
  })) as EChartsOption['series'];
}

/**
 * Format Y-axis labels - byte
 * @param yAxis
 * @param unit
 * @param suffix
 * @param func
 * @returns
 */
function transformYAxisUnit(
  yAxis: EChartsOption['yAxis'],
  unit: string,
  suffix: string,
  func: (str: string, yInside?: boolean) => string,
  yInside?: boolean,
) {
  const defaultYAxis = {
    axisLabel: {
      formatter(value: string) {
        const str = `${value} ${unit}`;
        return (unit === 'b' || unit === 'B' ? str : func(str, yInside)) + suffix; // 当单位为最小单位时，不需要再进行转换
      },
    },
  };
  return lodash.merge({}, defaultYAxis, yAxis);
}

function getFixedToolTipXAxisPosition(
  point: [number, number],
  size: { contentSize: [number, number]; viewSize: [number, number] },
) {
  let x: number = point[0];
  const contentWidth = size?.contentSize[0] || 0;
  const viewWidth = size?.viewSize[0] || 0;
  if (x <= contentWidth / 2) {
    x = 0;
  } else if (x > contentWidth / 2 && x + contentWidth / 2 < viewWidth) {
    x = x - contentWidth / 2;
  } else {
    x = viewWidth - contentWidth;
  }
  return x;
}

function getNormalToolTipXAxisPosition(
  point: [number, number],
  size: { contentSize: [number, number]; viewSize: [number, number] },
) {
  let x: number = point[0];
  const contentWidth = size?.contentSize[0] || 0;
  const viewWidth = size?.viewSize[0] || 0;

  if (x + 10 + contentWidth > viewWidth) {
    x = x - (10 + contentWidth);
  } else {
    x = x + 10;
  }
  return x;
}

function formatTime(time: number, options: { formatStr?: string; subtractDays?: number } = {}) {
  const { formatStr = 'yyyy-MM-dd HH:mm:ss', subtractDays = 0 } = options;
  const subtractDate = subDays(time, subtractDays);
  return format(subtractDate, formatStr);
}

function tooltipHeadSpan(value: string | number, color: string) {
  return `<span style="color: ${color};line-height: 20px; font-size: 12px">${value}</span>`;
}

function tooltipSymbolSpan(color: string) {
  return `
    <span style="color: ${color};">
      <span 
        style="background:${color};
          display: inline-block;
          border-radius: 1px;
          width: 8px;
          height: 8px;
        "></span>
    </span>`;
}

function generateLinkDom(text: string, href: string) {
  return `<a 
    style="
      display: block;
      max-width: 450px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      text-decoration: none;
      color: #505774;
    "
    onMouseOver="this.style.color='#7855fa';this.style.textDecoration='underline'"
    onMouseOut="this.style.color='#505774';this.style.textDecoration='none'"
    href="${href}"
    title="${text}"
    target="_blank"
    >${text}</a>`;
}

function renderLabel(label: string, rowItem?: SeriesProps) {
  if (rowItem?.tooltipLink?.url && rowItem?.tooltipSubLink?.url) {
    return `${generateLinkDom(
      rowItem.tooltipLink.text,
      rowItem.tooltipLink.url,
    )}（${generateLinkDom(rowItem.tooltipSubLink.text, rowItem.tooltipSubLink.url)}）`;
  } else if (rowItem?.tooltipLink?.url && !rowItem?.tooltipSubLink?.url) {
    return `${generateLinkDom(rowItem.tooltipLink.text, rowItem.tooltipLink.url)}${
      rowItem.tooltipSubLink?.text ? `（${rowItem.tooltipSubLink?.text}）` : ''
    }`;
  } else if (!rowItem?.tooltipLink?.url && rowItem?.tooltipSubLink?.url) {
    return `${rowItem.tooltipLink?.text}（${generateLinkDom(
      rowItem.tooltipSubLink.text,
      rowItem.tooltipSubLink.url,
    )}）`;
  }
  return label;
}

/**
 * If the data in the chart has been converted into specified units,
 * You need to pass in the rowSeries before the conversion,
 * and take out the data value of the corresponding point from it,
 * Ensure the accuracy of data.
 *
 * @param tooltip : Tooltip configuration passed in by the parent
 * @param suffix : Suffix/Unit displayed
 * @param func : xbytes | xtime | bulk
 * @param rowSeries : Raw data without unit conversion - byte | time
 * @returns
 */
function transformTooltip({
  tooltip,
  suffix,
  func,
  rowSeries,
  showHeader,
  title,
  fixedPosition = false,
}: {
  tooltip: EChartsOption['tooltip'];
  suffix: string;
  func?: (value: number) => string;
  rowSeries?: SeriesProps[];
  showHeader?: boolean;
  title?: string;
  fixedPosition?: boolean;
}) {
  const enterable = !!rowSeries?.find((item) => !!item.tooltipLink || !!item.tooltipSubLink);
  const defaultTooltip = {
    confine: false,
    enterable,
    padding: [4, 16],
    // 特别注意 form 表单改了层级这个需要同步修改,issue: https://github.com/apache/echarts/issues/17144
    extraCssText: 'z-index: 1099', // TODO(deHong): eCharts bug，开启 enterable时，从 tooltip 移除鼠标时，不会关闭联动的 tooltip
    position(
      point: [number, number],
      params: Record<string, any>,
      dom: HTMLLIElement,
      rect: Record<string, any>,
      size: { contentSize: [number, number]; viewSize: [number, number] },
    ) {
      const domToTop = dom?.getBoundingClientRect()?.top || 0;
      let x = 0;
      if (fixedPosition) {
        x = getFixedToolTipXAxisPosition(point, size);
      } else {
        x = getNormalToolTipXAxisPosition(point, size);
      }
      const y = size.viewSize[1] - point[1];
      return fixedPosition
        ? { left: x, bottom: domToTop < 250 ? '65%' : '80%' }
        : { left: x, bottom: y / size.viewSize[1] > 0.65 ? '20%' : y };
    },
    formatter(params: TooltipParams[]) {
      const showAxisValueLabel = typeof params[0]?.data?.[0] === 'number';
      const axisValueLabel = showAxisValueLabel
        ? (formatTime(params[0]?.data?.[0] as number) ?? '')
        : '';
      const head = title
        ? showAxisValueLabel
          ? [tooltipHeadSpan(title, '#252c49'), tooltipHeadSpan(axisValueLabel, '#9098B4')]
          : [tooltipHeadSpan(title, '#252c49')]
        : [tooltipHeadSpan(axisValueLabel, '#7a829e')];
      const items = params.map((point) => {
        let value = typeof point.value === 'object' ? point.value[1] : point.value;
        const needDefaultColor = value === 0 && point.color === 'transparent';
        const symbol = tooltipSymbolSpan(needDefaultColor ? '#9371fa' : point.color);
        let label =
          point?.seriesName?.length > 50
            ? `${point?.seriesName?.slice(0, 50)}...`
            : point?.seriesName; // 处理名称过长问题

        if (rowSeries?.length) {
          const rowItem = rowSeries[point.seriesIndex];
          label = renderLabel(label, rowItem);
          const rowData = rowItem?.data as number[][];
          value =
            typeof point.value === 'object'
              ? lodash.get(
                  rowData?.find((p) => lodash.isArray(point.value) && p[0] === point.value[0]),
                  '1',
                  0,
                )
              : value;
        }
        if (value === '-')
          return `<span style="display: flex;color: #505774;line-height: 20px;">
              ${symbol}
              <span style="display: flex;margin-left: 4px; flex: 1;color: #505774">
                ${label}: ${value}
              </span>
          </span>`;
        if (func) {
          value = func(+value);
        }

        const valueStr = typeof value === 'number' ? lodash.round(+value, 3) : value;
        return `<span style="display: flex;line-height: 20px;">
                ${symbol}
                  <span style="display: flex;margin-left: 4px; flex: 1;color: #505774">
                    ${label}：${valueStr}${suffix}
                  </span>
                </span>`;
      });

      const body = items.join('');
      const isColumns = items.length && items.length > 4;

      // 处理多行显示， 大于 4 个图例时，图例分两列按横向顺序展示
      if (isColumns) {
        const bodies = [0, 1] // 0： 代表第一列， 1： 代表第二列
          .map(
            (idx) => `
              <div style="margin-right: ${idx === 1 ? '0' : '16px'}">
                ${items.filter((_, index) => index % 2 === idx).join('')}
              </div>
            `,
          )
          .join('');
        return `
          ${head.join('<br/>')}
          <div style="display: flex;justify-content: space-between;">${bodies}</div>`;
      }

      return showHeader ? [...head, body].join('<br/>') : body;
    },
  };

  return lodash.merge({}, defaultTooltip, tooltip);
}

export {
  getInitialOptions,
  getChartMaxUnit,
  getMarkLineOption,
  transformSeriesUnit,
  transformTooltip,
  transformYAxisUnit,
  transformValue,
  formatTime,
};
