import React, { ForwardedRef, SVGProps } from 'react';

  const WarnFill16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M8.86827 1.93355C8.48438 1.26174 7.51568 1.26173 7.13179 1.93355L0.854916 12.918C0.473966 13.5846 0.955333 14.4141 1.72316 14.4141H14.2768C15.0446 14.4141 15.526 13.5846 15.145 12.918L8.86827 1.93355ZM7.4001 9.9982H8.6001V4.99951H7.4001V9.9982ZM7.25 10.9982H8.75V12.4982H7.25V10.9982Z"/>
      </svg>
    )
  });

  WarnFill16.displayName = 'WarnFill16';

  export default WarnFill16
