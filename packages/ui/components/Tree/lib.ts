import type { TreeNodeProps } from './type';
import type { Key2nodePropsType } from './type';

// 默认缩进值，用于计算树节点的缩进距离
const DEFAULT_INDENT = 20;
// 默认内边距，用于计算树节点的基础内边距
const DEFAULT_PADDING = 6;

/**
 * 获取树结构中所有节点的键值
 *
 * @param nodes - 树节点数组
 * @returns 包含所有节点键值的数组
 *
 * 递归遍历整个树结构，收集每个节点的key值，包括所有子节点
 */
export function getAllKeys(nodes: TreeNodeProps[]): string[] {
  return (
    nodes?.reduce((keys: string[], node) => {
      return [...keys, node.key, ...(node.children?.length ? getAllKeys(node.children) : [])];
    }, []) || []
  );
}

/**
 * 根据初始选中的键值计算最终的选中状态和半选状态
 * 单选：
 * 2.选中状态的节点，只包含自身
 * 多选：
 * 1.半选状态的节点：子节点选中至少一个，且没有全部选中
 * 2.选中状态的节点：子节点全部选中
 * 复选：
 * 2.选中状态的节点：子节点中至少有一个选择
 *
 * @param selectedKeys - 初始选中的键值数组
 * @param key2nodeProps - 键值到节点属性的映射对象
 * @param selectMode - 选择模式
 * @param checkStrictly - 是否启用严格选择模式（不进行父子关联）
 * @returns 包含最终选中键值和半选键值的对象
 *
 * 该函数处理树节点的级联选择逻辑，确保父子节点的选择状态保持一致
 */
export function getSelectedKeysByInitKeys(
  selectedKeys: string[],
  key2nodeProps: Key2nodePropsType,
  selectMode: 'single' | 'checkbox' | 'radio',
  checkStrictly: boolean,
): { selectedKeys: string[]; indeterminateKeys: string[] } {
  if (selectMode === 'single' || checkStrictly || selectMode === 'radio') {
    return { selectedKeys, indeterminateKeys: [] };
  }

  const selectedKeysSet = new Set<string>(selectedKeys || []);
  const indeterminateKeysSet = new Set<string>();
  const childSelectedKeysSet = new Set<string>();

  selectedKeys.forEach((key) => {
    if (!childSelectedKeysSet.has(key)) {
      const childKeys = getChildNodeKeys(key2nodeProps[key], key2nodeProps);
      // 选中了节点，就找到所有符合条件的子节点的key.自身的选中状态需要根据children判断。
      childKeys.forEach((v) => childSelectedKeysSet.add(v));
    }

    if (
      key2nodeProps[key] &&
      !key2nodeProps[key].pathParentKeys.some((_key) => selectedKeysSet.has(_key))
    ) {
      updateParent(key, key2nodeProps, selectedKeysSet, indeterminateKeysSet);
    }
  });

  const selectedKeysArray = Array.from(
    new Set([...Array.from(selectedKeysSet), ...Array.from(childSelectedKeysSet)]),
  );
  return {
    selectedKeys: selectedKeysArray,
    indeterminateKeys: Array.from(indeterminateKeysSet),
  };
}

/**
 * 构建键值到节点属性的映射对象
 *
 * @param nodes - 树节点数组
 * @param pathParentKeys - 当前节点的所有父节点键值路径
 * @returns 键值到节点属性的映射对象
 *
 * 递归遍历树结构，为每个节点创建一个包含完整父节点路径的属性对象，
 * 便于快速查找和操作任意节点及其关系
 */
export function buildKey2NodeProps(
  nodes: TreeNodeProps[],
  pathParentKeys: string[] = [],
): Key2nodePropsType {
  return (
    nodes?.reduce((map: Key2nodePropsType, node) => {
      const nodeProps = {
        ...node,
        children: node.children || [],
        pathParentKeys,
      };

      return {
        ...map,
        [node.key]: nodeProps,
        ...(node.children ? buildKey2NodeProps(node.children, [...pathParentKeys, node.key]) : {}),
      };
    }, {}) || {}
  );
}

/**
 * 更新父节点的选中和半选状态
 *
 * @param key - 当前节点的键值
 * @param key2nodeProps - 键值到节点属性的映射对象
 * @param allKeys - 所有选中节点的键值集合
 * @param indeterminateKeysSet - 所有半选节点的键值集合
 *
 * 根据子节点的选中状态，逐级向上更新父节点的选中和半选状态：
 * - 如果所有子节点都被选中，父节点为选中状态
 * - 如果部分子节点被选中，父节点为半选状态
 * - 如果没有子节点被选中，父节点为未选中状态
 */
