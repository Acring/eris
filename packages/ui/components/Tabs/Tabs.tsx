'use client';
import React, { forwardRef, useEffect, useState } from 'react';
import lodash from 'lodash';
import DraggableTabs from './DraggableTabs';
import NormalTabs from './NormalTabs';
import type { TabsProps } from './type';

/**
 * Owner: 陈胜
 *
 * Figma: https://www.figma.com/file/Do849NlMKTXCv8djOFIFWA/%E9%80%9A%E7%94%A8%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?type=design&node-id=11723-60164&mode=design
 *
 * 标签页组件
 */
const Tabs = forwardRef<HTMLDivElement, TabsProps>((props, ref) => {
  const [activeTabKey, setActiveTabKey] = useState(props.activeKey);
  const defaultValue =
    typeof props.activeKey !== 'undefined'
      ? props.activeKey
      : typeof props.defaultActiveKey === 'undefined'
        ? lodash.get(props.tabs, `0.key`, '')
        : props.defaultActiveKey;

  useEffect(() => {
    // 受控属性，判断是否需要更新
    if (typeof props.activeKey !== 'undefined') {
      setActiveTabKey(props.activeKey);
    }
  }, [props.activeKey]);

  const handleSetActiveTabKey = (key: string) => {
    // 受控属性，判断是否需要设置内部的选中状态
    if (typeof props.activeKey === 'undefined') {
      setActiveTabKey(key);
    }
    props.onChange?.(key);
  };

  const tabProps = {
    ...props,
    activeKey: activeTabKey,
    defaultActiveKey: defaultValue,
    onActiveTabKey: handleSetActiveTabKey,
  };

  if (props?.onOrder) {
    return <DraggableTabs ref={ref} {...tabProps} />;
  }
  return <NormalTabs ref={ref} {...tabProps} />;
});

Tabs.displayName = 'Tabs';

Tabs.defaultProps = {
  type: 'line',
  size: 'large',
  widthLimited: true,
  closable: false,
};

export default Tabs;
