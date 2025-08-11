import React from 'react';
import { expect, describe, test, vi } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Cascader } from '..';

const options = [
  {
    value: '0',
    label: '0',
    children: [
      {
        value: '0-1',
        label: '0-1',
        children: [
          {
            value: '0-1-1',
            label: '0-1-1',
          },
          {
            value: '0-1-2',
            label: '0-1-2',
          },
        ],
      },
      {
        value: '0-2',
        label: '0-2',
      },
    ],
  },
  {
    value: '1',
    label: '1',
    tooltip: 'disabled tooltip',
    disabled: true,
  },
];

describe('Cascader', () => {
  test('base', () => {
    const { container } = render(<Cascader options={options} placeholder="请选择" />);

    expect(container.querySelector('[aria-expanded="false"]')).toBeInTheDocument();
    const cascaderElement = screen.getByTestId('Cascader-root');
    expect(cascaderElement).toBeInTheDocument();
  });

  test('click', async () => {
    const onChange = vi.fn(() => {});

    render(<Cascader onChange={onChange} options={options} placeholder="请选择" />);
    const inputEle = screen.getByTestId('Cascader-input');

    // 打开下拉框
    await act(() => userEvent.click(inputEle));
    const dialog = screen.getByTestId('FloatingContent-root');
    expect(dialog).toHaveAttribute('data-state', 'open');
    await act(() => userEvent.click(inputEle));

    // 选择选项
    const first = screen.getByText('0');
    if (first) {
      await act(() => userEvent.click(first));
      expect(screen.getByText('0-1')).toBeInTheDocument();
      await act(() => userEvent.click(screen.getByText('0-1')));
      expect(screen.getByText('0-1-1')).toBeInTheDocument();

      // 收起
      await act(() => userEvent.click(screen.getByText('0-1-1')));
      expect(screen.getByText('0 / 0-1 / 0-1-1')).toBeInTheDocument();
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    }
  });

  test('loading', async () => {
    render(<Cascader loading options={options} placeholder="请选择" />);
    const inputEle = screen.getByTestId('Cascader-input');
    await act(() => userEvent.click(inputEle));

    expect(screen.queryByText('搜索中')).toBeInTheDocument();
    expect(screen.getByTestId('Spinner-root')).toBeInTheDocument();
  });

  test('empty', async () => {
    render(<Cascader options={[]} placeholder="请选择" />);
    const inputEle = screen.getByTestId('Cascader-input');
    await act(() => userEvent.click(inputEle));
    expect(screen.queryByText('暂无选项')).toBeInTheDocument();
  });

  test('disabled', () => {
    const { container } = render(<Cascader disabled options={[]} />);
    expect(container.querySelector('input')).toBeDisabled();
  });

  test('disabled option', async () => {
    render(<Cascader options={options} placeholder="请选择" />);
    const inputEle = screen.getByTestId('Cascader-input');

    await act(() => userEvent.click(inputEle));
    const liElement = screen.getByRole('menuitem', { name: /1/i });
    expect(liElement).toHaveAttribute('data-state', 'closed');

    await act(() => userEvent.hover(screen.getByText('1')));
    await waitFor(() => {
      expect(screen.getByRole('tooltip').innerHTML).toBe('disabled tooltip');
      expect(liElement).toHaveAttribute('data-state', 'delayed-open');
    });
  });

  test('search', async () => {
    const { container } = render(
      <Cascader
        filterOption={(input, pathOptions) =>
          pathOptions.some((option) =>
            (option.label as string).toLowerCase().includes(input.toLowerCase()),
          )
        }
        options={options}
        placeholder="请选择"
      />,
    );
    const inputEle = screen.getByTestId('Cascader-input');
    act(() => {
      userEvent.click(inputEle);
      userEvent.type(inputEle, '0-1');
    });
    await waitFor(() => {
      expect(container.querySelector('input')?.value).toBe('0-1');
      // 匹配项加粗
      expect(screen.getAllByText('0-1')[0]).toHaveClass('font-medium');
      expect(screen.getByText('0-1')).toBeInTheDocument();
    });
  });

  test('trigger', async () => {
    render(<Cascader options={options} placeholder="请选择" trigger="hover" />);
    const inputEle = screen.getByTestId('Cascader-input');
    await act(() => userEvent.click(inputEle));

    // hover 第一项
    await act(() => userEvent.hover(screen.getByRole('menuitem', { name: /0/i })));
    expect(screen.queryByText('0-1')).toBeInTheDocument();

    await act(() => userEvent.hover(screen.getByRole('menuitem', { name: /0-1/i })));
    expect(screen.queryByText('0-1-1')).toBeInTheDocument();
  });

  test('clear', async () => {
    const { container } = render(
      <Cascader defaultValue={['0', '0-1', '0-1-1']} options={options} placeholder="请选择" />,
    );
    const inputEle = screen.getByTestId('Cascader-input');
    expect(inputEle).toBeInTheDocument();

    // 点击清除按钮
    await act(() => userEvent.hover(inputEle));
    const clearIcon = screen.getByTestId('Cascader-clear');
    expect(clearIcon).toBeInTheDocument();
    await act(() => userEvent.click(clearIcon));

    expect(container.querySelector('input')?.value).toBe('');
  });

  test('render', () => {
    render(
      <Cascader
        defaultValue={['0', '0-1', '0-1-1']}
        displayRender={(labels) => {
          return labels.join(' # ');
        }}
        options={options}
        placeholder="请选择"
        width="300"
      />,
    );
    expect(screen.queryByText('0 # 0-1 # 0-1-1')).toBeInTheDocument();
  });

  test('multiple', async () => {
    render(<Cascader multiple options={options} placeholder="请选择" />);
    const inputEle = screen.getByTestId('Cascader-input');
    expect(inputEle).toBeInTheDocument();
    expect(
      document.querySelector('div.animate-scaleAndFadeWithTranslateCenter'),
    ).not.toBeInTheDocument();

    // 选择第一项
    await act(() => userEvent.click(inputEle));
    const liElement = screen.getByRole('menuitem', { name: /0/i });
    await act(() => userEvent.hover(liElement));
    const liElement2 = screen.getByRole('menuitem', { name: /0-1/i });
    await act(() => userEvent.hover(liElement2));
    const liElement3 = screen.getByRole('menuitem', { name: /0-1-1/i });
    await act(() => userEvent.click(liElement3));
    expect(screen.getByText('0 / 0-1 / 0-1-1')).toBeInTheDocument();

    // 0、0-1   处于半选状态
    expect(document.querySelectorAll('div.animate-scaleAndFadeWithTranslateCenter').length).toEqual(
      2,
    );

    // 选择第二项
    const liElement4 = screen.getByRole('menuitem', { name: /0-1-2/i });
    await act(() => userEvent.click(liElement4));
    expect(screen.getByText('0 / 0-1 / 0-1-1')).toBeInTheDocument();
    expect(screen.getByText('0 / 0-1 / 0-1-2')).toBeInTheDocument();
    // 0 处于半选状态
    expect(document.querySelectorAll('div.animate-scaleAndFadeWithTranslateCenter').length).toEqual(
      1,
    );
  });

  test('multiple click parent', async () => {
    render(<Cascader defaultValue={['0-1']} multiple options={options} placeholder="请选择" />);
    const inputEle = screen.getByTestId('Cascader-input');
    expect(inputEle).toBeInTheDocument();

    expect(screen.getByText('0 / 0-1 / 0-1-1')).toBeInTheDocument();
    expect(screen.getByText('0 / 0-1 / 0-1-2')).toBeInTheDocument();
    await act(() => userEvent.click(inputEle));
    expect(document.querySelectorAll('div.animate-scaleAndFadeWithTranslateCenter').length).toEqual(
      1,
    );
  });

  test('multiple default value', () => {
    render(
      <Cascader
        defaultValue={['0-1-1', '0-1-2']}
        multiple
        options={options}
        placeholder="请选择"
      />,
    );
    const inputEle = screen.getByTestId('Cascader-input');
    expect(inputEle).toBeInTheDocument();
    expect(screen.getByText('0 / 0-1 / 0-1-1')).toBeInTheDocument();
    expect(screen.getByText('0 / 0-1 / 0-1-2')).toBeInTheDocument();
  });

  test('multiple clear controlled', async () => {
    render(<Cascader multiple options={options} placeholder="请选择" value={['0-1-1', '0-1-2']} />);
    const inputEle = screen.getByTestId('Cascader-input');
    expect(inputEle).toBeInTheDocument();
    // 点击清除按钮
    await act(() => userEvent.hover(inputEle));
    const clearIcon = screen.getByTestId('Cascader-clear');
    expect(clearIcon).toBeInTheDocument();
    await act(() => userEvent.click(clearIcon));

    // 清除后，选项还在
    expect(screen.queryByText('0 / 0-1 / 0-1-1')).toBeInTheDocument();
    expect(screen.queryByText('0 / 0-1 / 0-1-2')).toBeInTheDocument();
  });

  test('multiple clear', async () => {
    render(
      <Cascader
        defaultValue={['0-1-1', '0-1-2']}
        multiple
        options={options}
        placeholder="请选择"
      />,
    );
    const inputEle = screen.getByTestId('Cascader-input');
    expect(inputEle).toBeInTheDocument();
    // 点击清除按钮
    await act(() => userEvent.hover(inputEle));
    const clearIcon = screen.getByTestId('Cascader-clear');
    expect(clearIcon).toBeInTheDocument();
    await act(() => userEvent.click(clearIcon));

    expect(screen.queryByText('0 / 0-1 / 0-1-1')).not.toBeInTheDocument();
    expect(screen.queryByText('0 / 0-1 / 0-1-2')).not.toBeInTheDocument();
  });
});
