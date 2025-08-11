import React, { ForwardedRef, SVGProps } from 'react';

  const UsbFill16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path d="M6 3H7.3V4.3H6V3ZM8.7002 3H10.0002V4.3H8.7002V3Z"/><path fillRule="evenodd" clipRule="evenodd" d="M4 5.5V0.5H12V5.5C12.5523 5.5 13 5.94772 13 6.5V13.5C13 14.6046 12.1046 15.5 11 15.5H5C3.89543 15.5 3 14.6046 3 13.5V6.5C3 5.94772 3.44772 5.5 4 5.5ZM5.2 5.5V1.7H10.8V5.5H5.2ZM8.50018 6.50008L7.50018 6.5L7.5 11.3597L6.5 11.1097V8.50004H5.5V11.5C5.5 11.7295 5.65615 11.9295 5.87873 11.9851L7.50004 12.3904L7.50006 12.6338C7.20113 12.8067 7 13.1299 7 13.5C7 14.0523 7.44772 14.5 8 14.5C8.55228 14.5 9 14.0523 9 13.5C9 13.1299 8.79893 12.8068 8.50006 12.6339L8.5 10.9926L10.1491 10.4773C10.3579 10.4121 10.5 10.2187 10.5 10V7.50004H9.5V9.63244L8.5 9.94495L8.50018 6.50008Z"/>
      </svg>
    )
  });

  UsbFill16.displayName = 'UsbFill16';

  export default UsbFill16
