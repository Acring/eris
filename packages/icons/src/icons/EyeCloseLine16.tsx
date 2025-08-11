import React, { ForwardedRef, SVGProps } from 'react';

  const EyeCloseLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M3.16265 8.25033C1.83001 7.20416 1 5.90647 1 5H2.2C2.2 5.11749 2.26765 5.42118 2.55967 5.8757C2.83675 6.30694 3.25959 6.7842 3.80722 7.22941C4.90876 8.12491 6.39958 8.8 8 8.8C9.60042 8.8 11.0912 8.12491 12.1928 7.22941C12.7404 6.7842 13.1633 6.30694 13.4403 5.8757C13.7324 5.42118 13.8 5.11749 13.8 5H15C15 5.90648 14.17 7.20416 12.8373 8.25033L14.0196 10.2981L12.9804 10.8981L11.8412 8.92494C10.8956 9.47294 9.79025 9.87162 8.60002 9.97412V12H7.40002V9.97412C6.20978 9.87163 5.10443 9.47295 4.1588 8.92494L3.01964 10.898L1.98041 10.298L3.16265 8.25033Z"/>
      </svg>
    )
  });

  EyeCloseLine16.displayName = 'EyeCloseLine16';

  export default EyeCloseLine16
