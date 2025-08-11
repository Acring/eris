import React, { ForwardedRef, SVGProps } from 'react';

  const UpLine12 = React.forwardRef(({color = 'currentColor', size= 12, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 12 12" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M9.88909 7.11091L9.18198 7.81802L6 4.63604L2.81802 7.81802L2.11091 7.11091L6 3.22183L9.88909 7.11091Z"/>
      </svg>
    )
  });

  UpLine12.displayName = 'UpLine12';

  export default UpLine12
