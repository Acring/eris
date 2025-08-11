export const components = {
  // button ring and shadow
  '.component-ring-primary': {
    '@apply focus-visible:shadow-interactive-primary-focus active:shadow-interactive-primary-active':
      {},
  },
  '.component-border-primary': {
    '@apply hover:border-form-border-default-hover focus-visible:border-form-border-default-focus active:border-form-border-default-active':
      {},
  },
  '.component-ring-danger': {
    '@apply focus-visible:shadow-interactive-danger-focus active:shadow-interactive-danger-active':
      {},
  },
  '.component-border-danger': {
    '@apply hover:border-form-border-danger-hover focus-visible:border-form-border-danger-focus active:border-form-border-danger-active':
      {},
  },
  '.component-ring-none': {
    '@apply focus-visible:!shadow-none active:!shadow-none aria-expanded:!shadow-none': {},
  },
  '.component-border-none': {
    '@apply !border-none hover:!border-none focus-visible:!border-none active:!border-none aria-expanded:!border-none':
      {},
  },
  // tooltip
  ".tooltip-content[data-side='top']": {
    transform: 'scale(0)',
    'transform-origin': '50% 100%',
    '@apply animate-scaleAndFaceTooltip': {},
  },
  ".tooltip-content[data-side='bottom']": {
    transform: 'scale(0)',
    'transform-origin': '50% 0%',
    '@apply animate-scaleAndFaceTooltip': {},
  },
  ".tooltip-content[data-side='right']": {
    transform: 'scale(0)',
    'transform-origin': '0% 50%',
    '@apply animate-scaleAndFaceTooltip': {},
  },
  ".tooltip-content[data-side='left']": {
    transform: 'scale(0)',
    'transform-origin': '100% 50%',
    '@apply animate-scaleAndFaceTooltip': {},
  },
  // scrollbar
  '.no-scrollbar::-webkit-scrollbar': {
    display: 'none',
  },
  // popover
  ".popover-content[data-side='top']": {
    '@apply animate-slideDownAndFade': {},
  },
  ".popover-content[data-side='bottom']": {
    '@apply animate-slideUpAndFade': {},
  },
  ".popover-content[data-side='right']": {
    '@apply animate-slideLeftAndFade': {},
  },
  ".popover-content[data-side='left']": {
    '@apply animate-slideRightAndFade': {},
  },
  // message
  '.message-container-middle .message-enter': {
    '@apply animate-slideDownAndFade': {},
  },
  '.message-container-middle .message-exit': {
    '@apply animate-slideUpAndHidden': {},
  },
  '.message-container-left .message-enter': {
    '@apply animate-slideRightAndFade': {},
  },
  '.message-container-left .message-exit': {
    '@apply animate-slideLeftAndHidden': {},
  },
  '.message-container-right .message-enter': {
    '@apply animate-slideLeftAndFade': {},
  },
  '.message-container-right .message-exit': {
    '@apply animate-slideRightAndHidden': {},
  },
  // notification
  '.notification-enter': {
    '@apply animate-slideDownAndFade': {},
  },
  '.notification-exit': {
    '@apply animate-hidden': {},
  },
  // day-cell
  '.day-cell .day-range-middle': {
    '@apply group-aria-selected:bg-primary-bg group-aria-selected:text-text-1': {},
  },
  // background
  '.background-ease-in': {
    'transition-property': 'background-color',
    'transition-timing-function': 'ease-in',
    'transition-duration': '.3s',
  },
  // Drawer
  '.drawer-extra-operation-right': {
    right: 'calc(100% + 8px)',
  },
  '.drawer-extra-operation-left': {
    left: 'calc(100% + 8px)',
  },
};
