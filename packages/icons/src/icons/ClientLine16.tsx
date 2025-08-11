import React, { ForwardedRef, SVGProps } from 'react';

  const ClientLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path d="M1.69901 2.49707V11.3642L14.3279 11.3633V10.4585L2.60382 10.4594V3.40188H13.4231V8.57061H14.3279V2.49707H1.69901ZM15.2436 12.5984H.766602V13.5032H15.2436V12.5984Z"/>
      </svg>
    )
  });

  ClientLine16.displayName = 'ClientLine16';

  export default ClientLine16
