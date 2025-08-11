import React from 'react';
import { describe, expect, test } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { CloseLine16 } from '@xsky/eris-icons';

import IconButton from '../IconButton';
import userEvent from '@testing-library/user-event';

describe('IconButton', () => {
  test('basic', () => {
    const { container } = render(
      <IconButton>
        <CloseLine16 />
      </IconButton>,
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  test('disabled', () => {
    render(
      <IconButton disabled>
        <CloseLine16 />
      </IconButton>,
    );
    const buttonElem = screen.getByRole('button');
    expect(buttonElem).toHaveAttribute('disabled');
    expect(buttonElem).toHaveClass(
      'disabled:cursor-not-allowed disabled:text-icon-status-filled-disable',
    );
  });

  test('clickableAreaInvisible', () => {
    render(
      <IconButton clickableAreaInvisible>
        <CloseLine16 />
      </IconButton>,
    );
    const buttonElem = screen.getByRole('button');
    expect(buttonElem).toHaveClass('bg-transparent hover:text-icon-status-outlined-hover');
  });

  test('withTooltip', async () => {
    render(
      <IconButton disabled tooltip="这是一个提示">
        <CloseLine16 />
      </IconButton>,
    );
    const buttonElem = screen.getByRole('button');
    await userEvent.hover(buttonElem);
    await waitFor(() => {
      expect(screen.getByRole('tooltip').innerHTML).toBe('这是一个提示');
    });
  });

  test('changePadding', () => {
    render(
      <IconButton className="p-[9px]">
        <CloseLine16 />
      </IconButton>,
    );
    expect(screen.getByRole('button')).toHaveClass('p-[9px]');
  });

  test('color', () => {
    render(
      <div className="flex items-start gap-1">
        <IconButton color="default">
          <CloseLine16 />
        </IconButton>
        <IconButton color="primary">
          <CloseLine16 />
        </IconButton>
        <IconButton color="danger">
          <CloseLine16 />
        </IconButton>
      </div>,
    );

    expect(screen.getAllByRole('button').at(0)).toHaveClass(
      'hover:text-icon-status-outlined-hover active:text-icon-status-outlined-click',
    );
    expect(screen.getAllByRole('button').at(1)).toHaveClass(
      'hover:text-primary-hover active:text-primary-click',
    );
    expect(screen.getAllByRole('button').at(2)).toHaveClass(
      'hover:text-danger-hover active:text-danger-click',
    );
  });

  test('active', () => {
    render(
      <IconButton active>
        <CloseLine16 />
      </IconButton>,
    );
    expect(screen.getByRole('button')).toHaveClass('text-primary-normal');
  });
});
