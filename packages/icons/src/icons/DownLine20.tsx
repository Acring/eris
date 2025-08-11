import React, { ForwardedRef, SVGProps } from 'react';

  const DownLine20 = React.forwardRef(({color = 'currentColor', size= 20, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" fill={color} {...otherProps} ref={ref}>
        <path d="M10 11.061L14.95 6.11099L16.364 7.52499L10 13.889L3.636 7.52499L5.05 6.11099L10 11.061Z"/>
      </svg>
    )
  });

  DownLine20.displayName = 'DownLine20';

  export default DownLine20
