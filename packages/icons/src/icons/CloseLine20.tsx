import React, { ForwardedRef, SVGProps } from 'react';

  const CloseLine20 = React.forwardRef(({color = 'currentColor', size= 20, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M17.4989 3.91531L16.0846 2.5011L9.99998 8.58575L3.91536 2.50113L2.50115 3.91535L8.58577 9.99997L2.50112 16.0846L3.91533 17.4988L9.99998 11.4142L16.0847 17.4989L17.4989 16.0847L11.4142 9.99997L17.4989 3.91531Z"/>
      </svg>
    )
  });

  CloseLine20.displayName = 'CloseLine20';

  export default CloseLine20
