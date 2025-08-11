import React, { ForwardedRef, SVGProps } from 'react';

  const ErrorFill16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M15.3642 7.99998L7.99998 0.635742L0.635742 7.99998L7.99998 15.3642L15.3642 7.99998ZM5.53888 7.19695C5.09674 7.19695 4.73832 7.55783 4.73832 7.99997C4.73832 8.44211 5.09674 8.80299 5.53888 8.80299H10.4612C10.9033 8.80299 11.2618 8.44211 11.2618 7.99997C11.2618 7.55783 10.9033 7.19695 10.4612 7.19695H5.53888Z"/>
      </svg>
    )
  });

  ErrorFill16.displayName = 'ErrorFill16';

  export default ErrorFill16
