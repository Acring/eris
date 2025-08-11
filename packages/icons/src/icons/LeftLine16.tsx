import React, { ForwardedRef, SVGProps } from 'react';

  const LeftLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M6.36325 8L10.1816 11.8184L9.33309 12.6669L4.66619 8L9.3331 3.3331L10.1816 4.18162L6.36325 8Z"/>
      </svg>
    )
  });

  LeftLine16.displayName = 'LeftLine16';

  export default LeftLine16
