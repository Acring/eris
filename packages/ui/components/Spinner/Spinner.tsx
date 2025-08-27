'use client';
import { cva } from 'class-variance-authority';
import React from 'react';
import Lottie from 'lottie-react';
import { cn } from '../../lib/utils';
import spinnerAnimation from '../../assets/spinner.json';
import spinnerWhiteAnimation from '../../assets/spinner_white.json';
import spinnerDangerAnimation from '../../assets/spinner_danger.json';

import { useConfigProvider } from '@xsky/eris-ui/ConfigProvider';

export const SpinnerAnimationMap = {
  default: spinnerAnimation,
  white: spinnerWhiteAnimation,
  danger: spinnerDangerAnimation,
};

const SpinnerVariant = cva(
  cn('text-primary-normal [&>*:nth-child(even)]: inline-flex items-center'),
  {
    variants: {
      white: {
        true: cn('text-white'),
        false: cn('text-text-1'),
      },
      size: {
        sm: cn('text-body gap-0.5'),
        md: cn('text-body gap-1'),
        lg: cn('text-subhead gap-1'),
      },
      tipPosition: {
        top: cn('flex-col-reverse'),
        bottom: cn('flex-col'),
        left: cn('flex-row-reverse gap-2'),
        right: cn('flex-row'),
      },
    },
  },
);

const SpinnerLottieVariant = cva('', {
  variants: {
    size: {
      sm: cn('h-[16px] w-[16px]'),
      md: cn('h-[32px] w-[32px]'),
      lg: cn('h-[64px] w-[64px]'),
    },
  },
});

const SpinnerContent = React.forwardRef<HTMLDivElement, Omit<SpinnerProps, 'children'>>(
  ({ className, size = 'md', tip, tipPosition = 'bottom', color = 'default' }, ref) => {
    const customContext = useConfigProvider();
    const isWhite = color === 'white';

    const customSpinning = customContext?.spinnerIndicator?.[color]?.[size];
    // 自定义主题存在则使用自定义主题
    const content = customSpinning || (
      <Lottie
        animationData={SpinnerAnimationMap[color]}
        className={cn(SpinnerLottieVariant({ size }))}
        loop
      />
    );

    return (
      <div
        className={cn(
          SpinnerVariant({
            size,
            className,
            tipPosition,
            white: isWhite,
          }),
        )}
        data-testid="Spinner-root"
        ref={ref}
      >
        <div className="inline-flex">{content}</div>
        {tip ? <div className="after:absolute after:content-['...']">{tip}</div> : null}
      </div>
    );
  },
);

SpinnerContent.displayName = 'SpinnerContent';

interface SpinnerClassName {
  root?: string;
  body?: string;
}

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  tip?: string;
  tipPosition?: 'top' | 'bottom' | 'left' | 'right';
  children?: React.ReactNode;
  spinning?: boolean;
  color?: 'default' | 'danger' | 'white';
  classes?: SpinnerClassName;
}

/**
 * Owner: 樊梦文
 *
 * Figma: https://www.figma.com/file/Do849NlMKTXCv8djOFIFWA/%E9%80%9A%E7%94%A8%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?type=design&node-id=11723-60156&mode=design
 *
 * 用于展示加载状态
 */
const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(({ className, ...props }, ref) => {
  const spinning = props?.spinning ?? true;

  if (props.children) {
    return (
      <div className={cn('relative', props.classes?.root)}>
        <div
          className={cn(
            spinning ? 'pointer-events-none select-none opacity-50' : 'w-full h-full',
            props.classes?.body,
          )}
        >
          {props.children}
        </div>
        {spinning ? (
          <SpinnerContent
            className={cn([
              'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
              className,
            ])}
            {...props}
            ref={ref}
          />
        ) : null}
      </div>
    );
  }
  return <SpinnerContent className={className} {...props} ref={ref} />;
});

Spinner.displayName = 'Spinner';

export default Spinner;
