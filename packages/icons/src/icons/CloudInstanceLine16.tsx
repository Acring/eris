import React, { ForwardedRef, SVGProps } from 'react';

  const CloudInstanceLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path d="M6.36328 6.90026L8.02457 8.41497L9.73472 6.94912L11.9335 8.02408L12.3244 7.14457L9.58813 5.82531L8.02457 7.14457L6.55872 5.77645L3.82248 7.14457L4.26223 7.97521L6.36328 6.90026Z"/><path fillRule="evenodd" clipRule="evenodd" d="M13.9368 11.1512H2.06347V2.7959H13.9368V11.1512ZM3.0407 10.2228H13.0084V3.77313H3.0407V10.2228Z"/><path d="M0.646484 12.275H15.3538V13.2034H0.646484V12.275Z"/>
      </svg>
    )
  });

  CloudInstanceLine16.displayName = 'CloudInstanceLine16';

  export default CloudInstanceLine16
