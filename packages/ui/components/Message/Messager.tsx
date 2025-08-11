'use client';
import React, { useCallback, useContext, useMemo, useState } from 'react';
import { uuid } from '../../lib/utils';
import type { MessageContainerProps } from './MessageContainer';
import MessageContainer from './MessageContainer';
import type { MessageProps as Message } from './Message';
import { MessageContext } from './lib';

export type MessagerProps = {
  children: React.ReactNode;
  duration?: number;
  maxMessages?: number;
} & MessageContainerProps;

type ReturnVal =
  | undefined
  | {
      item: Omit<Message, 'type'>;
      removeItem: () => void;
    };

export interface MessageContextType {
  data: Message[];
  pushError: (options: Omit<Message, 'type'>) => ReturnVal;
  pushWarning: (options: Omit<Message, 'type'>) => ReturnVal;
  pushSuccess: (options: Omit<Message, 'type'>) => ReturnVal;
  pushInfo: (options: Omit<Message, 'type'>) => ReturnVal;
  push: (options: Message) => ReturnVal;
  remove: (id: string) => void;
  removeAll: () => void;
}

export const useMessage = () => useContext(MessageContext);

const DEFAULT_INTERVAL = 3000;

/**
 * Owner: zhang.huan@xsky.com
 *
 * 为 message 使用提供统一的全局化配置
 */
const Messager: React.FC<MessagerProps> = ({
  children,
  position,
  duration: durationProps = DEFAULT_INTERVAL,
  maxMessages = 5,
}) => {
  const [data, setData] = useState<Message[]>([]);

  const pushMessage = useCallback(
    (options: Message) => {
      const { message, duration, ...rest } = options;
      if (message) {
        const newItem: Message = {
          messageManagerId: uuid(),
          useVisibility: true,
          duration: duration ? duration : durationProps,
          message,
          ...rest,
        };

        setData((prevState) => [...prevState, newItem]);
        return {
          item: newItem,
          removeItem: () =>
            setData((prevState) =>
              prevState.filter((e) => e.messageManagerId !== newItem.messageManagerId),
            ),
        };
      }
    },
    [setData, durationProps],
  );

  const pushError = useCallback(
    (options: Omit<Message, 'type'>) => {
      return pushMessage({ ...options, type: 'error' });
    },
    [pushMessage],
  );
  const pushWarning = useCallback(
    (options: Omit<Message, 'type'>) => {
      return pushMessage({ ...options, type: 'warning' });
    },
    [pushMessage],
  );
  const pushSuccess = useCallback(
    (options: Omit<Message, 'type'>) => {
      return pushMessage({ ...options, type: 'success' });
    },
    [pushMessage],
  );
  const pushInfo = useCallback(
    (options: Omit<Message, 'type'>) => {
      return pushMessage({ ...options, type: 'info' });
    },
    [pushMessage],
  );

  const messageContextValue = useMemo(() => {
    return {
      data: data.slice(0, maxMessages),
      pushError,
      pushWarning,
      pushSuccess,
      pushInfo,
      push: pushMessage,
      remove: (id: string) => {
        if (id) {
          setData((prevState) => prevState.filter((e) => e.messageManagerId !== id));
        }
      },
      removeAll: () => {
        setData([]);
      },
    };
  }, [data, setData, pushError, pushWarning, pushSuccess, pushInfo, pushMessage, maxMessages]);

  return (
    <MessageContext.Provider value={messageContextValue}>
      <MessageContainer position={position} />
      {children}
    </MessageContext.Provider>
  );
};

export default Messager;
