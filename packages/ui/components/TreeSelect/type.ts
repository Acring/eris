import type { TreeNodeProps } from '../Tree/type';
import type { Command, Command as CommandPrimitive } from '@acring/cmdk';

export interface TreeSelectOption extends TreeNodeProps {}

export type TreeSelectNodeProps = TreeSelectOption;

export interface BasicTreeSelect {
  selectable?: boolean;
  checkable?: boolean;
  multiple?: boolean;
  icon?: React.ReactNode;
  selectedKeys?: string[];
  titleRender?: (item: TreeSelectNodeProps, isLeaf?: boolean) => React.ReactNode;
  onExpand?: (expandedKeys: string[], node: TreeSelectNodeProps) => void;
  expandedKeys?: string[];
  disabled?: boolean;
  expandOnClickNode?: boolean;
  treeItemClassName?: string;
}

export interface TreeSelectProps<Multiple extends boolean = false> {
  /**
   * TreeSelect 的值。
   * 当 multiple 为 true 时，是字符串数组。
   * 当 multiple 为 false 时，是单个字符串或 undefined。
   */
  error?: boolean;
  /** 是否显示边框，默认为 true */
  outlined?: boolean;
  /** 是否自动获取焦点 */
  autoFocus?: boolean;
  value?: Multiple extends true ? string[] : string | undefined;
  /** 默认值 */
  defaultValue?: Multiple extends true ? string[] : string | undefined;
  /** 选择模式 */
  selectMode?: 'checkbox' | 'radio' | 'single';
  /** 手动控制的选项列表 */
  treeData?: TreeSelectOption[];
  /** 控制下拉框的打开状态 */
  open?: boolean;
  /** 打开状态改变时的回调函数 */
  onOpenChange?: (open: boolean) => void;
  placeholder?: string;
  /** 加载中组件 */
  loadingIndicator?: React.ReactNode;
  /** 空状态组件 */
  emptyIndicator?: React.ReactNode;
  /** 异步搜索的防抖时间。仅在设置 `onSearch` 时生效。 */
  delay?: number;
  /**
   * 仅在设置 `onSearch` 属性时生效。在 `onFocus` 时触发搜索。
   * 例如：当用户点击输入框时，会触发搜索以获取初始选项。
   **/
  triggerSearchOnFocus?: boolean;
  /** 异步搜索 */
  onSearch?: (value: string, treeData: TreeSelectOption[]) => Promise<TreeSelectOption[]>;
  onChange?: (value: string[] | string | undefined) => void;
  /** 失去焦点时的回调函数 */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
  /** 隐藏清除全部按钮 */
  disableClearable?: boolean;
  /** 多选时的展示模式 */
  displayMode?: 'tag' | 'text';
  /** 多选时文本展示的分隔符 */
  separator?: string;
  /** 弹出框的宽度，可以是数字（单位：px）或 CSS 宽度值 */
  popupWidth?: number | string;
  /** 弹出框的最大宽度，可以是数字（单位：px）或 CSS 宽度值 */
  popupMaxWidth?: number | string;
  /** 组件的大小 */
  size?: 'sm' | 'md' | 'lg';
  /** 单选时是否显示父级路径，例如：中国/北京 */
  showParentPath?: boolean;
  /** 下拉菜单的挂载节点，默认挂载到 body */
  portalContainer?: HTMLElement | null;
  // /** 是否启用虚拟化 */
  // virtual?: boolean;
  // /** 虚拟化列表项的高度 */
  // itemHeight?: number;

  // Tree 相关属性
  /** 默认展开的节点 */
  defaultExpandedKeys?: string[];
  /** 默认选中的节点 */
  defaultSelectedKeys?: string[];
  /** 默认展开所有节点 */
  defaultExpandAll?: boolean;
  /** 选择节点时的回调函数 */
  onSelect?: (
    selectedKeys: string[],
    info: { selected: boolean; node: TreeSelectNodeProps; isLeaf: boolean },
  ) => void;
  /** 展开/收起节点时的回调函数 */
  onExpand?: (expandedKeys: string[], node: TreeSelectNodeProps) => void;
  /** 是否严格遵循父子节点不关联 */
  checkStrictly?: boolean;
  /** 是否自动展开父节点 */
  autoExpandParent?: boolean;
  /** 自定义标题渲染函数 */
  titleRender?: (item: TreeSelectNodeProps, isLeaf?: boolean) => React.ReactNode;
  /** 自定义选中项标签的 className */
  selectedTagClassName?: string;
  /** 命令行组件的属性 */
  commandProps?: React.ComponentPropsWithoutRef<typeof Command>;
  /** `CommandInput` 组件的属性 */
  inputProps?: Omit<
    React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>,
    'value' | 'placeholder' | 'disabled'
  >;
}

export interface TreeSelectRef {
  selectedValue: TreeSelectOption[];
  input: HTMLInputElement;
  focus: () => void;
  reset: () => void;
}
