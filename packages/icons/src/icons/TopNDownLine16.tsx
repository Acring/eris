import React, { ForwardedRef, SVGProps } from 'react';

  const TopNDownLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path d="M7 3.00195L4.99414 3V7H1L7 14.002V3.00195ZM15 3H9V5H15V3ZM13 7H9V9H13V7ZM11 11H9V13H11V11Z"/>
      </svg>
    )
  });

  TopNDownLine16.displayName = 'TopNDownLine16';

  export default TopNDownLine16
