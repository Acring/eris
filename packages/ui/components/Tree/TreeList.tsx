'use client';

import React, { useContext, useMemo } from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { cva } from 'class-variance-authority';
import TreeNode from './TreeNode';
import { cn } from '../../lib/utils';
import { AccordionContent, AccordionTrigger } from './Accordion';
import { TreeContext } from './TreeContext';
import type { TreeNodeProps } from './type';
import { getIndent } from './lib';

const TreeItemVariants = cva(cn('flex items-center p-[6px] rounded-sm'), {
  compoundVariants: [
    {
      selectable: true,
      disabled: false,
      className: 'hover:bg-tree-bg-hover active:bg-tree-bg-active cursor-pointer',
    },
    {
      selected: true,
      selectMode: 'single',
      className: 'bg-tree-bg-active',
    },
    {
      disabled: true,
      selectMode: 'single',
      className: 'cursor-not-allowed',
    },
  ],
  variants: {
    selected: {
      true: '',
      false: '',
    },
    disabled: {
      true: '',
      false: '',
    },
    selectMode: {
      checkbox: '',
      single: '',
      radio: '',
    },
    selectable: {
      true: '',
      false: '',
    },
  },
});

const TreeItem = React.forwardRef<HTMLDivElement, { node: TreeNodeProps; level: number }>(
  ({ node, level = 0 }, ref) => {
    const {
      onExpand,
      selectedKeys,
      value,
      onSelect,
      expandedKeys,
      treeItemClassName,
      selectable,
      disabled,
      expandOnClickNode,
      selectMode,
    } = useContext(TreeContext);

    const isSelected = useMemo(() => {
      return !!selectedKeys?.includes(node.key);
    }, [selectedKeys, node.key]);

    const isDisabled = useMemo(() => {
      return !!(disabled || node.disabled);
    }, [disabled, node.disabled]);

    const isExpanded = useMemo(() => {
      return !!expandedKeys?.includes(node.key);
    }, [expandedKeys, node.key]);

    const handleExpandKeysChange = (expandedKeys: string[]) => {
      onExpand?.(expandedKeys, node);
    };

    const toggleExpandKeys = () => {
      const newExpandedKeys = isExpanded
        ? expandedKeys?.filter((key) => key !== node.key)
        : [...(expandedKeys || []), node.key];
      handleExpandKeysChange(newExpandedKeys as string[]);
    };

    const handleItemClick = (isLeaf?: boolean) => {
      if (isDisabled) return;

      // 不可选状态下，点击树节点触发展开关闭
      if (!selectable && !isLeaf) {
        toggleExpandKeys();
        return;
      }

      let selected = false;
      if (selectMode === 'checkbox') {
        selected = !isSelected;
      } else if (selectMode === 'single') {
        if (Array.isArray(value) ? value?.includes(node.key) : value === node.key) {
          selected = false;
        } else {
          selected = true;
        }
      } else if (selectMode === 'radio') {
        selected = !isSelected;
      }

      if (selectable) {
        if (expandOnClickNode && !isLeaf) {
          toggleExpandKeys();
        }
        // 触发选中逻辑
        onSelect && onSelect(selected, node, !!isLeaf);
      }
    };

    return node?.children ? (
      <div className={cn('w-full')} ref={ref}>
        <AccordionPrimitive.Root
          data-testid="Tree-accordion"
          onValueChange={handleExpandKeysChange}
          type="multiple"
          value={expandedKeys}
        >
          <AccordionPrimitive.Item data-testid="Tree-accordionItem" value={node.key}>
            <div
              className={cn(
                TreeItemVariants({
                  selected: isSelected,
                  disabled: isDisabled,
                  selectMode,
                  selectable: true,
                }),
                treeItemClassName,
              )}
              data-testid="Tree-item"
              onClick={() => handleItemClick(false)}
            >
              <div className="flex items-center" style={{ paddingLeft: getIndent(level) }}>
                <AccordionTrigger>
                  <TreeNode node={node} />
                </AccordionTrigger>
              </div>
            </div>
            <AccordionContent>
              <TreeList level={level} treeData={node.children} />
            </AccordionContent>
          </AccordionPrimitive.Item>
        </AccordionPrimitive.Root>
      </div>
    ) : (
      //叶子节点
      <div
        className={cn(
          TreeItemVariants({ selected: isSelected, disabled: isDisabled, selectMode, selectable }),
          treeItemClassName,
        )}
        data-testid="Tree-item"
        onClick={() => handleItemClick(true)}
        style={{ paddingLeft: getIndent(level + 1) }}
      >
        <TreeNode isLeaf key={node.key} node={node} />
      </div>
    );
  },
);

TreeItem.displayName = 'TreeItem';

const TreeList = React.forwardRef<HTMLDivElement, { treeData: TreeNodeProps[]; level: number }>(
  ({ treeData, level }, ref) => {
    return (
      <div className="inline-block w-full" ref={ref} role="tree">
        {treeData?.map((node: TreeNodeProps) => (
          <TreeItem key={node.key} level={level + 1} node={node} />
        ))}
      </div>
    );
  },
);

TreeList.displayName = 'TreeList';
export default TreeList;
