import React, { ForwardedRef, SVGProps } from 'react';

  const DownloadDriftFill16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <g clipPath="url(#clip0_899_62)"><path fillRule="evenodd" clipRule="evenodd" d="M8.00007 0.733398C3.98679 0.733398 0.733398 3.98679 0.733398 8.00007C0.733398 12.0133 3.98679 15.2667 8.00007 15.2667C12.0133 15.2667 15.2667 12.0133 15.2667 8.00007C15.2667 3.98679 12.0133 0.733398 8.00007 0.733398ZM7.39648 9.64805L4.90029 7.15186L4.05176 8.00039L7.53262 11.4813C7.64266 11.6152 7.80959 11.7007 7.99648 11.7007C8.01617 11.7007 8.03564 11.6997 8.05484 11.6978C8.18971 11.6856 8.32123 11.6278 8.42449 11.5246L11.9487 8.00039L11.1002 7.15186L8.59648 9.65554V4.30078H7.39648V9.64805Z"/></g><defs><clipPath id="clip0_899_62"><path d="M0 0H16V16H0z"/></clipPath></defs>
      </svg>
    )
  });

  DownloadDriftFill16.displayName = 'DownloadDriftFill16';

  export default DownloadDriftFill16
