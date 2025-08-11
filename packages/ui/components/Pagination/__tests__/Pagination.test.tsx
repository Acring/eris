import React from 'react';
import { describe, expect, test, vi } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Pagination from '../Pagination';

describe('Pagination', () => {
  test('base', async () => {
    const onPageChange = vi.fn(() => {});
    const onRowsPerPageChange = vi.fn(() => {});
    const { container } = render(
      <Pagination
        defaultPage={1}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPage={100}
        selectedCount={0}
        totalCount={1000}
      />,
    );

    // 元素断言
    const inputElem = container.querySelector('input');
    const totalTextElem = screen.getByText('总计 1000 条');
    expect(totalTextElem).toBeInTheDocument();
    expect(screen.getByText('100/页')).toBeInTheDocument();
    expect(inputElem?.value).equal('1');
    expect(screen.getByText('10')).toBeInTheDocument();

    // 左右页码点击
    const prevButton = container.querySelector('[data-control="prev"]');
    const nextButton = container.querySelector('[data-control="next"]');
    if (prevButton) {
      await act(() => userEvent.click(prevButton));
      expect(onPageChange).not.toBeCalled();
    }
    if (nextButton) {
      await act(() => userEvent.click(nextButton));
      expect(onPageChange).toBeCalled();
      expect(inputElem?.value).equal('2');
    }
    if (prevButton) {
      await act(() => userEvent.click(prevButton));
      expect(inputElem?.value).equal('1');
    }

    // 页码跳转
    if (inputElem) {
      await act(() => userEvent.clear(inputElem));
      await act(() => userEvent.type(inputElem, '8'));
      await act(() => userEvent.click(totalTextElem));
      expect(onPageChange).toBeCalledTimes(3);
      expect(inputElem?.value).equal('8');

      // 超出页码
      await act(() => userEvent.clear(inputElem));
      await act(() => userEvent.type(inputElem, '20'));
      await act(() => userEvent.click(totalTextElem));
      expect(inputElem?.value).equal('10');

      // 小于0
      await act(() => userEvent.clear(inputElem));
      await act(() => userEvent.type(inputElem, '-1'));
      await act(() => userEvent.click(totalTextElem));
      expect(inputElem?.value).equal('1');
    }

    // 分页数
    const pageSelectElem = container.querySelector('[data-type="listbox"]');
    if (pageSelectElem) {
      window.HTMLElement.prototype.scrollIntoView = vi.fn();
      window.HTMLElement.prototype.hasPointerCapture = vi.fn();
      window.HTMLElement.prototype.releasePointerCapture = vi.fn();

      await act(() => userEvent.click(pageSelectElem));
      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument();
      });

      await act(() => userEvent.click(screen.getByText('50/页')));
      // expect(onRowsPerPageChange).toBeCalled();
    }
  });

  test('small', () => {
    const { container } = render(
      <Pagination
        defaultPage={1}
        rowsPerPage={100}
        selectedCount={0}
        size="sm"
        totalCount={1000}
      />,
    );
    expect(container.querySelector('.text-caption')).toBeInTheDocument();
  });

  test('mini', async () => {
    const onPageChange = vi.fn(() => {});
    const { container } = render(
      <Pagination
        defaultPage={1}
        mini
        onPageChange={onPageChange}
        rowsPerPage={100}
        totalCount={300}
      />,
    );

    expect(screen.getByText('1/3')).toBeInTheDocument();

    // 左右页码点击
    const prevButton = container.querySelector('[data-control="prev"]');
    const nextButton = container.querySelector('[data-control="next"]');
    if (prevButton) {
      await act(() => userEvent.click(prevButton));
      expect(onPageChange).not.toBeCalled();
    }
    if (nextButton) {
      await act(() => userEvent.click(nextButton));
      expect(onPageChange).toBeCalled();
      expect(screen.getByText('2/3')).toBeInTheDocument();
    }
    if (prevButton) {
      await act(() => userEvent.click(prevButton));
      expect(screen.getByText('1/3')).toBeInTheDocument();
    }
  });

  test('showCount', () => {
    const { container } = render(
      <Pagination
        defaultPage={1}
        rowsPerPage={100}
        selectedCount={10}
        showCount
        totalCount={1000}
      />,
    );
    expect(container.querySelector('[data-selected="selected"]')).toBeInTheDocument();
  });
});
