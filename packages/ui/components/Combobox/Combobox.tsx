'use client';

import t from '../../i18n';
import { Command as CommandPrimitive, useCommandState } from '@acring/cmdk';
import * as React from 'react';
import { useEffect } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { Virtuoso } from 'react-virtuoso';

import { Command, CommandGroup, CommandItem, CommandList } from '../Command';
import { cn } from '@/lib/utils';
import { Tag } from '../Tag';
import { CheckLine16, DownLine16, ErrorLine16 } from '@xsky/eris-icons';
import { IconButton } from '../IconButton';

import type { ComboboxOption, GroupOption, ComboboxProps, ComboboxRef } from './type';
import { comboboxVariant, paddingVariant, commandItemVariant } from './style';
import type { ElementRects, Elements } from '@floating-ui/react';
import { autoUpdate, flip, offset, size, useFloating, FloatingPortal } from '@floating-ui/react';
import { ScrollArea } from '../ScrollArea';
import { Spinner } from '../Spinner';
import { useDebounce, useClickOutside, useInputWidth } from './hooks';
import { transToGroupOption, isOptionsExist, findOptionsByValues } from './utils';
import CommandEmpty from './CommandEmpty';
import type { TooltipProps } from '../Tooltip';
import { Tooltip } from '../Tooltip';

const EMPTY_WIDTH = 200;
const EMPTY_HEIGHT = 210;
const POPUP_HEIGHT = 264;
const POPUP_HEIGHT_WITH_DESC = 300;
const POPUP_MAX_WIDTH = 720;
const BOUNDARY_PADDING = 16;

interface FloatingContentProps {
  open: boolean;
  setOnScrollbar: (value: boolean) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  children: React.ReactNode;
  referenceElement: HTMLElement | null;
  popupWidth?: number | string;
  popupMaxWidth?: number | string;
  hasDescription: boolean;
  portalContainer?: HTMLElement | null;
  contentClassName?: string;
}

const FloatingContent = React.forwardRef<HTMLDivElement, FloatingContentProps>(
  (
    {
      open,
      setOnScrollbar,
      children,
      referenceElement,
      popupMaxWidth,
      popupWidth,
      hasDescription,
      portalContainer,
      contentClassName,
    },
    ref,
  ) => {
    const filteredCount = useCommandState((state) => state.filtered.count);
    const search = useCommandState((state) => state.search);

    const stateRef = React.useRef({ filteredCount, search });
    React.useEffect(() => {
      stateRef.current = { filteredCount, search };
    }, [filteredCount, search]);

    const { refs, floatingStyles, update } = useFloating({
      whileElementsMounted: autoUpdate,
      placement: 'bottom-start',
      elements: {
        reference: referenceElement,
      },
      middleware: [
        offset(4),
        flip(),
        size({
          apply: ({
            rects,
            elements,
            availableHeight,
            availableWidth,
          }: {
            rects: ElementRects;
            elements: Elements;
            availableHeight: number;
            availableWidth: number;
          }) => {
            const { filteredCount, search } = stateRef.current;
            let maxWidth;
            let minWidth;

            if (popupMaxWidth !== undefined) {
              maxWidth = typeof popupMaxWidth === 'number' ? popupMaxWidth : POPUP_MAX_WIDTH;
            } else if (filteredCount === 0 && search.length > 0) {
              maxWidth =
                POPUP_MAX_WIDTH > availableWidth - BOUNDARY_PADDING
                  ? availableWidth - BOUNDARY_PADDING
                  : POPUP_MAX_WIDTH;
              minWidth = rects.reference.width > EMPTY_WIDTH ? rects.reference.width : EMPTY_WIDTH;
            } else {
              maxWidth =
                POPUP_MAX_WIDTH > availableWidth - BOUNDARY_PADDING
                  ? availableWidth - BOUNDARY_PADDING
                  : POPUP_MAX_WIDTH;
              minWidth = rects.reference.width;
            }

            let maxHeight = hasDescription ? POPUP_HEIGHT_WITH_DESC : POPUP_HEIGHT;

            if (filteredCount === 0 && search.length > 0) {
              maxHeight = EMPTY_HEIGHT;
            }

            if (availableHeight - BOUNDARY_PADDING < maxHeight) {
              maxHeight = availableHeight - BOUNDARY_PADDING;
            }

            Object.assign(elements.floating.style, {
              width: popupWidth ? popupWidth : 'auto',
              minWidth: typeof minWidth === 'number' ? `${minWidth}px` : minWidth,
              maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
              maxHeight: `${maxHeight}px`,
            });
            const scrollAreaViewport = elements.floating.querySelector(
              '[data-radix-scroll-area-viewport]',
            );
            if (scrollAreaViewport) {
              (scrollAreaViewport as HTMLElement).style.maxHeight = `${maxHeight}px`;
            }
          },
        }),
      ],
    });

    useEffect(() => {
      update();
    }, [filteredCount, search, update]);

    if (!open) return null;

    return (
      <FloatingPortal root={portalContainer}>
        <div
          className={cn(
            'shadow-elevation-2-bottom rounded-sm border border-stroke-border-2 border-solid bg-white box-border',
            'overflow-hidden z-tooltip',
            contentClassName,
          )}
          onMouseEnter={() => {
            setOnScrollbar(true);
          }}
          onMouseLeave={() => {
            setOnScrollbar(false);
          }}
          ref={(el) => {
            refs.setFloating(el);
            if (ref) {
              if (typeof ref === 'function') {
                ref(el);
              } else {
                ref.current = el;
              }
            }
          }}
          style={floatingStyles}
        >
          {children}
        </div>
      </FloatingPortal>
    );
  },
);

