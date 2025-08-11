import React, { ForwardedRef, SVGProps } from 'react';

  const OneWayLeftLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M5 10.5996L1 8.0016L5 5.40346L5 7.2516L15 7.25146L15 8.75146L5 8.7516L5 10.5996Z"/>
      </svg>
    )
  });

  OneWayLeftLine16.displayName = 'OneWayLeftLine16';

  export default OneWayLeftLine16
