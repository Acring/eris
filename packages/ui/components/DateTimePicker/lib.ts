import lodash from 'lodash';
import { parse, isValid, setHours, setMinutes, format } from 'date-fns';
import { zhCN, enUS, vi } from 'date-fns/locale';
import type { CalenderValue } from './type';
import { Picker } from './type';

// 时间选择器类型
export const TimePickers = ['time', 'datetime'];
// 日期选择器类型
export const DatePickers = ['date', 'dateRange', 'datetime', 'dateTimeRange'];
// 区间选择器类型
export const RangePickers = ['dateRange', 'timeRange', 'dateTimeRange'];
// 日期时间区间选择器类型
export const DateTimeRangePickers = ['dateTimeRange'];
// 日期区间选择器类型
export const DateRangePickers = ['dateRange', 'dateTimeRange'];
// 时间区间选择器类型
export const TimeRangePickers = ['timeRange'];
//日期选择器
export const SingleDatePickers = ['date', 'datetime'];

// 设计稿：https://www.figma.com/design/Do849NlMKTXCv8djOFIFWA/%E9%80%9A%E7%94%A8%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?node-id=55068-27857&m=dev
export const TriggerPickerWidth: Record<string, string> = {
  [Picker.date]: '140px',
  [Picker.time]: '140px',
  [Picker.datetime]: '180px',
  [Picker.dateTimeRange]: '340px',
  [Picker.timeRange]: '200px',
  default: '260px',
};

// 滚动到指定区域
const TimeItemHeight = 32;
export const scrollTo = (
  targets: { elem: React.MutableRefObject<HTMLDivElement | null>; top?: number }[],
  behavior: 'smooth' | 'instant' = 'smooth',
) => {
  targets.forEach(({ elem, top = 0 }) => {
    elem.current?.scrollTo({
      top: top * TimeItemHeight,
      behavior,
    });
  });
};

export const generateTimeList = (type: 'hour' | 'minute', format?: string) => {
  // 生成时间列表
  const timeList = [];
  const mFormat = format ? format.split(':')[1] : '';
  for (let i = 0; i < 24; i++) {
    const item = (i < 10 ? `0${i}` : i) + (mFormat ? `:${mFormat}` : '');
    timeList.push(item);
  }
  return timeList;
};

// 停止冒泡
export const stopEventBubble = (event: React.MouseEvent) => {
  event.stopPropagation();
  event.preventDefault();
};

export const formatDate = (formatPattern: string, dateVal?: CalenderValue | CalenderValue[]) => {
  // 如果传入的是单个日期对象，直接返回
  if (lodash.isDate(dateVal)) {
    return [dateVal];
  }

  // 如果传入的是单个日期字符串，转换成日期对象
  if (typeof dateVal === 'string') {
    const parsedDate = parse(dateVal, formatPattern, new Date());
    return isValid(parsedDate) ? [parsedDate] : [];
  }

  const getDateValue = (val: CalenderValue) => {
    if (typeof val === 'string') {
      const parsedDate = parse(val, formatPattern, new Date());
      return isValid(parsedDate) ? parsedDate : undefined;
    }
    return val;
  };

  // 如果传入的是数组
  if (lodash.isArray(dateVal)) {
    // 个数只有一个，返回第一个
    if (dateVal.length === 1) {
      return [getDateValue(dateVal[0])];
    }
    // 个数大于一个，返回前两个
    return [getDateValue(dateVal[0]), getDateValue(dateVal[1])];
  }
  return [];
};

export const validateInput = (value: string, type: string): [boolean, Date] => {
  let regex;
  let parsedFormat;

  switch (type) {
    case 'date':
    case 'dateRange':
      regex = /^\d{4}-\d{2}-\d{2}$/;
      parsedFormat = 'yyyy-MM-dd';
      break;
    case 'time':
    case 'timeRange':
      regex = /^\d{2}:\d{2}$/;
      parsedFormat = 'HH:mm';
      break;
    case 'datetime':
    case 'dateTimeRange':
      regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;
      parsedFormat = 'yyyy-MM-dd HH:mm';
      break;
    default:
      return [false, new Date()];
  }
  const parsedValue = parse(value, parsedFormat, new Date());
  const isValidDate = isValid(parsedValue) && regex.test(value);

  return [isValidDate, parsedValue];
};

export const DATE_PICKER_LOCALE = {
  'en-US': enUS,
  'zh-CN': zhCN,
  'vi-VN': vi,
};

/**
 * 区间选择器
 * @param picker
 * @returns
 */
export const isRangePicker = (picker: Picker) => {
  return RangePickers.includes(picker);
};

/**
 * 单日期选择器
 * @param picker
 * @returns
 */
export const isSingleDatePicker = (picker: Picker) => {
  return !RangePickers.includes(picker);
};

/**
 * 更新时间（时分）
 * @param target
 * @param source
 * @returns
 */
export const updateDateTime = (target?: Date, source?: Date) => {
  let _target = target;
  if (_target && source) {
    _target = setHours(_target, source.getHours());
    _target = setMinutes(_target, source.getMinutes());
  }
  return _target;
};

/**
 * 交换日期（时间不做交换）
 * @param target
 * @param source
 * @returns
 */
export const getExchangeDate = (target: Date, source: Date) => {
  return new Date(`${format(target, 'yyyy-MM-dd')} ${format(source, 'HH:mm:ss')}`);
};
