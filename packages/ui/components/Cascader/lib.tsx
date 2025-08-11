import lodash from 'lodash';
import React, { useMemo, useState } from 'react';
import { cn } from '../../lib/utils';
import type { valueType, CascaderOptionProps, Key2OptionMap, Key2OptionMapValue } from './type';

/**
 * 高亮关键词
 * @param str 字符串
 * @param lowerKeyword 关键词
 * @returns 高亮后的字符串
 */
const highlightKeyword = (str: string, lowerKeyword: string) => {
  const cells = lodash.flatMap(lodash.split(str.toLowerCase(), lowerKeyword), (part, index) =>
    index === 0 ? [part] : [lowerKeyword, part],
  );

  const fillCells = lodash.reduce(
    cells,
    (result: React.ReactNode[], cell, index) => {
      const start = lodash.sumBy(lodash.slice(cells, 0, index), 'length');
      const end = start + cell.length;
      const originWord = str.slice(start, end);

      const node = (
        <span className={cn({ 'text-text-1 font-medium': index % 2 === 1 })} key={index}>
          {originWord}
        </span>
      );

      result.push(node);
      return result;
    },
    [],
  );

  return fillCells;
};

const defaultFilter = <T extends valueType>(inputValue: string, path: CascaderOptionProps<T>[]) => {
  return path.some((option) => {
    // 获取选项的标签，可能是字符串或ReactNode
    const label = option.label?.toString() || '';
    // 检查标签是否包含搜索关键词（忽略大小写）
    return label.toLowerCase().includes(inputValue.toLowerCase());
  });
};

// 选择回调后输入框 render
const defaultDisplayRender = (labels: React.ReactNode[]) => {
  if (lodash.every(labels, (label) => lodash.includes(['string', 'number'], typeof label))) {
    return lodash.join(labels, ' / ');
  }
  return labels.reduce((list: React.ReactNode[], label: React.ReactNode, index: number) => {
    const keyedLabel = React.isValidElement(label)
      ? React.cloneElement(label, { key: index })
      : label;

    if (index === 0) {
      return [keyedLabel];
    }

    return [...list, '/', keyedLabel];
  }, []);
};

// 搜索时下拉框选项 render
const defaultSearchRender = <T extends valueType>(
  search: string,
  path: CascaderOptionProps<T>[],
) => {
  const optionList: React.ReactNode[] = [];
  const lower = search.toLowerCase();

  path.forEach((node, index) => {
    if (index !== 0) {
      optionList.push(' / ');
    }

    let _label = lodash.get(node, 'label');
    const type = typeof _label;
    if (type === 'string' || type === 'number') {
      _label = highlightKeyword(String(_label), lower);
    }

    optionList.push(_label);
  });
  return optionList;
};

// 获取路径字符串用于显示（仅在多选时计算）
function getPathString<T extends valueType>(options: CascaderOptionProps<T>[]) {
  return options
    .map((option) => (typeof option.label === 'string' ? option.label : String(option.label)))
    .join(' / ');
}

/**
 * 将选中的值转换为选项路径
 * @param valueCells 选中的值
 * @param options 选项数据
 * @returns 选项路径
 */
const toPathOptions = <T extends valueType>(
  valueCells: T[],
  options: CascaderOptionProps<T>[],
): CascaderOptionProps<T>[] => {
  let currentList = options;
  const valueOptions: CascaderOptionProps<T>[] = [];

  lodash.forEach(valueCells, (valueCell) => {
    const foundOption = lodash.find(currentList, (option) => {
      return option.value === valueCell;
    });
    if (foundOption) {
      valueOptions.push(foundOption);
      currentList = foundOption?.children || [];
    } else {
      currentList = [];
    }
  });

  return valueOptions;
};

/**
 * 构建键值到选项的映射对象
 *
 * @param options - 级联选项数组
 * @param pathParentValues - 当前选项的所有父选项值路径
 * @returns 键值到选项的映射对象
 */
