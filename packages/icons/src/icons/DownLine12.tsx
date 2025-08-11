import React, { ForwardedRef, SVGProps } from 'react';

  const DownLine12 = React.forwardRef(({color = 'currentColor', size= 12, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 12 12" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M2.11092 4.88909L2.81802 4.18198L6 7.36396L9.18198 4.18198L9.88909 4.88909L6 8.77817L2.11092 4.88909Z"/>
      </svg>
    )
  });

  DownLine12.displayName = 'DownLine12';

  export default DownLine12
