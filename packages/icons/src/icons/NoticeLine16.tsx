import React, { ForwardedRef, SVGProps } from 'react';

  const NoticeLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M8 13.8C11.2033 13.8 13.8 11.2033 13.8 8C13.8 4.79675 11.2033 2.2 8 2.2C4.79675 2.2 2.2 4.79675 2.2 8C2.2 11.2033 4.79675 13.8 8 13.8ZM8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM8.6001 8.50049H7.4001V4.49966H8.6001V8.50049ZM8.75 11.5005V10.0005H7.25V11.5005H8.75Z"/>
      </svg>
    )
  });

  NoticeLine16.displayName = 'NoticeLine16';

  export default NoticeLine16
