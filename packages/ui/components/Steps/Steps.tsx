'use client';
import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowGobackLine16,
  CloseCircleFill20,
  DoneLine20,
  InfoLine16,
  NoticeLine20,
  RightLine16,
  LeftLine20,
  RightLine20,
} from '@xsky/eris-icons';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { IconButton } from '../IconButton';
import { Tooltip } from '../Tooltip';
import CardStep from './CardStep';
import { ScrollArea } from '../ScrollArea';
import type { Direction, Mode, Step as StepType, StepsProps } from './type';

const actionIcon = {
  abnormal: <NoticeLine20 className="text-primary-normal" />,
  warning: <NoticeLine20 className="text-warning-normal" />,
  error: <CloseCircleFill20 className="text-danger-normal" />,
  done: <DoneLine20 className="text-primary-normal" />,
};

const stepIconVariants = cva(
  cn('br-100 text-body flex h-[20px] w-[20px] items-center justify-center rounded-full'),
  {
    variants: {
      process: {
        true: 'bg-primary-normal text-white',
        false: 'bg-fill-on-grey-1 text-text-2',
      },
    },
  },
);

const titleVariants = cva(cn('text-text-3 text-left font-medium'), {
  compoundVariants: [
    {
      direction: 'vertical',
      finish: true,
      className: 'cursor-pointer',
    },
  ],
  variants: {
    direction: {
      horizontal: 'text-body grow pt-[2px]',
      vertical: 'text-subhead flex items-center',
    },
    finish: {
      true: 'text-text-2',
      false: '',
    },
    process: {
      true: 'text-text-1',
      false: '',
    },
  },
});

const verticalDesVariants = cva(cn('pl-[28px] pt-[8px]'), {
  variants: {
    size: {
      default: 'pb-[24px]',
      lg: 'pb-[56px]',
    },
  },
});

const lineVariants = cva(
  cn(
    'absolute box-border w-[2px] pb-[4px] pl-[9px] pt-[28px] before:inline-block before:h-[100%] before:w-[2px] before:content-[""]',
  ),
  {
    variants: {
      isLast: {
        true: '',
        false: 'h-[100%]',
      },
      finish: {
        true: 'before:bg-primary-normal',
        false: 'before:bg-divider-solid',
      },
    },
  },
);

const containerVariants = cva(cn(''), {
  variants: {
    direction: {
      horizontal: '',
      vertical: '',
    },
    type: {
      line: '',
      card: 'shadow-elevation-1-bottom',
    },
  },
  compoundVariants: [
    {
      direction: 'horizontal',
      type: 'line',
      className: 'bg-fill-1 flex justify-center px-[16px] py-[12px] text-center',
    },
  ],
});

const bodyVariants = cva(cn('flex'), {
  variants: {
    direction: {
      horizontal: '',
      vertical: '',
    },
    type: {
      line: '',
      card: 'overflow-hidden p-[24px]',
    },
  },
  compoundVariants: [
    {
      direction: 'vertical',
      type: 'line',
      className: 'flex-col',
    },
    {
      direction: 'horizontal',
      type: 'line',
      className: 'min-w-[300px] items-start',
    },
  ],
});

/**
 * Owner: 樊梦文
 *
 * Figma: https://www.figma.com/file/Do849NlMKTXCv8djOFIFWA/%E9%80%9A%E7%94%A8%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?type=design&node-id=11723-60156&mode=design
 *
 * 步骤条组件，用于展示步骤。
 */
const Step = React.forwardRef<HTMLDivElement, StepType<Direction, Mode<Direction>>>(
  (
    {
      title,
      description,
      direction,
      current,
      step,
      content,
      mode,
      isLast,
      size,
      actionStatus,
      onStepClick,
      hideGoBack = false,
    },
    ref,
  ) => {
    const process = mode === 'display' || current === step;
    const finish = mode === 'interactive' && current > step;
    const isHorizontal = direction === 'horizontal';
    let _actionStatus: keyof typeof actionIcon | undefined;
    if (process) {
      _actionStatus = actionStatus;
    } else if (finish) {
      _actionStatus = ['warning', 'abnormal'].includes(actionStatus || '') ? actionStatus : 'done';
    }

    const onChange = (e: React.MouseEvent<HTMLDivElement>) => {
      // 纵向布局的已完成步骤可以点击返回
      !!finish && !isHorizontal && onStepClick?.(step, e);
    };

    return (
      <div
        className={
          isHorizontal ? 'flex max-w-[66%] grow step-horizontal' : 'relative step-vertical'
        }
        ref={ref}
      >
        {!isHorizontal && <div className={cn(lineVariants({ isLast, finish }))} />}
        <div className={cn('flex', { 'mx-[8px] min-w-[88px] grow': isHorizontal })}>
          <div
            className={cn('mr-[8px] mt-[2px] h-[20px]', { 'flex grow justify-end': isHorizontal })}
          >
            {_actionStatus ? (
              actionIcon[_actionStatus]
            ) : (
              <span className={cn(stepIconVariants({ process }))}>{step}</span>
            )}
          </div>
          <div className={cn(titleVariants({ direction, finish, process }))} onClick={onChange}>
            {title}
            {!hideGoBack && !isHorizontal && finish ? (
              <IconButton className="ml-[4px] align-text-bottom step-back-button">
                <ArrowGobackLine16 className="text-icon-outlined-displayed" />
              </IconButton>
            ) : null}
            {isHorizontal && description ? (
              <Tooltip title={description}>
                <InfoLine16 className="text-icon-outlined-displayed ml-[4px] inline shrink-0 pt-[1px] align-text-top" />
              </Tooltip>
            ) : null}
          </div>
        </div>
        {!isHorizontal ? (
          <div className={cn(verticalDesVariants({ size }))} data-testid="Steps-stepDescription">
            {description ? <div className="text-body text-text-3">{description}</div> : null}
            {!!process && <div className="mt-[8px]">{content}</div>}
          </div>
        ) : (
          !isLast && <RightLine16 className="inline-block h-[24px] leading-[24px]" />
        )}
      </div>
    );
  },
);

