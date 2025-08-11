import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, test, vi } from 'vitest';
import { DragLine16 } from '@xsky/eris-icons';

import TextLink from '../TextLink';
import userEvent from '@testing-library/user-event';

describe('TextLink', () => {
  test('basic', async () => {
    const clickFn = vi.fn(() => {});
    render(
      <TextLink onClick={clickFn} type="normal">
        text link
      </TextLink>,
    );
    const linkElem = screen.getByText('text link').parentElement;

    expect(linkElem).toBeInTheDocument();
    expect(linkElem).toHaveClass(
      'underline cursor-pointer text-text-2 hover:text-text-link-primary-hover active:text-text-link-primary-click',
    );
    if (linkElem) {
      await userEvent.click(linkElem);
      expect(clickFn).toBeCalled();
    }
  });

  test('noUnderline', () => {
    render(<TextLink noUnderline>text link</TextLink>);
    expect(screen.getByText('text link').parentElement).toHaveClass(
      'cursor-pointer text-text-link-primary-normal no-underline hover:underline active:underline hover:text-text-link-primary-hover active:text-text-link-primary-click',
    );
  });

  test('type', () => {
    const { container } = render(
      <div>
        <TextLink>text link</TextLink>
        <TextLink type="second">text link</TextLink>
        <TextLink type="active">text link</TextLink>
        <TextLink type="danger">text link</TextLink>
        <TextLink type="critical">text link</TextLink>
        <TextLink type="warning">text link</TextLink>
        <TextLink type="updating">text link</TextLink>
      </div>,
    );
    expect(container.querySelector('.text-text-2')).toHaveClass(
      'hover:text-text-link-primary-hover active:text-text-link-primary-click',
    );
    expect(container.querySelector('.text-text-1')).toHaveClass(
      'hover:text-text-link-primary-hover active:text-text-link-primary-click',
    );
    expect(container.querySelector('.text-text-link-success-normal')).toHaveClass(
      'hover:text-text-link-success-hover active:text-text-link-success-click',
    );
    expect(container.querySelector('.text-text-link-danger-normal')).toHaveClass(
      'hover:text-text-link-danger-hover active:text-text-link-danger-click',
    );
    expect(container.querySelector('.text-text-link-critical-normal')).toHaveClass(
      'hover:text-text-link-critical-hover active:text-text-link-critical-click',
    );
    expect(container.querySelector('.text-text-link-warning-normal')).toHaveClass(
      'hover:text-text-link-warning-hover active:text-text-link-warning-click',
    );
    expect(container.querySelector('.text-text-link-updating-normal')).toHaveClass(
      'hover:text-text-link-updating-hover active:text-text-link-updating-click',
    );
  });

  test('size', () => {
    render(<TextLink className="text-subhead">text link</TextLink>);
    expect(screen.getByText('text link').parentElement).toHaveClass('text-subhead');
  });

  test('disabled', async () => {
    const clickFn = vi.fn(() => {});
    render(
      <TextLink disabled onClick={clickFn}>
        text link
      </TextLink>,
    );
    const linkElem = screen.getByText('text link').parentElement;
    expect(linkElem).toHaveClass(
      'cursor-not-allowed opacity-40 text-text-link-primary-normal disabled',
    );
    if (linkElem) {
      await userEvent.click(linkElem);
      expect(clickFn).not.toBeCalled();
    }
  });

  test('icon', () => {
    const { container } = render(
      <div>
        <TextLink icon={<DragLine16 />} noUnderline>
          text link
        </TextLink>
        <TextLink icon={<DragLine16 />} iconPosition="rear" noUnderline>
          text link
        </TextLink>
      </div>,
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(container.querySelectorAll('svg').length).equal(2);
  });
});
