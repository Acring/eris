import React, { ForwardedRef, SVGProps } from 'react';

  const LeftLine20 = React.forwardRef(({color = 'currentColor', size= 20, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" fill={color} {...otherProps} ref={ref}>
        <path d="M8.93901 10L13.889 5.05001L12.475 3.63601L6.11101 10L12.475 16.364L13.889 14.95L8.93901 10Z"/>
      </svg>
    )
  });

  LeftLine20.displayName = 'LeftLine20';

  export default LeftLine20
