import React, { ForwardedRef, SVGProps } from 'react';

  const DirectoryFill16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M1 3C1 2.44772 1.44772 2 2 2H7L8 4H14C14.5523 4 15 4.44772 15 5V13C15 13.5523 14.5523 14 14 14H2C1.44772 14 1 13.5523 1 13V4V3ZM7.45466 5.63304H3.45466V6.63304H7.45466V5.63304ZM4.45459 8H11.9493V9H4.45459V8ZM11.9525 10.3669H4.45459V11.3669H11.9525V10.3669Z"/>
      </svg>
    )
  });

  DirectoryFill16.displayName = 'DirectoryFill16';

  export default DirectoryFill16
