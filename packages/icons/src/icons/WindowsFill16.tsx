import React, { ForwardedRef, SVGProps } from 'react';

  const WindowsFill16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M7.63049 3.08524V7.63383H13.8371V2.17383L7.63049 3.08524ZM2.16699 7.63978V3.86333L6.87467 3.18311V7.63978H2.16699ZM2.16699 12.1418V8.3689H6.88265V12.8206L2.16699 12.1418ZM7.63049 8.3689V12.9363L13.8335 13.8313V8.3689H7.63049Z"/>
      </svg>
    )
  });

  WindowsFill16.displayName = 'WindowsFill16';

  export default WindowsFill16
