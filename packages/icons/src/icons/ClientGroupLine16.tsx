import React, { ForwardedRef, SVGProps } from 'react';

  const ClientGroupLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M14.7866 2.02441V6.80477H13.8903V3.00609H5.3113V4.37191H12.5245V8.68276H14.7866V9.57908H12.5245V11.8412H2.15286V4.32923H4.41499V2.02441H14.7866ZM11.6282 10.9449V5.22554H3.04917V10.9449H11.6282Z"/><path d="M13.4208 13.079H1.21387V13.9753H13.4208V13.079Z"/>
      </svg>
    )
  });

  ClientGroupLine16.displayName = 'ClientGroupLine16';

  export default ClientGroupLine16
