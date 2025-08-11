import React, { ForwardedRef, SVGProps } from 'react';

  const RightPlusLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M5.44033 2.03223L11.408 7.9999L5.44033 13.9676L4.5918 13.119L9.71094 7.9999L4.5918 2.88075L5.44033 2.03223Z"/>
      </svg>
    )
  });

  RightPlusLine16.displayName = 'RightPlusLine16';

  export default RightPlusLine16
