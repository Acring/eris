import React, { ForwardedRef, SVGProps } from 'react';

  const TwoWayLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M16 7.9984L12 5.40039V7.24851H4L4 5.4005L0 7.99851L4 10.5966L4 8.74851H12V10.5965L16 7.9984Z"/>
      </svg>
    )
  });

  TwoWayLine16.displayName = 'TwoWayLine16';

  export default TwoWayLine16
