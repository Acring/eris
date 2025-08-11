'use client';

import type { MouseEvent } from 'react';
import React, { useEffect, useState, useRef } from 'react';
import {
  format,
  addYears,
  getYear,
  addMonths,
  isToday,
  isEqual,
  getMonth,
  isBefore,
  isAfter,
} from 'date-fns';
import { cva } from 'class-variance-authority';
import t from '../../i18n';
import lodash from 'lodash';
import type { DateFormatter, DateRange, CaptionProps, ActiveModifiers } from 'react-day-picker';
import { DayPicker, CaptionNavigation, CaptionLabel } from 'react-day-picker';
import {
  LeftLine16 as ChevronLeft,
  RightLine16 as ChevronRight,
  PrevLine16 as ChevronSuperLeft,
  NextLine16 as ChevronSuperRight,
} from '@xsky/eris-icons';
import { cn } from '@/lib/utils';
import { useConfigProvider } from '@xsky/eris-ui/ConfigProvider';
import { Button, buttonVariants } from '../Button';
import { Popover } from '../Popover';
import { ScrollArea } from '../ScrollArea';
import { IconButton } from '../IconButton';
import type { CalenderProps, EventType, RangePickerWidthMapType, TimeRef } from './type';
import { DateType, Picker } from './type';
import {
  DatePickers,
  SingleDatePickers,
  DateTimeRangePickers,
  DateRangePickers,
  TimePickers,
  TimeRangePickers,
  scrollTo,
  RangePickers,
  generateTimeList,
  stopEventBubble,
  DATE_PICKER_LOCALE,
} from './lib';

// 时间区间面板宽度
const RangePickerWidthMap: RangePickerWidthMapType = {
  timeRange: 'w-[256px]',
  dateTimeRange: 'w-[576px]',
};

// 年月下拉选择器
const pickerVariants = cva(
  cn(
    'rounded-xs text-text-2 hover:bg-grey-100 focus:bg-grey-200 active:bg-grey-200 cursor-pointer px-[2px] py-[4px]',
  ),
  {
    variants: {
      type: {
        year: cn('mr-[4px]'),
      },
    },
  },
);

// 时间选择器面板底部
const footerVariants = cva(
  cn(
    'border-divider-solid absolute bottom-0 left-0 right-0 box-border flex h-[40px] items-center justify-end rounded-b-[2px] border-b-0 border-l-0 border-r-0 border-t border-solid bg-white px-1 py-1 leading-[40px]',
  ),
  {
    variants: {
      align: {
        center: cn(
          'text-primary-normal hover:text-primary-hover active:text-primary-click cursor-pointer justify-center',
        ),
      },
    },
  },
);

// 时间下拉选择器
const timePickerVariants = cva(
  cn('flex select-none flex-col pb-[121px] before:h-[121px] before:w-full before:content-[""]'),
);

const CAPTION_KEY = 'caption';

const CustomIconButton: React.FC<{
  icon: React.ElementType;
  disabled?: boolean;
  onClick?: () => void;
}> = ({ icon: Icon, disabled, onClick }) => (
  <IconButton className={cn('text-inherit')} disabled={disabled} onClick={onClick}>
    <Icon className={cn('h-2 w-2')} />
  </IconButton>
);

