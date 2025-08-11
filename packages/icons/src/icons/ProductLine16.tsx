import React, { ForwardedRef, SVGProps } from 'react';

  const ProductLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M1.97861 4.21852C1.35085 4.55035 1.35085 5.44954 1.97861 5.78138L7.58724 8.74607C7.84567 8.88268 8.15493 8.88268 8.41336 8.74607L14.022 5.78138C14.6498 5.44954 14.6498 4.55035 14.022 4.21852L8.41336 1.25382C8.15493 1.11722 7.84567 1.11722 7.58724 1.25382L1.97861 4.21852ZM3.06811 4.99995L8.0003 7.60708L12.9325 4.99995L8.0003 2.39281L3.06811 4.99995Z"/><path d="M1.78833 7.28911L7.86734 10.5024C7.95034 10.5463 8.04967 10.5463 8.13267 10.5024L14.2609 7.2631L14.8217 8.32401L8.69346 11.5633C8.2596 11.7927 7.74041 11.7927 7.30655 11.5633L1.22754 8.35001L1.78833 7.28911Z"/><path d="M7.86734 13.5024L1.78833 10.2891L1.22754 11.35L7.30655 14.5633C7.74041 14.7927 8.2596 14.7927 8.69346 14.5633L14.8217 11.324L14.2609 10.2631L8.13267 13.5024C8.04967 13.5463 7.95034 13.5463 7.86734 13.5024Z"/>
      </svg>
    )
  });

  ProductLine16.displayName = 'ProductLine16';

  export default ProductLine16
