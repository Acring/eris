import React, { ForwardedRef, SVGProps } from 'react';

  const AsteriskLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path d="M7.2072 4H8.792L8.6024 7.3224L11.5 6.096L12 7.6472L8.948 8.5152L11.0344 10.9896L9.8104 12L8 9.2368L6.1728 12L4.9488 10.9888L7.0344 8.5144L4 7.648L4.5 6.0952L7.396 7.3224L7.2072 4Z"/>
      </svg>
    )
  });

  AsteriskLine16.displayName = 'AsteriskLine16';

  export default AsteriskLine16
