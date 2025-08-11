import React, { ForwardedRef, SVGProps } from 'react';

  const SortUpLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M11 2L15 6H12.2V14H11V6V4V2ZM9 3.39999H2V4.59999H9V3.39999ZM9 7.39999H2V8.59999H9V7.39999ZM2 11.4H9V12.6H2V11.4Z"/>
      </svg>
    )
  });

  SortUpLine16.displayName = 'SortUpLine16';

  export default SortUpLine16
