'use client';
import type { ReactNode, ForwardedRef, HTMLAttributes, MouseEventHandler, MouseEvent } from 'react';
import React, { useRef, forwardRef, useState, useContext, useCallback, useMemo } from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cva } from 'class-variance-authority';
import lodash from 'lodash';
import { cn } from '../../lib/utils';
import { Tooltip } from '../Tooltip';
import type { RadioOption } from './type';
import { RadioGroupContext } from './RadioGroupContext';
import { InfoLine16 } from '@xsky/eris-icons';

const radioVariants = cva(
  cn(
    'radio-variants pointer-events-auto border-r-1 transition-300 absolute box-border flex h-[12px] w-[12px] items-center justify-center rounded-full border border-solid',
  ),
  {
    variants: {
      checked: {
        true: '',
      },
      disabled: {
        true: '',
      },
    },
    compoundVariants: [
      {
        checked: false,
        disabled: false,
        className:
          'border-radio-border-default-normal group-hover:border-radio-border-default-hover',
      },
      {
        checked: true,
        disabled: false,
        className:
          'border-radio-border-checked-active group-hover:border-radio-border-checked-hover',
      },
      {
        checked: false,
        disabled: true,
        className: 'border-radio-border-default-disable',
      },
      {
        checked: true,
        disabled: true,
        className: 'border-radio-border-checked-disable',
      },
    ],
  },
);

const radioItemVariants = cva(cn('bg-radio-bg-default-normal origin-center rounded-full'), {
  variants: {
    checked: {
      true: 'bg-radio-bg-checked-normal',
    },
    disabled: {
      true: 'bg-radio-bg-default-disable',
    },
  },
  compoundVariants: [
    {
      checked: false,
      disabled: false,
      className: 'h-[6px] w-[6px] opacity-0',
    },
    {
      checked: true,
      disabled: false,
      className: 'h-[6px] w-[6px] group-hover:bg-radio-bg-checked-hover',
    },
    {
      checked: false,
      disabled: true,
      className: 'h-[10px] w-[10px] bg-radio-bg-default-disable',
    },
    {
      checked: true,
      disabled: true,
      className: 'h-[6px] w-[6px] bg-radio-bg-checked-disable',
    },
  ],
});

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

// 其他 pr 中已包含，待合入替换
const uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
interface RadioProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'className' | 'onChange'> {
  checked?: boolean;
  children?: ReactNode | ((value: { checked: boolean }) => ReactNode);
  handleChangeValue?: (value: string) => void;
}

/**
 * Owner: 许小静
 *
 * Figma: https://www.figma.com/file/Do849NlMKTXCv8djOFIFWA/%E9%80%9A%E7%94%A8%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?type=design&node-id=11723-60138&mode=design
 *
 * 单选框
 */
