import React, { ForwardedRef, SVGProps } from 'react';

  const RetractLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M5.45883 3.54872L3.29667 5.71089L5.45883 7.87305L4.6103 8.72157L1.59961 5.71089L4.6103 2.7002L5.45883 3.54872ZM13.9995 2.7002H7.99951V3.9002H13.9995V2.7002ZM13.9995 7.40027H7.99951V8.60027H13.9995V7.40027ZM13.9995 12.1002V13.3002H1.99951V12.1002H13.9995Z"/>
      </svg>
    )
  });

  RetractLine16.displayName = 'RetractLine16';

  export default RetractLine16
