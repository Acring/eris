'use client';
import type { ChangeEventHandler } from 'react';
import React, { useEffect, useCallback, useMemo, useRef } from 'react';
import { format, setHours, setMinutes, isBefore } from 'date-fns';
import type { DateRange } from 'react-day-picker';
import { cva } from 'class-variance-authority';
import { ErrorLine16, CalendarLine16 } from '@xsky/eris-icons';
import lodash from 'lodash';
import { cn } from '../../lib/utils';
import t from '../../i18n';
import { Popover } from '../Popover';
import Calendar from './Calendar';
import type {
  CalenderProps,
  DateInputType,
  DateTimePickerProps,
  OptionType,
  HoverDateType,
} from './type';
import { DateType, Picker, PickerInput } from './type';
import {
  DateRangePickers,
  TimePickers,
  DateTimeRangePickers,
  TimeRangePickers,
  TriggerPickerWidth,
  formatDate,
  stopEventBubble,
  validateInput,
  isRangePicker,
  isSingleDatePicker,
  updateDateTime,
  getExchangeDate,
} from './lib';
import { IconButton } from '../IconButton';

const InputBaseClassName =
  'bg-form-bg-normal w-11/12 disabled:bg-grey-50 disabled:text-text-4 disabled:placeholder:text-text-4 disabled:cursor-not-allowed placeholder:text-body placeholder:font-normal placeholder:text-text-4 border-none p-0 pl-[4px] text-body text-text-1 outline-none transition';

const dateTimePickerVariants = cva(
  cn(
    'box-border border-form-border-default-normal component-border-primary component-ring-primary rounded-radius-sm text-text-1 data-[state=open]:border-form-border-default-focus data-[state=open]:shadow-interactive-primary-focus flex w-full items-center justify-between border border-solid bg-form-bg-normal px-[4px] py-[5px] text-left',
  ),
  {
    variants: {
      disabled: {
        false:
          'border-form-border-default-normal component-ring-primary active:component-ring-primary hover:component-border-primary hover:bg-form-bg-normal active:bg-form-bg-normal',
        true: 'component-ring-none hover:border-form-border-default-disable bg-form-bg-disable cursor-not-allowed border-form-border-default-disable',
      },
      noValue: {
        true: 'text-text-4',
      },
      status: {
        error:
          'border-form-border-danger-normal component-border-danger component-ring-danger data-[state=open]:border-form-border-danger-focus data-[state=open]:shadow-interactive-danger-focus',
      },
    },
  },
);

/**
 * Owner: 陈胜
 *
 * Figma: https://www.figma.com/file/Do849NlMKTXCv8djOFIFWA/%E9%80%9A%E7%94%A8%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?type=design&node-id=11723-119099&mode=design
 *
 * 日期时间选择器
 */
