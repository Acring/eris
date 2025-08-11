import React, { ForwardedRef, SVGProps } from 'react';

  const UnfoldLine12 = React.forwardRef(({color = 'currentColor', size= 12, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 12 12" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M9.88911 2.81801L9.182 2.1109L2.11093 9.18197L2.81804 9.88908L9.88911 2.81801ZM9.88911 6.35356L9.182 5.64645L5.64647 9.18199L6.35357 9.88909L9.88911 6.35356Z"/>
      </svg>
    )
  });

  UnfoldLine12.displayName = 'UnfoldLine12';

  export default UnfoldLine12
