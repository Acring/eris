'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { useTransition, animated } from 'react-spring';

import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import type { DialogSizeType } from './type';
import type { ReactNode } from 'react';
import { IconButton } from '../IconButton';
import { CloseLine16 } from '@xsky/eris-icons';

const modalPaddingX = 'px-[32px]';
const modalPaddingY = 'py-[24px]';

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogClose = DialogPrimitive.Close;

const DialogPortal = ({ ...props }: DialogPrimitive.DialogPortalProps) => (
  <DialogPrimitive.Portal {...props} />
);
DialogPortal.displayName = DialogPrimitive.Portal.displayName;

const modalContentVariants = cva(
  cn(
    'text-text-1 shadow-elevation-2-bottom fixed left-[50%] z-modal w-full max-w-[800px] translate-x-[-50%]  rounded-[4px] border-none bg-white',
    'dialog-content-container',
    'min-h-[176px] max-h-[calc(100%-80px)] flex flex-col',
  ),
  {
    variants: {
      size: {
        sm: 'max-w-[360px]',
        md: 'max-w-[500px]',
        lg: 'max-w-[800px]',
      },
      centered: {
        true: 'top-[50%] translate-y-[-50%]',
        false: 'top-[30px]',
      },
    },
  },
);

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    className={cn(
      'bg-background/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-modal backdrop-blur-sm',
      className,
    )}
    ref={ref}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    size?: DialogSizeType;
    centered?: boolean;
    open?: boolean;
    motion?: boolean;
    transformOrigin?: string;
    dialogOverlayContent?: React.ReactNode;
    modalContainerClassName?: string;
    modalContainerStyle?: React.CSSProperties;
  }
>(
  (
    {
      className,
      modalContainerClassName,
      modalContainerStyle,
      children,
      size,
      centered,
      open,
      transformOrigin,
      dialogOverlayContent,
      motion,
      ...props
    },
    ref,
  ) => {
    const disabledAnimated = !motion;
    const transitions = useTransition(open, {
      from: { opacity: 0, transform: 'scale(0)', transformOrigin },
      enter: { opacity: 1, transform: 'scale(1)', transformOrigin },
      config: {
        duration: 200,
        ease: 'cubic-bezier(0.25, 0.60, 0.35, 1)',
      },
    });
    // 添加 scale 是为了和有动画时的属性保持一致，scale 的 transform 属性会影响是否生成层叠上下文
    const content = (
      <>
        {dialogOverlayContent}
        <div
          className={cn(
            'fixed left-0 top-0 z-modal h-full w-full scale-100',
            modalContainerClassName,
          )}
          style={modalContainerStyle}
        >
          <DialogPrimitive.Content
            className={cn(modalContentVariants({ size, centered }), className)}
            ref={(e: HTMLDivElement | null) => {
              if (typeof ref === 'function') {
                ref(e);
              } else if (ref) {
                ref.current = e;
              }
            }}
            {...props}
          >
            {children}
          </DialogPrimitive.Content>
        </div>
      </>
    );

    return (
      <DialogPortal>
        {disabledAnimated
          ? content
          : transitions((styles, item) =>
              item ? (
                <>
                  {dialogOverlayContent}
                  <animated.div
                    className={cn(
                      'fixed left-0 top-0 z-modal h-full w-full',
                      modalContainerClassName,
                    )}
                    style={{ ...styles, ...modalContainerStyle }}
                  >
                    <DialogPrimitive.Content
                      className={cn(modalContentVariants({ size, centered }), className)}
                      ref={(e: HTMLDivElement | null) => {
                        if (typeof ref === 'function') {
                          ref(e);
                        } else if (ref) {
                          ref.current = e;
                        }
                      }}
                      {...props}
                    >
                      {children}
                    </DialogPrimitive.Content>
                  </animated.div>
                </>
              ) : null,
            )}
      </DialogPortal>
    );
  },
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

interface DialogTitleProps {
  className?: string;
  children?: ReactNode;
  showCloseIcon?: boolean;
  closeIcon?: ReactNode;
  draggable?: boolean;
  handleCloseIconClick?: (event?: React.MouseEvent) => void;
}

const DialogDragElement = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('drag-handle absolute w-full cursor-move top-0 left-0 bottom-0', className)}
    {...props}
  />
);
DialogDragElement.displayName = 'DialogDragElement';

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> & DialogTitleProps
>(
  (
    { className, showCloseIcon, handleCloseIconClick, closeIcon, draggable, children, ...props },
    ref,
  ) => (
    <DialogPrimitive.Title
      className={cn('modal-title text-[16px] leading-[24px] relative', className)}
      ref={ref}
      {...props}
      asChild
    >
      <div className={cn('flex items-center', modalPaddingX, modalPaddingY)}>
        {draggable ? <DialogDragElement /> : null}
        <div className="m-0 w-full flex-1">
          <span className="font-medium relative z-10 p-[8px] ml-[-8px]">{children}</span>
        </div>
        {showCloseIcon ? (
          <DialogPrimitive.Close
            asChild
            className="ml-[16px] cursor-pointer"
            onClick={handleCloseIconClick}
          >
            <IconButton className="h-[20px] items-center p-[2px]">
              {closeIcon || <CloseLine16 />}
            </IconButton>
          </DialogPrimitive.Close>
        ) : null}
      </div>
    </DialogPrimitive.Title>
  ),
);
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    className={cn('text-muted-foreground text-body', className)}
    ref={ref}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)} {...props} />
);
DialogHeader.displayName = 'DialogHeader';

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogDragElement,
};
