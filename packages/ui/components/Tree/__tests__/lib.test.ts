import { describe, expect, test } from 'vitest';
import {
  getAllKeys,
  getSelectedKeysByInitKeys,
  buildKey2NodeProps,
  getChildNodeKeys,
  getAllSelectedKeysByCheck,
  getValueFromSelectedKeys,
  getIndent,
  getInitExpandedKeys,
  getInitCheckedKeys,
} from '../lib';
import type { TreeNodeProps } from '../type';

// 测试数据
const treeData: TreeNodeProps[] = [
  {
    key: '0-0',
    title: '0-0',
    children: [
      {
        key: '0-0-0',
        title: '0-0-0',
        children: [
          {
            key: '0-0-0-0',
            title: '0-0-0-0',
          },
          {
            key: '0-0-0-1',
            title: '0-0-0-1',
          },
        ],
      },
      {
        key: '0-0-1',
        title: '0-0-1',
      },
    ],
  },
  {
    key: '0-1',
    title: '0-1',
    disabled: true,
    children: [
      {
        key: '0-1-0',
        title: '0-1-0',
      },
    ],
  },
];

describe('getAllKeys', () => {
  test('应该返回所有节点的键', () => {
    const keys = getAllKeys(treeData);
    expect(keys).toEqual(['0-0', '0-0-0', '0-0-0-0', '0-0-0-1', '0-0-1', '0-1', '0-1-0']);
  });

  test('空数组应该返回空数组', () => {
    const keys = getAllKeys([]);
    expect(keys).toEqual([]);
  });

  test('没有子节点的节点应该只返回自己的键', () => {
    const singleNode = [{ key: 'single', title: 'Single Node' }];
    const keys = getAllKeys(singleNode);
    expect(keys).toEqual(['single']);
  });
});

describe('buildKey2NodeProps', () => {
  test('应该构建键到节点属性的映射', () => {
    const key2nodeProps = buildKey2NodeProps(treeData);

    // 检查根节点
    expect(key2nodeProps['0-0']).toBeDefined();
    expect(key2nodeProps['0-0'].pathParentKeys).toEqual([]);

    // 检查子节点
    expect(key2nodeProps['0-0-0']).toBeDefined();
    expect(key2nodeProps['0-0-0'].pathParentKeys).toEqual(['0-0']);

    // 检查孙节点
    expect(key2nodeProps['0-0-0-0']).toBeDefined();
    expect(key2nodeProps['0-0-0-0'].pathParentKeys).toEqual(['0-0', '0-0-0']);
  });

  test('空数组应该返回空对象', () => {
    const key2nodeProps = buildKey2NodeProps([]);
    expect(key2nodeProps).toEqual({});
  });
});

describe('getChildNodeKeys', () => {
  test('应该返回所有子节点的键', () => {
    const key2nodeProps = buildKey2NodeProps(treeData);
    const childKeys = getChildNodeKeys(key2nodeProps['0-0'], key2nodeProps);

    expect(childKeys.size).toBe(4);
    expect(childKeys.has('0-0-0')).toBe(true);
    expect(childKeys.has('0-0-0-0')).toBe(true);
    expect(childKeys.has('0-0-0-1')).toBe(true);
    expect(childKeys.has('0-0-1')).toBe(true);
  });

  test('禁用的节点不应该被包含', () => {
    const disabledTreeData = [
      {
        key: 'root',
        title: 'Root',
        children: [
          {
            key: 'child1',
            title: 'Child 1',
            disabled: true,
          },
          {
            key: 'child2',
            title: 'Child 2',
          },
        ],
      },
    ];

    const key2nodeProps = buildKey2NodeProps(disabledTreeData);
    const childKeys = getChildNodeKeys(key2nodeProps.root, key2nodeProps);

    expect(childKeys.size).toBe(1);
    expect(childKeys.has('child2')).toBe(true);
    expect(childKeys.has('child1')).toBe(false);
  });

  test('没有子节点的节点应该返回空集合', () => {
    const key2nodeProps = buildKey2NodeProps(treeData);
    const childKeys = getChildNodeKeys(key2nodeProps['0-0-1'], key2nodeProps);

    expect(childKeys.size).toBe(0);
  });
});

