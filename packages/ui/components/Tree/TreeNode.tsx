'use client';

import React, { useContext, useMemo } from 'react';
import { InfoLine16 } from '@xsky/eris-icons';
import { Checkbox } from '../Checkbox';
import { Tooltip } from '../Tooltip';
import { cn } from '../../lib/utils';
import type { TreeNodeProps } from './type';
import { TreeContext } from './TreeContext';
import { Radio } from '../Radio';

const TreeNode = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    node: TreeNodeProps;
    isLeaf?: boolean;
  }
>((props, ref) => {
  const { node, isLeaf } = props;
  const {
    selectable,
    disabled,
    selectMode,
    selectedKeys,
    indeterminateKeys,
    value,
    icon,
    onSelect,
    titleRender,
  } = useContext(TreeContext);

  const isSelected = useMemo(() => {
    return !!selectedKeys?.includes(node.key);
  }, [selectedKeys, node.key]);

  const isIndeterminate = useMemo(() => {
    return !!indeterminateKeys?.includes(node.key);
  }, [indeterminateKeys, node.key]);

  const handleSelect = () => {
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

    if (!isDisabled) {
      onSelect && onSelect(selected, node, !!isLeaf);
    }
  };

  const isDisabled = useMemo(() => {
    return disabled || node.disabled;
  }, [disabled, node.disabled]);

  const showCheckbox = useMemo(() => {
    return selectable && selectMode === 'checkbox' && node.checkable !== false;
  }, [selectable, selectMode, node.checkable]);

  const showRadio = useMemo(() => {
    return selectable && selectMode === 'radio' && node.checkable !== false;
  }, [selectable, selectMode, node.checkable]);

  if (!node) return null;

  return (
    <div className="flex items-center truncate" ref={ref}>
      {showCheckbox ? (
        <span className="flex items-center" onClick={(ev) => ev.stopPropagation()}>
          <Checkbox
            checked={isSelected}
            className="mr-[4px]"
            data-value={node.key}
            disabled={isDisabled}
            indeterminate={isIndeterminate}
            onChange={handleSelect}
          />
        </span>
      ) : null}
      {showRadio && isLeaf ? (
        <span className="flex items-center" onClick={(ev) => ev.stopPropagation()}>
          <Radio
            checked={isSelected}
            className="mr-[4px]"
            data-value={node.key}
            disabled={isDisabled}
            onChange={handleSelect}
            value={node.key}
          />
        </span>
      ) : null}

      {icon}
      <div className={cn('truncate', isDisabled && !showCheckbox && !showRadio && 'opacity-40')}>
        {typeof titleRender === 'function' ? titleRender(node, isLeaf) : node.title}
        {node.tip ? (
          <Tooltip title={node.tip}>
            <InfoLine16 className="text-icon-outlined-displayed ml-[4px] inline shrink-0 pt-[1px] align-text-top" />
          </Tooltip>
        ) : null}
      </div>
    </div>
  );
});

TreeNode.displayName = 'TreeNode';
export default TreeNode;
