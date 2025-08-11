import React, { ForwardedRef, SVGProps } from 'react';

  const QrCodeLine = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path d="M10.6667 11.3333V10.6667H8.66667V8.66667H10.6667V10H12V11.3333H11.3333V12.6667H10V14H8.66667V12H10V11.3333H10.6667ZM14 14H11.3333V12.6667H12.6667V11.3333H14V14ZM2 2H7.33333V7.33333H2V2ZM3.33333 3.33333V6H6V3.33333H3.33333ZM8.66667 2H14V7.33333H8.66667V2ZM10 3.33333V6H12.6667V3.33333H10ZM2 8.66667H7.33333V14H2V8.66667ZM3.33333 10V12.6667H6V10H3.33333ZM12 8.66667H14V10H12V8.66667ZM4 4H5.33333V5.33333H4V4ZM4 10.6667H5.33333V12H4V10.6667ZM10.6667 4H12V5.33333H10.6667V4Z"/>
      </svg>
    )
  });

  QrCodeLine.displayName = 'QrCodeLine';

  export default QrCodeLine
