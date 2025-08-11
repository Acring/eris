import React, { ForwardedRef, SVGProps } from 'react';

  const HostVerifierPortLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M10.6918 5.7947H10.1147V3.42899H6.02327V5.7947H5.44613V5.79471H3.42899V12.6519H12.709V5.79471H10.6918V5.7947ZM11.2576 4.65186V2.28613H4.88042V4.65186H2.28613V13.7947H13.8518V4.65186H11.2576ZM4.98899 7.93756H6.13185V10.509H4.98899V7.93756ZM8.64042 7.93756H7.49756V10.509H8.64042V7.93756ZM10.0061 7.93756H11.149V10.509H10.0061V7.93756Z"/>
      </svg>
    )
  });

  HostVerifierPortLine16.displayName = 'HostVerifierPortLine16';

  export default HostVerifierPortLine16
