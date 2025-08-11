import React, { ForwardedRef, SVGProps } from 'react';

  const QuotaFill16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M6.89514 4.02789L7.23821 4.47618H7.80271H14.1429V6H2.14286V5.14286V4.19046V3.14286H6.21781L6.89514 4.02789ZM7.03962 2.33621L7.80271 3.33332H14.4286C14.902 3.33332 15.2857 3.71708 15.2857 4.19046V13.1429C15.2857 13.6162 14.902 14 14.4286 14H1.85714C1.38376 14 1 13.6162 1 13.1429V5.14286V4.19046V2.85714C1 2.38376 1.38376 2 1.85714 2H6.35894C6.6258 2 6.87744 2.12429 7.03962 2.33621Z"/>
      </svg>
    )
  });

  QuotaFill16.displayName = 'QuotaFill16';

  export default QuotaFill16
