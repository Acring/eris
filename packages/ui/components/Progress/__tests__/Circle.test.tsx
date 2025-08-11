import React from 'react';
import { describe, expect, test } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Progress from '../Progress';

describe('CircleProgress', () => {
  test('default', () => {
    const { container } = render(<Progress.Circle percent={50} />);

    expect(screen.getByText('50%')).toBeInTheDocument();
    const circles = container.querySelectorAll('circle');
    expect(circles.length).toEqual(2);
    expect(circles[0]).toHaveClass('stroke-progress-bg');
    expect(circles[1].style.stroke).toEqual('var(--progress-normal)');
  });

  test('popover', async () => {
    const { container } = render(
      <Progress.Circle
        percent={50}
        popoverProps={{
          content: '提示语',
        }}
      />,
    );
    const target = container.querySelector('div[type="button"]');

    if (target) {
      await userEvent.hover(target);
      await waitFor(() => {
        expect(screen.getByText('提示语')).toBeInTheDocument();
      });
    }
  });
});
