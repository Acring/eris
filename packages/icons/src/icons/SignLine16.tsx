import React, { ForwardedRef, SVGProps } from 'react';

  const SignLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M3 2H8V3.2H3.2V12.8H12.8V8H14V13C14 13.5523 13.5523 14 13 14H3C2.44772 14 2 13.5523 2 13V3C2 2.44772 2.44772 2 3 2ZM8.54033 10.3888L13.9609 3.8841L13.0391 3.11588L8.45969 8.61114L5.42427 5.57572L4.57574 6.42425L8.54033 10.3888Z"/>
      </svg>
    )
  });

  SignLine16.displayName = 'SignLine16';

  export default SignLine16
