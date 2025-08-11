import React, { ForwardedRef, SVGProps } from 'react';

  const RightLine12 = React.forwardRef(({color = 'currentColor', size= 12, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 12 12" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M4.88909 9.88909L4.18198 9.18198L7.36396 6L4.18198 2.81802L4.88909 2.11091L8.77817 6L4.88909 9.88909Z"/>
      </svg>
    )
  });

  RightLine12.displayName = 'RightLine12';

  export default RightLine12
