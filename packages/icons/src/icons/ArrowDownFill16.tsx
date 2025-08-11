import React, { ForwardedRef, SVGProps } from 'react';

  const ArrowDownFill16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M4 6L8 10L12 6H4Z"/>
      </svg>
    )
  });

  ArrowDownFill16.displayName = 'ArrowDownFill16';

  export default ArrowDownFill16
