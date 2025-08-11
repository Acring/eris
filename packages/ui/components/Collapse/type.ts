import type { ReactNode } from 'react';
import type { TooltipProps } from '../Tooltip';
import type { IconButtonProps } from '../IconButton';

interface HoverStyle {
  changeColor: boolean;
  cursorArea: 'default' | 'full';
}

interface CollapseProps {
  className?: string;
  open?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  defaultOpen?: boolean;
  title?: string | ReactNode;
  rightTitle?: string | ReactNode;
  description?: string | ReactNode;
  children?: string | ReactNode;
  tooltip?: Omit<TooltipProps, 'children'>;
  hoverStyle?: HoverStyle;
  showIcon?: boolean;
  iconButtonProps?: IconButtonProps;
  forceRender?: boolean;
  triggerGap?: 'sm' | 'md' | 'lg';
}

interface CardCollapseProps extends CollapseProps {}

export type { CollapseProps, CardCollapseProps };
