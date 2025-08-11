import React from 'react';
import { expect, describe, test, vi } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RightLine16 } from '@xsky/eris-icons';
import { cn } from '@/lib/utils';
import { Checkbox } from '../../Checkbox';
import { Tabs } from '../../Tabs';
import { Card } from '..';

const commonArgs = {
  className: 'w-[300px] h-[300px]',
  title: '标题',
  extra: (
    <div className="text-text-2 hover:text-primary-hover flex cursor-pointer">
      更多
      <RightLine16 className="pt-[3px]" />
    </div>
  ),
  children: (
    <div>
      <p>内容</p>
      <p>内容</p>
      <p>内容</p>
    </div>
  ),
};

describe('Card', () => {
  test('base', () => {
    const { container } = render(<Card {...commonArgs} />);

    expect(screen.getByText('标题')).toBeInTheDocument();
    expect(screen.getByText('更多')).toBeInTheDocument();
    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(screen.queryAllByText('内容').length).toEqual(3);
  });

  test('size', () => {
    render(
      <div className="flex items-start gap-2">
        <Card {...commonArgs} />
        <Card {...commonArgs} size="small" />
        <Card {...commonArgs} className="w-[300px] px-[8px] py-[8px]" />
      </div>,
    );
    const card = screen.getAllByTestId('Card-root');
    if (card) {
      expect(card.at(0)).toHaveClass('px-[24px] pb-[24px] pt-[16px]');
      expect(card.at(1)).toHaveClass('px-[16px] pb-[16px] pt-[8px]');
      expect(card.at(2)).toHaveClass('px-[8px] py-[8px]');
    }
  });

  test('inner', () => {
    render(
      <Card className="w-[300px]" title="嵌套标题1" type="inner">
        内容1
      </Card>,
    );
    const cardElement = screen.getByTestId('Card-root');
    expect(cardElement).toHaveClass('shadow-none');
  });

  test('with operate', async () => {
    const mockCall = vi.fn(() => {});
    const OperateCard = () => {
      const [checked, setChecked] = React.useState(false);
      const [hovered, setHovered] = React.useState(false);

      const handleCheckedChange = (newChecked: boolean) => {
        setChecked(newChecked);
        mockCall();
      };
      return (
        <Card
          {...commonArgs}
          className={cn(
            'border-stroke-border-2 w-[400px] border border-solid transition-shadow duration-200',
            {
              'border-primary-normal': checked,
              'shadow-elevation-3-bottom': hovered,
              'shadow-none': !hovered,
            },
          )}
          extra="操作区域"
          title={
            <Checkbox
              checked={checked}
              className="h-full w-full"
              onChange={handleCheckedChange}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <div className="ml-[8px] cursor-pointer">标签</div>
            </Checkbox>
          }
        />
      );
    };

    const { container } = render(<OperateCard />);

    const cardElement = screen.getByTestId('Card-root');
    const labelElement = container.querySelector('label');
    const checkbox = screen.getByRole('checkbox');

    expect(labelElement).toBeInTheDocument();
    expect(cardElement).toHaveClass('shadow-none');

    if (labelElement) {
      await act(() => userEvent.hover(labelElement));
      await waitFor(() => {
        expect(cardElement).toHaveClass('shadow-elevation-3-bottom');
      });

      // 选择 card
      await act(() => userEvent.click(checkbox));
      expect(checkbox).toBeChecked();
      expect(cardElement).toHaveClass('border-primary-normal');
      expect(mockCall).toHaveBeenCalledTimes(1);

      // 取消选择 card
      await act(() => userEvent.click(checkbox));
      expect(checkbox).not.toBeChecked();
      expect(cardElement).not.toHaveClass('border-primary-normal');
      expect(mockCall).toHaveBeenCalledTimes(2);
    }
  });

  test('with tab', async () => {
    render(
      <Card className="w-[400px]" title="标题">
        <Tabs
          tabs={[
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
          ]}
        />
      </Card>,
    );
    const tablist = screen.getByRole('tablist');
    const tabs = screen.getAllByRole('tab');

    expect(tablist).toBeInTheDocument();
    expect(tabs.length).toEqual(2);
    expect(screen.getByText('Content of Tab Pane 1')).toBeVisible();
    expect(screen.queryByText('Content of Tab Pane 2')).not.toBeInTheDocument();

    // 切换 tab
    const lastTab = tabs[tabs.length - 1];
    await act(() => userEvent.click(lastTab));

    expect(screen.getByText('Content of Tab Pane 2')).toBeVisible();
    expect(screen.queryByText('Content of Tab Pane 1')).not.toBeInTheDocument();
  });
});
