import React from 'react';
import type { ButtonProps } from '../Button/Button';
import Button from '../Button/Button';
import { cn } from '../../lib/utils';

export interface FooterButtonGroupProps {
  className?: string;
  cancelText?: React.ReactNode;
  cancelType?: ButtonProps['type'];
  onCancel?: (event?: React.MouseEvent) => void;
  okText?: React.ReactNode;
  okType?: ButtonProps['type'];
  onOk?: (event?: React.MouseEvent) => void;
  cancelButtonProps?: ButtonProps;
  okButtonProps?: ButtonProps;
  okLoading?: boolean;
  footerContent?: React.ReactNode;
}

const FooterButtonGroup: React.FC<FooterButtonGroupProps> = ({
  className,
  cancelText,
  cancelType,
  onCancel,
  okText,
  okType,
  onOk,
  cancelButtonProps,
  okButtonProps,
  okLoading,
  footerContent,
}) => (
  <div className={cn('flex flex-row justify-end', className)}>
    {footerContent ? (
      footerContent
    ) : (
      <>
        {cancelText ? (
          <Button
            className="justify-center"
            onClick={onCancel}
            size="md"
            type={cancelType}
            {...cancelButtonProps}
          >
            {cancelText}
          </Button>
        ) : null}
        {okText ? (
          <Button
            className={cn('justify-center', 'ml-[4px]')}
            loading={okLoading}
            onClick={onOk}
            size="md"
            type={okType}
            {...okButtonProps}
          >
            {okText}
          </Button>
        ) : null}
      </>
    )}
  </div>
);

export default FooterButtonGroup;
