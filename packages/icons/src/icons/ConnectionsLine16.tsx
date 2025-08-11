import React, { ForwardedRef, SVGProps } from 'react';

  const ConnectionsLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M16 7.9984L12 5.40039V7.2485H10.25V8.7485H12V10.5965L16 7.9984ZM5.75 8.7485H4L4 10.5966L0 7.9985L4 5.4005L4 7.2485H5.75V8.7485ZM6.25 7.2485H9.75V8.7485H6.25V7.2485Z"/>
      </svg>
    )
  });

  ConnectionsLine16.displayName = 'ConnectionsLine16';

  export default ConnectionsLine16
