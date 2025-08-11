'use client';
import React, { useMemo, useState } from 'react';
import type { PopoverProps } from '../Popover/Popover';
import Popover from '../Popover/Popover';
import FooterButtonGroup from '../Modal/FooterButtonGroup';
import type { FooterButtonGroupProps } from '../Modal/FooterButtonGroup';
import type { ButtonProps } from '../Button/Button';
import t from '../../i18n';

const PopoverWithFooter: React.FC<PopoverProps & FooterButtonGroupProps> = ({
  open: controlledOpen,
  okText = t(' 确定 '),
  okType = 'primary',
  okLoading,
  okButtonProps,
  cancelText = t(' 取消 '),
  cancelType = 'text',
  trigger = ['click'],
  cancelButtonProps,
  footerContent,
  onOk,
  onCancel,
  onOpenChange: onOpenChangeProps,
  ...props
}) => {
  const [internalOpen, setInternalOpen] = useState<boolean>();
  const finalOpen = controlledOpen === undefined ? internalOpen : controlledOpen;
  const okButtonParams = useMemo<ButtonProps>(
    () => ({
      size: 'sm' as ButtonProps['size'],
      ...okButtonProps,
    }),
    [okButtonProps],
  );

  const cancelButtonParams = useMemo<ButtonProps>(
    () => ({
      size: 'sm' as ButtonProps['size'],
      ...cancelButtonProps,
    }),
    [cancelButtonProps],
  );

  const handleClickCancelButton = () => {
    setInternalOpen(false);
    onCancel?.();
  };

  const handleOk = () => {
    setInternalOpen(false);
    onOk?.();
  };

  const handleOpenChange = (open: boolean) => {
    onOpenChangeProps?.(open);
    setInternalOpen(open);
  };

  return (
    <Popover
      open={finalOpen}
      trigger={trigger}
      {...props}
      extra={
        <FooterButtonGroup
          cancelButtonProps={cancelButtonParams}
          cancelText={cancelText}
          cancelType={cancelType}
          className="mt-[16px]"
          footerContent={footerContent}
          okButtonProps={okButtonParams}
          okLoading={okLoading}
          okText={okText}
          okType={okType}
          onCancel={handleClickCancelButton}
          onOk={handleOk}
        />
      }
      onOpenChange={handleOpenChange}
    />
  );
};

export default PopoverWithFooter;
