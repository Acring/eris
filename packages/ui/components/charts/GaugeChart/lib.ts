import lodash from 'lodash';

import xbytes from '@/lib/xbytes';
import { getAlphaColor } from '@/lib/utils';
import { CHART_COLOR_STATUS_PLATE, GAUGE_GAP_COLOR } from '../lib';
import type { EChartsOption } from '../CoreChart';
import type { Capacity } from './GaugeChart';

interface CoreChartProps extends Capacity {
  height: number;
  progressWidth?: number;
}
function getCapacityGaugeOption(props: CoreChartProps): EChartsOption {
  const hasReservedPercent = props.reservedPercent !== undefined;
  const percent = props.used / props.total;
  const percentFormat = (percent * 100).toFixed(0);
  const totalValue = xbytes.format(props.total, { splitUnit: false, unitSeparator: ' ' }) ?? '';
  const useColor = getGaugeUsedColor(percent, props.criticalPercent);
  const tickColor = useColor;
  const axisLineColor = getAxisLineColor(hasReservedPercent, props.criticalPercent);
  const reservedAxisLineColor = getReservedAxisLineColor(percent);
  const [useValue, useUnit] = xbytes.format(props.used, { splitUnit: true }) ?? [];

  const progressWidth = props.progressWidth ?? 8;
  const radius = props.height / 2; // 半径为: (总高度 - 上下边距) / 2
  const axisTickLength = progressWidth / 3;
  const tickToProgressGap = 4;
  const tickDistance = progressWidth + axisTickLength + tickToProgressGap;
  const axisLabelDistance = axisTickLength + tickToProgressGap + progressWidth + 24;
  const outerGap = axisLabelDistance;

  const option: EChartsOption = {
    title: [
      {
        left: radius + outerGap - 5,
        top: 'middle',
        textAlign: 'center',
        textStyle: {
          fontWeight: 'normal',
          fontSize: '14px',
          color: '#252C49',
        },
        subtext: `{subTextPercent|${percentFormat}%}\n${useValue}\n{subTextUnit|${useUnit}}`,
        subtextStyle: {
          fontSize: 18,
          fontWeight: 500,
          lineHeight: 26,
          color: '#252C49',
          backgroundColor: 'transparent',
          rich: {
            subTextPercent: {
              fontSize: 14,
              lineHeight: 14,
              fontWeight: 400,
              color: '#7A829E',
              backgroundColor: 'transparent',
            },
            subTextUnit: {
              fontSize: 14,
              lineHeight: 22,
              fontWeight: 400,
              color: '#7A829E',
              backgroundColor: 'transparent',
            },
          },
        },
      },
    ],
    series: lodash.compact([
      {
        type: 'gauge',
        progress: {
          show: true,
          width: progressWidth,
          itemStyle: {
            color: useColor,
          },
        },
        center: [radius + outerGap, '58%'],
        radius: '100%',
        pointer: {
          icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
          length: '12%',
          width: progressWidth,
          offsetCenter: [0, '-65%'],
          itemStyle: {
            color: useColor,
          },
        },
        axisLine: {
          lineStyle: {
            width: progressWidth,
            color: axisLineColor as any,
          },
        },
        axisTick: {
          show: !hasReservedPercent,
          distance: -tickDistance,
          splitNumber: 1,
          length: axisTickLength,
          lineStyle: {
            color: tickColor,
            width: 0.6,
          },
        },
        splitLine: {
          length: 0,
        },
        axisLabel: {
          fontSize: 14,
          color: '#505774',
          distance: -axisLabelDistance,
          formatter(value: number) {
            if (value === 1) {
              return totalValue;
            }
            if (value === 0) {
              return '0';
            }
            return '';
          },
        },
        min: 0,
        max: 1,
        startAngle: 210,
        endAngle: -30,
        splitNumber: hasReservedPercent ? undefined : 100,
        itemStyle: {
          color: 'auto',
        },
        detail: {
          show: false,
        },
        data: [
          {
            value: percent,
          },
        ],
      },
      hasReservedPercent && {
        type: 'gauge',
        center: [radius + outerGap, '55%'],
        radius: '100%',
        axisLine: {
          show: false,
          lineStyle: {
            color: reservedAxisLineColor as any,
          },
        },
        axisTick: {
          distance: -tickDistance,
          splitNumber: 1,
          length: axisTickLength,
          lineStyle: {
            color: 'auto',
            width: 0.6,
          },
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        progress: {
          show: false,
        },
        pointer: {
          show: false,
        },
        detail: {
          show: false,
        },
        min: 0,
        max: 1,
        startAngle: 210,
        endAngle: -30,
        splitNumber: 60,
        data: [
          {
            value: percent,
          },
        ],
      },
    ]),
  };
  return option;
}

function getGaugeUsedColor(percent: number, criticalPercent: number) {
  let useColor = CHART_COLOR_STATUS_PLATE[0];
  if (percent > 0.7 && percent <= 0.85) {
    useColor = CHART_COLOR_STATUS_PLATE[1];
  }
  if (percent > 0.85 && percent <= criticalPercent) {
    useColor = CHART_COLOR_STATUS_PLATE[2];
  }
  if (percent > criticalPercent) {
    useColor = CHART_COLOR_STATUS_PLATE[3];
  }
  return useColor;
}

function getAxisLineColor(hasReservedPercent: boolean, criticalPercent: number) {
  const hasErrGaugeBgColorRegion = [
    [0.7, getAlphaColor(CHART_COLOR_STATUS_PLATE[0], 0.4)],
    [0.705, GAUGE_GAP_COLOR],
    [0.85, getAlphaColor(CHART_COLOR_STATUS_PLATE[1], 0.4)],
    [0.855, GAUGE_GAP_COLOR],
    [criticalPercent, getAlphaColor(CHART_COLOR_STATUS_PLATE[2], 0.4)],
    [criticalPercent + 0.005, GAUGE_GAP_COLOR],
    [1, getAlphaColor(CHART_COLOR_STATUS_PLATE[3], 0.4)],
  ];
  const noErrGaugeBgColorRegion = [
    [0.7, getAlphaColor(CHART_COLOR_STATUS_PLATE[0], 0.4)],
    [criticalPercent - 0.005, GAUGE_GAP_COLOR],
    [criticalPercent, getAlphaColor(CHART_COLOR_STATUS_PLATE[1], 0.4)],
    [criticalPercent + 0.005, GAUGE_GAP_COLOR],
    [1, getAlphaColor(CHART_COLOR_STATUS_PLATE[3], 0.4)],
  ];
  const gaugeBgColorRegion =
    criticalPercent === 0.85 ? noErrGaugeBgColorRegion : hasErrGaugeBgColorRegion;

  const axisLineColor = hasReservedPercent
    ? [
        [0.85, '#EAEDF6'],
        [
          1,
          {
            image: createCanvas(),
            repeat: 'repeat',
          },
        ],
      ]
    : gaugeBgColorRegion;
  return axisLineColor;
}

function getReservedAxisLineColor(percent: number) {
  const tickColorRegion = [];
  if (percent <= 0.7) {
    tickColorRegion.push(
      [0.7, getAlphaColor(CHART_COLOR_STATUS_PLATE[0], 0.4)],
      [0.8, getAlphaColor(CHART_COLOR_STATUS_PLATE[1], 0.4)],
      [0.85, getAlphaColor(CHART_COLOR_STATUS_PLATE[2], 0.4)],
      [1, getAlphaColor(CHART_COLOR_STATUS_PLATE[3], 0.4)],
    );
  } else if (percent <= 0.8) {
    tickColorRegion.push(
      [0.8, getAlphaColor(CHART_COLOR_STATUS_PLATE[1], 0.4)],
      [0.85, getAlphaColor(CHART_COLOR_STATUS_PLATE[2], 0.4)],
      [1, getAlphaColor(CHART_COLOR_STATUS_PLATE[3], 0.4)],
    );
  } else if (percent <= 0.85) {
    tickColorRegion.push(
      [0.85, getAlphaColor(CHART_COLOR_STATUS_PLATE[1], 0.4)],
      [1, getAlphaColor(CHART_COLOR_STATUS_PLATE[3], 0.4)],
    );
  } else {
    tickColorRegion.push([1, getAlphaColor(CHART_COLOR_STATUS_PLATE[3], 0.4)]);
  }
  return tickColorRegion;
}

function createCanvas() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (ctx !== null) {
    // 设定 canvas 尺寸
    canvas.width = 100;
    canvas.height = 100;

    ctx.fillStyle = '#EAEDF6';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 绘制斜线
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#C5CBE4';
    for (let i = 0; i <= 2 * canvas.width; i += 8) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(0, i);
      ctx.stroke();
    }
  }
  return canvas;
}

export { getCapacityGaugeOption };
