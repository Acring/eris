import React, { ForwardedRef, SVGProps } from 'react';

  const ControllerLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M6.5 8.1V4H5.5V8.1C4.9 8.3 4.5 8.85 4.5 9.5 4.5 10.15 4.9 10.7 5.5 10.9V12H6.5V10.9C7.1 10.7 7.5 10.15 7.5 9.5 7.5 8.85 7.1 8.3 6.5 8.1ZM6 10.5C5.45 10.5 5 10.05 5 9.5 5 8.95 5.45 8.5 6 8.5 6.55 8.5 7 8.95 7 9.5 7 10.05 6.55 10.5 6 10.5ZM10.5 4V5.1C11.1 5.3 11.5 5.85 11.5 6.5 11.5 7.15 11.1 7.7 10.5 7.9V12H9.5V7.9C8.9 7.7 8.5 7.15 8.5 6.5 8.5 5.85 8.9 5.3 9.5 5.1V4H10.5ZM9 6.5C9 7.05 9.45 7.5 10 7.5 10.55 7.5 11 7.05 11 6.5 11 5.95 10.55 5.5 10 5.5 9.45 5.5 9 5.95 9 6.5Z"/><path fillRule="evenodd" clipRule="evenodd" d="M13 2H3C2.45 2 2 2.45 2 3V13C2 13.55 2.45 14 3 14H13C13.55 14 14 13.55 14 13V3C14 2.45 13.55 2 13 2ZM13 12.5C13 12.8 12.8 13 12.5 13H3.5C3.2 13 3 12.8 3 12.5V3.5C3 3.2 3.2 3 3.5 3H12.5C12.8 3 13 3.2 13 3.5V12.5Z"/>
      </svg>
    )
  });

  ControllerLine16.displayName = 'ControllerLine16';

  export default ControllerLine16
