import React, { ForwardedRef, SVGProps } from 'react';

  const CloseCircleFill16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM4.65147 5.49999L5.5 4.65146L8 7.15146L10.5 4.65146L11.3485 5.49999L8.84853 7.99999L11.3485 10.5L10.5 11.3485L8 8.84851L5.5 11.3485L4.65147 10.5L7.15147 7.99999L4.65147 5.49999Z"/>
      </svg>
    )
  });

  CloseCircleFill16.displayName = 'CloseCircleFill16';

  export default CloseCircleFill16
