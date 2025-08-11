import React from 'react';
import { describe, expect, test, vi } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { StepsPropsVerticalInteractive } from '../type';
import Steps from '../Steps';

const items = [
  {
    title: '第一步',
    description: '第一步的描述',
    content: '这是第一步的内容呀',
  },
  {
    title: '第二步',
    description: '第二步的描述',
    content: '这是第二步的内容呀',
  },
  {
    title: '第三步',
    description: '第三步的描述',
    content: '这是第三步的内容呀',
  },
];

const StepsComponent = (args: Partial<StepsPropsVerticalInteractive>) => {
  const { current: defaultCurrent = 1, direction, size, onStepClick: handleClick } = args;
  const [current, setCurrent] = React.useState(defaultCurrent);
  const onClick = (current: number, e: React.MouseEvent<HTMLDivElement>) => {
    setCurrent(current);
    handleClick && handleClick(current, e);
  };
  React.useEffect(() => {
    setCurrent(defaultCurrent);
  }, [defaultCurrent]);
  return (
    <Steps
      current={current}
      direction={direction}
      items={items}
      onStepClick={onClick}
      size={size}
    />
  );
};

describe('Steps', () => {
  test('base', () => {
    render(<StepsComponent current={2} />);

    const preElement = screen.getByText('第一步');
    expect(preElement).toBeInTheDocument();
    expect(preElement.querySelector('button')).toBeInTheDocument();
    expect(preElement.parentElement?.querySelector('svg')).toBeInTheDocument();
    expect(screen.queryByText('这是第一步的内容呀')).not.toBeInTheDocument();

    const currentElement = screen.getByText('第二步');
    expect(currentElement).toBeInTheDocument();
    expect(screen.getByText('这是第二步的内容呀')).toBeInTheDocument();
    expect(screen.getByText('2')).toHaveClass('bg-primary-normal');
  });

  test('back', async () => {
    const mockCall = vi.fn(() => {});

    const { container } = render(<StepsComponent current={2} onStepClick={mockCall} />);

    const backPreButton = container.querySelector('button[type="button"]');
    expect(backPreButton).toBeInTheDocument();
    if (backPreButton) {
      await act(async () => {
        await userEvent.click(backPreButton);
      });
      expect(mockCall).toHaveBeenCalledTimes(1);
      expect(screen.queryByText('这是第一步的内容呀')).toBeInTheDocument();
      expect(screen.queryByText('这是第二步的内容呀')).not.toBeInTheDocument();
      expect(backPreButton).not.toBeInTheDocument();
    }
  });

  test('size', () => {
    render(
      <div>
        <StepsComponent current={2} />
        <StepsComponent current={2} size="lg" />
      </div>,
    );

    expect(screen.queryAllByTestId('Steps-stepDescription')[0]).toHaveClass('pb-[24px]');
    expect(screen.queryAllByTestId('Steps-stepDescription')[4]).toHaveClass('pb-[56px]');
  });

  test('horizontal', async () => {
    const { container } = render(
      <Steps
        current={2}
        direction="horizontal"
        items={[
          {
            title: '第一步',
          },
          {
            title: '第二步',
            description: '第二步的描述',
          },
          {
            title: '第三步',
          },
        ]}
      />,
    );

    const tooltipEle = screen.getByText('第二步').querySelector('svg');
    expect(container.querySelectorAll('div.max-w-\\[66\\%\\]').length).toEqual(3);

    if (tooltipEle) {
      await act(async () => {
        await userEvent.hover(tooltipEle);
      });
      await waitFor(() => {
        expect(screen.getByRole('tooltip').innerHTML).toBe('第二步的描述');
      });
    }

    const backPreButton = container.querySelector('button[type="button"]');
    expect(backPreButton).not.toBeInTheDocument();
  });

  test('abnormal', async () => {
    render(
      <Steps
        current={2}
        direction="horizontal"
        items={[
          {
            title: '第一步',
            actionStatus: 'warning',
            description: '当前步骤状态异常',
          },
          {
            title: '第二步',
            actionStatus: 'error',
            description: '当前步骤状态错误',
          },
          {
            title: '第三步标题很长很长很长很长很长很长第三步标题很长很长很长很长很长很长',
            description: '标题超长自动换行',
          },
        ]}
      />,
    );

    const preStep = screen.getByText('第一步');
    const tooltipEle = preStep.querySelector('svg');

    if (tooltipEle) {
      await act(async () => {
        await userEvent.hover(tooltipEle);
      });
      await waitFor(() => {
        expect(screen.getByRole('tooltip').innerHTML).toBe('当前步骤状态异常');
      });
    }
    expect(preStep.parentElement?.querySelector('svg')).toHaveClass('text-warning-normal');

    const curStep = screen.getByText('第二步');
    expect(curStep.parentElement?.querySelector('svg')).toHaveClass('text-danger-normal');
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  test('display', () => {
    render(
      <Steps
        items={[
          {
            title: '第一步',
            description: '第一步内容',
          },
          {
            title: '第二步',
            description: '第二步内容',
          },
        ]}
        mode="display"
      />,
    );
    expect(screen.queryByText('第一步内容')).toBeInTheDocument();
    expect(screen.queryByText('第二步内容')).toBeInTheDocument();
  });
});
