import React, { ForwardedRef, SVGProps } from 'react';

  const FilterAdvancedFill16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M13.3995 1.98828H14.004V3.08828L13.3729 4.01328L10.1996 8.66398V13.5383L6.99958 14.7383L5.79958 15.1883V13.9067V8.66403L2.62627 4.01328L1.99512 3.08828V1.98828H2.59954H13.3995Z"/>
      </svg>
    )
  });

  FilterAdvancedFill16.displayName = 'FilterAdvancedFill16';

  export default FilterAdvancedFill16
