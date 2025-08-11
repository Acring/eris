'use client';
import type { HTMLAttributes, ReactNode } from 'react';
import React, { useEffect, forwardRef, useRef, useCallback, useState, useMemo } from 'react';
import {
  NoticeFill16,
  WarnFill16,
  CloseCircleFill16,
  DoneFill16,
  CloseLine16,
} from '@xsky/eris-icons';
import { cn, uuid } from '../../lib/utils';

const VARIANTS: Record<
  string,
  {
    base: string;
    iconstyle: string;
    icon: ReactNode;
  }
> = {
  info: {
    base: 'border-message-border-info bg-message-bg-info',
    iconstyle: 'text-blue-500 ',
    icon: <NoticeFill16 />,
  },
  success: {
    base: 'border-message-border-success bg-message-bg-success',
    iconstyle: 'text-green-500 ',
    icon: <DoneFill16 />,
  },
  warning: {
    base: 'border-message-border-waring bg-message-bg-waring',
    iconstyle: 'text-yellow-500 ',
    icon: <WarnFill16 />,
  },
  error: {
    base: 'border-message-border-danger bg-message-bg-danger',
    iconstyle: 'text-red-500 ',
    icon: <CloseCircleFill16 />,
  },
};

export type MessageType = keyof typeof VARIANTS;

export type Truncate = 'truncate-1-lines' | 'truncate-2-lines' | 'truncate-3-lines';

const truncateMap: Record<MessageType, string> = {
  'truncate-1-lines': 'line-clamp-1',
  'truncate-2-lines': 'line-clamp-2',
  'truncate-3-lines': 'line-clamp-3',
};

export type MessageProps = HTMLAttributes<HTMLDivElement> & {
  message: React.ReactNode;
  action?: React.ReactNode;
  showIcon?: boolean;
  showClose?: boolean;
  type?: keyof typeof VARIANTS;
  duration?: number;
  variant?: keyof typeof VARIANTS | undefined;
  truncate?: Truncate;
  icon?: React.ReactNode;
  onClose?: (id: string) => void;
  animate?: boolean;
  messageManagerId?: string;
  onClickClose?: () => void;
  useVisibility?: boolean;
};

/**
 * Owner: 包尧
 *
 * Figma: https://www.figma.com/file/Do849NlMKTXCv8djOFIFWA/%E9%80%9A%E7%94%A8%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?type=design&node-id=11723-60157&mode=design
 *
 * 由用户主动操作触发的轻量级及时反馈，浮层展示，不会挤占页面空间。
 */
const Message = forwardRef<HTMLDivElement, MessageProps>(
  (
    {
      messageManagerId = uuid(),
      action,
      message,
      duration,
      onClose,
      showIcon = true,
      showClose = true,
      truncate = 'truncate-1-lines',
      icon,
      type = 'info',
      className,
      onMouseEnter,
      onMouseLeave,
      animate = false,
      onClickClose,
      useVisibility = false,
      ...rest
    },
    ref,
  ) => {
    const itemVar = type
      ? VARIANTS[type]
      : { base: 'bg-white border-grey-600', iconstyle: '', icon };
    const [isVisibleState, setIsVisible] = useState(true);
    const isVisible = useVisibility ? isVisibleState : true;

    const [isEntering, setIsEntering] = useState(true);
    const timerRef = useRef<NodeJS.Timeout | undefined>();

    const removeMessage = useCallback(() => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      if (!animate) {
        setIsVisible(false);
      } else {
        setIsEntering(false);
      }
    }, [animate]);

    const handleClickCancel = () => {
      removeMessage();
      onClickClose?.();
    };

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
        onMouseEnter?.(e);
      },
      [onMouseEnter],
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        onMouseLeave?.(e);
        if (duration && onClose) {
          clearTimeout(timerRef.current);
          timerRef.current = setTimeout(removeMessage, duration);
        }
      },
      [duration, onClose, onMouseLeave, removeMessage],
    );

    useEffect(() => {
      if (!isVisible) {
        onClose?.(messageManagerId);
      }
    }, [messageManagerId, isVisible, onClose]);

    useEffect(() => {
      if (duration && onClose) {
        timerRef.current = setTimeout(removeMessage, duration);
      }
      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      };
    }, [duration, onClose, removeMessage]);
    //fill-mode-forwards 不生效，手动加上
    // 保证动画结束的状态，避免出现闪动
    const animateStyle = useMemo(
      () =>
        animate
          ? {
              animationFillMode: 'forwards',
            }
          : {},
      [animate],
    );
    if (!isVisible) return null;

    return (
      <div
        className={cn(
          'flex flex-row items-start rounded-[4px] border border-solid px-[16px] py-[12px] leading-[22px] w-[360px] box-border backdrop-blur-[25px]',
          itemVar.base,
          className,
          // 根据状态添加渐入和渐出类
          isEntering ? 'message-enter' : 'message-exit',
        )}
        data-testid="Message-root"
        ref={ref}
        style={animateStyle}
        {...rest}
        onAnimationEnd={() => {
          // 在渐出动画结束后，从 DOM 中移除元素
          if (!isEntering) {
            setIsVisible(false);
          }
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {showIcon && itemVar.icon ? (
          <div className={cn('mr-1 inline-flex min-h-[22px] items-center', itemVar.iconstyle)}>
            {itemVar.icon}
          </div>
        ) : null}

        <div className={cn('text-body text-text-1 inline-flex w-full items-start break-words')}>
          <p className={cn('m-0', typeof message === 'string' && truncateMap[truncate])}>
            {message}
          </p>
        </div>
        {action ? <div>{action}</div> : null}
        {showClose || onClickClose ? (
          <div
            className={cn('inline-flex min-h-[22px] items-center pl-1')}
            data-testid="Message-close"
            onClick={handleClickCancel}
          >
            <CloseLine16
              className={cn('text-icon-outlined-displayed h-full cursor-pointer text-center')}
            />
          </div>
        ) : null}
      </div>
    );
  },
);

Message.displayName = 'Message';

export default Message;
