import React, { ForwardedRef, SVGProps } from 'react';

  const DeleteLine12 = React.forwardRef(({color = 'currentColor', size= 12, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 12 12" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M7.5 2H4.5V3H7.5V2ZM8.5 3V2C8.5 1.44772 8.05228 1 7.5 1H4.5C3.94772 1 3.5 1.44772 3.5 2V3H3H1V4H2V10C2 10.5523 2.44772 11 3 11H9C9.55228 11 10 10.5523 10 10V4H11V3H9H8.5ZM9 4H7.5H4.5H3V10H9V4ZM4.5 8.5V5.5H5.5V8.5H4.5ZM6.5 5.5V8.5H7.5V5.5H6.5Z"/>
      </svg>
    )
  });

  DeleteLine12.displayName = 'DeleteLine12';

  export default DeleteLine12
