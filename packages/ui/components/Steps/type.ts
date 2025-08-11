import type { ReactNode } from 'react';

export type Direction = 'vertical' | 'horizontal';
export type Size<Dir extends Direction> = Dir extends 'vertical' ? 'default' | 'lg' : never;
export type Content<Dir extends Direction> = Dir extends 'vertical' ? ReactNode : never;
export type StepClick<Dir extends Direction> = Dir extends 'vertical'
  ? (current: number, e: React.MouseEvent<HTMLDivElement>) => void
  : never;
export type Mode<Dir extends Direction> = Dir extends 'vertical'
  ? 'interactive' | 'display'
  : 'interactive';

export enum HandlerElementType {
  link = 'link',
  button = 'button',
}

export interface Controller {
  type?: HandlerElementType;
  text?: string | ReactNode;
  loadingIcon?: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

export interface StepItem<Dir extends Direction> {
  title: ReactNode | string;
  description?: ReactNode | string;
  actionStatus?: 'abnormal' | 'warning' | 'error' | 'done';
  content?: Content<Dir>;
  controller?: Controller;
}

export interface StepsPropsBase<Dir extends Direction, M extends Mode<Dir>>
  extends React.HTMLAttributes<HTMLDivElement> {
  current?: number;
  items: StepItem<Dir>[];
  mode?: M;
  size?: Size<Dir>;
  direction?: Dir;
  type?: 'line' | 'card';
  innerClasses?: string;
  onStepClick?: StepClick<Dir>;
  hideGoBack?: boolean;
}

export type StepsPropsVerticalInteractive = StepsPropsBase<'vertical', 'interactive'>;
export type StepsPropsVerticalDisplay = Omit<StepsPropsBase<'vertical', 'display'>, 'current'>;
export type StepsPropsVertical = StepsPropsVerticalInteractive | StepsPropsVerticalDisplay;

export type StepsPropsHorizontal = StepsPropsBase<'horizontal', 'interactive'>;

export type StepsProps = StepsPropsVertical | StepsPropsHorizontal;
export type Step<Dir extends Direction, M extends Mode<Dir>> = StepItem<Dir> &
  Pick<StepsPropsBase<Dir, M>, 'size' | 'direction' | 'onStepClick' | 'mode' | 'hideGoBack'> & {
    step: number;
    isLast: boolean;
    current: number;
  };
