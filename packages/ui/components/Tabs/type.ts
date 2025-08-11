import type { ReactNode, HTMLAttributes } from 'react';

export interface TabItemType {
  key: string;
  label: ReactNode;
  children: ReactNode;
  disabled?: boolean;
  disabledClose?: boolean;
  hidden?: boolean;
}

export interface TabsClassName {
  tabList?: string;
  tabContent?: string;
}

export interface TabsProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'onChange'> {
  tabs: TabItemType[];
  fullHeight?: boolean; // 内容区域是否根据父元素撑满高度
  disabledAdd?: boolean;
  type?: 'line' | 'button' | 'card';
  size?: 'small' | 'large';
  direction?: 'right';
  defaultActiveKey?: string;
  scrollable?: boolean;
  activeKey?: string;
  widthLimited?: boolean;
  closable?: boolean;
  classes?: TabsClassName;
  onOrder?: (tabs: TabItemType[]) => void;
  onAdd?: () => void;
  onRemove?: (key: string) => void;
  onChange?: (key: string) => void;
  onActiveTabKey?: (key: string) => void;
}