function buildKey2OptionMap<T extends valueType>(
  options?: CascaderOptionProps<T>[],
  pathParentValues: T[] = [],
): Key2OptionMap<T> {
  if (!options || options.length === 0) return {};

  return options.reduce((map: Key2OptionMap<T>, option) => {
    const optionProps: Key2OptionMapValue<T> = {
      ...option,
      children: option.children || [],
      pathParentValues,
    };

    return {
      ...map,
      [String(option.value)]: optionProps,
      ...(option.children?.length
        ? buildKey2OptionMap(option.children, [...pathParentValues, option.value])
        : {}),
    };
  }, {});
}

/**
 * 获取所有子选项的值
 *
 * @param option - 父选项
 * @param key2OptionMap - 键值到选项的映射对象
 * @returns 所有子选项值的数组
 */
function getAllChildValues<T extends valueType = valueType>(
  option: CascaderOptionProps<T>,
  key2OptionMap: Key2OptionMap<T>,
): Set<T> {
  const nodes = new Set<T>();

  const collectChildKeys = (children: CascaderOptionProps<T>[]): void => {
    children.forEach((child) => {
      const item = key2OptionMap[child.value];
      if (!item || item.disabled) return;

      nodes.add(child.value);
      if (item.children?.length) {
        collectChildKeys(item.children);
      }
    });
  };

  if (option.children?.length) {
    collectChildKeys(option.children);
  }

  return nodes;
}

/**
 * 更新父选项的选中状态
 * 这个函数处理从当前节点到根节点的所有父节点的状态更新。需要从下往上处理，以确保子节点的状态正确影响父节点
 * @param value - 当前操作的值
 * @param selectedValues - 当前选中的值数组
 * @param indeterminateValuesSet - 半选状态的值集合
 * @param key2OptionMap - 键值到选项的映射对象
 */
function updateParentValues<T extends valueType = valueType>(
  value: T,
  selectedValues: Set<T>,
  indeterminateValuesSet: Set<T>,
  key2OptionMap: Key2OptionMap<T>,
): void {
  const mapOption = key2OptionMap[String(value)];
  if (!mapOption?.pathParentValues.length) return;

  // 获取所有父节点的值（从近到远）
  const parentValues = [...mapOption.pathParentValues].reverse();

  for (const parentValue of parentValues) {
    const parentOption = key2OptionMap[String(parentValue)];
    if (!parentOption || parentOption.disabled) continue;

    // 获取父节点的所有直接子节点
    const childOptions = parentOption.children || [];

    let totalChildren = 0;
    let selectedChildren = 0;
    let hasIndeterminateChild = false;

    // 统计子节点的选中状态
    for (const child of childOptions) {
      if (child.disabled) continue;

      totalChildren++;

      if (selectedValues.has(child.value)) {
        selectedChildren++;
      } else if (indeterminateValuesSet.has(child.value)) {
        hasIndeterminateChild = true;
      }
    }

    // 所有子节点都被选中
    if (totalChildren > 0 && selectedChildren === totalChildren) {
      // 父节点完全选中
      if (!selectedValues.has(parentValue)) {
        selectedValues.add(parentValue);
      }
      indeterminateValuesSet.delete(parentValue);
    }
    // 部分子节点被选中或者有半选的子节点
    else if (selectedChildren > 0 || hasIndeterminateChild) {
      // 父节点半选
      indeterminateValuesSet.add(parentValue);
      // 确保父节点不在选中列表中
      if (selectedValues.has(parentValue)) {
        selectedValues.delete(parentValue);
      }
    }
    // 没有子节点被选中
    else {
      // 父节点未选中
      indeterminateValuesSet.delete(parentValue);
      // 确保父节点不在选中列表中
      if (selectedValues.has(parentValue)) {
        selectedValues.delete(parentValue);
      }
    }
  }
}

/**
 * 根据选中值计算有效值， 防止传入的值不在选项中
 *
 * @param value - 当前选中的值
 * @param key2OptionMap - 键值到选项的映射对象
 * @returns 处理后的有效值数组
 */
