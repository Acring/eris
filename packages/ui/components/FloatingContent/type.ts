import type { Placement } from '@floating-ui/react';

export interface FloatingContentProps {
  open?: boolean;
  placement?: Placement;
  setOnScrollbar?: (value: boolean) => void;
  inputRef?: React.RefObject<HTMLInputElement>;
  children?: React.ReactNode;
  referenceElement?: HTMLElement | null;
  popupWidth?: number | string;
  popupMaxWidth?: number | string;
  portalContainer?: HTMLElement | null;
  POPUP_MAX_WIDTH?: number;
  BOUNDARY_PADDING?: number;
  EMPTY_WIDTH?: number;
  EMPTY_HEIGHT?: number;
  POPUP_HEIGHT?: number;
}