const updateParent = (
  key: string,
  key2nodeProps: Key2nodePropsType,
  allKeys: Set<string>,
  indeterminateKeysSet: Set<string>,
): void => {
  const pathParentKeys = [...key2nodeProps[key].pathParentKeys].reverse();

  // 逐级更新父节点的状态
  for (const itemKey of pathParentKeys) {
    const parent = key2nodeProps[itemKey];
    if (!parent || !parent.children || parent.disabled) {
      break; // 断开链接
    }

    let total = 0;
    let number = 0;

    for (const { key } of parent.children) {
      const item = key2nodeProps[key];
      if (!item || item.disabled) continue;

      total++;
      if (allKeys.has(key)) {
        number++;
      } else if (indeterminateKeysSet.has(key)) {
        // 只要有一个半选，就不用再算了，父节点是半选
        number += 0.5;
        break;
      }
    }

    if (!number || number === total) {
      indeterminateKeysSet.delete(itemKey);
    } else {
      indeterminateKeysSet.add(itemKey);
    }

    if (number && number === total) {
      allKeys.add(itemKey);
    } else {
      allKeys.delete(itemKey);
    }
  }
};

/**
 * 获取指定节点的所有子节点键值
 *
 * @param node - 指定的树节点
 * @param key2nodeProps - 键值到节点属性的映射对象
 * @returns 包含所有子节点键值的集合
 *
 * 递归收集指定节点下所有非禁用子节点的键值，用于级联选择操作
 */
export function getChildNodeKeys(
  node: TreeNodeProps,
  key2nodeProps: Key2nodePropsType,
): Set<string> {
  const nodes = new Set<string>();

  const collectChildKeys = (children: TreeNodeProps[]): void => {
    children.forEach((child) => {
      const item = key2nodeProps[child.key];
      if (!item || item.disabled) return;

      nodes.add(child.key);
      if (item.children?.length) {
        collectChildKeys(item.children);
      }
    });
  };

  if (node?.children?.length) {
    collectChildKeys(node.children);
  }

  return nodes;
}

/**
 * 根据选中/取消选中操作更新所有相关节点的状态
 *
 * @param selected - 是否选中
 * @param node - 操作的目标节点
 * @param key2nodeProps - 键值到节点属性的映射对象
 * @param TreeNodeProps - 当前已选中的节点键值数组
 * @param indeterminateKeys - 当前半选的节点键值数组
 * @returns 更新后的选中和半选节点键值对象
 *
 * 处理节点选中/取消选中的级联效果：
 * - 选中节点时，同时选中其所有子节点
 * - 取消选中节点时，同时取消其所有子节点
 * - 同时更新所有相关父节点的状态
 */
export function getAllSelectedKeysByCheck(
  selected: boolean,
  node: TreeNodeProps,
  key2nodeProps: Key2nodePropsType,
  selectMode: 'single' | 'checkbox' | 'radio',
  checkStrictly: boolean,
  TreeNodeProps: string[],
  indeterminateKeys: string[],
): {
  selectedKeys: string[];
  indeterminateKeys: string[];
} {
  if (selectMode === 'single' || selectMode === 'radio' || checkStrictly) {
    return { selectedKeys: TreeNodeProps, indeterminateKeys: [] };
  }

  const { key } = node;
  const checkedKeysSet = new Set(TreeNodeProps);
  const indeterminateKeysSet = new Set(indeterminateKeys);

  // 获取所有子节点的键
  const childKeys = getChildNodeKeys(node, key2nodeProps);

  if (selected) {
    // 选中节点及其所有子节点
    checkedKeysSet.add(key);
    indeterminateKeysSet.delete(key);
    childKeys.forEach((childKey) => {
      checkedKeysSet.add(childKey);
      indeterminateKeysSet.delete(childKey);
    });
  } else {
    // 取消选中节点及其所有子节点
    checkedKeysSet.delete(key);
    indeterminateKeysSet.delete(key);
    childKeys.forEach((childKey) => {
      checkedKeysSet.delete(childKey);
      indeterminateKeysSet.delete(childKey);
    });
  }

  // 更新父节点的选中状态
  updateParent(key, key2nodeProps, checkedKeysSet, indeterminateKeysSet);

  return {
    selectedKeys: Array.from(checkedKeysSet),
    indeterminateKeys: Array.from(indeterminateKeysSet),
  };
}

/**
 * 从选中的键值中计算最终的值
 *
 * @param selectedKeys - 选中的键值数组
 * @param key2nodeProps - 键值到节点属性的映射对象
 * @returns 计算后的值数组
 *
 * 计算 value 值，如果父元素选中，则只返回父元素的 value，否则返回子元素的 value
 * 这样可以避免重复返回已经被父节点包含的子节点值
 */
