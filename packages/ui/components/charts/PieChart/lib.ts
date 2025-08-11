import lodash from 'lodash';

import xbytes from '@/lib/xbytes';
import bulk from '@/lib/bulk';
import { CHART_COLOR_PLATE1, LEGEND_REACT_ICON } from '../lib';
import type { EChartsOption } from '../CoreChart';
import type { PieChartDataItem, PieChartProps } from './PieChart';
import type { BindParams, Lang, LegendPosition } from '../type';

function getFinalHeight({
  height,
  legendPosition,
  seriesNum,
}: {
  height: number;
  legendPosition: LegendPosition;
  seriesNum: number;
}) {
  return legendPosition.type === 'bottom' ? height + 24 * seriesNum + 24 : height;
}

function getInitPieOptions({
  title,
  height,
  barGap,
  unit,
  lang,
  labelEmphasis,
  legendType = 'scroll',
  legendPosition = {
    type: 'right',
  },
  seriesNum,
}: {
  title: string;
  height: number;
  barGap: number;
  unit: PieChartProps['unit'];
  lang: Lang;
  labelEmphasis?: boolean;
  legendType?: 'scroll' | 'plain';
  legendPosition?: LegendPosition;
  seriesNum: number;
}): EChartsOption {
  const outerGap = 2;
  const finalHeight = getFinalHeight({ height, legendPosition, seriesNum });
  const innerRadius = (height - outerGap * 2 - barGap * 2) / 2; // 内半径为: (总高度 - 上下边距 - 内外半径间距) / 2
  const outerRadius = (height - outerGap * 2) / 2; // 外半径为: (总高度 - 上下边距 ) / 2

  return {
    title: {
      text: title,
      show: !labelEmphasis,
      top: outerRadius * (unit === 'number' ? 0.65 : 0.55) + outerGap,
      left: outerRadius + outerGap - 5,
      textVerticalAlign: 'middle',
      textAlign: 'center',
      textStyle: {
        fontSize: 12,
        align: 'center',
        color: '#505774',
        fontWeight: 400,
        lineHeight: 20,
        backgroundColor: 'transparent',
      },
      itemGap: 12,
    },
    tooltip: {
      trigger: 'item',
      show: !labelEmphasis,
      formatter: (data: Record<string, any>) => {
        const formaFunc = getFormateFunc({ unit });
        const [v, u] = formaFunc(data.value);
        return `<b>${data.name}: ${v} ${u}</b>`;
      },
      textStyle: {
        fontSize: 12,
        color: '#505774',
      },
    },
    legend: {
      type: legendType,
      orient: 'vertical',
      top:
        legendPosition.type === 'right'
          ? 'middle'
          : (legendPosition.top ?? finalHeight - outerRadius - outerGap * 2),
      left:
        legendPosition.type === 'right'
          ? outerRadius * 2 + outerGap + 32
          : (legendPosition.left ?? outerRadius / 2),
      icon: LEGEND_REACT_ICON,
      itemWidth: 8,
      itemHeight: 8,
      itemGap: 8,
      selectedMode: true,
      pageIconSize: 8,
      textStyle: {
        color: '#505774',
        lineHeight: 20,
        overflow: 'truncate',
        backgroundColor: 'transparent',
        rich: {
          legendNameSpan: {
            align: 'left',
          },
          legendSplitSpan: {
            width: 16,
            lineHeight: 20,
            backgroundColor: 'transparent',
          },
          legendValueSpan: {
            align: 'left',
            fontWeight: 500,
            fontSize: 12,
            lineHeight: 20,
            color: '#505774',
            backgroundColor: 'transparent',
            fontFamily: '"PingFangSC-Regular, sans-serif',
          },
          legendValueSuffixSpan: {
            align: 'left',
            fontSize: 12,
            lineHeight: 20,
            color: '#505774',
            backgroundColor: 'transparent',
            fontFamily: '"PingFangSC-Regular, sans-serif',
          },
        },
      },
    },
    color: CHART_COLOR_PLATE1,
    series: [
      {
        type: 'pie',
        top: outerGap,
        bottom: outerGap,
        radius: [innerRadius, outerRadius],
        center: [
          outerRadius + outerGap,
          legendPosition.type === 'bottom' ? outerRadius + outerGap : '50%',
        ],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
        },
        labelLine: {
          show: false,
        },
        // https://echarts.apache.org/handbook/zh/basics/release-note/v5-upgrade-guide
        // 选项 series.hoverOffset 已经不推荐使用。使用 series.emphasis.scaleSize 代替
        emphasis: {
          scaleSize: 2,
          label: {
            show: labelEmphasis,
            fontSize: 18,
            fontWeight: 500,
            rich: {
              name: {
                color: '#505774',
                width: 80,
                fontSize: 12,
                lineHeight: 20,
                height: 20,
                backgroundColor: 'transparent',
              },
              value: {
                color: '#252C49',
                width: 110,
                fontSize: 18,
                lineHeight: 26,
                height: 26,
                fontWeight: 500,
                backgroundColor: 'transparent',
              },
            },
            formatter(params: Record<string, any>) {
              const formaFunc = getFormateFunc({ unit, lang, isBulk: true });
              const [v, u] = formaFunc(params.data.value);
              const nameLabel = `{name|${params.name}}`;
              const valueLabel = `{value|${v} ${u}}`;
              return `${nameLabel}\n${valueLabel}`;
            },
          },
        },
      },
    ],
  };
}

