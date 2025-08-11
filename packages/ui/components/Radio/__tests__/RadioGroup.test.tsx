import React from 'react';
import { describe, expect, test, vi } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import RadioGroup from '../RadioGroup';
import { RadioItem } from '../Radio';
import { Button } from '../../Button';

const options = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2', disabled: true },
  { label: 'Option 3', value: 'option3', tooltip: 'This is option 3', optionInfo: 'info' },
];

describe('RadioGroup', () => {
  test('base', () => {
    const { container } = render(<RadioGroup options={options} />);
    const labelElements = container.querySelectorAll('label');
    expect(labelElements.length).toEqual(3);
    expect(screen.getAllByRole('radio').length).toEqual(3);
    expect(labelElements[0]).toHaveTextContent('Option 1');
    expect(labelElements[1]).toHaveTextContent('Option 2');
    expect(labelElements[2]).toHaveTextContent('Option 3');
    expect(labelElements[1]).toHaveClass('cursor-not-allowed');
  });

  test('disabled', () => {
    const { container } = render(<RadioGroup disabled options={options} />);
    const labelElements = container.querySelectorAll('label');
    labelElements.forEach((label) => {
      expect(label).toHaveClass('cursor-not-allowed');
      expect(label.querySelector('input[type="radio"]')).toBeDisabled();
    });
  });

  test('tooltip', async () => {
    const { container } = render(<RadioGroup options={options} />);
    const labelElements = container.querySelectorAll('label');
    await act(async () => {
      await userEvent.hover(labelElements[2]);
    });
    await waitFor(() => {
      expect(screen.getByRole('tooltip').innerHTML).toBe('This is option 3');
    });
  });

  test('optionInfo', async () => {
    const { container } = render(<RadioGroup options={options} />);
    const labelElements = container.querySelectorAll('svg');
    await act(async () => {
      await userEvent.hover(labelElements[0]);
    });
    await waitFor(() => {
      expect(screen.getByRole('tooltip').innerHTML).toBe('info');
    });
  });

  test('click without allowUncheck', async () => {
    const mockCall = vi.fn(() => {});

    const { container } = render(
      <RadioGroup defaultValue="option1" onChange={mockCall} options={options} />,
    );
    const inputElements = container.querySelectorAll('input[type="radio"]');
    expect(inputElements[0]).toHaveAttribute('data-state', 'checked');
    expect(inputElements[0].nextElementSibling).toHaveClass('border-radio-border-checked-active');
    expect(inputElements[2]).toHaveAttribute('data-state', 'unchecked');
    // 验证未选中的按钮是否使用了 opacity 隐藏
    const labelUnchecked = container.querySelectorAll('label')[2];
    const opacityElement = labelUnchecked.querySelector('.opacity-0');
    expect(opacityElement).not.toBeNull();

    // 点击选中第三个
    await act(async () => {
      await userEvent.click(container.querySelectorAll('label')[2]);
    });
    expect(inputElements[0]).toHaveAttribute('data-state', 'unchecked');
    expect(inputElements[0].nextElementSibling).not.toHaveClass(
      'border-radio-border-checked-active',
    );
    expect(inputElements[2]).toHaveAttribute('data-state', 'checked');
    expect(mockCall).toHaveBeenCalledTimes(1);
    expect(mockCall).toHaveBeenCalledWith('option3');

    // 无法取消选中第三个
    await act(async () => {
      await userEvent.click(container.querySelectorAll('label')[2]);
    });
    expect(inputElements[2]).toHaveAttribute('data-state', 'checked');
    expect(mockCall).toHaveBeenCalledTimes(1);
  });

  test('click with allowUncheck', async () => {
    const mockCall = vi.fn();

    const { container } = render(
      <RadioGroup allowUncheck onChange={(value) => mockCall(value)} options={options} />,
    );
    const inputElements = container.querySelectorAll('input[type="radio"]');

    // 点击选中第三个
    await act(async () => {
      await userEvent.click(container.querySelectorAll('label')[2]);
    });
    expect(inputElements[0]).toHaveAttribute('data-state', 'unchecked');
    expect(inputElements[0].nextElementSibling).not.toHaveClass('border-primary-normal');
    expect(inputElements[2]).toHaveAttribute('data-state', 'checked');
    expect(mockCall).toHaveBeenCalledTimes(1);
    expect(mockCall).toHaveBeenCalledWith('option3');

    // 取消选中第三个
    await act(async () => {
      await userEvent.click(container.querySelectorAll('label')[2]);
    });
    expect(inputElements[2]).toHaveAttribute('data-state', 'unchecked');
    expect(mockCall).toHaveBeenCalledTimes(2);
    expect(mockCall).toHaveBeenCalledWith('');
  });

  test('vertical', () => {
    const { container } = render(<RadioGroup direction="vertical" options={options} />);
    expect(container.querySelector('div.flex.flex-col')).toBeInTheDocument();
  });

  test('custom', async () => {
    const mockCall = vi.fn(() => {});

    render(
      <RadioGroup defaultValue="option1" onChange={mockCall}>
        {options.map((option) => (
          <RadioItem key={option.value} value={option.value}>
            {({ checked }) => {
              return (
                <Button tabIndex={-1} type={checked ? 'primary' : 'secondary'}>
                  {option.label}
                </Button>
              );
            }}
          </RadioItem>
        ))}
      </RadioGroup>,
    );
    const buttonElements = screen.queryAllByRole('button');
    expect(buttonElements[0]).toHaveClass(
      'component-border-primary component-ring-primary bg-primary-normal',
    );
    expect(buttonElements[1]).toHaveClass('bg-button-bg-secondary-normal');

    await act(async () => {
      await userEvent.click(buttonElements[1]);
    });
    expect(buttonElements[0]).toHaveClass('bg-button-bg-secondary-normal');
    expect(buttonElements[1]).toHaveClass(
      'component-border-primary component-ring-primary bg-primary-normal',
    );
  });
});
