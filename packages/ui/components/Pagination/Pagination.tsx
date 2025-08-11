'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { LeftLine12, LeftLine16, RightLine12, RightLine16 } from '@xsky/eris-icons';
import { cva } from 'class-variance-authority';
import t from '../../i18n';
import { cn } from '../../lib/utils';
import { IconButton } from '../IconButton';
import { Select } from '../Select';
import { InputNumber } from '../InputNumber';

const paginationVariants = cva('text-body text-text-2 flex flex-nowrap items-center gap-1', {
  variants: {
    size: {
      sm: cn('text-caption gap-[4px]'),
      md: cn('text-body'),
    },
  },
});

/**
 * Pagination 组件的属性。
 */
export interface PaginationProps extends React.BaseHTMLAttributes<HTMLDivElement> {
  /**
   * 选中的项数。
   */
  selectedCount?: number;

  /**
   * 总项数。
   */
  totalCount: number;

  /**
   * 当前页码。
   */
  page?: number;

  /**
   * 默认页码。
   */
  defaultPage?: number;

  /**
   * 每页显示的行数。
   */
  rowsPerPage: number;

  /**
   * 每页显示行数的选项数组。
   */
  rowsPerPageOptions?: number[];

  /**
   * 当页码改变时的回调函数。
   * @param page 新的页码。
   */
  onPageChange?: (page: number) => void;

  /**
   * 当每页显示行数改变时的回调函数。
   * @param rowsPerPage 新的每页显示行数。
   */
  onRowsPerPageChange?: (rowsPerPage: number) => void;

  /**
   * Pagination 组件的尺寸。
   */
  size?: 'md' | 'sm';

  /**
   * 是否以迷你模式显示 Pagination 组件。
   */
  mini?: boolean;

  /**
   * 是否显示选中项的计数。
   */
  showCount?: boolean;
}

/**
 * Owner: 刘圳
 *
 * Figma: https://www.figma.com/file/Do849NlMKTXCv8djOFIFWA/%E9%80%9A%E7%94%A8%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?type=design&node-id=14607-59557&mode=design
 *
 * Pagination 用于分页。
 */
const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      className,
      totalCount,
      selectedCount,
      page,
      defaultPage = 1,
      rowsPerPage = 100,
      rowsPerPageOptions = [10, 50, 100, 200],
      onPageChange,
      onRowsPerPageChange,
      size = 'md',
      mini = false,
      showCount = true,
      ...props
    },
    ref,
  ) => {
    const [innerPage, setInnerPage] = useState<number>(page ?? defaultPage);
    const [innerRowsPerPage, setInnerRowsPerPage] = useState<string>(`${rowsPerPage}`);

    useEffect(() => {
      if (page === undefined) return;
      setInnerPage(page);
    }, [page]);

    useEffect(() => {
      setInnerRowsPerPage(`${rowsPerPage}`);
    }, [rowsPerPage]);

    const totalPage = useMemo(
      () => (totalCount ? Math.ceil(totalCount / Number(innerRowsPerPage)) : 1),
      [innerRowsPerPage, totalCount],
    );

    useEffect(() => {
      // 当总页数小于当前页时，将当前页设置为第一页
      if (totalPage < innerPage) {
        setInnerPage(1);
      }
    }, [innerPage, totalPage]);

    const innerRowsPerPageOptions = rowsPerPageOptions.map((option) => ({
      label: `${option}/${t('页')}`,
      value: `${option}`,
    }));

    const handlePageChange = (value: number, notify = false) => {
      if (notify) {
        let _value = Number(value) || 0;
        if (value <= 0) {
          _value = 1;
        } else if (value > totalPage) {
          _value = totalPage;
        }
        onPageChange?.(Number(value));
      }
      setInnerPage(value);
    };

    const handleRowsPerPageChange = (value: string) => {
      setInnerPage(1);
      setInnerRowsPerPage(value);
      onRowsPerPageChange?.(Number(value));
    };
    if (mini) {
      return (
        <div
          className={cn('text-caption flex items-center gap-[4px]', className)}
          data-testid="Pagination-root"
        >
          <IconButton
            data-control="prev"
            disabled={innerPage <= 1}
            onClick={() => {
              handlePageChange(innerPage - 1, true);
            }}
          >
            <LeftLine12 />
          </IconButton>
          <div className="inline">{`${innerPage}/${totalPage}`}</div>
          <IconButton
            data-control="next"
            disabled={innerPage >= totalPage}
            onClick={() => {
              handlePageChange(innerPage + 1, true);
            }}
          >
            <RightLine12 />
          </IconButton>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        {...props}
        className={cn(paginationVariants({ size, className }))}
        data-testid="Pagination-root"
      >
        {showCount ? (
          <>
            {selectedCount ? (
              <div data-selected="selected">
                {t('共选中 {{value}} 条', { value: selectedCount })} ,
              </div>
            ) : null}
            <div>{t('总计 {{value}} 条', { value: totalCount })}</div>
          </>
        ) : null}
        <Select
          className="min-w-[80px]"
          data-type="listbox"
          onChange={handleRowsPerPageChange}
          options={innerRowsPerPageOptions}
          size={size}
          value={innerRowsPerPage}
        />

        <IconButton
          data-control="prev"
          data-testid="Pagination-prev"
          disabled={innerPage <= 1}
          onClick={() => {
            handlePageChange(innerPage - 1, true);
          }}
        >
          {size === 'md' ? <LeftLine16 /> : <LeftLine12 />}
        </IconButton>

        <InputNumber
          className={cn('max-w-[80px]', {
            'min-w-[34px]': size === 'md',
            'min-w-[26px]': size === 'sm',
          })}
          disableDecimal
          fitContent
          hideControl
          max={totalPage}
          min={1}
          onChange={(value) => {
            handlePageChange(value ?? 1, true);
          }}
          size={size}
          value={innerPage}
        />
        <div className="inline-flex items-center">
          <span>/</span>
          <span className="ml-[4px]">{`${totalPage}`}</span>
        </div>
        <IconButton
          data-control="next"
          data-testid="Pagination-next"
          disabled={innerPage >= totalPage}
          onClick={() => {
            handlePageChange(innerPage + 1, true);
          }}
        >
          {size === 'md' ? <RightLine16 /> : <RightLine12 />}
        </IconButton>
      </div>
    );
  },
);

Pagination.displayName = 'Pagination';

export default Pagination;
