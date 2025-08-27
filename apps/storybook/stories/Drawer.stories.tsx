import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Drawer, Button, DrawerProps } from '@xsky/eris-ui';
import { DownLine16, UpLine16 } from '@xsky/eris-icons';

export default {
  title: 'FEEDBACK/Drawer',
  tags: ['skip-test'],
  component: Drawer,
  argTypes: {
    title: {
      control: {
        type: 'text',
      },
      description: '抽屉的标题',
    },
    side: {
      control: {
        type: 'inline-radio',
      },
      options: ['left', 'right'],
      defaultValue: 'right',
      description: '悬浮位置',
    },
    open: {
      control: {
        type: 'boolean',
      },
      description: '抽屉是否打开。',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    defaultOpen: {
      control: {
        type: 'boolean',
      },
      description: '抽屉默认打开状态。',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onOpenChange: {
      control: {
        type: 'object',
      },
      description: '当打开状态发生改变时的回调函数',
    },
    onCancel: {
      control: {
        type: 'object',
      },
      description: '取消按钮点击时的回调函数',
    },
    onOk: {
      control: {
        type: 'object',
      },
      description: '确认按钮点击时的回调函数',
    },
    mask: {
      control: {
        type: 'boolean',
      },
      description: '是否显示遮罩层。',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    maskClosable: {
      control: {
        type: 'boolean',
      },
      description: '是否可通过点击遮罩层关闭抽屉。',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    closeIcon: {
      control: {
        type: 'object',
      },
      description: '自定义关闭图标元素',
    },
    showCloseIcon: {
      control: {
        type: 'boolean',
      },
      description: '是否显示关闭图标。',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    okText: {
      control: {
        type: 'text',
      },
      description: '确认按钮的文本',
    },
    okType: {
      control: {
        type: 'text',
      },
      description: '确认按钮的类型',
    },
    okButtonProps: {
      control: {
        type: 'object',
      },
      description: '确认按钮的额外属性',
    },
    cancelText: {
      control: {
        type: 'text',
      },
      description: '取消按钮的文本',
    },
    cancelType: {
      control: {
        type: 'text',
      },
      description: '取消按钮的类型',
    },
    cancelButtonProps: {
      control: {
        type: 'object',
      },
      description: '取消按钮的额外属性',
    },
    footer: {
      control: {
        type: 'object',
      },
      description: '自定义抽屉底部区域',
    },
    footerContent: {
      control: {
        type: 'object',
      },
      description: '抽屉底部内容',
    },
    cancelOnEscapeKeyDown: {
      control: {
        type: 'boolean',
      },
      description: '点击 esc 时是否触发cancel。',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    extraOperation: {
      control: {
        type: 'object',
      },
      description: '抽屉的额外操作（需要上下翻页时）',
    },
    classes: {
      description: '抽屉的类名配置',
      table: {
        type: { summary: 'object' },
        defaultValue: {
          summary: `{
            containerClassName: '',
            maskClassName: '',
            bodyClassName: '',
          }`,
        },
      },
      control: {
        type: 'object',
      },
      defaultValue: {
        containerClassName: '',
        maskClassName: '',
        bodyClassName: '',
      },
    },
  },
} as Meta;

type DrawerStory = StoryObj<typeof Drawer> & {
  [key: string]: any;
};

export const DefaultDrawer: DrawerStory = {
  args: {
    title: 'Default Drawer',
    open: false,
    onCancel: () => {
      console.log('Cancelled');
    },
    onOk: () => {
      console.log('Confirmed');
    },
    children: (
      <div>
        <p>This is the content of the drawer.</p>
        <p>You can add any content here.</p>
      </div>
    ),
  },
  DrawerControlled: ({
    open,
    onCancel,
    onOk,
    children,
    buttonLabel,
    ...rest
  }: DrawerProps & { buttonLabel?: string }) => {
    const [isOpen, setIsOpen] = useState(open || false);
    const buttonRef = React.useRef<any>(null);

    const handleOpen = () => {
      setIsOpen(true);
      onOk?.();
    };

    const handleClose = () => {
      setIsOpen(false);
      onCancel?.();
    };

    return (
      <div>
        <Button onClick={handleOpen} ref={buttonRef}>
          {buttonLabel || 'Open Drawer'}
        </Button>
        <Drawer
          open={isOpen}
          onCancel={handleClose}
          onOk={handleClose}
          onClickOutSide={(event) => {
            if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
              setIsOpen(false);
            }
          }}
          {...rest}
        >
          {children || (
            <div>
              <p>This is the content of the drawer.</p>
              <p>You can add any content here.</p>
            </div>
          )}
        </Drawer>
      </div>
    );
  },
  render: (rags) => {
    return <DefaultDrawer.DrawerControlled {...rags} />;
  },
};

export const DrawerWithCustomButtonText: DrawerStory = {
  args: {
    title: 'Custom Text Drawer',
    onCancel: () => {
      console.log('Cancelled');
    },
    onOk: () => {
      console.log('Confirmed');
    },
    okText: 'Custom Confirm',
    cancelText: 'Custom Cancel',
    children: (
      <div>
        <p>This is a drawer with custom confirm and cancel text.</p>
      </div>
    ),
  },
  render: (rags) => {
    return <DefaultDrawer.DrawerControlled {...rags} />;
  },
};

export const ScrollDrawer: DrawerStory = {
  args: {
    title: 'Scroll Drawer',
    children: (
      <div>
        {[...Array(100)].map(
          (
            _,
            index, // eslint-disable-line react/no-array-index-key
          ) => (
            <p key={index} className="m-0">
              This is a scroll drawer content.
            </p>
          ),
        )}
      </div>
    ),
  },
  render: (rags) => {
    return <DefaultDrawer.DrawerControlled {...rags} />;
  },
};

export const DrawerWithExtraTitle: DrawerStory = {
  args: {
    title: (
      <div className="flex justify-between">
        <p className="m-0">title</p>
        <a className="text-text-link-primary-normal text-[14px]">link</a>
      </div>
    ),
    mask: false,
    children: <p>This is a large drawer content.</p>,
  },
  render: (rags) => {
    return (
      <div>
        <DefaultDrawer.DrawerControlled {...rags} />
      </div>
    );
  },
};

export const DrawerWithoutMask: DrawerStory = {
  args: {
    title: 'Large Drawer',
    mask: false,
    children: <p>This is a large drawer content.</p>,
  },
  render: (rags) => {
    return (
      <div>
        <DefaultDrawer.DrawerControlled {...rags} />
        <input type="text" />
      </div>
    );
  },
};

export const DrawerWithoutFooter: DrawerStory = {
  args: {
    title: 'Drawer with default open',
    mask: true,
    footer: null,
    children: (
      <div>
        <p>This is a drawer with default open.</p>
      </div>
    ),
  },
  render: (rags) => {
    return <DefaultDrawer.DrawerControlled {...rags} />;
  },
};

export const DrawerWithCustomFooter: DrawerStory = {
  args: {
    title: 'Drawer with custom footer',
    mask: true,
    footerContent: <div>footerContent</div>,
    children: (
      <div>
        <p>This is a drawer with default open.</p>
      </div>
    ),
  },
  render: (rags) => {
    return <DefaultDrawer.DrawerControlled {...rags} />;
  },
};

export const DrawerWithExtraOperation: DrawerStory = {
  args: {
    title: 'Drawer with extra Operation',
    mask: true,
    children: (
      <div>
        <p>This is a drawer with extra Operation</p>
      </div>
    ),
    extraOperation: (
      <div className="flex flex-col">
        <div className="border-stroke-border-2 flex items-center border-[1px] border-solid bg-white px-[8px] py-[4px]">
          <UpLine16 />
        </div>
        <div className="border-stroke-border-2 flex	items-center border-[1px] border-solid bg-white px-[8px] py-[4px]">
          <DownLine16 />
        </div>
      </div>
    ),
  },
  render: (rags) => {
    return (
      <div>
        <DefaultDrawer.DrawerControlled {...rags} />
        <DefaultDrawer.DrawerControlled {...rags} side="left" buttonLabel="Open Drawer left" />
      </div>
    );
  },
};

export const DrawerWithoutMaskAndCustomHeight: DrawerStory = {
  args: {
    title: 'Large Drawer',
    mask: false,
    children: <p>This is a large drawer content with top 50px & bottom 50px.</p>,
    classes: {
      containerClassName: 'h-[auto] top-[50px] bottom-[50px]',
    },
  },
  render: (rags) => {
    return (
      <div>
        <DefaultDrawer.DrawerControlled {...rags} />
      </div>
    );
  },
};
