import React, { ForwardedRef, SVGProps } from 'react';

  const CalendarLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M4.90002 5V4.2H3.2V6H12.8V4.2H11.1V5H9.90002V4.2H6.10002V5H4.90002ZM9.90002 3H6.10002V2H4.90002V3H3C2.44772 3 2 3.44771 2 4V13C2 13.5523 2.44772 14 3 14H13C13.5523 14 14 13.5523 14 13V4C14 3.44772 13.5523 3 13 3H11.1V2H9.90002V3ZM3.2 7.2V12.8H12.8V7.2H3.2ZM11 9.5999H5V8.3999H11V9.5999ZM5 11.5999H11V10.3999H5V11.5999Z"/>
      </svg>
    )
  });

  CalendarLine16.displayName = 'CalendarLine16';

  export default CalendarLine16
