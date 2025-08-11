import React, { ForwardedRef, SVGProps } from 'react';

  const StoragePlatformFill16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M1.5 2.5C1.5 1.94772 1.94772 1.5 2.5 1.5H13.5C14.0523 1.5 14.5 1.94772 14.5 2.5V5.5H5.5C4.94772 5.5 4.5 5.94771 4.5 6.5V14.5H2.5C1.94772 14.5 1.5 14.0523 1.5 13.5V2.5ZM6.5 8.5C6.5 7.94772 6.94772 7.5 7.5 7.5H13.5C14.0523 7.5 14.5 7.94772 14.5 8.5V10.5H6.5V8.5ZM6.5 11.5H14.5V13.5C14.5 14.0523 14.0523 14.5 13.5 14.5H7.5C6.94772 14.5 6.5 14.0523 6.5 13.5V11.5ZM8.50039 9.60039C8.83176 9.60039 9.10039 9.33176 9.10039 9.00039C9.10039 8.66902 8.83176 8.40039 8.50039 8.40039C8.16902 8.40039 7.90039 8.66902 7.90039 9.00039C7.90039 9.33176 8.16902 9.60039 8.50039 9.60039ZM9.10039 13.0004C9.10039 13.3318 8.83176 13.6004 8.50039 13.6004C8.16902 13.6004 7.90039 13.3318 7.90039 13.0004C7.90039 12.669 8.16902 12.4004 8.50039 12.4004C8.83176 12.4004 9.10039 12.669 9.10039 13.0004Z"/>
      </svg>
    )
  });

  StoragePlatformFill16.displayName = 'StoragePlatformFill16';

  export default StoragePlatformFill16
