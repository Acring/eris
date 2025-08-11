import React, { ForwardedRef, SVGProps } from 'react';

  const TransmissionFill16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8ZM7.47 4.90784V11.4078H6.33V6.28886L4.96113 7.66464L4.153 6.86058L6.49594 4.5058C6.65873 4.34219 6.90412 4.29289 7.11747 4.38095C7.33081 4.46901 7.47 4.67703 7.47 4.90784ZM8.53 11.0922V4.59216H9.67V9.71114L11.0389 8.33536L11.847 9.13942L9.50406 11.4942C9.34127 11.6578 9.09588 11.7071 8.88253 11.619C8.66919 11.531 8.53 11.323 8.53 11.0922Z"/>
      </svg>
    )
  });

  TransmissionFill16.displayName = 'TransmissionFill16';

  export default TransmissionFill16