describe('getSelectedKeysByInitKeys', () => {
  test('选中父节点时应该选中所有子节点', () => {
    const key2nodeProps = buildKey2NodeProps(treeData);
    const result = getSelectedKeysByInitKeys(['0-0'], key2nodeProps, 'checkbox', false);

    expect(result.selectedKeys).toContain('0-0');
    expect(result.selectedKeys).toContain('0-0-0');
    expect(result.selectedKeys).toContain('0-0-0-0');
    expect(result.selectedKeys).toContain('0-0-0-1');
    expect(result.selectedKeys).toContain('0-0-1');
    expect(result.selectedKeys.length).toBe(5);

    expect(result.indeterminateKeys.length).toBe(0);
  });

  test('选中部分子节点时父节点应该处于半选状态', () => {
    const key2nodeProps = buildKey2NodeProps(treeData);
    const result = getSelectedKeysByInitKeys(['0-0-0-0'], key2nodeProps, 'checkbox', false);

    expect(result.selectedKeys).toContain('0-0-0-0');
    expect(result.indeterminateKeys).toContain('0-0');
    expect(result.indeterminateKeys).toContain('0-0-0');
  });

  test('空数组应该返回空结果', () => {
    const key2nodeProps = buildKey2NodeProps(treeData);
    const result = getSelectedKeysByInitKeys([], key2nodeProps, 'checkbox', false);

    expect(result.selectedKeys).toEqual([]);
    expect(result.indeterminateKeys).toEqual([]);
  });

  test('radio 模式下应该只能选中一个节点', () => {
    const key2nodeProps = buildKey2NodeProps(treeData);
    const result = getSelectedKeysByInitKeys(['0-0', '0-1'], key2nodeProps, 'radio', false);

    // 应该只保留最后一个选中的节点
    expect(result.selectedKeys).toEqual(['0-0', '0-1']);
    expect(result.indeterminateKeys).toEqual([]);
  });

  test('radio 模式下不应该级联选择子节点', () => {
    const key2nodeProps = buildKey2NodeProps(treeData);
    const result = getSelectedKeysByInitKeys(['0-0'], key2nodeProps, 'radio', false);

    // 不应该选中子节点
    expect(result.selectedKeys).toEqual(['0-0']);
    expect(result.selectedKeys).not.toContain('0-0-0');
    expect(result.selectedKeys).not.toContain('0-0-0-0');
    expect(result.indeterminateKeys).toEqual([]);
  });
});

