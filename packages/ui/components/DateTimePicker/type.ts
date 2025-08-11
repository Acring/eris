import type { DateRange, DayPicker, Matcher } from 'react-day-picker';

export enum Picker {
  date = 'date',
  time = 'time',
  datetime = 'datetime',
  dateRange = 'dateRange',
  timeRange = 'timeRange',
  dateTimeRange = 'dateTimeRange',
}

export enum PickerInput {
  dateInput = 'dateInput', // 日期输入框
  timeInput = 'timeInput', // 时间输入框
  datetimeInput = 'datetimeInput', // 日期时间输入框
  formRangeInput = 'formRangeInput', // 区间输入框——开始日期/时间
  toRangeInput = 'toRangeInput', // 区间输入框——结束日期/时间
}

export enum DateType {
  single = 'single',
  start = 'start',
  end = 'end',
}

export type CalenderValue = Date | string;

export interface DateTimePickerProps {
  /** 日期时间选择器类型 */
  picker?: Picker;
  /** 是否禁用 */
  disabled?: boolean;
  /** 允许清除 */
  allowClear?: boolean;
  /** 默认文案 */
  placeholder?: string | string[];
  /** 日期时间选择器弹出位置 */
  placement?: 'start' | 'end' | 'center';
  /** 是否自动获取焦点 */
  autoFocus?: boolean;
  /** 是否显示今天按钮 */
  showToday?: boolean;
  /** 是否错误态 */
  error?: boolean;
  /** 默认值 */
  defaultValue?: CalenderValue | CalenderValue[];
  /** 初始值 */
  value?: CalenderValue | CalenderValue[];
  /** 定时快照区间 */
  wholeHour?: boolean;
  /** 是否默认显示整点区间 */
  wholeRangeTime?: boolean;
  /** 结束日期前缀文案 */
  prefixEndHolder?: string;
  /** 是否自动检查开始日期和结束日期大小 */
  controlTime?: boolean;
  /** 宽度 */
  width?: number;
  /** 类名 */
  className?: string;
  /** 禁用的日期 */
  disabledDates?: Matcher | Matcher[] | undefined;
  /** 状态 */
  status?: 'error';
  /** 日历组件值发生改变时的回调 */
  onChange?: (date: Date | (Date | undefined)[] | null, dateString: string | string[]) => void;
  /** 日历组件点击确定按钮时的回调 */
  onOk?: (date: Date | (Date | undefined)[], dateString: string | string[]) => void;
  /** 日历组件失去焦点时的回调 */
  onBlur?: (date: Date | (Date | undefined)[] | null, dateString: string | string[]) => void;
  /** 打开或关闭时的回调 */
  onOpenChange?: (open: boolean) => void;
}

export interface DateInputType {
  date?: Date;
  dateRange?: DateRange;
}
export interface OptionType {
  isChangeCall?: boolean;
  isOkCall?: boolean;
  isDateTimeCall?: boolean;
}

export type CalenderProps = React.ComponentProps<typeof DayPicker> &
  Pick<
    DateTimePickerProps,
    'showToday' | 'picker' | 'placement' | 'wholeHour' | 'placeholder' | 'disabledDates'
  > & {
    open?: boolean;
    inputControl?: DateType;
    inputIng?: boolean;
    onTimeChange?: (
      dateType: DateType,
      time: { hour?: number; minute?: number } | string,
      closePicker?: boolean,
    ) => void;
    onClose?: (dateInput: DateInputType, option?: OptionType) => void;
    onOk?: (option: OptionType) => void;
    onOpenChange?: (open: boolean, option?: OptionType) => void;
    setCurrentDate?: () => void;
    setInputControl?: (dateType: DateType) => void;
    onDayMouseChange?: (dateType: DateType, date: string) => void;
  };

// 时间区间选择器面板宽度
export type RangePickerWidthMapType = {
  [key in 'timeRange' & 'dateTimeRange']: string;
};

export type EventType = React.MouseEvent<HTMLDivElement> & {
  target: { dataset: { value?: string } };
};

export interface TimeRef {
  [DateType.single]: React.MutableRefObject<HTMLDivElement | null>;
  [DateType.start]: React.MutableRefObject<HTMLDivElement | null>;
  [DateType.end]: React.MutableRefObject<HTMLDivElement | null>;
}

export interface HoverDateType {
  start: string;
  end: string;
}
