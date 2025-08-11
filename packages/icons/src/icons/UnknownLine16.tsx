import React, { ForwardedRef, SVGProps } from 'react';

  const UnknownLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M13.8 8C13.8 11.2033 11.2033 13.8 8 13.8C4.79675 13.8 2.2 11.2033 2.2 8C2.2 4.79675 4.79675 2.2 8 2.2C11.2033 2.2 13.8 4.79675 13.8 8ZM15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8ZM8.75 9.83084V9.1301C9.90425 8.80363 10.75 7.74239 10.75 6.48361C10.75 4.96483 9.51878 3.73361 8 3.73361C6.48122 3.73361 5.25 4.96483 5.25 6.48361L5.25009 6.50662H6.45017L6.45 6.48361C6.45 5.62757 7.14396 4.93361 8 4.93361C8.85604 4.93361 9.55 5.62757 9.55 6.48361C9.55 7.32277 8.88315 8.00617 8.05046 8.03281H7.25V9.83084H8.75ZM8.75 12.3308V10.8308H7.25V12.3308H8.75Z"/>
      </svg>
    )
  });

  UnknownLine16.displayName = 'UnknownLine16';

  export default UnknownLine16
