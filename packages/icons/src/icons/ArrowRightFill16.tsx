import React, { ForwardedRef, SVGProps } from 'react';

  const ArrowRightFill16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M6 12L10 8L6 4L6 12Z"/>
      </svg>
    )
  });

  ArrowRightFill16.displayName = 'ArrowRightFill16';

  export default ArrowRightFill16