FloatingContent.displayName = 'FloatingContent';

const Combobox = React.forwardRef<ComboboxRef, ComboboxProps<boolean>>(
  (
    {
      value,
      onChange,
      placeholder,
      defaultOptions: arrayDefaultOptions,
      error = false,
      outlined = true,
      autoFocus = false,
      options: arrayOptions,
      delay,
      onSearch,
      onSearchSync,
      loadingIndicator,
      emptyIndicator,
      emptyText,
      disabled,
      groupBy,
      className,
      selectFirstItem = true,
      creatable = false,
      triggerSearchOnFocus = false,
      commandProps,
      inputProps,
      disableClearable = false,
      open: controlledOpen,
      onOpenChange,
      multiple = false,
      displayMode = 'tag',
      separator = ',',
      defaultValue,
      descriptionRender,
      labelRender,
      selectedTagRender,
      selectedLabelRender,
      selectedTagClassName,
      popupMaxWidth,
      popupWidth,
      hideSelectedTag = false,
      infiniteScroll = false,
      hasNextPage = false,
      size = 'md',
      isLoadingMore = false,
      onLoadMore = () => {},
      virtual = false,
      onCreate,
      portalContainer,
      onBlur,
      contentClassName,
    }: ComboboxProps<boolean>,
    ref: React.Ref<ComboboxRef>,
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
    const [onScrollbar, setOnScrollbar] = React.useState(false);
    const [isSearching, setIsSearching] = React.useState(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null);
    const comboboxRef = React.useRef<HTMLDivElement>(null);
    const [referenceElement, setReferenceElement] = React.useState<HTMLElement | null>(null);

    const open = controlledOpen ?? uncontrolledOpen;
    const setOpen = React.useCallback(
      (newOpen: boolean) => {
        setUncontrolledOpen(newOpen);
        onOpenChange?.(newOpen);
      },
      [onOpenChange],
    );

    const [selected, setSelected] = React.useState<ComboboxOption[]>(() => {
      if (value !== undefined) {
        return findOptionsByValues(value, arrayDefaultOptions, arrayOptions);
      }
      if (defaultValue !== undefined) {
        return findOptionsByValues(defaultValue, arrayDefaultOptions, arrayOptions);
      }
      return [];
    });

    const [options, setOptions] = React.useState<GroupOption>(
      transToGroupOption(arrayDefaultOptions, groupBy),
    );

    const [inputValue, setInputValue] = React.useState('');
    const debouncedSearchTerm = useDebounce(inputValue, delay || 500);

    const [infiniteRef] = useInfiniteScroll({
      loading: isLoadingMore,
      hasNextPage: hasNextPage && !onSearch && !onSearchSync,
      onLoadMore,
      disabled: !infiniteScroll || !!onSearch || !!onSearchSync,
      rootMargin: '100px 0px 100px 0px',
    });

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

    React.useEffect(() => {
      if (comboboxRef.current && comboboxRef.current !== referenceElement) {
        setReferenceElement(comboboxRef.current);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [comboboxRef.current, referenceElement]);

    useClickOutside(dropdownRef, comboboxRef, open, () => {
      setOpen(false);
      setInputValue('');
    });
    useInputWidth(inputRef, inputValue);

    const handleUnselect = React.useCallback(
      (option: ComboboxOption) => {
        const newOptions = selected.filter((s) => s.value !== option.value);
        setSelected(newOptions);
        onChange?.(multiple ? newOptions.map((s) => s.value) : newOptions[0]?.value, newOptions);
      },
      [onChange, selected, multiple],
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
            const lastSelectOption = selected[selected.length - 1];
            if (!lastSelectOption.fixed) {
              handleUnselect(lastSelectOption);
            }
          }

          if (e.key === 'Escape') {
            input.blur();
          }
        }
      },
      [handleUnselect, selected],
    );

    useEffect(() => {
      // 设置默认选中值
      if (value) {
        const result = findOptionsByValues(value, arrayDefaultOptions, arrayOptions);
        setSelected(result);
      }
    }, [value, arrayOptions, arrayDefaultOptions]);

    useEffect(() => {
      /** If `onSearch` is provided, do not trigger options updated. */
      if (!arrayOptions || onSearch) {
        return;
      }
      const newOption = transToGroupOption(arrayOptions || [], groupBy);
      try {
        if (JSON.stringify(newOption) !== JSON.stringify(options)) {
          setOptions(newOption);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }, [arrayOptions, groupBy, onSearch, options]);

    useEffect(() => {
      /** sync search */

      const doSearchSync = () => {
        const res = onSearchSync?.(debouncedSearchTerm);
        setOptions(transToGroupOption(res || [], groupBy));
      };

      // eslint-disable-next-line @typescript-eslint/require-await
      const exec = async () => {
        if (!onSearchSync || !open) return;

        if (triggerSearchOnFocus) {
          doSearchSync();
        }

        if (debouncedSearchTerm !== undefined) {
          doSearchSync();
        }
      };

      void exec();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearchTerm, groupBy, open, triggerSearchOnFocus]);

    useEffect(() => {
      /** async search */

      const doSearch = async () => {
        setIsSearching(true);
        const res = await onSearch?.(debouncedSearchTerm);
        setOptions(transToGroupOption(res || [], groupBy));
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
    }, [debouncedSearchTerm, groupBy, open, triggerSearchOnFocus]);

    const CreatableItem = () => {
      if (!creatable) return undefined;
      if (
        isOptionsExist(options, [{ value: inputValue, label: inputValue }]) ||
        selected.find((s) => s.value === inputValue)
      ) {
        return undefined;
      }

      const Item = (
        <CommandItem
          className="cursor-pointer"
          data-testid="Combobox-item"
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onSelect={(value: string) => {
            if (!multiple) {
              setInputValue('');
            }
            const newOptions = [...selected, { value, label: value }];
            setSelected(newOptions);
            onChange?.(
              newOptions.map((s) => s.value),
              newOptions,
            );
            setOnScrollbar(false);
            onCreate?.(value);
          }}
          value={inputValue}
        >
          {t('create {{value}}', { value: inputValue })}
        </CommandItem>
      );

      // For normal creatable
      if (!onSearch && inputValue.length > 0) {
        return Item;
      }

      // For async search creatable. avoid showing creatable item before loading at first.
      if (onSearch && debouncedSearchTerm.length > 0 && !isSearching) {
        return Item;
      }

      return undefined;
    };

    const EmptyItem = React.useCallback(() => {
      return <CommandEmpty emptyText={emptyText}>{emptyIndicator}</CommandEmpty>;
    }, [emptyIndicator, emptyText]);

    /** Avoid Creatable Selector freezing or lagging when paste a long string. */
    const commandFilter = React.useCallback(() => {
      if (commandProps?.filter) {
        return commandProps.filter;
      }

      if (creatable) {
        return (value: string, search: string) => {
          return value.toLowerCase().includes(search.toLowerCase()) ? 1 : -1;
        };
      }
      // Using default filter in `cmdk`. We don't have to provide it.
      return (value: string, search: string) => {
        return value.toLowerCase().includes(search.toLowerCase()) ? 1 : -1;
      };
    }, [creatable, commandProps?.filter]);

    React.useEffect(() => {
      if (autoFocus && inputRef.current) {
        inputRef.current.focus();
      }
    }, [autoFocus]);

    const hasDescription = [...(arrayDefaultOptions ?? []), ...(arrayOptions || [])].some(
      (s) => s.description,
    );
    const [scrollAreaRef, setScrollAreaRef] = React.useState<HTMLElement | undefined>();

    const Footer = React.useCallback(() => {
      return <>{infiniteScroll && hasNextPage ? <SentryItem sentryRef={infiniteRef} /> : null}</>;
    }, [infiniteScroll, hasNextPage, infiniteRef]);

    const renderOptions = (options: GroupOption) => {
      if (virtual) {
        const allOptions = Object.entries(options).reduce<ComboboxOption[]>((acc, [_, items]) => {
          return [...acc, ...items];
        }, []);
        if (!selectFirstItem) {
          allOptions.unshift({ value: '-', label: '-', disable: false });
        }

        return (
          <ScrollArea
            disabledHorizontal
            height="100%"
            ref={(el) => setScrollAreaRef(el as HTMLElement)}
            thumbSize="thin"
            width="100%"
          >
            <CommandList
              className="py-[4px]"
              onMouseUp={() => {
                inputRef?.current?.focus();
              }}
            >
              {EmptyItem()}
              {CreatableItem()}
              <Virtuoso
                components={{
                  // Scroller,
                  Footer,
                }}
                customScrollParent={scrollAreaRef}
                itemContent={(index: number) => {
                  if (index === 0 && !selectFirstItem) {
                    return <CommandItem className="hidden" data-testid="Combobox-item" value="-" />;
                  }
                  const option = allOptions[index];
                  const isSelected = selected.some((s) => s.value === option.value);
                  const commandItem = (
                    <CommandItem
                      className={commandItemVariant({
                        disabled: option.disable,
                        selected: isSelected,
                        size,
                      })}
                      data-testid="Combobox-item"
                      disabled={option.disable}
                      key={option.value as string}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={() => {
                        if (!multiple) {
                          setInputValue('');
                        }
                        if (isSelected && multiple) {
                          const newOptions = selected.filter((s) => s.value !== option.value);
                          setSelected(newOptions);
                          onChange?.(
                            multiple ? newOptions.map((s) => s.value) : newOptions[0]?.value,
                            newOptions,
                          );
                        } else {
                          const newOptions = multiple ? [...selected, option] : [option];
                          setSelected(newOptions);
                          onChange?.(
                            multiple ? newOptions.map((s) => s.value) : newOptions[0]?.value,
                            newOptions,
                          );
                          if (!multiple) {
                            setOpen(false);
                          }
                        }
                        setOnScrollbar(false);
                      }}
                      value={option.label}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span
                          className={cn('text-body text-text-1 truncate', {
                            'text-caption': size === 'sm',
                            'text-text-4': disabled,
                          })}
                          title={option.label}
                        >
                          {labelRender ? labelRender(option) : option.label}
                        </span>
                        {isSelected && !option.tag ? (
                          <CheckLine16 className="ml-2 text-icon-outlined-displayed" />
                        ) : option.tag ? (
                          <div className="flex gap-1 ml-2">
                            {Array.isArray(option.tag) ? (
                              option.tag.map((tagText: string, index: number) => (
                                <Tag className="max-w-[160px]" key={index} size="sm">
                                  {tagText}
                                </Tag>
                              ))
                            ) : (
                              <Tag className="max-w-[160px]" size="sm">
                                {option.tag}
                              </Tag>
                            )}
                          </div>
                        ) : null}
                      </div>
                      {option.description || descriptionRender ? (
                        descriptionRender ? (
                          descriptionRender(option)
                        ) : (
                          <div
                            className={cn('text-body text-text-3 truncate w-full', {
                              'text-caption': size === 'sm',
                              'text-text-4': disabled,
                            })}
                            title={option.description}
                          >
                            {option.description}
                          </div>
                        )
                      ) : null}
                    </CommandItem>
                  );

                  return option.tooltip ? (
                    <Tooltip key={option.value as string} side="right" title={option.tooltip}>
                      <div>{commandItem}</div>
                    </Tooltip>
                  ) : (
                    commandItem
                  );
                }}
                overscan={10}
                totalCount={allOptions.length}
              />
            </CommandList>
          </ScrollArea>
        );
      }

      return (
        <ScrollArea disabledHorizontal height="100%" thumbSize="thin" width="100%">
          <CommandList
            className="py-[4px]"
            onMouseUp={() => {
              inputRef?.current?.focus();
            }}
          >
            {EmptyItem()}
            {CreatableItem()}
            {Object.entries(options).map(([key, dropdowns]) => {
              return (
                <CommandGroup className="h-full overflow-auto" heading={key} key={key}>
                  <>
                    {dropdowns.map((option) => {
                      const isSelected = selected.some((s) => s.value === option.value);
                      const commandItem = (
                        <CommandItem
                          className={commandItemVariant({
                            disabled: option.disable,
                            selected: isSelected,
                            size,
                          })}
                          data-testid="Combobox-item"
                          disabled={option.disable}
                          key={option.value as string}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                          onSelect={() => {
                            if (!multiple) {
                              setInputValue('');
                            }
                            if (isSelected && multiple) {
                              const newOptions = selected.filter((s) => s.value !== option.value);
                              setSelected(newOptions);
                              onChange?.(
                                multiple ? newOptions.map((s) => s.value) : newOptions[0]?.value,
                                newOptions,
                              );
                            } else {
                              const newOptions = multiple ? [...selected, option] : [option];
                              setSelected(newOptions);
                              onChange?.(
                                multiple ? newOptions.map((s) => s.value) : newOptions[0]?.value,
                                newOptions,
                              );
                              if (!multiple) {
                                setOpen(false);
                              }
                            }
                            setOnScrollbar(false);
                          }}
                          value={option.label}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span
                              className={cn('text-body text-text-1 truncate', {
                                'text-caption': size === 'sm',
                                'text-text-4': disabled,
                              })}
                              title={option.label}
                            >
                              {labelRender ? labelRender(option) : option.label}
                            </span>
                            {isSelected && !option.tag ? (
                              <CheckLine16 className="ml-2 text-icon-outlined-displayed" />
                            ) : option.tag ? (
                              <div className="flex gap-1 ml-2">
                                {Array.isArray(option.tag) ? (
                                  option.tag.map((tagText: string, index: number) => (
                                    <Tag className="max-w-[160px]" key={index} size="sm">
                                      {tagText}
                                    </Tag>
                                  ))
                                ) : (
                                  <Tag className="max-w-[160px]" size="sm">
                                    {option.tag}
                                  </Tag>
                                )}
                              </div>
                            ) : null}
                          </div>
                          {option.description || descriptionRender ? (
                            descriptionRender ? (
                              descriptionRender(option)
                            ) : (
                              <div
                                className={cn('text-body text-text-3 truncate w-full', {
                                  'text-caption': size === 'sm',
                                  'text-text-4': disabled,
                                })}
                                title={option.description}
                              >
                                {option.description}
                              </div>
                            )
                          ) : null}
                        </CommandItem>
                      );

                      return option.tooltip ? (
                        <Tooltip key={option.value as string} side="right" title={option.tooltip}>
                          <div>{commandItem}</div>
                        </Tooltip>
                      ) : (
                        commandItem
                      );
                    })}
                  </>
                </CommandGroup>
              );
            })}
            {infiniteScroll && hasNextPage ? <SentryItem sentryRef={infiniteRef} /> : null}
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
        data-testid="Combobox-root"
        filter={commandFilter()}
        onKeyDown={(e) => {
          handleKeyDown(e);
          commandProps?.onKeyDown?.(e);
        }}
        shouldFilter={
          commandProps?.shouldFilter !== undefined
            ? commandProps.shouldFilter
            : !onSearch && !virtual
        }
      >
        <div
          aria-disabled={disabled}
          aria-expanded={open}
          className={cn(
            comboboxVariant({
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
          ref={comboboxRef}
        >
          <ScrollArea className="!w-full" disabledHorizontal maxHeight="98px" thumbSize="thin">
            <div className={paddingVariant({ size })}>
              <div
                className={cn('flex gap-[4px] items-center flex-1 ', {
                  'flex-wrap': multiple && displayMode === 'tag',
                  'overflow-hidden': !multiple || displayMode === 'text',
                })}
                onKeyDown={(e) => {
                  if (e.key === 'Tab') {
                    e.stopPropagation();
                  }
                }}
              >
                {multiple ? (
                  displayMode === 'tag' ? (
                    selected.map((option) => {
                      return (
                        <Tag
                          className={cn('max-w-[160px]', {
                            ' pointer-events-none': disabled,
                            selectedTagClassName,
                          })}
                          disabledClose={disabled}
                          key={option.value as string}
                          onClose={multiple ? () => handleUnselect(option) : undefined}
                          size="md"
                        >
                          {selectedTagRender
                            ? selectedTagRender(option)
                            : selectedLabelRender
                              ? selectedLabelRender(option)
                              : option.label}
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
                          title={selected.map((s) => s.label).join(separator)}
                        >
                          {selected.map((s) => s.label).join(separator)}
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
                          !comboboxRef.current?.contains(event.nativeEvent.currentTarget as Node)
                        ) {
                          setOpen(false);
                          setInputValue('');
                          inputProps?.onBlur?.(event);
                          onBlur?.();
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
                          'ml-[-2px] text-text-1 text-body left-0 top-0 truncate w-full flex justify-between items-center',
                          {
                            'text-text-4': disabled,
                          },
                        )}
                        title={selected[0].label}
                      >
                        <span className="flex-1 truncate">
                          {selectedLabelRender
                            ? selectedLabelRender(selected[0])
                            : selected[0].label}
                        </span>
                        {selected[0].tag && !hideSelectedTag ? (
                          <div className="flex gap-1 ml-1">
                            {Array.isArray(selected[0].tag) ? (
                              selected[0].tag.map((tagText, index) => (
                                <Tag key={index} size="sm">
                                  {tagText}
                                </Tag>
                              ))
                            ) : (
                              <Tag size="sm">{selected[0].tag}</Tag>
                            )}
                          </div>
                        ) : null}
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
                        title={selected.length > 0 ? selected[0].label : placeholder}
                      >
                        {selected.length > 0 ? selected[0].label : placeholder}
                      </span>
                    ) : null}
                  </div>
                )}
                {multiple ? (
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
                          !comboboxRef.current?.contains(event.nativeEvent.currentTarget as Node)
                        ) {
                          setOpen(false);
                          setInputValue('');
                          inputProps?.onBlur?.(event);
                          onBlur?.();
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
                  onChange?.(multiple ? [] : null, []);
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
          contentClassName={contentClassName}
          hasDescription={hasDescription}
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

function SentryItem({ sentryRef }: { sentryRef: any }) {
  const search = useCommandState((state) => state.search);

  if (search) return null;

  return (
    <div className="flex items-center justify-center h-[34px]" ref={sentryRef}>
      <Spinner size="sm" tip={t('加载更多')} tipPosition="right" />
    </div>
  );
}

Combobox.displayName = 'Combobox';

const ComboboxWithTooltip = React.forwardRef<
  ComboboxRef,
  ComboboxProps<boolean> &
    Partial<{
      tooltip: string;
      tooltipProps: Omit<TooltipProps, 'title' | 'children'>;
    }>
>((props, ref) => {
  const [open, setOpen] = React.useState(false);
  const [hoverOpen, setHoverOpen] = React.useState(false);

  if (!props.tooltip) return <Combobox {...props} ref={ref} />;
  return (
    <Tooltip
      {...props.tooltipProps}
      onOpenChange={(open) => {
        setHoverOpen(open);
      }}
      open={open || hoverOpen}
      title={props.tooltip}
    >
      <div className="w-full">
        <Combobox {...props} onOpenChange={setOpen} ref={ref} />
      </div>
    </Tooltip>
  );
});

ComboboxWithTooltip.displayName = 'ComboboxWithTooltip';

export default ComboboxWithTooltip;
