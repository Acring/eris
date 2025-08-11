import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, expect, test } from 'vitest';

import Progress from '../Progress';
import userEvent from '@testing-library/user-event';

describe('LineProgress', () => {
  test('default', () => {
    render(<Progress percent={50} />);
    expect(screen.getByText('50%')).toBeInTheDocument();
    expect(screen.getByTestId('Progress-full')).toHaveClass('bg-progress-bg');
    expect(screen.getByTestId('Progress-cover').style.width).toEqual('50%');
  });

  test('rightInfo', () => {
    render(<Progress percent={50} rightInfo="进行中：50%" />);
    expect(screen.getByText('进行中：50%')).toBeInTheDocument();
  });

  test('color', () => {
    const { container } = render(
      <div>
        <Progress color="default" percent={50} />
        <Progress color="warning" percent={50} />
        <Progress color="danger" percent={50} />
      </div>,
    );

    expect(container.querySelector('.bg-progress-normal')).toBeInTheDocument();
    expect(container.querySelector('.bg-warning-normal')).toBeInTheDocument();
    expect(container.querySelector('.bg-danger-normal')).toBeInTheDocument();
  });

  test('popover', async () => {
    render(<Progress percent={50} popoverProps={{ content: '进行中：50%' }} />);
    const target = screen.getByTestId('Progress-full');

    await userEvent.hover(target);
    await waitFor(() => {
      expect(screen.getByText('进行中：50%')).toBeInTheDocument();
    });
  });

  test('segmentation', () => {
    const { container } = render(
      <Progress
        segmentation={{
          active: 10,
          warning: 20,
          danger: 30,
        }}
      />,
    );
    expect(screen.getByText('60%')).toBeInTheDocument();
    expect(container.querySelector('.bg-success-normal')).toBeInTheDocument();
    expect(container.querySelector('.bg-warning-normal')).toBeInTheDocument();
    expect(container.querySelector('.bg-danger-normal')).toBeInTheDocument();
  });

  test('size', () => {
    render(<Progress percent={60} size="lg" />);
    expect(screen.getByTestId('Progress-full')).toHaveClass('h-[8px]');
  });
});
