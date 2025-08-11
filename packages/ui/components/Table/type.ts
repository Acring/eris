import type { CSSProperties } from 'react';
import type {
  Column,
  ColumnDef,
  ColumnSizingOptions,
  FilterFnOption,
  Row,
  RowSelectionOptions,
  SortingFnOption,
  SortingOptions,
  ColumnFiltersOptions,
  ColumnFiltersState,
  RowData,
  SortingState,
} from '@tanstack/react-table';
import type { DropdownProps } from '../Dropdown/Dropdown';
import type { CheckboxProps } from '../Checkbox';
import type { RadioOption } from '../Radio/type';

type FilterValue = string | string[] | undefined;
type FilterType = 'multiple' | 'single';
type SortOrder = 'asc' | 'desc' | false;
type SelectionType = 'checkbox' | 'radio';

export interface FieldFilterItem {
  label: string;
  value: any;
}

export interface RowSelection<DataType, TSelection extends SelectionType> {
  state: Record<string, boolean>;
  onChange: RowSelectionOptions<DataType>['onRowSelectionChange'];
  type?: TSelection;
  defaultShowSelect?: boolean; // 是否默认显示选择框，否则 hover 显示
  getCheckboxProps?: (record?: DataType) =>
    | {
        disabled: boolean;
      }
    | (TSelection extends 'checkbox'
        ? Omit<CheckboxProps, 'onChange' | 'value'>
        : TSelection extends 'radio'
          ? Omit<RadioOption, 'onChange' | 'value'>
          : never);
}

export interface Expandable {
  expandedRowRender: (parentRowItem: Record<string, any>) => React.ReactNode;
  getRowExpandIconShow?: (parentRowItem: Record<string, any>) => boolean;
}

export interface TableScroll {
  y?: string | number;
  x?: string | number;
}

export interface TableContextMenu<TData> {
  nameKey: string; // 用于显示选中项名称的字段名
  items: DropdownProps['menuList'];
  onSelect?: (row: TData) => void; // 通过右键菜单选择行
  onClose?: (reason: 'clickAway' | 'select') => void; // 关闭右键菜单
}

export interface TableMenuProps<TData> {
  uniqueKey: string;
  selected: TData[];
  data: TData[];
  pos: { x: number | null; y: number | null };
  items: DropdownProps['menuList'];
  nameKey: string;
  onClose: (reason: 'clickAway' | 'select') => void;
}

export interface SorterResult<DataType = Record<string, any>> {
  fieldKey?: string;
  order?: SortOrder;
  field?: TableField<DataType>;
}

export interface DataTableProps<DataType> {
  uniqueKey?: string;
  fields: TableField<DataType>[];
  data: DataType[];
  loading?: boolean;
  disabled?: boolean;
  rowSelection?: RowSelection<DataType, SelectionType>;
  scroll?: TableScroll;
  contextMenu?: TableContextMenu<DataType>;
  virtualized?: boolean; // 虚拟列表
  filteredValue?: Record<string, FilterValue>;
  columnFilters?: ColumnFiltersState; // 外部传入的过滤状态（受控模式）
  defaultColumnFilters?: ColumnFiltersState; // 默认过滤状态（非受控模式的初始值）
  onFilterChange?: ColumnFiltersOptions<DataType>['onColumnFiltersChange'];
  sorting?: SortingState; // 外部排序状态
  onSortOrderChange?: SortingOptions<DataType>['onSortingChange'];
  onClickTableCell?: (
    key: string,
    rowData: DataType,
    index: number,
    e: React.MouseEvent<HTMLTableCellElement>,
  ) => void;
  currentFocusedRow?: number;
  onFocusTableRow?: (rowData: DataType, index: number) => void;
  onColumnSizingChange?: ColumnSizingOptions['onColumnSizingChange'];
  enableRowFocus?: boolean;
  className?: string;
  showHeader?: boolean;
  expandable?: Expandable; // 二级表格展开功能
  isSubTable?: boolean; // 是否是二级表格
  bgcolor?: string;
  columnResizable?: boolean;
  estimateSize?: number;
  onScrollEnd?: () => void;
  scrollEndThreshold?: number;
  EmptyDescription?: string;
  showEmpty?: boolean; // 是否显示空状态
  customEmpty?: React.ReactNode;
}

export interface TableField<DataType> {
  header: ColumnDef<DataType>['header'];
  // key: Paths<DataType>;
  key: string;
  accessorFn?: (row: DataType) => any;
  fixedDir?: 'left' | 'right';
  align?: 'left' | 'right' | 'center';
  width?: number;
  maxWidth?: number; // 最大宽度，小于 1，用于计算容器百分比
  minWidth?: number; // 最小宽度，防止拖拽过小
  ellipsis?: boolean;
  children?: TableField<DataType>[];
  onCell?: (
    record: DataType,
    index: number,
  ) =>
    | {
        colSpan?: number;
        rowSpan?: number;
        [key: string]: any;
      }
    | undefined;
  render?: (
    value: any,
    data: DataType,
    index: number,
    row: Row<DataType>,
    column: Column<DataType>,
  ) => React.ReactNode;
  filters?: FieldFilterItem[];
  filterType?: FilterType;
  onFilter?: FilterFnOption<DataType>;
  defaultSortOrder?: SortOrder; // 默认排序顺序（仅用于非受控模式的初始化）
  sorter?: boolean | SortingFnOption<DataType>;
  // 自定义排序相关配置
  sortType?: 'default' | 'custom'; // 排序类型，default 为默认排序，custom 为自定义排序
  customSortRender?: (sortOrder: SortOrder) => React.ReactNode; // 自定义排序组件渲染函数
  customSortTooltips?: {
    asc?: string;
    desc?: string;
    none?: string;
  };
  style?: CSSProperties;
}

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export interface ColumnMeta<TData extends RowData, TValue> {
    onCell?: (
      record: TData,
      index: number,
    ) =>
      | {
          colSpan?: number;
          rowSpan?: number;
          [key: string]: any;
        }
      | undefined;
  }
}
