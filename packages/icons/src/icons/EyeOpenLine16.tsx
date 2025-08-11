import React, { ForwardedRef, SVGProps } from 'react';

  const EyeOpenLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M13.8 8C13.8 8.11749 13.7324 8.42118 13.4403 8.8757C13.1633 9.30694 12.7404 9.7842 12.1928 10.2294C11.0912 11.1249 9.60042 11.8 8 11.8C6.39958 11.8 4.90876 11.1249 3.80722 10.2294C3.25959 9.7842 2.83675 9.30694 2.55967 8.8757C2.26765 8.42118 2.2 8.11749 2.2 8C2.2 7.88251 2.26765 7.57882 2.55967 7.1243C2.83675 6.69306 3.25959 6.2158 3.80722 5.77059C4.90876 4.87509 6.39958 4.2 8 4.2C9.60042 4.2 11.0912 4.87509 12.1928 5.77059C12.7404 6.2158 13.1633 6.69306 13.4403 7.1243C13.7324 7.57882 13.8 7.88251 13.8 8ZM15 8C15 9.76142 11.866 13 8 13C4.13401 13 1 9.76142 1 8C1 6.23858 4.13401 3 8 3C11.866 3 15 6.23858 15 8ZM9.3 8C9.3 8.71797 8.71797 9.3 8 9.3C7.28203 9.3 6.7 8.71797 6.7 8C6.7 7.28203 7.28203 6.7 8 6.7C8.71797 6.7 9.3 7.28203 9.3 8ZM10.5 8C10.5 9.38071 9.38071 10.5 8 10.5C6.61929 10.5 5.5 9.38071 5.5 8C5.5 6.61929 6.61929 5.5 8 5.5C9.38071 5.5 10.5 6.61929 10.5 8Z"/>
      </svg>
    )
  });

  EyeOpenLine16.displayName = 'EyeOpenLine16';

  export default EyeOpenLine16