function getValidValue<T extends valueType = valueType>(
  value: T[] | undefined,
  key2OptionMap: Key2OptionMap<T>,
): T[] {
  if (!value || !Array.isArray(value)) return [];

  // 过滤出有效的值（即在选项中存在的值）
  return value.filter((val) => key2OptionMap[String(val)]);
}

/**
 * 根据 value 值计算出对应的 selectedKeys
 *
 * @param value - 当前值，
 * @param key2OptionMap - 键值到选项的映射对象
 * @param multiple - 是否为多选模式
 * @returns 包含所有相关节点键值的数组及半选状态的节点数组
 */
function getSelectedKeysFromValue<T extends valueType = valueType>(
  value: T[] | undefined,
  key2OptionMap: Key2OptionMap<T>,
  multiple = false,
): { selectedValues: T[]; indeterminateValues: T[] } {
  if (!value || value.length === 0) {
    return { selectedValues: [], indeterminateValues: [] };
  }

  if (!multiple) {
    // 单选模式只返回原始值，不处理级联关系
    return {
      selectedValues: getValidValue(value, key2OptionMap),
      indeterminateValues: [],
    };
  }

  // 收集所有选中的值和它们的子值
  const selectedValuesSet = new Set<T>();
  const indeterminateValuesSet = new Set<T>();

  // 处理每个选中的值
  value.forEach((val) => {
    const option = key2OptionMap[String(val)];
    if (!option) return;

    // 添加当前值
    selectedValuesSet.add(val);

    // 添加所有子值
    if (option.children?.length) {
      getAllChildValues(option, key2OptionMap).forEach((childVal) => {
        selectedValuesSet.add(childVal);
      });
    }
  });

  // 根据选中的值计算父节点的状态
  value.forEach((val) => {
    updateParentValues(val, selectedValuesSet, indeterminateValuesSet, key2OptionMap);
  });

  return {
    selectedValues: Array.from(selectedValuesSet),
    indeterminateValues: Array.from(indeterminateValuesSet),
  };
}

/**
 * 多选时，根据选中/取消选中操作更新所有相关节点的状态
 *
 * @param checked - 是否选中
 * @param option - 操作的目标节点
 * @param key2OptionMap - 键值到节点属性的映射对象
 * @param selectedKeys - 当前已选中的节点键值数组
 * @param indeterminateKeys - 当前半选的节点键值数组
 * @returns 更新后的选中和半选节点键值对象
 */
function getAllSelectedKeysByCheck<T extends valueType = valueType>(
  checked: boolean,
  option: CascaderOptionProps<T>,
  key2OptionMap: Key2OptionMap<T>,
  selectedKeys: T[],
  indeterminateKeys: T[],
): {
  selectedKeys: T[];
  indeterminateKeys: T[];
} {
  // 创建可修改的集合
  const selectedSet = new Set<T>(selectedKeys);
  const indeterminateSet = new Set<T>(indeterminateKeys);
  const { value } = option;

  // 获取所有子节点的键
  const childKeys = getAllChildValues(option, key2OptionMap);

  if (checked) {
    // 选中操作：添加当前节点及其所有子节点
    selectedSet.add(value);
    indeterminateSet.delete(value);

    // 添加所有子节点
    if (option.children?.length) {
      childKeys.forEach((childVal) => {
        selectedSet.add(childVal);
        indeterminateSet.delete(childVal);
      });
    }
  } else {
    // 取消选中操作：移除当前节点及其所有子节点
    selectedSet.delete(value);
    indeterminateSet.delete(value);

    // 移除所有子节点
    if (option.children?.length) {
      childKeys.forEach((childVal) => {
        selectedSet.delete(childVal);
        indeterminateSet.delete(childVal);
      });
    }
  }

  // 更新所有相关父节点的状态
  updateParentValues(option.value, selectedSet, indeterminateSet, key2OptionMap);

  return {
    selectedKeys: Array.from(selectedSet),
    indeterminateKeys: Array.from(indeterminateSet),
  };
}

