import type { ReactNode } from 'react';
import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

type orientationType = 'left' | 'right' | 'center';

export interface DividerProps {
  children?: ReactNode;
  dashed?: boolean;
  bold?: boolean;
  type?: 'horizontal' | 'vertical';
  orientation?: orientationType;
  orientationMargin?: number;
  className?: string;
}

const textVariants = cva(cn('z-1 relative bg-inherit px-[8px]'), {
  variants: {
    type: {
      horizontal: '',
      vertical: '',
    },
    orientation: {
      left: '',
      right: '',
      center: '',
    },
  },
});

const dividerWithChildren = cva(
  cn('flex-1 border-b-[1px] border-l-0 border-r-0 border-t-0 border-solid border-b-current'),
  {
    variants: {
      bold: {
        true: '',
        false: '',
      },
      dashed: {
        true: 'border-divider-dash border-dashed',
        false: 'border-divider-solid border-solid',
      },
    },
    compoundVariants: [
      {
        bold: true,
        className: cn('border-b-[2px]'),
      },
      {
        bold: false,
        className: cn('border-b-[1px]'),
      },
    ],
  },
);

const lineWithoutChildren = cva(cn('flex border-b-0 border-l-0 border-r-0 border-t-0'), {
  variants: {
    type: {
      horizontal: 'h-[1px] w-full',
      vertical: 'mx-[8px] h-[12px] w-[1px] align-middle',
    },
    bold: {
      true: '',
      false: '',
    },
    dashed: {
      true: 'border-divider-dash border-dashed',
      false: 'border-divider-solid border-solid',
    },
  },
  compoundVariants: [
    {
      bold: true,
      type: 'horizontal',
      className: cn('h-[2px] border-t-[2px]'),
    },
    {
      bold: false,
      type: 'horizontal',
      className: cn('h-[1px] border-t-[1px]'),
    },
    {
      bold: true,
      type: 'vertical',
      className: cn('w-[2px] border-r-[2px]'),
    },
    {
      bold: false,
      type: 'vertical',
      className: cn('w-[1px] border-r-[1px]'),
    },
  ],
});

const getMarginStyle = (orientation: orientationType, orientationMargin: number) => {
  const beforeStyle: React.CSSProperties = {};
  const afterStyle: React.CSSProperties = {};

  if (orientation === 'left') {
    beforeStyle.flexBasis = `${orientationMargin}px`;
    beforeStyle.flexGrow = 0;
  } else if (orientation === 'right') {
    afterStyle.flexBasis = `${orientationMargin}px`;
    afterStyle.flexGrow = 0;
  }

  return { beforeStyle, afterStyle };
};

/**
 * Owner: 廖玉良
 *
 * Figma: https://www.figma.com/file/Do849NlMKTXCv8djOFIFWA/%E9%80%9A%E7%94%A8%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?type=design&node-id=19199-118999&mode=design
 *
 * 分割线组件，用于分割内容。
 */
const Divider = ({
  children,
  dashed = false,
  bold = false,
  type = 'horizontal',
  orientation = 'center',
  orientationMargin = 0,
  className,
}: DividerProps) => {
  const hasText = type === 'horizontal' && Boolean(children);
  if (hasText) {
    // 需动态计算宽度，无法赋值给 before 和 after，这里使用div来代替
    const { beforeStyle, afterStyle } = getMarginStyle(orientation, orientationMargin);
    return (
      <div className={cn('relative flex items-center', 'border-b-solid border-b-0', className)}>
        <div
          className={cn('border-before', dividerWithChildren({ dashed, bold }))}
          style={beforeStyle}
        />
        <div className={cn(textVariants({ type, orientation }))}>{children}</div>
        <div
          className={cn('border-before', dividerWithChildren({ dashed, bold }))}
          style={afterStyle}
        />
      </div>
    );
  }
  return (
    <div
      className={cn(lineWithoutChildren({ type, dashed, bold }), className)}
      data-testid="Divider-root"
    />
  );
};
Divider.displayName = 'Divider';

export default Divider;
