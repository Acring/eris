'use client';
import type {
  Cell,
  Column,
  ColumnDef,
  ColumnFiltersState,
  ColumnPinningPosition,
  ColumnSizingState,
  Header,
  Row,
  SortingState,
} from '@tanstack/react-table';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import type { ReactNode } from 'react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { DownLine16, RightLine16 } from '@xsky/eris-icons';
import lodash from 'lodash';
import t from '../../i18n';
import { cn } from '@/lib/utils';
import { Checkbox } from '../Checkbox';
import { Radio } from '../Radio';
import ScrollArea from '../ScrollArea/ScrollArea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './Table';
import type { DataTableProps, TableField } from './type';
import TableSort from './TableSort';
import TableFilter from './TableFilter';
import { Tooltip } from '../Tooltip';
import { Spinner } from '../Spinner';
import type { VirtualItem } from '@tanstack/react-virtual';
import { notUndefined, useVirtualizer } from '@tanstack/react-virtual';
import { getMergeHeaderGroups, getTableColumnOffset } from './lib';
import type { RadioOption } from '../Radio/type';
import { Empty } from '../Empty';
import EmptySvg from '../../assets/empty_md.svg?url';
import type { Virtualizer } from '@tanstack/react-virtual';
import TableMenu from './TableMenu';
import { IconButton } from '../IconButton';
import { ThemedImage } from '../ThemedImage';

const SelectionWidth = 28;
const ExpandWidth = 40;
const SizingSafeArea = 100;
const MenuInitialPos = { x: null, y: null };

