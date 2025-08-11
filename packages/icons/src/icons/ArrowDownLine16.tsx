import React, { ForwardedRef, SVGProps } from 'react';

  const ArrowDownLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M12.5255 7.69934L13.374 8.54786L7.99999 13.9219L2.62598 8.54786L3.4745 7.69934L7.39998 11.6248L7.39998 2.07735H8.59998L8.59998 11.6248L12.5255 7.69934Z"/>
      </svg>
    )
  });

  ArrowDownLine16.displayName = 'ArrowDownLine16';

  export default ArrowDownLine16
