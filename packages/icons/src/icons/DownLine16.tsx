import React, { ForwardedRef, SVGProps } from 'react';

  const DownLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M8 9.63675L11.8184 5.81838L12.6669 6.66691L8 11.3338L3.3331 6.6669L4.18162 5.81838L8 9.63675Z"/>
      </svg>
    )
  });

  DownLine16.displayName = 'DownLine16';

  export default DownLine16
