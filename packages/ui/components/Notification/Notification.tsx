'use client';
import type { HTMLAttributes, ReactNode } from 'react';
import React, { forwardRef } from 'react';
import {
  NoticeFill16,
  DoneFill16,
  WarnFill16,
  CloseCircleFill16,
  AlarmFill16,
  CloseLine16,
} from '@xsky/eris-icons';

import { IconButton } from '../IconButton';
import { cn } from '../../lib/utils';

const VARIANTS: Record<
  'info' | 'success' | 'warning' | 'error' | 'critical',
  {
    base: string;
    iconstyle: string;
    icon: ReactNode;
  }
> = {
  info: {
    base: 'border-notification-border-info bg-notification-bg-info',
    iconstyle: 'text-blue-500 ',
    icon: <NoticeFill16 />,
  },
  success: {
    base: 'border-notification-border-success bg-notification-bg-success',
    iconstyle: 'text-green-500 ',
    icon: <DoneFill16 />,
  },
  warning: {
    base: 'border-notification-border-warning bg-notification-bg-warning',
    iconstyle: 'text-yellow-500 ',
    icon: <WarnFill16 />,
  },
  error: {
    base: 'border-notification-border-danger bg-notification-bg-danger',
    iconstyle: 'text-red-500 ',
    icon: <CloseCircleFill16 />,
  },
  critical: {
    base: 'border-notification-border-critical bg-notification-bg-critical',
    iconstyle: 'text-deep-red-500 ',
    icon: <AlarmFill16 />,
  },
};

export type NotificationProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
  title: ReactNode;
  description?: ReactNode; // default: undefined
  truncateDescription?: boolean; // default: true
  type?: keyof typeof VARIANTS; // default: 'info'
  onClose?: () => void; // default: function () {}
};

/**
 * Owner: 包尧
 *
 * Figma: https://www.figma.com/file/Do849NlMKTXCv8djOFIFWA/%E9%80%9A%E7%94%A8%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?type=design&node-id=11723-60154&mode=design
 *
 * 用于主动向用户发出系统通知消息
 */
const Notification = forwardRef<HTMLDivElement, NotificationProps>(
  (
    {
      title,
      description = undefined,
      truncateDescription = true,
      type = 'info',
      onClose = function () {},
      ...rest
    },
    ref,
  ) => {
    const itemVar = VARIANTS[type];
    return (
      <div
        className={cn(
          'w-[360px] box-border flex flex-col py-[12px] px-2 border border-solid rounded-md backdrop-blur-[25px]',
          itemVar.base,
        )}
        data-testid="Notification-root"
        ref={ref}
        {...rest}
      >
        <div className="flex gap-1">
          <div className={cn('h-[22px] pt-[3px] box-border', itemVar.iconstyle)}>
            {itemVar.icon}
          </div>
          <div className="flex-1 break-words overflow-hidden text-text-1 text-body font-medium">
            {title}
          </div>
          <div className="h-[22px] pt-[3px] box-border">
            <IconButton data-testid="Notification-close" onClick={onClose}>
              <CloseLine16 />
            </IconButton>
          </div>
        </div>
        {description !== undefined && (
          <div
            className={cn('mt-[4px] pl-[24px] break-words text-text-2 text-body font-normal', {
              'line-clamp-3': truncateDescription,
            })}
            title={typeof description === 'string' ? description : undefined}
          >
            {description}
          </div>
        )}
      </div>
    );
  },
);

Notification.displayName = 'Notification';

export default Notification;
