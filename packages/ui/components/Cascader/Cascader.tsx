'use client';

import type { ForwardedRef } from 'react';
import React, { forwardRef, useMemo, useState, useRef, useEffect, useCallback } from 'react';
import { Command as CommandPrimitive } from '@acring/cmdk';
import { DownLine16, ErrorLine16 } from '@xsky/eris-icons';

import { Spinner } from '@/components/Spinner';
import { cn } from '@/lib/utils';
import { Command } from '../Command';

import t from '../../i18n';
import { ScrollArea } from '../ScrollArea';
import { IconButton } from '../IconButton';

import { Tag } from '../Tag';
import { useClickOutside, useInputWidth } from '../Combobox/hooks';
import CommandEmpty from '../Combobox/CommandEmpty';
import FloatingContent from '../FloatingContent';
import { Tooltip } from '../Tooltip';

import CascaderItem from './CascaderItem';
import {
  defaultFilter,
  toPathOptions,
  defaultDisplayRender,
  getAllSelectedKeysByCheck,
  getOptionFromSelectedKeys,
  getPathString,
  useCascaderState,
  useSearchOptions,
  useOptionColumns,
  getSelectedKeysFromValue,
  getValueFromSelectedKeys,
} from './lib';
import type { CascaderProps, valueType, CascaderOptionProps, CascaderRef } from './type';
import { cascaderVariant } from './styles';
/**
 * Owner: 樊梦文
 *
 * Figma: https://www.figma.com/file/Do849NlMKTXCv8djOFIFWA/%E9%80%9A%E7%94%A8%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?type=design&node-id=19220-119015&mode=design
 *
 * 级联选择器组件，用于选择多个选项。
 */
