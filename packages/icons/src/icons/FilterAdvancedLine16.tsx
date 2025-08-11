import React, { ForwardedRef, SVGProps } from 'react';

  const FilterAdvancedLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M13.3995 1.98828H14.004V3.08828L13.3729 4.01328L10.1996 8.66398V13.5383L6.99958 14.7383L5.79958 15.1883V13.9067V8.66403L2.62627 4.01328L1.99512 3.08828V1.98828H2.59954H13.3995ZM3.38133 3.08828L6.99958 8.36161V8.66403V13.4567L8.99958 12.7067V8.66398V8.36153L12.6178 3.08828H3.38133Z"/>
      </svg>
    )
  });

  FilterAdvancedLine16.displayName = 'FilterAdvancedLine16';

  export default FilterAdvancedLine16
