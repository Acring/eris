import React from 'react';
import { describe, expect, test, vi } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Radio from '../Radio';

describe('Radio', () => {
  test('base', () => {
    render(<Radio label="Default Radio" value="default" />);
    expect(screen.getByText('Default Radio')).toBeInTheDocument();
    expect(screen.getByRole('radio')).toBeInTheDocument();
  });

  test('checked', () => {
    const { container } = render(<Radio checked label="Default Radio" value="default" />);

    expect(screen.getByRole('radio')).toBeInTheDocument();
    expect(container.querySelector('.radio-variants')).toHaveClass(
      'border-radio-border-checked-active',
    );
  });

  test('disabled', () => {
    const { container } = render(<Radio disabled label="Default Radio" value="default" />);
    const radio = screen.getByRole('radio');

    expect(radio).toBeDisabled();
    expect(container.querySelector('label')).toHaveClass('cursor-not-allowed');
  });

  test('tooltip', async () => {
    render(<Radio label="Default Radio" tooltip="This is a tooltip" value="default" />);
    const radio = screen.getByRole('radio');

    await act(() => userEvent.hover(radio));
    await waitFor(() => {
      expect(screen.getByRole('tooltip').innerHTML).toBe('This is a tooltip');
    });
  });

  test('extra', () => {
    render(<Radio extra={<div>extra</div>} label="Default Radio" value="default" />);
    const extra = screen.getByText('extra');
    expect(extra).toBeInTheDocument();
    expect(extra?.parentElement).toHaveClass('text-text-3');
  });

  test('controlled', async () => {
    const mockCall = vi.fn(() => {});

    const ControlledRadio = () => {
      const [checked, setChecked] = React.useState(false);
      const handleCheckedChange = (value: string) => {
        setChecked(!!value);
        mockCall();
      };
      return (
        <div>
          <div>
            <Radio allowUncheck checked={checked} onChange={handleCheckedChange} value="default">
              control checked and allowUncheck
            </Radio>
          </div>
        </div>
      );
    };
    render(<ControlledRadio />);

    const radio = screen.getByRole('radio');
    const label = screen.getByText('control checked and allowUncheck');
    expect(radio).toHaveAttribute('data-state', 'unchecked');
    // 选中
    await act(() => userEvent.click(label));
    expect(radio).toHaveAttribute('data-state', 'checked');
    expect(mockCall).toHaveBeenCalledTimes(1);
    // 取消选中
    await act(() => userEvent.click(label));
    expect(radio).toHaveAttribute('data-state', 'unchecked');
    expect(mockCall).toHaveBeenCalledTimes(2);
  });
});
