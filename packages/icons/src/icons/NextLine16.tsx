import React, { ForwardedRef, SVGProps } from 'react';

  const NextLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M7.63674 7.99991L3.81836 4.18154L4.66689 3.33301L9.33379 7.99991L4.66689 12.6668L3.81836 11.8183L7.63674 7.99991Z"/><path fillRule="evenodd" clipRule="evenodd" d="M11.6367 7.99991L7.81836 4.18154L8.66689 3.33301L13.3338 7.99991L8.66689 12.6668L7.81836 11.8183L11.6367 7.99991Z"/>
      </svg>
    )
  });

  NextLine16.displayName = 'NextLine16';

  export default NextLine16
