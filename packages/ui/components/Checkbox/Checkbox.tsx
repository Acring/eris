'use client';
import type { MouseEvent, MouseEventHandler, ReactNode } from 'react';
import React, { forwardRef, useState, useContext, useRef, useCallback } from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { cva } from 'class-variance-authority';
import { CheckLine16 } from '@xsky/eris-icons';
import lodash from 'lodash';
import { NoticeLine16 } from '@xsky/eris-icons';
import { cn } from '@/lib/utils';
import { Tooltip } from '../Tooltip';
import { CheckboxGroupContext } from './CheckboxGroupContext';
import type { CheckboxProps } from './type';

const checkboxVariants = cva(
  cn(
    'border-checkbox-border-default-normal absolute box-border block h-[100%] w-[100%] rounded-[1px] border border-solid',
  ),
  {
    variants: {
      checked: {
        true: 'border-transparent',
        false: '',
      },
      disabled: {
        true: '',
        false: '',
      },
      indeterminate: {
        true: 'bg-checkbox-bg-checked-normal group-hover:bg-checkbox-bg-checked-hover border-transparent',
        false: '',
      },
      focus: {
        true: 'border-checkbox-border-default-focus shadow-interactive-primary-focus',
        false: '',
      },
    },
    compoundVariants: [
      {
        checked: false,
        disabled: false,
        indeterminate: false,
        className: cn(
          'border-checkbox-border-default-normal group-hover:border-checkbox-border-default-hover group-hover:bg-checkbox-bg-default-hover',
        ),
      },
      {
        checked: true,
        disabled: false,
        indeterminate: false,
        className: cn('bg-checkbox-bg-checked-normal group-hover:bg-checkbox-bg-checked-hover'),
      },
      {
        checked: false,
        disabled: true,
        className: cn('border-checkbox-border-default-disable bg-checkbox-bg-default-disable'),
      },
      {
        checked: true,
        disabled: true,
        className: cn('border-checkbox-border-checked-disable bg-checkbox-bg-checked-disable'),
      },
      {
        disabled: true,
        indeterminate: true,
        className: cn(
          'border-checkbox-border-checked-disable bg-checkbox-bg-checked-disable group-hover:bg-checkbox-bg-checked-disable',
        ),
      },
    ],
  },
);

const labelVariants = cva('text-text-1', {
  variants: {
    checked: {
      true: 'text-text-1',
    },
    disabled: {
      true: 'text-text-4',
      false: '',
    },
  },
  compoundVariants: [
    {
      checked: true,
      disabled: true,
      className: 'text-text-1',
    },
    {
      checked: false,
      disabled: true,
      className: 'text-text-4',
    },
  ],
});

/**
 * Owner: 许小静
 *
 * Figma: https://www.figma.com/file/Do849NlMKTXCv8djOFIFWA/%E9%80%9A%E7%94%A8%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?type=design&node-id=11723-60137&mode=design
 *
 * 多选框
 */
