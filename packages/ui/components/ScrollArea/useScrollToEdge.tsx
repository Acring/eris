'use client';

import { useState, useCallback } from 'react';

// 滚动边缘检测 Hook
interface UseScrollToEdgeOptions {
  offset?: number;
}

const useScrollToEdge = (options: UseScrollToEdgeOptions = {}) => {
  const { offset = 0 } = options;
  const [scrollState, setScrollState] = useState({
    isAtTop: true,
    isAtBottom: false,
    isAtLeft: true,
    isAtRight: false,
  });

  const onScroll = useCallback(
    (e: React.UIEvent<HTMLElement>) => {
      const target = e?.target as HTMLElement;
      const { scrollTop, scrollHeight, clientHeight, scrollLeft, scrollWidth, clientWidth } =
        target;

      // 垂直滚动边缘检测
      const isAtTop = scrollTop <= offset;
      const isAtBottom = Math.ceil(scrollTop + clientHeight) >= Math.ceil(scrollHeight - offset);

      // 水平滚动边缘检测
      const isAtLeft = scrollLeft <= offset;
      const isAtRight = Math.ceil(scrollLeft + clientWidth) >= Math.ceil(scrollWidth - offset);

      setScrollState({
        isAtTop,
        isAtBottom,
        isAtLeft,
        isAtRight,
      });
    },
    [offset],
  );

  return { ...scrollState, onScroll };
};

export default useScrollToEdge;
