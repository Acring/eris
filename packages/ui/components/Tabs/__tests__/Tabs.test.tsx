import React, { useRef, useState } from 'react';
import { render, screen, act } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import userEvent from '@testing-library/user-event';

import type { TabItemType } from '../type';
import Tabs from '../Tabs';

const items = [
  {
    key: '1',
    label: `Tab 1`,
    children: `Content of Tab Pane 1`,
  },
  {
    key: '2',
    label: `Tab 2`,
    children: `Content of Tab Pane 2`,
  },
  {
    key: '3',
    label: `Tab 3`,
    children: `Content of Tab Pane 3`,
  },
  {
    key: '4',
    label: `Tab 4`,
    children: `Content of Tab Pane 4`,
    disabled: true,
  },
];

describe('Tabs', () => {
  test('basic', async () => {
    const { container } = render(<Tabs tabs={items} />);
    // 默认选中第一项
    expect(container.querySelector('button[aria-selected="true"] div')?.innerHTML).equal('Tab 1');
    // 选中第二项
    await act(async () => {
      await userEvent.click(screen.getByText('Tab 2'));
    });
    expect(container.querySelector('button[aria-selected="true"] div')?.innerHTML).equal('Tab 2');
    // 选中第四项
    expect(screen.getByText('Tab 4').parentElement).toHaveAttribute('disabled');
  });

  test('type', async () => {
    const TypeComp = () => {
      const [type, setType] = useState<'line' | 'button' | 'card'>('line');

      return (
        <div>
          <div
            onClick={(e: any) => {
              setType(e.target?.dataset.type);
            }}
          >
            <span data-type="line">line</span>
            <span data-type="button">button</span>
            <span data-type="card">card</span>
          </div>
          <Tabs tabs={items} type={type} />
        </div>
      );
    };
    const { container } = render(<TypeComp />);
    // line
    // expect(container.querySelector('button[aria-selected="true"]')).toHaveClass(
    //   'aria-selected:text-primary-normal aria-selected:hover:text-primary-normal aria-selected:border-b-primary-normal',
    // );
    // button
    await act(async () => {
      await userEvent.click(screen.getByText('button'));
    });
    expect(container.querySelector('button[aria-selected="true"]')).toHaveClass(
      'aria-selected:text-primary-normal aria-selected:hover:text-primary-normal aria-selected:border-primary-normal',
    );
    // card
    await act(async () => {
      await userEvent.click(screen.getByText('card'));
    });
    expect(container.querySelector('button[aria-selected="true"]')).toHaveClass(
      'aria-selected:text-primary-normal aria-selected:hover:text-primary-normal aria-selected:bg-fill-white bg-fill-on-grey-1',
    );
  });

  test('default active', () => {
    const { container } = render(<Tabs defaultActiveKey="2" tabs={items} />);
    expect(container.querySelector('button[aria-selected="true"] div')?.innerHTML).equal('Tab 2');
  });

  test('with edit button', async () => {
    const AddDemo = () => {
      const [tabs, setTabs] = React.useState<TabItemType[]>([...items]);
      const [activeKey, setActiveKey] = React.useState<string>(items[0].key);
      const newTabIndex = useRef(0);

      const handleAddTab = () => {
        const newActiveKey = `newTab${newTabIndex.current++}`;
        setTabs((pre: TabItemType[]) => {
          const newTab = {
            key: newActiveKey,
            label: `Tab-${newActiveKey}`,
            children: <div>Content of Tab Pane {newActiveKey}</div>,
          };
          return [...pre, newTab];
        });
        setActiveKey(newActiveKey);
      };

      const handleRemoveTab = (key: string) => {
        // 查找当前删除 tab 的索引
        let targetIndex = tabs.findIndex((tab) => tab.key === key);
        // 过滤掉当前需要删除的 tab
        const newPanels = tabs.filter((tab) => tab.key !== key);
        if (newPanels.length && key === activeKey) {
          if (targetIndex === newPanels.length || newPanels[targetIndex].disabled) {
            // 判断删除的前一个是否为禁用状态，如果是则继续往前找
            while (newPanels[targetIndex - 1].disabled) {
              targetIndex--;
            }
            targetIndex--;
          }
          setActiveKey(newPanels[targetIndex].key);
        }
        setTabs(newPanels);
      };

      const onChange = (key: string) => {
        setActiveKey(key);
      };

      return (
        <Tabs
          activeKey={activeKey}
          closable
          onAdd={handleAddTab}
          onChange={onChange}
          onRemove={handleRemoveTab}
          scrollable
          tabs={tabs}
        />
      );
    };

    const { container } = render(<AddDemo />);
    // 删除选中的第 1 项
    const delBtn = container.querySelector('button[aria-selected="true"] svg');
    if (delBtn) {
      await act(async () => {
        await userEvent.click(delBtn);
      });
      expect(container.querySelector('button[aria-selected="true"] div')?.innerHTML).equal('Tab 2');
    }
    // 新增1项
    const addBtn = container.querySelector('button[data-control="add"]');
    if (addBtn) {
      await act(async () => {
        await userEvent.click(addBtn);
      });
      expect(container.querySelector('button[aria-selected="true"] div')?.innerHTML).equal(
        'Tab-newTab0',
      );
    }
  });

  test('draggable', () => {
    const DraggableDemo = () => {
      const newTabIndex = useRef(0);
      const [tabs, setTabs] = React.useState<TabItemType[]>(items);
      const [activeKey, setActiveKey] = React.useState<string>(items[0].key);

      const handleAddTab = () => {
        const newActiveKey = `newTab${newTabIndex.current++}`;
        setTabs((pre: TabItemType[]) => {
          const newTab = {
            key: newActiveKey,
            label: `Tab-${newActiveKey}`,
            children: <div>Content of Tab Pane {newActiveKey}</div>,
          };
          return [...pre, newTab];
        });
        setActiveKey(newActiveKey);
      };

      const handleOrder = (data: TabItemType[]) => {
        setTabs(data);
      };

      const onChange = (key: string) => {
        setActiveKey(key);
      };

      return (
        <Tabs
          activeKey={activeKey}
          onAdd={handleAddTab}
          onChange={onChange}
          onOrder={handleOrder}
          scrollable
          tabs={tabs}
          type="line"
        />
      );
    };

    const { container } = render(<DraggableDemo />);
    expect(container.querySelectorAll('.group').length).equal(4);
    expect(container.querySelectorAll('.group')[0]).toHaveAttribute('data-rbd-draggable-id', '1');
  });
});
