'use client';
import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { DownLine16 } from '@xsky/eris-icons';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Tooltip } from '../Tooltip';
import { ScrollArea } from '../ScrollArea';
import type { SelectProps, SelectRef } from './type';

const SelectRoot = SelectPrimitive.Root;

const SelectValue = SelectPrimitive.Value;

const selectVariant = cva(
  [
    'flex w-[fit-content] cursor-pointer flex-nowrap items-center justify-between',
    'border-form-border-default-normal text-body text-text-1 rounded border  border-solid bg-form-bg-normal',
    'placeholder:text-text-4',
    'component-ring-primary component-border-primary',
    'aria-expanded:border-form-border-default-hover aria-expanded:shadow-interactive-primary-active focus:outline-none',
    'disabled:bg-form-border-default-disable disabled:text-text-4 disabled:pointer-events-none',
  ],
  {
    variants: {
      error: {
        true: 'border-form-border-danger-hover shadow-interactive-danger-active',
        false: '',
      },
      size: {
        sm: cn('text-caption px-1 py-[2px]'),
        md: cn('px-1 py-[5px]'),
        lg: cn('px-1 py-[10px]'),
      },
      noBorder: {
        true: 'border-transparent hover:border-solid hover:border-form-border-default-normal disabled:bg-transparent',
        false: '',
      },
    },
  },
);
const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
    size?: 'sm' | 'md' | 'lg';
    noBorder?: boolean;
    open: boolean;
    error?: boolean;
  }
>(({ className, children, size = 'md', noBorder, error, ...props }, ref) => (
  <SelectPrimitive.Trigger
    className={cn(
      selectVariant({
        size,
        noBorder,
        error,
      }),
      className,
    )}
    ref={ref}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <DownLine16
        className={cn({
          'transform rotate-180': props.open,
          'transition-transform': true,
        })}
      />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> & {
    dropdownMatchSelectWidth?: boolean;
  }
>(({ className, children, position = 'popper', dropdownMatchSelectWidth, ...props }, ref) => (
  <SelectPrimitive.Portal className="z-dropdown border-stroke-border-2 border border-solid">
    <SelectPrimitive.Content
      className={cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        'text-text-2 shadow-elevation-2-bottom relative z-modal overflow-hidden rounded border bg-white ',
        position === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        className,
      )}
      position={position}
      ref={ref}
      {...props}
    >
      <ScrollArea maxHeight="264px" width="100%">
        <SelectPrimitive.Viewport
          className={cn('box-border py-[4px] ', position === 'popper' && 'w-full ', {
            'w-[var(--radix-select-trigger-width)]': dropdownMatchSelectWidth,
          })}
        >
          {children}
        </SelectPrimitive.Viewport>
      </ScrollArea>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> & {
    size: 'sm' | 'md' | 'lg';
  }
>(({ className, size, children, ...props }, ref) => (
  <SelectPrimitive.Item
    className={cn(
      'relative box-border flex w-full cursor-default select-none flex-nowrap items-center whitespace-nowrap py-[6px] pl-2 pr-1',
      'text-body text-text-2 outline-none',
      'focus:bg-fill-2 focus:text-text-1 hover:cursor-pointer data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      'data-[highlighted]:bg-fill-2 data-[highlighted]:text-text-1',
      'data-[state="checked"]:!bg-fill-3 data-[state="checked"]:!text-text-1',
      { 'text-caption py-[4px]': size === 'sm' },
      className,
    )}
    data-testid="Select-item"
    data-value={props.value}
    ref={ref}
    {...props}
  >
    <SelectPrimitive.ItemText asChild>
      <span className="w-full truncate">{children}</span>
    </SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

/**
 * Owner: 刘圳
 *
 * Figma: https://www.figma.com/file/Do849NlMKTXCv8djOFIFWA/%E9%80%9A%E7%94%A8%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?type=design&node-id=5881-4&mode=design
 *
 * 下拉选择组件
 */
function Select(props: SelectProps, ref: React.ForwardedRef<SelectRef>) {
  const {
    error,
    options = [],
    value,
    defaultValue,
    placeholder,
    disabled,
    onChange,
    size = 'md',
    className,
    tooltip,
    tooltipProps,
    open,
    onOpenChange,
    noBorder,
    style,
    dropdownMatchSelectWidth = true,
    ...rest
  } = props;

  const [innerOpen, setInnerOpen] = React.useState(false);

  const triggerRef = React.useRef<React.ElementRef<typeof SelectPrimitive.Trigger>>(null);

  React.useImperativeHandle(ref, () => ({
    focus: () => {
      triggerRef.current?.click();
      setInnerOpen(true);
      onOpenChange?.(true);
    },
  }));

  const handleChange = React.useCallback(
    (value: string) => {
      const option = options.find((item) => item.value === value);
      if (!option) return;
      onChange?.(value, option, options);
    },
    [onChange, options],
  );

  // 处理 body 禁止点击问题 参考 https://github.com/radix-ui/primitives/issues/2122
  React.useEffect(() => {
    if (open || innerOpen) {
      const timer = setTimeout(() => {
        document.body.style.pointerEvents = '';
      }, 0);
      return () => {
        clearTimeout(timer);
      };
    }
    document.body.style.pointerEvents = 'auto';
  }, [open, innerOpen]);

  const main = React.useMemo(() => {
    return (
      <SelectRoot
        defaultValue={defaultValue}
        disabled={disabled}
        onOpenChange={(open) => {
          setInnerOpen(open);
          onOpenChange?.(open);
        }}
        onValueChange={handleChange}
        open={open ?? innerOpen}
        value={value}
      >
        <SelectTrigger
          className={className}
          data-testid="Select-root"
          error={error}
          noBorder={noBorder}
          open={open ?? innerOpen}
          ref={(e: HTMLButtonElement | null) => {
            if (typeof ref === 'function') {
              ref(e);
            } else if (ref) {
              ref.current = e;
            }
            (triggerRef as React.MutableRefObject<HTMLButtonElement | null>).current = e;
          }}
          size={size}
          style={style}
          {...rest}
        >
          <div className="mr-[4px] overflow-hidden text-ellipsis whitespace-nowrap min-h-[22px]">
            <SelectValue placeholder={<span className="text-text-3">{placeholder}</span>} />
          </div>
        </SelectTrigger>
        <SelectContent dropdownMatchSelectWidth={dropdownMatchSelectWidth}>
          {options.map((item) => (
            <Tooltip key={item.value} title={item.tooltip} {...item.tooltipProps}>
              {item.disabled ? (
                <div>
                  <SelectItem disabled={item.disabled} size={size} value={item.value}>
                    {item.label}
                  </SelectItem>
                </div>
              ) : (
                <SelectItem disabled={item.disabled} size={size} value={item.value}>
                  {item.label}
                </SelectItem>
              )}
            </Tooltip>
          ))}
        </SelectContent>
      </SelectRoot>
    );
  }, [
    defaultValue,
    disabled,
    handleChange,
    open,
    innerOpen,
    value,
    className,
    error,
    noBorder,
    size,
    style,
    rest,
    placeholder,
    dropdownMatchSelectWidth,
    options,
    onOpenChange,
    ref,
  ]);
  if (tooltip !== undefined) {
    return (
      <Tooltip title={tooltip} {...tooltipProps}>
        <div className="w-full">{main}</div>
      </Tooltip>
    );
  }

  return main;
}
const SelectWithForwardRef = React.forwardRef<SelectRef, SelectProps>(Select);

export default SelectWithForwardRef;