describe('getAllSelectedKeysByCheck', () => {
  test('选中节点时应该选中所有子节点', () => {
    const key2nodeProps = buildKey2NodeProps(treeData);
    const result = getAllSelectedKeysByCheck(
      true,
      key2nodeProps['0-0'],
      key2nodeProps,
      'checkbox',
      false,
      [],
      [],
    );

    expect(result.selectedKeys).toContain('0-0');
    expect(result.selectedKeys).toContain('0-0-0');
    expect(result.selectedKeys).toContain('0-0-0-0');
    expect(result.selectedKeys).toContain('0-0-0-1');
    expect(result.selectedKeys).toContain('0-0-1');

    expect(result.indeterminateKeys.length).toBe(0);
  });

  test('取消选中节点时应该取消选中所有子节点', () => {
    const key2nodeProps = buildKey2NodeProps(treeData);
    // 先选中所有节点
    const initialState = getAllSelectedKeysByCheck(
      true,
      key2nodeProps['0-0'],
      key2nodeProps,
      'checkbox',
      false,
      [],
      [],
    );

    // 然后取消选中一个节点
    const result = getAllSelectedKeysByCheck(
      false,
      key2nodeProps['0-0'],
      key2nodeProps,
      'checkbox',
      false,
      initialState.selectedKeys,
      initialState.indeterminateKeys,
    );

    expect(result.selectedKeys).not.toContain('0-0');
    expect(result.selectedKeys).not.toContain('0-0-0');
    expect(result.selectedKeys).not.toContain('0-0-0-0');
    expect(result.selectedKeys).not.toContain('0-0-0-1');
    expect(result.selectedKeys).not.toContain('0-0-1');
  });

  test('radio 模式下选中节点时应该只保留当前节点', () => {
    const key2nodeProps = buildKey2NodeProps(treeData);
    // 先选中一个节点
    const initialState = getAllSelectedKeysByCheck(
      true,
      key2nodeProps['0-0-0-0'],
      key2nodeProps,
      'radio',
      false,
      ['0-0-0-0'],
      [],
    );

    // 然后选中另一个节点
    const result = getAllSelectedKeysByCheck(
      true,
      key2nodeProps['0-0-0-1'],
      key2nodeProps,
      'radio',
      false,
      ['0-0-0-1'],
      initialState.indeterminateKeys,
    );

    // 应该只保留最后选中的节点
    expect(result.selectedKeys).toEqual(['0-0-0-1']);
    expect(result.selectedKeys).not.toContain('0-0-0-0');
    expect(result.indeterminateKeys).toEqual([]);
  });

  test('radio 模式下不应该级联选择子节点', () => {
    const key2nodeProps = buildKey2NodeProps(treeData);
    const result = getAllSelectedKeysByCheck(
      true,
      key2nodeProps['0-0-1'],
      key2nodeProps,
      'radio',
      false,
      ['0-0-1'],
      [],
    );

    // 不应该选中子节点
    expect(result.selectedKeys).toEqual(['0-0-1']);
    expect(result.selectedKeys).not.toContain('0-0');
    expect(result.selectedKeys).not.toContain('0-0-0');
    expect(result.selectedKeys).not.toContain('0-0-0-0');
    expect(result.indeterminateKeys).toEqual([]);
  });
});

describe('getValueFromSelectedKeys', () => {
  test('当父节点被选中时，应该只返回父节点的键', () => {
    const key2nodeProps = buildKey2NodeProps(treeData);
    const selectedKeys = ['0-0', '0-0-0', '0-0-0-0', '0-0-0-1', '0-0-1'];
    const values = getValueFromSelectedKeys(selectedKeys, key2nodeProps, false, 'checkbox');

    expect(values).toEqual(['0-0']);
  });

  test('当只有子节点被选中时，应该返回子节点的键', () => {
    const key2nodeProps = buildKey2NodeProps(treeData);
    const selectedKeys = ['0-0-0-0', '0-0-1'];
    const values = getValueFromSelectedKeys(selectedKeys, key2nodeProps, false, 'checkbox');

    expect(values.sort()).toEqual(['0-0-0-0', '0-0-1'].sort());
  });

  test('空数组应该返回空数组', () => {
    const key2nodeProps = buildKey2NodeProps(treeData);
    const values = getValueFromSelectedKeys([], key2nodeProps, false, 'checkbox');

    expect(values).toEqual([]);
  });

  test('checkStrictly 为 true 时应该返回所有选中的节点', () => {
    const key2nodeProps = buildKey2NodeProps(treeData);
    const selectedKeys = ['0-0', '0-0-0', '0-0-0-0', '0-0-0-1', '0-0-1'];
    const values = getValueFromSelectedKeys(selectedKeys, key2nodeProps, true, 'checkbox');

    expect(values).toEqual(['0-0', '0-0-0', '0-0-0-0', '0-0-0-1', '0-0-1']);
  });

  test('radio 模式下应该直接返回选中的节点', () => {
    const key2nodeProps = buildKey2NodeProps(treeData);
    const selectedKeys = ['0-0'];
    const values = getValueFromSelectedKeys(selectedKeys, key2nodeProps, false, 'radio');

    expect(values).toEqual(['0-0']);
  });

  test('radio 模式下多选时应该返回所有选中的节点', () => {
    const key2nodeProps = buildKey2NodeProps(treeData);
    const selectedKeys = ['0-0', '0-1'];
    const values = getValueFromSelectedKeys(selectedKeys, key2nodeProps, false, 'radio');

    expect(values).toEqual(['0-0', '0-1']);
  });
});

