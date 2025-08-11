import React from 'react';
import { expect, describe, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tree } from '..';

const treeData = [
  {
    key: '0-0',
    title: '0-0',
    children: [
      {
        key: '0-0-1',
        title: '0-0-1',
        children: [
          {
            key: '0-0-0-1',
            title: '0-0-0-1',
            children: [
              { key: '0-0-0-0-1', title: '0-0-0-0-1', checkable: true },
              { key: '0-0-0-0-2', title: '0-0-0-0-2', disabled: true },
            ],
          },
        ],
      },
    ],
  },
];

describe('Tree', () => {
  test('base', async () => {
    const mockCall = vi.fn();

    render(
      <Tree
        defaultExpandAll
        onSelect={(selectedKeys) => {
          mockCall(selectedKeys);
        }}
        selectMode="checkbox"
        selectable
        treeData={treeData}
      />,
    );

    // 禁用节点 0-0-0-0-2
    await userEvent.click(screen.getByText('0-0-0-0-2'));
    expect(mockCall).not.toHaveBeenCalled();

    const allCheckboxes = screen.queryAllByRole('checkbox');
    expect(allCheckboxes).toHaveLength(5);
  });
});
