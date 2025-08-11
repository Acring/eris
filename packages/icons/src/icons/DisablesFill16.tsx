import React, { ForwardedRef, SVGProps } from 'react';

  const DisablesFill16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M8.16504 14.502C11.7549 14.502 14.665 11.5918 14.665 8.00195C14.665 4.4121 11.7549 1.50195 8.16504 1.50195C4.57519 1.50195 1.66504 4.4121 1.66504 8.00195C1.66504 11.5918 4.57519 14.502 8.16504 14.502ZM10.3807 5.89803H5.86289V10.1378H10.3807V5.89803Z"/>
      </svg>
    )
  });

  DisablesFill16.displayName = 'DisablesFill16';

  export default DisablesFill16
