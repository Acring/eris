import React, { ForwardedRef, SVGProps } from 'react';

  const DoneFill16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8ZM12.3485 6.09097L7.11614 11.3234L4.21701 8.42423L5.06554 7.5757L7.11614 9.6263L11.5 5.24244L12.3485 6.09097Z"/>
      </svg>
    )
  });

  DoneFill16.displayName = 'DoneFill16';

  export default DoneFill16
