import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import {
  Button,
  Modal,
  ModalProps,
  DialogSizeType as SizeType,
  useModal,
  ModalManager,
} from '@xsky/eris-ui';

export default {
  title: 'FEEDBACK/Modal',
  component: Modal,
  tags: ['skip-test'],
  argTypes: {
    title: { control: 'text', description: '模态框的标题,传 null 不显示 title 的区域' },
    open: {
      control: {
        type: 'boolean',
      },
      description: '模态框是否打开。',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    defaultOpen: {
      control: {
        type: 'boolean',
      },
      description: '模态框默认打开状态。',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onOpenChange: { control: null, description: '当打开状态发生改变时的回调函数' },
    onCancel: { control: null, description: '取消按钮点击时的回调函数' },
    onOk: { control: null, description: '确认按钮点击时的回调函数' },
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
    dropContentContainer: {
      control: {
        type: 'boolean',
      },
      description: '是否使用 Modal 的 content 容器，默认为 false',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    maskClosable: {
      control: {
        type: 'boolean',
      },
      description: '是否可通过点击遮罩层关闭模态框。',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    maskClassName: { control: 'text', description: '遮罩层的自定义类名' },
    closeIcon: { control: null, description: '自定义关闭图标元素' },
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
    bodyClassName: { control: 'text', description: '模态框内容区域的自定义类名' },
    modalContainerClassName: { control: 'text', description: '模态框最外层容器的自定义类名' },
    okText: { control: 'text', description: '确认按钮的文本' },
    okType: { control: 'text', description: '确认按钮的类型' },
    okLoading: {
      control: {
        type: 'boolean',
      },
      description: '确认按钮是否处于加载状态。',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    okButtonProps: { control: null, description: '确认按钮的额外属性' },
    cancelText: { control: 'text', description: '取消按钮的文本' },
    cancelType: { control: 'text', description: '取消按钮的类型' },
    cancelButtonProps: { control: null, description: '取消按钮的额外属性' },
    children: { control: 'text', description: '模态框内容区域的内容' },
    size: {
      control: { type: 'select', options: Object.values(SizeType) },
      description: '模态框的尺寸',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: SizeType.md },
      },
    },
    centered: {
      control: {
        type: 'boolean',
      },
      description: '模态框内容是否垂直居中。',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    footer: { control: null, description: '自定义模态框底部区域' },
    footerContent: { control: null, description: '模态框底部内容' },
    draggable: {
      control: {
        type: 'boolean',
      },
      description: '是否支持拖拽。',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
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
  },
} as Meta;

type ModalStory = StoryObj<typeof Modal>;

const ModalControlled = ({ open, onCancel, onOk, ...rest }: ModalProps) => {
  const [isOpen, setIsOpen] = useState(open || false);

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
      <Button onClick={handleOpen}>Open</Button>
      <Modal open={isOpen} onCancel={handleClose} onOk={handleClose} {...rest} />
    </div>
  );
};

const DoubleModalControlled = ({ open, onCancel, onOk, ...rest }: ModalProps) => {
  const [isOpen, setIsOpen] = useState(open || false);
  const [isSecondOpen, setIsSecondOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    onOk?.();
  };

  const handleClose = () => {
    setIsOpen(false);
    onCancel?.();
  };

  const openSecond = () => {
    setIsSecondOpen(true);
  };

  const handleSecondClose = () => {
    setIsSecondOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Open</Button>
      <Modal
        open={isOpen}
        onCancel={handleClose}
        onOk={openSecond}
        {...rest}
        mask={!isSecondOpen}
      />
      <Modal open={isSecondOpen} onCancel={handleSecondClose} onOk={handleSecondClose} {...rest} />
    </div>
  );
};

export const DefaultModal: ModalStory = {
  args: {
    title: 'Default Modal',
    open: false,
    onCancel: () => {
      console.log('Cancelled');
    },
    onOk: () => {
      console.log('Confirmed');
    },
    children: (
      <div>
        <p>This is the content of the modal.</p>
        <p>You can add any content here.</p>
      </div>
    ),
  },
  render: (rags) => {
    return <ModalControlled {...rags} />;
  },
};

export const ModalWithCustomText: ModalStory = {
  args: {
    title: 'Custom Text Modal',
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
        <p>This is a modal with custom confirm and cancel text.</p>
      </div>
    ),
  },
  render: (rags) => {
    return <ModalControlled {...rags} />;
  },
};

export const SmallModal: ModalStory = {
  args: {
    title: 'Small Modal',
    size: SizeType.sm,
    children: <p>This is a small modal content.</p>,
  },
  render: (rags) => {
    return <ModalControlled {...rags} />;
  },
};

export const MiddleModal: ModalStory = {
  args: {
    title: 'Large Modal',
    size: SizeType.md,
    children: <p>This is a large modal content.</p>,
  },
  render: (rags) => {
    return <ModalControlled {...rags} />;
  },
};

export const LargeModal: ModalStory = {
  args: {
    title: 'Large Modal',
    size: SizeType.lg,
    children: <p>This is a large modal content.</p>,
  },
  render: (rags) => {
    return <ModalControlled {...rags} />;
  },
};

export const ModalWithoutMask: ModalStory = {
  args: {
    title: 'Large Modal',
    mask: false,
    size: SizeType.lg,
    children: <p>This is a large modal content.</p>,
  },
  render: (rags) => {
    return <ModalControlled {...rags} />;
  },
};

export const ModalWithMask: ModalStory = {
  args: {
    title: 'Modal with Mask',
    mask: true,
    maskClosable: true,
    onCancel: () => {
      console.log('Cancelled');
    },
    onOk: () => {
      console.log('Confirmed');
    },
    children: (
      <div>
        <p>This is a modal with a mask that can be closed when clicking outside the modal.</p>
      </div>
    ),
  },
  render: (rags) => {
    return <ModalControlled {...rags} />;
  },
};

export const ModalWithDefaultOpen: ModalStory = {
  args: {
    title: 'Modal with default open',
    mask: true,
    defaultOpen: true,
    children: (
      <div>
        <p>This is a modal with default open.</p>
      </div>
    ),
  },
  render: (rags) => {
    return <ModalControlled {...rags} />;
  },
};

export const ModalWithoutFooter: ModalStory = {
  args: {
    title: 'Modal with default open',
    mask: true,
    footer: null,
    children: (
      <div>
        <p>This is a modal with default open.</p>
      </div>
    ),
  },
  render: (rags) => {
    return <ModalControlled {...rags} />;
  },
};

export const ModalWithDraggable: ModalStory = {
  args: {
    title: 'Modal with default open',
    mask: true,
    draggable: true,
    children: (
      <div>
        <p>This is a modal with draggable.</p>
      </div>
    ),
  },
  render: (rags) => {
    return <ModalControlled {...rags} />;
  },
};

export const DoubleModalWithDraggable: ModalStory = {
  args: {
    title: 'Modal with default open',
    mask: true,
    draggable: true,
    children: (
      <div>
        <p>This is a modal with draggable.</p>
      </div>
    ),
  },
  render: (rags) => {
    return <DoubleModalControlled {...rags} />;
  },
};

export const ModalWithoutCentered: ModalStory = {
  args: {
    title: 'Modal with Mask',
    mask: true,
    centered: false,
    motion: true,
    onCancel: () => {
      console.log('Cancelled');
    },
    onOk: () => {
      console.log('Confirmed');
    },
    children: (
      <div>
        <p>This is a modal with a mask that can be closed when clicking outside the modal.</p>
      </div>
    ),
  },
  render: (rags) => {
    return <ModalControlled {...rags} />;
  },
};

const ControlledModalItem = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Open Modal</Button>
      <Modal
        title="Controlled Modal"
        open={isOpen}
        onCancel={handleClose}
        onOk={handleClose}
        okText="Confirm"
        cancelText="Cancel"
        modalContainerClassName="customClass"
      >
        <div>
          <p className="m-0">This is a controlled modal with open state managed internally.</p>
        </div>
      </Modal>
    </div>
  );
};

export const ControlledModal: ModalStory = {
  args: {},
  render: () => <ControlledModalItem />,
};

const ModalHooksItem = () => {
  const modal = useModal();
  return (
    <Button
      onClick={() => {
        const { updateItem, removeItem } = modal?.open({
          title: 'modal hooks',
          okText: 'Confirm',
          cancelText: 'Cancel',
          children: (
            <div>
              <p className="m-0">this content will change after 3 seconds</p>
            </div>
          ),
        });
        setTimeout(() => {
          updateItem({
            children: (
              <div>
                <p className="m-0">new content</p>
                <div>
                  <Button onClick={() => removeItem()}>remove</Button>
                </div>
                <div>
                  <Button
                    onClick={() =>
                      modal.open({
                        title: 'second modal',
                        okText: 'Confirm',
                        cancelText: 'Cancel',
                        children: (
                          <div>
                            <p className="m-0">second modal content</p>
                          </div>
                        ),
                      })
                    }
                  >
                    push modal
                  </Button>
                </div>
              </div>
            ),
          });
        }, 3000);
      }}
    >
      Open
    </Button>
  );
};

export const ModalHooksContainer: any = {
  args: {},
  render: (args: any) => {
    return (
      <ModalManager>
        <ModalHooksItem />
      </ModalManager>
    );
  },
};

const ControlledSimpleModalItem = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Open Modal</Button>
      <Modal
        title={null}
        footer={null}
        mask={false}
        dropContentContainer
        open={isOpen}
        onCancel={handleClose}
        onOk={handleClose}
        modalContainerStyle={{ top: '100px' }}
      >
        <div>
          <p className="m-0">This is a controlled modal with open state managed internally.</p>
        </div>
      </Modal>
    </div>
  );
};

