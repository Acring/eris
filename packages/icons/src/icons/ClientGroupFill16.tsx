import React, { ForwardedRef, SVGProps } from 'react';

  const ClientGroupFill16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M13.5 3.25H3.5V4.25H11.5C12.0523 4.25 12.5 4.69772 12.5 5.25V9.25H13.5V3.25ZM2.5 3.25V4.25C1.94772 4.25 1.5 4.69772 1.5 5.25V10.25C1.5 10.8023 1.94772 11.25 2.5 11.25H11.5C12.0523 11.25 12.5 10.8023 12.5 10.25H13.5C14.0523 10.25 14.5 9.80228 14.5 9.25V3.25C14.5 2.69772 14.0523 2.25 13.5 2.25H3.5C2.94772 2.25 2.5 2.69772 2.5 3.25ZM1.75 12.25C1.33579 12.25 1 12.5858 1 13C1 13.4142 1.33579 13.75 1.75 13.75H14.25C14.6642 13.75 15 13.4142 15 13C15 12.5858 14.6642 12.25 14.25 12.25H1.75Z"/>
      </svg>
    )
  });

  ClientGroupFill16.displayName = 'ClientGroupFill16';

  export default ClientGroupFill16
