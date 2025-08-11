import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DeleteCircleFill16 } from '@xsky/eris-icons';

import Empty from '../Empty';

describe('Empty', () => {
  it('Basic', () => {
    const { container } = render(<Empty />);

    expect(container.querySelector('img')).toBeInTheDocument();
    expect(container.querySelector('img')).toHaveAttribute('src');
    expect(screen.getByText('暂无内容')).toBeInTheDocument();
  });

  it('Custom', () => {
    const { container } = render(
      <Empty description="暂无搜索结果，请重新输入" image={<DeleteCircleFill16 />} />,
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(screen.getByText('暂无搜索结果，请重新输入')).toBeInTheDocument();
  });
});
