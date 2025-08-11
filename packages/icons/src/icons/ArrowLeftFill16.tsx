import React, { ForwardedRef, SVGProps } from 'react';

  const ArrowLeftFill16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M10 4L6 8L10 12L10 4Z"/>
      </svg>
    )
  });

  ArrowLeftFill16.displayName = 'ArrowLeftFill16';

  export default ArrowLeftFill16
