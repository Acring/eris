export const components = (theme: (path?: string, defaultValue?: unknown) => any) => ({
  // button ring and shadow
  '.component-ring-primary': {
    '&:focus-visible': {
      'box-shadow': theme('boxShadow.interactive-primary-focus'),
    },
    '&:active': {
      'box-shadow': theme('boxShadow.interactive-primary-active'),
    },
  },
  '.component-border-primary': {
    '&:hover': {
      'border-color': theme('colors.form-border-default-hover'),
    },
    '&:focus-visible': {
      'border-color': theme('colors.form-border-default-focus'),
    },
    '&:active': {
      'border-color': theme('colors.form-border-default-active'),
    },
  },
  '.component-ring-danger': {
    '&:focus-visible': {
      'box-shadow': theme('boxShadow.interactive-danger-focus'),
    },
    '&:active': {
      'box-shadow': theme('boxShadow.interactive-danger-active'),
    },
  },
  '.component-border-danger': {
    '&:hover': {
      'border-color': theme('colors.form-border-danger-hover'),
    },
    '&:focus-visible': {
      'border-color': theme('colors.form-border-danger-focus'),
    },
    '&:active': {
      'border-color': theme('colors.form-border-danger-active'),
    },
  },
  '.component-ring-none': {
    '&:focus-visible': { 'box-shadow': 'none !important' },
    '&:active': { 'box-shadow': 'none !important' },
    '&[aria-expanded="true"]': { 'box-shadow': 'none !important' },
  },
  '.component-border-none': {
    border: 'none !important',
    '&:hover': { border: 'none !important' },
    '&:focus-visible': { border: 'none !important' },
    '&:active': { border: 'none !important' },
    '&[aria-expanded="true"]': { border: 'none !important' },
  },
  // tooltip
  ".tooltip-content[data-side='top']": {
    transform: 'scale(0)',
    'transform-origin': '50% 100%',
    animation: theme('animation.scaleAndFaceTooltip'),
  },
  ".tooltip-content[data-side='bottom']": {
    transform: 'scale(0)',
    'transform-origin': '50% 0%',
    animation: theme('animation.scaleAndFaceTooltip'),
  },
  ".tooltip-content[data-side='right']": {
    transform: 'scale(0)',
    'transform-origin': '0% 50%',
    animation: theme('animation.scaleAndFaceTooltip'),
  },
  ".tooltip-content[data-side='left']": {
    transform: 'scale(0)',
    'transform-origin': '100% 50%',
    animation: theme('animation.scaleAndFaceTooltip'),
  },
  // scrollbar
  '.no-scrollbar::-webkit-scrollbar': {
    display: 'none',
  },
  // popover
  ".popover-content[data-side='top']": {
    animation: theme('animation.slideDownAndFade'),
  },
  ".popover-content[data-side='bottom']": {
    animation: theme('animation.slideUpAndFade'),
  },
  ".popover-content[data-side='right']": {
    animation: theme('animation.slideLeftAndFade'),
  },
  ".popover-content[data-side='left']": {
    animation: theme('animation.slideRightAndFade'),
  },
  // message
  '.message-container-middle .message-enter': {
    animation: theme('animation.slideDownAndFade'),
  },
  '.message-container-middle .message-exit': {
    animation: theme('animation.slideUpAndHidden'),
  },
  '.message-container-left .message-enter': {
    animation: theme('animation.slideRightAndFade'),
  },
  '.message-container-left .message-exit': {
    animation: theme('animation.slideLeftAndHidden'),
  },
  '.message-container-right .message-enter': {
    animation: theme('animation.slideLeftAndFade'),
  },
  '.message-container-right .message-exit': {
    animation: theme('animation.slideRightAndHidden'),
  },
  // notification
  '.notification-enter': {
    animation: theme('animation.slideDownAndFade'),
  },
  '.notification-exit': {
    animation: theme('animation.hidden'),
  },
  // day-cell (group aria-selected)
  '.group[aria-selected="true"] .day-cell .day-range-middle': {
    'background-color': theme('colors.primary-bg'),
    color: theme('colors.text-1'),
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
});