export const ControlledSimpleModal: ModalStory = {
  args: {},
  render: () => <ControlledSimpleModalItem />,
};

export const ModalWithScroll: ModalStory = {
  args: {
    title: 'Modal With Scroll',
    open: false,
    onCancel: () => {
      console.log('Cancelled');
    },
    onOk: () => {
      console.log('Confirmed');
    },
    children: (
      <div>
        <p>This is the content of the modal.</p>
        <p>You can add any content here.</p>
        <p>You can add any content here.</p>
        <p>You can add any content here.</p>
        <p>You can add any content here.</p>
        <p>You can add any content here.</p>
        <p>You can add any content here.</p>
        <p>You can add any content here.</p>
        <p>You can add any content here.</p>
        <p>You can add any content here.</p>
        <p>You can add any content here.</p>
        <p>You can add any content here.</p>
        <p>You can add any content here.</p>
        <p>You can add any content here.</p>
        <p>You can add any content here.</p>
        <p>You can add any content here.</p>
        <p>You can add any content here.</p>
        <p>You can add any content here.</p>
        <p>You can add any content here.</p>
        <p>You can add any content here.</p>
        <p>You can add any content here.</p>
        <p>You can add any content here.</p>
      </div>
    ),
  },
  render: (rags) => {
    return <ModalControlled {...rags} />;
  },
};