/**
 * 获取选中的 option
 *
 * @param selectedKeys - 选中的键值数组
 * @param key2OptionMap - 键值到选项的映射对象
 * @returns 选中的路径信息的数组, 多选的时候返回二维数组
 */

function getOptionFromSelectedKeys<T extends valueType = valueType>(
  selectedKeys: T[],
  key2OptionMap: Key2OptionMap<T>,
): CascaderOptionProps<T>[][] {
  // 空选择直接返回空数组
  if (!selectedKeys || selectedKeys.length === 0) {
    return [];
  }

  return selectedKeys
    .map((key) => {
      const option = key2OptionMap[key];
      if (!option) return null;

      // 如果选项有子节点且不是最终选择，则跳过
      if (option.children && option.children.length > 0) {
        // 检查子节点是否也在选中列表中
        const hasSelectedChild = option.children.some((child) =>
          selectedKeys.includes(child.value),
        );

        // 如果有选中的子节点，则跳过当前节点
        if (hasSelectedChild) return null;
      }

      // 构建完整路径
      const fullPath: CascaderOptionProps<T>[] = [];

      // 添加所有父节点
      if (option.pathParentValues && option.pathParentValues.length > 0) {
        for (const parentKey of option.pathParentValues) {
          const parentOption = key2OptionMap[parentKey];
          if (parentOption) {
            fullPath.push(parentOption);
          }
        }
      }

      // 添加当前选中的节点
      fullPath.push(option);
      return fullPath;
    })
    .filter(Boolean) as CascaderOptionProps<T>[][];
}

/**
 * 根据选中的键值计算出对应的值
 *
 * @param selectedKeys - 选中的键值数组
 * @param key2OptionMap - 键值到选项的映射对象
 * @returns 选中的值数组
 */
function getValueFromSelectedKeys<T extends valueType = valueType>(
  selectedKeys: T[],
  key2OptionMap: Key2OptionMap<T>,
): T[] {
  const valueSet = new Set<T>();
  const excludeSet = new Set<T>();

  // 第一次遍历：识别父节点已选中的节点
  selectedKeys.forEach((key) => {
    const option = key2OptionMap[key];
    if (!option) return;

    const parentSelected = option.pathParentValues?.some((parentKey) =>
      selectedKeys.includes(parentKey),
    );

    if (parentSelected) {
      // 如果父节点已选中，则将该键添加到排除集合中
      excludeSet.add(key);
    } else {
      // 否则，将它的值添加到结果集合中
      valueSet.add(option.value);
    }
  });

  // 只返回没有选中的父节点的选项的值
  return Array.from(valueSet).filter((key) => !excludeSet.has(key));
}

/**
 * 级联选择器的状态管理Hook
 * 统一管理选择状态相关的逻辑，减少主组件中的状态复杂度
 * @param options 选项数据
 * @param defaultValue 默认值
 * @param value 受控值
 * @param multiple 是否多选
 */
function useCascaderState<T extends valueType>(
  options: CascaderOptionProps<T>[],
  defaultValue: T[],
  value: T[] | undefined,
  multiple: boolean,
) {
  // 构建选项映射表用于快速查找
  const key2OptionMap = useMemo(() => buildKey2OptionMap(options), [options]);

  const res = useMemo(
    () => getSelectedKeysFromValue<T>(value || defaultValue, key2OptionMap, multiple),
    [value, defaultValue, key2OptionMap, multiple],
  );

  // 计算选项路径
  const initialSelectedOptions = useMemo(
    () => getOptionFromSelectedKeys<T>(res.selectedValues, key2OptionMap),
    [res.selectedValues, key2OptionMap],
  );

  const [innerSelectedKeys, setInnerSelectedKeys] = useState<T[]>(() => res.selectedValues);
  const [innerIndeterminateKeys, setInnerIndeterminateKeys] = useState<T[]>(
    () => res.indeterminateValues,
  );

  // 记录选中的选项路径,存放的是 options, 单选时只会有一个路径
  const [selectedOptions, setSelectedOptions] =
    useState<CascaderOptionProps<T>[][]>(initialSelectedOptions);

  // 最终值：受控或非受控, 存放的是 options 的 value, eg ['0', '0-1', '0-1-1']
  const finalValues = useMemo(() => value ?? innerSelectedKeys, [innerSelectedKeys, value]);

  return {
    key2OptionMap,
    innerSelectedKeys,
    setInnerSelectedKeys,
    innerIndeterminateKeys,
    setInnerIndeterminateKeys,
    selectedOptions,
    setSelectedOptions,
    finalValues,
  };
}

