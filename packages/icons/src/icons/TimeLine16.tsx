import React, { ForwardedRef, SVGProps } from 'react';

  const TimeLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M13.3 8C13.3 10.9271 10.9271 13.3 8 13.3C5.07289 13.3 2.7 10.9271 2.7 8C2.7 5.07289 5.07289 2.7 8 2.7C10.9271 2.7 13.3 5.07289 13.3 8ZM14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8ZM7.20827 4.11255V8.61255V9.21255H7.80827H11.3083V8.01255H8.40827V4.11255H7.20827Z"/>
      </svg>
    )
  });

  TimeLine16.displayName = 'TimeLine16';

  export default TimeLine16
