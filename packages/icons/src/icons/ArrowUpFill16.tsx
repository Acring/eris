import React, { ForwardedRef, SVGProps } from 'react';

  const ArrowUpFill16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M12 10L8 6L4 10H12Z"/>
      </svg>
    )
  });

  ArrowUpFill16.displayName = 'ArrowUpFill16';

  export default ArrowUpFill16
