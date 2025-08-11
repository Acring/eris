import React, { ForwardedRef, SVGProps } from 'react';

  const PathDownLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path d="M8.55041 1.875H7.45041V2.925H8.55041V1.875ZM11.0004 9.525 11.8004 8.775 12.6004 9.525 8.00039 14.125 3.40039 9.525 4.20039 8.775 7.45039 12.025V4.025H8.55039V12.025L10.4004 10.175 11.0004 9.525Z"/>
      </svg>
    )
  });

  PathDownLine16.displayName = 'PathDownLine16';

  export default PathDownLine16
