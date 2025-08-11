import React, { ForwardedRef, SVGProps } from 'react';

  const RegionLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M13.3 7.5C13.3 9.22143 12.0587 10.7863 10.4999 12.0345C9.75134 12.634 8.99619 13.106 8.42501 13.429C8.2667 13.5185 8.12361 13.5959 8 13.6609C7.87639 13.5959 7.7333 13.5185 7.57499 13.429C7.00381 13.106 6.24866 12.634 5.50008 12.0345C3.94129 10.7863 2.7 9.22143 2.7 7.5C2.7 4.57289 5.07289 2.2 8 2.2C10.9271 2.2 13.3 4.57289 13.3 7.5ZM14.5 7.5C14.5 12.0899 8 15 8 15C8 15 1.5 12.0899 1.5 7.5C1.5 3.91015 4.41015 1 8 1C11.5899 1 14.5 3.91015 14.5 7.5ZM9.55 6.95245C9.55 7.8085 8.85604 8.50245 8 8.50245C7.14396 8.50245 6.45 7.8085 6.45 6.95245C6.45 6.09641 7.14396 5.40245 8 5.40245C8.85604 5.40245 9.55 6.09641 9.55 6.95245ZM10.75 6.95245C10.75 8.47124 9.51878 9.70245 8 9.70245C6.48122 9.70245 5.25 8.47124 5.25 6.95245C5.25 5.43367 6.48122 4.20245 8 4.20245C9.51878 4.20245 10.75 5.43367 10.75 6.95245Z"/>
      </svg>
    )
  });

  RegionLine16.displayName = 'RegionLine16';

  export default RegionLine16
