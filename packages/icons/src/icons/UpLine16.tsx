import React, { ForwardedRef, SVGProps } from 'react';

  const UpLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M8 6.36325L4.18162 10.1816L3.33309 9.3331L8 4.66619L12.6669 9.3331L11.8184 10.1816L8 6.36325Z"/>
      </svg>
    )
  });

  UpLine16.displayName = 'UpLine16';

  export default UpLine16
