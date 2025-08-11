import React, { ForwardedRef, SVGProps } from 'react';

  const CdFill16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM12.5 8C12.5 7.72386 12.7239 7.5 13 7.5C13.2761 7.5 13.5 7.72386 13.5 8C13.5 11.0376 11.0376 13.5 8 13.5C7.72386 13.5 7.5 13.2761 7.5 13C7.5 12.7239 7.72386 12.5 8 12.5C10.4853 12.5 12.5 10.4853 12.5 8ZM11 8C11 9.65685 9.65685 11 8 11C6.34315 11 5 9.65685 5 8C5 6.34315 6.34315 5 8 5C9.65685 5 11 6.34315 11 8ZM8 9C8.55229 9 9 8.55229 9 8C9 7.44772 8.55229 7 8 7C7.44772 7 7 7.44772 7 8C7 8.55229 7.44772 9 8 9Z"/>
      </svg>
    )
  });

  CdFill16.displayName = 'CdFill16';

  export default CdFill16
