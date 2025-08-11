import React from 'react';
import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';

import Spinner from '../Spinner';

describe('Spinner', () => {
  test('base', () => {
    const { container } = render(<Spinner size="md" />);
    const spinner = screen.getByTestId('Spinner-root');
    expect(container.querySelector('svg')?.closest('div')).toHaveClass('h-[32px] w-[32px]');
    expect(spinner).toBeInTheDocument();
  });

  test('tip', () => {
    const { container } = render(
      <div>
        <Spinner size="sm" tip="加载中" />
        <Spinner size="md" tip="加载中" />
        <Spinner size="lg" tip="加载中" />
      </div>,
    );
    expect(screen.getAllByText('加载中').at(0)).toBeInTheDocument();
    expect(container.querySelectorAll('svg')[0].closest('div')).toHaveClass('h-[16px] w-[16px]');
    expect(container.querySelectorAll('svg')[2].closest('div')).toHaveClass('h-[64px] w-[64px]');
  });

  test('tip position', () => {
    const { container } = render(
      <div>
        <Spinner size="sm" tip="加载中" tipPosition="top" />
        <Spinner size="sm" tip="加载中" tipPosition="bottom" />
        <Spinner size="sm" tip="加载中" tipPosition="left" />
        <Spinner size="sm" tip="加载中" tipPosition="right" />
      </div>,
    );
    expect(container.querySelector('.flex-col-reverse')).toBeInTheDocument();
    expect(container.querySelector('.flex-col')).toBeInTheDocument();
    expect(container.querySelector('.flex-row-reverse')).toBeInTheDocument();
    expect(container.querySelector('.flex-row')).toBeInTheDocument();
  });

  test('with children', () => {
    const { container } = render(
      <Spinner size="sm" spinning tip="加载中">
        <div className="h-10 border-spacing-1 overflow-hidden rounded-lg bg-blue-500 p-2">
          I am a child element
        </div>
      </Spinner>,
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(container.querySelector('.opacity-50')).toBeInTheDocument();
  });
});
