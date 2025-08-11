import type React from 'react';

export interface TreeNodeProps {
  key: string;
  title: React.ReactNode;
  children?: TreeNodeProps[];
  checkable?: boolean;
  disabled?: boolean;
  tip?: string;
}

export interface BasicTree {
  selectable?: boolean;
  /**
   * 选择模式
   * @default 'single'
   * @description 单选、多选、复选
   * 复选时，只能选择叶子节点，一个父节点下的所有子节点只能选择一个
   */
  selectMode?: 'single' | 'checkbox' | 'radio';
  icon?: React.ReactNode;
  selectedKeys?: string[];
  value?: string[] | string;
  titleRender?: (item: TreeNodeProps, isLeaf?: boolean) => React.ReactNode;
  onExpand?: (expandedKeys: string[], node: TreeNodeProps) => void;
  expandedKeys?: string[];
  disabled?: boolean;
  expandOnClickNode?: boolean;
  treeItemClassName?: string;
}

export type TreeProps = BasicTree & {
  defaultExpandedKeys?: string[];
  className?: string;
  treeData: TreeNodeProps[];
  defaultSelectedKeys?: string[];
  defaultValue?: string[] | string;
  defaultExpandAll?: boolean;
  onSelect?: (
    selectedKeys: string[],
    info: { selected: boolean; node: TreeNodeProps; isLeaf: boolean },
  ) => void;
  onChange?: (value: string[] | string) => void;
  checkStrictly?: boolean;
  autoExpandParent?: boolean;
};

export type TreeItemProps = TreeProps & {
  treeData: TreeNodeProps[];
  defaultExpandedItemKeys?: string[];
};

export type TreeContextProps = BasicTree & {
  indeterminateKeys?: string[];
  value?: string[] | string;
  onSelect?: (selected: boolean, node: TreeNodeProps, isLeaf: boolean) => void;
};

export type Key2nodePropsType = Record<string, TreeNodeProps & { pathParentKeys: string[] }>;
