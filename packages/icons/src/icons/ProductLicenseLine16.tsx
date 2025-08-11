import React, { ForwardedRef, SVGProps } from 'react';

  const ProductLicenseLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path d="M11.2 10.9669H10V12.1669H11.2V10.9669Z"/><path fillRule="evenodd" clipRule="evenodd" d="M12.8 6.48343V8.96686H3.2V3.10769H7V2H3C2.44772 2 2 2.41328 2 2.92308V13.0769C2 13.5867 2.44772 14 3 14H13C13.5523 14 14 13.5867 14 13.0769V6.48343H12.8ZM3.2 12.8923V10.1669H12.8V12.8923H3.2Z"/><path fillRule="evenodd" clipRule="evenodd" d="M13.3548 3.20343L12.3948 2.48343L9.76624 5.98819L7.74963 4.37491L7 5.31195L9.98339 7.69866L13.3548 3.20343Z"/>
      </svg>
    )
  });

  ProductLicenseLine16.displayName = 'ProductLicenseLine16';

  export default ProductLicenseLine16
