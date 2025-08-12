import React from 'react';
import { describe, expect, test, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { DataTable } from '..';
import type { DataTableProps, TableField } from '../type';
import userEvent from '@testing-library/user-event';
import { Button } from '../../Button';

// 模拟 scrollIntoView
if (typeof Element.prototype.scrollIntoView !== 'function') {
  Element.prototype.scrollIntoView = vi.fn();
}

describe('DataTable', () => {
  const mockData = [
    { id: 1, name: '张三', age: 18 },
    { id: 2, name: '李四', age: 20 },
    { id: 3, name: '王五', age: 22 },
  ];

  const mockFields: TableField<(typeof mockData)[0]>[] = [
    {
      key: 'id',
      header: 'ID',
      width: 100,
    },
    {
      key: 'name',
      header: '姓名',
      width: 100,
    },
    {
      key: 'age',
      header: '年龄',
      width: 100,
    },
  ];

  test('should render table data correctly', async () => {
    await act(async () => {
      render(<DataTable data={mockData} fields={mockFields} />);
      return Promise.resolve();
    });
    // 检查表头
    expect(screen.getByText('姓名')).toBeInTheDocument();
    expect(screen.getByText('年龄')).toBeInTheDocument();

    // 检查数据
    expect(screen.getByText('张三')).toBeInTheDocument();
    expect(screen.getByText('18')).toBeInTheDocument();
    expect(screen.getByText('李四')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
  });

  test('should support row multi selection', async () => {
    // 测试多选模式
    const onMultiSelectionChange = vi.fn();
    let selectionState = {}; // 用于跟踪选择状态

    const TableComponent = () => {
      const [state, setState] = React.useState({});
      return (
        <DataTable
          data={mockData}
          fields={mockFields}
          rowSelection={{
            state,
            type: 'checkbox',
            onChange: (v) => {
              setState(v);
              onMultiSelectionChange();
              if (typeof v === 'function') {
                selectionState = v(selectionState);
              }
            },
          }}
        />
      );
    };

    await act(async () => {
      render(<TableComponent />);
      return Promise.resolve();
    });

    // 重置 mock 函数
    onMultiSelectionChange.mockClear();

    const checkboxes = screen.getAllByRole('checkbox');
    const selectAllCheckbox = checkboxes[0];
    const firstRowCheckbox = checkboxes[1];
    const secondRowCheckbox = checkboxes[2];

    // 选择框默认隐藏
    expect(screen.getAllByTestId('Checkbox-root')[0]).toHaveClass('opacity-0');

    // 点击第一行选择框
    await act(async () => {
      await userEvent.click(firstRowCheckbox);
    });

    // 验证第一次选择
    expect(onMultiSelectionChange).toHaveBeenCalledTimes(1);
    expect(selectionState).toEqual({ '1': true });

    // 重置 mock 函数
    onMultiSelectionChange.mockClear();

    // 点击第二行选择框
    await act(async () => {
      await userEvent.click(secondRowCheckbox);
    });

    // 验证第二次选择
    expect(onMultiSelectionChange).toHaveBeenCalledTimes(1);
    expect(selectionState).toEqual({ '1': true, '2': true });

    // 重置 mock 函数
    onMultiSelectionChange.mockClear();

    // 点击全选
    await act(async () => {
      await userEvent.click(selectAllCheckbox);
    });

    // 验证全选
    expect(onMultiSelectionChange).toHaveBeenCalledTimes(1);
    expect(selectionState).toEqual({ '1': true, '2': true, '3': true });

    // 重置 mock 函数
    onMultiSelectionChange.mockClear();

    // 取消全选
    await act(async () => {
      await userEvent.click(selectAllCheckbox);
    });

    // 验证取消全选
    expect(onMultiSelectionChange).toHaveBeenCalledTimes(1);
    expect(selectionState).toEqual({});
  });

  test('should support row single selection', async () => {
    const onSingleSelectionChange = vi.fn();
    let selectionState = {};
    const TableComponent = () => {
      const [state, setState] = React.useState({});
      return (
        <DataTable
          data={mockData}
          fields={mockFields}
          rowSelection={{
            state,
            type: 'radio',
            onChange: (v) => {
              setState(v);
              onSingleSelectionChange();
              if (typeof v === 'function') {
                selectionState = v(selectionState);
              }
            },
          }}
        />
      );
    };

    await act(async () => {
      render(<TableComponent />);
      return Promise.resolve();
    });

    // 重置 mock 函数
    onSingleSelectionChange.mockClear();

    // 获取单选按钮
    const radioButtons = screen.getAllByRole('radio');
    const firstRowRadio = radioButtons[0];
    const secondRowRadio = radioButtons[1];
    const firstRowLabel = firstRowRadio.closest('label');
    const secondRowLabel = secondRowRadio.closest('label');

    // 点击第一行单选按钮的 label
    await act(async () => {
      await userEvent.click(firstRowLabel!);
    });

    // 验证第一次选择
    expect(onSingleSelectionChange).toHaveBeenCalledTimes(1);
    expect(selectionState).toEqual({ '1': true });

    // 重置 mock 函数
    onSingleSelectionChange.mockClear();

    // 点击第二行单选按钮的 label
    await act(async () => {
      await userEvent.click(secondRowLabel!);
    });

    // 验证第二次选择
    expect(onSingleSelectionChange).toHaveBeenCalledTimes(1);
    expect(selectionState).toEqual({ '2': true });
  });

  test('should support defaultShowSelect parameter', async () => {
    const TableComponent = () => {
      const [type, setType] = React.useState<'checkbox' | 'radio'>('checkbox');
      return (
        <>
          <Button onClick={() => setType('radio')}>radio</Button>
          <Button onClick={() => setType('checkbox')}>checkbox</Button>
          <DataTable
            data={mockData}
            fields={mockFields}
            rowSelection={{
              state: {},
              type,
              onChange: vi.fn(),
              defaultShowSelect: true,
            }}
          />
        </>
      );
    };

    await act(async () => {
      render(<TableComponent />);
      return Promise.resolve();
    });

    // 获取选择列的复选框
    const checkboxes = screen.getAllByTestId('Checkbox-root');
    const selectAllCheckbox = checkboxes[0];
    const firstRowCheckbox = checkboxes[1];

    // 验证默认情况下（defaultShowSelect: true），复选框应该没有隐藏样式类
    expect(selectAllCheckbox).not.toHaveClass('opacity-0');
    expect(firstRowCheckbox).not.toHaveClass('opacity-0');

    // 点击 radio 按钮
    await act(async () => {
      await userEvent.click(screen.getByText('radio'));
    });

    // 验证单选按钮在 defaultShowSelect: true 时，没有隐藏样式类
    const radioButtons = screen.getAllByTestId('Radio-root');
    const firstRadio = radioButtons[0];
    expect(firstRadio).not.toHaveClass('opacity-0');
  });

  test('should support hidden header', async () => {
    await act(async () => {
      render(<DataTable data={mockData} fields={mockFields} showHeader={false} />);
      return Promise.resolve();
    });

    const header = screen.queryByText('姓名');
    expect(header).not.toBeInTheDocument();
  });

  test('should support row focus', async () => {
    const onFocusTableRow = vi.fn();

    const TableComponent = () => {
      const [focusRow, setFocusRow] = React.useState<number | undefined>(undefined);
      return (
        <>
          <Button onClick={() => setFocusRow(1)}>focus second row</Button>
          <DataTable
            currentFocusedRow={focusRow}
            data={mockData}
            enableRowFocus
            fields={mockFields}
            onFocusTableRow={onFocusTableRow}
          />
        </>
      );
    };
    await act(async () => {
      render(<TableComponent />);
      return Promise.resolve();
    });

    // 点击第一行
    const firstRow = screen.getByText('张三').closest('tr');
    await act(async () => {
      await userEvent.click(firstRow!);
    });
    expect(firstRow).toHaveAttribute('data-focused', 'true');

    // 点击 focus second row
    const focusSecondRowButton = screen.getByText('focus second row');
    await act(async () => {
      await userEvent.click(focusSecondRowButton);
    });
    const secondRow = screen.getByText('李四').closest('tr');
    expect(secondRow).toHaveAttribute('data-focused', 'true');
  });

  test('should support sorting cycle', async () => {
    const onSortOrderChange = vi.fn();
    await act(async () => {
      render(
        <DataTable
          data={mockData}
          fields={[
            mockFields[0],
            {
              ...mockFields[1],
              sorter: true,
            },
            {
              ...mockFields[2],
              sorter: true,
              defaultSortOrder: 'asc',
            },
          ]}
          onSortOrderChange={onSortOrderChange}
        />,
      );
      return Promise.resolve();
    });

    const nameHeader = screen.getByText('姓名');
    const ageHeader = screen.getByText('年龄');

    // 验证默认排序
    const ageSortIcon = ageHeader.closest('div')?.querySelector('[data-sort-order]');
    expect(ageSortIcon).toHaveAttribute('data-sort-order', 'asc');

    const nameSortIcon = nameHeader.closest('div')?.querySelector('[data-sort-order]');

    // 第一次点击：升序
    await act(async () => {
      await userEvent.click(nameHeader);
    });
    const ascCalls = onSortOrderChange.mock.calls;
    const ascLastCall = ascCalls[ascCalls.length - 1];
    const ascSortState = ascLastCall[0];
    expect(ascSortState([])).toEqual([{ id: 'name', desc: false }]);
    expect(nameSortIcon).toHaveAttribute('data-sort-order', 'asc');

    // 第二次点击：降序
    await act(async () => {
      await userEvent.click(nameHeader);
    });
    const descCalls = onSortOrderChange.mock.calls;
    const descLastCall = descCalls[descCalls.length - 1];
    const descSortState = descLastCall[0];
    expect(descSortState([])).toEqual([{ id: 'name', desc: true }]);
    expect(nameSortIcon).toHaveAttribute('data-sort-order', 'desc');

    // 第三次点击：清除排序
    await act(async () => {
      await userEvent.click(nameHeader);
    });
    const clearCalls = onSortOrderChange.mock.calls;
    const clearLastCall = clearCalls[clearCalls.length - 1];
    const clearSortState = clearLastCall[0];
    expect(clearSortState([])).toEqual([]);
    expect(nameSortIcon).toHaveAttribute('data-sort-order', 'false');
  });

  test('should respond to external sortOrder changes', async () => {
    const TestComponent = () => {
      const [sorting, setSorting] = React.useState<NonNullable<DataTableProps<any>['sorting']>>([{
        id: 'name',
        desc: true,
      }]);
      const fields = mockFields.map((field) => ({
        ...field,
        sorter: true,
      }));

      const handleSort = (key: string, sortOrder: 'asc' | 'desc' | undefined) => {
        if (sortOrder !== undefined) {
          setSorting([{ id: key, desc: sortOrder === 'desc' }]);
        } else {
          setSorting([]);
        }
      };

      return (
        <>
          <Button onClick={() => handleSort('id', 'asc')}>Set ID Asc</Button>
          <Button onClick={() => handleSort('id', 'desc')}>Set ID Desc</Button>
          <Button onClick={() => handleSort('id', undefined)}>Clear Sort</Button>
          <Button onClick={() => handleSort('name', 'asc')}>Set Name Asc</Button>
          <DataTable data={mockData} fields={fields} sorting={sorting} />
        </>
      );
    };

    await act(async () => {
      render(<TestComponent />);
      return Promise.resolve();
    });

    // 初始状态应该显示 defaultSortOrder
    const nameHeader = screen.getByText('姓名');
    const nameSortIcon = nameHeader.closest('div')?.querySelector('[data-sort-order]');
    expect(nameSortIcon).toHaveAttribute('data-sort-order', 'desc');

    const idHeader = screen.getByText('ID');
    const idSortIcon = idHeader.closest('div')?.querySelector('[data-sort-order]');
    expect(idSortIcon).toHaveAttribute('data-sort-order', 'false');

    const ageHeader = screen.getByText('年龄');
    const ageSortIcon = ageHeader.closest('div')?.querySelector('[data-sort-order]');
    expect(ageSortIcon).toHaveAttribute('data-sort-order', 'false');

    // 点击设置升序
    const setIdAscButton = screen.getByText('Set ID Asc');
    await act(async () => {
      await userEvent.click(setIdAscButton);
    });

    // 验证排序状态更新
    expect(
      screen.getByText('ID').closest('div')?.querySelector('[data-sort-order]'),
    ).toHaveAttribute('data-sort-order', 'asc');
    expect(
      screen.getByText('姓名').closest('div')?.querySelector('[data-sort-order]'),
    ).toHaveAttribute('data-sort-order', 'false');
    expect(
      screen.getByText('年龄').closest('div')?.querySelector('[data-sort-order]'),
    ).toHaveAttribute('data-sort-order', 'false');

    // 点击设置降序
    const setIdDescButton = screen.getByText('Set ID Desc');
    await act(async () => {
      await userEvent.click(setIdDescButton);
    });

    // 验证排序状态更新
    expect(
      screen.getByText('ID').closest('div')?.querySelector('[data-sort-order]'),
    ).toHaveAttribute('data-sort-order', 'desc');
    expect(
      screen.getByText('姓名').closest('div')?.querySelector('[data-sort-order]'),
    ).toHaveAttribute('data-sort-order', 'false');
    expect(
      screen.getByText('年龄').closest('div')?.querySelector('[data-sort-order]'),
    ).toHaveAttribute('data-sort-order', 'false');

    // 点击清空排序
    const clearSortButton = screen.getByText('Clear Sort');
    await act(async () => {
      await userEvent.click(clearSortButton);
    });

    // 验证排序状态被清空
    expect(
      screen.getByText('ID').closest('div')?.querySelector('[data-sort-order]'),
    ).toHaveAttribute('data-sort-order', 'false');
    expect(
      screen.getByText('姓名').closest('div')?.querySelector('[data-sort-order]'),
    ).toHaveAttribute('data-sort-order', 'false');
    expect(
      screen.getByText('年龄').closest('div')?.querySelector('[data-sort-order]'),
    ).toHaveAttribute('data-sort-order', 'false');

    // 点击设置姓名升序
    const setNameAscButton = screen.getByText('Set Name Asc');
    await act(async () => {
      await userEvent.click(setNameAscButton);
    });

    // 验证排序状态更新
    expect(
      screen.getByText('姓名').closest('div')?.querySelector('[data-sort-order]'),
    ).toHaveAttribute('data-sort-order', 'asc');
    expect(
      screen.getByText('ID').closest('div')?.querySelector('[data-sort-order]'),
    ).toHaveAttribute('data-sort-order', 'false');
    expect(
      screen.getByText('年龄').closest('div')?.querySelector('[data-sort-order]'),
    ).toHaveAttribute('data-sort-order', 'false');
  });

  test('should not affect defaultSortOrder when adding/removing columns without sortOrder', async () => {
    const onSortOrderChange = vi.fn();

    const TestComponent = () => {
      const [showExtraColumn, setShowExtraColumn] = React.useState(false);

      const dynamicFields = [
        mockFields[0],
        {
          ...mockFields[1],
          sorter: true,
          defaultSortOrder: 'asc' as const,
        },
        ...(showExtraColumn
          ? [
              {
                key: 'extra' as const,
                header: '额外列',
                width: 100,
              },
            ]
          : []),
        mockFields[2],
      ];

      return (
        <>
          <button onClick={() => setShowExtraColumn(!showExtraColumn)}>
            {showExtraColumn ? 'Remove Column' : 'Add Column'}
          </button>
          <DataTable data={mockData} fields={dynamicFields} onSortOrderChange={onSortOrderChange} />
        </>
      );
    };

    await act(async () => {
      render(<TestComponent />);
      return Promise.resolve();
    });

    // 验证初始状态的 defaultSortOrder
    const nameHeader = screen.getByText('姓名');
    const nameSortIcon = nameHeader.closest('div')?.querySelector('[data-sort-order]');
    expect(nameSortIcon).toHaveAttribute('data-sort-order', 'asc');

    // 清空 mock 调用记录
    onSortOrderChange.mockClear();

    // 添加列
    const toggleButton = screen.getByText('Add Column');
    await act(async () => {
      await userEvent.click(toggleButton);
    });

    // 验证添加列后，defaultSortOrder 依然保持
    expect(nameHeader.closest('div')?.querySelector('[data-sort-order]')).toHaveAttribute(
      'data-sort-order',
      'asc',
    );

    // 验证没有触发 onSortOrderChange
    expect(onSortOrderChange).not.toHaveBeenCalled();

    // 验证新列存在
    expect(screen.getByText('额外列')).toBeInTheDocument();

    // 删除列
    const removeButton = screen.getByText('Remove Column');
    await act(async () => {
      await userEvent.click(removeButton);
    });

    // 验证删除列后，defaultSortOrder 依然保持
    expect(nameHeader.closest('div')?.querySelector('[data-sort-order]')).toHaveAttribute(
      'data-sort-order',
      'asc',
    );

    // 验证没有触发 onSortOrderChange
    expect(onSortOrderChange).not.toHaveBeenCalled();

    // 验证列已删除
    expect(screen.queryByText('额外列')).not.toBeInTheDocument();
  });

  test('should support filtering', async () => {
    const onFilterChange = vi.fn();
    await act(async () => {
      render(
        <DataTable
          data={mockData}
          fields={[
            mockFields[0],
            {
              ...mockFields[1],
              filters: [
                { label: '张三', value: '张三' },
                { label: '李四', value: '李四' },
              ],
            },
            mockFields[2],
          ]}
          onFilterChange={onFilterChange}
        />,
      );
      return Promise.resolve();
    });

    // 点击过滤图标
    const filterIcon = screen.getByTestId('table-filter-button');
    expect(filterIcon).toBeInTheDocument();
    await act(async () => {
      await userEvent.click(filterIcon);
    });

    // 等待过滤选项出现
    const filterOptions = screen.getAllByTestId('Checkbox-label');
    expect(filterOptions.length).toBeGreaterThan(0);

    // 点击张三选项
    const filterOption = filterOptions.find((option) => option.textContent === '张三');
    expect(filterOption).toBeTruthy();

    await act(async () => {
      await userEvent.click(filterOption!);
    });

    // 点击筛选按钮确认
    const confirmButton = screen.getByRole('button', { name: '筛选' });
    await act(async () => {
      await userEvent.click(confirmButton);
    });

    // 等待过滤回调被调用
    expect(onFilterChange).toHaveBeenCalled();
    const calls = onFilterChange.mock.calls;
    expect(calls.length).toBeGreaterThan(0);
    const lastCall = calls[calls.length - 1];
    const filterState = lastCall[0];
    expect(typeof filterState).toBe('function');
    const result = filterState([]);
    expect(result).toEqual([{ id: 'name', value: '张三' }]);
  });

  test('should support controlled filtering', async () => {
    const onFilterChange = vi.fn();

    const TestComponent = () => {
      const [columnFilters, setColumnFilters] = React.useState<any[]>([]);

      const fields = [
        mockFields[0],
        {
          ...mockFields[1],
          filters: [
            { label: '张三', value: '张三' },
            { label: '李四', value: '李四' },
            { label: '王五', value: '王五' },
          ],
          filterType: 'multiple' as const,
        },
        {
          ...mockFields[2],
          filters: [
            { label: '18', value: 18 },
            { label: '20', value: 20 },
            { label: '22', value: 22 },
          ],
          filterType: 'single' as const,
        },
      ];

      const clearFilters = () => {
        setColumnFilters([]);
      };

      const setNameFilter = () => {
        setColumnFilters([{ id: 'name', value: ['张三', '李四'] }]);
      };

      const setAgeFilter = () => {
        setColumnFilters([{ id: 'age', value: 18 }]);
      };

      const setMultipleFilters = () => {
        setColumnFilters([
          { id: 'name', value: ['张三'] },
          { id: 'age', value: 20 },
        ]);
      };

      return (
        <>
          <Button onClick={clearFilters}>清除所有过滤</Button>
          <Button onClick={setNameFilter}>过滤姓名</Button>
          <Button onClick={setAgeFilter}>过滤年龄</Button>
          <Button onClick={setMultipleFilters}>组合过滤</Button>
          <DataTable
            columnFilters={columnFilters}
            data={mockData}
            fields={fields}
            onFilterChange={(filters) => {
              setColumnFilters(filters);
              onFilterChange(filters);
            }}
          />
        </>
      );
    };

    await act(async () => {
      render(<TestComponent />);
      return Promise.resolve();
    });

    // 初始状态下，过滤图标应该不是激活状态
    const nameFilterIcon = screen.getAllByTestId('table-filter-button')[0];
    const ageFilterIcon = screen.getAllByTestId('table-filter-button')[1];
    expect(nameFilterIcon).not.toHaveClass('text-primary-normal');
    expect(ageFilterIcon).not.toHaveClass('text-primary-normal');

    // 点击设置姓名过滤
    const setNameFilterButton = screen.getByText('过滤姓名');
    await act(async () => {
      await userEvent.click(setNameFilterButton);
    });

    // 验证过滤图标状态更新
    expect(screen.getAllByTestId('table-filter-button')[0]).toHaveClass('text-primary-normal');
    expect(screen.getAllByTestId('table-filter-button')[1]).not.toHaveClass('text-primary-normal');

    // 点击设置年龄过滤
    const setAgeFilterButton = screen.getByText('过滤年龄');
    await act(async () => {
      await userEvent.click(setAgeFilterButton);
    });

    // 验证过滤图标状态更新
    expect(screen.getAllByTestId('table-filter-button')[0]).not.toHaveClass('text-primary-normal');
    expect(screen.getAllByTestId('table-filter-button')[1]).toHaveClass('text-primary-normal');

    // 点击组合过滤
    const setMultipleFiltersButton = screen.getByText('组合过滤');
    await act(async () => {
      await userEvent.click(setMultipleFiltersButton);
    });

    // 验证两个过滤图标都是激活状态
    expect(screen.getAllByTestId('table-filter-button')[0]).toHaveClass('text-primary-normal');
    expect(screen.getAllByTestId('table-filter-button')[1]).toHaveClass('text-primary-normal');

    // 点击清除所有过滤
    const clearFiltersButton = screen.getByText('清除所有过滤');
    await act(async () => {
      await userEvent.click(clearFiltersButton);
    });

    // 验证过滤图标状态重置
    expect(screen.getAllByTestId('table-filter-button')[0]).not.toHaveClass('text-primary-normal');
    expect(screen.getAllByTestId('table-filter-button')[1]).not.toHaveClass('text-primary-normal');
  });

  test('should support sticky header', async () => {
    await act(async () => {
      render(<DataTable data={mockData} fields={mockFields} scroll={{ y: '100%' }} />);
      return Promise.resolve();
    });

    const header = screen.getByText('姓名').closest('thead');
    expect(header).toHaveClass('sticky');
  });

  test('should support sticky row', async () => {
    await act(async () => {
      render(
        <DataTable
          data={mockData}
          fields={[
            {
              ...mockFields[0],
              fixedDir: 'left',
            },
            {
              ...mockFields[1],
            },
            {
              ...mockFields[2],
              fixedDir: 'right',
            },
          ]}
          scroll={{ y: '100%', x: 'max-content' }}
        />,
      );
      return Promise.resolve();
    });

    const firstRow = screen.getByText('张三').closest('tr');
    const cells = firstRow?.querySelectorAll('td');
    const firstCell = cells?.[0];
    expect(firstCell?.style.left).toBeTruthy();
    const lastCell = cells?.[cells.length - 1];
    expect(lastCell?.style.right).toBeTruthy();
  });

  test('should support context menu', async () => {
    const onContextMenuSelect = vi.fn();
    const onContextMenuClose = vi.fn();

    await act(async () => {
      render(
        <DataTable
          contextMenu={{
            items: [
              { key: 'edit', label: '编辑' },
              { key: 'delete', label: '删除' },
            ],
            nameKey: 'name',
            onSelect: onContextMenuSelect,
            onClose: onContextMenuClose,
          }}
          data={mockData}
          fields={mockFields}
        />,
      );
      return Promise.resolve();
    });

    // 找到包含"张三"的单元格
    const cell = screen.getByText('张三').closest('td');
    expect(cell).toBeInTheDocument();

    // 模拟完整的右键点击事件
    const mouseEvent = new MouseEvent('contextmenu', {
      bubbles: true,
      cancelable: true,
      clientX: 100,
      clientY: 100,
      view: window,
    });

    // 触发右键事件
    await act(async () => {
      cell!.dispatchEvent(mouseEvent);
      return Promise.resolve();
    });

    // 验证菜单位置
    const menuItems = document.querySelectorAll('.table-context-menu');
    expect(menuItems.length).toBe(1);

    const menuElement = menuItems[0] as HTMLElement;
    expect(menuElement.style.top).toBeTruthy();
    expect(menuElement.style.left).toBeTruthy();

    // 验证菜单项
    const editMenuItem = screen.getByText('编辑');
    const deleteMenuItem = screen.getByText('删除');
    expect(editMenuItem).toBeInTheDocument();
    expect(deleteMenuItem).toBeInTheDocument();

    // 点击菜单项
    await act(async () => {
      await userEvent.click(editMenuItem);
    });

    // 验证回调
    expect(onContextMenuSelect).toHaveBeenCalledWith(mockData[0]);
    expect(onContextMenuClose).toHaveBeenCalledWith('select');

    // 验证菜单已关闭
    expect(menuElement.style.top).toBeFalsy();
    expect(menuElement.style.left).toBeFalsy();
  });

  test('should render subtable correctly', async () => {
    await act(async () => {
      render(
        <DataTable
          data={mockData}
          expandable={{
            expandedRowRender: (parentRow) => {
              return (
                <DataTable
                  data={Array.from({ length: 10 }).map((_, idx) => ({
                    id: idx,
                    name: parentRow.name + idx,
                    age: parentRow.age + idx,
                  }))}
                  fields={mockFields}
                  isSubTable
                  scroll={{ y: '100px' }}
                  showHeader={false}
                />
              );
            },
            getRowExpandIconShow: (parentRow) => {
              return parentRow.id !== 3;
            },
          }}
          fields={mockFields}
        />,
      );
      return Promise.resolve();
    });
    const expandButtons = screen.getAllByRole('button');
    const firstExpandButton = expandButtons[0];
    const thirdExpandButton = expandButtons[2];
    expect(firstExpandButton).toBeInTheDocument();
    expect(thirdExpandButton).toHaveClass('hidden');

    await act(async () => {
      await userEvent.click(firstExpandButton);
    });

    const subTable = screen.getByText('张三1');
    expect(subTable).toBeInTheDocument();
  });
});