/**
 * 搜索选项管理Hook
 * 根据搜索关键词过滤可用选项
 * @param searchValue 搜索关键词
 * @param options 原始选项数据
 * @param filterOption 过滤函数
 */
function useSearchOptions<T extends valueType>(
  searchValue: string | undefined,
  options: CascaderOptionProps<T>[],
  filterOption: (inputValue: string, path: CascaderOptionProps<T>[]) => boolean,
) {
  return useMemo(() => {
    // 没有搜索词时返回空数组
    if (!searchValue) return [];

    const filteredOptions: CascaderOptionProps<T>[] = [];

    // 递归搜索选项
    const getSearchOptions = (
      list: CascaderOptionProps<T>[], // 当前遍历的选项列表
      pathOptions: CascaderOptionProps<T>[], // 当前路径
      parentDisabled = false, // 父级是否禁用
    ) => {
      lodash.forEach(list, (option) => {
        const { children, disabled } = option;
        const connectedPathOptions = [...pathOptions, option]; // 完整路径
        const mergedDisabled = parentDisabled || disabled; // 合并禁用状态
        const hasChildren = children && children.length > 0; // 是否有子选项

        // 如果是叶子节点且符合过滤条件，添加到结果中
        if (!hasChildren && filterOption(searchValue, connectedPathOptions)) {
          filteredOptions.push({
            ...option,
            disabled: mergedDisabled,
            label: defaultSearchRender(searchValue, connectedPathOptions), // 高亮匹配文本
            searchMark: connectedPathOptions, // 保存路径信息，用于显示
            children: undefined,
          });
        }

        // 如果有子节点，继续递归搜索
        if (hasChildren) {
          getSearchOptions(children, connectedPathOptions, mergedDisabled);
        }
      });
    };

    getSearchOptions(options, []);
    return filteredOptions;
  }, [searchValue, filterOption, options]);
}

/**
 * 选项列管理Hook
 * 根据激活项生成级联列表
 * @param activeValueCells 当前激活的单元格值
 * @param mergedOptions 合并后的选项数据
 */
function useOptionColumns<T extends valueType>(
  activeValueCells: React.Key[],
  mergedOptions: CascaderOptionProps<T>[],
) {
  return useMemo(() => {
    // 初始列是根选项
    const optionList = [{ options: mergedOptions }];
    let currentList = mergedOptions;

    // 根据激活的值构建级联列
    for (const activeValueCell of activeValueCells) {
      // 查找当前激活的选项
      const currentOption = currentList.find((option) => option.value === activeValueCell);

      // 获取子选项
      const subOptions = currentOption?.children;
      // 如果没有子选项，终止循环
      if (!subOptions?.length) break;

      // 更新当前列表为子选项，并添加到级联列中
      currentList = subOptions;
      optionList.push({ options: subOptions });
    }

    return optionList;
  }, [activeValueCells, mergedOptions]);
}

export { highlightKeyword, defaultFilter, defaultDisplayRender, defaultSearchRender };
export { toPathOptions, getPathString };
export {
  getSelectedKeysFromValue,
  getAllSelectedKeysByCheck,
  getOptionFromSelectedKeys,
  getValueFromSelectedKeys,
};
export { useCascaderState, useSearchOptions, useOptionColumns };
