import React, { ForwardedRef, SVGProps } from 'react';

  const UrgentFill16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM8.93645 3.82324L7.99212 7.05176H11.8814L7.08614 12.2814L7.99212 9.0342H4.04688L8.93645 3.82324Z"/>
      </svg>
    )
  });

  UrgentFill16.displayName = 'UrgentFill16';

  export default UrgentFill16
