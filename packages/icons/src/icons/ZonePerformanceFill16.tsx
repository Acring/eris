import React, { ForwardedRef, SVGProps } from 'react';

  const ZonePerformanceFill16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path d="M4.90612 5.86266H2.52665V12.3998H4.90612V5.86266ZM9.18951 3.59979H6.81003V12.3998H9.18951V3.59979ZM13.4729 1.33691H11.0934V12.3998H13.4729V1.33691ZM1.33691 13.4054V14.6626H14.6626V13.4054H1.33691Z"/>
      </svg>
    )
  });

  ZonePerformanceFill16.displayName = 'ZonePerformanceFill16';

  export default ZonePerformanceFill16
