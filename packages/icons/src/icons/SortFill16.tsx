import React, { ForwardedRef, SVGProps } from 'react';

  const SortFill16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path d="M11.5 6.5 8 2.5 4.5 6.5H11.5ZM4.5 9.5 8 13.5 11.5 9.5 4.5 9.5Z"/>
      </svg>
    )
  });

  SortFill16.displayName = 'SortFill16';

  export default SortFill16
