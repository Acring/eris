'use client';
import type { ReactNode } from 'react';
import React, { forwardRef, useRef, useCallback, useState } from 'react';
import { NoticeFill16, WarnFill16, CloseCircleFill16, CloseLine16 } from '@xsky/eris-icons';
import { cn, uuid } from '@/lib/utils';
import type { AlertProps, AlertType } from './type';

const VARIANTS: Record<
  AlertType,
  {
    base: string;
    iconstyle: string;
    icon: ReactNode;
    title: string;
  }
> = {
  info: {
    base: 'border-alert-border-info bg-alert-bg-info',
    iconstyle: 'text-text-link-updating-normal',
    icon: <NoticeFill16 />,
    title: 'text-text-link-updating-normal',
  },
  warning: {
    base: 'border-alert-border-warning bg-alert-bg-warning',
    iconstyle: 'text-text-link-warning-normal',
    icon: <WarnFill16 />,
    title: 'text-text-link-warning-normal',
  },
  error: {
    base: 'border-alert-border-danger bg-alert-bg-danger',
    iconstyle: 'text-text-link-danger-normal ',
    icon: <CloseCircleFill16 />,
    title: 'text-text-link-danger-normal',
  },
};

/**
 * Owner: 包尧
 *
 * Figma: https://www.figma.com/file/Do849NlMKTXCv8djOFIFWA/%E9%80%9A%E7%94%A8%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?type=design&node-id=11723-60154&mode=design
 *
 * 用于页面中展示重要的警告信息，非浮层展示，会挤占页面空间。
 */
const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      id = uuid(),
      action,
      content,
      onClose,
      showIcon = true,
      showClose = false,
      icon,
      type = 'info',
      className,
      ...rest
    },
    ref,
  ) => {
    const itemVar = type
      ? VARIANTS[type]
      : { base: 'bg-white border-grey-600', iconstyle: '', icon, title: 'text-text-1' };

    const [isVisible, setIsVisible] = useState(true);

    const timerRef = useRef<NodeJS.Timeout | undefined>();

    const removeAlert = useCallback(() => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      setIsVisible(false);
      onClose?.(id);
    }, [id, onClose]);

    if (!isVisible) return null;

    return (
      <div
        className={cn(
          'flex rounded-[4px] border border-solid px-[16px] py-[8px] leading-[22px] backdrop-blur-[25px]',
          itemVar.base,
          className,
        )}
        data-testid="Alert-root"
        ref={ref}
        {...rest}
      >
        <div className={cn('alert-content-wrapper flex flex-1')}>
          {showIcon && itemVar.icon ? (
            <div className={cn('mr-1 inline-flex min-h-[22px] items-center', itemVar.iconstyle)}>
              {itemVar.icon}
            </div>
          ) : null}

          <div className={cn('text-text-1 inline-flex items-start break-words', itemVar.title)}>
            {content}
          </div>
        </div>
        {action ? <div className="action-wrapper">{action}</div> : null}
        {showClose ? (
          <div
            className={cn('inline-flex min-h-[22px] items-center pl-1')}
            data-testid="Alert-close"
            onClick={removeAlert}
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

Alert.displayName = 'Alert';

export default Alert;
