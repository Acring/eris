const PRIMARY_BG_COLOR = 'bg-progress-bg';

const RECOVERY = {
  color: 'chart-no-meaning-1',
  bgColor: 'bg-chart-no-meaning-1',
};

const VARIANTS: Record<
  string,
  {
    color: string;
    bgColor: string;
  }
> = {
  default: {
    color: 'progress-normal',
    bgColor: 'bg-progress-normal',
  },
  active: {
    color: 'success-normal',
    bgColor: 'bg-success-normal',
  },
  warning: {
    color: 'warning-normal',
    bgColor: 'bg-warning-normal',
  },
  danger: {
    color: 'danger-normal',
    bgColor: 'bg-danger-normal',
  },
  updating: {
    color: 'updating-normal',
    bgColor: 'bg-updating-normal',
  },
};

const DEFAULT_COLOR_VALUE = 'default';

export { VARIANTS, DEFAULT_COLOR_VALUE, PRIMARY_BG_COLOR, RECOVERY };
