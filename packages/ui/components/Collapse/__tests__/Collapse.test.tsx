import React, { useState } from 'react';
import { expect, describe, test, vi } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import { Collapse } from '..';
import userEvent from '@testing-library/user-event';

const Content = () => {
  return (
    <div className="bg-grey-100 p-[8px]">
      <li>内容内容内容内容内容内容</li>
      <li>内容内容内容内容内容内容</li>
      <li>内容内容内容内容内容内容</li>
      <li>内容内容内容内容内容内容</li>
    </div>
  );
};

describe('Collapse', () => {
  test('default', () => {
    render(
      <Collapse title="高级选项">
        <Content />
      </Collapse>,
    );
    expect(screen.getByText('高级选项')).toBeDefined();
  });

  test('defaultOpen', () => {
    const { container } = render(
      <Collapse defaultOpen title="高级选项">
        <Content />
      </Collapse>,
    );
    const openPanel = container.querySelector('[data-state="open"]');
    expect(openPanel).toBeInTheDocument();
  });

  test('description', () => {
    render(
      <Collapse description="描述描述描述" title="高级选项">
        <Content />
      </Collapse>,
    );
    expect(screen.getByText('描述描述描述')).toBeInTheDocument();
  });

  test('tooltip', async () => {
    const { container } = render(
      <Collapse title="高级选项" tooltip={{ title: '提示提示提示提示' }}>
        <Content />
      </Collapse>,
    );

    const tooltipIcon = container.querySelector('svg[data-state="closed"]');
    expect(tooltipIcon).toBeInTheDocument();

    // 图标 hover，判断 tooltips 是否展示
    if (tooltipIcon) {
      await act(async () => {
        await userEvent.hover(tooltipIcon);
      });
      await waitFor(() => {
        expect(screen.getByRole('tooltip').innerHTML).toBe('提示提示提示提示');
      });
    }
  });

  test('right title', () => {
    render(
      <Collapse rightTitle="右文案" title="高级选项">
        <Content />
      </Collapse>,
    );

    expect(screen.getByText('右文案')).toBeInTheDocument();
  });

  test('open', async () => {
    const mockCall = vi.fn(() => {});

    const ControlInExternal = () => {
      const [open, setOpen] = useState(true);
      const handleOpenChange = (value: boolean) => {
        setOpen(value);
        mockCall();
      };
      return (
        <Collapse onOpenChange={handleOpenChange} open={open} title={open ? '收起' : '展开'}>
          <Content />
        </Collapse>
      );
    };

    const { container } = render(<ControlInExternal />);

    // 展开状态
    const openElem = screen.getByText('收起');
    expect(openElem).toBeInTheDocument();
    expect(container.querySelector('[data-state="open"]')).toBeInTheDocument();
    // 收起状态
    await act(async () => {
      await userEvent.click(openElem);
    });
    const closeElem = screen.getByText('展开');
    expect(closeElem).toBeInTheDocument();
    expect(container.querySelector('[data-state="open"]')).not.toBeInTheDocument();
    // 判断回调事件是否触发
    expect(mockCall).toBeCalledTimes(1);
  });
});
