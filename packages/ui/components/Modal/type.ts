import type { ReactNode } from 'react';
import type React from 'react';
import type { ButtonProps } from '../Button/Button';
import type { DialogSizeType } from '../Dialog/type';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import type { FocusScopeProps } from '@radix-ui/react-dialog';

export interface ModalProps {
  title?: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onCancel?: (event?: React.MouseEvent | KeyboardEvent) => void;
  onOk?: (event?: React.MouseEvent) => void;
  mask?: boolean;
  maskClosable?: boolean;
  maskClassName?: string;
  closeIcon?: ReactNode;
  showCloseIcon?: boolean;
  bodyClassName?: string;
  modalContainerClassName?: string;
  modalContainerStyle?: React.CSSProperties;
  okText?: ReactNode;
  okType?: ButtonProps['type'];
  okLoading?: boolean;
  okButtonProps?: ButtonProps;
  cancelText?: ReactNode;
  cancelType?: ButtonProps['type'];
  cancelButtonProps?: ButtonProps;
  children?: ReactNode;
  size?: DialogSizeType;
  centered?: boolean;
  footer?: ReactNode;
  footerContent?: ReactNode;
  draggable?: boolean;
  cancelOnEscapeKeyDown?: boolean;
  // useModal 中使用
  __inContext?: boolean;
  modalManagerid?: string;
  motion?: boolean;
  dropContentContainer?: boolean;
  modal?: boolean;
  onOpenAutoFocus?: FocusScopeProps['onMountAutoFocus'];
}

export type MousePosition = { x: number; y: number } | null;
