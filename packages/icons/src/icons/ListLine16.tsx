import React, { ForwardedRef, SVGProps } from 'react';

  const ListLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M3.73787 2.57324H2.43359V3.76228H3.73787V2.57324ZM13.5669 2.57324H5.49627V3.76228H13.5669V2.57324ZM2.43359 7.4056H3.73787V8.59509H2.43359V7.4056ZM13.5669 7.4056H5.49627V8.59509H13.5669V7.4056ZM2.43359 12.2385H3.73787V13.4275H2.43359V12.2385ZM13.5669 12.2385H5.49627V13.4275H13.5669V12.2385Z"/>
      </svg>
    )
  });

  ListLine16.displayName = 'ListLine16';

  export default ListLine16
