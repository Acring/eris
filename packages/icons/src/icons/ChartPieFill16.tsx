import React, { ForwardedRef, SVGProps } from 'react';

  const ChartPieFill16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M8.82391 7.58826V1C10.4617 0.999592 12.0327 1.64948 13.1915 2.80683C14.3498 3.9639 15.0004 5.53354 15.0004 7.1699C15.0004 7.31031 14.9938 7.44908 14.9848 7.58826H8.82391ZM1.00177 8.26031C1.08412 4.67998 4.01426 1.8211 7.60033 1.82356V8.85736H14.1767C13.9337 12.4307 10.8784 15.1553 7.29728 14.9931C3.71531 14.8309 0.919414 11.8406 1.00177 8.26031Z"/>
      </svg>
    )
  });

  ChartPieFill16.displayName = 'ChartPieFill16';

  export default ChartPieFill16
