import React, { useState } from 'react';
import { expect, describe, test, vi } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Popconfirm from '../Popconfirm';

describe('Popconfirm', () => {
  test('base', () => {
    render(<Popconfirm content="This is a basic popconfirm">Click me</Popconfirm>);

    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('click', async () => {
    render(<Popconfirm content="This is a basic popconfirm">Click me</Popconfirm>);

    const popconfirmTrigger = screen.getByText('Click me');
    expect(popconfirmTrigger).toHaveAttribute('data-state', 'closed');

    await act(async () => {
      await userEvent.click(popconfirmTrigger);
    });
    await waitFor(() => {
      expect(screen.getByText('This is a basic popconfirm')).toBeInTheDocument();
      expect(popconfirmTrigger).toHaveAttribute('data-state', 'open');
    });

    // 等待 popconfirm 消失
    await act(async () => {
      await userEvent.click(popconfirmTrigger);
    });
    expect(screen.queryByText('This is a basic popconfirm')).not.toBeInTheDocument();
    expect(screen.getByText('Click me')).toHaveAttribute('data-state', 'closed');
  });

  test('arrow', async () => {
    render(
      <Popconfirm arrow content="This is a basic popconfirm">
        Click me
      </Popconfirm>,
    );

    const popconfirmTrigger = screen.getByText('Click me');

    await act(async () => {
      await userEvent.click(popconfirmTrigger);
    });
    await waitFor(() => {
      const popconfirmElement = screen.getByText('This is a basic popconfirm').parentElement;
      expect(popconfirmElement?.querySelector('.popover-arrow')).toBeInTheDocument();
    });
  });

  test('default open', () => {
    render(
      <Popconfirm content="This is a basic popconfirm" defaultOpen>
        Click me
      </Popconfirm>,
    );
    expect(screen.getByText('This is a basic popconfirm')).toBeInTheDocument();
  });

  test('open', async () => {
    const mockCall = vi.fn(() => {});

    const ControlInExternal = () => {
      const [open, setOpen] = useState(true);
      const handleOpenChange = (open: boolean) => {
        setOpen(open);
        mockCall();
      };
      return (
        <div>
          <Popconfirm
            content="This is a basic popconfirm"
            onOpenChange={handleOpenChange}
            open={open}
          >
            Click me
          </Popconfirm>
        </div>
      );
    };

    render(<ControlInExternal />);
    // 展开状态
    const openElem = screen.getByText('Click me');
    expect(openElem).toBeInTheDocument();
    expect(openElem).toHaveAttribute('data-state', 'open');
    expect(screen.getByText('This is a basic popconfirm')).toBeInTheDocument();

    // 等待 popconfirm 消失
    await act(async () => {
      await userEvent.click(openElem as Element);
    });
    await waitFor(() => {
      expect(screen.getByText('Click me')).toHaveAttribute('data-state', 'closed');
      expect(screen.queryByText('This is a basic popconfirm')).not.toBeInTheDocument();
      expect(mockCall).toBeCalledTimes(1);
    });
  });

  test('align', () => {
    render(
      <div className="w-[400px] h-[300px] flex items-center justify-center">
        <Popconfirm content="This is a top popconfirm" open side="top">
          Click me
        </Popconfirm>
        <Popconfirm content="This is a bottom popconfirm" open side="bottom">
          Click me
        </Popconfirm>
        <Popconfirm content="This is a left popconfirm" open side="left">
          Click me
        </Popconfirm>
        <Popconfirm content="This is a right popconfirm" open side="right">
          Click me
        </Popconfirm>
      </div>,
    );

    expect(screen.getAllByText(/This is a \w+ popconfirm/)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/This is a \w+ popconfirm/)[1]).toBeInTheDocument();
    expect(screen.getAllByText(/This is a \w+ popconfirm/)[2]).toBeInTheDocument();
    expect(screen.getAllByText(/This is a \w+ popconfirm/)[3]).toBeInTheDocument();

    // 验证 popconfirm 的对齐位置
    expect(
      screen.queryByText('This is a top popconfirm')?.parentElement?.parentElement,
    ).toHaveAttribute('data-side', 'top');
    expect(
      screen.queryByText('This is a bottom popconfirm')?.parentElement?.parentElement,
    ).toHaveAttribute('data-side', 'bottom');
    expect(
      screen.queryByText('This is a left popconfirm')?.parentElement?.parentElement,
    ).toHaveAttribute('data-side', 'left');
    expect(
      screen.queryByText('This is a right popconfirm')?.parentElement?.parentElement,
    ).toHaveAttribute('data-side', 'right');
  });

  test('popconfirm should not disappear on trigger click', async () => {
    const { getByText, container } = render(
      <Popconfirm content="This is a popconfirm" defaultOpen>
        Click me
      </Popconfirm>,
    );

    // Popconfirm 初始是打开的
    expect(screen.getByText('This is a popconfirm')).toBeInTheDocument();

    // 点击 trigger 部分
    const triggerElement = getByText('Click me');
    await act(async () => {
      await userEvent.click(triggerElement);
    });

    // 验证 Popconfirm 应该消失
    expect(container.querySelector('.popover-content')).not.toBeInTheDocument();
  });

  test('ok and cancel buttons', async () => {
    const mockOk = vi.fn();
    const mockCancel = vi.fn();

    render(
      <Popconfirm content="Are you sure?" defaultOpen onCancel={mockCancel} onOk={mockOk}>
        Click me
      </Popconfirm>,
    );

    expect(screen.getByText('Are you sure?')).toBeInTheDocument();

    // 点击 Cancel 按钮
    await act(async () => {
      await userEvent.click(screen.getByText('取消'));
    });
    expect(mockCancel).toBeCalledTimes(1);
    await waitFor(() => {
      expect(screen.queryByText('Are you sure?')).not.toBeInTheDocument();
    });

    // 重新打开 Popconfirm
    await act(async () => {
      await userEvent.click(screen.getByText('Click me'));
    });
    await waitFor(() => {
      expect(screen.getByText('Are you sure?')).toBeInTheDocument();
    });

    // 点击 OK 按钮
    await act(async () => {
      await userEvent.click(screen.getByText('确定'));
    });
    expect(mockOk).toBeCalledTimes(1);
    await waitFor(() => {
      expect(screen.queryByText('Are you sure?')).not.toBeInTheDocument();
    });
  });
});
