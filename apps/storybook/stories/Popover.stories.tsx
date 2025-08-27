import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { useEffect } from 'react';
import { Popover } from '@xsky/eris-ui';

// gpt 生成
const meta: Meta<typeof Popover> = {
  title: 'DATA DISPLAY/Popover',
  component: Popover,
  tags: ['skip-test'],
  argTypes: {
    side: {
      control: {
        type: 'inline-radio',
      },
      options: ['top', 'bottom', 'left', 'right'],
      description: '气泡框显示的位置。',
      table: {
        type: { summary: 'top | bottom | left | right' },
        defaultValue: { summary: 'top' },
      },
    },
    arrow: {
      control: {
        type: 'boolean',
      },
      description: '是否显示箭头。',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    container: {
      control: {
        type: undefined,
      },
      description: '气泡框的容器元素。',
    },
    open: {
      control: {
        type: 'boolean',
      },
      description: '气泡框是否打开。当为 true 时，气泡框可见。',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    defaultOpen: {
      control: {
        type: 'boolean',
      },
      description: '气泡框的默认打开状态。',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onOpenChange: {
      control: undefined,
      description: '当气泡框的打开状态发生变化时的回调函数。',
    },
    trigger: {
      control: {
        type: 'check',
        options: ['hover', 'click'],
      },
      description: '触发气泡框显示的方式。', // 对 trigger 参数的中文描述
      table: {
        type: { summary: 'Array<“hover” | "click">' }, // 显示参数类型为字符串数组
        defaultValue: { summary: '["hover"]' }, // 显示默认值为 ['hover']
      },
    },
    align: {
      control: {
        type: 'inline-radio',
      },
      options: ['start', 'center', 'end'],
      description: '气泡框显示的位置。',
      table: {
        type: { summary: 'start | center | end' },
        defaultValue: { summary: 'center' },
      },
    },
  },
};

type Story = StoryObj<typeof Popover>;

export const BasicPopover: Story = {
  args: {
    content: 'This is a basic popover',
    children: 'Hover me',
  },
};

export const PopoverWithTitle: Story = {
  args: {
    content: 'This is a basic popover',
    children: 'Hover me',
    title: 'title',
  },
};

export const PopoverWithoutArrow: Story = {
  args: {
    content: 'This is a basic popover without arrow',
    arrow: false,
    children: 'Hover me',
    title: 'title',
    open: true,
  },
};

export const PopoverOnRight: Story = {
  args: {
    content: 'This popover is placed on the right',
    children: 'Hover me',
    side: 'right',
  },
};

export const DefaultOpenPopover: Story = {
  args: {
    content: 'This is a defaultOpen popover',
    children: 'Hover me',
    defaultOpen: true,
  },
};

export const ControlledOpenPopover: Story = {
  args: {
    title: 'title',
    content: 'This is a controlled popover',
    children: 'Hover me',
    open: true,
  },
};

export const PopoverAlignLeft: Story = {
  args: {
    content: 'Popover align left content content content',
    children: 'Popover align left',
    align: 'start',
  },
};

export const PopoverWithClick: Story = {
  args: {
    content: 'Popover triggered by click',
    children: 'Popover triggered by click',
    trigger: ['click'],
  },
};

export const PopoverWithHovers: Story = {
  args: {
    content: 'Popover triggered by hover&click',
    children: 'Popover triggered by hover&click',
    trigger: ['hover', 'click'],
  },
};

export const ControlledOpen: Story = {
  args: {
    content: 'This is a popover with children',
  },
  render: () => {
    const ControlledItem = () => {
      const [open, setOpen] = useState<boolean>(false);
      return (
        <div className="h-[200px] overflow-y-auto">
          <Popover
            content="This popover is placed in a container"
            open={open}
            trigger={['click']}
            onOpenChange={(val) => {
              console.log(val, 'val');
              setOpen(val);
            }}
          >
            <button
              className="btn btn-primary"
              onClick={() => {
                setOpen(true);
              }}
            >
              click me
            </button>
          </Popover>
        </div>
      );
    };
    return <ControlledItem />;
  },
};

export const ControlledOpenPreventOnPointerDownOutside: Story = {
  args: {
    content: 'This is a popover preventDefault while click outside',
  },
  render: () => {
    const ControlledOpenPreventOnPointerDownOutsideItem = () => {
      const [open, setOpen] = useState<boolean>(false);
      return (
        <div className="h-[200px] overflow-y-auto">
          <Popover
            content="This is a popover preventDefault while click outside"
            open={open}
            trigger={['click']}
            onOpenChange={(val) => {
              console.log(val, '&&&');
              setOpen(val);
            }}
            onPointerDownOutside={(e) => {
              e.preventDefault();
            }}
          >
            <button
              className="btn btn-primary"
              onClick={() => {
                setOpen(true);
              }}
            >
              click me
            </button>
          </Popover>
        </div>
      );
    };
    return <ControlledOpenPreventOnPointerDownOutsideItem />;
  },
};

export const Container: Story = {
  args: {
    content: 'This is a popover with children',
  },
  render: () => {
    const ContainerItem = () => {
      const [container, setContainer] = useState<HTMLElement | null>();
      useEffect(() => {
        setContainer(document.getElementById('containerId'));
      }, []);
      return (
        <div className="flex h-[200px] justify-center overflow-y-auto">
          <div className="h-[400px] overflow-y-auto" id="containerId">
            我有很多内容,出现了滚动条
            <Popover
              content="This popover is placed in a container"
              container={container}
              open={true}
            >
              <button className="btn btn-primary">hover</button>
            </Popover>
          </div>
        </div>
      );
    };
    return <ContainerItem />;
  },
};

export const OverflowPopover: Story = {
  args: {
    title: 'title',
    content:
      'This is a controlled popoverThis is a controlled popoverThis is a controlled popoverThis is a controlled popoverThis is a controlled popoverThis is a controlled popoverThis is a controlled popoverThis is a controlled popoverThis is a controlled popoverThis is a controlled popoverThis is a controlled popoverThis is a controlled popoverThis is a controlled popoverThis is a controlled popoverThis is a controlled popoverThis is a controlled popoverThis is a controlled popoverThis is a controlled popoverThis is a controlled popoverThis is a controlled popoverThis is a controlled popoverThis is a controlled popoverThis is a controlled popoverThis is a controlled popoverThis is a controlled popoverThis is a controlled popoverThis is a controlled popoverThis is a controlled popoverThis is a controlled popoverThis is a controlled popoverThis is a controlled popoverThis is a controlled popoverThis is a controlled popoverThis is a controlled popoverThis is a controlled popoverThis is a controlled popoverThis is a controlled popoverThis is a controlled popoverThis is a controlled popoverThis is a controlled popoverThis is a controlled popoverThis is a controlled popoverThis is a controlled popoverThis is a controlled popoverThis is a controlled popoverThis is a controlled popoverThis is a controlled popoverThis is a controlled popover',
    children: 'Hover me',
  },
  render: (props) => (
    <div className="w-[300px] ">
      <div className="h-[200px] overflow-y-auto"></div>
      <Popover {...props} />
    </div>
  ),
};

export default meta;