export default function DataTable<TData>({
  uniqueKey = 'id',
  fields: propsFields,
  data,
  rowSelection: rowsSelection,
  sorting: externalSortState,
  onSortOrderChange,
  columnFilters: externalColumnFilters,
  defaultColumnFilters,
  onFilterChange,
  onFocusTableRow,
  onColumnSizingChange,
  onClickTableCell,
  showHeader = true,
  enableRowFocus = false,
  scroll,
  columnResizable = false,
  currentFocusedRow,
  loading = false,
  virtualized = false,
  estimateSize = 47,
  onScrollEnd,
  scrollEndThreshold = 10,
  EmptyDescription,
  showEmpty = true,
  contextMenu,
  expandable,
  isSubTable = false,
  customEmpty,
}: DataTableProps<TData>) {
  // 稳定 fields 引用，避免不必要的重新计算
  const fieldsKey = useMemo(
    () =>
      propsFields
        .map((field) => field.key)
        .sort()
        .join('|'),
    [propsFields],
  );
  const fields = useMemo(() => propsFields, [fieldsKey]);

  // 排序状态
  const [sorting, setSorting] = React.useState<SortingState>(() => {
    // 受控模式：优先使用外部传入的排序状态
    if (externalSortState !== undefined) {
      return externalSortState;
    }

    // 非受控模式：使用 defaultSortOrder 初始化
    const defaultField = fields.find((field) => field.defaultSortOrder !== undefined);
    if (defaultField) {
      return [
        {
          id: defaultField.key,
          desc: defaultField.defaultSortOrder === 'desc',
        },
      ];
    }

    return [];
  });

  const tableContainerRef = useRef<HTMLDivElement | null>(null);
  const tableRef = useRef<HTMLTableElement | null>(null);
  const hasTriggerScrollEnd = useRef(false);

  // 监听父级高度变化，用于百分比计算
  const [parentHeight, setParentHeight] = React.useState<number | null>(null);
  const lastParentHeightRef = useRef<number | null>(null);

  // 检查是否需要百分比计算
  const needsPercentageCalculation = React.useMemo(() => {
    return scroll?.y && typeof scroll.y === 'string' && scroll.y.includes('%');
  }, [scroll?.y]);

  // 缓存计算结果，避免频繁重计算
  const cachedMaxHeight = React.useMemo(() => {
    if (!scroll?.y) return undefined;

    if (typeof scroll.y === 'string' && scroll.y.includes('%')) {
      // parentHeight 为 null 或 0 时都返回 undefined
      // null 表示未获取到高度，0 表示父元素暂时没有高度
      // 这两种情况下都不应该限制最大高度，让内容自然展示
      if (parentHeight === null || parentHeight === 0) {
        return undefined;
      }
      const percentage = parseFloat(scroll.y) / 100;
      return `${Math.floor(parentHeight * percentage)}px`;
    }

    return scroll.y;
  }, [scroll?.y, parentHeight]);

  // 先初始化 container，确保宽度正确，避免多次渲染
  const initialed = useMemo(() => {
    return tableContainerRef.current !== null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableContainerRef.current]);

  // 当前聚焦行
  const [focusedRow, setFocusedRow] = React.useState<number | null>(null);

  // 选中状态
  const [selection, setSelection] = React.useState({});

  // 展开行状态
  const [expandedRows, setExpandedRows] = React.useState<Record<string, boolean>>({});

  // 过滤状态 - 支持受控和非受控模式
  const [internalColumnFilters, setInternalColumnFilters] = React.useState<ColumnFiltersState>(
    defaultColumnFilters || [],
  );

  // 支持外部更新过滤状态（仅处理受控模式）
  useEffect(() => {
    if (externalColumnFilters !== undefined) {
      // 受控模式：使用外部传入的值
      setInternalColumnFilters(externalColumnFilters);
    }
  }, [externalColumnFilters]);

  // 支持外部排序状态更新
  useEffect(() => {
    if (externalSortState !== undefined) {
      // 受控模式：使用外部传入的值
      setSorting(externalSortState);
    }
  }, [externalSortState]);

  // 固定列状态
  const columnPinning = React.useMemo(() => {
    const leftField = fields.flatMap((field) => {
      if (field.fixedDir === 'left' && field.children) {
        return [field, ...field.children.filter((child) => child.fixedDir === 'left')];
      }
      return field.fixedDir === 'left' ? [field] : [];
    });

    const rightField = fields.flatMap((field) => {
      if (field.fixedDir === 'right' && field.children) {
        return [field, ...field.children.filter((child) => child.fixedDir === 'right')];
      }
      return field.fixedDir === 'right' ? [field] : [];
    });

    const left = leftField.map((field) => field.key);
    const right = rightField.map((field) => field.key);
    if (left.length) {
      left.unshift('expand');
      left.unshift('selection');
    }
    return {
      left,
      right,
    };
  }, [fields]);

  // 列宽状态
  const [columnSizing, setColumnSizing] = React.useState<ColumnSizingState>(() => {
    const columnSizing: ColumnSizingState = fields.reduce((acc: Record<string, number>, field) => {
      if (!field.width) return acc;
      acc[field.key] = field.width;
      return acc;
    }, {});
    // 处理 selection 列
    return {
      selection: SelectionWidth,
      expand: ExpandWidth,
      ...columnSizing,
    };
  });

  const listRef = useRef<HTMLTableCellElement[]>([]);
  const headerListRef = useRef<HTMLTableCellElement[][]>([]);
  const [refsReady, setRefsReady] = useState(false);
  const refsReadyRef = useRef(false);
  const lastRefsCountRef = useRef({ header: 0, body: 0 });

  const setHeaderListRef = React.useCallback(
    (headerGroupIndex: number, headerIndex: number, el: HTMLTableCellElement | null) => {
      if (showHeader && el) {
        // 清理上一次的记录
        if (headerListRef.current[headerGroupIndex]?.length && headerIndex === 0) {
          headerListRef.current[headerGroupIndex] = [];
        }
        // 确保二维数组存在
        if (!headerListRef.current[headerGroupIndex]) {
          headerListRef.current[headerGroupIndex] = [];
        }
        headerListRef.current[headerGroupIndex][headerIndex] = el;

        // 计算当前有效的 ref 数量
        const currentHeaderRefsCount = headerListRef.current.reduce(
          (count, group) => count + (group?.filter((el) => el?.offsetParent !== null).length || 0),
          0,
        );

        // 只在 ref 数量发生变化且 refsReady 为 false 时才设置状态
        if (!refsReadyRef.current && currentHeaderRefsCount !== lastRefsCountRef.current.header) {
          lastRefsCountRef.current.header = currentHeaderRefsCount;
          refsReadyRef.current = true;
          setRefsReady(true);
        }
      }
    },
    [showHeader],
  );

  const setListRef = React.useCallback((index: number, el: HTMLTableCellElement | null) => {
    if (el) {
      listRef.current[index] = el;

      // 计算当前有效的 ref 数量
      const currentBodyRefsCount = listRef.current.filter((el) => el?.offsetParent !== null).length;

      // 只在 ref 数量发生变化且 refsReady 为 false 时才设置状态
      if (!refsReadyRef.current && currentBodyRefsCount !== lastRefsCountRef.current.body) {
        lastRefsCountRef.current.body = currentBodyRefsCount;
        refsReadyRef.current = true;
        setRefsReady(true);
      }
    }
  }, []);

  const resetListRef = React.useCallback(() => {
    // 重置 refsReady 状态，因为数据变化会导致 ref 重新设置
    refsReadyRef.current = false;
    lastRefsCountRef.current = { header: 0, body: 0 };
    setRefsReady(false);
    // 清理无效的 ref 引用
    listRef.current = listRef.current.filter((el) => el?.offsetParent !== null);

    headerListRef.current = headerListRef.current.map(
      (group) => group?.filter((el) => el?.offsetParent !== null) || [],
    );
  }, []);

  // 当字段发生变化或表格宽度发生变化时, 重置 listRef & headerListRef 数组，
  useEffect(() => {
    resetListRef();
    let rafId: number;
    let lastWidth: number | null = null;
    const ro = new ResizeObserver((entries) => {
      // 取消之前的动画帧
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      // 使用 requestAnimationFrame 确保在浏览器下一次重绘前更新
      rafId = requestAnimationFrame(() => {
        for (const entry of entries) {
          const newWidth = entry.contentRect.width;
          // 只有当宽度真正发生变化时才重置 refs，避免频繁重置
          if (lastWidth !== null && Math.abs(lastWidth - newWidth) > 1) {
            resetListRef();
          }
          lastWidth = newWidth;
        }
      });
    });
    if (tableContainerRef.current) {
      ro.observe(tableContainerRef.current);
    }

    return () => {
      ro.disconnect();
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields]);

  // 聚焦行受控
  useEffect(() => {
    if (currentFocusedRow !== undefined) {
      setFocusedRow(currentFocusedRow);
    }
  }, [currentFocusedRow]);

  // 监听滚动，显示固定列阴影
  useEffect(() => {
    if (!scroll?.x) return;

    const tableContainer = tableContainerRef.current;

    if (!tableContainer) return;

    const handleScroll = () => {
      if (!tableRef.current) return;

      if (tableContainer.scrollWidth === tableContainer.offsetWidth) {
        tableRef.current.setAttribute('data-scroll-position', 'none');
        return;
      }

      const scrollLeft = tableContainer.scrollLeft;
      const scrollPosition =
        scrollLeft === 0
          ? 'left'
          : scrollLeft + 1 > tableContainer.scrollWidth - tableContainer.offsetWidth
            ? 'right'
            : 'middle';
      tableRef.current.setAttribute('data-scroll-position', scrollPosition);
    };

    const throttleScroll = lodash.throttle(handleScroll, 200);

    tableContainer.addEventListener('scroll', throttleScroll);

    // 确保 tableRef.current 存在时才执行初始化设置
    if (tableRef.current) {
      handleScroll();
    } else {
      // 如果 tableRef.current 还不存在，使用 requestAnimationFrame 等待下一帧再尝试
      const checkTableRef = () => {
        if (tableRef.current) {
          handleScroll();
        } else {
          requestAnimationFrame(checkTableRef);
        }
      };
      requestAnimationFrame(checkTableRef);
    }

    return () => {
      tableContainer.removeEventListener('scroll', throttleScroll);
    };
  }, [scroll?.x, tableContainerRef, data]);

  // 监听表格宽度变化，更新固定列阴影
  useEffect(() => {
    if (!tableContainerRef.current) {
      return;
    }

    function checkScrollX() {
      if (!tableContainerRef.current || !tableRef.current) {
        return;
      }
      const tableContainer = tableContainerRef.current;
      const scrollLeft = tableContainer.scrollLeft;
      if (tableContainer.scrollWidth === tableContainer.offsetWidth) {
        tableRef.current.setAttribute('data-scroll-position', 'none');
        return;
      }
      const scrollPosition =
        scrollLeft === 0
          ? 'left'
          : scrollLeft + 1 > tableContainer.scrollWidth - tableContainer.offsetWidth
            ? 'right'
            : 'middle';
      tableRef.current.setAttribute('data-scroll-position', scrollPosition);
    }

    const ro = new ResizeObserver(function (entries) {
      entries.forEach(function () {
        checkScrollX();
      });
    });

    ro.observe(tableContainerRef.current);

    // 确保 tableRef.current 存在时才执行初始化设置
    if (tableRef.current) {
      checkScrollX();
    } else {
      // 如果 tableRef.current 还不存在，使用 requestAnimationFrame 等待下一帧再尝试
      const checkTableRef = () => {
        if (tableRef.current) {
          checkScrollX();
        } else {
          requestAnimationFrame(checkTableRef);
        }
      };
      requestAnimationFrame(checkTableRef);
    }

    return () => {
      ro.disconnect();
    };
  }, [data]);

  // 更新选中状态
  useEffect(() => {
    if (!rowsSelection) return;
    setSelection(rowsSelection.state ?? {});
  }, [selection, rowsSelection?.state, rowsSelection]);

  // 监听父级高度变化，用于百分比计算
  useEffect(() => {
    // 只有当 scroll.y 是百分比时才需要监听
    if (!needsPercentageCalculation) {
      setParentHeight(null);
      lastParentHeightRef.current = null;
      return;
    }

    const setupHeightObserver = () => {
      if (!tableContainerRef.current) return null;

      const scrollArea = tableContainerRef.current.parentElement;
      if (!scrollArea) return null;

      const parentElement = scrollArea.parentElement;
      if (!parentElement) return null;

      // 立即设置初始高度
      const initialHeight = parentElement.getBoundingClientRect().height;
      if (lastParentHeightRef.current !== initialHeight) {
        lastParentHeightRef.current = initialHeight;
        setParentHeight(initialHeight);
      }

      // 防抖处理，避免频繁更新
      let rafId: number;
      const resizeObserver = new ResizeObserver((entries) => {
        // 取消之前的动画帧
        if (rafId) {
          cancelAnimationFrame(rafId);
        }

        // 使用 requestAnimationFrame 确保在浏览器下一次重绘前更新
        rafId = requestAnimationFrame(() => {
          for (const entry of entries) {
            const newHeight = entry.contentRect.height;
            // 只有高度真正变化时才更新（避免小数点误差导致的频繁更新）
            if (lastParentHeightRef.current !== newHeight) {
              lastParentHeightRef.current = newHeight;
              setParentHeight(newHeight);
            }
          }
        });
      });

      resizeObserver.observe(parentElement);

      // 返回清理函数
      return {
        disconnect: () => {
          resizeObserver.disconnect();
          if (rafId) {
            cancelAnimationFrame(rafId);
          }
        },
      };
    };

    // 立即尝试设置
    let observer = setupHeightObserver();

    // 如果第一次没成功，在下一帧再试一次
    if (!observer) {
      const rafId = requestAnimationFrame(() => {
        observer = setupHeightObserver();
      });

      return () => {
        cancelAnimationFrame(rafId);
        observer?.disconnect();
      };
    }

    return () => {
      observer?.disconnect();
    };
  }, [needsPercentageCalculation]); // 只在百分比计算需求变化时重新创建监听器

  // 处理展开行
  const handleExpandRow = React.useCallback((rowId: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  }, []);

  const columns: ColumnDef<TData>[] = useMemo(() => {
    function getColumns(field: TableField<TData>): ColumnDef<TData> {
      // 如果存在 columns，则递归处理
      if (field.children) {
        return {
          id: field.key,
          header: field.header,
          columns: field.children.map(getColumns),
        };
      }
      return {
        id: field.key,
        accessorFn: field.accessorFn,
        accessorKey: field.key,
        enableSorting: field.sorter !== undefined,
        sortingFn: typeof field.sorter === 'boolean' ? undefined : field.sorter,
        enableColumnFilter: Boolean(field.filters),
        filterFn: field.onFilter,
        minSize: field.minWidth ?? (field.fixedDir ? field.width : undefined),
        size: field.width ?? NaN,
        meta: {
          onCell: field.onCell,
        },
        header: (props: any) => {
          const header = typeof field.header === 'function' ? field.header(props) : field.header;
          const columnId = props.column.id;

          const sortOrder = props.column.getIsSorted();
          const canSort = props.column.getCanSort();
          const canFilter = props.column.getCanFilter();

          const filters = fields.find((field) => field.key === columnId)?.filters ?? [];
          const filterType = fields.find((field) => field.key === columnId)?.filterType ?? 'single';

          return (
            <div
              className={cn('flex items-center justify-start gap-[4px] transition', {
                'justify-end': field.align === 'right',
              })}
            >
              {header}
              {canSort ? (
                // 支持自定义排序组件
                field.sortType === 'custom' && field.customSortRender ? (
                  field.customSortRender(sortOrder)
                ) : (
                  <TableSort order={sortOrder} />
                )
              ) : null}
              {canFilter ? (
                <div
                  className="inline-flex"
                  // 防止点击事件冒泡到 head 排序上，导致排序 Tooltip 触发
                  onClick={(e) => {
                    e.stopPropagation();
                    return false;
                  }}
                  onFocus={(e) => {
                    e.stopPropagation();
                    return false;
                  }}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    return false;
                  }}
                  onMouseUp={(e) => {
                    e.stopPropagation();
                    return false;
                  }}
                  onPointerDown={(e) => {
                    e.stopPropagation();
                    return false;
                  }}
                  onPointerMove={(e) => {
                    e.stopPropagation();
                    return false;
                  }}
                >
                  <TableFilter
                    filterType={filterType}
                    filterValue={props.column.getFilterValue()}
                    filters={filters}
                    onChange={(value) => {
                      props.column.setFilterValue(value);
                    }}
                  />
                </div>
              ) : null}
            </div>
          );
        },
        // eslint-disable-next-line react/display-name
        cell: React.memo(
          ({ row, column }) => {
            const value = row.getValue(field.key) as ReactNode;
            const original = row.original;
            const index = row.index;

            const content = React.useMemo(() => {
              if (field.render) {
                return field.render(value, original, index, row, column);
              }
              return value;
            }, [column, index, original, row, value]);

            return (
              <div
                className={cn('overflow-hidden', {
                  truncate: field.ellipsis,
                  'line-clamp-3 overflow-hidden overflow-ellipsis break-words':
                    column.getCanResize() && !field.ellipsis,
                })}
                style={{
                  width: field.ellipsis ? `calc(${column.getSize()}px - 32px)` : undefined,
                  textAlign: field.align,
                  minWidth: '100%',
                  maxWidth:
                    tableContainerRef.current?.offsetWidth &&
                    field.maxWidth &&
                    `calc(${tableContainerRef.current.offsetWidth * field.maxWidth}px - 32px)`,
                }}
              >
                {content}
              </div>
            );
          },
          (prevProps, nextProps) => {
            // 自定义比较函数，只在真正需要时才重新渲染
            const prevValue = prevProps.row.getValue(field.key);
            const nextValue = nextProps.row.getValue(field.key);
            const prevOriginal = prevProps.row.original;
            const nextOriginal = nextProps.row.original;

            // 如果值没有变化，则不重新渲染
            if (
              prevValue === nextValue &&
              JSON.stringify(prevOriginal) === JSON.stringify(nextOriginal)
            ) {
              return true;
            }

            return false;
          },
        ),
      };
    }
    const cols = fields.map(getColumns);

    // 处理展开列
    if (expandable) {
      cols.unshift({
        id: 'expand',
        accessorKey: 'expand',
        enableResizing: false,
        enableSorting: false,
        size: ExpandWidth,
        header: () => {
          return <div />;
        },
        cell: ({ row }) => {
          const rowId = lodash.get(row.original, uniqueKey);
          const isExpanded = expandedRows[rowId];
          const expandableIconShow = expandable.getRowExpandIconShow
            ? expandable.getRowExpandIconShow(row.original as Record<string, any>)
            : true;

          return (
            <div
              onClick={(e) => {
                e.stopPropagation();
                return false;
              }}
            >
              <IconButton
                className={cn('flex', {
                  hidden: !expandableIconShow,
                })}
                onClick={() => handleExpandRow(rowId)}
                tooltip={isExpanded ? t('收起') : t('展开')}
              >
                {isExpanded ? <DownLine16 /> : <RightLine16 />}
              </IconButton>
            </div>
          );
        },
      });
    }
    // 处理选择列
    if (rowsSelection) {
      cols.unshift({
        id: 'selection',
        accessorKey: 'selection',
        enableResizing: false,
        enableSorting: false,
        size: SelectionWidth,
        header: ({ table }) => {
          return (
            <div
              onClick={(e) => {
                e.stopPropagation();
                return false;
              }}
            >
              {table.getRowModel().rows.some((row) => row.getCanMultiSelect()) && (
                <Checkbox
                  aria-label="Select all"
                  checked={table.getIsAllPageRowsSelected()}
                  className={cn({
                    'opacity-0 transition group-hover/row:opacity-100 group-data-[selected="true"]/table:opacity-100':
                      !rowsSelection.defaultShowSelect,
                  })}
                  indeterminate={table.getIsSomePageRowsSelected()}
                  onChange={(value) => {
                    table.toggleAllPageRowsSelected(Boolean(value));
                  }}
                  {...rowsSelection.getCheckboxProps?.()}
                  disabled={
                    rowsSelection.getCheckboxProps?.()?.disabled ||
                    table.getRowModel().rows.every((row) => !row.getCanSelect())
                  }
                />
              )}
            </div>
          );
        },
        cell: ({ row }) => {
          return (
            <div
              onClick={(e) => {
                e.stopPropagation();
                return false;
              }}
            >
              {row.getCanMultiSelect() ? (
                <Checkbox
                  aria-label="Select row"
                  checked={row.getIsSelected()}
                  className={cn({
                    'opacity-0 transition group-hover/row:opacity-100 group-data-[selected="true"]/table:opacity-100':
                      !rowsSelection.defaultShowSelect,
                  })}
                  disabled={!row.getCanSelect()}
                  onChange={(value) => {
                    row.toggleSelected(Boolean(value));
                  }}
                  {...rowsSelection.getCheckboxProps?.(
                    table.getRowModel().rows[row.index].original,
                  )}
                />
              ) : (
                <Radio
                  allowUncheck
                  checked={row.getIsSelected()}
                  className={cn({
                    'opacity-0 transition group-hover/row:opacity-100 group-data-[selected="true"]/table:opacity-100':
                      !rowsSelection.defaultShowSelect,
                  })}
                  disabled={!row.getCanSelect()}
                  label=""
                  onChange={(value) => {
                    row.toggleSelected(Boolean(value));
                  }}
                  value={row.id}
                  {...(rowsSelection.getCheckboxProps?.(
                    table.getRowModel().rows[row.index].original,
                  ) as Omit<RadioOption, 'onChange' | 'value'>)}
                />
              )}
            </div>
          );
        },
      });
    }
    return cols;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    fields,
    Boolean(rowsSelection),
    Boolean(expandable),
    expandedRows,
    uniqueKey,
    handleExpandRow,
  ]);

  const table = useReactTable({
    data,
    columns,
    columnResizeMode: 'onChange',
    getRowId: (originalRow) => lodash.get(originalRow, uniqueKey),
    onSortingChange: (sorting) => {
      // 在非受控模式下才更新内部状态
      if (externalSortState === undefined) {
        setSorting(sorting);
      }
      onSortOrderChange?.(sorting);
    },
    enableColumnResizing: columnResizable,
    manualSorting: fields.some((field) => typeof field.sorter === 'boolean'),
    enableColumnFilters: fields.some((field) => Boolean(field.filters)),
    manualFiltering: fields.every((field) => !field.onFilter),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: (filters) => {
      // 在非受控模式下才更新内部状态
      if (externalColumnFilters === undefined) {
        setInternalColumnFilters(filters);
      }
      // 总是通知外部
      onFilterChange?.(filters);
    },
    getCoreRowModel: getCoreRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableMultiSort: false,
    onColumnSizingChange: (value) => {
      setColumnSizing((old) => {
        let newSizing: ColumnSizingState;
        if (typeof value === 'function') {
          newSizing = value(old);
        } else {
          newSizing = value;
        }

        const total = tableContainerRef.current?.offsetWidth ?? 0;
        // 防止左侧固定列拖拽超过右侧固定列

        const leftWidth = fields
          .filter((item) => item.fixedDir === 'left')
          .reduce((acc, cur) => acc + newSizing[cur.key], 0);

        const rightWidth = fields
          .filter((item) => item.fixedDir === 'right')
          .reduce((acc, cur) => acc + newSizing[cur.key], 0);

        if (total < rightWidth + leftWidth + SizingSafeArea) {
          return old;
        }

        return newSizing;
      });
      onColumnSizingChange?.(value);
    },
    enableRowSelection: (row) => {
      if (!rowsSelection) return false;
      return (
        !rowsSelection.getCheckboxProps || !rowsSelection.getCheckboxProps(row.original)?.disabled
      );
    },
    enableMultiRowSelection: rowsSelection?.type !== 'radio',
    onRowSelectionChange: rowsSelection
      ? (v) => {
          if (!rowsSelection) {
            setSelection(v);
          }
          rowsSelection.onChange?.(v);
        }
      : undefined,
    state: {
      sorting,
      rowSelection: selection,
      columnFilters: internalColumnFilters,
      columnPinning,
      columnSizing,
    },
  });

  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => estimateSize, //estimate row height for accurate scrollbar dragging
    getScrollElement: () => tableContainerRef.current,
    //measure dynamic row height, except in firefox because it measures table border height incorrectly
    measureElement:
      typeof window !== 'undefined' && !navigator.userAgent.includes('Firefox')
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
    overscan: 10,
    enabled: virtualized,
  });

  const mergedHeaderGroups = useMemo(
    () => getMergeHeaderGroups(table.getHeaderGroups()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [table, fields],
  );

  const hasChildren = useMemo(() => fields.some((field) => field.children), [fields]);

  const bodyRows: [Row<TData>, VirtualItem | null][] = (() => {
    if (!virtualized) {
      return table.getRowModel().rows.map((row) => [row, null]);
    }
    return rowVirtualizer.getVirtualItems().map((item) => [rows[item.index], item]);
  })();

  const [before, after] = (() => {
    if (!virtualized) return [0, 0];
    if (rowVirtualizer.getVirtualItems().length === 0) return [0, 0];
    return [
      notUndefined(rowVirtualizer.getVirtualItems()[0]).start - rowVirtualizer.options.scrollMargin,
      rowVirtualizer.getTotalSize() -
        notUndefined(rowVirtualizer.getVirtualItems()[rowVirtualizer.getVirtualItems().length - 1])
          .end,
    ];
  })();

  // 右键菜单鼠标位置
  const [menuPos, setMenuPos] = React.useState<{ x: number | null; y: number | null }>(
    MenuInitialPos,
  );
  // 右键菜单选中的行
  const [contextMenuSelectedRow, setContextMenuSelectedRow] = React.useState<TData | null>(null);

  // 右键菜单点击事件
  const handleContextMenu = React.useCallback(
    (event: React.MouseEvent, row: TData) => {
      if (!contextMenu) {
        return;
      }

      // 当点击元素和触发元素之间包含 a 标签时，不触发
      let target = event.target as HTMLElement;
      while (target) {
        if (target.tagName === 'A') {
          return;
        }
        if (target === event.currentTarget) {
          break;
        }
        target = target.parentElement as HTMLElement;
      }

      event.preventDefault();

      // 获取当前选中的行 IDs
      const selectedRows = table.getSelectedRowModel().rows;
      const selectedIds = selectedRows.map((selectRow) =>
        lodash.get(selectRow.original, uniqueKey),
      );
      const clickRowId = lodash.get(row, uniqueKey);

      /**
       * 如果右键点击的行不在已选中的行中，则清空已选中的行
       */
      if (!selectedIds.includes(clickRowId)) {
        // 清空选择
        table.resetRowSelection();
        contextMenu?.onSelect?.(row);
      }

      setContextMenuSelectedRow(row);
      setMenuPos({
        x: event.clientX,
        y: event.clientY,
      });
    },
    [contextMenu, table, uniqueKey],
  );

  const handleContextMenuClose = React.useCallback(
    (reason: 'clickAway' | 'select') => {
      setMenuPos(MenuInitialPos);
      setContextMenuSelectedRow(null);
      contextMenu?.onClose?.(reason);
    },
    [contextMenu],
  );

  return (
    <Spinner classes={{ root: cn('h-full', { '-mr-[10px]': !isSubTable }) }} spinning={loading}>
      <ScrollArea
        className={cn({ 'pr-[10px]': !isSubTable })}
        maxHeight={cachedMaxHeight}
        onScroll={() => {
          // 判断滚动到底部
          if (!tableContainerRef.current) return;

          const { scrollTop, clientHeight, scrollHeight } = tableContainerRef.current;

          if (scrollTop + clientHeight >= scrollHeight - scrollEndThreshold) {
            if (hasTriggerScrollEnd.current) return;
            hasTriggerScrollEnd.current = true;
            onScrollEnd?.();
          } else {
            hasTriggerScrollEnd.current = false;
          }
        }}
        ref={tableContainerRef}
      >
        {initialed ? (
          <div
            style={{
              height: calculateTableHeight({
                data,
                virtualized,
                rowVirtualizer,
                showHeader,
              }),
            }}
          >
            <Table
              className={cn('group/table', {
                'min-w-full': !columnResizable,
                'w-auto': columnResizable,
                'table-fixed': scroll?.x || columnResizable,
              })}
              data-scroll-position="left"
              data-selected={table.getIsSomeRowsSelected() || table.getIsAllRowsSelected()}
              ref={tableRef}
              style={{
                width: scroll?.x ? scroll.x : columnResizable ? table.getTotalSize() : undefined,
              }}
            >
              {showHeader ? (
                <TableHeader
                  className={cn({
                    'sticky top-0 z-20': scroll?.y,
                  })}
                >
                  {mergedHeaderGroups.map((headerGroup, headerGroupIndex) => (
                    <TableRow data-id={headerGroup.id} isSubTable={isSubTable} key={headerGroup.id}>
                      {isSubTable && !rowsSelection ? (
                        <>
                          {/** 子表格的选中按钮占位符 */}
                          <TableHead
                            className="px-1 border-0 border-divider-solid border-b border-solid "
                            style={{ width: SelectionWidth }}
                          />
                          {/** 子表格的展开按钮占位符 */}
                          <TableHead
                            className="pl-2 pr-1 border-0 border-divider-solid border-b border-solid "
                            style={{ width: ExpandWidth }}
                          />
                        </>
                      ) : null}
                      {headerGroup.headers.map((header, headerIndex) => {
                        const { column } = header;
                        const isSelection = column.id === 'selection';
                        const isExpand = column.id === 'expand';
                        const canResizing = column.getCanResize();
                        const { pinDir, isFirstRight, isLastLeft } =
                          getHeaderPinInfo<TData>(header);

                        const field = fields.find((item) => item.key === header.id);

                        const canSort = header.column.getCanSort();
                        const desc = sorting.find((item) => item.id === header.id)?.desc;
                        const isSubheader = headerGroupIndex !== 0;
                        const hasSelection = !!rowsSelection;
                        const hasExpand = !!expandable;
                        const selectElOffset =
                          isSubheader && hasSelection
                            ? hasExpand
                              ? SelectionWidth + ExpandWidth
                              : SelectionWidth
                            : 0;

                        const columnPin = refsReady
                          ? getTableColumnOffset({
                              index: headerIndex,
                              elementList: headerListRef.current[headerGroupIndex] ?? [],
                              pinDir,
                              selectElOffset,
                            })
                          : 0;
                        let tooltip: string | undefined;
                        if (desc === undefined) {
                          tooltip = field?.customSortTooltips
                            ? field.customSortTooltips.none
                            : t('点击升序');
                        } else if (desc) {
                          tooltip = field?.customSortTooltips
                            ? field.customSortTooltips.desc
                            : t('取消排序');
                        } else {
                          tooltip = field?.customSortTooltips
                            ? field.customSortTooltips.asc
                            : t('点击降序');
                        }

                        const content = (
                          <TableHead
                            className={cn(
                              'group/th transition whitespace-nowrap relative',
                              '[&[data-can-sort="true"]:hover:not(:has(.cursor-col-resize:hover)):not(:has(.table-filter:hover))]:bg-fill-3 data-[can-sort=true]:cursor-pointer',
                              'group-data-[scroll-position="none"]/table:after:hidden',
                              'data-[selection="true"]:px-0 data-[selection="true"]:text-center',
                              'data-[expand="true"]:pl-2 data-[expand="true"]:pr-1',
                              'border-0 border-divider-solid border-b border-solid ',
                              {
                                'border-r': hasChildren,
                                'border-r-0 group-data-[scroll-position="left"]/table:border-r':
                                  hasChildren && isLastLeft,
                                '[&+th]:pl-1': isSelection,
                                'sticky z-30': pinDir,
                                'after:pointer-events-none after:absolute after:bottom-[-1px] after:left-[-1px] after:top-0 after:w-[20px] after:translate-x-[-100%] after:transition after:content-[""]':
                                  isFirstRight,
                                'after:shadow-[rgba(0,0,0,0.05)_-6px_0px_6px_-6px_inset,rgba(0,0,0,0.03)_-8px_0px_8px_-8px_inset,rgba(0,0,0,0.06)_-15px_0px_15px_-15px_inset]':
                                  isFirstRight,
                                'group-data-[scroll-position="right"]/table:after:hidden':
                                  isFirstRight,
                                'after:absolute after:bottom-[-1px] after:right-[-1px] after:top-0 after:w-[20px] after:translate-x-[100%] after:transition after:content-[""]':
                                  isLastLeft,
                                'after:shadow-[rgba(0,0,0,0.05)_6px_0px_6px_-6px_inset,rgba(0,0,0,0.03)_8px_0px_8px_-8px_inset,rgba(0,0,0,0.06)_15px_0px_15px_-15px_inset]':
                                  isLastLeft,
                                'group-data-[scroll-position="left"]/table:after:hidden ':
                                  isLastLeft,
                              },
                            )}
                            colSpan={header.colSpan}
                            data-can-sort={canSort}
                            data-expand={isExpand}
                            data-id={header.id}
                            data-selection={isSelection}
                            key={header.id}
                            onMouseUp={() => {
                              // 修复拖拽时触发排序
                              if (header.column.getIsResizing()) {
                                return;
                              }
                              if (!header.column.getCanSort()) return;
                              if (header.column.getIsSorted() === 'desc') {
                                header.column.clearSorting();
                              } else {
                                header.column.toggleSorting(header.column.getIsSorted() === 'asc');
                              }
                            }}
                            ref={(el) => setHeaderListRef(headerGroupIndex, headerIndex, el)}
                            rowSpan={header.rowSpan}
                            style={{
                              width:
                                canResizing || pinDir || field?.width || isSelection || isExpand
                                  ? header.getSize()
                                  : undefined,
                              left: pinDir === 'left' ? columnPin : undefined,
                              right: pinDir === 'right' ? columnPin : undefined,
                              ...(field?.style ?? {}),
                            }}
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(header.column.columnDef.header, header.getContext())}
                            {header.column.getCanResize() && (
                              <div
                                className={cn(
                                  'absolute right-0 top-[-2px] bottom-[-2px] w-[10px] cursor-col-resize ',
                                  'group-hover/th:after:bg-divider-solid-on-grey hover:after:!bg-primary-normal ',
                                  'after:absolute after:right-[4px] after:w-[2px] after:h-full after:content-[""]',
                                  hasChildren
                                    ? isLastLeft
                                      ? 'group-data-[scroll-position="left"]/table:right-[-1px]'
                                      : 'right-[-1px]'
                                    : undefined,
                                  {
                                    'after:!bg-primary-normal': header.column.getIsResizing(),
                                    'group-data-[scroll-position="left"]:right-[-1px]':
                                      hasChildren && isLastLeft,
                                    'right-[-1px]': hasChildren,
                                  },
                                )}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  return false;
                                }}
                                onFocus={(e) => {
                                  e.stopPropagation();
                                  return false;
                                }}
                                onMouseDown={header.getResizeHandler()}
                                onMouseOver={(e) => {
                                  e.stopPropagation();
                                  return false;
                                }}
                                onPointerMove={(e) => {
                                  e.stopPropagation();
                                  return false;
                                }}
                                onTouchStart={header.getResizeHandler()}
                              />
                            )}
                          </TableHead>
                        );

                        const headerContent =
                          canSort && tooltip ? (
                            <Tooltip disableHoverableContent key={header.id} title={tooltip}>
                              {content}
                            </Tooltip>
                          ) : (
                            content
                          );

                        return isSubTable && isSelection ? (
                          <>
                            {headerContent}
                            {/** 子表格的展开按钮占位符 */}
                            <TableHead
                              className="pl-2 pr-1 border-0 border-divider-solid border-b border-solid "
                              style={{ width: ExpandWidth }}
                            />
                          </>
                        ) : (
                          headerContent
                        );
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
              ) : null}
              <TableBody>
                {before > 0 && (
                  <tr>
                    <td colSpan={columns.length} style={{ height: before }} />
                  </tr>
                )}
                {bodyRows.length > 0 &&
                  bodyRows.map(([row]) => {
                    const rowId = lodash.get(row.original, uniqueKey);
                    const isExpanded = expandedRows[rowId];

                    return (
                      <React.Fragment key={row.id}>
                        <TableRow
                          data-focused={enableRowFocus ? row.index === focusedRow : false}
                          data-id={row.id}
                          data-index={row.index}
                          data-state={
                            row.getIsSelected()
                              ? 'selected'
                              : contextMenuSelectedRow &&
                                  lodash.get(contextMenuSelectedRow, uniqueKey) ===
                                    lodash.get(row.original, uniqueKey)
                                ? 'contextMenuSelected'
                                : undefined
                          }
                          isSubTable={isSubTable}
                          onClick={() => {
                            if (!enableRowFocus) {
                              return;
                            }
                            setFocusedRow(row.index);
                            onFocusTableRow?.(row.original, row.index);
                          }}
                          ref={rowVirtualizer.measureElement}
                        >
                          {isSubTable && !rowsSelection ? (
                            <>
                              {/** 子表格的选中按钮占位符 */}
                              <TableCell className="pr-1 !pl-1" style={{ width: SelectionWidth }} />
                              {/** 子表格的展开按钮占位符 */}
                              <TableCell className="pl-2 pr-1" style={{ width: ExpandWidth }} />
                            </>
                          ) : null}
                          {row.getVisibleCells().map((cell, cellIndex) => {
                            const isSelection = cell.column.id === 'selection';
                            const isExpand = cell.column.id === 'expand';
                            const { pinDir, isFirstRight, isLastLeft } = getRowPinInfo<TData>(cell);
                            const onCell = cell.column.columnDef.meta?.onCell;
                            const field = fields.find((item) => item.key === cell.column.id);
                            const props = onCell?.(row.original, row.index);

                            const columnPin = refsReady
                              ? getTableColumnOffset({
                                  index: cellIndex,
                                  elementList: listRef.current ?? [],
                                  pinDir,
                                })
                              : 0;

                            if (props?.colSpan === 0) {
                              return null;
                            }

                            return (
                              <>
                                <TableCell
                                  className={cn(
                                    'peer relative',
                                    'group-data-[focused="true"]/row:bg-grey-100',
                                    'group-data-[state="selected"]/row:bg-grey-100',
                                    'group-data-[state="contextMenuSelected"]/row:bg-grey-50',
                                    'group-data-[scroll-position="none"]/table:after:content-none',
                                    'data-[selection="true"]:px-0 data-[selection="true"]:text-center',
                                    'data-[expand="true"]:pl-2 data-[expand="true"]:pr-1',
                                    {
                                      'sticky z-10': pinDir,
                                      '[&+td]:pl-1': isSelection,
                                      'after:absolute after:bottom-[-1px] after:left-[-1px] after:top-0 after:w-[20px] after:translate-x-[-100%] after:transition after:content-[""]':
                                        isFirstRight,
                                      'after:shadow-[rgba(0,0,0,0.05)_-6px_0px_6px_-6px_inset,rgba(0,0,0,0.03)_-8px_0px_8px_-8px_inset,rgba(0,0,0,0.06)_-15px_0px_15px_-15px_inset]':
                                        isFirstRight,
                                      'group-data-[scroll-position="right"]/table:after:hidden':
                                        isFirstRight,
                                      'after:absolute after:bottom-[-1px] after:right-[-1px] after:top-0 after:w-[20px] after:translate-x-[100%] after:transition after:content-[""]':
                                        isLastLeft,
                                      'after:shadow-[rgba(0,0,0,0.05)_6px_0px_6px_-6px_inset,rgba(0,0,0,0.03)_8px_0px_8px_-8px_inset,rgba(0,0,0,0.06)_15px_0px_15px_-15px_inset]':
                                        isLastLeft,
                                      'group-data-[scroll-position="left"]/table:after:hidden':
                                        isLastLeft,
                                    },
                                  )}
                                  data-expand={isExpand}
                                  data-id={cell.id}
                                  data-selection={isSelection}
                                  key={cell.id}
                                  onClick={(e) => {
                                    onClickTableCell?.(cell.id, row.original, row.index, e);
                                  }}
                                  onContextMenu={(event) => handleContextMenu(event, row.original)}
                                  ref={(el) => setListRef(cellIndex, el)}
                                  style={{
                                    width:
                                      !showHeader &&
                                      (pinDir || field?.width || isSelection || isExpand)
                                        ? cell.column.getSize()
                                        : undefined,
                                    left: pinDir === 'left' ? columnPin : undefined,
                                    right: pinDir === 'right' ? columnPin : undefined,
                                    ...(field?.style ?? {}),
                                  }}
                                  {...props}
                                >
                                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                  {cell.column.getCanResize() && (
                                    <div
                                      className={cn(
                                        'pointer-events-none absolute right-0 top-[-2px] bottom-[-2px] w-[10px]',
                                        'after:absolute after:right-[4px]  after:h-full after:w-[2px] after:content-[""]',
                                        {
                                          'after:!bg-primary-normal': cell.column.getIsResizing(),
                                        },
                                      )}
                                    />
                                  )}
                                </TableCell>
                                {/** 子表格的展开按钮占位符 */}
                                {isSubTable && isSelection ? (
                                  <TableCell className="pl-2 pr-1" style={{ width: ExpandWidth }} />
                                ) : null}
                              </>
                            );
                          })}
                        </TableRow>
                        {/* 展开行 */}
                        {expandable?.expandedRowRender && isExpanded ? (
                          <TableRow className="group/expand-wrapper" key={`${row.id}-expanded`}>
                            <TableCell
                              className={cn('first:pl-0 py-0 pr-0', 'bg-fill-1 [&_td]:bg-fill-1')}
                              colSpan={columns.length}
                            >
                              {expandable.expandedRowRender(row.original as Record<string, any>)}
                            </TableCell>
                          </TableRow>
                        ) : null}
                      </React.Fragment>
                    );
                  })}
                {after > 0 && (
                  <tr>
                    <td colSpan={columns.length} style={{ height: after }} />
                  </tr>
                )}
              </TableBody>
            </Table>
          </div>
        ) : null}
        {/* 右键菜单 */}
        {!!contextMenu && (
          <TableMenu<TData>
            data={data}
            items={contextMenu.items}
            nameKey={contextMenu.nameKey}
            onClose={handleContextMenuClose}
            pos={menuPos}
            selected={
              table.getSelectedRowModel().rows.length === 0
                ? contextMenuSelectedRow
                  ? [contextMenuSelectedRow]
                  : []
                : table.getSelectedRowModel().rows.map((row) => row.original)
            }
            uniqueKey={uniqueKey}
          />
        )}
      </ScrollArea>
      {data.length === 0 && showEmpty ? (
        customEmpty ? (
          customEmpty
        ) : (
          <div className="p-0 text-center w-full h-full flex flex-col">
            <div className="h-[20%] min-h-2" />
            <Empty
              description={EmptyDescription}
              image={
                <ThemedImage
                  alt="empty"
                  height={128}
                  src={typeof EmptySvg === 'string' ? EmptySvg : EmptySvg.src}
                  width={128}
                />
              }
              size="md"
            />
          </div>
        )
      ) : null}
    </Spinner>
  );
}

// 列固定信息
function getRowPinInfo<TData>(cell: Cell<TData, unknown>) {
  const pinDir = cell.column.getIsPinned();
  const isLastLeft = pinDir === 'left' && cell.column.getIsLastColumn('left');
  const isFirstRight = pinDir === 'right' && cell.column.getIsFirstColumn('right');
  return { pinDir, isFirstRight, isLastLeft };
}

// 表头的列固定信息
function getHeaderPinInfo<TData>(header: Header<TData, unknown>) {
  const pinDir = header.column.getIsPinned();

  function getIsLastColumn(column: Column<TData>, position: ColumnPinningPosition) {
    if (column.columns.length > 0) {
      return column.columns[column.columns.length - 1]?.getIsLastColumn(position);
    }
    return column.getIsLastColumn(position);
  }

  function getIsFirstColumn(column: Column<TData>, position: ColumnPinningPosition) {
    if (column.columns.length > 0) {
      return column.columns[0]?.getIsFirstColumn(position);
    }
    return column.getIsFirstColumn(position);
  }

  const isLastLeft = pinDir === 'left' && getIsLastColumn(header.column, 'left');
  const isFirstRight = pinDir === 'right' && getIsFirstColumn(header.column, 'right');

  return { pinDir, isFirstRight, isLastLeft };
}

interface CalculateTableHeightParams {
  data: any[]; // 根据实际数据类型替换 any
  virtualized: boolean;
  rowVirtualizer: Virtualizer<HTMLDivElement, Element>;
  showHeader: boolean;
}

function calculateTableHeight({
  data,
  virtualized,
  rowVirtualizer,
  showHeader,
}: CalculateTableHeightParams): string | undefined {
  if (data.length === 0) return undefined;
  if (virtualized) return `${rowVirtualizer.getTotalSize() + (showHeader ? 47 : 0)}px`;
  return undefined;
}
