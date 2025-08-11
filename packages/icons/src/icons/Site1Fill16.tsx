import React, { ForwardedRef, SVGProps } from 'react';

  const Site1Fill16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M4.59678 6.63077 8.02959 8.59102 11.4624 6.63077V2.71026L8.02959.75 4.59678 2.71026V6.63077ZM6.8938 5.34136 8.0686 6.01222 9.2434 5.34136V3.99966L8.0686 3.3288 6.8938 3.99966V5.34136ZM11.8172 15.25 8.38438 13.2897V9.36923L11.8172 7.40898 15.25 9.36923V13.2897L11.8172 15.25ZM10.6424 12.0003 11.8172 12.6712 12.992 12.0003V10.6586L11.8172 9.98778 10.6424 10.6586V12.0003ZM4.18281 15.25.75 13.2897V9.36923L4.18281 7.40898 7.63513 9.36923V13.2897L4.18281 15.25ZM3.01776 12.0003 4.19256 12.6712 5.36737 12.0003V10.6586L4.19256 9.98778 3.01776 10.6586V12.0003Z"/>
      </svg>
    )
  });

  Site1Fill16.displayName = 'Site1Fill16';

  export default Site1Fill16
