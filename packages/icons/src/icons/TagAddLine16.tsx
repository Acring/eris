import React, { ForwardedRef, SVGProps } from 'react';

  const TagAddLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path d="M7.5 7.2998H5.5V6.2998H7.5V4.29982H8.5V6.2998H10.5V7.2998H8.5V9.29982H7.5V7.2998Z"/><path fillRule="evenodd" clipRule="evenodd" d="M3 1.7998C2.44772 1.7998 2 2.24752 2 2.7998V13.1724C2 13.918 2.78481 14.4014 3.45 14.0645L7.54816 12.2429C7.83221 12.0991 8.16779 12.0991 8.45184 12.2429L12.55 14.0645C13.2152 14.4014 14 13.918 14 13.1724V2.7998C14 2.24752 13.5523 1.7998 13 1.7998H3ZM3.2 2.9998V12.8469L7.00595 11.1724C7.63086 10.8559 8.36914 10.8559 8.99405 11.1724L12.8 12.8469V2.9998H3.2Z"/>
      </svg>
    )
  });

  TagAddLine16.displayName = 'TagAddLine16';

  export default TagAddLine16
