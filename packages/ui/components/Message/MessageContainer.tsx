'use client';
import type { FunctionComponent } from 'react';
import React, { useCallback, useContext } from 'react';
import { cn } from '../../lib/utils';
import Message from './Message';
import { MessageContext } from './lib';

export interface PositionStyles {
  style: string;
}

export interface MessageContainerProps {
  position?: keyof typeof POSITIONS;
}

const POSITIONS: Record<string, PositionStyles> = {
  topLeft: {
    style: 'top-0 left-0 message-container-left',
  },
  topRight: {
    style: 'top-0 right-0 message-container-right',
  },
  topMiddle: {
    style: 'top-0 left-1/2 -translate-x-1/2 transform message-container-middle',
  },
  bottomLeft: {
    style: 'bottom-0 left-0 message-container-left',
  },
  bottomRight: {
    style: 'bottom-0 right-0 message-container-right',
  },
  bottomMiddle: {
    style: 'bottom-0 left-1/2 -translate-x-1/2 transform message-container-middle',
  },
};
export type PostionTypes = keyof typeof POSITIONS;

const JUSTIFY_CONTENT: Record<string, PositionStyles> = {
  topLeft: {
    style: 'justify-start',
  },
  bottomLeft: {
    style: 'justify-start',
  },
  topRight: {
    style: 'justify-end',
  },
  bottomRight: {
    style: 'justify-end',
  },
  topMiddle: {
    style: 'justify-center',
  },
  bottomMiddle: {
    style: 'justify-center',
  },
};

const MessageContainer: FunctionComponent<MessageContainerProps> = ({ position = 'topRight' }) => {
  const context = useContext(MessageContext);
  const positionClassName = POSITIONS[position].style;
  const justifyClassName = JUSTIFY_CONTENT[position].style;

  const handleRemove = useCallback((id: string) => {
    context?.remove(id);
  }, []);

  return (
    <div
      className={cn(
        positionClassName,
        'z-tooltip pointer-events-none fixed max-h-screen w-full max-w-[500px] overflow-hidden p-[24px]',
      )}
    >
      <div className={cn('fade mr-8 w-full flex-1 flex-col justify-end')}>
        {context?.data.map((message) => (
          <div
            className={cn('pointer-events-auto flex py-[8px]', justifyClassName)}
            key={message.id}
          >
            <Message {...message} animate onClose={handleRemove} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageContainer;