const DateTimePicker = React.forwardRef<HTMLDivElement, DateTimePickerProps>(
  (
    {
      className,
      placeholder,
      disabled,
      placement = 'start',
      picker = Picker.date,
      allowClear = true,
      wholeRangeTime = true,
      value,
      defaultValue,
      status,
      onOk,
      onChange,
      onOpenChange,
      ...props
    },
    ref,
  ) => {
    const formatPattern = {
      date: 'yyyy-MM-dd',
      time: 'HH:mm',
      datetime: 'yyyy-MM-dd HH:mm',
      dateRange: 'yyyy-MM-dd',
      timeRange: 'HH:mm',
      dateTimeRange: 'yyyy-MM-dd HH:mm',
    }[picker];
    // 标识输入框光标是否发生自动切换
    const inputAutoFocus = useRef(false);
    const [inputIng, setInputIng] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [clear, setClear] = React.useState(false);
    const [defaultFrom, defaultTo] = formatDate(formatPattern, value || defaultValue);
    const [date, setDate] = React.useState<Date | undefined>(defaultFrom);
    const [inputControl, setInputControl] = React.useState<DateType>(DateType.single);
    const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
      from: defaultFrom,
      to: defaultTo,
    });

    const isTimeRangePicker = useMemo(() => picker === Picker.timeRange, [picker]);

    const safeFormatDate = useCallback(
      (date: Date | undefined) => (date ? format(date, formatPattern) : ''),
      [formatPattern],
    );
    const [inputDateValue, setInputDateValue] = React.useState(safeFormatDate(date));
    const [inputRangeValue, setInputRangeValue] = React.useState({
      from: safeFormatDate(defaultFrom),
      to: safeFormatDate(defaultTo),
    });
    const [hoverDate, setHoverDate] = React.useState<HoverDateType>({
      start: '',
      end: '',
    });

    const inputDateRef = useRef<HTMLInputElement>(null);
    const inputStartRef = useRef<HTMLInputElement>(null);
    const inputEndRef = useRef<HTMLInputElement>(null);

    const handleDateTimeCallback = (
      { date, dateRange }: DateInputType,
      option: OptionType = { isChangeCall: true },
    ) => {
      // 日期（时间）选择器
      if (date && isSingleDatePicker(picker)) {
        setDate(date);
        if (option?.isChangeCall) {
          onChange?.(date, format(date, formatPattern));
        }
        if (option?.isOkCall) {
          onOk?.(date, format(date, formatPattern));
        }
      }
      // 日期（时间）区间选择器
      if ((dateRange?.from || dateRange?.to) && isRangePicker(picker)) {
        const { from, to } = dateRange;
        // 判断开始时间和结束时间，如果开始时间比结束时间大，并且不是自定义控制时间则交换
        if (!props.controlTime && from && to && from.getTime() > to.getTime()) {
          const tmp = lodash.clone(from);
          from.setTime(to.getTime());
          to.setTime(tmp.getTime());
        }
        setDateRange(dateRange);
        setInputRangeValue({
          from: safeFormatDate(from),
          to: safeFormatDate(to),
        });
        if (option?.isChangeCall) {
          onChange?.(
            [from || undefined, to || undefined],
            [from ? format(from, formatPattern) : '', to ? format(to, formatPattern) : ''],
          );
        }
        if (option?.isOkCall) {
          onOk?.(
            [from || undefined, to || undefined],
            [from ? format(from, formatPattern) : '', to ? format(to, formatPattern) : ''],
          );
        }
      }
    };

    useEffect(() => {
      if (value !== undefined) {
        const [from, to] = formatDate(formatPattern, value);
        if (isRangePicker(picker)) {
          setDateRange({
            from,
            to,
          });
          return;
        }
        setDate(from);
      }
    }, [value, picker, formatPattern]);

    useEffect(() => {
      if (!open) {
        // 日期时间面板关闭，还原输入控制器
        setInputControl(DateType.single);

        // 触发器失去焦点
        inputDateRef.current?.blur();
        inputStartRef.current?.blur();
        inputEndRef.current?.blur();

        // 重置
        inputAutoFocus.current = false;

        setInputDateValue(safeFormatDate(date));
        setInputRangeValue({
          from: safeFormatDate(dateRange?.from),
          to: safeFormatDate(dateRange?.to),
        });
        setHoverDate({ start: '', end: '' });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    const handleClickOk = (option: OptionType) => {
      handleClose({ date, dateRange }, { ...option, isOkCall: true });
    };

    const handleClose = (dateInput: DateInputType, option?: OptionType) => {
      setOpen(false);
      // 回调选择日期时间
      handleDateTimeCallback(dateInput, option);
    };

    const getPlaceholder = (type?: 'from' | 'to') => {
      if (typeof placeholder === 'string') {
        return placeholder;
      }

      if (Array.isArray(placeholder) && placeholder.length === 2) {
        return type === 'from' ? placeholder[0] : placeholder[1];
      }

      return '';
    };

    const setCurrentDate = () => {
      let { from, to } = dateRange || {};
      if (from || to) {
        if (from && !to) {
          to = from;
        } else if (!from && to) {
          from = to;
        }
        setDateRange({ from, to });
        return;
      }
      const currentDate = new Date();
      currentDate.setHours(0);
      currentDate.setMinutes(0);
      setDateRange({
        from: currentDate,
        to: currentDate,
      });
    };

    const handleClickInput = (e: React.MouseEvent<HTMLInputElement>) => {
      const { id } = e.currentTarget;
      stopEventBubble(e);
      setOpen(true);
      if (isRangePicker(picker)) {
        setInputControl(
          id === (PickerInput.formRangeInput as string) ? DateType.start : DateType.end,
        );
      }
      setTimeout(() => {
        const target = e.target as HTMLInputElement;
        target.focus();
      }, 100);
    };

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      // 监听键盘输入，自动打开日期选择面板
      handleCalendarListener();

      // 键盘正在输入
      if (!inputIng) {
        setInputIng(true);
      }

      // 监听输入日期是否合法
      const { value } = e.currentTarget;
      const [isValidDate, inputDate] = validateInput(value, picker);

      // 单日期选择器
      if (isSingleDatePicker(picker)) {
        setInputDateValue(value);
        if (isValidDate) {
          setDate(inputDate);
        }
      } else if (isRangePicker(picker)) {
        // 区间日期选择器
        const isStartInput = inputControl === DateType.start;
        const field = isStartInput ? 'from' : 'to';
        // 设置缓存的区间日期值
        setInputRangeValue({ ...inputRangeValue, [field]: value });

        const isDateOrderCorrect = isStartInput
          ? !dateRange?.to || isBefore(inputDate, dateRange.to)
          : !dateRange?.from || isBefore(dateRange.from, inputDate);
        if (isValidDate && (isTimeRangePicker || isDateOrderCorrect)) {
          setDateRange({ ...(dateRange as DateRange), [field]: inputDate });
        }
      }
    };

    /**
     * desc: 监听输入框内容是否发生改变，如果值改变，日期面板需要保证展开状态
     * @returns
     */
    const handleCalendarListener = () => {
      if (open) {
        return;
      }
      setOpen(true);
      // 获取当前输入框的引用对象，日期选择面板打开时需要聚集
      let currentInputRef = inputDateRef.current;
      if (isRangePicker(picker)) {
        if (inputControl === DateType.start) {
          currentInputRef = inputStartRef.current;
        } else {
          currentInputRef = inputEndRef.current;
        }
      }
      setTimeout(() => {
        currentInputRef?.focus();
      }, 100);
    };

    const handleInputKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
      // 如果不是回车，则不继续向下处理
      if (e.key !== 'Enter') {
        return;
      }

      // 单日期选择器
      if (isSingleDatePicker(picker)) {
        // 判断输入值是否合法
        const [isValidDate] = validateInput(inputDateValue, picker);
        // 日期不合法
        if (!isValidDate) {
          // 重置回之前的正确日期
          if (date) {
            setInputDateValue(safeFormatDate(date));
          } else {
            handleClearTime(undefined, false);
          }
        } else {
          // 日期合法，直接赋值，关闭弹出面板
          handleClose({ date, dateRange }, { isChangeCall: false });
        }
      } else if (isRangePicker(picker)) {
        const isStartInput = inputControl === DateType.start;
        const field = isStartInput ? 'from' : 'to';

        const currentInputDate = dateRange?.[field];
        const otherInputDate = dateRange?.[isStartInput ? 'to' : 'from'];

        // 当前输入框有值，另外一个输入框没有值，光标切换到另外一个输入框
        if (currentInputDate && !otherInputDate) {
          const refToFocus = isStartInput ? inputEndRef.current : inputStartRef.current;
          refToFocus?.focus();
        } else if (currentInputDate && otherInputDate) {
          // 所有输入框都有值，关闭日历面板
          setOpen(false);
        }
      }
    };

    const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      const control =
        e.currentTarget?.id === (PickerInput.formRangeInput as string)
          ? DateType.start
          : DateType.end;
      if (inputControl !== control) setInputControl(control);
    };

    const handleInputBlur = () => {
      setInputIng(false);
    };

    const handleMockBlurEvent = () => {
      // 如果存在 onBlur 回调，则执行 onBlur 回调
      if (!props?.onBlur) {
        return;
      }
      if (isRangePicker(picker)) {
        props.onBlur(
          [dateRange?.from || undefined, dateRange?.to || undefined],
          [
            dateRange?.from ? format(dateRange?.from, formatPattern) : '',
            dateRange?.to ? format(dateRange?.to, formatPattern) : '',
          ],
        );
      } else {
        props.onBlur(date ?? null, date ? format(date, formatPattern) : '');
      }
    };

    const renderDateInput = (_date?: Date, dateRange?: DateRange) => {
      // 区间选择器
      if (isRangePicker(picker)) {
        const startOverEnd =
          dateRange?.from && dateRange?.to && dateRange.from.getTime() > dateRange.to.getTime();
        const sharedInputProps: React.InputHTMLAttributes<HTMLInputElement> = {
          autoComplete: 'off',
          disabled,
          onClick: handleClickInput,
          onChange: handleInputChange,
          onKeyUp: handleInputKeyUp,
          onFocus: handleInputFocus,
          onBlur: handleInputBlur,
        };
        return (
          <div className={cn('flex w-[calc(100%-25px)]  flex-auto items-center')}>
            <div
              className={cn({
                'flex-1': picker !== Picker.timeRange,
              })}
            >
              <input
                className={cn(InputBaseClassName, 'px-[4px]', {
                  'text-text-4': !!hoverDate?.start,
                  'bg-grey-200': inputControl === DateType.start,
                  'w-[38px]': picker === Picker.timeRange,
                  'flex-1': picker !== Picker.timeRange,
                })}
                id={PickerInput.formRangeInput}
                placeholder={getPlaceholder('from')}
                ref={inputStartRef}
                title={inputRangeValue?.from}
                value={hoverDate?.start || inputRangeValue.from}
                {...sharedInputProps}
              />
            </div>
            <span
              className={cn('text-text-4 h-[22px] w-[24px] px-[5px] text-center leading-[22px]')}
            >
              {' '}
              ～{' '}
            </span>
            <div className="flex w-full flex-1">
              {dateRange?.to && props.wholeHour && startOverEnd ? (
                <span className={cn('mr-[5px]')}>{props.prefixEndHolder || t(' 次日 ')}</span>
              ) : null}
              <input
                className={cn(InputBaseClassName, 'flex-1 pl-[4px]', {
                  'text-text-4': !!hoverDate?.end,
                  'bg-grey-200': inputControl === DateType.end,
                })}
                id={PickerInput.toRangeInput}
                placeholder={getPlaceholder('to')}
                ref={inputEndRef}
                title={inputRangeValue?.to}
                value={hoverDate?.end || inputRangeValue.to}
                {...sharedInputProps}
              />
            </div>
          </div>
        );
      }

      return (
        <input
          autoComplete="off"
          className={cn(InputBaseClassName, {
            'text-text-4': !!hoverDate?.start,
          })}
          disabled={disabled}
          id={`${picker}Input`}
          onChange={handleInputChange}
          onClick={handleClickInput}
          onKeyUp={handleInputKeyUp}
          placeholder={getPlaceholder()}
          ref={inputDateRef}
          title={inputDateValue}
          value={hoverDate?.start || inputDateValue}
        />
      );
    };

    const getInitProps = (): CalenderProps => {
      if (isRangePicker(picker)) {
        return {
          mode: 'range',
          selected: dateRange,
          onSelect: (range, selectDate) => {
            let _selectDate = selectDate;
            if (range && DateRangePickers.includes(picker)) {
              // TODO: 当前日历选择器不支持先选结束时间，后选开始时间，默认从开始时间开始赋值
              const { from, to } = range;

              // 根据触发器的位置手动重置区间的日期时间值
              if (inputControl === DateType.start) {
                range.from = _selectDate;
                range.to = dateRange?.to || range.to;
              } else if (inputControl === DateType.end) {
                range.from = dateRange?.from || range.from;
                range.to = _selectDate;
              }

              // 默认结束日期的时间为：23:59:59
              const wholeRangeFormat = 'yyyy-MM-dd 23:59:59';
              if (wholeRangeTime && to && !dateRange?.to) {
                range.to = new Date(format(to, wholeRangeFormat));
                _selectDate = new Date(format(_selectDate, wholeRangeFormat));
              }

              const exchangeDate = inputControl === DateType.end && from && !to;
              if (exchangeDate) {
                const endDate = from;
                range.from = to;
                range.to = wholeRangeTime ? new Date(format(endDate, wholeRangeFormat)) : endDate;
                setDateRange(range);
                return;
              }

              // 光标在结束时间输入框：选择的时间比开始时间小，开始时间赋值给结束时间，选中的时间赋值给开始时间
              if (inputControl === DateType.end && dateRange?.from) {
                // 同步时分
                _selectDate = updateDateTime(_selectDate, dateRange.to) as Date;
                if (_selectDate.getTime() < dateRange.from.getTime()) {
                  // 日期对调，时间部分保留
                  range.from = getExchangeDate(_selectDate, dateRange.from);
                  range.to = getExchangeDate(dateRange.from, _selectDate);
                  setDateRange(range);
                } else {
                  range.from = updateDateTime(range.from, dateRange?.from);
                  range.to = updateDateTime(range.to, dateRange?.to);
                  setDateRange(range);
                }
              } else if (dateRange?.to) {
                // 默认光标在开始时间输入框：选择的时间比结束时间大，结束时间赋值给开始时间，选中的时间赋值给结束时间
                // 在光标需要自动切换的时候，优先级最高
                if (!inputAutoFocus.current) {
                  setInputControl(DateType.start);
                }
                // 同步时分
                _selectDate = updateDateTime(_selectDate, dateRange.from) as Date;
                if (_selectDate?.getTime() > dateRange.to.getTime()) {
                  // 日期对调，时间部分保留
                  range.from = getExchangeDate(dateRange.to, _selectDate);
                  range.to = getExchangeDate(_selectDate, dateRange.to);
                  setDateRange(range);
                } else {
                  range.from = updateDateTime(range.from, dateRange?.from);
                  range.to = updateDateTime(range.to, dateRange?.to);
                  setDateRange(range);
                }
              }
            }
          },
        };
      }

      return {
        mode: 'single',
        selected: date,
        onSelect: (selectDate) => {
          let _selectDate = selectDate;
          if (!_selectDate) return;
          _selectDate = updateDateTime(selectDate, date);
          setDate(_selectDate);
        },
      };
    };
    useEffect(() => {
      const newInputDateValue = safeFormatDate(date);
      if (newInputDateValue !== inputDateValue) {
        setInputDateValue(newInputDateValue);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date]);

    useEffect(() => {
      const newFrom = safeFormatDate(dateRange?.from);
      const newTo = safeFormatDate(dateRange?.to);

      if (newFrom !== inputRangeValue.from || newTo !== inputRangeValue.to) {
        setInputRangeValue({ from: newFrom, to: newTo });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dateRange]);

    const handleTimeChange = (
      dateType: DateType,
      time: { hour?: number; minute?: number } | string,
      closePicker = false,
    ) => {
      const { hour = '', minute = '' } = typeof time === 'object' ? time : {};
      const settingTime = typeof time === 'string' ? time : '';
      const today = new Date(format(new Date(), 'yyyy-MM-dd 00:00'));
      // 默认是单日期选择器
      let tmpDate: Date | undefined = date || today;
      // 如果是日期（时间）区间选择器，默认是当天
      const tmpDateRange = [...TimeRangePickers, ...DateTimeRangePickers].includes(picker)
        ? {
            from: dateRange?.from ? dateRange?.from : today,
            to: dateRange?.to ? dateRange?.to : today,
          }
        : dateRange;

      // 根据时间选择器类型设置日期
      if (dateType === DateType.start) {
        tmpDate = tmpDateRange?.from;
      } else if (dateType === DateType.end) {
        tmpDate = tmpDateRange?.to;
      }

      // 根据时间设置日期
      if (hour !== '') {
        tmpDate = setHours(tmpDate as Date, hour);
      }
      if (minute !== '') {
        tmpDate = setMinutes(tmpDate as Date, minute);
      }
      if (settingTime) {
        tmpDate = new Date(settingTime);
      }

      // 重置日期
      if (dateType === DateType.single) {
        setDate(tmpDate);
      } else {
        const newDateRange =
          dateType === DateType.start
            ? { from: tmpDate, ...{ to: dateRange?.to ? tmpDateRange?.to : undefined } }
            : { ...{ from: dateRange?.from ? tmpDateRange?.from : undefined }, to: tmpDate };

        setDateRange(newDateRange);

        // 光标自动切换：
        // 1. 如果还有未选择的日期输入框，光标自动切换到另外一个日期时间输入框
        // 2. 如果输入框已经都已经填充了值，日期发生改变的时候需要将光标自动切换到下一个输入框
        const canInputAutoFocus =
          !newDateRange?.from ||
          !newDateRange?.to ||
          (newDateRange?.from && newDateRange?.to && !inputAutoFocus.current);
        if (canInputAutoFocus) {
          // 只允许自动切换一次
          inputAutoFocus.current = true;
          setInputControl(dateType === DateType.start ? DateType.end : DateType.start);
        }
      }

      if (closePicker) {
        handleClose({ date: tmpDate });
      }
    };

    const handleClearTime = (event?: React.MouseEvent, hasCallChangeBack = true) => {
      setDate(undefined);
      setDateRange({ from: undefined, to: undefined });
      setInputIng(false);
      // 清除手动输入的日期
      setInputDateValue('');
      setInputRangeValue({ from: '', to: '' });

      event && stopEventBubble(event);

      // 如果当前日期选择面板是展开状态，需要重置输入框选中状态
      if (open && DateRangePickers.includes(picker)) {
        setInputControl(DateType.start);
      } else {
        setInputControl(DateType.single);
      }

      // 清除输入框内容，回调 onChange
      if (hasCallChangeBack) {
        if (DateRangePickers.includes(picker)) {
          onChange?.([], []);
        } else {
          onChange?.(null, '');
        }
      }
    };

    const hasDateInput = () => {
      if (date || dateRange?.from || dateRange?.to) {
        return true;
      }
      return false;
    };

    const handleOpenChange = (open: boolean, option?: OptionType) => {
      setOpen(open);
      onOpenChange?.(open);
      if (option?.isDateTimeCall) {
        handleDateTimeCallback({ date, dateRange });
      }
      // 如果当前日期选择面板是收起状态，需要模拟失去焦点事件
      if (!open) {
        handleMockBlurEvent();
      }
    };
    const formatTime = (date: Date) => (date ? format(date, 'HH:mm') : '');

    const handleHoverDateChange = (dateType: DateType, val = '') => {
      let formattedTime = '';
      if (val) {
        if (TimePickers.includes(picker) && date) {
          formattedTime = formatTime(date);
        } else if (DateTimeRangePickers.includes(picker)) {
          const relevantDate =
            dateType === DateType.start
              ? dateRange?.from
              : dateType === DateType.end
                ? dateRange?.to
                : null;
          formattedTime = formatTime(relevantDate as Date);
        }
      }

      setHoverDate({ ...hoverDate, [dateType]: val + (formattedTime ? ` ${formattedTime}` : '') });
    };

    // 禁用状态不允许清除操作
    const showClearIcon = allowClear && hasDateInput() && clear && !disabled;

    return (
      <Popover
        align={placement}
        arrow={false}
        className={cn('z-modal min-w-min max-w-max rounded-[2px] bg-white p-0')}
        content={
          <Calendar
            {...getInitProps()}
            initialFocus
            inputControl={inputControl}
            inputIng={inputIng}
            open={disabled ? false : open}
            picker={picker}
            showOutsideDays
            {...props}
            onClose={handleClose}
            onDayMouseChange={handleHoverDateChange}
            onOk={handleClickOk}
            onOpenChange={handleOpenChange}
            onTimeChange={handleTimeChange}
            setCurrentDate={setCurrentDate}
            setInputControl={setInputControl}
          />
        }
        contentClass="overflow-visible"
        onOpenChange={handleOpenChange}
        open={disabled ? false : open}
        ref={ref}
        side="bottom"
        trigger={['click']}
      >
        <div
          className={cn(
            dateTimePickerVariants({
              disabled,
              noValue: !hasDateInput(),
              status,
            }),
            className,
          )}
          data-testid="DateTimePicker-root"
          onMouseEnter={() => setClear(true)}
          onMouseLeave={() => setClear(false)}
          style={{
            width: props.width
              ? `${props.width}px`
              : TriggerPickerWidth[picker] || TriggerPickerWidth.default,
          }}
        >
          {/* 文本输入框 */}
          {renderDateInput(date, dateRange)}
          {/* 按钮 */}
          <div className={cn('flex items-center px-[4px]')}>
            <IconButton clickableAreaInvisible={!showClearIcon} disabled={disabled}>
              {showClearIcon ? (
                <ErrorLine16
                  className={cn('text-text-4 h-2 w-2 cursor-pointer')}
                  onClick={handleClearTime}
                />
              ) : (
                <CalendarLine16
                  className={cn('text-text-4 h-2 w-2 cursor-pointer', {
                    'cursor-not-allowed': disabled,
                  })}
                />
              )}
            </IconButton>
          </div>
        </div>
      </Popover>
    );
  },
);

DateTimePicker.displayName = 'DateTimePicker';

export default DateTimePicker;
