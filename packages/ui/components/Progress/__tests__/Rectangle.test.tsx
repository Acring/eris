import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, expect, test } from 'vitest';

import Progress from '../Progress';
import userEvent from '@testing-library/user-event';

describe('RectangleProgress', () => {
  test('default', () => {
    const { container } = render(<Progress.Rectangle percent={50} />);
    expect(container.querySelectorAll('.bg-progress-normal').length).toBe(5);
    expect(container.querySelectorAll('.bg-progress-bg').length).toBe(5);
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  test('rightInfo', () => {
    const { container } = render(<Progress.Rectangle percent={50} rightInfo="进行中：50%" />);
    expect(container.querySelectorAll('.bg-progress-normal').length).toBe(5);
    expect(container.querySelectorAll('.bg-progress-bg').length).toBe(5);
    expect(screen.getByText('进行中：50%')).toBeInTheDocument();
  });

  test('popover', async () => {
    render(<Progress.Rectangle percent={50} popoverProps={{ content: '进行中：50%' }} />);
    const target = screen.getByTestId('RectangleProgress-full');

    await userEvent.hover(target);
    await waitFor(() => {
      expect(screen.getByText('进行中：50%')).toBeInTheDocument();
    });
  });
});
