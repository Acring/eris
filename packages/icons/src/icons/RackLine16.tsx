import React, { ForwardedRef, SVGProps } from 'react';

  const RackLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M4.30176 1.49805V14.5015H11.6975V1.49805H4.30176ZM10.7222 2.47331V4.05812H5.27702V2.47331H10.7222ZM5.27702 8.16232V9.74712H10.7629V8.16232H5.27702ZM10.7222 10.0722V11.657H5.27702V10.0722H10.7222ZM5.27702 6.25243V7.83723H10.7629V6.25243H5.27702ZM5.27702 5.92734V4.34254H10.7629V5.92734H5.27702ZM5.27702 11.9415V13.5263H10.7629V11.9415H5.27702Z"/>
      </svg>
    )
  });

  RackLine16.displayName = 'RackLine16';

  export default RackLine16
