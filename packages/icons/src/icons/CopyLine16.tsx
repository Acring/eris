import React, { ForwardedRef, SVGProps } from 'react';

  const CopyLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M5.7 2.7V4.5H10.5C11.0523 4.5 11.5 4.94772 11.5 5.5V10.3H13.3V2.7H5.7ZM11.5 11.5V13.5C11.5 14.0523 11.0523 14.5 10.5 14.5H2.5C1.94772 14.5 1.5 14.0523 1.5 13.5V5.5C1.5 4.94772 1.94772 4.5 2.5 4.5H4.5V2.5C4.5 1.94772 4.94772 1.5 5.5 1.5H13.5C14.0523 1.5 14.5 1.94772 14.5 2.5V10.5C14.5 11.0523 14.0523 11.5 13.5 11.5H11.5ZM2.7 13.3V5.7H10.3V13.3H2.7Z"/>
      </svg>
    )
  });

  CopyLine16.displayName = 'CopyLine16';

  export default CopyLine16
