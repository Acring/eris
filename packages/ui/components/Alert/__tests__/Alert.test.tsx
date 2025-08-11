import React from 'react';
import { expect, describe, test } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Alert } from '..';

describe('Alert', () => {
  test('base', () => {
    const { container } = render(<Alert content="This is an info alert" type="info" />);

    expect(container.querySelector('div.alert-content-wrapper')).toBeInTheDocument();
    expect(screen.getByText('This is an info alert')).toBeInTheDocument();
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  test('type', () => {
    render(
      <div>
        <Alert content="This is an info alert" type="info" />
        <Alert content="This is an error alert" type="error" />
        <Alert content="This is an warning alert" type="warning" />
      </div>,
    );
    const errorAlertText = screen
      .getByText('This is an error alert')
      .closest('div.bg-alert-bg-danger');
    const infoAlertText = screen.getByText('This is an info alert').closest('div.bg-alert-bg-info');
    const warningAlertText = screen
      .getByText('This is an warning alert')
      .closest('div.bg-alert-bg-warning');

    expect(errorAlertText).toBeInTheDocument();
    expect(infoAlertText).toBeInTheDocument();
    expect(warningAlertText).toBeInTheDocument();
  });

  test('icon', () => {
    const { container } = render(
      <Alert content="This is an info alert" showIcon={false} type="info" />,
    );
    expect(container.querySelector('svg')).not.toBeInTheDocument();
  });

  test('close', async () => {
    const { container } = render(
      <Alert content="This is an info alert" showClose showIcon={false} />,
    );
    const close = container.querySelector('svg');
    expect(close).toBeInTheDocument();
    await act(() => userEvent.click(close as Element));
    expect(close).not.toBeInTheDocument();
    expect(container.querySelector('div.alert-content-wrapper')).not.toBeInTheDocument();
  });
});
