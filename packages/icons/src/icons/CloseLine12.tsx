import React, { ForwardedRef, SVGProps } from 'react';

  const CloseLine12 = React.forwardRef(({color = 'currentColor', size= 12, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 12 12" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M6 6.70708L9.29488 10.0017L10.002 9.29455L6.70713 6L10.002 2.70545L9.29488 1.99832L6 5.29292L2.70511 1.99832L1.99803 2.70545L5.29286 6L1.99803 9.29455L2.70511 10.0017L6 6.70708Z"/>
      </svg>
    )
  });

  CloseLine12.displayName = 'CloseLine12';

  export default CloseLine12
