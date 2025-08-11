import React, { ForwardedRef, SVGProps } from 'react';

  const LeftLine12 = React.forwardRef(({color = 'currentColor', size= 12, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 12 12" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M7.11091 2.11091L7.81802 2.81802L4.63604 6L7.81802 9.18198L7.11091 9.88909L3.22183 6L7.11091 2.11091Z"/>
      </svg>
    )
  });

  LeftLine12.displayName = 'LeftLine12';

  export default LeftLine12
