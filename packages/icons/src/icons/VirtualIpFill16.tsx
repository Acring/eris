import React, { ForwardedRef, SVGProps } from 'react';

  const VirtualIpFill16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path d="M8.64774 3.92505H9.78451C10.3263 3.92505 10.7407 4.00675 10.9956 4.2086C11.2506 4.39983 11.3781 4.84933 11.3781 5.30616C11.3781 5.76299 11.2506 6.09233 10.9956 6.29419C10.7407 6.48542 10.337 6.59166 9.78451 6.59166H8.64774V3.92505Z"/><path fillRule="evenodd" clipRule="evenodd" d="M1.40625 2C1.40625 1.44772 1.85397 1 2.40625 1H13.5996C14.1519 1 14.5996 1.44772 14.5996 2V10.5983C14.5996 11.1506 14.1519 11.5983 13.5996 11.5983H2.40625C1.85397 11.5983 1.40625 11.1506 1.40625 10.5983V2ZM4.66406 2.59277V9.89673H5.99205V2.59277H4.66406ZM7.32005 2.59537V9.89932H8.64804L8.64774 7.90903L9.85887 7.90902C11.7074 7.90902 12.6317 6.86788 12.6317 5.30616C12.6317 3.75506 11.7077 2.59537 9.88041 2.59537H7.32005Z"/><path d="M1.74902 13C1.33535 13 1 13.3353 1 13.749C1 14.1627 1.33535 14.498 1.74902 14.498H14.251C14.6647 14.498 15 14.1627 15 13.749C15 13.3353 14.6647 13 14.251 13H1.74902Z"/>
      </svg>
    )
  });

  VirtualIpFill16.displayName = 'VirtualIpFill16';

  export default VirtualIpFill16
