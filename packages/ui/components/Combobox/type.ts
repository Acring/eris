import type { Command, Command as CommandPrimitive } from '@acring/cmdk';

export type ComboboxValue = string | number | boolean | null | undefined;
export interface ComboboxOption {
  value: ComboboxValue;
  label: string;
  /** 选项的描述文本 */
  description?: string;
  disable?: boolean;
  /** 固定选项，不能被删除。 */
  fixed?: boolean;
  /** 选项的标签文本，支持多个标签 */
  tag?: string | string[];
  /** 选项的 tooltip 提示文本 */
  tooltip?: React.ReactNode;
  /** 额外的数据 */
  [key: string]:
    | string
    | boolean
    | string[]
    | number
    | Record<string, any>
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    | React.ReactNode
    | undefined;
}
export type GroupOption = Record<string, ComboboxOption[]>;

export interface ComboboxProps<Multiple extends boolean = false> {
  /**
   * Combobox 的值。
   * 当 multiple 为 true 时，是字符串数组。
   * 当 multiple 为 false 时，是单个字符串或 undefined。
   */
  error?: boolean;
  /** 是否显示边框，默认为 true */
  outlined?: boolean;
  /** 是否自动获取焦点 */
  autoFocus?: boolean;
  /** 指定 portal 的挂载节点 */
  portalContainer?: HTMLElement | null;
  value?: Multiple extends true ? ComboboxValue[] : ComboboxValue;
  /** 默认值 */
  defaultValue?: Multiple extends true ? ComboboxValue[] : ComboboxValue;
  /** 是否允许多选 */
  multiple?: Multiple;
  /** 是否隐藏选中项的标签 */
  hideSelectedTag?: boolean;
  defaultOptions?: ComboboxOption[];
  /** 手动控制的选项列表 */
  options?: ComboboxOption[];
  /** 控制下拉框的打开状态 */
  open?: boolean;
  /** 打开状态改变时的回调函数 */
  onOpenChange?: (open: boolean) => void;
  placeholder?: string;
  /** 加载中组件 */
  loadingIndicator?: React.ReactNode;
  /** 空状态组件 */
  emptyIndicator?: React.ReactNode;
  /** 空状态提示信息 */
  emptyText?: string;
  /** 异步搜索的防抖时间。仅在设置 `onSearch` 时生效。 */
  delay?: number;
  /**
   * 仅在设置 `onSearch` 属性时生效。在 `onFocus` 时触发搜索。
   * 例如：当用户点击输入框时，会触发搜索以获取初始选项。
   **/
  triggerSearchOnFocus?: boolean;
  /** 异步搜索 */
  onSearch?: (value: string) => Promise<ComboboxOption[]>;
  /**
   * 同步搜索。这种搜索不会显示加载指示器。
   * 其他属性与异步搜索相同。
   * 例如：creatable、groupBy、delay。
   **/
  onSearchSync?: (value: string) => ComboboxOption[];
  onChange?: (
    value: Multiple extends true ? ComboboxValue[] : ComboboxValue,
    options: ComboboxOption[],
  ) => void;
  disabled?: boolean;
  /** 根据提供的键名对选项进行分组 */
  groupBy?: string;
  className?: string;
  /** 下拉内容区自定义样式类名 */
  contentClassName?: string;
  badgeClassName?: string;
  /**
   * 默认选中第一项是 cmdk 的默认行为，这就是为什么默认值为 true。
   * 这是通过添加一个虚拟项来解决的变通方案。
   *
   * @reference: https://github.com/pacocoursey/cmdk/issues/171
   */
  selectFirstItem?: boolean;
  /** 允许用户在没有匹配选项时创建新选项 */
  creatable?: boolean;
  /** 创建新选项的回调函数 */
  onCreate?: (value: string) => void;
  /** `Command` 组件的属性 */
  commandProps?: React.ComponentPropsWithoutRef<typeof Command>;
  /** `CommandInput` 组件的属性 */
  inputProps?: Omit<
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>,
    'value' | 'placeholder' | 'disabled'
  >;
  /** 隐藏清除全部按钮 */
  disableClearable?: boolean;
  /** 多选时的展示模式 */
  displayMode?: 'tag' | 'text';
  /** 多选时文本展示的分隔符 */
  separator?: string;
  /** 自定义描述渲染函数 */
  descriptionRender?: (option: ComboboxOption) => React.ReactNode;
  /** 自定义标签渲染函数 */
  labelRender?: (option: ComboboxOption) => React.ReactNode;
  /** 自定义选中项标签渲染函数 */
  selectedTagRender?: (option: ComboboxOption) => React.ReactNode;
  /** 自定义选中项label渲染函数 */
  selectedLabelRender?: (option: ComboboxOption) => React.ReactNode;
  /** 自定义选中项标签的 className */
  selectedTagClassName?: string;
  /** 弹出框的宽度，可以是数字（单位：px）或 CSS 宽度值 */
  popupWidth?: number | string;
  /** 弹出框的最大宽度，可以是数字（单位：px）或 CSS 宽度值 */
  popupMaxWidth?: number | string;
  /** 是否启用滚动加载功能，仅在非搜索状态下生效 */
  infiniteScroll?: boolean;
  /** 是否有更多数据可以加载 */
  hasNextPage?: boolean;
  /** 是否正在加载更多数据 */
  isLoadingMore?: boolean;
  /** 加载更多数据的回调函数 */
  onLoadMore?: () => void;
  /** 组件的大小 */
  size?: 'sm' | 'md' | 'lg';
  /** 是否启用虚拟化 */
  virtual?: boolean;
  /** 虚拟化列表项的高度 */
  itemHeight?: number;
  /** 失去焦点时的回调函数 */
  onBlur?: () => void;
}

export interface ComboboxRef {
  selectedValue: ComboboxOption[];
  input: HTMLInputElement;
  focus: () => void;
  reset: () => void;
}
