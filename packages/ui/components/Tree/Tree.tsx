'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';
import type { TreeProps, TreeNodeProps } from './type';
import TreeList from './TreeList';
import { TreeContext } from './TreeContext';
import {
  buildKey2NodeProps,
  getAllSelectedKeysByCheck,
  getValueFromSelectedKeys,
  getInitExpandedKeys,
  getInitCheckedKeys,
  getSelectedKeysFromValue,
} from './lib';

/**
 * Owner: 樊梦文
 *
 * Figma: https://www.figma.com/file/Do849NlMKTXCv8djOFIFWA/%E9%80%9A%E7%94%A8%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?type=design&node-id=11723-60156&mode=design
 *
 * 树组件，用于展示树结构。
 */
const Tree = React.forwardRef<HTMLDivElement, TreeProps>(
  (
    {
      treeData,
      defaultExpandedKeys,
      defaultExpandAll = false,
      expandedKeys,
      defaultSelectedKeys,
      selectedKeys: controlledSelectedKeys,
      defaultValue,
      value: controlledValue,
      onChange,
      selectable = false,
      selectMode = 'single',
      checkStrictly = false,
      icon,
      titleRender,
      onSelect,
      onExpand,
      disabled,
      className,
      treeItemClassName,
      expandOnClickNode = false,
      autoExpandParent = true,
    },
    ref,
  ) => {
    const key2nodeProps = React.useMemo(() => buildKey2NodeProps(treeData), [treeData]);

    const [innerSelectedKeys, setInnerSelectedKeys] = React.useState<string[]>(() => {
      const selectedKeys = controlledSelectedKeys || defaultSelectedKeys;
      const result = getInitCheckedKeys(
        selectedKeys ?? [],
        selectMode,
        checkStrictly,
        key2nodeProps,
      );
      return result.selectedKeys;
    });
    const [innerIndeterminateKeys, setInnerIndeterminateKeys] = React.useState<string[]>(() => {
      const selectedKeys = controlledSelectedKeys || defaultSelectedKeys;
      const result = getInitCheckedKeys(
        selectedKeys ?? [],
        selectMode,
        checkStrictly,
        key2nodeProps,
      );
      return result.indeterminateKeys;
    });
    const [innerExpandedKeys, setInnerExpandedKeys] = React.useState<string[]>(() => {
      return getInitExpandedKeys(
        defaultExpandedKeys ?? [],
        treeData,
        defaultExpandAll,
        autoExpandParent,
        key2nodeProps,
      );
    });
    const [innerValue, setInnerValue] = React.useState<string[] | string | undefined>(defaultValue);

    const value = controlledValue || innerValue;

    const handleChangeSelectedKeysAndValue = React.useCallback(
      (
        oriSelectedKeys: string[],
        { selected, node, isLeaf }: { selected: boolean; node: TreeNodeProps; isLeaf: boolean },
      ) => {
        let lastSelectedKeys = oriSelectedKeys;

        const { selectedKeys, indeterminateKeys } = getAllSelectedKeysByCheck(
          selected,
          node,
          key2nodeProps,
          selectMode,
          checkStrictly,
          oriSelectedKeys,
          innerIndeterminateKeys,
        );

        lastSelectedKeys = selectedKeys;
        setInnerIndeterminateKeys(indeterminateKeys);

        setInnerSelectedKeys(lastSelectedKeys);
        // 计算并更新 value 值
        const newValue = getValueFromSelectedKeys(
          lastSelectedKeys,
          key2nodeProps,
          checkStrictly,
          selectMode,
        );
        if (!controlledValue) {
          setInnerValue(newValue);
        }
        onChange?.(newValue);

        onSelect && onSelect(lastSelectedKeys, { selected, node, isLeaf });
      },
      [
        checkStrictly,
        controlledValue,
        innerIndeterminateKeys,
        key2nodeProps,
        onChange,
        onSelect,
        selectMode,
      ],
    );

    // React.useEffect(() => {
    //   const oriSelectedKeys = controlledSelectedKeys || defaultSelectedKeys;
    //   if (!selectable || !oriSelectedKeys?.length) return;
    //   if (multiple && !checkStrictly) {
    //     const result = getInitCheckedKeys(
    //       oriSelectedKeys,
    //       selectMode,
    //       checkStrictly,
    //       key2nodeProps,
    //     );
    //     setInnerSelectedKeys(result.selectedKeys);
    //     setInnerIndeterminateKeys(result.indeterminateKeys);
    //   }
    // }, [
    //   controlledSelectedKeys,
    //   defaultSelectedKeys,
    //   selectable,
    //   multiple,
    //   checkStrictly,
    //   key2nodeProps,
    //   selectMode,
    // ]);

    React.useEffect(() => {
      setInnerExpandedKeys(
        getInitExpandedKeys(
          defaultExpandedKeys || [],
          treeData,
          defaultExpandAll,
          autoExpandParent,
          key2nodeProps,
        ),
      );
    }, [defaultExpandedKeys, treeData, defaultExpandAll, autoExpandParent, key2nodeProps]);

    // 处理受控的 value 属性
    React.useEffect(() => {
      if (controlledValue) {
        // 如果提供了受控的 value，则根据 value 计算出对应的 selectedKeys
        const selectedKeysFromValue = getSelectedKeysFromValue(
          controlledValue,
          key2nodeProps,
          selectMode,
        );

        if (!controlledSelectedKeys) {
          setInnerSelectedKeys(selectedKeysFromValue);

          // 同步计算半选状态
          const result = getInitCheckedKeys(
            selectedKeysFromValue ?? [],
            selectMode,
            checkStrictly,
            key2nodeProps,
          );
          setInnerIndeterminateKeys(result.indeterminateKeys);
        }
      }
    }, [controlledValue, key2nodeProps, controlledSelectedKeys, selectMode, checkStrictly]);

    const finalSelectedKeys = controlledSelectedKeys || innerSelectedKeys;
    const finalIndeterminateKeys = innerIndeterminateKeys;
    const finalExpandedKeys = expandedKeys || innerExpandedKeys;
    const finalValue = value;

    const handleSelect = React.useCallback(
      (select: boolean, node: TreeNodeProps, isLeaf: boolean) => {
        if (!selectable || disabled) return;
        let changeSelectKeys = finalSelectedKeys;

        if (selectMode === 'checkbox') {
          changeSelectKeys = select
            ? [...(finalSelectedKeys || []), node.key]
            : (finalSelectedKeys || []).filter((key) => key !== node.key);
        } else if (selectMode === 'single') {
          changeSelectKeys = select ? [node.key] : [];
        } else if (selectMode === 'radio') {
          if (!isLeaf) {
            return;
          }
          if (select) {
            // 找到父元素的其他子元素
            const parentPathKeys = key2nodeProps[node.key].pathParentKeys;
            const parentNode = key2nodeProps[parentPathKeys[parentPathKeys.length - 1]];
            // 从父元素的子元素中找到其他子元素
            const otherChildKeys = parentNode.children
              ?.filter((child) => child.key !== node.key)
              .map((child) => child.key);
            // 从 finalSelectedKeys 中剔除其他子元素
            changeSelectKeys = finalSelectedKeys?.filter((key) => !otherChildKeys?.includes(key));
            // 添加当前元素
            changeSelectKeys = [...changeSelectKeys, node.key];
          } else {
            changeSelectKeys = finalSelectedKeys?.filter((key) => key !== node.key);
          }
        }
        handleChangeSelectedKeysAndValue(changeSelectKeys, { selected: select, node, isLeaf });
      },
      [
        selectable,
        disabled,
        finalSelectedKeys,
        selectMode,
        handleChangeSelectedKeysAndValue,
        key2nodeProps,
      ],
    );

    const handelExpand = React.useCallback(
      (expandedKeys: string[], node: TreeNodeProps) => {
        onExpand && onExpand(expandedKeys, node);
        setInnerExpandedKeys(expandedKeys);
      },
      [onExpand],
    );

    return (
      <TreeContext.Provider
        value={{
          selectable,
          selectMode,
          selectedKeys: finalSelectedKeys,
          // 如果选中的节点为空，则半选状态也为空
          indeterminateKeys: finalSelectedKeys.length > 0 ? finalIndeterminateKeys : [],
          expandedKeys: finalExpandedKeys,
          value: finalValue,
          onSelect: handleSelect,
          icon,
          titleRender,
          onExpand: handelExpand,
          disabled,
          expandOnClickNode,
          treeItemClassName,
        }}
      >
        <div className={cn('text-body relative text-text-1', className)} ref={ref}>
          <TreeList level={0} treeData={treeData} />
        </div>
      </TreeContext.Provider>
    );
  },
);

Tree.displayName = 'Tree';
export default Tree;
export type { TreeNodeProps, TreeProps };
