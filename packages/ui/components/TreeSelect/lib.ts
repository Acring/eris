import type { TreeSelectOption } from './type';

export function findOptionsByValues(
  values: string | string[] = [],
  arrayOptions?: TreeSelectOption[],
): TreeSelectOption[] {
  const allOptions = [...(arrayOptions || [])];
  function flatOptionsFunc(options: TreeSelectOption[]) {
    return options.reduce((acc: TreeSelectOption[], opt) => {
      acc.push(opt);
      if (opt.children) {
        acc.push(...flatOptionsFunc(opt.children));
      }
      return acc;
    }, []);
  }
  const flatOptions = flatOptionsFunc(allOptions);

  const valueArray = Array.isArray(values) ? values : [values];
  return valueArray
    .map((value) => flatOptions.find((opt) => opt.key === value))
    .filter((option): option is TreeSelectOption => option !== undefined);
}

/**
 * 获取节点的完整路径
 * @param node 当前节点
 * @param treeData 树形数据
 * @param separator 路径分隔符
 * @returns 完整路径字符串，例如：中国/北京
 */
export function getNodeFullPath(
  node: TreeSelectOption,
  treeData: TreeSelectOption[],
  separator = '/',
): string {
  // 构建 key 到节点的映射
  const key2Node = new Map<string, TreeSelectOption & { parentKey?: string }>();

  function buildMap(nodes: TreeSelectOption[], parentKey?: string) {
    nodes.forEach((node) => {
      key2Node.set(node.key, { ...node, parentKey });
      if (node.children && node.children.length > 0) {
        buildMap(node.children, node.key);
      }
    });
  }

  buildMap(treeData);

  // 构建路径
  const path: string[] = [];
  const currentNode = node;

  // 添加当前节点的标题
  path.unshift(currentNode.title as string);

  // 向上查找父节点
  let parentKey = key2Node.get(currentNode.key)?.parentKey;
  while (parentKey) {
    const parentNode = key2Node.get(parentKey);
    if (parentNode) {
      path.unshift(parentNode.title as string);
      parentKey = parentNode.parentKey;
    } else {
      break;
    }
  }

  return path.join(separator);
}

export async function defaultSearch(value: string, treeData: TreeSelectOption[]) {
  // 模拟异步搜索
  return new Promise<TreeSelectOption[]>((resolve) => {
    if (!value) {
      resolve(treeData);
      return;
    }

    const searchData = (nodes: TreeSelectOption[]): TreeSelectOption[] => {
      const result = nodes
        .map((node) => {
          if (node.title?.toString().toLowerCase().includes(value.toLowerCase())) {
            return { ...node };
          }

          if (node.children) {
            const filteredChildren = searchData(node.children);
            if (filteredChildren.length > 0) {
              return { ...node, children: filteredChildren };
            }
          }

          return null;
        })
        .filter(Boolean) as TreeSelectOption[];

      return result;
    };

    resolve(searchData(treeData));
  });
}
