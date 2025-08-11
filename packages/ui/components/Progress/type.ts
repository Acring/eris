import type { SizeType } from '@/lib/type';
import type { PopoverProps } from '../Popover';

type Color = 'default' | 'active' | 'warning' | 'danger' | 'updating';

interface CommonTypes {
  percent?: number;
  className?: string;
  rightInfo?: string | React.ReactNode;
  popoverProps?: Omit<PopoverProps, 'children'>;
  color?: Color;
  strokeColor?: string;
  showInfo?: boolean;
}

interface LineProgressProps extends CommonTypes {
  disable?: number;
  size?: Extract<SizeType, 'sm' | 'lg'>;
  segmentation?: {
    [key in Color]?: number;
  };
}

interface CircleProgressProps extends Omit<CommonTypes, 'rightInfo'> {
  middleInfo?: string | React.ReactNode;
  circleRadius?: number;
  ringWidth?: number;
}

interface RectangleProps extends CommonTypes {}

interface MiniProgressProps extends CommonTypes {}

export type { LineProgressProps, CircleProgressProps, RectangleProps, MiniProgressProps, Color };
