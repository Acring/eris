import React, { ForwardedRef, SVGProps } from 'react';

  const MoreCircleFill16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM4 8.00001C4 7.50295 4.40294 7.10001 4.9 7.10001C5.39706 7.10001 5.8 7.50295 5.8 8.00001C5.8 8.49706 5.39706 8.90001 4.9 8.90001C4.40294 8.90001 4 8.49706 4 8.00001ZM8.10001 7.10001C7.60296 7.10001 7.20001 7.50295 7.20001 8.00001C7.20001 8.49706 7.60296 8.90001 8.10001 8.90001C8.59707 8.90001 9.00001 8.49706 9.00001 8.00001C9.00001 7.50295 8.59707 7.10001 8.10001 7.10001ZM10.4 8.00001C10.4 7.50295 10.803 7.10001 11.3 7.10001C11.7971 7.10001 12.2 7.50295 12.2 8.00001C12.2 8.49706 11.7971 8.90001 11.3 8.90001C10.803 8.90001 10.4 8.49706 10.4 8.00001Z"/>
      </svg>
    )
  });

  MoreCircleFill16.displayName = 'MoreCircleFill16';

  export default MoreCircleFill16
