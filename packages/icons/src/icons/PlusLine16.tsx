import React, { ForwardedRef, SVGProps } from 'react';

  const PlusLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M8.5999 2.5H7.3999V7.3999H2.5V8.5999H7.3999V13.5H8.5999V8.5999H13.5V7.3999H8.5999V2.5Z"/>
      </svg>
    )
  });

  PlusLine16.displayName = 'PlusLine16';

  export default PlusLine16
