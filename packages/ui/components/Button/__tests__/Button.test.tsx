import React from 'react';
import { expect, describe, test } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '..';
import { DeleteLine16 } from '@xsky/eris-icons';

describe('Button', () => {
  test('base', () => {
    render(<Button>button</Button>);

    const contentWrapper = screen.getByRole('button');
    const contentResult = screen.findByText('button');

    expect(contentWrapper).toBeDefined();
    expect(contentResult).to.exist;
  });

  test('type', () => {
    render(
      <div>
        <Button type="primary">button</Button>
        <Button type="secondary">button</Button>
        <Button type="outlined">button</Button>
        <Button type="text">button</Button>
      </div>,
    );
    expect(screen.getAllByRole('button').at(0)?.classList.contains('bg-primary-normal')).toBe(true);
    expect(screen.getAllByRole('button').at(1)?.classList.contains('border-transparent')).toBe(
      true,
    );
    expect(screen.getAllByRole('button').at(2)?.classList.contains('border-stroke-border-2')).toBe(
      true,
    );
    expect(screen.getAllByRole('button').at(3)?.classList.contains('border-transparent')).toBe(
      true,
    );
  });

  test('size', () => {
    render(
      <div className="flex items-start gap-2">
        <Button size="lg">Button</Button>
        <Button size="md">Button</Button>
        <Button size="sm">Button</Button>
        <Button size="xs">Button</Button>
      </div>,
    );

    expect(screen.getAllByRole('button').at(0)).toHaveClass('px-[15px] py-[10px]');
    expect(screen.getAllByRole('button').at(1)).toHaveClass('px-[15px] h-[34px]');
    expect(screen.getAllByRole('button').at(2)).toHaveClass('px-[7px] h-[28px]');
    expect(screen.getAllByRole('button').at(3)).toHaveClass('px-[7px] h-[24px]');
  });

  test('icon', () => {
    const { container } = render(<Button icon={<DeleteLine16 />}>Button</Button>);
    expect(screen.getByRole('button')).toBeDefined();
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  test('color', () => {
    render(
      <div>
        <Button color="danger">button</Button>
        <Button color="danger" type="outlined">
          button
        </Button>
      </div>,
    );
    expect(screen.getAllByRole('button').at(0)?.classList.contains('text-white')).toBe(true);
    expect(screen.getAllByRole('button').at(1)?.classList.contains('text-danger-normal')).toBe(
      true,
    );
  });

  test('tooltips', async () => {
    render(<Button tooltip="这是一个提示">Button</Button>);

    await act(() => userEvent.hover(screen.getByRole('button')));
    await waitFor(() => {
      expect(screen.getByRole('tooltip').innerHTML).toBe('这是一个提示');
    });
  });

  test('loading', () => {
    const { container } = render(<Button loading>Button</Button>);

    const imgElem = container.querySelector('svg');
    const altContent = screen.getByTestId('Spinner-root');
    expect(imgElem).toBeDefined();
    expect(altContent).to.exist;
  });

  test('disabled', () => {
    render(<Button disabled>Button</Button>);

    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByRole('button').classList.contains('disabled:cursor-not-allowed')).toBe(true);
  });

  test('htmlType', () => {
    render(<Button htmlType="reset">Button</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'reset');
  });
});
