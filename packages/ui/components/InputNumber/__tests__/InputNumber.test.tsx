import React from 'react';
import { expect, describe, test, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InputNumber } from '..';

describe('InputNumber', () => {
  // 禁用状态测试
  test('disabled state', () => {
    const onChange = vi.fn();
    render(<InputNumber disabled onChange={onChange} value={10} />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  // 小数点测试
  test('decimal', async () => {
    const onChange = vi.fn();
    render(<InputNumber onChange={onChange} />);
    const input = screen.getByRole('textbox');
    await userEvent.type(input, '12.34');
    expect(input).toHaveValue('12.34');
  });

  test('disable decimal', async () => {
    const onChange = vi.fn();
    render(<InputNumber disableDecimal onChange={onChange} />);
    const input = screen.getByRole('textbox');
    await userEvent.type(input, '12.34');
    expect(input).toHaveValue('1234');
  });
  // 值更新测试
  test('value changes', async () => {
    const onChange = vi.fn();
    const { rerender } = render(<InputNumber onChange={onChange} value={10} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('10');
    // 直接输入新值
    await userEvent.clear(input);
    await userEvent.type(input, '20');
    fireEvent.blur(input);
    expect(onChange).toBeCalled();
    // 通过 props 更新值
    rerender(<InputNumber onChange={onChange} value={30} />);
    fireEvent.blur(input);
    expect(input).toHaveValue('30');
  });

  test('max value constraint', async () => {
    const mockCall = vi.fn((_value) => {});
    const { rerender } = render(<InputNumber max={100} onChange={mockCall} />);
    const input = screen.getByRole('textbox');
    // 输入超过最大值, 自动调整为最大值
    await userEvent.clear(input);
    await userEvent.type(input, '150');
    fireEvent.blur(input);
    expect(mockCall).toBeCalled();
    expect(mockCall).toHaveBeenLastCalledWith(100);
    expect(input).toHaveValue('100');
    // 动态更新最大值
    rerender(<InputNumber max={60} onChange={mockCall} />);
    fireEvent.blur(input);
    expect(mockCall).toBeCalled();
    expect(mockCall).toHaveBeenLastCalledWith(60);
    expect(input).toHaveValue('60'); // 输入框的值应该更新为新的最大值
  });
  // 最小值限制测试
  test('min value constraint', async () => {
    const mockCall = vi.fn((_value) => {});
    const { rerender } = render(<InputNumber min={10} onChange={mockCall} />);
    const input = screen.getByRole('textbox');
    // 输入低于最小值, 自动调整为最小值
    await userEvent.clear(input);
    await userEvent.type(input, '3');
    fireEvent.blur(input);
    expect(mockCall).toBeCalled();
    expect(input).toHaveValue('10');
    expect(mockCall).toHaveBeenLastCalledWith(10);
    // 动态更新最小值
    rerender(<InputNumber min={60} onChange={mockCall} />);
    fireEvent.blur(input);
    expect(input).toHaveValue('60');
    expect(mockCall).toHaveBeenCalledWith(60);
  });

  test('value adjustment when max changes', () => {
    const onChange = vi.fn();
    // 1. 初始状态：value(80)小于max(100)，正常显示80
    const { rerender } = render(<InputNumber max={100} onChange={onChange} value={80} />);
    expect(screen.getByRole('textbox')).toHaveValue('80');

    // 2. 更新max为60，value不变。由于80>60，输入框的值应该被调整为60
    rerender(<InputNumber max={60} onChange={onChange} value={80} />);
    expect(screen.getByRole('textbox')).toHaveValue('60');
    expect(onChange).toHaveBeenCalledWith(60);

    // 3. 更新max为100，value不变。由于100>80，保持值不变
    rerender(<InputNumber max={100} onChange={onChange} value={80} />);
    // - 输入框的值不变，也不应该触发onChange
    expect(screen.getByRole('textbox')).toHaveValue('80');
  });

  test('multiple max and value updates', () => {
    const onChange = vi.fn((_value) => {});
    // 1. 初始状态
    const { rerender } = render(<InputNumber max={100} onChange={onChange} value={80} />);
    // 2. 同时更新 value和max，且value超过max
    rerender(<InputNumber max={90} onChange={onChange} value={100} />);
    expect(screen.getByRole('textbox')).toHaveValue('90');
    expect(onChange).toHaveBeenLastCalledWith(90);
    // 3. 同时更新value和max，且value在合法范围内
    rerender(<InputNumber max={77} onChange={onChange} value={75} />);
    expect(screen.getByRole('textbox')).toHaveValue('75');
  });

  test('multiple min and value updates', () => {
    const onChange = vi.fn((_value) => {});
    // 1. 初始状态
    const { rerender } = render(<InputNumber min={80} onChange={onChange} value={100} />);

    // 2. 同时更新 value和min，且value< min
    rerender(<InputNumber min={50} onChange={onChange} value={35} />);
    expect(screen.getByRole('textbox')).toHaveValue('50');
    expect(onChange).toHaveBeenLastCalledWith(50);

    // 3. 同时更新value和min，且value> min
    rerender(<InputNumber min={55} onChange={onChange} value={65} />);
    expect(screen.getByRole('textbox')).toHaveValue('65');
  });

  // 同时更新最小值和最大值
  test('simultaneous min and max update', () => {
    const onChange = vi.fn();
    const { rerender } = render(<InputNumber max={30} min={0} onChange={onChange} value={20} />);
    // 1. 同时更新min和max，且value在合法范围内
    rerender(<InputNumber max={25} min={5} onChange={onChange} value={15} />);
    expect(screen.getByRole('textbox')).toHaveValue('15');

    // 2. 同时更新min和max，且value>max
    rerender(<InputNumber max={10} min={0} onChange={onChange} value={20} />);
    expect(screen.getByRole('textbox')).toHaveValue('10');
    expect(onChange).toHaveBeenCalledWith(10);

    // 3. 同时更新min和max，且value<min
    rerender(<InputNumber max={30} min={20} onChange={onChange} value={10} />);
    expect(screen.getByRole('textbox')).toHaveValue('20');
    expect(onChange).toHaveBeenCalledWith(20);
  });

  test('handles undefined and null', () => {
    const { rerender } = render(<InputNumber />);

    // 测试 undefined
    rerender(<InputNumber value={undefined} />);
    expect(screen.getByRole('textbox')).toHaveValue('');

    // 测试 null
    rerender(<InputNumber value={null} />);
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  test('handles user input for non-numeric values', async () => {
    const onChange = vi.fn();
    render(<InputNumber onChange={onChange} />);
    const input = screen.getByRole('textbox');

    // 测试输入非数字
    await userEvent.type(input, 'abc');
    expect(input).toHaveValue('');
    expect(onChange).not.toHaveBeenCalled();

    // 测试输入带字母的数字
    await userEvent.type(input, '123a');
    fireEvent.blur(input);
    expect(input).toHaveValue('123');
    expect(onChange).toHaveBeenCalledWith(123);
  });
});
