import React, { ForwardedRef, SVGProps } from 'react';

  const ArrowLeftLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M6.44975 3.05078L7.29828 3.89931L3.79709 7.40049H14.5002V8.60049H3.79708L7.29827 12.1017L6.44975 12.9502L2.34856 8.84903L2.34853 8.84906L1.5 8.00053L1.50003 8.0005L1.5 8.00047L2.34853 7.15194L2.34856 7.15197L6.44975 3.05078Z"/>
      </svg>
    )
  });

  ArrowLeftLine16.displayName = 'ArrowLeftLine16';

  export default ArrowLeftLine16
