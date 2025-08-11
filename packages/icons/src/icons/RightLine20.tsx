import React, { ForwardedRef, SVGProps } from 'react';

  const RightLine20 = React.forwardRef(({color = 'currentColor', size= 20, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" fill={color} {...otherProps} ref={ref}>
        <path d="M11.061 10L6.11099 5.05001L7.52499 3.63601L13.889 10L7.52499 16.364L6.11099 14.95L11.061 10Z"/>
      </svg>
    )
  });

  RightLine20.displayName = 'RightLine20';

  export default RightLine20
