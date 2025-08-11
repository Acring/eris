import React from 'react';
import { expect, describe, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tag } from '..';

describe('Tag', () => {
  test('base', () => {
    render(<Tag>Default Tag</Tag>);

    expect(screen.getByText('Default Tag')).toBeInTheDocument();
    expect(screen.getByTitle('Default Tag')).toBeInTheDocument();
  });

  test('customType', () => {
    const { container } = render(
      <div className="flex">
        <Tag type="active">tag</Tag>
        <Tag type="updating">tag</Tag>
        <Tag type="warning">tag</Tag>
        <Tag type="danger">tag</Tag>
        <Tag type="critical">tag</Tag>
        <Tag type="default">tag</Tag>
        <Tag type="primary">tag</Tag>
      </div>,
    );
    expect(
      container.querySelector('span.bg-tag-active.text-text-link-success-normal'),
    ).toBeInTheDocument();
    expect(
      container.querySelector('span.bg-tag-updating.text-text-link-updating-normal'),
    ).toBeInTheDocument();
    expect(
      container.querySelector('span.bg-tag-warning.text-text-link-warning-normal'),
    ).toBeInTheDocument();
    expect(
      container.querySelector('span.bg-tag-danger.text-text-link-danger-normal'),
    ).toBeInTheDocument();
    expect(
      container.querySelector('span.bg-tag-critical.text-text-link-critical-normal'),
    ).toBeInTheDocument();
    expect(container.querySelector('span.bg-tag-grey')).toBeInTheDocument();
    expect(container.querySelector('span.bg-tag-primary.text-primary-normal')).toBeInTheDocument();
  });

  test('close', async () => {
    const mockCall = vi.fn(() => {});
    const { container } = render(
      <Tag onClose={mockCall} showClose>
        Default Tag
      </Tag>,
    );

    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button'));
    expect(mockCall).toBeCalledTimes(1);
  });
  test('rounded', () => {
    const { container } = render(<Tag rounded>Default Tag</Tag>);
    expect(container.querySelector('span.bg-tag-grey')).toHaveClass('rounded-full');
  });

  test('click', async () => {
    const mockCall = vi.fn(() => {});
    render(<Tag onClick={mockCall}>Default Tag</Tag>);
    await userEvent.click(screen.getByTitle('Default Tag'));
    expect(mockCall).toBeCalledTimes(1);
  });

  test('disabled', async () => {
    const mockCall = vi.fn(() => {});
    render(
      <Tag disabledClose onClose={mockCall} showClose>
        Default Tag
      </Tag>,
    );
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('cursor-not-allowed opacity-40');
    await userEvent.click(buttonElement);
    expect(mockCall).toBeCalledTimes(0);
  });

  test('size', () => {
    render(
      <div className="flex items-start gap-2">
        <Tag size="lg">lg</Tag>
        <Tag size="md">md</Tag>
        <Tag size="sm">sm</Tag>
      </div>,
    );
    const lgElement = screen.getByTitle('lg').parentElement;
    const mdElement = screen.getByTitle('md').parentElement;
    const smElement = screen.getByTitle('sm').parentElement;
    expect(lgElement).toHaveClass('py-[3px] px-[8px]');
    expect(mdElement).toHaveClass('py-[1px] px-[8px]');
    expect(smElement).toHaveClass('px-[4px]');
  });
});
