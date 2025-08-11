import React, { ForwardedRef, SVGProps } from 'react';

  const LightbulbClosedFill16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M11.2756 2.80734L4.73014 9.35335C3.85857 8.48732 3.36867 7.30927 3.36914 6.0806C3.36951 4.20748 4.49817 2.51902 6.22883 1.80253C7.9595 1.08604 9.95136 1.48262 11.2756 2.80734ZM12.631 6.0806C12.6321 5.03015 12.274 4.0109 11.6161 3.19195L5.10243 9.70616C5.27525 9.8841 5.71729 10.3831 5.70857 10.8395H10.5377C10.5377 10.8395 10.4828 10.1061 10.9705 9.63334H10.9685C12.0228 8.75477 12.6319 7.45298 12.631 6.0806ZM5.74088 11.2031H10.4305V11.5877H5.74088V11.2031ZM5.74088 11.9615H10.4305V12.3461H5.74088V11.9615ZM5.74088 13.2594V12.7066H10.3874V13.2594C9.61823 14.4856 8.36082 14.5497 8.36082 14.5497H7.66391C6.48599 14.3733 5.74088 13.2594 5.74088 13.2594Z"/>
      </svg>
    )
  });

  LightbulbClosedFill16.displayName = 'LightbulbClosedFill16';

  export default LightbulbClosedFill16