describe('getIndent', () => {
  test('应该根据级别计算缩进', () => {
    expect(getIndent(1)).toBe(6); // DEFAULT_PADDING
    expect(getIndent(2)).toBe(26); // DEFAULT_INDENT + DEFAULT_PADDING
    expect(getIndent(3)).toBe(46); // 2 * DEFAULT_INDENT + DEFAULT_PADDING
  });
});

describe('getInitExpandedKeys', () => {
  test('defaultExpandAll 为 true 时应该展开所有节点', () => {
    const key2nodeProps = buildKey2NodeProps(treeData);
    const expandedKeys = getInitExpandedKeys([], treeData, true, false, key2nodeProps);

    expect(expandedKeys).toEqual(getAllKeys(treeData));
  });

  test('autoExpandParent 为 true 时应该展开所有父节点', () => {
    const key2nodeProps = buildKey2NodeProps(treeData);
    const expandedKeys = getInitExpandedKeys(['0-0-0-0'], treeData, false, true, key2nodeProps);

    expect(expandedKeys).toContain('0-0');
    expect(expandedKeys).toContain('0-0-0');
    expect(expandedKeys).toContain('0-0-0-0');
  });

  test('autoExpandParent 为 false 时应该只展开指定的节点', () => {
    const key2nodeProps = buildKey2NodeProps(treeData);
    const expandedKeys = getInitExpandedKeys(['0-0-0'], treeData, false, false, key2nodeProps);

    expect(expandedKeys).toEqual(['0-0-0']);
  });

  test('空数组且 defaultExpandAll 和 autoExpandParent 为 false 时应该返回空数组', () => {
    const key2nodeProps = buildKey2NodeProps(treeData);
    const expandedKeys = getInitExpandedKeys([], treeData, false, false, key2nodeProps);

    expect(expandedKeys).toEqual([]);
  });
});

describe('getInitCheckedKeys', () => {
  test('multiple 为 true 且 checkStrictly 为 false 时应该级联选择', () => {
    const key2nodeProps = buildKey2NodeProps(treeData);
    const result = getInitCheckedKeys(['0-0'], 'checkbox', false, key2nodeProps);

    expect(result.selectedKeys).toContain('0-0');
    expect(result.selectedKeys).toContain('0-0-0');
    expect(result.selectedKeys).toContain('0-0-0-0');
    expect(result.selectedKeys).toContain('0-0-0-1');
    expect(result.selectedKeys).toContain('0-0-1');
  });

  test('multiple 为 false 或 checkStrictly 为 true 时不应该级联选择', () => {
    const key2nodeProps = buildKey2NodeProps(treeData);

    // multiple 为 false
    let result = getInitCheckedKeys(['0-0'], 'single', false, key2nodeProps);
    expect(result.selectedKeys).toEqual(['0-0']);
    expect(result.indeterminateKeys).toEqual([]);

    // checkStrictly 为 true
    result = getInitCheckedKeys(['0-0'], 'checkbox', true, key2nodeProps);
    expect(result.selectedKeys).toEqual(['0-0']);
    expect(result.indeterminateKeys).toEqual([]);
  });

  test('radio 模式下应该只能选中一个节点', () => {
    const key2nodeProps = buildKey2NodeProps(treeData);
    const result = getInitCheckedKeys(['0-0', '0-1'], 'radio', false, key2nodeProps);

    // 应该保留所有选中的节点，但不级联选择
    expect(result.selectedKeys).toEqual(['0-0', '0-1']);
    expect(result.indeterminateKeys).toEqual([]);
  });

  test('radio 模式下不应该级联选择子节点', () => {
    const key2nodeProps = buildKey2NodeProps(treeData);
    const result = getInitCheckedKeys(['0-0'], 'radio', false, key2nodeProps);

    // 不应该选中子节点
    expect(result.selectedKeys).toEqual(['0-0']);
    expect(result.selectedKeys).not.toContain('0-0-0');
    expect(result.selectedKeys).not.toContain('0-0-0-0');
    expect(result.indeterminateKeys).toEqual([]);
  });
});
