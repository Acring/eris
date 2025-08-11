import type { HTMLAttributes } from 'react';
import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

export interface CardProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'type' | 'children' | 'title'> {
  className?: string;
  title?: React.ReactNode;
  children?: React.ReactNode;
  type?: 'inner';
  size?: 'default' | 'small';
  extra?: React.ReactNode;
}

const cardVariants = cva('rounded bg-white px-[16px] pb-[24px] pt-[16px]', {
  variants: {
    type: {
      inner: 'border-stroke-border-2 border border-solid shadow-none ',
      undefined: 'shadow-elevation-1-bottom',
    },
    size: {
      default: 'px-[24px] pb-[24px] pt-[16px]',
      small: 'px-[16px] pb-[16px] pt-[8px]',
    },
  },
});

const cardTitleVariants = cva('flex w-full justify-between items-center', {
  variants: {
    size: {
      default: 'pb-[16px]',
      small: 'pb-[8px]',
    },
  },
});

/**
 * Owner: 樊梦文
 *
 * Figma: https://www.figma.com/file/Do849NlMKTXCv8djOFIFWA/%E9%80%9A%E7%94%A8%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?type=design&node-id=14650-60171&mode=design
 *
 * 卡片组件，用于展示内容。
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ title, children, type, size = 'default', className, extra, ...rest }, ref) => {
    return (
      <div
        className={cn(cardVariants({ type, size }), className)}
        data-testid="Card-root"
        ref={ref}
        {...rest}
      >
        {title || extra ? (
          <div className={cardTitleVariants({ size })} data-testid="Card-title">
            <div className="flex-1 min-w-0 mr-3">{title}</div>
            <div>{extra}</div>
          </div>
        ) : null}
        {children}
      </div>
    );
  },
);

Card.displayName = 'Card';

export default Card;
