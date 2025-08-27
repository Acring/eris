import { Meta, StoryObj } from '@storybook/react';
import { Button } from '@xsky/eris-ui';
import { DeleteLine16 } from '@xsky/eris-icons';
import { expect, userEvent, within, waitFor } from '@storybook/test';
import React from 'react';
import { Checkbox } from '@xsky/eris-ui';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'OTHER/Button',
  tags: ['visual-test'],
  argTypes: {
    type: {
      control: {
        type: 'inline-radio',
      },
      options: ['primary', 'secondary', 'outlined', 'text'],
      defaultValue: 'primary',
      description: ' 按钮类型 ',
    },
    color: {
      control: {
        type: 'inline-radio',
      },
      options: ['default', 'primary', 'danger'],
      defaultValue: 'default',
      description: ' 按钮颜色 ',
    },
    size: {
      control: {
        type: 'inline-radio',
      },
      options: ['lg', 'md', 'sm'],
      defaultValue: 'md',
      description: ' 按钮大小 ',
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
      description: ' 是否禁用 ',
    },
    loading: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
      description: ' 是否加载中 ',
    },
    tooltip: {
      control: {
        type: 'text',
      },
      description: ' 按钮提示 ',
    },
    onClick: {
      action: 'click',
      description: ' 点击事件 ',
    },
  },
};

type Story = StoryObj<typeof Button> & {
  [key: string]: any;
};

const Container = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-start gap-1">
      <p className="text-body font-bold">{title}</p>
      <div className="flex gap-2">{children}</div>
    </div>
  );
};
/**
 * 全部按钮展示
 */
export const All: Story = {
  AllButton: () => {
    const [disabled, setDisabled] = React.useState(false);
    return (
      <div className="flex flex-col gap-2">
        <Checkbox checked={disabled} onChange={setDisabled}>
          禁用
        </Checkbox>
        <Container title="Primary">
          <Button disabled={disabled} type="primary" color="primary">
            Button
          </Button>
          <Button disabled={disabled} type="primary" color="danger">
            Button
          </Button>
        </Container>
        <Container title="Secondary">
          <Button disabled={disabled} type="secondary">
            Button
          </Button>
          <Button disabled={disabled} type="secondary" color="primary">
            Button
          </Button>
          <Button disabled={disabled} type="secondary" color="danger">
            Button
          </Button>
        </Container>
        <Container title="Outlined">
          <Button disabled={disabled} type="outlined">
            Button
          </Button>
          <Button disabled={disabled} type="outlined" color="primary">
            Button
          </Button>
          <Button disabled={disabled} type="outlined" color="danger">
            Button
          </Button>
        </Container>
        <Container title="Text">
          <Button disabled={disabled} type="text">
            Button
          </Button>
          <Button disabled={disabled} type="text" color="primary">
            Button
          </Button>
          <Button disabled={disabled} type="text" color="danger">
            Button
          </Button>
        </Container>
      </div>
    );
  },
  render: () => {
    return <All.AllButton />;
  },
};

export const Size: Story = {
  render: () => (
    <div className="flex items-start gap-2">
      <Button size="lg">Button</Button>
      <Button size="md">Button</Button>
      <Button size="sm">Button</Button>
      <Button size="xs">Button</Button>
    </div>
  ),
};

export const Primary: Story = {
  tags: ['skip-test'],
  args: {
    type: 'primary',
    color: 'default',
    children: 'Button',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByText('Button', {
      selector: 'button',
    });
    await userEvent.click(button);
  },
};

export const Outlined: Story = {
  args: {
    type: 'outlined',
    color: 'default',
    children: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Button',
    type: 'secondary',
    color: 'default',
  },
};

export const Text: Story = {
  args: {
    children: 'Button',
    type: 'text',
    color: 'default',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Button',
    disabled: true,
    tooltip: '这是一个提示 ',
  },
};

export const Loading: Story = {
  tags: ['skip-test'],
  args: {
    children: 'Button',
    loading: true,
  },
  render: (args) => (
    <>
      <Button {...args} type="primary"></Button>
      <Button {...args} type="primary" color="danger"></Button>
      <br />
      <Button {...args} type="secondary"></Button>
      <Button {...args} type="secondary" color="primary"></Button>
      <Button {...args} type="secondary" color="danger" />
      <br />

      <Button {...args} type="outlined"></Button>
      <Button {...args} type="outlined" color="primary"></Button>
      <Button {...args} type="outlined" color="danger"></Button>
      <br />
      <Button {...args} type="text"></Button>
      <Button {...args} type="text" color="primary"></Button>
      <Button {...args} type="text" color="danger"></Button>
      <br />
    </>
  ),
};

export const HasIcon: Story = {
  args: {
    children: 'Button',
    loading: false,
    className: 'w-full',
    icon: <DeleteLine16></DeleteLine16>,
  },
};

export const WithTooltip: Story = {
  args: {
    children: 'Button',
    tooltip: '这是一个提示',
    tooltipProps: {
      disableHoverableContent: true,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await userEvent.hover(button);
    await waitFor(() => {
      expect(document.querySelectorAll('[data-side]').length).toEqual(1);
    });
    await userEvent.unhover(button);
    await waitFor(() => {
      expect(document.querySelectorAll('[data-side]').length).toEqual(0);
    });
  },
};

export default meta;
