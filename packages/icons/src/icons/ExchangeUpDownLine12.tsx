import React, { ForwardedRef, SVGProps } from 'react';

  const ExchangeUpDownLine12 = React.forwardRef(({color = 'currentColor', size= 12, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 12 12" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M10.9749 3.97487L10.2678 4.68198L8.97487 3.38909L8.97487 10.0049H7.97487L7.97487 3.43934L6.73223 4.68198L6.02512 3.97487L8.5 1.5L10.9749 3.97487ZM5.97487 8.02513L5.26776 7.31802L3.97487 8.61091L3.97487 1.9951L2.97487 1.9951L2.97487 8.56066L1.73223 7.31802L1.02512 8.02513L3.5 10.5L5.97487 8.02513Z"/>
      </svg>
    )
  });

  ExchangeUpDownLine12.displayName = 'ExchangeUpDownLine12';

  export default ExchangeUpDownLine12
