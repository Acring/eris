import React from 'react';
import { describe, expect, test, vi } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Switch from '../Switch';

describe('Switch', () => {
  test('base', () => {
    render(<Switch label="default label" />);
    expect(screen.getByText('default label')).toBeInTheDocument();
    expect(screen.getByRole('switch', { checked: false })).toBeInTheDocument();
  });

  test('size', () => {
    render(
      <>
        <Switch className="px-1" size="small" />
        <Switch />
      </>,
    );
    const smallSwitch = screen.getAllByRole('switch', { checked: false })[0];
    expect(smallSwitch).toHaveClass('h-[10px] w-[16px] ');

    const defaultSwitch = screen.getAllByRole('switch', { checked: false })[1];
    expect(defaultSwitch).toHaveClass('h-[16px] w-[32px] ');
  });

  test('checked', () => {
    render(<Switch checked />);
    const switchElement = screen.getByRole('switch', { checked: true });
    expect(switchElement).toBeInTheDocument();
    expect(switchElement).toHaveClass('bg-success-normal');
  });
  test('disabled', async () => {
    render(
      <>
        <Switch disabled tooltip="禁用" />
        <Switch checked disabled tooltip="禁用" />
      </>,
    );
    const uncheckedElement = screen.getByRole('switch', { checked: false });
    expect(uncheckedElement).toBeDisabled();
    expect(uncheckedElement).toHaveClass('bg-offline-disable');

    const checkedElement = screen.getByRole('switch', { checked: true });
    expect(checkedElement).toBeDisabled();
    expect(checkedElement).toHaveClass('bg-success-disable');

    await act(() => userEvent.hover(checkedElement));
    await waitFor(() => {
      expect(screen.getByRole('tooltip').innerHTML).toBe('禁用');
    });
  });

  test('loading', () => {
    const { container } = render(<Switch loading />);
    expect(container.parentElement?.querySelector('svg')).toBeInTheDocument();
  });

  test('onChange', async () => {
    const onChange = vi.fn();
    render(<Switch onChange={onChange} />);
    const switchElement = screen.getByRole('switch', { checked: false });
    await act(() => userEvent.click(switchElement));
    expect(onChange).toHaveBeenCalled();
    expect(screen.getByRole('switch', { checked: true })).toBeInTheDocument();
  });
});
