import React, { ForwardedRef, SVGProps } from 'react';

  const PrevLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M4.36307 7.99991L8.18145 11.8183L7.33292 12.6668L2.66602 7.99991L7.33292 3.33301L8.18145 4.18154L4.36307 7.99991Z"/><path fillRule="evenodd" clipRule="evenodd" d="M8.36307 7.99991L12.1814 11.8183L11.3329 12.6668L6.66602 7.99991L11.3329 3.33301L12.1814 4.18154L8.36307 7.99991Z"/>
      </svg>
    )
  });

  PrevLine16.displayName = 'PrevLine16';

  export default PrevLine16