const Checkbox: React.FC<CheckboxProps> = forwardRef<HTMLButtonElement, CheckboxProps>(
  (props, ref) => {
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [isChecked, setIsChecked] = useState(props.defaultChecked || false);
    const [focus, setFocus] = useState(false);
    const [onMouseDown, setOnMouseDown] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const context = useContext(CheckboxGroupContext);
    const mergeProps = { ...props };
    if (context.group) {
      if (context.value && props.value) {
        mergeProps.checked = context.value.includes(props.value) || props.checked;
      }
      mergeProps.disabled = 'disabled' in props ? props.disabled : context.disabled;
    }
    const { handleChangeValue } = context;
    const {
      className,
      checked,
      children,
      disabled = false,
      name,
      onChange,
      indeterminate = false,
      tooltip,
      extra,
      label,
      value,
      optionInfo,
      onClick,
      ...rest
    } = mergeProps;
    const showFocus = !disabled && focus;
    const isUnControlledChecked = checked === undefined;
    const checkedStatus = isUnControlledChecked ? isChecked : checked;
    const hasChildren = Boolean(children);
    const isFunctionChildren = lodash.isFunction(children);
    const timerRef = useRef<NodeJS.Timeout | undefined>();
    const handleCheckedChange = () => {
      // 这里用当前的status取反，不用 RadixCheckbox.Root 的 onCheckedChange 返回值
      // 如果使用 onCheckedChange 需写成受控，当结合form使用会出现 infinite loop 的问题，官方 bug 暂未解决
      // https://github.com/radix-ui/primitives/issues/2549
      // https://github.com/Neuvernetzung/design-system/issues/1299
      const newChecked = !checkedStatus;
      if (isUnControlledChecked) {
        setIsChecked(newChecked);
      }

      if (onChange) {
        onChange(newChecked);
      }
    };

    const onLabelClick: MouseEventHandler<HTMLLabelElement> = React.useCallback(
      (e) => {
        if (!disabled) {
          handleChangeValue?.(value || '');
        }
        if (isFunctionChildren) {
          // 避免 children 中含有表单元素造成 label 无法触发 input 的 onchange 的情况
          e.preventDefault();
          inputRef.current && inputRef.current.click();
        }
      },
      [isFunctionChildren, value, handleChangeValue, disabled],
    );

    const handleTooltipEnter = useCallback(() => {
      if (tooltip) {
        setTooltipVisible(true);
      }
    }, [tooltip]);

    const handleTooltipLeave = useCallback(() => {
      if (tooltip) {
        setTooltipVisible(false);
      }
    }, [tooltip]);

    const setFocusFalse = useCallback(() => setFocus(false), []);

    const checkboxIcon = (
      <>
        {indeterminate ? (
          <div className="animate-scaleAndFadeWithTranslateCenter absolute left-1/2 top-1/2 h-[1px] w-[8px] origin-center -translate-x-1/2 -translate-y-1/2 bg-white" />
        ) : null}
        {checkedStatus && !indeterminate ? (
          <div>
            <CheckLine16 className="animate-scaleAndFadeWithTranslateCenter absolute left-1/2 top-1/2 h-[12px] w-[12px] origin-center -translate-x-1/2 -translate-y-1/2 text-white" />
          </div>
        ) : null}
      </>
    );
    const input = (
      <input
        checked={checkedStatus}
        onBlur={() => {
          // 点击 checkbox 框时会忽略触发的 blur
          if (!onMouseDown) {
            setFocus(false);
          }
        }}
        onChange={() => {}}
        onClick={(e) => {
          e.stopPropagation();
          timerRef.current && clearTimeout(timerRef.current);
          if (focus) {
            // click 后只需激活一次动画
            timerRef.current = setTimeout(setFocusFalse, 300);
          }
        }}
        onFocus={() => {
          setFocus(true);
        }}
        type="checkbox"
      />
    );
    const checkBox = (
      <span className="inline-flex items-center justify-center h-[22px] w-[16px] min-w-[16px]">
        <span className="relative inline-block h-[12px] w-[12px] [&>input[type='checkbox']]:absolute [&>input[type='checkbox']]:top-0 [&>input[type='checkbox']]:left-0 [&>input[type='checkbox']]:m-0 [&>input[type='checkbox']]:opacity-0">
          <CheckboxPrimitive.Root
            aria-checked={checkedStatus}
            asChild
            data-state={checkedStatus ? 'checked' : 'unchecked'}
            disabled={disabled}
            name={name}
            onCheckedChange={handleCheckedChange}
            ref={ref}
          >
            {input}
          </CheckboxPrimitive.Root>
          <span
            className={cn(
              checkboxVariants({
                checked: checkedStatus,
                disabled,
                indeterminate,
                focus: showFocus,
              }),
            )}
            data-testid="Checkbox-check"
          >
            {checkboxIcon}
          </span>
        </span>
      </span>
    );

    const genDefaultLabelChildren = (label: ReactNode) => {
      return (
        <>
          {tooltip ? (
            <Tooltip open={tooltipVisible} title={tooltip}>
              {checkBox}
            </Tooltip>
          ) : (
            checkBox
          )}
          {typeof label === 'string' ? (
            <span className="flex-1 pl-[4px]" data-testid="Checkbox-label">
              {label}
            </span>
          ) : (
            label
          )}
        </>
      );
    };

    const genCustomLabelChildren = () => {
      return (
        <>
          {isFunctionChildren
            ? children({ checked: checkedStatus })
            : genDefaultLabelChildren(children)}
        </>
      );
    };
    const handleClick = useCallback(
      (e: MouseEvent<HTMLDivElement>) => {
        if (!disabled) {
          onClick?.(e);
        }
      },
      [disabled, onClick],
    );

    return (
      <div
        className={cn('text-body inline-flex flex-col leading-[22px] align-top', className)}
        data-testid="Checkbox-root"
        onClick={handleClick}
        {...rest}
      >
        <div className="inline-flex items-center">
          <label
            className={cn(
              'relative inline-flex items-start overflow-hidden',
              {
                'cursor-pointer': !disabled,
                'cursor-not-allowed': disabled,
              },
              'group',
              labelVariants({ checked: checkedStatus, disabled }),
            )}
            onClick={onLabelClick}
            onMouseDown={() => {
              setFocus(true);
              setOnMouseDown(true);
            }}
            onMouseEnter={handleTooltipEnter}
            onMouseLeave={handleTooltipLeave}
            onMouseUp={() => {
              setOnMouseDown(false);
            }}
          >
            {hasChildren ? genCustomLabelChildren() : genDefaultLabelChildren(label)}
          </label>
          {!!optionInfo && (
            <Tooltip title={optionInfo}>
              <NoticeLine16 className="text-icon-outlined-displayed ml-[4px]" />
            </Tooltip>
          )}
        </div>
        {extra ? (
          <div className="text-text-3 mb-[8px] ml-[12px] mt-[4px] px-[4px]">{extra}</div>
        ) : null}
      </div>
    );
  },
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