const RadioItem = forwardRef<HTMLInputElement, RadioOption & RadioProps>(
  (props, ref: ForwardedRef<HTMLInputElement>) => {
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    // 确保 uuid 只生成一次
    // 用于 label 和 input 的 for 和 id 绑定，确保点击 label 时只会触发一次点击事件
    const id = useMemo(() => props.id || uuid(), [props.id]);
    const context = useContext(RadioGroupContext);
    const mergeProps = { ...props };
    if (context.group) {
      mergeProps.checked = context.value === props.value || props.checked;
      mergeProps.disabled = Boolean(context.disabled || props.disabled);
    }
    const { handleChangeValue } = context;

    const {
      className,
      label,
      value,
      checked = false,
      disabled = false,
      tooltip,
      extra,
      children,
      optionInfo,
      labelClassName,
      handleChangeValue: handleChangeValueProps,
      onClick,
      ...rest
    } = mergeProps;

    const hasChildren = Boolean(children);
    const isFunctionChildren = lodash.isFunction(children);

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

    const onLabelClick: MouseEventHandler<HTMLLabelElement> = useCallback(
      (e) => {
        if (!disabled) {
          handleChangeValue?.(value);
          handleChangeValueProps?.(value);
        }

        if (isFunctionChildren) {
          // 避免 children 中含有表单元素造成 label 无法触发 input 的 onchange 的情况
          e.preventDefault();
          inputRef.current && inputRef.current.click();
        }
      },
      [isFunctionChildren, handleChangeValue, handleChangeValueProps, value, disabled],
    );
    const input = (
      <input
        checked={checked}
        id={id}
        onChange={(event) => {
          event.persist();
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
        ref={inputRef}
        type="radio"
      />
    );
    const radio = (
      <span className="relative inline-flex items-center h-[22px] w-[12px] min-w-[12px] [&>input[type='radio']]:hidden">
        <RadioGroupPrimitive.Item
          aria-checked={checked}
          asChild
          data-state={checked ? 'checked' : 'unchecked'}
          disabled={disabled}
          value={value}
        >
          {input}
        </RadioGroupPrimitive.Item>
        <div
          className={radioVariants({
            checked,
            disabled,
          })}
        >
          <div
            className={cn(
              radioItemVariants({
                checked,
                disabled,
              }),
            )}
          />
        </div>
      </span>
    );

    const genDefaultLabelChildren = (label: ReactNode) => {
      return (
        <>
          {tooltip ? (
            <Tooltip open={tooltipVisible} title={tooltip}>
              {radio}
            </Tooltip>
          ) : (
            radio
          )}
          <span className="pl-[4px] flex-1">{label}</span>
        </>
      );
    };

    const genCustomLabelChildren = () => {
      return <>{isFunctionChildren ? children({ checked }) : genDefaultLabelChildren(children)}</>;
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
        className={cn(
          'text-body inline-flex flex-col leading-[22px] gap-[4px] align-top',
          className,
        )}
        data-testid="Radio-root"
        data-value={value}
        onClick={handleClick}
        {...rest}
        ref={ref}
      >
        <div className="flex gap-[4px] items-center">
          <label
            className={cn(
              'text-text-1 group relative inline-flex items-center',
              {
                'cursor-pointer': !disabled,
                'cursor-not-allowed': disabled,
                'text-text-4': disabled,
              },
              labelVariants({
                checked,
                disabled,
              }),
              labelClassName,
            )}
            htmlFor={id}
            onClick={onLabelClick}
            onMouseEnter={handleTooltipEnter}
            onMouseLeave={handleTooltipLeave}
          >
            {hasChildren ? genCustomLabelChildren() : genDefaultLabelChildren(label)}
          </label>
          {!!optionInfo && (
            <Tooltip title={optionInfo}>
              <InfoLine16 className="text-icon-outlined-displayed" />
            </Tooltip>
          )}
        </div>
        {extra ? <div className="text-text-3 ml-[16px]">{extra}</div> : null}
      </div>
    );
  },
);

RadioItem.displayName = 'RadioItem';

/**
 * Owner: zhang.huan@xsky.com
 *
 * 单选框
 */
const Radio = forwardRef<
  HTMLInputElement,
  RadioOption & {
    name?: string;
    checked?: boolean;
    defaultChecked?: boolean;
    stopPropagationSelector?: string;
    tooltip?: ReactNode;
    allowUncheck?: boolean;
    children?: React.ReactNode;
    onChange?: (value: string) => void;
  }
>(
  (
    {
      value,
      label,
      checked: controlledChecked,
      defaultChecked,
      disabled = false,
      name,
      tooltip,
      onChange,
      allowUncheck,
      ...rest
    },
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const [checked, setChecked] = useState<boolean>(defaultChecked || false);
    const isUnControlled = controlledChecked === undefined;
    const checkedResult = isUnControlled ? checked : controlledChecked;

    const handleChangeValue = useCallback(() => {
      if (allowUncheck && checkedResult) {
        setChecked(false);
        onChange?.('');
      } else {
        setChecked(true);
        onChange?.(value);
      }
    }, [onChange, allowUncheck, checkedResult, value]);
    return (
      <RadioGroupPrimitive.Root
        className="inline-flex [&>button]:hidden align-top"
        disabled={disabled}
        name={name}
        value={value}
      >
        <RadioItem
          checked={checkedResult}
          disabled={disabled}
          handleChangeValue={handleChangeValue}
          label={label}
          ref={ref}
          tooltip={tooltip}
          value={value}
          {...rest}
        />
      </RadioGroupPrimitive.Root>
    );
  },
);

Radio.displayName = 'Radio';

export { RadioItem };
export default Radio;