Step.displayName = 'Step';

/**
 * Steps 步骤条
 *
 * 用于复杂任务的拆解展示
 */
const Steps = React.forwardRef<HTMLDivElement, StepsProps>(
  (
    {
      items,
      className,
      innerClasses,
      direction = 'vertical',
      mode = 'interactive',
      size = 'default',
      type = 'line',
      onStepClick,
      hideGoBack = false,
      ...props
    },
    ref,
  ) => {
    const propsCurrent = (props as any).current || 1;
    const [current, setCurrent] = useState(propsCurrent);
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(false);
    const [needWidth, setNeedWidth] = useState(0);
    const scrollRef = React.useRef<HTMLDivElement>(null);
    const boxRef = React.useRef<HTMLDivElement>(null);

    const limitCurrent = useMemo(
      () => ({
        min: 1,
        max: items.length,
      }),
      [items.length],
    );

    useEffect(() => {
      const handleResize = () => {
        const scrollWidth = scrollRef?.current?.scrollWidth || 0;
        const clientWidth = scrollRef?.current?.clientWidth || 0;
        setNeedWidth(scrollWidth - clientWidth);
        if (scrollWidth > clientWidth) {
          setShowRight(true);
        } else {
          setShowRight(false);
        }
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    useEffect(() => {
      setCurrent(Math.min(Math.max(propsCurrent, limitCurrent.min), limitCurrent.max));

      // 判断是否展示左右按钮
      const scrollWidth = scrollRef?.current?.scrollWidth || 0;
      const clientWidth = scrollRef?.current?.clientWidth || 0;
      setNeedWidth(scrollWidth - clientWidth);
      if (scrollWidth > clientWidth) {
        setShowRight(true);
      }
    }, [propsCurrent, limitCurrent]);

    const renderStepsComponent: () => React.ReactNode | Iterable<React.ReactNode> = () => {
      // 默认是线条的样式
      let StepComponent = Step;
      // 卡片样式
      if (type === 'card') {
        StepComponent = CardStep;
      }

      return (
        <div className={cn(bodyVariants({ direction, type }), innerClasses)}>
          {items.map((item, index: number) => (
            <StepComponent
              key={`step-${index}`}
              {...item}
              current={current}
              direction={direction}
              hideGoBack={hideGoBack}
              isLast={items.length === index + 1}
              mode={mode}
              onStepClick={onStepClick}
              size={size}
              step={index + 1}
            />
          ))}
        </div>
      );
    };

    const scrollRight = () => {
      // 容器宽度的一半
      if (scrollRef.current && boxRef.current) {
        scrollRef.current.scrollTo({
          left: scrollRef.current.scrollLeft + boxRef.current.clientWidth / 2,
          behavior: 'smooth',
        });
      }
    };

    const scrollLeft = () => {
      if (scrollRef.current && boxRef.current) {
        scrollRef.current.scrollTo({
          left: scrollRef.current.scrollLeft - boxRef.current.clientWidth / 2,
          behavior: 'smooth',
        });
      }
    };

    const onScroll = () => {
      const scrollLeft = scrollRef?.current?.scrollLeft || 0;
      if (scrollLeft > 0 && !showLeft) {
        setShowLeft(true);
        return;
      }
      // 最左
      if (scrollLeft === 0) {
        setShowLeft(false);
        setShowRight(true);
        return;
      }
      // 最右
      if (scrollLeft >= needWidth) {
        setShowRight(false);
      } else {
        setShowRight(true);
      }
    };

    return (
      <div
        className={cn(containerVariants({ direction, type }), 'steps-container', className)}
        ref={ref}
        {...props}
      >
        <div className="relative steps-box" ref={boxRef}>
          {type === 'card' ? (
            <ScrollArea
              forceMountHorizontal={false}
              onScroll={onScroll}
              ref={scrollRef}
              width="100%"
            >
              {renderStepsComponent()}
            </ScrollArea>
          ) : (
            renderStepsComponent()
          )}
          {type === 'card' && (
            <>
              {showLeft ? (
                <div
                  className="bg-white cursor-pointer absolute top-[50%] translate-y-[-50%] left-[24px] shadow-elevation-1-bottom rounded-full w-[28px] h-[28px] flex items-center justify-center"
                  onClick={scrollLeft}
                >
                  <LeftLine20 className="text-icon-outlined-displayed" />
                </div>
              ) : null}
              {showRight ? (
                <div
                  className="bg-white cursor-pointer absolute top-[50%] translate-y-[-50%] right-[24px] shadow-elevation-1-bottom rounded-full w-[28px] h-[28px] flex items-center justify-center"
                  onClick={scrollRight}
                >
                  <RightLine20 className="text-icon-outlined-displayed" />
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
    );
  },
);

Steps.displayName = 'Steps';

export default Steps;
