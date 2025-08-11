import React, { ForwardedRef, SVGProps } from 'react';

  const PauseFill16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8ZM7.16667 5.5H5.5V10.5H7.16667V5.5ZM10.5 5.5H8.83333V10.5H10.5V5.5Z"/>
      </svg>
    )
  });

  PauseFill16.displayName = 'PauseFill16';

  export default PauseFill16
