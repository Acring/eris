import React, { useMemo } from 'react';
import { RightLine16 as ChevronRight } from '@xsky/eris-icons';

import { cn } from '@/lib/utils';

import { Tooltip } from '../Tooltip';
import { Checkbox } from '../Checkbox';
import type { CascaderItemProps, valueType } from './type';

const CascaderItem = <T extends valueType>(props: CascaderItemProps<T>) => {
  const {
    disabled,
    label,
    tooltip,
    value,
    description,
    children,
    handleActiveValueCells,
    active,
    searchValue,
    onSelect,
    multiple,
    searchMark: searchOptions,
    hoverOpen,
    selectedValues,
    indeterminateValues,
    expandOnDisabled,
    curValuePath,
    descriptionRender,
    itemLabelRender,
  } = props;
  const isLast = !children?.length;
  const title = typeof label === 'string' ? label : '';

  // 是否被选中
  const isSelected = useMemo(() => {
    return multiple && selectedValues ? selectedValues.includes(value) : active;
  }, [multiple, selectedValues, value, active]);

  // 是否部分选中
  const isIndeterminate = useMemo(() => {
    return indeterminateValues?.includes(value);
  }, [indeterminateValues, value]);

  const triggerOpenPath = () => {
    const isDisabled = disabled && !expandOnDisabled;
    if (isDisabled || searchValue) {
      return;
    }
    handleActiveValueCells(curValuePath || []);
  };

  const triggerSelect = (checked?: boolean) => {
    if (onSelect) {
      onSelect({ ...props, curValuePath }, checked);
      handleActiveValueCells(curValuePath || []);
    }
  };

  const item = (
    <li
      className={cn('text-text-2 relative cursor-pointer list-none py-[6px] pl-[16px]', {
        'pr-[32px]': !isLast,
        'pr-[16px]': isLast,
        'bg-fill-3 text-text-1': active,
        'hover:bg-fill-2 active:bg-fill-3 cursor-pointer': !disabled,
        'text-text-4 cursor-not-allowed': disabled,
      })}
      data-testid="Cascader-item"
      data-value={value}
      onClick={() => {
        triggerOpenPath();
        if (disabled) {
          return;
        }

        if (isLast) {
          triggerSelect(multiple ? !isSelected : undefined);
        }
      }}
      onMouseDown={(e) => {
        e.preventDefault();
      }}
      onMouseEnter={() => {
        hoverOpen && triggerOpenPath();
      }}
      role="menuitem"
      title={title}
    >
      <div>
        <div
          className={cn('flex overflow-hidden text-ellipsis whitespace-nowrap', {
            'max-w-[240px]': !searchOptions,
            'max-w-[720px]': searchOptions,
          })}
        >
          {multiple ? (
            <div className="inline-flex items-center" onClick={(ev) => ev.stopPropagation()}>
              <Checkbox
                checked={isSelected}
                className="mr-[4px]"
                data-value={value}
                disabled={disabled}
                indeterminate={isIndeterminate}
                onChange={(checked) => triggerSelect(checked)}
              />
            </div>
          ) : null}
          {itemLabelRender ? itemLabelRender(props) : label}
        </div>
        {!descriptionRender ? (
          description ? (
            <div className="flex truncate text-text-3 mt-[4px]" title={description}>
              {description}
            </div>
          ) : null
        ) : (
          descriptionRender(props)
        )}
      </div>
      {!isLast ? (
        <div className="text-icon-outlined-displayed absolute right-1 top-[60%] translate-y-[-50%]">
          <ChevronRight className={cn('h-2 w-2')} />
        </div>
      ) : null}
    </li>
  );

  if (tooltip !== undefined) {
    return (
      <Tooltip className="z-tooltip" side="right" title={tooltip}>
        {item}
      </Tooltip>
    );
  }
  return item;
};

CascaderItem.displayName = 'CascaderItem';

export default React.memo(CascaderItem) as <T extends valueType>(
  props: CascaderItemProps<T>,
) => React.ReactElement;
