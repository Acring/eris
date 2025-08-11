import React, { ForwardedRef, SVGProps } from 'react';

  const DisableFill16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1ZM4.57574 5.42439L10.5757 11.4244L11.4243 10.5759L5.42426 4.57586L4.57574 5.42439Z"/>
      </svg>
    )
  });

  DisableFill16.displayName = 'DisableFill16';

  export default DisableFill16
