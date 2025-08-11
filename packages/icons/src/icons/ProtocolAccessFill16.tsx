import React, { ForwardedRef, SVGProps } from 'react';

  const ProtocolAccessFill16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M1.43945 2.48047C1.43945 1.92818 1.88717 1.48047 2.43945 1.48047H10.9329C11.4852 1.48047 11.9329 1.92818 11.9329 2.48047V7.86676H11.9329C8.73155 7.86676 6.13638 10.4214 6.13638 13.5727C6.13638 13.8029 6.15023 14.0299 6.17716 14.2531H2.43945C1.88717 14.2531 1.43945 13.8053 1.43945 13.2531V2.48047ZM3.37268 4.02307H8.37268V5.02307H3.37268V4.02307ZM6.65718 6.4325H3.37268V7.4325H6.65718V6.4325ZM14.4228 11.4148L11.0264 14.2531V12.4791H10.3471C9.17266 12.4791 8.15306 13.171 7.64088 14.1856C7.63341 14.0909 7.63001 13.9951 7.63001 13.8983C7.63001 11.9388 9.15058 10.3505 11.0264 10.3505V8.57655L14.4228 11.4148Z"/>
      </svg>
    )
  });

  ProtocolAccessFill16.displayName = 'ProtocolAccessFill16';

  export default ProtocolAccessFill16
