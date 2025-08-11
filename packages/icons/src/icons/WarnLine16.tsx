import React, { ForwardedRef, SVGProps } from 'react';

  const WarnLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M8.00003 2.8328L2.06779 13.2141H13.9322L8.00003 2.8328ZM8.86827 1.93355C8.48438 1.26174 7.51568 1.26173 7.13179 1.93355L0.854916 12.918C0.473966 13.5846 0.955333 14.4141 1.72316 14.4141H14.2768C15.0446 14.4141 15.526 13.5846 15.145 12.918L8.86827 1.93355ZM8.6001 9.76025H7.4001V5.76157L8.6001 5.76157V9.76025ZM8.75 10.7603H7.25V12.2603H8.75V10.7603Z"/>
      </svg>
    )
  });

  WarnLine16.displayName = 'WarnLine16';

  export default WarnLine16
