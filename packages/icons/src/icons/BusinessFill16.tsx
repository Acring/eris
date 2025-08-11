import React, { ForwardedRef, SVGProps } from 'react';

  const BusinessFill16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M3.0869 2.20888L1.5 3.79541L4.941 7.23564L7.23509 4.94207L4.50127 2.20888C4.1107 1.8184 3.47746 1.8184 3.0869 2.20888ZM11.0586 8.76468L8.76447 11.0582L11.4985 13.7917C11.8891 14.1822 12.5223 14.1822 12.9129 13.7917L14.4998 12.2052L11.0586 8.76468ZM12.421 5.87527L13.7729 7.22718V2.22718L8.77295 2.22718L10.1272 3.58144L1.89105 11.8157L3.47795 13.4023C3.86852 13.7928 4.50175 13.7928 4.89232 13.4023L12.421 5.87527Z"/>
      </svg>
    )
  });

  BusinessFill16.displayName = 'BusinessFill16';

  export default BusinessFill16
