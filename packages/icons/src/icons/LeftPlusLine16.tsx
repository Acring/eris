import React, { ForwardedRef, SVGProps } from 'react';

  const LeftPlusLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M10.9676 2.88075L5.84842 7.9999L10.9676 13.119L10.119 13.9676L4.15137 7.9999L10.119 2.03223L10.9676 2.88075Z"/>
      </svg>
    )
  });

  LeftPlusLine16.displayName = 'LeftPlusLine16';

  export default LeftPlusLine16
