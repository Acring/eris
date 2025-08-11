import React, { ForwardedRef, SVGProps } from 'react';

  const StandardDnLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path d="M3.80172 5.96851H12.2733V6.87269H3.80172V5.96851ZM3.80172 9.29122H12.2733V10.1954H3.80172V9.29122Z"/><path fillRule="evenodd" clipRule="evenodd" d="M14.8033 13.766H1.19727V2.63379H14.8033V13.766ZM2.10145 3.53701V12.8614L13.8991 12.8551V3.53701H2.10145Z"/>
      </svg>
    )
  });

  StandardDnLine16.displayName = 'StandardDnLine16';

  export default StandardDnLine16
