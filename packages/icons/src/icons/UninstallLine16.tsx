import React, { ForwardedRef, SVGProps } from 'react';

  const UninstallLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M8 1.4834L10.5981 4.4834H8.59999V7.4834H7.39999V4.4834H5.40192L8 1.4834ZM3.2 10.6834V13.4088H12.8V10.6834H3.2ZM3.2 9.4834V3.62423H5V2.51654H3C2.44772 2.51654 2 2.92982 2 3.43962V13.5935C2 14.1033 2.44772 14.5165 3 14.5165H13C13.5523 14.5165 14 14.1033 14 13.5935V3.43962C14 2.92982 13.5523 2.51654 13 2.51654H11V3.62423H12.8V9.4834H3.2ZM10 11.4834H11.2V12.6834H10V11.4834Z"/>
      </svg>
    )
  });

  UninstallLine16.displayName = 'UninstallLine16';

  export default UninstallLine16
