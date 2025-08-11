import React from 'react';

export interface BadgeProps {
  dot?: boolean;
  count?: number;
  maxCount?: number;
  maxCountContent?: React.ReactNode;
  children?: React.ReactNode;
}

/**
 * Owner: 樊梦文
 *
 * Figma: https://www.figma.com/file/Do849NlMKTXCv8djOFIFWA/%E9%80%9A%E7%94%A8%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83?type=design&node-id=14650-60170&mode=design
 *
 * 徽标组件，用于显示消息数量或状态。
 */
const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ children, maxCount = 99, count, maxCountContent, dot }, ref) => {
    const displayCount =
      Number(count) > Number(maxCount) ? maxCountContent || `${maxCount}+` : count;

    if (dot)
      return (
        <span className="relative inline-block" data-testid="Badge-root" ref={ref}>
          {children}
          <span className="bg-danger-normal absolute left-[calc(100%-3px)] top-[0] h-[6px] w-[6px]  rounded-full" />
        </span>
      );
    if (count)
      return (
        <span className="relative inline-block" data-testid="Badge-root" ref={ref}>
          {children}
          <span className="bg-danger-normal absolute left-[calc(100%-8px)] top-[-8px] h-[16px] min-w-[16px]  whitespace-nowrap rounded-[10px] px-[4px] text-center text-xs leading-[16px] text-white">
            {displayCount}
          </span>
        </span>
      );
    return children;
  },
);

Badge.displayName = 'Badge';
export default Badge;
