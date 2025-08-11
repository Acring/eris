import React, { ForwardedRef, SVGProps } from 'react';

  const MenuLicenseLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M2.7 3.2V12.8H13.3V3.2H2.7ZM2.5 2C1.94772 2 1.5 2.44772 1.5 3V13C1.5 13.5523 1.94772 14 2.5 14H13.5C14.0523 14 14.5 13.5523 14.5 13V3C14.5 2.44772 14.0523 2 13.5 2H2.5ZM6.8 5.84996H5.2V7.44996H6.8V5.84996ZM5.2 4.64996H4V5.84996V7.44996V8.64996H5.2H6.8H8V7.44996V5.84996V4.64996H6.8H5.2ZM12 4.64996H9V5.94996H12V4.64996ZM9 7.34991H12V8.64991H9V7.34991ZM12 11.35V10.05H4V11.35H12Z"/>
      </svg>
    )
  });

  MenuLicenseLine16.displayName = 'MenuLicenseLine16';

  export default MenuLicenseLine16
