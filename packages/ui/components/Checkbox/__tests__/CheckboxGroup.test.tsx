import React from 'react';
import { expect, describe, test, vi } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CheckboxGroup } from '..';

const options = [
  { label: 'Apple', value: 'Apple', extra: 'Apple extra' },
  { label: 'Pear disabled', value: 'Pear', disabled: true, tooltip: 'Pear disabled' },
  { label: 'Orange with tooltip', value: 'Orange', tooltip: 'orange desc' },
];
describe('CheckboxGroup', () => {
  test('base', () => {
    const { container } = render(<CheckboxGroup name="fruit" options={options} />);

    const labelElements = container.querySelectorAll('label');
    expect(labelElements.length).toEqual(3);
    expect(labelElements[0]).toHaveTextContent('Apple');
    expect(labelElements[1]).toHaveTextContent('Pear disabled');
    expect(labelElements[2]).toHaveTextContent('Orange with tooltip');
    expect(screen.queryByText('Apple extra')).not.toBeNull();
  });

  test('disabled', () => {
    const { container } = render(<CheckboxGroup disabled name="fruit" options={options} />);
    const labelElements = container.querySelectorAll('label');
    expect(labelElements[0].querySelector('input[type="checkbox"]')).toBeDisabled();
    expect(labelElements[1].querySelector('input[type="checkbox"]')).toBeDisabled();
    expect(labelElements[2].querySelector('input[type="checkbox"]')).toBeDisabled();
  });

  test('vertical', () => {
    const { container } = render(
      <CheckboxGroup direction="vertical" name="fruit" options={options} />,
    );
    expect(container.querySelector('div.flex.flex-col')).toBeInTheDocument();
  });

  test('hover', async () => {
    const { container } = render(<CheckboxGroup name="fruit" options={options} />);

    const labelElements = container.querySelectorAll('label');
    await act(() => userEvent.hover(labelElements[2]));
    await waitFor(() => {
      expect(screen.getByRole('tooltip').innerHTML).toBe('orange desc');
    });
  });

  test('click', async () => {
    const onChange = vi.fn(() => {});
    render(<CheckboxGroup name="fruit" onChange={onChange} options={options} />);

    const inputElements = screen.queryAllByTestId('Checkbox-check');
    await act(() => userEvent.click(inputElements[0]));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(screen.queryAllByRole('checkbox')[0]).toHaveAttribute('data-state', 'checked');
    expect(inputElements[0]).toHaveClass('bg-checkbox-bg-checked-normal');

    // 取消选中
    await act(() => userEvent.click(inputElements[0]));
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(inputElements[0]).not.toHaveClass('bg-checkbox-bg-checked-normal');
  });
});
