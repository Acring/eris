import React from 'react';
import { expect, describe, test, vi } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tree } from '..';

const treeData = [
  {
    key: '0-0',
    title: '0-0',
    tip: 'tooltip text',
    children: [
      {
        key: '0-0-1',
        title: '0-0-1',
      },
      {
        key: '0-0-2',
        title: '0-0-2',
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

describe('Tree', () => {
  test('base', () => {
    render(<Tree treeData={treeData} />);
    expect(screen.getByText('0-0')).toBeInTheDocument();

    // 禁用节点
    expect(screen.getByText('0-1')).toHaveClass('opacity-40');

    // 默认所有节点折叠
    screen.getAllByTestId('Tree-accordionItem').forEach((element) => {
      expect(element).toHaveAttribute('data-state', 'closed');
    });
  });

  test('tooltip', async () => {
    render(<Tree treeData={treeData} />);
    const svgElement = screen.getByText('0-0').querySelector('svg');
    expect(svgElement).toBeInTheDocument();

    if (svgElement) {
      await act(() => userEvent.hover(svgElement));
      await waitFor(() => {
        expect(screen.getByRole('tooltip').innerHTML).toBe('tooltip text');
      });
    }
  });

  test('default expand all', () => {
    render(<Tree defaultExpandAll treeData={treeData} />);
    expect(screen.getByText('0-0-1')).toBeInTheDocument();
    expect(screen.getByText('0-1-0')).toBeInTheDocument();

    screen.getAllByTestId('Tree-accordionItem').forEach((element) => {
      expect(element).toHaveAttribute('data-state', 'open');
    });
  });

  test('default expand keys', () => {
    render(<Tree defaultExpandedKeys={['0-0']} treeData={treeData} />);
    // 默认展开 0-0
    expect(screen.getByText('0-0-1')).toBeInTheDocument();
    expect(screen.getAllByTestId('Tree-accordionItem')[0]).toHaveAttribute('data-state', 'open');

    // 0-1 未展开
    expect(screen.queryByText('0-1-0')).toBeNull();
    expect(screen.getAllByTestId('Tree-accordionItem')[1]).toHaveAttribute('data-state', 'closed');
  });

  test('size', () => {
    const { container } = render(
      <>
        <Tree treeData={treeData} treeItemClassName="py-[3px]" />
        <Tree treeData={treeData} />
      </>,
    );

    // 设置了 treeItemClassName 的 Tree
    const smallElement = container.querySelectorAll('div.text-body.relative')[0];
    smallElement.querySelectorAll('[data-testid="Tree-item"]').forEach((element) => {
      expect(element).toHaveClass('py-[3px]');
    });

    // 默认 Tree
    const defaultElement = container.querySelectorAll('div.text-body.relative')[1];
    defaultElement.querySelectorAll('[data-testid="Tree-item"]').forEach((element) => {
      expect(element).toHaveClass('p-[6px]');
    });
  });

  test('expand', async () => {
    const mockCall = vi.fn(() => {});
    render(<Tree onExpand={mockCall} treeData={treeData} />);

    expect(screen.queryByText('0-0-1')).toBeNull();
    screen.getAllByTestId('Tree-accordionItem').forEach((element) => {
      expect(element).toHaveAttribute('data-state', 'closed');
    });

    // 展开第一项
    await act(() => userEvent.click(screen.getByText('0-0')));
    expect(screen.getAllByTestId('Tree-accordionItem')[0]).toHaveAttribute('data-state', 'open');
    expect(screen.getByText('0-0-1')).toBeInTheDocument();
    expect(mockCall).toBeCalledTimes(1);

    // 通过 icon button 来展开第二项
    await act(() => userEvent.click(screen.getAllByRole('button')[1]));
    expect(screen.getAllByTestId('Tree-accordionItem')[1]).toHaveAttribute('data-state', 'open');
    expect(screen.getByText('0-1-0')).toBeInTheDocument();
    expect(mockCall).toBeCalledTimes(2);

    // 关闭第一项
    await act(() => userEvent.click(screen.getByText('0-0')));
    expect(screen.getAllByTestId('Tree-accordionItem')[0]).toHaveAttribute('data-state', 'closed');
    expect(screen.queryByText('0-0-1')).toBeNull();
    expect(mockCall).toBeCalledTimes(3);
  });

  test('single select', async () => {
    const mockCall = vi.fn();

    render(
      <Tree
        defaultExpandAll
        defaultSelectedKeys={['0-0-1']}
        onSelect={(selectedKeys) => {
          mockCall(selectedKeys);
        }}
        selectable
        treeData={treeData}
      />,
    );

    // 默认选中 0-0-1
    expect(screen.getByText('0-0-1').parentElement?.parentElement).toHaveClass('bg-tree-bg-active');

    // 选中 0-1-0
    await act(() => userEvent.click(screen.getByText('0-1-0')));
    expect(screen.getByText('0-1-0').parentElement?.parentElement).toHaveClass('bg-tree-bg-active');
    expect(screen.getByText('0-0-1').parentElement?.parentElement).not.toHaveClass(
      'bg-tree-bg-active',
    );
    expect(mockCall).toHaveBeenCalledWith(['0-1-0']);

    // 取消选中 0-1-0
    await act(() => userEvent.click(screen.getByText('0-1-0')));
    expect(screen.getByText('0-1-0').parentElement?.parentElement).not.toHaveClass(
      'bg-tree-bg-active',
    );
    expect(mockCall).toHaveBeenCalledWith([]);
  });

  test('single select with disabled', async () => {
    const mockCall = vi.fn();

    const { container } = render(
      <Tree
        disabled
        onSelect={(selectedKeys) => {
          mockCall(selectedKeys);
        }}
        selectable
        treeData={treeData}
      />,
    );

    expect(screen.getByText('0-0')).toHaveClass('opacity-40');

    // 禁用状态下无法选中
    await act(() => userEvent.click(screen.getByText('0-0')));
    expect(screen.getByText('0-0').closest('[data-testid="Tree-item"]')).not.toHaveClass(
      'bg-tree-bg-active',
    );
    expect(mockCall).not.toBeCalled();

    // 禁用状态下可以展开
    const target = container.querySelectorAll('button[type="button"]')[0];
    await act(() => userEvent.click(target));
    expect(screen.getByText('0-0-1')).toBeInTheDocument();
    expect(screen.getAllByTestId('Tree-accordionItem')[0]).toHaveAttribute('data-state', 'open');
  });

  test('multiple select', async () => {
    const mockCall = vi.fn();

    const { container } = render(
      <Tree
        defaultExpandAll
        defaultSelectedKeys={['0-0-1', '0-1-0']}
        onSelect={(selectedKeys) => {
          mockCall(selectedKeys);
        }}
        selectMode="checkbox"
        selectable
        treeData={treeData}
      />,
    );

    // 默认选中 0-0-1、0-1-0
    expect(
      container.querySelector('[data-value="0-0-1"]')?.querySelector('[role="checkbox"]'),
    ).toHaveAttribute('data-state', 'checked');
    expect(
      container.querySelector('[data-value="0-1-0"]')?.querySelector('[role="checkbox"]'),
    ).toHaveAttribute('data-state', 'checked');

    // 选中 0-0-2, 0-0 也会被选中
    const treeItem1 = screen.getByText('0-0').closest('[data-testid="Tree-item"]');
    const treeItem2 = screen.getByText('0-0-2').closest('[data-testid="Tree-item"]');

    await act(() => userEvent.click(screen.getByText('0-0-2')));
    expect(treeItem1?.querySelector('[role="checkbox"]')).toHaveAttribute('data-state', 'checked');
    expect(treeItem2?.querySelector('[role="checkbox"]')).toHaveAttribute('data-state', 'checked');
    expect(mockCall).toHaveBeenCalledWith(['0-0-1', '0-1-0', '0-0-2', '0-0']);

    // 取消选中 0-0-2, 0-0 也会被取消选中
    await act(() => userEvent.click(screen.getByText('0-0-2')));
    expect(treeItem1?.querySelector('[role="checkbox"]')).toHaveAttribute(
      'data-state',
      'unchecked',
    );
    expect(treeItem2?.querySelector('[role="checkbox"]')).toHaveAttribute(
      'data-state',
      'unchecked',
    );
    expect(mockCall).toHaveBeenCalledWith(['0-0-1', '0-1-0']);
  });

  test('multiple select with disabled', async () => {
    const mockCall = vi.fn();

    const { container } = render(
      <Tree
        disabled
        onSelect={(selectedKeys) => {
          mockCall(selectedKeys);
        }}
        selectMode="checkbox"
        selectable
        treeData={treeData}
      />,
    );

    // 只有 checkbox 被禁用, 文字不会置灰
    expect(screen.getByText('0-0')).not.toHaveClass('opacity-40');
    expect(screen.getAllByRole('checkbox')[0]).toBeDisabled();

    // 禁用状态下无法选中
    await act(() => userEvent.click(screen.getByText('0-0')));
    expect(screen.getByText('0-0').closest('[data-testid="Tree-item"]')).not.toHaveClass(
      'bg-tree-bg-active',
    );
    expect(mockCall).not.toBeCalled();

    // 禁用状态下可以展开
    const target = container.querySelectorAll('button[type="button"]')[0];
    await act(() => userEvent.click(target));
    expect(screen.getByText('0-0-1')).toBeInTheDocument();
    expect(screen.getAllByTestId('Tree-accordionItem')[0]).toHaveAttribute('data-state', 'open');
  });

  test('multiple select with checkStrictly', async () => {
    const mockCall = vi.fn();

    const { container } = render(
      <Tree
        checkStrictly
        defaultExpandAll
        defaultSelectedKeys={['0-0-1', '0-0-2']}
        onSelect={(selectedKeys) => {
          mockCall(selectedKeys);
        }}
        selectMode="checkbox"
        selectable
        treeData={treeData}
      />,
    );
    // 0-0 不会被选中
    expect(
      container.querySelector('[data-value="0-0"]')?.querySelector('[role="checkbox"]'),
    ).toHaveAttribute('data-state', 'unchecked');

    // 取消 0-0, 0-0-1, 0-0-2 也不会被取消
    await act(() => userEvent.dblClick(screen.getByText('0-0')));
    expect(
      container.querySelector('[data-value="0-0-1"]')?.querySelector('[role="checkbox"]'),
    ).toHaveAttribute('data-state', 'checked');
    expect(
      container.querySelector('[data-value="0-0-2"]')?.querySelector('[role="checkbox"]'),
    ).toHaveAttribute('data-state', 'checked');

    // expect(mockCall).toHaveBeenCalledWith(['0-0-1', '0-0-2']);
  });

  test('multiple select with checkable', async () => {
    const { container } = render(
      <Tree
        defaultExpandAll
        defaultSelectedKeys={['0-0-1']}
        selectMode="checkbox"
        selectable
        treeData={treeData}
      />,
    );

    // 0-0-1 的 checkbox 被选中
    const treeItem1 = screen.getByText('0-0-1').closest('[data-testid="Tree-item"]');
    expect(treeItem1?.querySelector('[role="checkbox"]')).toHaveAttribute('data-state', 'checked');

    // 0-0-2 的 checkbox 未被选中
    const treeItem2 = screen.getByText('0-0-2').closest('[data-testid="Tree-item"]');
    expect(treeItem2?.querySelector('[role="checkbox"]')).toHaveAttribute(
      'data-state',
      'unchecked',
    );

    // 0-0 处于半选状态
    expect(
      container.querySelector('div.animate-scaleAndFadeWithTranslateCenter'),
    ).toBeInTheDocument();

    // 选中 0-0-2, 0-0 也会被选中
    await act(() => userEvent.click(screen.getByText('0-0-2')));
    expect(treeItem2?.querySelector('[role="checkbox"]')).toHaveAttribute('data-state', 'checked');
    expect(
      screen
        .getByText('0-0')
        .closest('[data-testid="Tree-item"]')
        ?.querySelector('[role="checkbox"]'),
    ).toHaveAttribute('data-state', 'checked');
    // 0-0 处于全选状态
    expect(
      container.querySelector('div.animate-scaleAndFadeWithTranslateCenter'),
    ).not.toBeInTheDocument();
  });

  test('select with expandOnClickNode ', async () => {
    const mockCall = vi.fn();
    render(
      <Tree
        expandOnClickNode
        onSelect={(selectedKeys) => {
          mockCall(selectedKeys);
        }}
        selectable
        treeData={treeData}
      />,
    );

    await act(() => userEvent.click(screen.getByText('0-0')));
    // 0-0 被选中
    expect(screen.getByText('0-0').closest('[data-testid="Tree-item"]')).toHaveClass(
      'bg-tree-bg-active',
    );
    expect(mockCall).toHaveBeenCalledWith(['0-0']);
    // 同时 0-0 自动展开
    expect(screen.getByText('0-0-1')).toBeInTheDocument();
    expect(screen.getAllByTestId('Tree-accordionItem')[0]).toHaveAttribute('data-state', 'open');
  });
});
