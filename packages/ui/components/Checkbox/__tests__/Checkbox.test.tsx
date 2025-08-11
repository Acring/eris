import React from 'react';
import { expect, describe, test, vi } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from '..';

describe('Checkbox', () => {
  test('base', () => {
    const { container } = render(<Checkbox>default label</Checkbox>);
    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).toBeInTheDocument();
    expect(screen.getByText('default label')).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
    expect(container.querySelector('svg')).not.toBeInTheDocument();
  });

  test('checked', () => {
    const { container } = render(<Checkbox checked>checked label</Checkbox>);
    const checkbox = screen.getByRole('checkbox');
    const checkboxElement = screen.getByTestId('Checkbox-check');

    expect(checkbox).toHaveAttribute('data-state', 'checked');
    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(checkboxElement).toHaveClass('bg-checkbox-bg-checked-normal');
  });

  test('disabled', async () => {
    render(
      <Checkbox disabled tooltip="禁用">
        disabled label
      </Checkbox>,
    );
    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).toBeDisabled();

    act(() => {
      userEvent.hover(checkbox);
    });
    await waitFor(() => {
      expect(screen.getByRole('tooltip').innerHTML).toBe('禁用');
    });
  });

  test('indeterminate', () => {
    const { container } = render(<Checkbox indeterminate>indeterminate label</Checkbox>);
    expect(
      container.querySelector('div.animate-scaleAndFadeWithTranslateCenter'),
    ).toBeInTheDocument();
  });

  test('tooltip', async () => {
    render(<Checkbox tooltip="This is a tooltip">tooltip label</Checkbox>);
    const checkbox = screen.getByRole('checkbox');
    await act(() => userEvent.hover(checkbox));
    await waitFor(() => {
      expect(screen.getByRole('tooltip').innerHTML).toBe('This is a tooltip');
    });
  });

  test('extra', () => {
    const { container } = render(<Checkbox extra={<div>extra</div>}>extra label</Checkbox>);
    expect(container.querySelector('div')).toHaveTextContent('extra');
  });

  test('click', async () => {
    const mockCall = vi.fn(() => {});
    render(<Checkbox onChange={() => mockCall()}>click label</Checkbox>);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('data-state', 'unchecked');

    await act(() => userEvent.click(checkbox));
    expect(checkbox).toHaveAttribute('data-state', 'checked');
    expect(mockCall).toHaveBeenCalledTimes(1);
  });

  test('optionInfo', async () => {
    const optionInfo = 'info';
    const { container } = render(
      <Checkbox disabled extra={<div>extra</div>} optionInfo={optionInfo}>
        extra label
      </Checkbox>,
    );
    const labelElements = container.querySelectorAll('svg');
    await act(() => userEvent.hover(labelElements[0]));
    await waitFor(() => {
      expect(screen.getByRole('tooltip').innerHTML).toBe(optionInfo);
    });
  });
});
