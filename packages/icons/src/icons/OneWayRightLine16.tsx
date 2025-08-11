import React, { ForwardedRef, SVGProps } from 'react';

  const OneWayRightLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M11 5.40039L15 7.9984L11 10.5965V8.7484L1.00002 8.74854L1 7.24854L11 7.2484V5.40039Z"/>
      </svg>
    )
  });

  OneWayRightLine16.displayName = 'OneWayRightLine16';

  export default OneWayRightLine16