function Calendar({
  className,
  classNames,
  showOutsideDays,
  picker = Picker.date,
  wholeHour = false,
  inputIng = false,
  onOpenChange,
  onDayMouseChange,
  ...props
}: CalenderProps) {
  const localeContext = useConfigProvider();

  // 判断是否需要重置当前日期
  const isInitCurrentDateRef = useRef(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const selected = props.selected;
  const prevSelected = useRef(selected);
  const [showTimeRangePicker, setShowTimeRangePicker] = useState(false);
  const [years, setYears] = useState<number[]>([]);
  const [yearCaptionOpen, setYearCaptionOpen] = useState<Record<string, boolean>>({});
  const [monthCaptionOpen, setMonthCaptionOpen] = useState<Record<string, boolean>>({});
  // 操作开始日期/结束日期的年月选择面板
  const [captionHandleType, setCaptionHandleType] = useState<'from' | 'to'>('from');

  const showConfirmBar = [...TimePickers, ...TimeRangePickers, ...DateTimeRangePickers].includes(
    picker,
  );
  const selectedFrom = (selected as DateRange)?.from;
  const selectedTo = (selected as DateRange)?.to;
  // 判断是否已经选过部分日期
  const hasSelectedOneDate = Boolean(
    (selectedFrom && !selectedTo) || (!selectedFrom && selectedTo),
  );

  // 获取初始展示月份
  const getInitialMonthDate = (): Date => {
    // 如果是范围区间选择器，根据输入框选中的位置展示对应初始月份
    if (RangePickers.includes(picker)) {
      // 如果开始日期和结束日期同处一个月份，不需要切换月份位置
      if (selectedFrom && selectedTo && getMonth(selectedFrom) === getMonth(selectedTo)) {
        if (month) {
          return month;
        }
        return selectedFrom;
      }
      // 开始日期选择器
      if (props.inputControl === DateType.start) {
        return selectedFrom || new Date();
      }
      // 结束日期选择器
      if (props.inputControl === DateType.end) {
        // 展示月份需要减去1个月，结束日期展示在右侧
        return selectedTo ? addMonths(selectedTo, -1) : new Date();
      }

      return selectedFrom || (selectedTo ? addMonths(selectedTo, -1) : new Date());
    }
    // 默认返回当前日期
    return (selected as Date) || new Date();
  };
  const [month, setMonth] = useState<Date>(getInitialMonthDate());
  const rangeWidth = RangePickerWidthMap[picker as keyof RangePickerWidthMapType];
  const months = Array(12)
    .fill(0)
    .map((num, index) => index + 1);
  const hourRef: TimeRef = {
    [DateType.single]: React.useRef<HTMLDivElement>(null),
    [DateType.start]: React.useRef<HTMLDivElement>(null),
    [DateType.end]: React.useRef<HTMLDivElement>(null),
  };
  const minuteRef: TimeRef = {
    [DateType.single]: React.useRef<HTMLDivElement>(null),
    [DateType.start]: React.useRef<HTMLDivElement>(null),
    [DateType.end]: React.useRef<HTMLDivElement>(null),
  };
  // 是否展示日期区间选择器
  const numberOfMonths = DateRangePickers.includes(picker) ? 2 : 1;
  // 类名
  const classNamesObj = {
    months: 'flex',
    caption: cn(
      'border-divider-solid text-text-1 relative flex h-[48px] items-center justify-center border-b border-l-0 border-r-0 border-t-0 border-solid',
    ),
    caption_label: 'text-sm font-medium',
    nav: 'hidden',
    nav_button: cn(
      buttonVariants({ type: 'outlined' }),
      'h-[20px] w-[20px] border-none p-0 opacity-50 hover:opacity-100',
    ),
    nav_button_super_previous: 'absolute left-[12px]',
    nav_button_previous: 'absolute left-4',
    nav_button_super_next: 'absolute right-[12px]',
    nav_button_next: 'absolute right-4',
    table: cn('block w-full border-collapse space-y-1 px-2 py-1'),
    head_row: cn('flex'),
    head_cell: cn(
      'text-text-1 flex h-[34px] w-[36px] items-center justify-center rounded-md px-0 text-[14px] font-normal',
    ),
    row: cn('flex w-full'),
    cell: cn(
      'day-cell relative p-0 text-center text-sm focus-within:relative focus-within:z-20 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md',
    ),
    day: cn(
      'text-body text-text-1 group inline-flex h-[34px] w-[36px] cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-sm border-none bg-transparent p-0 text-center font-normal outline-none transition disabled:cursor-not-allowed disabled:shadow-none',
    ),
    day_outside: cn('day-outside'),
    day_disabled: cn('text-muted-foreground opacity-50'),
    day_range_start: cn('range range-start'),
    day_range_middle: cn('range range-middle'),
    day_range_end: cn('range range-end'),
    day_hidden: 'invisible',
    ...classNames,
  };

  useEffect(() => {
    if (
      !prevSelected.current &&
      selectedFrom &&
      selectedTo &&
      DateTimeRangePickers.includes(picker)
    ) {
      // 操作时间区间面板
      handleToggleTimeRangePicker(isInitCurrentDateRef.current);
    }

    // 获取日期时间位置
    const getDatePosition = (dateType: DateType, date: Date) => {
      return [
        { elem: hourRef[dateType], top: date.getHours() },
        { elem: minuteRef[dateType], top: date.getMinutes() },
      ];
    };

    // 如果前后日期是否一致，表示面板初次打开，直接定位
    if (selected && prevSelected) {
      // 单日期选择器
      if (TimePickers.includes(picker)) {
        const prevDate = (prevSelected.current as unknown as Date) || new Date();
        const date = selected as Date;
        if (isEqual(prevDate, date)) {
          scrollTo(getDatePosition(DateType.single, date), 'instant');
        }
      }
      // 双时间选择器
      if (TimeRangePickers.includes(picker) && selectedFrom && selectedTo) {
        const prevDate = (prevSelected.current as unknown as DateRange) || {};
        if (
          prevDate.from &&
          isEqual(prevDate.from, selectedFrom) &&
          prevDate.to &&
          isEqual(prevDate.to, selectedTo)
        ) {
          scrollTo(
            [
              ...getDatePosition(DateType.start, selectedFrom),
              ...getDatePosition(DateType.end, selectedTo),
            ],
            'instant',
          );
        }
      }
      // 单个日期选择器，面板跟随输入框的值切换到对应的月份
      if (SingleDatePickers.includes(picker)) {
        setMonth(selected as Date);
      }
      // 日期区间选择器，只有在开始日期选择器面板，才会跟随输入框的值切换到对应的月份
      if (
        DateRangePickers.includes(picker) &&
        selectedFrom &&
        props.inputControl === DateType.start
      ) {
        setMonth(selectedFrom);
      }
    }

    // 如果输入框的日期输入改变，手动触发滑动
    // 单时间选择器
    if (TimePickers.includes(picker) && selected) {
      const date = selected as Date;
      scrollTo(getDatePosition(DateType.single, date));
    }
    // 双时间选择器
    if ([...TimeRangePickers, ...DateTimeRangePickers].includes(picker)) {
      let values: {
        elem: React.MutableRefObject<HTMLDivElement | null>;
        top?: number | undefined;
      }[] = [];
      if (selectedFrom && props.inputControl === DateType.start) {
        values = getDatePosition(DateType.start, selectedFrom);
      } else if (selectedTo && props.inputControl === DateType.end) {
        values = getDatePosition(DateType.end, selectedTo);
      }
      scrollTo(values);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const handleToggleTimeRangePicker = (toggleShow = true) => {
    if (toggleShow) {
      if (!prevSelected.current) {
        // 结束日期赋值给上一个状态对象
        prevSelected.current = selected as DateRange;
      }
      isInitCurrentDateRef.current = false;
      // 切换时间控制面板
      setShowTimeRangePicker(!showTimeRangePicker);
    }

    // 日期时间区间选择器：打开事件选择器面板，滚动到当前时间
    if (!showTimeRangePicker && DateRangePickers.includes(picker)) {
      setTimeout(() => {
        scrollTo(
          [
            { elem: hourRef[DateType.start], top: selectedFrom?.getHours() },
            { elem: minuteRef[DateType.start], top: selectedFrom?.getMinutes() },
            { elem: hourRef[DateType.end], top: selectedTo?.getHours() },
            { elem: minuteRef[DateType.end], top: selectedTo?.getMinutes() },
          ],
          'instant',
        );
      }, 0);
    }
  };

  const handleDateFocus = (date: Date) => {
    // 根据当前年份，生成年份选择器的年份，往前倒推 5 年，往后倒推 5 年
    const y = parseInt(format(date, 'y'));
    const years = Array(11)
      .fill(0)
      .map((num, index) => {
        return y - 5 + index;
      });
    setYears(years);
  };

  const handleCaptionClick = (event: EventType, type: 'year' | 'month') => {
    stopEventBubble(event);

    const key = `${CAPTION_KEY}${event.target.dataset.value}`;
    // 需要重置状态的面板
    const resetCaption = type === 'year' ? monthCaptionOpen : yearCaptionOpen;
    for (const item in resetCaption) {
      resetCaption[item] = false;
    }

    // 判断当前操作的是开始日期还是结束日期
    setCaptionHandleType(format(month, 'L') === event.target.dataset.value ? 'from' : 'to');

    // 操作对应的下拉面板
    if (type === 'year') {
      // 关闭所有的月选择器面板
      setMonthCaptionOpen(resetCaption);
      setYearCaptionOpen({ [key]: !yearCaptionOpen[key] });
    } else if (type === 'month') {
      // 关闭所有的年选择器面板
      setYearCaptionOpen(resetCaption);
      setMonthCaptionOpen({ [key]: !monthCaptionOpen[key] });
    }
  };

  const handleYearChange = (offset: number) => {
    setMonth((currentMonth) => addYears(currentMonth, offset));
  };

  const handleMonthChange = (offset: number) => {
    setMonth((currentMonth) => addMonths(currentMonth, offset));
  };

  const formatDay: DateFormatter = (date, options) => {
    const d = format(date, 'd', { locale: options?.locale });
    const dateStr = format(date, 'yyyy-MM-dd', { locale: options?.locale });

    return (
      <span
        className={cn(
          {
            'group-hover:bg-grey-100 group-active:bg-grey-200 group-focus-visible:bg-grey-200':
              !DateRangePickers.includes(picker) || !hasSelectedOneDate,
            'group-hover:bg-purple-100': DateRangePickers.includes(picker) && hasSelectedOneDate,
          },
          'box-border h-[28px] w-[28px] rounded-sm border-transparent bg-transparent leading-[28px]',
          'group-aria-selected:hover:bg-primary-normal group-aria-selected:focus:bg-primary-normal group-aria-selected:bg-primary-normal group-aria-selected:text-white group-aria-selected:hover:text-white group-aria-selected:focus:text-white',
          {
            'border-primary-normal border border-solid': isToday(date),
          },
          // 跨月份的日期样式
          'group-[.day-outside]:before:!bg-transparent group-[.day-outside]:after:!bg-transparent',
          'group-[.day-outside]:text-muted-foreground group-[.day-outside]:!text-text-4 group-[.day-outside]:!bg-white',
          'group-[.day-outside]:hover:!bg-grey-100 group-[.day-outside]-focus-visible:!bg-grey-200 group-[.day-outside]-active:!bg-grey-200',
          // 区间（通用）样式
          'group-[.range]:relative',
          'group-[.range]:before:absolute group-[.range]:before:left-[-4px] group-[.range]:before:top-0 group-[.range]:before:block group-[.range]:before:h-full group-[.range]:before:w-[4px] group-[.range]:before:content-[""]',
          'group-[.range]:after:absolute group-[.range]:after:right-[-4px] group-[.range]:after:top-0 group-[.range]:after:block group-[.range]:after:h-full group-[.range]:after:w-[4px] group-[.range]:after:content-[""]',
          {
            'group-[.range]:before:left-[-5px] group-[.range]:after:right-[-5px]': isToday(date),
            'group-[.range]:before:top-[-1px] group-[.range]:before:h-[28px] group-[.range]:after:top-[-1px] group-[.range]:after:h-[28px]':
              isToday(date),
          },
          // 区间段样式
          'group-[.range-middle.range]:text-text-1 group-[.range-middle.range]:bg-primary-bg group-[.range-middle]:rounded-none',
          'group-[.range-middle]:before:bg-primary-bg group-[.range-middle]:after:bg-primary-bg',
          'group-[.range-middle.range]:hover:text-text-1 group-[.range-middle.range]:hover:bg-primary-bg',
          // 区间段样式 - 二次hover
          'group-[.range-hover-again.range]:text-text-1 group-[.range-hover-again.range]:bg-purple-100 group-[.range-hover-again]:rounded-none',
          'group-[.range-hover-again]:before:bg-purple-100 group-[.range-hover-again]:after:bg-purple-100',
          'group-[.range-hover-again.range]:hover:text-text-1 group-[.range-hover-again.range]:hover:bg-purple-100',
          // 区间开始按钮样式
          'group-[.range-start]:after:bg-primary-normal group-[.range-start]:before:bg-primary-normal group-[.range-start]:rounded-none group-[.range-start]:before:rounded-l-[2px]',
          // 区间结束按钮样式
          'group-[.range-end]:after:bg-primary-normal group-[.range-end]:before:bg-primary-normal group-[.range-end]:rounded-none group-[.range-end]:after:rounded-r-[2px]',
          // 区间结束按钮样式（hover状态）
          'group-[.range-hover-end]:rounded-none group-[.range-hover-end]:after:rounded-r-[2px]',
          'group-[.range-middle.range.range-hover-end]:bg-purple-100 group-[.range-middle.range.range-hover-end]:hover:bg-purple-100',
          'group-[.range-hover-again.range.range-hover-end]:bg-purple-100 group-[.range-hover-again.range.range-hover-end]:hover:bg-purple-100',
          'group-[.range.range-hover-end]:hover:bg-purple-100 group-[.range-hover-end.range]:before:bg-purple-100 group-[.range-hover-end.range]:after:bg-purple-100',
        )}
        data-date={dateStr}
      >
        {d}
      </span>
    );
  };

  const formatCaption: DateFormatter = (date, options) => {
    const y = format(date, 'y', { locale: options?.locale });
    const m = format(date, 'L', { locale: options?.locale });
    const d = format(date, 'd', { locale: options?.locale });
    const pickerClassName = {
      scrollBody: cn(
        'rounded-radius-sm border-divider-solid text-body shadow-elevation-2-bottom flex flex-col border border-solid bg-white py-[4px] font-normal',
      ),
      pickerItem: cn(
        'text-text-1 hover:bg-grey-100 focus:bg-grey-200 active:bg-grey-200 inline-block h-[34px] cursor-pointer text-center leading-[34px]',
      ),
    };

    return (
      <div className={cn('text-body text-text-1 font-medium')}>
        <Popover
          align="start"
          arrow={false}
          className={cn('min-w-min max-w-max p-0')}
          container={containerRef.current}
          content={
            <ScrollArea height="255px" thumbSize="thin" width="80px">
              <div className={pickerClassName.scrollBody}>
                {years.map((year) => (
                  <span
                    className={cn(pickerClassName.pickerItem, {
                      'bg-grey-200': +format(date, 'y') === year,
                    })}
                    key={year}
                    onClick={() => handleSetDate(`${year}/${m}/${d}`)}
                  >
                    {year}
                  </span>
                ))}
              </div>
            </ScrollArea>
          }
          open={!!yearCaptionOpen[`${CAPTION_KEY}${m}`]}
          side="bottom"
          trigger={['click']}
        >
          <span
            className={cn(pickerVariants({ type: 'year' }))}
            data-value={m}
            onClick={(event: EventType) => handleCaptionClick(event, 'year')}
          >
            {t('{{value}} 年', { value: y })}
          </span>
        </Popover>
        <Popover
          align="start"
          arrow={false}
          className={cn('min-w-min max-w-max p-0')}
          container={containerRef.current}
          content={
            <ScrollArea height="255px" thumbSize="thin" width="80px">
              <div className={pickerClassName.scrollBody}>
                {months.map((month) => (
                  <span
                    className={cn(pickerClassName.pickerItem, {
                      'bg-grey-200': +format(date, 'L') === month,
                    })}
                    key={month}
                    onClick={() => handleSetDate(`${y}/${month}/${d}`)}
                  >
                    {month}
                  </span>
                ))}
              </div>
            </ScrollArea>
          }
          open={!!monthCaptionOpen[`${CAPTION_KEY}${m}`]}
          side="bottom"
          trigger={['click']}
        >
          <span
            className={cn(pickerVariants())}
            data-value={m}
            onClick={(event: EventType) => handleCaptionClick(event, 'month')}
          >
            {t('{{value}} 月', { value: m })}
          </span>
        </Popover>
      </div>
    );
  };

  const handleSetDate = (dateString: string) => {
    let currentDate = new Date(dateString);
    // 判断年月选择是否为开始年月，如果是当前年月，直接赋值；如果不是，则月份需要减1
    currentDate = captionHandleType === 'from' ? currentDate : addMonths(currentDate, -1);
    setMonth(currentDate);
  };

  const getDate = (dateType: DateType): Date | undefined => {
    const date = selected as Date;
    if (dateType === DateType.start) {
      return selectedFrom;
    }
    if (dateType === DateType.end) {
      return selectedTo;
    }
    return date;
  };

  /**
   * 切换输入框光标
   * @param dateType
   * @returns
   */
  const handleChangeInputFocus = (dateType: DateType) => {
    if (![DateType.start, DateType.end].includes(dateType)) {
      return;
    }
    props.setInputControl?.(dateType);
  };

  const renderHours = (
    dateType: DateType,
    callback: (hour: number, wholeHourTime: { hour: number; minute: number }) => void,
    format?: string,
  ) => {
    const hour = getDate(dateType)?.getHours() || 0;
    const hourArr = generateTimeList('hour', format);

    return (
      <ScrollArea
        className={cn(
          'border-divider-solid flex-1 border-b-0 border-l-0 border-r border-t-0 border-solid',
        )}
        height="254px"
        ref={hourRef[dateType]}
        thumbSize="thin"
      >
        <div
          className={timePickerVariants()}
          onClick={({
            target: {
              dataset: { value },
            },
          }: EventType) => {
            scrollTo([{ elem: hourRef[dateType], top: Number(value) }]);
          }}
        >
          {hourArr.map((hourVal, index) => (
            <span
              className={cn(
                'text-text-1 hover:bg-grey-100 focus:bg-grey-200 active:bg-grey-200 h-4 cursor-pointer text-center leading-[32px]',
                {
                  'bg-grey-200': hour === index,
                },
              )}
              data-value={index}
              key={hourVal}
              onClick={() => {
                handleChangeInputFocus(dateType);
                const [hour, minute] = hourVal.split(':');
                callback(index, { hour: Number(hour), minute: Number(minute) });
              }}
            >
              {hourVal}
              {!wholeHour && hour === index ? t(' 时 ') : ''}
            </span>
          ))}
        </div>
      </ScrollArea>
    );
  };

  const renderMinutes = (dateType: DateType, callback: (minute: number) => void) => {
    const minute = getDate(dateType)?.getMinutes() || 0;
    return (
      <ScrollArea
        className={cn('flex-1', {
          'border-divider-solid border-b-0 border-l-0 border-r border-t-0 border-solid':
            dateType === DateType.start,
        })}
        height="254px"
        ref={minuteRef[dateType]}
        thumbSize="thin"
      >
        <div
          className={timePickerVariants()}
          onClick={({
            target: {
              dataset: { value },
            },
          }: EventType) => {
            scrollTo([{ elem: minuteRef[dateType], top: Number(value) }]);
          }}
        >
          {Array(60)
            .fill(0)
            .map((num, index) => (
              <span
                className={cn(
                  'text-text-1 hover:bg-grey-100 focus:bg-grey-200 active:bg-grey-200 h-4 cursor-pointer text-center leading-[32px]',
                  {
                    'bg-grey-200': minute === index,
                  },
                )}
                data-value={index}
                key={index}
                onClick={() => {
                  handleChangeInputFocus(dateType);
                  callback(index);
                }}
              >
                {index < 10 ? `0${index}` : index}
                {minute === index ? t(' 分 ') : ''}
              </span>
            ))}
        </div>
      </ScrollArea>
    );
  };

  const renderTimePicker = () => {
    if (!TimePickers.includes(picker)) {
      return null;
    }
    return (
      <div
        className={cn(
          'border-divider-solid text-body flex flex-col border-b-0 border-l border-r-0 border-t-0 border-solid font-normal',
        )}
      >
        <div
          className={cn(
            'border-divider-solid flex h-[48px] w-[120px] items-center justify-center border-b border-l-0 border-r-0 border-t-0 border-solid',
          )}
        >
          <span className={cn('text-body text-text-1 font-medium')}>
            {selected ? format(selected as Date, 'HH:mm') : '00:00'}
          </span>
        </div>
        <div className={cn('flex flex-1')}>
          {renderHours(DateType.single, (hour) => props.onTimeChange?.(DateType.single, { hour }))}
          {renderMinutes(DateType.single, (minute) =>
            props.onTimeChange?.(DateType.single, { minute }),
          )}
        </div>
      </div>
    );
  };

  const renderTimeRangePicker = () => {
    if (!showTimeRangePicker && !TimeRangePickers.includes(picker)) {
      return null;
    }

    const { placeholder } = props;
    const [startPlaceholder, endPlaceholder] =
      Array.isArray(placeholder) && placeholder.length === 2 ? placeholder : ['', ''];

    return (
      <div className={cn(`${rangeWidth as string} text-body bg-white font-normal shadow-md`)}>
        <div
          className={cn(
            'border-divider-solid text-body text-text-1 flex h-[48px] items-center justify-center border-b border-l-0 border-r-0 border-t-0 border-solid font-medium',
          )}
        >
          <span className={cn('flex flex-1 justify-center')}>
            {TimeRangePickers.includes(picker)
              ? t(' 开始时间')
              : selectedFrom
                ? format(selectedFrom, 'yyyy-MM-dd')
                : startPlaceholder}
          </span>
          <span className={cn('flex flex-1 justify-center')}>
            {TimeRangePickers.includes(picker)
              ? t(' 结束时间')
              : selectedTo
                ? format(selectedTo, 'yyyy-MM-dd')
                : endPlaceholder}
          </span>
        </div>
        <div className={cn('flex')}>
          <div className={cn('flex flex-1 justify-center')}>
            {wholeHour ? (
              <>
                {renderHours(
                  DateType.start,
                  (hour, wholeHourTime) => props.onTimeChange?.(DateType.start, wholeHourTime),
                  'HH:00',
                )}
              </>
            ) : (
              <>
                <div className={cn('flex flex-1 justify-center')}>
                  {renderHours(DateType.start, (hour) =>
                    props.onTimeChange?.(DateType.start, { hour }),
                  )}
                </div>
                <div className={cn('flex flex-1 justify-center')}>
                  {renderMinutes(DateType.start, (minute) =>
                    props.onTimeChange?.(DateType.start, { minute }),
                  )}
                </div>
              </>
            )}
          </div>
          <div className={cn('flex flex-1')}>
            {wholeHour ? (
              <>
                {renderHours(
                  DateType.end,
                  (hour, wholeHourTime) => props.onTimeChange?.(DateType.end, wholeHourTime),
                  'HH:59',
                )}
              </>
            ) : (
              <>
                <div className={cn('flex flex-1 justify-center')}>
                  {renderHours(DateType.end, (hour) =>
                    props.onTimeChange?.(DateType.end, { hour }),
                  )}
                </div>
                <div className={cn('flex flex-1 justify-center')}>
                  {renderMinutes(DateType.end, (minute) =>
                    props.onTimeChange?.(DateType.end, { minute }),
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderConfirmBar = () => {
    // 只有时间选择器才有确定按钮
    if (!showConfirmBar) {
      return null;
    }

    const handleSetCurrentTime = () => {
      const date = new Date();
      props.onTimeChange?.(
        DateType.single,
        { hour: date.getHours(), minute: date.getMinutes() },
        true,
      );
    };

    const handleConfirm = () => {
      props.onOk?.({ isChangeCall: false, isOkCall: true });
    };

    return (
      <div className={footerVariants()}>
        {TimePickers.includes(picker) && (
          <Button
            className={cn('mr-1')}
            color="primary"
            onClick={handleSetCurrentTime}
            size="xs"
            type="text"
          >
            {t('此刻')}
          </Button>
        )}
        {DateTimeRangePickers.includes(picker) && (
          <Button
            className={cn('mr-1')}
            color="primary"
            onClick={() => handleToggleTimeRangePicker(true)}
            size="xs"
            type="text"
          >
            {showTimeRangePicker ? t(' 选择日期 ') : t(' 选择时间 ')}
          </Button>
        )}
        <Button
          disabled={
            !selected ||
            Boolean(!selectedFrom && selectedTo) ||
            Boolean(selectedFrom && !selectedTo) ||
            (lodash.has(selected, 'from') && !selectedFrom && !selectedTo)
          }
          onClick={handleConfirm}
          size="xs"
        >
          {t('确定')}
        </Button>
      </div>
    );
  };

  const renderQuickPickerBar = () => {
    // 只有单日期选择器才有快速选择
    if (!props.showToday || Picker.date !== picker) {
      return null;
    }

    return (
      <div
        className={footerVariants({ align: 'center' })}
        onClick={() => props.onTimeChange?.(DateType.single, new Date().toDateString(), true)}
      >
        {t('今天')}
      </div>
    );
  };

  const Caption = (caption: CaptionProps) => {
    const currentYear = getYear(caption.displayMonth);
    const disabledPrevious = props.fromYear && currentYear <= props.fromYear;
    const disabledNext = props.toYear && currentYear >= props.toYear;

    return (
      <div className={classNamesObj.caption}>
        <CaptionLabel
          displayIndex={caption.displayIndex}
          displayMonth={caption.displayMonth}
          id={caption.id}
        />
        <CaptionNavigation displayMonth={caption.displayMonth} id={caption.id} />
        <div className={cn(classNamesObj.nav_button, classNamesObj.nav_button_super_previous)}>
          <CustomIconButton
            disabled={!!disabledPrevious}
            icon={ChevronSuperLeft}
            onClick={() => handleYearChange(-1)}
          />
          <CustomIconButton icon={ChevronLeft} onClick={() => handleMonthChange(-1)} />
        </div>
        <div
          className={cn(classNamesObj.nav_button, classNamesObj.nav_button_super_next, 'mr-[20px]')}
        >
          <CustomIconButton icon={ChevronRight} onClick={() => handleMonthChange(1)} />
          <CustomIconButton
            disabled={!!disabledNext}
            icon={ChevronSuperRight}
            onClick={() => handleYearChange(1)}
          />
        </div>
      </div>
    );
  };

  /**
   * 点击日期事件回调
   * @param val
   */
  const handleDayClick = (val: Date) => {
    // 单日期选择器，选择日期后关闭日历，不回调 change 事件
    if (Picker.date === picker) {
      props.onClose?.({ date: val }, { isChangeCall: false });
    }
    // 区间选择器
    if (DateRangePickers.includes(picker)) {
      props.onTimeChange?.(
        props.inputControl === DateType.end ? DateType.end : DateType.start,
        val.toDateString(),
      );
      setTimeout(() => {
        onDayMouseChange?.(props.inputControl === DateType.end ? DateType.end : DateType.start, '');
      }, 100);
    }
  };

  const handleClosePopoverPanel = () => {
    setMonthCaptionOpen({});
    setYearCaptionOpen({});
  };

  const handleDayMouseChange = lodash.debounce((date?: Date) => {
    onDayMouseChange?.(
      props.inputControl === DateType.end ? DateType.end : DateType.start,
      date ? format(date, 'yyyy-MM-dd') : '',
    );
  }, 60);

  /**
   * 处理区间段和非区间段日期的hover状态样式
   * @param hoverDate
   */
  const toggleRangeMiddleHover = (hoverDate: Date) => {
    // 查找区间选择器元素
    const spans = document.querySelectorAll('span[data-date]') || [];
    const rangeElemObj = { rangeDates: [], notRangeDates: [], rangeAgainDates: [] };
    lodash.forEach(spans, (spanElem: any) => {
      const spanDate = spanElem.dataset.date;
      // 区间段日期跟选中的日期进行比较，判断当前的日期是否为区间段日期
      let isRange = false;
      let isHoverAgain = false;
      // 开始，结束日期都选中
      if (selectedFrom && selectedTo) {
        // 选中区间日期段
        if (isBefore(selectedFrom, hoverDate) && isAfter(selectedTo, hoverDate)) {
          if (props.inputControl === DateType.start) {
            isHoverAgain =
              isBefore(hoverDate, new Date(spanDate)) && isAfter(selectedTo, new Date(spanDate));
            isRange =
              isBefore(new Date(spanDate), hoverDate) && isAfter(new Date(spanDate), selectedFrom);
          } else {
            isHoverAgain =
              isBefore(selectedFrom, new Date(spanDate)) && isAfter(hoverDate, new Date(spanDate));
            isRange =
              isBefore(hoverDate, new Date(spanDate)) && isAfter(selectedTo, new Date(spanDate));
          }
        } else if (isBefore(hoverDate, selectedFrom)) {
          isHoverAgain =
            isBefore(hoverDate, new Date(spanDate)) && isBefore(new Date(spanDate), selectedTo);
        } else if (isAfter(hoverDate, selectedTo)) {
          isHoverAgain =
            isBefore(new Date(spanDate), hoverDate) && isBefore(selectedFrom, new Date(spanDate));
        }
        if (isEqual(hoverDate, new Date(`${spanDate} 00:00:00`))) {
          isHoverAgain = true;
        }
      }
      // 只有开始日期
      else if (selectedFrom && !selectedTo) {
        if (isAfter(hoverDate, selectedFrom)) {
          isRange =
            isBefore(selectedFrom, new Date(spanDate)) && isAfter(hoverDate, new Date(spanDate));
        } else {
          isRange =
            isBefore(new Date(spanDate), selectedFrom) && isAfter(new Date(spanDate), hoverDate);
        }
      } else if (selectedTo && !selectedFrom) {
        // 只有结束日期
        if (isBefore(hoverDate, selectedTo)) {
          isRange =
            isBefore(new Date(spanDate), selectedTo) && isAfter(new Date(spanDate), hoverDate);
        } else {
          isRange =
            isBefore(selectedTo, new Date(spanDate)) && isAfter(hoverDate, new Date(spanDate));
        }
      }
      // 二次选中的日期
      if (isRange || isHoverAgain) {
        if (isHoverAgain) {
          rangeElemObj.rangeAgainDates.push(spanElem.parentElement as never);
        } else {
          rangeElemObj.rangeDates.push(spanElem.parentElement as never);
        }
      } else {
        rangeElemObj.notRangeDates.push(spanElem.parentElement as never);
      }
    });
    // 区间段二次hover的状态样式
    rangeElemObj.rangeAgainDates.forEach((btnElem: any) => {
      if (
        !btnElem.className.includes('range-start') &&
        !btnElem.className.includes('range-end') &&
        !btnElem.className.includes('range-hover-end')
      ) {
        if (btnElem.className.includes('range-middle')) {
          btnElem.className = btnElem.className.replace(/range-middle/g, 'range-hover-again');
        } else if (!btnElem.className.includes('range-hover-again')) {
          btnElem.className += ' range range-hover-again ';
        }
      }
    });
    // 区间段日期添加hover状态
    rangeElemObj.rangeDates.forEach((btnElem: any) => {
      if (
        !btnElem.className.includes('range range-middle') &&
        !btnElem.className.includes('range-start') &&
        !btnElem.className.includes('range-end') &&
        !btnElem.className.includes('range-hover-end')
      ) {
        if (btnElem.className.includes('range-hover-again')) {
          btnElem.className = btnElem.className.replace(/range-hover-again/g, 'range-middle');
        } else {
          btnElem.className += ' range range-middle ';
        }
      }
    });
    // 非区间段日期取消hover状态
    rangeElemObj.notRangeDates.forEach((btnElem: any) => {
      // 跨越月份的日期不做移除处理
      if (!btnElem.className.includes('day-outside')) {
        btnElem.className = btnElem.className.replace(
          /\srange (range-middle|range-hover-again)\s/g,
          '',
        );
      }
    });
  };

  /**
   * 清除区间段日期的hover状态
   */
  const clearRangeMiddleHover = () => {
    const spans = document.querySelectorAll('span[data-date]') || [];
    spans.forEach((spanElem: any) => {
      spanElem.parentElement.className = spanElem.parentElement?.className.replace(
        /\srange (range-middle|range-hover-again)\s/g,
        '',
      );
    });
  };

  const handleDayMouseEnter = (day: Date, activeModifiers: ActiveModifiers, e: MouseEvent) => {
    handleDayMouseChange(day);

    // 区间日期添加hover状态
    toggleRangeMiddleHover(day);

    // 未选中日期
    if (!hasSelectedOneDate) {
      return;
    }

    // 添加 hover 状态的类名
    const target = e.currentTarget;
    if (
      !target?.className.includes('range range-hover-end') &&
      !target.className.includes('range-start')
    ) {
      target.className += ' range range-hover-end ';
    }
  };

  const clearHoverAgainStyle = () => {
    const spans = document.querySelectorAll('span[data-date]') || [];
    spans.forEach((spanElem: any) => {
      if (spanElem.parentElement.className.includes('rdp-day_selected')) {
        spanElem.parentElement.className = spanElem.parentElement?.className.replace(
          /range-hover-again/g,
          'range-middle',
        );
      } else {
        spanElem.parentElement.className = spanElem.parentElement?.className.replace(
          /\srange range-hover-again\s*/g,
          '',
        );
      }
    });
  };

  const handleDayMouseLeave = (day: Date, activeModifiers: ActiveModifiers, e: MouseEvent) => {
    handleDayMouseChange();

    // 清除二次hover态样式
    clearHoverAgainStyle();

    // 未选中日期
    if (!hasSelectedOneDate) {
      return;
    }
    const target = e.currentTarget;
    // 移除 hover 状态的类名
    if (
      target?.className.includes('range range-hover-end') &&
      !target.className.includes('range-start')
    ) {
      target.className = target.className.replace(/\srange range-hover-end\s/g, '');
      // 清除区间段日期的hover样式
      clearRangeMiddleHover();
    }
  };

  /**
   * 日期区间选择器，选择结束日期后关闭日历，不回调 change 事件
   */
  useEffect(() => {
    const rangeDateSelected = Picker.dateRange === picker && selectedFrom && selectedTo;
    if (rangeDateSelected && !lodash.isEqual(prevSelected.current, selected) && !inputIng) {
      props.onClose?.({ dateRange: selected as DateRange }, { isChangeCall: false });
    }
    // 输入框选中位置发生改变，切换到对应的月份
    if (DateRangePickers.includes(picker) && selectedFrom && selectedTo) {
      setMonth(getInitialMonthDate());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [picker, selected, props.open, props.inputControl]);

  /**
   * 日期时间发生改变，在关闭的时候回调 change 事件
   */
  useEffect(() => {
    if (!props.open && !lodash.isEqual(prevSelected.current, selected)) {
      onOpenChange?.(false, { isDateTimeCall: true });
    }
  }, [props.open, selected, onOpenChange]);

  return (
    <div
      className={cn(`bg-white relative flex`, {
        // 单日期选择器 并且 显示今天按钮 || 时间选择器，展示底部
        'pb-[40px]': (props.showToday && Picker.date === picker) || showConfirmBar,
      })}
      onClick={handleClosePopoverPanel}
      ref={containerRef}
    >
      {/* 日历选择器 */}
      {DatePickers.includes(picker) && !showTimeRangePicker && (
        <DayPicker
          className={className}
          classNames={classNamesObj}
          components={{
            Caption,
          }}
          data-testid="DateTimePicker-dayPicker"
          disabled={props.disabledDates}
          fixedWeeks
          formatters={{ formatCaption, formatDay }}
          locale={DATE_PICKER_LOCALE[localeContext?.locale || 'zh-CN']}
          month={month}
          numberOfMonths={numberOfMonths}
          onDayClick={handleDayClick}
          onDayFocus={handleDateFocus}
          onDayMouseEnter={handleDayMouseEnter}
          onDayMouseLeave={handleDayMouseLeave}
          onMonthChange={setMonth}
          showOutsideDays={showOutsideDays}
          {...props}
        />
      )}
      {/* 时间选择器 */}
      {renderTimePicker()}
      {/* 时间区间选择器 */}
      {renderTimeRangePicker()}
      {/* 底部确定输入栏 */}
      {renderConfirmBar()}
      {/* 快速选择 */}
      {renderQuickPickerBar()}
    </div>
  );
}

export default Calendar;
