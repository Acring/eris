import React from 'react';
import { expect, describe, test, afterEach } from 'vitest';
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  act,
  cleanup,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Popover from '../Popover';

describe('Popover', () => {
  afterEach(cleanup);

  test('base', () => {
    render(<Popover content="This is a basic popover">Hover me</Popover>);

    expect(screen.getByText('Hover me')).toBeInTheDocument();
  });

  test('hover', async () => {
    render(<Popover content="This is a basic popover">Hover me</Popover>);

    const popoverTrigger = screen.getByText('Hover me');
    expect(popoverTrigger).toHaveAttribute('data-state', 'closed');

    await act(() => userEvent.hover(popoverTrigger));
    await waitFor(() => {
      expect(screen.getByText('This is a basic popover')).toBeInTheDocument();
      expect(popoverTrigger).toHaveAttribute('data-state', 'open');
    });

    // 等待 popover 消失
    await act(() => userEvent.unhover(popoverTrigger));
    waitForElementToBeRemoved(screen.queryByText('This is a basic popover')).then(() => {
      expect(screen.queryByText('This is a basic popover')).not.toBeInTheDocument();
      // expect(getByText('Hover me')).toHaveAttribute('data-state', 'closed');
    });
  });

  test('arrow', async () => {
    render(
      <Popover arrow content="This is a basic popover">
        Hover me
      </Popover>,
    );

    const popoverTrigger = screen.getByText('Hover me');

    await userEvent.hover(popoverTrigger);
    await waitFor(() => {
      const popoverElement = screen.getByText('This is a basic popover').parentElement;
      expect(popoverElement?.querySelector('.popover-arrow')).toBeInTheDocument();
    });
  });

  test('default open', () => {
    render(
      <Popover content="This is a basic popover" defaultOpen>
        Hover me
      </Popover>,
    );
    expect(screen.getByText('This is a basic popover')).toBeInTheDocument();
  });

  test('open', async () => {
    const ControlInExternal = () => {
      return (
        <div>
          <div>hover me to hide</div>
          <div>
            <Popover content="This is a basic popover" defaultOpen>
              Hover me
            </Popover>
          </div>
        </div>
      );
    };

    render(<ControlInExternal />);
    // 展开状态
    const openElem = screen.getByText('Hover me');
    expect(openElem).toBeInTheDocument();
    expect(openElem).toHaveAttribute('data-state', 'open');
    expect(screen.getByText('This is a basic popover')).toBeInTheDocument();

    const popoverTrigger = screen.getByText('Hover me');
    // trigger 默认为 hover，点击时dom不消失
    await act(() => userEvent.click(popoverTrigger));
    await waitFor(() => {
      expect(screen.getByText('Hover me')).toHaveAttribute('data-state', 'open');
      expect(screen.queryByText('This is a basic popover')).toBeInTheDocument();
    });

    // hover 其他 dom 时 popover 消失
    const otherDom = screen.getByText('hover me to hide');
    await userEvent.hover(otherDom);
    waitForElementToBeRemoved(screen.queryByText('This is a basic popover')).then(() => {
      // expect(screen.getByText('Hover me')).toHaveAttribute('data-state', 'closed');
      expect(screen.queryByText('This is a basic popover')).not.toBeInTheDocument();
    });
  });

  test('align', () => {
    render(
      <div className="w-[400px] h-[300px] flex items-center justify-center">
        <Popover content="This is a top popover" open side="top">
          Hover me
        </Popover>
        <Popover content="This is a bottom popover" open side="bottom">
          Hover me
        </Popover>
        <Popover content="This is a left popover" open side="left">
          Hover me
        </Popover>
        <Popover content="This is a right popover" open side="right">
          Hover me
        </Popover>
      </div>,
    );

    expect(screen.getAllByText(/This is a \w+ popover/)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/This is a \w+ popover/)[1]).toBeInTheDocument();
    expect(screen.getAllByText(/This is a \w+ popover/)[2]).toBeInTheDocument();
    expect(screen.getAllByText(/This is a \w+ popover/)[3]).toBeInTheDocument();

    // 验证 popover 的对齐位置
    expect(
      screen.queryByText('This is a top popover')?.parentElement?.parentElement,
    ).toHaveAttribute('data-side', 'top');
    expect(
      screen.queryByText('This is a bottom popover')?.parentElement?.parentElement,
    ).toHaveAttribute('data-side', 'bottom');
    expect(
      screen.queryByText('This is a left popover')?.parentElement?.parentElement,
    ).toHaveAttribute('data-side', 'left');
    expect(
      screen.queryByText('This is a right popover')?.parentElement?.parentElement,
    ).toHaveAttribute('data-side', 'right');
  });

  test('popover should not disappear on trigger click', async () => {
    const { getByText } = render(
      <Popover content="This is a popover" defaultOpen>
        Hover me
      </Popover>,
    );

    // Popover 初始是打开的
    expect(screen.getByText('This is a popover')).toBeInTheDocument();

    // 点击 trigger 部分
    const triggerElement = getByText('Hover me');
    await userEvent.click(triggerElement);

    // 验证 Popover 是否存在
    expect(screen.getByText('This is a popover')).toBeInTheDocument();
  });

  test('trigger click', async () => {
    const ControlInExternal = () => {
      return (
        <Popover content="This is a basic popover" defaultOpen trigger={['hover']}>
          Click me
        </Popover>
      );
    };

    render(<ControlInExternal />);
    // 展开状态
    const openElem = screen.getByText('Click me');
    expect(openElem).toBeInTheDocument();
    expect(openElem).toHaveAttribute('data-state', 'open');
    expect(screen.getByText('This is a basic popover')).toBeInTheDocument();

    const popoverTrigger = screen.getByText('Click me');
    // unhover 时等待 popover 不消失
    await act(() => userEvent.unhover(popoverTrigger));
    await waitFor(() => {
      expect(screen.getByText('Click me')).toHaveAttribute('data-state', 'open');
      expect(screen.queryByText('This is a basic popover')).toBeInTheDocument();
    });
    // trigger 设置为了 click，点击时dom消失
    await userEvent.click(popoverTrigger);
    waitForElementToBeRemoved(screen.queryByText('This is a basic popover')).then(() => {
      expect(screen.queryByText('This is a basic popover')).not.toBeInTheDocument();
      // expect(screen.getByText('Click me')).toHaveAttribute('data-state', 'closed');
    });
  });
});
