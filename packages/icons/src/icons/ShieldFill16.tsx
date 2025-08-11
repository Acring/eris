import React, { ForwardedRef, SVGProps } from 'react';

  const ShieldFill16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M1.75 8V2.98077L7.9999 0.750037L8 0.75L14.25 2.98077V7.99999V8.34931C14.25 10.5832 13.009 12.6321 11.0292 13.6669L8 15.25L4.97085 13.6669C2.99104 12.6321 1.75 10.5832 1.75 8.3493V8ZM8 12.9933L10.1028 11.8943C11.4226 11.2045 12.25 9.83857 12.25 8.34931V7.99999H8L8 12.9933ZM7.9999 2.87361L3.75 4.3905V8H7.9999V2.87361Z"/>
      </svg>
    )
  });

  ShieldFill16.displayName = 'ShieldFill16';

  export default ShieldFill16
