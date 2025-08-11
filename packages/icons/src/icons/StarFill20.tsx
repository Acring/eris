import React, { ForwardedRef, SVGProps } from 'react';

  const StarFill20 = React.forwardRef(({color = 'currentColor', size= 20, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" fill={color} {...otherProps} ref={ref}>
        <path d="M10 13.6895L7.24158 15.3131C6.8714 15.531 6.41691 15.2114 6.49665 14.7894L7.12012 11.4894L4.74647 9.18148C4.44577 8.88911 4.61697 8.37874 5.03315 8.32684L8.21992 7.92942L9.54212 4.91561C9.71709 4.51678 10.2829 4.51678 10.4579 4.91561L11.7801 7.92942L14.9668 8.32684C15.383 8.37874 15.5542 8.88911 15.2535 9.18148L12.8799 11.4894L13.5033 14.7894C13.5831 15.2114 13.1286 15.531 12.7584 15.3131L10 13.6895Z"/>
      </svg>
    )
  });

  StarFill20.displayName = 'StarFill20';

  export default StarFill20
