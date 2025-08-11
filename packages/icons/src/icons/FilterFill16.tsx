import React, { ForwardedRef, SVGProps } from 'react';

  const FilterFill16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path d="M6.90028 8.82482L3.60059 3.87529V2.77539H12.3998V3.87529L9.10007 8.82482V12.1245L6.90028 13.2244V8.82482Z"/>
      </svg>
    )
  });

  FilterFill16.displayName = 'FilterFill16';

  export default FilterFill16
