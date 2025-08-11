import React, { ForwardedRef, SVGProps } from 'react';

  const LinkOutsideLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M3.2 3.2V12.8H12.8V10H14V13C14 13.5523 13.5523 14 13 14H3C2.44772 14 2 13.5523 2 13V3C2 2.44772 2.44772 2 3 2H6V3.2H3.2ZM12.8 2H8V3.2H11.9514L7.07574 8.07568L7.92427 8.92421L12.8 4.04848L12.8 8H14V3.2V2H12.8Z"/>
      </svg>
    )
  });

  LinkOutsideLine16.displayName = 'LinkOutsideLine16';

  export default LinkOutsideLine16