export function getValueFromSelectedKeys(
  selectedKeys: string[],
  key2nodeProps: Key2nodePropsType,
  checkStrictly: boolean,
  selectMode: 'single' | 'checkbox' | 'radio',
): string[] {
  if (!selectedKeys || selectedKeys.length === 0) {
    return [];
  }
  if (selectMode === 'single' || selectMode === 'radio') {
    return selectedKeys;
  }

  const valueSet = new Set<string>();
  const excludeSet = new Set<string>();

  // 首先遍历所有选中的节点
  selectedKeys.forEach((key) => {
    const node = key2nodeProps[key];
    if (!node) return;

    // 检查该节点的父节点是否被选中
    const parentSelected = node.pathParentKeys.some((parentKey) =>
      selectedKeys.includes(parentKey),
    );

    // 如果父节点被选中，则将当前节点添加到排除列表中
    if (parentSelected) {
      excludeSet.add(key);
    } else {
      valueSet.add(key);
    }
  });

  if (checkStrictly) {
    return [...Array.from(valueSet), ...Array.from(excludeSet)];
  }

  // 从结果中排除那些父节点已被选中的节点
  return Array.from(valueSet).filter((key) => !excludeSet.has(key));
}

/**
 * 计算树节点的缩进值
 *
 * @param level - 节点的层级
 * @returns 计算后的缩进像素值
 *
 * 根据节点的层级计算适当的缩进距离，缩进 = 默认缩进 * (层级 - 1) + 默认内边距
 */
export function getIndent(level: number): number {
  return DEFAULT_INDENT * (level - 1) + DEFAULT_PADDING;
}

/**
 * 获取初始展开的节点键值
 *
 * @param oriExpandedKeys - 原始展开的键值数组
 * @param treeData - 树数据
 * @param defaultExpandAll - 是否默认展开所有节点
 * @param autoExpandParent - 是否自动展开父节点
 * @param key2nodeProps - 键值到节点属性的映射对象
 * @returns 最终展开的节点键值数组
 *
 * 根据配置计算树的初始展开状态：
 * - 如果设置了默认展开所有，则返回所有节点键值
 * - 如果设置了自动展开父节点，则确保所有展开节点的父节点也被展开
 * - 否则直接返回原始展开键值
 */
export function getInitExpandedKeys(
  oriExpandedKeys: string[],
  treeData: TreeNodeProps[],
  defaultExpandAll: boolean,
  autoExpandParent: boolean,
  key2nodeProps: Key2nodePropsType,
): string[] {
  if (defaultExpandAll) return getAllKeys(treeData);
  if (oriExpandedKeys.length === 0) return [];
  if (autoExpandParent) {
    const expandedKeys: Set<string> = new Set<string>();
    oriExpandedKeys.forEach((key) => {
      const item = key2nodeProps[key];
      if (item) {
        expandedKeys.add(key);
        item.pathParentKeys?.forEach((parentKey) => {
          expandedKeys.add(parentKey);
        });
      }
    });
    return Array.from(expandedKeys);
  }
  return oriExpandedKeys;
}

/**
 * 获取初始选中的节点键值
 *
 * @param oriSelectedKeys - 原始选中的键值数组
 * @param multiple - 是否支持多选
 * @param checkStrictly - 是否启用严格选择模式（不进行父子关联）
 * @param key2nodeProps - 键值到节点属性的映射对象
 * @returns 包含最终选中和半选节点键值的对象
 *
 * 根据树的配置计算初始选中状态：
 * - 如果是多选且非严格模式，则处理父子节点的关联选择逻辑
 * - 如果是单选或严格模式，则直接使用原始选中键值，不处理父子关联
 */
export function getInitCheckedKeys(
  oriSelectedKeys: string[],
  selectMode: 'single' | 'checkbox' | 'radio',
  checkStrictly: boolean,
  key2nodeProps: Key2nodePropsType,
): { selectedKeys: string[]; indeterminateKeys: string[] } {
  return getSelectedKeysByInitKeys(oriSelectedKeys, key2nodeProps, selectMode, checkStrictly);
}

/**
 * 根据 value 值计算出对应的 selectedKeys
 *
 * @param value - 当前值，可以是字符串或字符串数组
 * @param key2nodeProps - 键值到节点属性的映射对象
 * @returns 包含所有相关节点键值的数组
 *
 * 该函数将 value 转换为 selectedKeys：
 * - 如果 value 是数组，则处理每个键值及其子节点
 * - 如果 value 是单个值，则将其转换为包含单个元素的数组
 */
export function getSelectedKeysFromValue(
  value: string[] | string | undefined,
  key2nodeProps: Key2nodePropsType,
  selectMode: 'single' | 'checkbox' | 'radio',
): string[] {
  if (!value) return [];
  if (selectMode === 'single') {
    return Array.isArray(value) ? value : [value];
  }

  if (selectMode === 'radio') {
    return Array.isArray(value) ? value : [value];
  }

  return Array.isArray(value)
    ? value.reduce((keys: string[], key) => {
        const node = key2nodeProps[key];
        if (node) {
          // 添加当前节点
          keys.push(key);
          // 如果是父节点，添加所有子节点
          if (node.children?.length) {
            const childKeys = Array.from(getChildNodeKeys(node, key2nodeProps));
            keys.push(...childKeys);
          }
        }
        return keys;
      }, [])
    : [value];
}
