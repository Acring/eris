import React, { ForwardedRef, SVGProps } from 'react';

  const ArrowRightLine20 = React.forwardRef(({color = 'currentColor', size= 20, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M10.929 5.75723L12.3432 4.34302L16.5858 8.58567L16.5859 8.58558L18.0001 9.99979L18 9.99987L16.5858 11.4141L12.3433 15.6566L10.929 14.2424L14.1716 10.9999L2 10.9999L2 8.99991L14.1716 8.99991L10.929 5.75723Z"/>
      </svg>
    )
  });

  ArrowRightLine20.displayName = 'ArrowRightLine20';

  export default ArrowRightLine20
