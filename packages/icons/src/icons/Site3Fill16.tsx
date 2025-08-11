import React, { ForwardedRef, SVGProps } from 'react';

  const Site3Fill16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M14.3967 5.35689L14.3976 11.5824L8.62669 14.913L8.70866 8.19598L14.3967 5.35689ZM1.60254 5.25617L7.28269 8.18512L7.20172 14.8153L1.60296 11.5824L1.60254 5.25617ZM7.9473 1.08789L13.9573 3.98228L8.00535 6.95364L2.14369 3.92994L7.9473 1.08789Z"/>
      </svg>
    )
  });

  Site3Fill16.displayName = 'Site3Fill16';

  export default Site3Fill16
