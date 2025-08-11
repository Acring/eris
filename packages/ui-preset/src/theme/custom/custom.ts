import type { OptionalConfig } from 'tailwindcss/types/config';

// 需自定义的样式内容
const custom: OptionalConfig['theme'] = {
  extend: {
    keyframes: {
      slideUpAndFade: {
        '0%': {
          opacity: '0',
          transform: 'translateY(10px)',
        },
        '100%': {
          opacity: '1',
          transform: 'translateY(0px)',
        },
      },
      slideDownAndFade: {
        '0%': {
          opacity: '0',
          transform: 'translateY(-10px)',
        },
        '100%': {
          opacity: '1',
          transform: 'translateY(0px)',
        },
      },
      slideRightAndFade: {
        '0%': {
          opacity: '0',
          transform: 'translateX(-10px)',
        },
        '100%': {
          opacity: '1',
          transform: 'translateX(0px)',
        },
      },
      slideLeftAndFade: {
        '0%': {
          opacity: '0',
          transform: 'translateX(10px)',
        },
        '100%': {
          opacity: '1',
          transform: 'translateX(0px)',
        },
      },
      scaleAndFade: {
        '0%': {
          opacity: '0',
          transform: 'scale(0)',
        },
        '100%': {
          opacity: '1',
          transform: 'scale(1)',
        },
      },
      scaleAndFaceTooltip: {
        '0%': {
          opacity: '0',
          transform: 'scale(0.6)',
        },
        '100%': {
          opacity: '1',
          transform: 'scale(1)',
        },
      },
      scaleAndFadeWithTranslateCenter: {
        '0%': {
          transform: 'translate(-50%, -50%) scale(0)',
        },
        '100%': {
          transform: 'translate(-50%, -50%) scale(1)',
        },
      },
      slideUpAndHidden: {
        '0%': {
          opacity: '1',
          transform: 'translateY(0px)',
        },
        '100%': {
          opacity: '0',
          transform: 'translateY(-10px)',
        },
      },
      slideLeftAndHidden: {
        '0%': {
          opacity: '1',
          transform: 'translateX(0px)',
        },
        '100%': {
          opacity: '0',
          transform: 'translateX(-10px)',
        },
      },
      slideRightAndHidden: {
        '0%': {
          opacity: '1',
          transform: 'translateX(0px)',
        },
        '100%': {
          opacity: '0',
          transform: 'translateX(10px)',
        },
      },
      hidden: {
        '0%': {
          opacity: '1',
        },
        '100%': {
          opacity: '0',
        },
      },
      skeleton: {
        '0%': {
          opacity: '0.3',
        },
        '50%': {
          opacity: '0.6',
        },
        '100%': {
          opacity: '0.3',
        },
      },
    },
    animation: {
      slideUpAndFade: 'slideUpAndFade .6s cubic-bezier(0.16, 1, 0.3, 1)',
      slideDownAndFade: 'slideDownAndFade .6s cubic-bezier(0.16, 1, 0.3, 1)',
      slideRightAndFade: 'slideRightAndFade .6s cubic-bezier(0.16, 1, 0.3, 1)',
      slideLeftAndFade: 'slideLeftAndFade .6s cubic-bezier(0.16, 1, 0.3, 1)',
      scaleAndFade: 'scaleAndFade .3s cubic-bezier(0.3,1.3,0.4,1)',
      scaleAndFaceTooltip: 'scaleAndFaceTooltip .2s cubic-bezier(0.25, 0.60, 0.35, 1) forwards',
      scaleAndFadeWithTranslateCenter:
        'scaleAndFadeWithTranslateCenter .3s cubic-bezier(0.3,1.3,0.4,1)',
      slideUpAndHidden: 'slideUpAndHidden .6s cubic-bezier(0.16, 1, 0.3, 1)',
      slideLeftAndHidden: 'slideLeftAndHidden .6s cubic-bezier(0.16, 1, 0.3, 1)',
      slideRightAndHidden: 'slideRightAndHidden .6s cubic-bezier(0.16, 1, 0.3, 1)',
      hidden: 'hidden .6s cubic-bezier(0.16, 1, 0.3, 1)',
      skeleton: 'skeleton 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;',
    },
    dropShadow: {
      arrow: ['0px 2px 4px rgba(0, 0, 0, 0.08)', '0px 4px 14px rgba(0, 0, 0, 0.05)'],
    },
    zIndex: {
      appBar: '1100', // 顶部导航栏
      drawer: '1200', // 侧边栏
      modal: '1300', // 弹出框
      dropdown: '1350', // 下拉菜单
      snackbar: '1400', // 消息提示
      tooltip: '1500', // 文字提示
    },
  },
};

export default custom;
