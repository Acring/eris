import React, { ForwardedRef, SVGProps } from 'react';

  const UpLine20 = React.forwardRef(({color = 'currentColor', size= 20, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" fill={color} {...otherProps} ref={ref}>
        <path d="M10 8.93904L14.95 13.889L16.364 12.475L10 6.11104L3.636 12.475L5.05 13.889L10 8.93904Z"/>
      </svg>
    )
  });

  UpLine20.displayName = 'UpLine20';

  export default UpLine20
