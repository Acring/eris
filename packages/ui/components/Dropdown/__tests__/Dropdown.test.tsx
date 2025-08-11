import React from 'react';
import { expect, describe, test, vi } from 'vitest';
import { fireEvent, render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Dropdown from '../Dropdown';
import type { Menu } from '../Dropdown';
import Button from '../../Button/Button';

const menuList: Menu[] = [
  {
    key: 'Edit',
    label: 'Edit',
    onClick: () => {},
  },
  { key: 'Duplicate', label: 'Duplicate', disabled: true, tooltips: '禁止使用' },
  {
    key: 'ReactNode normal',
    label: (
      <span className="text-red-500" data-key="ReactNode normal">
        ReactNode normal
      </span>
    ),
  },
  {
    key: 'ReactNode disabled',
    disabled: true,
    label: <span className="text-red-500">ReactNode disabled</span>,
  },
  { key: 'divider', type: 'divider' },
  { key: 'Archive', label: 'Archive' },
  {
    key: 'More',
    label: 'More',
    children: [
      { key: 'Move to project…', label: 'Move to project…' },
      {
        key: 'Move to folder…',
        label: 'Move to folder…',
        disabled: true,
        tooltips: '禁止使用2',
      },
      {
        key: 'Advanced options…',
        label: 'Advanced options…',
        children: [
          {
            key: 'options-3-1',
            label: 'options-3-1',
          },
          {
            type: 'divider',
          },
          {
            key: 'options-3-2',
            label: 'options-3-2',
          },
          {
            key: 'options-3-3',
            label: 'options-3-3',
          },
        ],
      },
    ],
  },
  { key: 'Share', label: 'Share' },
  { key: 'Add to favorites', label: 'Add to favorites' },
  { key: 'Delete', label: 'Delete' },
];

describe('Dropdown', () => {
  test('default', () => {
    const { container } = render(<Dropdown label="操作" menuList={menuList} />);

    expect(container.querySelector('button')).toBeInTheDocument();
    expect(screen.getByText('操作')).toBeInTheDocument();
  });

  test('dropdown render', () => {
    const { container } = render(
      <Dropdown
        label={<Button type="primary">custom label render</Button>}
        menuList={menuList}
        onMenuClick={() => {}}
        placement="end"
      />,
    );
    expect(container.querySelector('button')).toHaveClass('bg-primary-normal');
    expect(screen.getByText('custom label render')).toBeInTheDocument();
  });

  test('loading', () => {
    const { container } = render(<Dropdown label="操作" loading />);

    const triggerElem = screen.getByRole('button');
    expect(triggerElem).toBeInTheDocument();

    // 展开
    fireEvent.click(triggerElem);
    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  test('trigger click', async () => {
    const callFun = vi.fn(() => {});

    render(
      <Dropdown
        label="点击操作"
        menuList={[
          ...menuList,
          {
            key: 'Click',
            label: 'Click',
            onClick: callFun,
          },
        ]}
        onMenuClick={callFun}
        trigger={['click']}
      />,
    );

    const triggerElem = screen.getByRole('button');
    expect(triggerElem).toBeInTheDocument();

    // 展开
    fireEvent.click(triggerElem);
    expect(screen.getByRole('menu')).toBeInTheDocument();

    // 子菜单点击（有点击事件）
    const hasClickElem = screen.getByText('Click');
    await act(() => userEvent.click(hasClickElem));
    expect(callFun).toBeCalledTimes(2);
  });

  test('trigger hover', async () => {
    const callFun = vi.fn(() => {});

    render(
      <Dropdown label="hover操作" menuList={menuList} onMenuClick={callFun} trigger={['hover']} />,
    );

    const triggerElem = screen.getByRole('button');
    expect(triggerElem).toBeInTheDocument();

    // 展开
    await act(() => userEvent.hover(triggerElem));
    await waitFor(() => {
      expect(document.querySelector('div[data-state="open"]')).toBeInTheDocument();
    });

    // 收起
    await act(() => userEvent.unhover(triggerElem));
  });

  test('placement', async () => {
    render(<Dropdown label="操作" menuList={menuList} placement="start" />);

    const triggerElem = screen.getByRole('button');
    fireEvent.click(triggerElem);

    // 测试属性值是否为“start”
    const menuElem = await screen.findByRole('menu');

    // 检查菜单的对齐属性是否为 "start"
    expect(menuElem.getAttribute('data-align')).toEqual('start');
  });

  test('defaultOpen', async () => {
    render(<Dropdown defaultOpen label="操作" menuList={menuList} />);

    const menuElem = screen.getByRole('menu');
    expect(menuElem).toBeInTheDocument();

    // 默认打开，点击之后，面板消失
    const triggerElem = screen.getByRole('button');
    await act(() => userEvent.click(triggerElem));
    expect(menuElem).not.toBeInTheDocument();
  });

  test('open', async () => {
    render(<Dropdown label="操作" menuList={menuList} open />);

    const menuElem = screen.getByRole('menu');
    expect(menuElem).toBeInTheDocument();

    // 一直打开，点击之后，面板不消失
    const triggerElem = screen.getByRole('button');
    await act(() => userEvent.click(triggerElem));
    expect(menuElem).toBeInTheDocument();
  });

  test('menuTitle', () => {
    render(<Dropdown label="操作" menuList={menuList} menuTitle="菜单标题" />);

    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('菜单标题')).toBeInTheDocument();
  });
});