function getChartMaxByteUnit(data: PieChartDataItem[]) {
  // 查询数据中的最大值来确定图表的最大单位
  const allValues = data.map((item: PieChartDataItem) => item.value);
  const maxValue: number = lodash.max(allValues) || 0;
  const [, maxUnit] = xbytes.format(maxValue, { splitUnit: true }) ?? [];
  return maxUnit;
}

function getFormateFunc({
  unit,
  lang,
  isBulk,
}: {
  unit: PieChartProps['unit'];
} & BindParams<{
  isBulk: boolean;
  lang: Lang;
}>) {
  if (unit === 'byte') {
    return (value: number) => {
      return (
        xbytes.format(value, {
          splitUnit: true,
          capacityBase: 1024,
        }) ?? []
      );
    };
  }
  if (isBulk) {
    return (value: number) => {
      return [bulk(value, { splitUnit: false }, lang) as string, ''];
    };
  }
  return (value: number) => {
    return [`${value}`, ''];
  };
}

function transformTitle(
  title: EChartsOption['title'],
  data: PieChartDataItem[],
  func: (val: number) => string[],
) {
  const totalValue = +lodash.sumBy(data, 'value');
  const [value, unit] = func(totalValue);

  const defaultTitle = {
    subtext: `{value|${value || 0}}\n{unit|${unit}}`,
    backgroundColor: 'transparent',
    subtextStyle: {
      overflow: 'truncate',
      rich: {
        value: {
          align: 'center',
          verticalAlign: 'middle',
          color: '#252C49',
          width: 110,
          fontSize: 18,
          lineHeight: 26,
          height: 26,
          fontWeight: 500,
          backgroundColor: 'transparent',
        },
        unit: {
          align: 'center',
          verticalAlign: 'middle',
          color: '#7A829E',
          width: 80,
          fontSize: 12,
          lineHeight: 20,
          height: 20,
          backgroundColor: 'transparent',
        },
      },
    },
  };
  return lodash.merge({}, defaultTitle, title);
}

function transformLegend(
  legend: EChartsOption['legend'],
  data: PieChartDataItem[],
  func: (val: number) => string[],
) {
  const defaultLegend = {
    formatter(name: string) {
      const label = `{legendNameSpan|${name}}`;
      const rawItem = lodash.find(data, { name }) as unknown as PieChartDataItem;
      let legendValue;
      const rawItemVal = rawItem?.value;

      if (typeof rawItemVal === 'number') {
        const [value, unit] = func(rawItemVal);
        legendValue = `${value} ${unit}`;
      } else {
        legendValue = '-';
      }
      const valueSpan = `{legendValueSpan|${legendValue}}`;
      const valueSplitSpan = `{legendSplitSpan|}`;
      return [label, valueSplitSpan, valueSpan]?.join('');
    },
  };
  return lodash.merge({}, defaultLegend, legend);
}

function transformSeries(
  series: EChartsOption['series'],
  data: PieChartDataItem[],
): EChartsOption['series'] {
  // 将所有字节数据都转换为指定的单位
  const firstSeries = lodash.get(series, '0', []);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return [
    {
      ...firstSeries,
      data: data?.map((item) => {
        // 数据为 0 的时候，需传入 null, 否则，所有类名都为 0 时，图表显示的是均分的情况，而不是空白。
        const val = item?.value;
        return {
          name: item?.name,
          value: val !== null ? +val : 0,
          itemStyle: {
            color: item?.color,
          },
        };
      }),
      cursor: 'default',
      emphasis: {
        itemStyle: {
          color: 'inherit',
        },
      },
    },
  ];
}

function changePieOptions(
  options: EChartsOption,
  data: PieChartDataItem[],
  unit: PieChartProps['unit'],
  lang: Lang,
) {
  const formaFunc = getFormateFunc({ unit, lang, isBulk: true });

  const series = transformSeries(options?.series, data);

  const legend = transformLegend(options?.legend, data, formaFunc);
  const title = transformTitle(options?.title, data, formaFunc);
  return lodash.merge({}, options, { series, legend, title });
}

export {
  changePieOptions,
  getInitPieOptions,
  transformTitle,
  transformLegend,
  transformSeries,
  getChartMaxByteUnit,
  getFinalHeight,
};
