import type * as SelectPrimitive from '@radix-ui/react-select';
import type { TooltipProps } from '../Tooltip';

export interface SelectRef {
  focus: () => void;
}

export interface SelectProps extends SelectPrimitive.SelectProps {
  error?: boolean;
  options: Option[];
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onChange?: (value: string, option: Option, options: Option[]) => void;
  tooltip?: React.ReactNode;
  tooltipProps?: TooltipProps;
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  noBorder?: boolean;
  style?: React.CSSProperties;
  dropdownMatchSelectWidth?: boolean;
}
export interface Option {
  label: React.ReactNode;
  value: string;
  disabled?: boolean;
  tooltip?: React.ReactNode;
  tooltipProps?: Omit<TooltipProps, 'children' | 'title'>;
}
