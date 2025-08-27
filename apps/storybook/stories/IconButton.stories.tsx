import { Button, IconButton } from '@xsky/eris-ui';
import { Meta, StoryObj } from '@storybook/react';
import { CloseLine12, CloseLine16, CloseCircleFill16, StarFill16 } from '@xsky/eris-icons';
import React from 'react';

const meta: Meta<typeof IconButton> = {
  component: IconButton,
  title: 'OTHER/IconButton',
  tags: ['visual-test'],
  argTypes: {
    color: {
      control: {
        type: 'inline-radio',
      },
      options: ['default', 'primary', 'danger'],
      defaultValue: 'default',
      description: '按钮颜色',
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
      description: '是否禁用',
    },
    active: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
      description: '是否激活',
    },
    filled: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
      description: '是否面性图标',
    },
    clickableAreaInvisible: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
      description: '热区背景是否不可见',
    },
    tooltip: {
      control: {
        type: 'text',
      },
      defaultValue: '',
      description: '提示文案',
    },
  },
};

type Story = StoryObj<typeof IconButton> & {
  [key: string]: any;
};

export const Basic: Story = {
  args: {
    disabled: false,
    clickableAreaInvisible: false,
    color: 'default',
  },
  render: (args) => (
    <div className="flex gap-2">
      <IconButton {...args}>
        <CloseLine16></CloseLine16>
      </IconButton>
      <IconButton {...args} filled>
        <CloseCircleFill16></CloseCircleFill16>
      </IconButton>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <IconButton disabled>
      <CloseLine12></CloseLine12>
    </IconButton>
  ),
};

export const ClickableAreaInvisible: Story = {
  args: {
    clickableAreaInvisible: true,
  },
  render: (args) => (
    <IconButton {...args}>
      <CloseLine12></CloseLine12>
    </IconButton>
  ),
};

export const WithTooltip: Story = {
  args: {
    tooltip: '这是一个提示',
    disabled: true,
  },
  render: (args) => (
    <div className="flex items-center ">
      <div>
        <IconButton {...args}>
          <CloseLine12></CloseLine12>
        </IconButton>
      </div>
    </div>
  ),
};

/**
 * 当需要和 Button 一起使用时，需要手动修改 IconButton 的 padding 来和 Button 保持一致
 */
export const ChangePadding: Story = {
  render: () => (
    <div className="flex items-center gap-1">
      <Button>Test</Button>
      <IconButton className="p-[9px]">
        <CloseLine12></CloseLine12>
      </IconButton>
      <IconButton className="p-[7px]">
        <CloseLine16></CloseLine16>
      </IconButton>
    </div>
  ),
};

export const Color: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <div className="flex items-start gap-1">
        <IconButton color="default">
          <CloseLine12></CloseLine12>
        </IconButton>
        <IconButton color="primary">
          <CloseLine12></CloseLine12>
        </IconButton>
        <IconButton color="danger">
          <CloseLine12></CloseLine12>
        </IconButton>
      </div>
      <div className="flex items-center gap-1">
        <IconButton color="default">
          <CloseCircleFill16></CloseCircleFill16>
        </IconButton>
        <IconButton color="primary">
          <CloseCircleFill16></CloseCircleFill16>
        </IconButton>
        <IconButton color="danger">
          <CloseCircleFill16></CloseCircleFill16>
        </IconButton>
      </div>
    </div>
  ),
};

export const Active: Story = {
  ActiveStory: () => {
    const [active, setActive] = React.useState(true);

    return (
      <div className="flex items-start gap-1">
        <IconButton active={active} onClick={() => setActive(!active)}>
          <StarFill16></StarFill16>
        </IconButton>
      </div>
    );
  },
  render: () => <Active.ActiveStory></Active.ActiveStory>,
};

export default meta;
