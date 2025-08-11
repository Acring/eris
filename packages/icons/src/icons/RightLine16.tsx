import React, { ForwardedRef, SVGProps } from 'react';

  const RightLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M9.63675 8L5.81838 4.18162L6.66691 3.33309L11.3338 8L6.6669 12.6669L5.81838 11.8184L9.63675 8Z"/>
      </svg>
    )
  });

  RightLine16.displayName = 'RightLine16';

  export default RightLine16
