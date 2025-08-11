import React, { ForwardedRef, SVGProps } from 'react';

  const MinusLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M13.3329 7.2002H2.66628C2.07641 7.2002 1.59961 7.5586 1.59961 8.0002C1.59961 8.4418 2.07641 8.8002 2.66628 8.8002H13.3329C13.9228 8.8002 14.3996 8.4418 14.3996 8.0002C14.3996 7.5586 13.9228 7.2002 13.3329 7.2002Z"/>
      </svg>
    )
  });

  MinusLine16.displayName = 'MinusLine16';

  export default MinusLine16
