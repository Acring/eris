import React, { ForwardedRef, SVGProps } from 'react';

  const TopNUpLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path d="M7 12.998L4.99414 13V9H1L7 1.99805V12.998ZM15 13H9V11H15V13ZM13 9H9V7H13V9ZM11 5H9V3H11V5Z"/>
      </svg>
    )
  });

  TopNUpLine16.displayName = 'TopNUpLine16';

  export default TopNUpLine16
