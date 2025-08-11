import React, { ForwardedRef, SVGProps } from 'react';

  const ArrowLeftLine20 = React.forwardRef(({color = 'currentColor', size= 20, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M7.65673 4.34326L9.07095 5.75748L5.82842 9H18V11H5.82836L9.07104 14.2427L7.65682 15.6569L3.41418 11.4142L3.41409 11.4143L1.99988 10.0001L1.99997 10L3.41419 8.58582L7.65673 4.34326Z"/>
      </svg>
    )
  });

  ArrowLeftLine20.displayName = 'ArrowLeftLine20';

  export default ArrowLeftLine20
