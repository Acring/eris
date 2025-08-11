'use client';
import type { ReactNode } from 'react';
import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
  useEffect,
  useRef,
} from 'react';

import type { NotificationProps } from './Notification';
import Notification from './Notification';
import { uuid } from '../../lib/utils';

interface NotificationsContextValue {
  pushData: (newData: NotificationProps) => void;
}
const NotificationsContext = createContext<NotificationsContextValue>({
  pushData() {},
});

interface NotificationsProps {
  children: ReactNode;
  maxCount?: number;
  duration?: number;
}
interface NotificationItem {
  id: string;
  data: NotificationProps;
}

const Notifications = (props: NotificationsProps) => {
  const { children, maxCount = 3, duration = 3000 } = props;

  const [items, setItems] = useState<NotificationItem[]>([]);
  const [autoCloseFlag, setAutoCloseFlag] = useState(true);

  const pushData = useCallback(
    function (newData: NotificationProps) {
      setItems(function (oldItems) {
        const newItem: NotificationItem = {
          id: uuid(),
          data: newData,
        };
        const newItems = [newItem].concat(oldItems);
        if (newItems.length > maxCount) {
          const removedItems = newItems.slice(maxCount);
          removedItems.forEach(function (removedItem) {
            removedItem.data.onClose?.();
          });
          return newItems.slice(0, maxCount);
        }
        return newItems;
      });
    },
    [maxCount],
  );

  const contextValue: NotificationsContextValue = useMemo(
    function () {
      const ret: NotificationsContextValue = {
        pushData,
      };
      return ret;
    },
    [pushData],
  );

  return (
    <NotificationsContext.Provider value={contextValue}>
      {items.length > 0 && (
        <div className="fixed z-tooltip top-[66px] left-[50%] translate-x-[-50%]">
          <div className="flex flex-col gap-1 relative w-[360px]">
            {items.map(function (item, index) {
              return (
                <NotificationItemBox
                  autoCloseFlag={autoCloseFlag}
                  duration={duration}
                  index={index}
                  item={item}
                  key={item.id}
                  onClose={function () {
                    setItems(function (oldItems) {
                      return oldItems.filter(function (oldItem) {
                        return oldItem.id !== item.id;
                      });
                    });
                    item.data.onClose?.();
                  }}
                  startAutoClose={function () {
                    setAutoCloseFlag(true);
                  }}
                  stopAutoClose={function () {
                    setAutoCloseFlag(false);
                  }}
                />
              );
            })}
          </div>
        </div>
      )}
      {children}
    </NotificationsContext.Provider>
  );
};

const NotificationItemBox = (props: {
  item: NotificationItem;
  index: number;
  duration: number;
  onClose: () => void;
  autoCloseFlag: boolean;
  startAutoClose: () => void;
  stopAutoClose: () => void;
}) => {
  const { item, index, duration, onClose, autoCloseFlag, startAutoClose, stopAutoClose } = props;

  const [entering, setEntering] = useState(true);

  const handleClose = useCallback(function () {
    setEntering(false);
  }, []);

  const timerRef = useRef<number | undefined>(undefined);
  const itemRef = useRef<HTMLDivElement>(null);
  const [itemTopDistance, setItemTopDistance] = useState(0);

  useEffect(
    function () {
      if (autoCloseFlag) {
        timerRef.current !== undefined && window.clearTimeout(timerRef.current);
        timerRef.current = window.setTimeout(function () {
          handleClose();
        }, duration);
      } else {
        timerRef.current !== undefined && window.clearTimeout(timerRef.current);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [autoCloseFlag, duration], // leave handleClose out
  );

  useEffect(
    function () {
      if (index > 0) {
        let topDistance = 0;
        for (const child of Array.from(itemRef.current?.parentElement?.children ?? [])) {
          if (child !== itemRef.current) {
            const gap = 8;
            topDistance = topDistance + child.clientHeight + gap;
          } else {
            setItemTopDistance(topDistance);
            break;
          }
        }
      }
    },
    [index],
  );

  return (
    <div
      className={index === 0 && entering ? 'notification-enter' : undefined}
      onMouseEnter={function () {
        stopAutoClose();
      }}
      onMouseLeave={function () {
        startAutoClose();
      }}
      ref={itemRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        transform: index > 0 ? `translate(0px, ${itemTopDistance}px)` : undefined,
        transition: index > 0 ? 'transform 1s cubic-bezier(0.16, 1, 0.3, 1)' : undefined,
      }}
    >
      <div
        className={!entering ? 'notification-exit' : undefined}
        onAnimationEnd={function () {
          // 动画结束后，从 DOM 中移除元素
          if (!entering) {
            onClose();
          }
        }}
        style={{
          animationFillMode: 'forwards', // 保证动画结束的状态，避免出现闪动
        }}
      >
        <Notification
          {...item.data}
          onClose={function () {
            handleClose();
          }}
        />
      </div>
    </div>
  );
};

const useNotifications = () => {
  return useContext(NotificationsContext);
};

export type { NotificationsProps };
export default Notifications;
export { useNotifications };
