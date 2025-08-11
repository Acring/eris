import React, { ForwardedRef, SVGProps } from 'react';

  const DownloadDriftLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <g clipPath="url(#clip0_660_22)"><path d="M4.90029 7.15137L7.39648 9.64756V4.30029H8.59648V9.65505L11.1002 7.15137L11.9487 7.9999L8.42449 11.5241C8.32124 11.6274 8.18972 11.6851 8.05485 11.6974C8.03564 11.6992 8.01617 11.7002 7.99648 11.7002C7.8096 11.7002 7.64267 11.6147 7.53263 11.4808L4.05176 7.9999L4.90029 7.15137Z"/><path fillRule="evenodd" clipRule="evenodd" d="M0.733398 8.00007C0.733398 3.98679 3.98679 0.733398 8.00007 0.733398C12.0133 0.733398 15.2667 3.98679 15.2667 8.00007C15.2667 12.0133 12.0133 15.2667 8.00007 15.2667C3.98679 15.2667 0.733398 12.0133 0.733398 8.00007ZM8.00007 1.9334C4.64954 1.9334 1.9334 4.64954 1.9334 8.00007C1.9334 11.3506 4.64954 14.0667 8.00007 14.0667C11.3506 14.0667 14.0667 11.3506 14.0667 8.00007C14.0667 4.64954 11.3506 1.9334 8.00007 1.9334Z"/></g><defs><clipPath id="clip0_660_22"><path d="M0 0H16V16H0z"/></clipPath></defs>
      </svg>
    )
  });

  DownloadDriftLine16.displayName = 'DownloadDriftLine16';

  export default DownloadDriftLine16
