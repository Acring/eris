import React, { ForwardedRef, SVGProps } from 'react';

  const ExchangeLeftRightLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M6.08071 2.27988L5.23218 1.43135L1.97949 4.68405L5.23218 7.93674L6.08071 7.08821L4.27655 5.28405L13.1707 5.28405V4.08405L4.27654 4.08405L6.08071 2.27988ZM10.7665 14.5693L9.918 13.7208L11.7222 11.9166L2.82802 11.9166L2.82802 10.7166L11.7222 10.7166L9.91801 8.91248L10.7665 8.06395L14.0192 11.3166L10.7665 14.5693Z"/>
      </svg>
    )
  });

  ExchangeLeftRightLine16.displayName = 'ExchangeLeftRightLine16';

  export default ExchangeLeftRightLine16
