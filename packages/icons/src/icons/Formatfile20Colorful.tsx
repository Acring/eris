import React, { ForwardedRef, SVGProps } from 'react';

  const Formatfile20Colorful = React.forwardRef(({color = 'currentColor', size= 20, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" fill={color} {...otherProps} ref={ref}>
        <path d="M4.39999 1H13.0001L18.0001 6L18.0001 16.6C18.0001 17.92 16.9201 19 15.6001 19H4.39999C3.07999 19 2 17.92 2 16.6V3.4C2 2.08 3.07999 1 4.39999 1Z" fill="#A5ACC9"/><path opacity="0.5" d="M13.0001 1.00012L18.0001 6H14.2001C13.4801 6 13.0001 5.52 13.0001 4.8V1.00012Z" fill="white"/>
      </svg>
    )
  });

  Formatfile20Colorful.displayName = 'Formatfile20Colorful';

  export default Formatfile20Colorful
