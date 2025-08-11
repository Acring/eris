import React, { ForwardedRef, SVGProps } from 'react';

  const ArrowUpLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M12.5255 8.29871L13.374 7.45018L7.99999 2.07617L2.62598 7.45018L3.4745 8.29871L7.39999 4.37323V13.9232H8.59999V4.37322L12.5255 8.29871Z"/>
      </svg>
    )
  });

  ArrowUpLine16.displayName = 'ArrowUpLine16';

  export default ArrowUpLine16
