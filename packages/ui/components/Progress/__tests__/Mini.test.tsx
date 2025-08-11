import React from 'react';
import { describe, expect, test } from 'vitest';
import userEvent from '@testing-library/user-event';

import Progress from '../Progress';
import { render, screen, waitFor } from '@testing-library/react';

describe('MiniProgress', () => {
  test('default', () => {
    const { container } = render(<Progress.Mini percent={50} />);
    const svgElem = container.querySelector('svg');
    expect(svgElem).toBeInTheDocument();
    expect(svgElem?.height).toBe('16');
    expect(svgElem?.width).toBe('16');
  });

  test('popover', async () => {
    const { container } = render(<Progress.Mini percent={50} popoverProps={{ content: '10%' }} />);
    const svgElem = container.querySelector('svg');

    if (svgElem) {
      await userEvent.hover(svgElem);
      await waitFor(() => {
        expect(screen.getByText('10%')).toBeInTheDocument();
      });
    }
  });
});
