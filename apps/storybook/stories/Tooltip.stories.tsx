import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { useEffect } from 'react';
import { Button, Tooltip } from '@xsky/eris-ui';

// gpt 生成
const meta: Meta<typeof Tooltip> = {
  title: 'DATA DISPLAY/Tooltip', // 故事的标题
  component: Tooltip, // 组件的名称
  tags: ['skip-test'],
  argTypes: {
    side: {
      control: {
        type: 'inline-radio', // 使用 'inline-radio' 类型来模拟选择枚举
      },
      options: ['top', 'bottom', 'left', 'right'],
      description: '提示框显示的位置。', // 对 side 参数的中文描述
    },
    title: {
      control: {
        type: 'text',
      },
      description: '提示框的内容。', // 对 title 参数的中文描述
      table: {
        type: { summary: 'ReactNode' }, // 显示参数类型为 ReactNode
        defaultValue: { summary: '""' }, // 显示默认值为 ''
      },
    },
    arrow: {
      control: {
        type: 'boolean',
      },
      description: '是否显示箭头。', // 对 arrow 参数的中文描述
      table: {
        type: { summary: 'boolean' }, // 显示参数类型为布尔值
        defaultValue: { summary: 'true' }, // 显示默认值为 true
      },
    },
    container: {
      control: {
        type: 'object',
      },
      description: '提示框的容器元素。', // 对 container 参数的中文描述
    },
    open: {
      control: {
        type: 'boolean',
      },
      description: '提示框是否打开。当为 true 时，提示框可见。', // 对 open 参数的中文描述
      table: {
        type: { summary: 'boolean' }, // 显示参数类型为布尔值
        defaultValue: { summary: 'false' }, // 显示默认值为 false
      },
    },
    defaultOpen: {
      control: {
        type: 'boolean',
      },
      description: '提示框的默认打开状态。', // 对 defaultOpen 参数的中文描述
      table: {
        type: { summary: 'boolean' }, // 显示参数类型为布尔值
        defaultValue: { summary: 'false' }, // 显示默认值为 false
      },
    },
    onOpenChange: {
      control: 'object',
      description: '当提示框的打开状态发生变化时的回调函数。', // 对 onOpenChange 参数的中文描述
    },
    align: {
      control: {
        type: 'inline-radio',
      },
      options: ['start', 'center', 'end'],
      description: '提示框显示的位置。',
    },
    disableHoverableContent: {
      control: {
        type: 'boolean',
      },
      description: '禁用 [移入 Tooltip 内容区域保持展开] 的功能',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
};

type Story = StoryObj<typeof Tooltip>;

export const BasicTooltip: Story = {
  args: {
    title: 'This is a basic tooltip',
    children: 'Hover me',
  },
};

export const TooltipWithoutArrow: Story = {
  args: {
    title: 'This is a basic tooltip without arrow',
    arrow: false,
    children: 'Hover me',
  },
};

export const TooltipOnRight: Story = {
  args: {
    title: 'This tooltip is placed on the right',
    children: 'Hover me',
    side: 'right',
  },
};

export const DefaultOpenTooltip: Story = {
  args: {
    title: 'This is a controlled tooltip',
    children: 'Hover me',
    defaultOpen: true,
  },
};

export const ControlledOpenTooltip: Story = {
  args: {
    title: 'This is a controlled tooltip',
    children: 'Hover me',
    open: true,
  },
};

export const AlignLeftTooltip: Story = {
  args: {
    title: 'This is a controlled tooltip',
    children: 'Hover me',
    align: 'start',
    open: true,
  },
};
const imgBase64Content =
  'data:image/gif;base64,R0lGODlhEAAQAKIGAMLY8YSx5HOm4Mjc88/g9Ofw+v///wAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgAGACwAAAAAEAAQAAADMGi6RbUwGjKIXCAA016PgRBElAVlG/RdLOO0X9nK61W39qvqiwz5Ls/rRqrggsdkAgAh+QQFCgAGACwCAAAABwAFAAADD2hqELAmiFBIYY4MAutdCQAh+QQFCgAGACwGAAAABwAFAAADD1hU1kaDOKMYCGAGEeYFCQAh+QQFCgAGACwKAAIABQAHAAADEFhUZjSkKdZqBQG0IELDQAIAIfkEBQoABgAsCgAGAAUABwAAAxBoVlRKgyjmlAIBqCDCzUoCACH5BAUKAAYALAYACgAHAAUAAAMPaGpFtYYMAgJgLogA610JACH5BAUKAAYALAIACgAHAAUAAAMPCAHWFiI4o1ghZZJB5i0JACH5BAUKAAYALAAABgAFAAcAAAMQCAFmIaEp1motpDQySMNFAgA7';

export const TooltipWithImgAndLink: Story = {
  args: {
    title: (
      <div>
        <span>tooltip with img</span>
        <img src={imgBase64Content} alt="imgae" />
        <span>tooltip with link</span>
        <a href="#">link</a>
      </div>
    ),
    children: 'Hover me',
    align: 'start',
    open: true,
  },
};

export const Container: Story = {
  args: {
    title: 'This is a tooltip with children',
  },
  render: () => {
    const ContainerItem = () => {
      const [container, setContainer] = useState<HTMLElement | null>();
      useEffect(() => {
        setContainer(document.getElementById('containerId'));
      }, []);
      return (
        <div className="flex h-[200px] justify-center overflow-y-auto">
          <p className="h-[400px] overflow-y-auto" id="containerId">
            我有很多内容,出现了滚动条
            <Tooltip
              title="This tooltip is placed in a container"
              container={container}
              open={true}
            >
              <button className="btn btn-primary">Hover me</button>
            </Tooltip>
          </p>
        </div>
      );
    };
    return <ContainerItem />;
  },
};

const EmptyTooltipStory = (args: any) => {
  const [title, setTitle] = useState(args.title);
  return (
    <div>
      <Tooltip {...args} title={title}></Tooltip>
      <Button onClick={() => setTitle('new title')}>set title</Button>
    </div>
  );
};

export const EmptyTooltip: Story = {
  args: {
    title: '',
    children: 'Hover me',
  },
  render: (args) => <EmptyTooltipStory {...args}></EmptyTooltipStory>,
};

export const DisableHoverableContentTooltip: Story = {
  args: {
    title: 'DisableHoverableContent',
    children: 'Tooltip will be hidden while hovering content ',
    align: 'start',
    disableHoverableContent: true,
  },
};

export const CustomWidthTooltip: Story = {
  args: {
    title:
      'This is a tooltip with custom widthThis is a tooltip with custom widthThis is a tooltip with custom widthThis is a tooltip with custom widthThis is a tooltip with custom widthThis is a tooltip with custom width',
    children: <button disabled>test</button>,
    className: 'max-w-[480px]',
  },
};

export default meta;
