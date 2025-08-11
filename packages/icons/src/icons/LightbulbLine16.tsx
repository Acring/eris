import React, { ForwardedRef, SVGProps } from 'react';

  const LightbulbLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M9.22316 10.0696L9.84076 9.72681C11.0118 9.07677 11.8 7.83029 11.8 6.40137C11.8 4.30269 10.0987 2.60137 8 2.60137C5.90132 2.60137 4.2 4.30269 4.2 6.40137C4.2 7.83029 4.98819 9.07677 6.15924 9.72681L6.77684 10.0696V10.776V11.4222H9.22316V10.776V10.0696ZM10.4232 10.776V11.6222C10.4232 12.1745 9.97544 12.6222 9.42316 12.6222H6.57684C6.02456 12.6222 5.57684 12.1745 5.57684 11.6222V10.776C4.04006 9.92295 3 8.28362 3 6.40137C3 3.63994 5.23858 1.40137 8 1.40137C10.7614 1.40137 13 3.63994 13 6.40137C13 8.28362 11.9599 9.92295 10.4232 10.776ZM9.75 13.3985V14.5985H6.25V13.3985H9.75ZM6.23223 6.95115L7.64645 8.36536L8 8.71892L8.35355 8.36536L9.76777 6.95115L9.06066 6.24404L8 7.3047L6.93934 6.24404L6.23223 6.95115Z"/>
      </svg>
    )
  });

  LightbulbLine16.displayName = 'LightbulbLine16';

  export default LightbulbLine16
