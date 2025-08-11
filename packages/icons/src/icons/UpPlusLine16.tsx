import React, { ForwardedRef, SVGProps } from 'react';

  const UpPlusLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M7.9999 3.95605L13.9676 9.92372L13.119 10.7723L7.9999 5.65311L2.88075 10.7723L2.03223 9.92372L7.9999 3.95605Z"/>
      </svg>
    )
  });

  UpPlusLine16.displayName = 'UpPlusLine16';

  export default UpPlusLine16
