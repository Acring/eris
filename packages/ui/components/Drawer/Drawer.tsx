'use client';

import type { HTMLAttributes } from 'react';
import React, { useEffect, useRef } from 'react';
import * as DrawerPrimitive from '@radix-ui/react-dialog';
import { CloseLine16 } from '@xsky/eris-icons';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import t from '../../i18n';
import type { ButtonProps } from '../Button/Button';
import IconButton from '../IconButton/IconButton';
import type { ScrollAreaProps } from '../ScrollArea/ScrollArea';
import ScrollArea from '../ScrollArea/ScrollArea';
import FooterButtonGroup from '../Modal/FooterButtonGroup';
import useClickOutside from './useClickOutside';
import lodash from 'lodash';

const DrawerZIndex = 'z-[109]';

const DrawerRoot = DrawerPrimitive.Root;
const DrawerClose = DrawerPrimitive.Close;
const DrawerPortal = DrawerPrimitive.Portal;

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    className={cn(
      `z-drawer data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed`,
      className,
    )}
    ref={ref}
    {...props}
  />
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const drawerVariants = cva(
  'shadow-elevation-2-bottom z-drawer data-[state=open]:animate-in data-[state=closed]:animate-out bg-white transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
  {
    variants: {
      side: {
        top: 'data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 border-b',
        bottom:
          'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 border-t',
        left: 'data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
        right:
          'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
      },
    },
    defaultVariants: {
      side: 'right',
    },
  },
);

interface DrawerContentProps
  extends React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>,
    VariantProps<typeof drawerVariants> {}

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  DrawerContentProps
>(({ side, className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerPrimitive.Content
      className={cn(
        `${DrawerZIndex} fixed flex flex-col bg-white`,
        drawerVariants({ side }),
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
));
DrawerContent.displayName = DrawerPrimitive.Content.displayName;

const DrawerHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex items-center justify-between px-[24px] py-[16px] text-left', className)}
    {...props}
  />
);
DrawerHeader.displayName = 'DrawerHeader';

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    className={cn('text-subhead text-text-1 m-0 flex-1 font-medium', className)}
    ref={ref}
    {...props}
  />
));
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    className={cn('text-muted-foreground text-body', className)}
    ref={ref}
    {...props}
  />
));
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

export interface DrawerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onCancel?: () => void;
  onOk?: () => void;
  mask?: boolean;
  maskClosable?: boolean;
  onClickOutSide?: (event: MouseEvent) => void;
  classes?: {
    maskClassName?: string;
    bodyClassName?: string;
    containerClassName?: string;
  };
  closeIcon?: React.ReactNode;
  showCloseIcon?: boolean;
  okText?: React.ReactNode;
  okType?: ButtonProps['type'];
  okButtonProps?: ButtonProps;
  cancelText?: React.ReactNode;
  cancelType?: ButtonProps['type'];
  cancelButtonProps?: ButtonProps;
  footer?: React.ReactNode;
  footerContent?: React.ReactNode;
  cancelOnEscapeKeyDown?: boolean;
  side?: 'left' | 'right';
  children?: React.ReactNode;
  extraOperation?: React.ReactNode;
  scrollAreaProps?: ScrollAreaProps;
  modal?: boolean;
  lockScroll?: boolean; // 打开drawer时，是否自动添加overflow
}

/**
 * Owner: 廖玉良
 *
 * Figma: https://www.figma.com/file/Do849NlMKTXCv8djOFIFWA/%E9%80%9A%E7%94%A8%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?type=design&node-id=11723-60161&mode=design
 */
