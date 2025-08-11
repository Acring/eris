import type { HTMLAttributes } from 'react';

export type AlertType = 'info' | 'warning' | 'error';

export type AlertProps = Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'content'> & {
  content: React.ReactNode;
  action?: React.ReactNode;
  showIcon?: boolean;
  showClose?: boolean;
  type?: AlertType;
  icon?: React.ReactNode;
  onClose?: (id: string) => void;
  id?: string;
  bordered?: boolean;
  className?: string;
};
