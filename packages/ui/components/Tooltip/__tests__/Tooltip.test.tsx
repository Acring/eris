import React, { useState } from 'react';
import { expect, describe, test, vi } from 'vitest';
import { render, screen, waitFor, waitForElementToBeRemoved, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tooltip } from '..';
import { Button } from '../../Button';
// import { IconButton } from '../../IconButton';
// import type { ModalProps } from '../../Modal';
// import { Modal } from '../../Modal';
// import { CloseLine16 } from '@xsky/eris-icons';

describe('Tooltip', () => {
  test('base', () => {
    render(<Tooltip title="This is a basic tooltip">Hover me</Tooltip>);

    expect(screen.getByText('Hover me')).toBeInTheDocument();
  });

  test('hover', async () => {
    render(<Tooltip title="This is a basic tooltip">Hover me</Tooltip>);

    const tipElement = screen.getByText('Hover me');
    expect(tipElement).toHaveAttribute('data-state', 'closed');

    await act(() => userEvent.hover(tipElement));
    await waitFor(() => {
      expect(screen.getByRole('tooltip').innerHTML).toBe('This is a basic tooltip');
      expect(tipElement).toHaveAttribute('data-state', 'delayed-open');
    });

    // 等待 tooltip 消失
    await act(() => userEvent.unhover(tipElement));
    waitForElementToBeRemoved(screen.queryByRole('tooltip')).then(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
      // expect(screen.getByText('Hover me')).toHaveAttribute('data-state', 'closed');
    });
  });

  test('arrow', async () => {
    render(
      <Tooltip arrow title="This is a basic tooltip">
        Hover me
      </Tooltip>,
    );

    const tipElement = screen.getByText('Hover me');

    await userEvent.hover(tipElement);
    await waitFor(() => {
      const popperElement = screen.getByRole('tooltip').parentElement;
      expect(popperElement?.querySelector('svg')).toBeInTheDocument();
    });
  });

  test('default open', () => {
    render(
      <Tooltip defaultOpen title="This is a basic tooltip">
        Hover me
      </Tooltip>,
    );
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    expect(screen.getByRole('tooltip').innerHTML).toBe('This is a basic tooltip');
  });

  test('open', async () => {
    const mockCall = vi.fn(() => {});

    const ControlInExternal = () => {
      const [open, setOpen] = useState(true);
      const handleOpenChange = () => {
        mockCall();
      };
      return (
        <>
          <Button onClick={() => setOpen(!open)}>click</Button>
          <Tooltip onOpenChange={handleOpenChange} open={open} title="This is a basic tooltip">
            Hover me
          </Tooltip>
        </>
      );
    };

    render(<ControlInExternal />);
    // 展开状态
    const openElem = screen.getByText('Hover me');
    expect(openElem).toBeInTheDocument();
    expect(openElem).toHaveAttribute('data-state', 'instant-open');
    expect(screen.getByRole('tooltip').innerHTML).toBe('This is a basic tooltip');

    // 等待 tooltip 消失
    await act(() => userEvent.click(screen.getByRole('button')));
    await waitFor(() => {
      expect(screen.getByText('Hover me')).toHaveAttribute('data-state', 'closed');
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
      expect(mockCall).toBeCalledTimes(1);
    });
  });

  test('empty title', async () => {
    render(
      <Tooltip defaultOpen open title="">
        Hover me
      </Tooltip>,
    );
    // title为空时，tooltip 不渲染
    const tipElement = screen.getByText('Hover me');
    await userEvent.hover(tipElement);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  test('align', () => {
    render(
      <div className="w-[400px] h-[300px] flex items-center justify-center">
        <Tooltip open side="top" title="This is a top tooltip">
          Hover me
        </Tooltip>
        <Tooltip open side="bottom" title="This is a bottom tooltip">
          Hover me
        </Tooltip>
        <Tooltip open side="left" title="This is a left tooltip">
          Hover me
        </Tooltip>
        <Tooltip open side="right" title="This is a right tooltip">
          Hover me
        </Tooltip>
      </div>,
    );

    expect(screen.getAllByRole('tooltip')[0].innerHTML).toBe('This is a top tooltip');
    expect(screen.getAllByRole('tooltip')[1].innerHTML).toBe('This is a bottom tooltip');
    expect(screen.getAllByRole('tooltip')[2].innerHTML).toBe('This is a left tooltip');
    expect(screen.getAllByRole('tooltip')[3].innerHTML).toBe('This is a right tooltip');

    // 箭头位置
    expect(screen.queryAllByText('This is a top tooltip')[0]).toHaveAttribute('data-side', 'top');
    expect(screen.queryAllByText('This is a bottom tooltip')[0]).toHaveAttribute(
      'data-side',
      'bottom',
    );
    expect(screen.queryAllByText('This is a left tooltip')[0]).toHaveAttribute('data-side', 'left');
    expect(screen.queryAllByText('This is a right tooltip')[0]).toHaveAttribute(
      'data-side',
      'right',
    );
  });

  test('text wrap', () => {
    render(
      <Tooltip
        defaultOpen
        title="This is a long tooltip. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      >
        Hover me
      </Tooltip>,
    );
    const tooltipElement = screen.getByRole('tooltip').parentElement;
    expect(tooltipElement).toHaveClass('max-w-[280px]');
  });

  test('tooltip should not disappear on trigger click', async () => {
    const { getByText } = render(
      <div>
        <Tooltip defaultOpen title="This is a tooltip">
          <span>Hover me</span>
        </Tooltip>
      </div>,
    );

    //Tooltip初始是打开的
    expect(screen.getByRole('tooltip')).toBeInTheDocument();

    // 点击trigger部分
    const closeButton = getByText('Hover me');
    await act(() => userEvent.click(closeButton));

    // 验证 Tooltip 是否仍存在
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });

  // test('tooltip should disappear while opening modal', async () => {
  //   const ModalControlled = ({ open }: ModalProps) => {
  //     const [isOpen, setIsOpen] = useState(open || false);

  //     const handleOpen = () => {
  //       setIsOpen(true);
  //     };
  //     return (
  //       <div>
  //         <Tooltip title="tooltip title">
  //           <IconButton onClick={handleOpen}>
  //             <CloseLine16 />
  //           </IconButton>
  //         </Tooltip>
  //         <Modal cancelText="取消" onCancel={() => setIsOpen(false)} open={isOpen} />
  //       </div>
  //     );
  //   };

  //   const { getByText } = render(<ModalControlled />);
  //   const button = screen.getByRole('button');
  //   await act(() => userEvent.hover(button));
  //   await waitFor(() => {
  //     expect(screen.queryByRole('tooltip')).toBeInTheDocument();
  //   });
  //   // tooltip 已展开，点击trigger
  //   await act(() => userEvent.click(button));
  //   await waitFor(() => {
  //     expect(screen.queryByRole('tooltip')).toBeInTheDocument();
  //   });

  //   // 点击取消，检查Tooltip状态
  //   const closeButton = getByText('取消');
  //   await act(() => userEvent.click(closeButton));
  //   await waitFor(() => {
  //     expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  //   });
  // });
});
