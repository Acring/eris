'use client';
import React, { forwardRef, useState, useCallback } from 'react';
import { useTransition, animated } from 'react-spring';
import type { DraggableEvent, DraggableData } from 'react-draggable';
import Draggable from 'react-draggable';
import lodash from 'lodash';

import t from '../../i18n';
import { cn } from '../../lib/utils';
import useDrag from './useDrag';
import FooterButtonGroup from './FooterButtonGroup';
import { useModal } from './useModal';
import type { ModalProps, MousePosition } from './type';
import { Dialog, DialogContent, DialogTitle } from '../Dialog';
import type { DialogSizeType } from '../Dialog/type';

const modalPaddingX = 'px-[32px]';
const modalPaddingY = 'py-[24px]';

let mousePosition: MousePosition;

const getDefaultPosition = () => {
  // 浏览器环境下默认使用视窗中间
  if (typeof window !== 'undefined') {
    const width = window.innerWidth;
    const height = window.innerHeight;
    return `x: ${width / 2}px y: ${height / 2}px`;
  }
  return 'x: 0px y: 0px';
};
// ref: https://github.com/ant-design/ant-design/blob/master/components/modal/Modal.tsx
const getClickPosition = (e: MouseEvent) => {
  mousePosition = {
    x: e.pageX,
    y: e.pageY,
  };
  // 100ms 内发生过点击事件，则从点击位置动画展示
  // 否则直接 zoom 展示
  // 这样可以兼容非点击方式展开
  setTimeout(() => {
    mousePosition = null;
  }, 100);
};

// 只有点击事件支持从鼠标位置动画展开
// hooks中也需支持，这里参考 antd，在组件生命周期之外监听
if (typeof document !== 'undefined') {
  document.documentElement.addEventListener('click', getClickPosition, true);
}

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)} {...props} />
);
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-row justify-end', className)} {...props} />
);
DialogFooter.displayName = 'DialogFooter';

/**
 * Owner: 包尧
 *
 * Figma: https://www.figma.com/file/Do849NlMKTXCv8djOFIFWA/%E9%80%9A%E7%94%A8%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?type=design&node-id=14650-60176&mode=design
 *
 * 模态对话框组件
 */
