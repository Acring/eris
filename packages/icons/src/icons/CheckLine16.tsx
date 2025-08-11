import React, { ForwardedRef, SVGProps } from 'react';

  const CheckLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path d="M6.6665 10.115L12.7945 3.98633L13.7378 4.92899L6.6665 12.0003L2.42383 7.75766L3.3665 6.81499L6.6665 10.115Z"/>
      </svg>
    )
  });

  CheckLine16.displayName = 'CheckLine16';

  export default CheckLine16
