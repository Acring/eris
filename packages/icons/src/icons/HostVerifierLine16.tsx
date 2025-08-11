import React, { ForwardedRef, SVGProps } from 'react';

  const HostVerifierLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M14.0266 1.97363H1.97363V14.0266H14.0266V1.97363ZM3.17893 12.8213V3.17894H12.8213V12.8213H3.17893ZM5.58953 3.17896V6.79485H10.4107V3.17896H11.616V8.00015H4.38423V3.17896H5.58953ZM9.20542 3.17896H8.00012V4.38425H9.20542V3.17896Z"/>
      </svg>
    )
  });

  HostVerifierLine16.displayName = 'HostVerifierLine16';

  export default HostVerifierLine16
