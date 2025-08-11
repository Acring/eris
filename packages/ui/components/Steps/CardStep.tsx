'use client';
import React from 'react';
import { cva } from 'class-variance-authority';
import type { ButtonProps } from '../Button';
import { Button } from '../Button';
import { TextLink } from '../TextLink';
import { cn } from '@/lib/utils';
import { RightLine16 } from '@xsky/eris-icons';
import { type Step, type Direction, type Mode, HandlerElementType } from './type';

const stepIconVariants = cva(
  cn('br-100 box-border text-body flex h-[20px] w-[20px] items-center justify-center rounded-full'),
  {
    variants: {
      finish: {
        true: 'bg-white text-primary-normal border-primary-normal',
        false: '',
      },
      process: {
        true: 'bg-primary-normal text-white',
        false: 'bg-fill-on-grey-1 text-text-2',
      },
    },
    compoundVariants: [
      {
        process: false,
        finish: true,
        className: 'bg-white text-primary-normal border-primary-normal border-[1px] border-solid',
      },
    ],
  },
);

const CardStep = React.forwardRef<HTMLDivElement, Step<Direction, Mode<Direction>>>(
  ({ mode, step, current, title, description, isLast, controller, actionStatus }, ref) => {
    const process = actionStatus === 'done' ? false : mode === 'display' || current === step;
    const finish = actionStatus ? actionStatus === 'done' : current > step;

    const zClassName = `z-${step}`;

    const getBtnProps = () => {
      // 已完成
      if (finish) {
        return {
          type: 'outlined',
          color: 'primary',
        };
      }
      // 未开始
      if (!process && !finish) {
        return {
          disabled: true,
          type: 'outlined',
          onClick: void 0, // 未开始禁止点击事件
        };
      }
      // 进行中
      return {};
    };

    const renderBottom = () => {
      if (!controller) {
        return null;
      }
      if (typeof controller === 'object' && controller !== null) {
        const { type, text, loadingIcon, onClick } = controller;
        if (type === HandlerElementType.button) {
          return (
            <div
              className={cn('absolute bottom-0 flex items-center', {
                'left-[28px]': step === 1,
                'left-[36px]': step !== 1,
              })}
            >
              {typeof text === 'string' ? (
                <Button onClick={onClick} size="sm" {...(getBtnProps() as ButtonProps)}>
                  {text}
                </Button>
              ) : (
                text
              )}
              {React.isValidElement(loadingIcon) ? loadingIcon : null}
            </div>
          );
        }
        // 链接
        if (type === HandlerElementType.link) {
          return typeof text === 'string' ? (
            <TextLink
              className={cn('ml-[28px] mt-[8px] inline-flex')}
              // 只要是未开始的，禁用点击事件
              disabled={!!(!process && !finish)}
              icon={<RightLine16 className="ml-[4px]" />}
              iconPosition="rear"
              noUnderline
              onClick={onClick}
            >
              {text}
            </TextLink>
          ) : (
            <div className="ml-[28px] mt-[8px] inline-flex">{text}</div>
          );
        }
      }
      return null;
    };

    return (
      <>
        <div
          className={cn(
            'bg-white max-w-[400px] min-w-[240px] grow-[2] shrink relative',
            zClassName,
            {
              'pl-[8px]': step !== 1, // 第2个内容区开始，内容区之间有 8px 距离
            },
          )}
          ref={ref}
        >
          <div className="flex">
            <span className={cn(stepIconVariants({ process, finish }))}>{step}</span>
            <div
              className={cn('ml-[8px] flex-1', {
                'pb-[36px]': controller?.type === HandlerElementType.button,
              })}
            >
              <span
                className={cn(
                  'inline-block relative break-all text-left text-[14px] font-medium text-text-1',
                  {
                    'text-text-1': process,
                    'text-text-2': finish,
                    'text-text-3': !process && !finish,
                  },
                )}
              >
                {title}
                <span
                  className={cn(
                    'absolute w-[500px] top-[10px] left-full ml-[8px] inline-block h-[2px]',
                    {
                      'bg-fill-3': !isLast,
                      'bg-white': isLast,
                    },
                  )}
                />
              </span>
              {description ? (
                <div
                  className={cn('text-body mt-[8px]', {
                    'text-text-2': process,
                    'text-text-3': !process,
                  })}
                >
                  {description}
                </div>
              ) : null}
            </div>
          </div>
          {renderBottom()}
        </div>
        {!isLast && <div className={cn('max-w-[160px] min-w-[32px] h-full grow shrink-[2]')} />}
      </>
    );
  },
);

CardStep.displayName = 'CardStep';

export default CardStep;
