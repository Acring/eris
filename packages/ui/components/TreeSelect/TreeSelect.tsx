'use client';

import t from '../../i18n';
import React, { useEffect } from 'react';
import type { TreeSelectOption, TreeSelectProps, TreeSelectRef } from './type';
import { cn } from '@/lib/utils';
import { defaultSearch, findOptionsByValues, getNodeFullPath } from './lib';
import { useClickOutside, useDebounce, useInputWidth } from '../Combobox/hooks';
import CommandEmpty from './CommandEmpty';
import { ScrollArea } from '../ScrollArea';
import { Command, CommandList } from '../Command';
import { Command as CommandPrimitive } from '@acring/cmdk';
import { paddingVariant, treeSelectVariant } from './style';
import { Tag } from '../Tag';
import { IconButton } from '../IconButton';
import { DownLine16, ErrorLine16 } from '@xsky/eris-icons';
import { Spinner } from '../Spinner';
import { Tree } from '../Tree';
import FloatingContent from '../FloatingContent';

export const TreeSelect = React.forwardRef<TreeSelectRef, TreeSelectProps<boolean>>(
  (
    {
      error,
      outlined = true,
      autoFocus,
      value: controlledValue,
      defaultValue,
      selectMode = 'single',
      treeData,
      open: controlledOpen,
      onOpenChange,
      placeholder,
      loadingIndicator,
      emptyIndicator,
      delay,
      triggerSearchOnFocus,
      onSearch = defaultSearch,
      onChange,
      onBlur,
      disabled,
      className,
      disableClearable,
      displayMode = 'tag',
      separator,
      popupWidth,
      popupMaxWidth,
      size = 'md',
      defaultExpandedKeys,
      defaultSelectedKeys,
      defaultExpandAll,
      onExpand,
      checkStrictly,
      autoExpandParent,
      titleRender,
      selectedTagClassName,
      commandProps,
      inputProps,
      showParentPath,
      portalContainer,
    }: TreeSelectProps<boolean>,
    ref: React.Ref<TreeSelectRef>,
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const triggerRef = React.useRef<HTMLDivElement>(null);
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
    const [onScrollbar, setOnScrollbar] = React.useState(false);
    const [isSearching, setIsSearching] = React.useState(false);
    const [referenceElement, setReferenceElement] = React.useState<HTMLElement | null>(null);
    const [innerValue, setInnerValue] = React.useState<string[] | string | undefined>(defaultValue);

    const dropdownRef = React.useRef<HTMLDivElement>(null);
    const treeSelectRef = React.useRef<HTMLDivElement>(null);

    const value = controlledValue ?? innerValue;
    const open = controlledOpen ?? uncontrolledOpen;
    const setOpen = React.useCallback(
      (newOpen: boolean) => {
        setUncontrolledOpen(newOpen);
        onOpenChange?.(newOpen);
      },
      [onOpenChange],
    );

    const [selected, setSelected] = React.useState<TreeSelectOption[]>(() => {
      if (value !== undefined) {
        return findOptionsByValues(value, treeData);
      }
      if (defaultValue !== undefined) {
        return findOptionsByValues(defaultValue, treeData);
      }
      return [];
    });

    const [options, setOptions] = React.useState<TreeSelectOption[]>(treeData ?? []);

    const [inputValue, setInputValue] = React.useState('');
    const debouncedSearchTerm = useDebounce(inputValue, delay || 250);

    React.useImperativeHandle(
      ref,
      () => ({
        selectedValue: [...selected],
        input: inputRef.current as HTMLInputElement,
        focus: () => inputRef?.current?.focus(),
        reset: () => setSelected([]),
      }),
      [selected],
    );

    useClickOutside(dropdownRef, triggerRef, open, () => {
      setOpen(false);
      setInputValue('');
    });
    useInputWidth(inputRef, inputValue);

    const handleUnselect = React.useCallback(
      (option: TreeSelectOption) => {
        const newOptions = selected.filter((s) => s.key !== option.key);
        setSelected(newOptions);

        // 同步树组件选中状态
        const newInnerValue = newOptions.map((s) => s.key);
        setInnerValue(newInnerValue);

        onChange?.(
          selectMode === 'checkbox' || selectMode === 'radio'
            ? newOptions.map((s) => s.key)
            : newOptions[0]?.key,
        );
      },
      [onChange, selected, selectMode],
    );

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        const input = inputRef.current;
        if (input) {
          if (
            (e.key === 'Delete' || e.key === 'Backspace') &&
            input.value === '' &&
            selected.length > 0
          ) {
            handleUnselect(selected[selected.length - 1]);
          }
          // This is not a default behavior of the <input /> field
          if (e.key === 'Escape') {
            input.blur();
          }
        }
      },
      [handleUnselect, selected],
    );

    React.useEffect(() => {
      if (treeSelectRef.current && treeSelectRef.current !== referenceElement) {
        setReferenceElement(treeSelectRef.current);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [treeSelectRef.current, referenceElement]);

    useEffect(() => {
      if (value) {
        const result = findOptionsByValues(value, treeData);
        setSelected(result);
      }
    }, [value, treeData]);

    useEffect(() => {
      try {
        if (JSON.stringify(treeData) !== JSON.stringify(options)) {
          setOptions(treeData ?? []);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onSearch, treeData]);

    useEffect(() => {
      /** async search */

      const doSearch = async () => {
        setIsSearching(true);
        const res = await onSearch?.(debouncedSearchTerm, treeData ?? []);
        setOptions(res || []);
        setIsSearching(false);
      };

      const exec = async () => {
        if (!onSearch || !open) return;

        if (triggerSearchOnFocus) {
          await doSearch();
        }

        if (debouncedSearchTerm !== undefined) {
          await doSearch();
        }
      };

      void exec();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearchTerm, open, triggerSearchOnFocus]);

    const EmptyItem = React.useCallback(() => {
      return <CommandEmpty>{emptyIndicator}</CommandEmpty>;
    }, [emptyIndicator]);

    React.useEffect(() => {
      if (autoFocus && inputRef.current) {
        inputRef.current.focus();
      }
    }, [autoFocus]);

    const renderOptions = (options: TreeSelectOption[]) => {
      return (
        <ScrollArea disabledHorizontal height="100%" thumbSize="thin" width="100%">
          <CommandList
            className="py-[4px]"
            onMouseUp={() => {
              inputRef?.current?.focus();
            }}
          >
            {EmptyItem()}
            <Tree
              autoExpandParent={autoExpandParent}
              checkStrictly={checkStrictly}
              defaultExpandAll={defaultExpandAll ?? !!inputValue}
              defaultExpandedKeys={defaultExpandedKeys}
              defaultSelectedKeys={defaultSelectedKeys}
              defaultValue={defaultValue}
              onChange={(value) => {
                if (!controlledValue) {
                  setInnerValue(value);
                }
                onChange?.(value);
                if (selectMode === 'single') {
                  setOpen(false);
                  setOnScrollbar(false);
                }
              }}
              onExpand={onExpand}
              selectMode={selectMode}
              selectable
              titleRender={(item) => {
                return (
                  <CommandPrimitive.Item>
                    {titleRender ? titleRender(item) : item.title}
                  </CommandPrimitive.Item>
                );
              }}
              treeData={options}
              treeItemClassName={cn('pr-1', {
                'py-[3px]': size === 'sm',
              })}
              value={value}
            />
          </CommandList>
        </ScrollArea>
      );
    };

    return (
      <Command
        {...commandProps}
        className={cn(
          'h-auto overflow-visible bg-transparent w-fit max-w-full',
          commandProps?.className,
        )}
        onKeyDown={(e) => {
          handleKeyDown(e);
          commandProps?.onKeyDown?.(e);
        }}
        ref={triggerRef}
        shouldFilter={false}
      >
        <div
          aria-disabled={disabled}
          aria-expanded={open}
          className={cn(
            treeSelectVariant({
              noBorder: !outlined,
              disabled,
              error,
            }),
            className,
          )}
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
          ref={treeSelectRef}
        >
          <ScrollArea className="!w-full" disabledHorizontal maxHeight="98px" thumbSize="thin">
            <div className={paddingVariant({ size })}>
              <div
                className={cn('flex gap-[4px] items-center flex-1 ', {
                  'flex-wrap':
                    selectMode === 'checkbox' || (selectMode === 'radio' && displayMode === 'tag'),
                  'overflow-hidden': selectMode === 'single' || displayMode === 'text',
                })}
                onKeyDown={(e) => {
                  if (e.key === 'Tab') {
                    e.stopPropagation();
                  }
                }}
              >
                {selectMode === 'checkbox' || selectMode === 'radio' ? (
                  displayMode === 'tag' ? (
                    selected.map((option) => {
                      return (
                        <Tag
                          className={cn('max-w-[160px]', {
                            'pointer-events-none': disabled,
                            selectedTagClassName,
                          })}
                          disabledClose={disabled}
                          key={option.key}
                          onClose={() => handleUnselect(option)}
                          size="md"
                        >
                          {titleRender ? titleRender(option) : option.title}
                        </Tag>
                      );
                    })
                  ) : (
                    <div
                      className={cn('relative flex overflow-hidden', {
                        'text-text-4': disabled,
                      })}
                    >
                      {!inputValue && selected.length > 0 && (
                        <span
                          className={cn('text-body text-text-1 truncate', {
                            'text-text-4': disabled,
                          })}
                        >
                          {selected.map((s) => s.title).join(separator)}
                        </span>
                      )}
                    </div>
                  )
                ) : (
                  <div className="relative flex overflow-hidden flex-1">
                    <CommandPrimitive.Input
                      {...inputProps}
                      className={cn(
                        'text-body text-text-1 border-none outline-none min-w-[2px] p-0',
                        'disabled:bg-transparent',
                        inputProps?.className,
                        !inputValue && selected.length > 0 && !open && 'opacity-0',
                      )}
                      disabled={disabled}
                      onBlur={(event) => {
                        if (
                          !onScrollbar &&
                          !dropdownRef.current?.contains(event.target as Node) &&
                          !triggerRef.current?.contains(event.nativeEvent.currentTarget as Node)
                        ) {
                          setOpen(false);
                          setInputValue('');
                          onBlur?.(event);
                          inputProps?.onBlur?.(event);
                        }
                      }}
                      onFocus={(event) => {
                        setOpen(true);
                        inputProps?.onFocus?.(event);
                      }}
                      onValueChange={(value) => {
                        setInputValue(value);
                        if (!open) {
                          setOpen(true);
                        }
                        inputProps?.onValueChange?.(value);
                      }}
                      ref={inputRef}
                      value={inputValue}
                    />
                    {!inputValue && selected.length > 0 && !open && (
                      <span
                        className={cn(
                          'ml-[-2px] text-text-1 text-body left-0 top-0 truncate w-full flex justify-between',
                          {
                            'text-text-4': disabled,
                          },
                        )}
                      >
                        <span className="flex-1 truncate">
                          {showParentPath &&
                          selectMode === 'single' &&
                          treeData &&
                          treeData.length > 0
                            ? getNodeFullPath(selected[0], treeData)
                            : titleRender
                              ? titleRender(selected[0])
                              : selected[0].title}
                        </span>
                      </span>
                    )}
                    {(!selected.length && !inputValue) || (open && !inputValue) ? (
                      <span
                        className={cn(
                          'ml-[-2px] text-text-3 pointer-events-none text-body w-full truncate',
                          {
                            'text-text-4': disabled,
                          },
                        )}
                      >
                        {selected.length > 0 ? selected[0].title : placeholder}
                      </span>
                    ) : null}
                  </div>
                )}
                {selectMode === 'checkbox' || selectMode === 'radio' ? (
                  <div className="relative flex overflow-hidden">
                    <CommandPrimitive.Input
                      {...inputProps}
                      className={cn(
                        'text-body text-text-1 border-none outline-none min-w-[2px] p-0',
                        'disabled:bg-transparent',
                        inputProps?.className,
                      )}
                      disabled={disabled}
                      onBlur={(event) => {
                        if (
                          !onScrollbar &&
                          !dropdownRef.current?.contains(event.target as Node) &&
                          !triggerRef.current?.contains(event.target as Node)
                        ) {
                          setOpen(false);
                          setInputValue('');
                          inputProps?.onBlur?.(event);
                        }
                      }}
                      onFocus={(event) => {
                        setOpen(true);
                        inputProps?.onFocus?.(event);
                      }}
                      onValueChange={(value) => {
                        setInputValue(value);
                        inputProps?.onValueChange?.(value);
                      }}
                      ref={inputRef}
                      value={inputValue}
                    />
                    {!selected.length && !inputValue && (
                      <span
                        className={cn(
                          'ml-[-2px] text-text-3 pointer-events-none text-body truncate w-full',
                          {
                            'text-text-4': disabled,
                          },
                        )}
                      >
                        {placeholder}
                      </span>
                    )}
                  </div>
                ) : null}
              </div>

              <IconButton
                className={cn('hidden', {
                  'group-hover/combobox:flex':
                    !disableClearable && selected.length > 0 && !disabled,
                })}
                disabled={disabled}
                onClick={() => {
                  setSelected([]);
                  if (!controlledValue) {
                    setInnerValue(
                      selectMode === 'checkbox' || selectMode === 'radio' ? [] : undefined,
                    );
                    onChange?.(
                      selectMode === 'checkbox' || selectMode === 'radio' ? [] : undefined,
                    );
                  }
                }}
                onKeyDown={(e) => {
                  // 阻止 Tab 冒泡，和 Command 组件的 onKeyDown 冲突
                  if (e.key === 'Tab') {
                    e.stopPropagation();
                  }
                }}
              >
                <ErrorLine16 />
              </IconButton>
              <IconButton
                className={cn('flex', {
                  'group-hover/combobox:hidden':
                    !disableClearable && selected.length > 0 && !disabled,
                })}
                disabled={disabled}
                onKeyDown={(e) => {
                  // 阻止 Tab 冒泡，和 Command 组件的 onKeyDown 冲突
                  if (e.key === 'Tab') {
                    e.stopPropagation();
                  }
                }}
              >
                <div
                  className={cn(
                    'flex transition-transform duration-200',
                    open ? 'rotate-180' : 'rotate-0',
                  )}
                >
                  <DownLine16 />
                </div>
              </IconButton>
            </div>
          </ScrollArea>
        </div>
        <FloatingContent
          inputRef={inputRef}
          open={open}
          popupMaxWidth={popupMaxWidth}
          popupWidth={popupWidth}
          portalContainer={portalContainer}
          ref={dropdownRef}
          referenceElement={referenceElement}
          setOnScrollbar={setOnScrollbar}
        >
          {isSearching ? (
            <>
              {loadingIndicator ?? (
                <div className="flex items-center justify-center h-[160px]">
                  <Spinner size="md" tip={t('加载中')} tipPosition="bottom" />
                </div>
              )}
            </>
          ) : (
            <>{renderOptions(options)}</>
          )}
        </FloatingContent>
      </Command>
    );
  },
);

TreeSelect.displayName = 'TreeSelect';

export default TreeSelect;
