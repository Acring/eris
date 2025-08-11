import React, { ReactNode, useCallback } from 'react';
import { Meta } from '@storybook/react';
import { App, useApp, Button } from '@xsky/eris-ui';

const PageComponent = () => {
  const { modal, message } = useApp();

  const openModal = useCallback(() => {
    const modalConfig = {
      title: 'Example Modal',
      body: 'This is an example of a modal.',
      confirmText: 'OK',
      cancelText: 'Cancel',
      onConfirm: () => console.log('Modal confirmed.'),
      onCancel: () => console.log('Modal cancelled.'),
    };

    modal.open(modalConfig);
  }, [modal]);

  const showMessage = useCallback(() => {
    message?.pushSuccess({
      message: 'This is an example of a message.',
    });
  }, []);

  return (
    <div>
      <div className="flex gap-[8px]">
        <div>
          <Button onClick={openModal}>Click to open modal</Button>
        </div>
        <div>
          <Button onClick={showMessage}>Click to open message</Button>
        </div>
      </div>
    </div>
  );
};

export const Default = () => {
  return (
    <App
      messageConfig={{
        position: 'topRight',
        duration: 5000,
        maxMessages: 5,
      }}
    >
      <PageComponent />
    </App>
  );
};

const meta: Meta = {
  component: App,
  tags: ['skip-test'],
  title: 'other/App',
  parameters: {
    docs: {
      description: {
        component:
          '包裹组件，提供消费 useMessage,useModal 的上下文默认环境，可使用 useApp 获取到静态方法；简化 useMessage 等方法需要手动植入多个 Provider 的问题。',
      },
    },
  },
};

export default meta;
