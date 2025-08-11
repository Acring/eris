interface Header {
  isPlaceholder: boolean;
  rowSpan: number;
  column: {
    id: string;
  };
}
interface HeaderGroup {
  headers: Header[];
}

/** 转换表头以去除不必要的空单元格 */
export function getMergeHeaderGroups<G extends HeaderGroup>(headerGroups: G[]): G[] {
  if (headerGroups.length === 1) return headerGroups;
  const columnsIds = new Set();

  return headerGroups.map((group, depth, { length: fullDepth }) => ({
    ...group,
    headers: group.headers
      .filter((header) => !columnsIds.has(header.column.id)) // Ignore already merged columns
      .map((header): Header => {
        columnsIds.add(header.column.id);
        return header.isPlaceholder
          ? {
              ...header,
              // 如果单元格是占位符（空的），那么它下面就不会有子组
              // 这意味着你可以将它与列标题中的所有下方单元格合并
              isPlaceholder: false,
              rowSpan: fullDepth - depth,
            }
          : { ...header, rowSpan: 1 };
      }),
  }));
}

export function getTableColumnOffset(props: {
  index: number;
  pinDir: 'left' | 'right' | false;
  elementList: HTMLElement[];
  selectElOffset?: number;
}) {
  const { index, elementList, selectElOffset = 0 } = props;

  if (props.pinDir === 'right') {
    const list = elementList.slice();
    const len = list.length;
    const offset = list
      .reverse()
      .slice(0, Math.max(len - index - 1, 0))
      .reduce((p, v) => p + v.offsetWidth, 0);
    return offset;
  }

  if (props.pinDir === 'left') {
    const list = elementList.slice();
    const offset = list.slice(0, index).reduce((p, v) => p + v.offsetWidth, selectElOffset);
    return offset;
  }

  return undefined;
}
