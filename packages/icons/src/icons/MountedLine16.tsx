import React, { ForwardedRef, SVGProps } from 'react';

  const MountedLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M2.2 3.52227V11.1223H4V12.3223H2C1.44772 12.3223 1 11.8746 1 11.3223V3.32227C1 2.76998 1.44772 2.32227 2 2.32227H14C14.5523 2.32227 15 2.76998 15 3.32227V11.3223C15 11.8745 14.5523 12.3223 14 12.3223H12V11.1223H13.8V3.52227H2.2ZM8.48 13.1823L11.48 9.18227L10.52 8.46227L7.89143 11.967L5.87482 10.3537L5.12518 11.2908L7.62518 13.2908L8.10857 13.6775L8.48 13.1823Z"/>
      </svg>
    )
  });

  MountedLine16.displayName = 'MountedLine16';

  export default MountedLine16
