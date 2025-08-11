import React, { ForwardedRef, SVGProps } from 'react';

  const DeleteLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M6.2 3.04863V4.15174H9.8V3.04863H6.2ZM6 1.84863C5.44772 1.84863 5 2.29635 5 2.84863V4.15186H4H1.5V5.35186H3V13.1519C3 13.7041 3.44772 14.1519 4 14.1519H12C12.5523 14.1519 13 13.7041 13 13.1519V5.35186H14.5V4.15186H12H11V2.84863C11 2.29635 10.5523 1.84863 10 1.84863H6ZM11.8 5.35186H4.2V12.9519H11.8V5.35186ZM5.8999 6.65186H7.0999V11.6519H5.8999V6.65186ZM10.0999 6.65186H8.8999V11.6519H10.0999V6.65186Z"/>
      </svg>
    )
  });

  DeleteLine16.displayName = 'DeleteLine16';

  export default DeleteLine16