const Cascader = <T extends valueType = valueType, _Multiple extends boolean = boolean>(
  {
    className,
    trigger = 'hover',
    disabled,
    tooltip,
    onChange,
    value,
    defaultValue = [],
    loading,
    open: controlledOpen,
    onOpenChange,
    onBlur,
    placeholder,
    allowClear = true,
    options = [],
    emptyContent,
    displayRender,
    descriptionRender,
    itemLabelRender,
    filterOption = defaultFilter,
    error = false,
    multiple = false,
    commandProps,
    portalContainer,
    width,
    maxHeight = undefined,
    inputProps,
    expandOnDisabled = false, // 禁用状态下是否展开
    popoverProps,
    searchSorter,
    ...props
  }: CascaderProps<T>,
  ref: ForwardedRef<CascaderRef<T>>,
) => {
  // DOM引用
  const dropdownRef = useRef<HTMLDivElement>(null); // 下拉菜单引用
  const cascaderRef = useRef<HTMLDivElement>(null); // 级联选择器根元素引用
  const triggerRef = useRef<HTMLDivElement>(null); // 触发器引用
  const inputRef = useRef<HTMLInputElement>(null); // 输入框引用

  // UI 状态管理
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null); // 用于定位的参考元素
  const [onScrollbar, setOnScrollbar] = useState(false); // 鼠标是否在滚动条上
  const [internalOpen, setInternalOpen] = useState(false); // 内部打开状态
  const [searchValue, setSearchValue] = useState<string | undefined>(); // 搜索关键词
  const [activeValueCells, setActiveValueCells] = useState<T[]>([]); // 当前活跃的节点

  // 自定义 hooks 用于状态管理
  const {
    key2OptionMap,
    innerSelectedKeys, // 当前选中的值
    setInnerSelectedKeys,
    innerIndeterminateKeys, // 半选的值
    setInnerIndeterminateKeys,
    selectedOptions, // 选中的选项
    setSelectedOptions,
    finalValues, // 最终选中的值
  } = useCascaderState<T>(options, defaultValue, value, multiple);

  // 搜索选项
  const searchOptions = useSearchOptions<T>(searchValue, options, filterOption);

  // 计算派生状态
  const finalOpen = useMemo(
    () => (controlledOpen === undefined ? internalOpen : controlledOpen),
    [controlledOpen, internalOpen],
  );

  const hasTextInput = useMemo(
    () => (!finalOpen ? false : !!searchValue && searchValue !== ''),
    [finalOpen, searchValue],
  );

  const hoverOpen = useMemo(() => trigger === 'hover', [trigger]);

  // 根据搜索状态合并选项
  const mergedOptions = useMemo(
    () => (searchValue ? (searchSorter?.(searchOptions) ?? searchOptions) : options),
    [searchValue, searchOptions, options, searchSorter],
  );

  const isEmpty = useMemo(() => !mergedOptions?.length, [mergedOptions]);

  // 获取选项列
  const optionColumns = useOptionColumns<T>(activeValueCells, mergedOptions);

  // 输入框宽度
  useInputWidth(inputRef, searchValue || '');
  useClickOutside(dropdownRef, triggerRef, finalOpen, () => {
    setSearchValue('');
    handleOpenChange(false);
  });

  React.useImperativeHandle(
    ref,
    () => ({
      focus: () => inputRef?.current?.focus(),
      reset: () => setSelectedOptions([]),
      selectedOptions: [...selectedOptions],
      input: inputRef.current as HTMLInputElement,
    }),
    [selectedOptions, setSelectedOptions],
  );
  // 打开状态变化
  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (controlledOpen === undefined) {
        setInternalOpen(open);
      }
      onOpenChange?.(open);
    },
    [controlledOpen, onOpenChange],
  );

  // 单选选择处理
  //eg option: {value: '1', label: '1', curValuePath: ['0-1']}
  const handleSingleSelect = useCallback(
    (option: CascaderOptionProps<T>) => {
      const optionPath = toPathOptions(option?.curValuePath || [], options);

      if (value === undefined) {
        setInnerSelectedKeys(option?.curValuePath || []);
        setSelectedOptions([optionPath]);
      }

      handleOpenChange(false);

      if (onChange) {
        onChange(option?.curValuePath || [], optionPath);
      }
    },
    [options, value, handleOpenChange, onChange, setInnerSelectedKeys, setSelectedOptions],
  );

  // 多选选择处理
  // eg option: {value: '0', label: '0'}
  const handleMultipleSelect = useCallback(
    (option: CascaderOptionProps<T>, checked?: boolean) => {
      const affectedKeys = option.value;
      const changeSelectKeys = checked
        ? [...(innerSelectedKeys || []), affectedKeys]
        : innerSelectedKeys.filter((key) => key !== affectedKeys);

      // 计算选中值和半选值
      const { selectedKeys, indeterminateKeys } = getAllSelectedKeysByCheck<T>(
        checked ?? true,
        option,
        key2OptionMap,
        changeSelectKeys,
        innerIndeterminateKeys,
      );

      // 计算并更新值和选项
      const options = getOptionFromSelectedKeys<T>(selectedKeys, key2OptionMap);
      const newValues = getValueFromSelectedKeys(selectedKeys, key2OptionMap);

      if (value === undefined) {
        setInnerSelectedKeys(selectedKeys);
        setInnerIndeterminateKeys(indeterminateKeys);
        setSelectedOptions(options);
      }

      searchValue && setSearchValue('');

      onChange?.(newValues, options);
    },
    [
      innerSelectedKeys,
      key2OptionMap,
      innerIndeterminateKeys,
      value,
      searchValue,
      onChange,
      setInnerSelectedKeys,
      setInnerIndeterminateKeys,
      setSelectedOptions,
    ],
  );

  const handleSelect = useCallback(
    (valuePath: CascaderOptionProps<T>, checked?: boolean) => {
      if (multiple) {
        handleMultipleSelect(valuePath, checked);
      } else {
        handleSingleSelect(valuePath);
      }
    },
    [multiple, handleSingleSelect, handleMultipleSelect],
  );

  // 输入框失去焦点
  const handleInputBlur = useCallback(
    (e: React.FocusEvent<HTMLDivElement>) => {
      if (
        !onScrollbar &&
        !dropdownRef.current?.contains(e.target as Node) &&
        !triggerRef.current?.contains(e.target as Node)
      ) {
        onBlur?.(e);
      }
    },
    [onBlur, onScrollbar],
  );

  const handleInputFocus = useCallback(() => {
    handleOpenChange(true);
  }, [handleOpenChange]);

  // 输入框值变化
  const handleInputChange = useCallback(
    (v: string) => {
      setSearchValue(v);
      if (!internalOpen) {
        handleOpenChange(true);
      }
    },
    [handleOpenChange, internalOpen],
  );

  // 清除选中值
  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      setSearchValue('');
      setActiveValueCells([]);
      if (value === undefined) {
        setInnerSelectedKeys([]);
        setInnerIndeterminateKeys([]);
        setSelectedOptions([]);
      }

      e.stopPropagation();
      e.preventDefault();

      handleOpenChange(false);

      if (onChange) {
        onChange([], []);
      }
    },
    [
      handleOpenChange,
      onChange,
      value,
      setInnerIndeterminateKeys,
      setInnerSelectedKeys,
      setSelectedOptions,
    ],
  );

  useEffect(() => {
    if (cascaderRef.current && cascaderRef.current !== referenceElement) {
      setReferenceElement(cascaderRef.current);
    }
  }, [referenceElement]);

  // 处理受控的 value 属性
  React.useEffect(() => {
    if (value && multiple) {
      // 如果提供了受控的 value，则根据 value 计算出对应的 selectedKeys
      const selectedKeysFromValue = getSelectedKeysFromValue(value, key2OptionMap, multiple);
      const selectedOptions = getOptionFromSelectedKeys<T>(
        selectedKeysFromValue.selectedValues,
        key2OptionMap,
      );
      setSelectedOptions(selectedOptions);
      setInnerSelectedKeys(selectedKeysFromValue.selectedValues);
      setInnerIndeterminateKeys(selectedKeysFromValue.indeterminateValues);
    } else if (value) {
      const optionPath = toPathOptions(value, options);

      setSelectedOptions([optionPath]);
      setInnerSelectedKeys(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const getLastSelectableOption = useCallback((opts: CascaderOptionProps<T>[]) => {
    const noChildrenOption = opts.filter((opt) => !opt.children?.length)[0];
    if (noChildrenOption) return noChildrenOption;

    // 如果所有选项都有子选项，则检查是否存在所有子选项都禁用的选项
    const optionWithAllDisabledChildren = opts.find(
      (opt) => opt.children?.length && opt.children.every((child) => child.disabled === true),
    );

    return optionWithAllDisabledChildren || opts[0];
  }, []);

  // 处理打开状态变化时的副作用
  useEffect(() => {
    // 当级联选择器关闭时，清空搜索值
    if (!finalOpen) {
      setSearchValue('');
      return;
    }

    // 当级联选择器打开时，设置活动值路径
    if (finalOpen) {
      if (!multiple) {
        // 单选模式：使用当前选中值作为活动路径
        setActiveValueCells(finalValues || []);
      } else if (multiple && selectedOptions.length) {
        // 多选模式：使用第一组选中选项的值路径
        setActiveValueCells(selectedOptions[0].map((option) => option.value) || []);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finalOpen]);

  const displaySelectValueMultiple = useMemo(() => {
    if (!finalValues.length || !innerSelectedKeys.length || !selectedOptions.length) {
      return '';
    }
    if (displayRender) {
      const pathStringsList = selectedOptions.map(getPathString) as T[];
      const onRemove = (value: CascaderOptionProps<T>) => {
        handleMultipleSelect(value, false);
      };
      return displayRender(pathStringsList, selectedOptions, onRemove);
    }

    // 默认渲染为标签
    return selectedOptions.map((options, index) => {
      const pathString = getPathString(options);
      const lastOption = getLastSelectableOption(options);

      const handleClose = (e?: React.MouseEvent<HTMLSpanElement> | null) => {
        e?.stopPropagation();
        e?.preventDefault();
        handleMultipleSelect(lastOption, false);
      };

      return (
        <Tag
          className="py-[1px]"
          key={`${pathString}-${index}`}
          onClose={allowClear ? handleClose : undefined}
          showClose={allowClear}
          size="md"
        >
          {pathString}
        </Tag>
      );
    });
  }, [
    finalValues.length,
    innerSelectedKeys.length,
    selectedOptions,
    displayRender,
    handleMultipleSelect,
    getLastSelectableOption,
    allowClear,
  ]);

  // 渲染选中值
  const displaySelectValue = useMemo(() => {
    if (!finalValues.length || !innerSelectedKeys.length || !selectedOptions.length || multiple) {
      return '';
    }

    // 单选模式
    const firstOption = selectedOptions?.[0];

    const labels = firstOption.map(({ label, value }) => label ?? value);

    const displayValue = displayRender
      ? displayRender(labels, firstOption)
      : defaultDisplayRender(labels);

    return (
      <span
        className={cn('flex-1 truncate', {
          'text-text-1': !finalOpen,
          'text-text-4': finalOpen || disabled,
        })}
        data-value={displayValue}
      >
        {displayValue}
      </span>
    );
  }, [
    finalValues.length,
    innerSelectedKeys.length,
    selectedOptions,
    multiple,
    displayRender,
    finalOpen,
    disabled,
  ]);

  // 单独的列表项渲染函数
  const renderColumnItems = useCallback(
    (options: CascaderOptionProps<T>[], columnIndex: number) => {
      return options.map((option) => {
        const isActive = activeValueCells[columnIndex] === option.value;
        const prevValuePath = activeValueCells.slice(0, columnIndex);

        // 当前的值路径
        const curValuePath = option.searchMark
          ? option.searchMark.map((opt) => opt.value)
          : [...(prevValuePath || []), option.value];

        if (option?.itemRender) {
          return option.itemRender(option);
        }

        return (
          <CascaderItem<T>
            active={isActive}
            curValuePath={curValuePath}
            descriptionRender={descriptionRender}
            expandOnDisabled={expandOnDisabled}
            handleActiveValueCells={setActiveValueCells}
            hoverOpen={hoverOpen}
            indeterminateValues={innerIndeterminateKeys}
            itemLabelRender={itemLabelRender}
            key={`column-${columnIndex}-${option.value}`}
            multiple={multiple}
            onSelect={handleSelect}
            selectedValues={innerSelectedKeys}
            {...option}
          />
        );
      });
    },
    [
      activeValueCells,
      descriptionRender,
      itemLabelRender,
      expandOnDisabled,
      hoverOpen,
      innerIndeterminateKeys,
      multiple,
      handleSelect,
      innerSelectedKeys,
    ],
  );

  // 渲染列表
  const renderColumn = useCallback(
    (options: CascaderOptionProps<T>[], columnIndex: number) => {
      const isLastColumn = columnIndex === optionColumns.length - 1;

      return (
        <div
          className={cn('py-[4px]', {
            'border-stroke-border-2 border-b-0 border-l-0 border-r border-t-0 border-solid':
              !isLastColumn,
          })}
          data-index={columnIndex}
          data-testid="Cascader-column"
          key={`column-${columnIndex}`}
        >
          <ScrollArea maxHeight="264px" width="100%">
            <ul className="m-0 p-0" role="menu">
              {renderColumnItems(options, columnIndex)}
            </ul>
          </ScrollArea>
        </div>
      );
    },
    [optionColumns.length, renderColumnItems],
  );

  const EmptyItem = useCallback(() => {
    return <CommandEmpty className="w-[200px]">{emptyContent}</CommandEmpty>;
  }, [emptyContent]);

  const renderDropdownContent = useCallback(() => {
    if (loading) {
      return (
        <div className="flex w-full items-center text-center min-w-[200px] min-h-[160px]">
          <div className="h-fit w-full text-center">
            <Spinner />
            <div className="text-text-4 mt-[8px]">{t('搜索中')}</div>
          </div>
        </div>
      );
    }

    if (isEmpty) {
      return (
        <div className="flex w-full items-center text-center">
          <div className="h-fit w-full text-center">{EmptyItem()}</div>
        </div>
      );
    }

    return optionColumns.map((col, idx) => renderColumn(col.options, idx));
  }, [loading, isEmpty, optionColumns, EmptyItem, renderColumn]);

  const displayActionButtons = useMemo(
    () => (
      <>
        <IconButton
          className={cn('hidden', {
            'group-hover/combobox:flex': allowClear && finalValues.length > 0 && !disabled,
          })}
          data-testid="Cascader-clear"
          disabled={disabled}
          onClick={handleClear}
          onKeyDown={(e) => {
            if (e.key === 'Tab') {
              e.stopPropagation();
            }
          }}
        >
          <ErrorLine16 />
        </IconButton>
        <IconButton
          className={cn('flex', {
            'group-hover/combobox:hidden': allowClear && finalValues.length > 0 && !disabled,
          })}
          disabled={disabled}
          onKeyDown={(e) => {
            if (e.key === 'Tab') {
              e.stopPropagation();
            }
          }}
        >
          <div
            className={cn(
              'flex transition-transform duration-200',
              finalOpen ? 'rotate-180' : 'rotate-0',
            )}
          >
            <DownLine16 />
          </div>
        </IconButton>
      </>
    ),
    [allowClear, finalValues.length, disabled, handleClear, finalOpen],
  );

  const displayInput = useMemo(
    () => (
      <div
        className={cn('flex items-center flex-1', {
          'flex-wrap gap-[4px]': multiple,
          'overflow-hidden': !multiple,
        })}
        onKeyDown={(e) => {
          if (e.key === 'Tab') {
            e.stopPropagation();
          }
        }}
      >
        {multiple ? displaySelectValueMultiple : null}
        <div className="relative flex items-center overflow-hidden h-[24px]">
          <CommandPrimitive.Input
            {...inputProps}
            className={cn(
              'text-body text-text-1 border-none outline-none min-w-[2px] p-0',
              'disabled:bg-transparent',
              inputProps?.className,
            )}
            data-testid="Cascader-input"
            disabled={disabled}
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
            onValueChange={handleInputChange}
            ref={inputRef}
            value={searchValue}
          />
          {!finalValues.length && !searchValue && (
            <span
              className={cn('ml-[-2px] text-text-3 pointer-events-none text-body truncate w-full', {
                'text-text-4': disabled || !hasTextInput,
              })}
            >
              {!hasTextInput ? placeholder : ''}
            </span>
          )}
        </div>
        {/* 单选且没有搜索时显示，多选时不显示 */}
        {!multiple && !searchValue ? displaySelectValue : ''}
      </div>
    ),
    [
      multiple,
      displaySelectValueMultiple,
      inputProps,
      disabled,
      handleInputBlur,
      handleInputFocus,
      handleInputChange,
      searchValue,
      finalValues.length,
      hasTextInput,
      placeholder,
      displaySelectValue,
    ],
  );

  const createInput = useCallback(
    () => (
      <ScrollArea className="!w-full" disabledHorizontal maxHeight={maxHeight} thumbSize="thin">
        <div className="flex items-center gap-[4px] px-1 py-[4px]">
          {displayInput}
          {displayActionButtons}
        </div>
      </ScrollArea>
    ),
    [maxHeight, displayInput, displayActionButtons],
  );

  return (
    <Command
      {...commandProps}
      className={cn(
        'h-[fit-content] overflow-visible bg-transparent w-fit max-w-full ',
        commandProps?.className,
      )}
      onKeyDown={(e) => {
        commandProps?.onKeyDown?.(e);
      }}
      ref={triggerRef}
      shouldFilter={false}
      style={{ width }}
    >
      <div
        aria-disabled={disabled}
        aria-expanded={finalOpen}
        className={cn(
          'relative flex group/combobox',
          cascaderVariant({
            disabled,
            error,
          }),
          className,
        )}
        data-testid="Cascader-root"
        onClick={(e) => {
          if (
            e.target instanceof HTMLElement &&
            (e.target.classList.contains('vertical-thumb') ||
              e.target.classList.contains('horizontal-thumb'))
          ) {
            return;
          }
          if (disabled) return;
          inputRef?.current?.focus();
        }}
        ref={cascaderRef}
        style={{ width, maxHeight }}
        {...props}
      >
        {tooltip ? <Tooltip title={tooltip}>{createInput()}</Tooltip> : createInput()}
      </div>
      <FloatingContent
        inputRef={inputRef}
        open={finalOpen}
        popupMaxWidth={720}
        portalContainer={portalContainer}
        ref={dropdownRef}
        referenceElement={referenceElement}
        setOnScrollbar={setOnScrollbar}
        {...popoverProps}
      >
        <div
          className={cn('flex flex-nowrap ', {
            'items-stretch': !isEmpty && !loading,
          })}
        >
          {renderDropdownContent()}
        </div>
      </FloatingContent>
    </Command>
  );
};

Cascader.displayName = 'Cascader';

export default forwardRef(Cascader) as <
  T extends valueType = valueType,
  Multiple extends boolean = boolean,
>(
  props: CascaderProps<T, Multiple> & { ref?: ForwardedRef<HTMLDivElement> },
) => React.ReactElement;
