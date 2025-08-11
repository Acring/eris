import type { HTMLAttributes } from 'react';
import type { Command, Command as CommandPrimitive } from '@acring/cmdk';
import type { FloatingContentProps } from '../FloatingContent/type';

export type valueType = string | number;
export interface CascaderOptionProps<T extends valueType = valueType> {
  value: T;
  label: React.ReactNode;
  description?: string;
  curValuePath?: T[];
  disabled?: boolean;
  tooltip?: React.ReactNode;
  children?: CascaderOptionProps<T>[];
  searchMark?: CascaderOptionProps<T>[];
  itemRender?: (option: CascaderOptionProps<T>) => React.ReactNode; // 整个 option 的渲染，优先级高于 itemLabelRender
}

// 获取选项类型的辅助类型
export type GetOptionType<
  T extends valueType,
  Multiple extends boolean = false,
> = Multiple extends true ? CascaderOptionProps<T>[][] : CascaderOptionProps<T>[];

export type getLabelType<Multiple extends boolean = false> = Multiple extends true
  ? React.ReactNode[][]
  : React.ReactNode[];
export interface CascaderProps<T extends valueType = valueType, Multiple extends boolean = boolean>
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'dir' | 'defaultValue'> {
  className?: string;
  allowClear?: boolean;
  disabled?: boolean;
  width?: number | string;
  tooltip?: React.ReactNode;
  loading?: boolean;
  multiple?: Multiple;
  open?: boolean;
  expandOnDisabled?: boolean; // 禁用状态下是否展开
  maxHeight?: number | string;
  value?: T[];
  defaultValue?: T[];
  error?: boolean;
  placeholder?: string;
  emptyContent?: React.ReactNode;
  options?: CascaderOptionProps<T>[];
  onOpenChange?: (open: boolean) => void;
  displayRender?: (
    labels: getLabelType<Multiple>,
    selectedOptions: GetOptionType<T, Multiple>,
    onRemove?: (option: CascaderOptionProps<T>) => void, // 自定义 Tag 的时候，需要传入 onRemove 回调， option 为选中的最后一个选项
  ) => React.ReactNode; // 单选时传递一维数组，多选时传递二维数组
  descriptionRender?: (option: CascaderOptionProps<T>) => React.ReactNode; // 自定义 option 的 description 渲染
  itemLabelRender?: (option: CascaderOptionProps<T>) => React.ReactNode; // 仅控制全局 option 的内容显示

  onChange?: (value: T[], selectedOptions: GetOptionType<T, Multiple>) => void; // 选择变化回调， value 为选中的值，selectedOptions 为选中的选项（单选时为一维数组，多选时为二维数组）

  filterOption?: (inputValue: string, path: CascaderOptionProps<T>[]) => boolean; // 自定义筛选函数
  trigger?: 'hover' | 'click';
  /** 下拉框的属性 */
  popoverProps?: Omit<FloatingContentProps, 'children'>;
  /** 命令行组件的属性 */
  commandProps?: React.ComponentPropsWithoutRef<typeof Command>;
  /** `CommandInput` 组件的属性 */
  inputProps?: Omit<
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>,
    'value' | 'placeholder' | 'disabled'
  >;
  portalContainer?: HTMLElement | null;
  /** 搜索 option 排序 */
  searchSorter?: (option: CascaderOptionProps<T>[]) => CascaderOptionProps<T>[];
}

export interface CascaderRef<T extends valueType = valueType, Multiple extends boolean = boolean> {
  selectedOptions: GetOptionType<T, Multiple>;
  input: HTMLInputElement;
  focus: () => void;
  reset: () => void;
}

export type CascaderItemProps<T extends valueType = valueType> = CascaderOptionProps<T> &
  Pick<
    CascaderProps<T>,
    'multiple' | 'expandOnDisabled' | 'descriptionRender' | 'itemLabelRender'
  > & {
    active?: boolean;
    handleActiveValueCells: (curValuePath: T[]) => void;
    searchValue?: string;
    onSelect?: (option: CascaderOptionProps<T>, checked?: boolean) => void;
    hoverOpen?: boolean;
    selectedValues?: T[];
    indeterminateValues?: T[];
    curValuePath?: T[];
    key: string;
  };

export interface OptionColumnProps<T extends valueType = valueType> {
  options: CascaderOptionProps<T>[];
}

export type FilterOptionProp<T extends valueType = valueType> = (
  inputValue: string,
  path: CascaderOptionProps<T>[],
) => boolean;

export interface Key2OptionMapValue<T extends valueType = valueType>
  extends CascaderOptionProps<T> {
  children: CascaderOptionProps<T>[];
  pathParentValues: T[];
}

export type Key2OptionMap<T extends valueType = valueType> = Record<
  valueType,
  Key2OptionMapValue<T>
>;
