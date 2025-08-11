import React from 'react';
import { expect, describe, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from '..';
import { AlertLine20 } from '@xsky/eris-icons';

describe('Badge', () => {
  test('base', () => {
    render(
      <Badge count={9}>
        <AlertLine20 />
      </Badge>,
    );
    expect(screen.getByText('9')).toBeInTheDocument();
  });

  test('dot', () => {
    render(<Badge dot>紧急</Badge>);

    const alertDiv = screen.getByText('紧急').closest('div');
    expect(alertDiv).toBeInTheDocument();
    expect(alertDiv?.querySelector('.bg-danger-normal')).toBeInTheDocument();
  });

  test('maxCount', () => {
    render(
      <Badge count={99} maxCount={9}>
        <AlertLine20 />
      </Badge>,
    );
    expect(screen.getByText('9+')).toBeInTheDocument();
  });

  test('maxCountContent', () => {
    render(
      <Badge count={10001} maxCountContent="一万+">
        <AlertLine20 />
      </Badge>,
    );
    expect(screen.getByText('一万+')).toBeInTheDocument();
  });
});
