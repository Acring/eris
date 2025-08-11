import React, { ForwardedRef, SVGProps } from 'react';

  const PathUpLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path d="M5.00039 6.475 4.20039 7.275 3.40039 6.475 4.20039 5.675 4.85039 5.075 5.20039 4.725 8.00039 1.875 12.6004 6.475 11.8004 7.275 8.55039 4.025V11.975H7.45039V4.025L5.95039 5.475 5.60039 5.825 5.00039 6.475ZM8.55041 13.075H7.45041V14.125H8.55041V13.075Z"/>
      </svg>
    )
  });

  PathUpLine16.displayName = 'PathUpLine16';

  export default PathUpLine16
