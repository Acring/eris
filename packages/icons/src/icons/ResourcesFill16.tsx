import React, { ForwardedRef, SVGProps } from 'react';

  const ResourcesFill16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M3 2C2.44772 2 2 2.44772 2 3V8C2 8.55228 2.44772 9 3 9H6.5C7.05228 9 7.5 8.55228 7.5 8V3C7.5 2.44772 7.05228 2 6.5 2H3ZM9.5 7C8.94772 7 8.5 7.44772 8.5 8V13C8.5 13.5523 8.94772 14 9.5 14H13C13.5523 14 14 13.5523 14 13V8C14 7.44772 13.5523 7 13 7H9.5ZM2 11C2 10.4477 2.44772 10 3 10H6.5C7.05228 10 7.5 10.4477 7.5 11V13C7.5 13.5523 7.05228 14 6.5 14H3C2.44772 14 2 13.5523 2 13V11ZM9.5 2C8.94772 2 8.5 2.44772 8.5 3V5C8.5 5.55228 8.94772 6 9.5 6H13C13.5523 6 14 5.55228 14 5V3C14 2.44772 13.5523 2 13 2H9.5Z"/>
      </svg>
    )
  });

  ResourcesFill16.displayName = 'ResourcesFill16';

  export default ResourcesFill16
