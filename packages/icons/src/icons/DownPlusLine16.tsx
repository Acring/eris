import React, { ForwardedRef, SVGProps } from 'react';

  const DownPlusLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M2.88075 5.06836L7.9999 10.1875L13.119 5.06836L13.9676 5.91689L7.9999 11.8846L2.03223 5.91689L2.88075 5.06836Z"/>
      </svg>
    )
  });

  DownPlusLine16.displayName = 'DownPlusLine16';

  export default DownPlusLine16
