import React, { ForwardedRef, SVGProps } from 'react';

  const VmFill16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M1.2002 3C1.2002 2.44772 1.64791 2 2.2002 2H13.8002C14.1525 2 14.8002 2.44772 14.8002 3V11C14.8002 11.5523 14.3525 12 13.8002 12H10.1093V13H12.0002V14.2H4.0002V13H5.89107L5.89107 12H2.2002C1.64791 12 1.2002 11.5523 1.2002 11V3ZM8.90932 13V12H7.09107V13H8.90932ZM2.40024 4.76807L4.07324 9.62607H5.39624L7.10424 4.76807H5.99824L4.78724 8.49207H4.74524L3.57624 4.76807H2.40024ZM7.87594 4.76807V9.62607H8.91194V5.80407H8.95394L9.87794 8.70907H10.9419L11.8799 5.80407H11.9219V9.62607H12.9719V4.76807H11.2919L10.4519 7.50507H10.4099L9.60494 4.76807H7.87594Z"/>
      </svg>
    )
  });

  VmFill16.displayName = 'VmFill16';

  export default VmFill16
