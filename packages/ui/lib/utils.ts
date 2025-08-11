import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';
import colorJS from 'color-js';

// tailwind-merge 有些主题定制不支持，需要自定义
// https://github.com/dcastil/tailwind-merge/blob/v1.12.0/docs/configuration.md#theme
const twMergeCustom = extendTailwindMerge({
  classGroups: {
    'font-size': [
      'text-body',
      'text-title',
      'text-caption',
      'text-subhead',
      'text-number',
      'text-bignumber',
    ],
    h: [
      {
        h: [
          'skeleton-height-xs',
          'skeleton-height-sm',
          'skeleton-height-md',
          'skeleton-height-lg',
          'skeleton-height-xl',
          'skeleton-height-xxl',
        ],
      },
    ],
    w: [
      {
        w: [
          'skeleton-width-xs',
          'skeleton-width-sm',
          'skeleton-width-md',
          'skeleton-width-lg',
          'skeleton-width-xl',
        ],
      },
    ],
    shadow: [
      {
        shadow: [
          'elevation-1-bottom',
          'elevation-2-left',
          'elevation-2-right',
          'elevation-2-top',
          'elevation-3-right',
          'interactive-danger-active',
          'interactive-primary-focus',
          'interactive-danger-focus',
          'interactive-success-focus',
          'interactive-primary-active',
          'elevation-2-bottom',
          'interactive-success-active',
          'elevation-3-bottom',
        ],
      },
    ],
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMergeCustom(clsx(inputs));
}

export const reorder = (list: unknown[], sourceIndex: number, destinationIndex: number) => {
  const temp = [...list];
  const target = temp[sourceIndex];
  temp.splice(sourceIndex, 1);
  temp.splice(destinationIndex, 0, target);
  return temp;
};

export function useFitContentWidth({
  label,
  fontSize,
  fontWeight,
}: {
  label: string | undefined;
  fontSize: number;
  fontWeight: number;
}) {
  const width = React.useMemo(() => {
    // not browser env
    if (typeof window === 'undefined' || !label) {
      return 0;
    }
    const span = document.createElement('span');
    span.innerText = label;
    span.style.opacity = '0';
    span.style.padding = '0px';
    span.style.position = 'absolute';
    span.style.fontSize = `${fontSize}px`;
    span.style.fontWeight = `${fontWeight}`;
    // 保留空格
    span.style.whiteSpace = 'pre';
    window.document.body.appendChild(span);
    const _width = span.offsetWidth;
    window.document.body.removeChild(span);
    return _width + 1; // + 1 防止小数点时会省略
  }, [fontSize, fontWeight, label]);

  return width;
}

export const uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export function useFocus() {
  const [focused, setFocused] = React.useState(false);
  const onFocus = React.useCallback(() => {
    setFocused(true);
  }, []);
  const onBlur = React.useCallback(() => {
    setFocused(false);
  }, []);
  return { focused, onFocus, onBlur };
}

export function getAlphaColor(color: string, alpha: number) {
  const originColor = colorJS(color);

  // H:same, S:same, V:same, Alpha:0.4
  const retColor = originColor.setAlpha(alpha);

  return retColor.toString();
}