const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      title,
      open: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      onCancel,
      onOk,
      mask = true,
      maskClosable = false,
      maskClassName,
      closeIcon,
      showCloseIcon = true,
      bodyClassName,
      modalContainerClassName,
      modalContainerStyle,
      okText = t(' 确定 '),
      okType = 'primary',
      okLoading,
      okButtonProps,
      cancelText = t(' 取消 '),
      cancelType = 'text',
      cancelButtonProps,
      children,
      size = 'md' as DialogSizeType,
      centered = true,
      footer,
      footerContent,
      draggable = false,
      cancelOnEscapeKeyDown = true,
      __inContext = false,
      modalManagerid = '',
      // 动画默认
      motion: motionProps = true,
      // 去掉 content 包裹的 dom
      dropContentContainer,
      // 默认为 false，设置为 false 时才可以跟 Modal 之外的 dom 正常交互，如 select 的悬浮层在 body 下
      // modal 为 false 时， DialogOverlay 的 children 不展示，需改为手动控制 mask 显示
      // radix-ui 中默认值是 true
      modal = false,
      // radix-ui dialog 会自动聚焦
      // 聚焦逻辑见: https://github.com/radix-ui/primitives/blob/main/packages/react/focus-scope/src/FocusScope.tsx
      onOpenAutoFocus = (event: Event) => {
        event.preventDefault();
      },
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(defaultOpen || false);
    const isUnControlledOpen = controlledOpen === undefined;
    const open = isUnControlledOpen ? isOpen : controlledOpen;
    const { onStart, bounds, draggleRef } = useDrag();
    const handleOpenChange = (newOpen: boolean) => {
      setIsOpen(newOpen);
      onOpenChange?.(newOpen);
    };

    const handleSetIsOpen = (open: boolean) => {
      if (isUnControlledOpen) {
        setIsOpen(open);
      }
    };

    const { close } = useModal();

    const handleCancel = (event?: React.MouseEvent | KeyboardEvent) => {
      handleSetIsOpen(false);
      onCancel?.(event);
      __inContext && close?.(modalManagerid);
    };

    const handleOk = (event?: React.MouseEvent) => {
      handleSetIsOpen(false);
      onOk?.(event);
    };

    const handleClickCancelButton = (event?: React.MouseEvent) => {
      handleCancel(event);
    };

    const handleCloseIconClick = (event?: React.MouseEvent) => {
      handleCancel(event);
    };

    const handleOverlayClick = (event: React.MouseEvent) => {
      if (maskClosable) {
        handleCancel(event);
      }
    };

    const handleEscapeKeyDown = (event: KeyboardEvent) => {
      cancelOnEscapeKeyDown && handleCancel(event);
    };

    const motion = Boolean(motionProps);
    const transformOrigin = mousePosition
      ? `${mousePosition?.x}px ${mousePosition?.y}px`
      : getDefaultPosition();

    // 蒙层动画
    const maskTransitions = useTransition(open, {
      from: { opacity: 0 },
      enter: { opacity: 1 },
      config: {
        duration: 200,
        ease: 'cubic-bezier(0.25, 0.60, 0.35, 1)',
      },
    });
    const DialogOverlayContent = (
      <div
        className={cn('fixed inset-0 bg-black opacity-30 z-modal', maskClassName)}
        onClick={handleOverlayClick}
      />
    );

    const [modalContentScrollAtTop, setModalContentScrollAtTop] = useState<boolean | null>(null);
    const [modalContentScrollAtBottom, setModalContentScrollAtBottom] = useState<boolean | null>(
      null,
    );
    const modalContentScrollAtMiddle =
      modalContentScrollAtTop === false && modalContentScrollAtBottom === false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleModalContentScroll = useCallback(
      lodash.debounce(function (target: HTMLElement) {
        const atTop = target.scrollTop === 0;
        const atBottom = target.scrollTop + target.offsetHeight >= target.scrollHeight;
        setModalContentScrollAtTop(atTop);
        setModalContentScrollAtBottom(atBottom);
      }, 50),
      [],
    );

    const dialogOverlayContent =
      mask && open
        ? motion
          ? maskTransitions((styles, item) => {
              return item ? (
                <animated.div className="fixed z-modal" style={styles}>
                  {DialogOverlayContent}
                </animated.div>
              ) : null;
            })
          : DialogOverlayContent
        : null;

    return (
      <Dialog defaultOpen={defaultOpen} modal={modal} onOpenChange={handleOpenChange} open={open}>
        <Draggable
          bounds={bounds}
          disabled={!draggable}
          handle=".drag-handle"
          onStart={(event: DraggableEvent, uiData: DraggableData) => {
            onStart(event, uiData);
          }}
          positionOffset={{
            x: '-50%',
            y: centered ? '-50%' : 0,
          }}
        >
          <DialogContent
            centered={centered}
            className={cn({
              'min-h-0': title === null || footer === null,
            })}
            dialogOverlayContent={dialogOverlayContent}
            modalContainerClassName={modalContainerClassName}
            modalContainerStyle={modalContainerStyle}
            motion={motion}
            onEscapeKeyDown={handleEscapeKeyDown}
            onOpenAutoFocus={onOpenAutoFocus}
            open={open || defaultOpen}
            ref={(e: HTMLDivElement | null) => {
              if (typeof ref === 'function') {
                ref(e);
              } else if (ref) {
                ref.current = e;
              }
              (draggleRef as React.MutableRefObject<HTMLDivElement | null>).current = e;
            }}
            size={size}
            transformOrigin={transformOrigin}
          >
            {title === null ? null : (
              <DialogTitle
                className={cn({
                  'shadow-elevation-1-bottom':
                    modalContentScrollAtTop || modalContentScrollAtMiddle,
                })}
                closeIcon={closeIcon}
                draggable={draggable}
                handleCloseIconClick={handleCloseIconClick}
                showCloseIcon={showCloseIcon}
              >
                {title}
              </DialogTitle>
            )}
            {dropContentContainer ? (
              children
            ) : (
              <div
                className={cn('modal-content flex-1 overflow-y-auto', modalPaddingX, bodyClassName)}
                onScroll={function (event) {
                  const target = event.target as HTMLElement;
                  handleModalContentScroll(target);
                }}
              >
                {children}
              </div>
            )}
            {footer === undefined ? (
              <FooterButtonGroup
                cancelButtonProps={cancelButtonProps}
                cancelText={cancelText}
                cancelType={cancelType}
                className={cn(modalPaddingY, modalPaddingX, {
                  'shadow-elevation-1-top':
                    modalContentScrollAtBottom || modalContentScrollAtMiddle,
                })}
                footerContent={footerContent}
                okButtonProps={okButtonProps}
                okLoading={okLoading}
                okText={okText}
                okType={okType}
                onCancel={handleClickCancelButton}
                onOk={handleOk}
              />
            ) : (
              footer
            )}
          </DialogContent>
        </Draggable>
      </Dialog>
    );
  },
);

Modal.displayName = 'Modal';

export default Modal;
