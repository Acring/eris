import React, { ForwardedRef, SVGProps } from 'react';

  const MonitoringFill16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M14.5 2.2207H1.5V4.2207H14.5V2.2207ZM1.5 5.27856H14.5V8.82085H11.5H11.2622L11.089 8.9837L9.67336 10.3146L6.83009 6.81522L6.37132 6.25058L5.90434 6.80844L4.21978 8.82085H1.5V5.27856ZM11.7378 10.0208H14.5V12.7786C14.5 13.3308 14.0523 13.7786 13.5 13.7786H2.5C1.94772 13.7786 1.5 13.3308 1.5 12.7786V10.0208H4.5H4.78022L4.96008 9.80597L6.35752 8.13657L9.14875 11.5719L9.55548 12.0725L10.0254 11.6307L11.7378 10.0208Z"/>
      </svg>
    )
  });

  MonitoringFill16.displayName = 'MonitoringFill16';

  export default MonitoringFill16