const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>((props, ref) => {
  const {
    title,
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange,
    onCancel,
    onOk,
    mask = true,
    modal = false,
    maskClosable = false,
    closeIcon,
    showCloseIcon = true,
    classes: { containerClassName, maskClassName, bodyClassName } = {
      containerClassName: '',
      maskClassName: '',
      bodyClassName: '',
    },
    okText = t('确定'),
    okType = 'primary',
    okButtonProps,
    cancelText = t('取消'),
    cancelType = 'text',
    cancelButtonProps,
    footer,
    footerContent,
    children,
    cancelOnEscapeKeyDown = true,
    side = 'right',
    extraOperation,
    scrollAreaProps,
    onClickOutSide,
    lockScroll = true,
  } = props;
  const [isOpen, setIsOpen] = React.useState(defaultOpen || false);
  // 初始状态为 null，空字符串视为赋过值
  const originalOverflow = useRef<string | null>(null); // 保存原有的 overflow 属性
  const isUnControlledOpen = controlledOpen === undefined;
  const open = isUnControlledOpen ? isOpen : controlledOpen;
  const drawerRef = React.useRef<HTMLDivElement | null>(null);
  const handleOpenChange = (newOpen: boolean) => {
    setIsOpen(newOpen);
    onOpenChange?.(newOpen);
  };

  const handleSetIsOpen = (open: boolean) => {
    if (isUnControlledOpen) {
      setIsOpen(open);
    }
  };

  const handleCancel = () => {
    handleSetIsOpen(false);
    onCancel?.();
  };

  const handleOk = () => {
    handleSetIsOpen(false);
    onOk?.();
  };

  const handleClickCancelButton = () => {
    handleCancel();
  };

  const handleCloseIconClick = () => {
    handleCancel();
  };

  const handleOverlayClick = () => {
    if (maskClosable) {
      handleCancel();
    }
  };

  const handleEscapeKeyDown = () => {
    cancelOnEscapeKeyDown && handleCancel();
  };

  const handleClickOutside = (event: MouseEvent) => {
    onClickOutSide?.(event);
  };

  useClickOutside(drawerRef, handleClickOutside);

  useEffect(() => {
    if (open && lockScroll) {
      if (originalOverflow.current === null) {
        // 记录原始 overflow 值
        originalOverflow.current = document.body.style.overflow;
      }
      document.body.style.overflow = 'hidden';
    } else if (originalOverflow.current !== null) {
      // 关闭 Drawer 时恢复原始 overflow 值
      document.body.style.overflow = originalOverflow.current;
    }

    return () => {
      // 清理函数：在组件卸载时恢复原始 overflow 值
      if (originalOverflow.current !== null) {
        document.body.style.overflow = originalOverflow.current;
      }
    };
  }, [open, lockScroll]);

  // 设置 modal 为 false 才可以让抽屉打开时，页面中Drawer之外的其他元素可交互
  // https://github.com/shadcn-ui/ui/issues/1912
  return (
    <DrawerRoot defaultOpen={defaultOpen} modal={modal} onOpenChange={handleOpenChange} open={open}>
      <DrawerContent
        className={containerClassName}
        data-testid="Drawer-content"
        onEscapeKeyDown={handleEscapeKeyDown}
        ref={(e: HTMLInputElement | null) => {
          if (typeof ref === 'function') {
            ref(e);
          } else if (ref) {
            ref.current = e;
          }
          drawerRef.current = e;
        }}
        side={side}
      >
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          {showCloseIcon ? (
            <DrawerClose
              asChild
              className="ml-[8px] cursor-pointer"
              data-testid="Drawer-close"
              onClick={handleCloseIconClick}
            >
              <IconButton className="h-[20px] items-center p-[2px]">
                {closeIcon || <CloseLine16 />}
              </IconButton>
            </DrawerClose>
          ) : null}
        </DrawerHeader>
        <ScrollArea
          className={cn(
            'flex-grow px-[24px]',
            footer === null ? 'pb-[16px]' : '',
            scrollAreaProps?.className || bodyClassName,
          )}
          showEdgeShadow
          thumbSize="thin"
          {...lodash.omit(scrollAreaProps, ['className'])}
        >
          {children}
        </ScrollArea>
        {footer === undefined ? (
          <FooterButtonGroup
            cancelButtonProps={cancelButtonProps}
            cancelText={cancelText}
            cancelType={cancelType}
            className="px-[24px] py-[16px]"
            footerContent={footerContent}
            okButtonProps={okButtonProps}
            okText={okText}
            okType={okType}
            onCancel={handleClickCancelButton}
            onOk={handleOk}
          />
        ) : (
          footer
        )}
        {extraOperation ? (
          <div
            className={cn('absolute', {
              'drawer-extra-operation-right top-[16px]': side === 'right',
              'drawer-extra-operation-left top-[16px]': side === 'left',
            })}
          >
            {extraOperation}
          </div>
        ) : null}
      </DrawerContent>
      {mask && open ? (
        <div
          className={cn(
            `z-drawer data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 bg-black opacity-40`,
            maskClassName,
          )}
          onClick={handleOverlayClick}
        />
      ) : null}
    </DrawerRoot>
  );
});

Drawer.displayName = 'Drawer';

export default Drawer;
