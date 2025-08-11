import React, { ForwardedRef, SVGProps } from 'react';

  const DeepArchivingLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M2.9001 0.998047C2.45827 0.998047 2.1001 1.35622 2.1001 1.79805V6.00147H1.8C1.35817 6.00147 1 6.35963 1 6.80146V14.2015C1 14.6433 1.35817 15.0015 1.8 15.0015H14.2C14.6418 15.0015 15 14.6433 15 14.2015V8.78074C15 8.33891 14.6418 7.98074 14.2 7.98074H13.9001V1.79805C13.9001 1.35622 13.5419 0.998047 13.1001 0.998047H2.9001ZM12.7001 7.98074V2.19805H3.3001V6.00147H6.21342C6.44713 6.00147 6.66914 6.10366 6.82113 6.28119L8.27617 7.98074H12.7001ZM7.3998 4.6H11.5998V3.4H7.3998V4.6ZM9.6 6.6H11.6V5.4H9.6V6.6ZM2.2 7.20147V13.8015H13.8V9.18074H8.09206C7.85835 9.18074 7.63634 9.07854 7.48435 8.90102L6.02931 7.20147H2.2Z"/>
      </svg>
    )
  });

  DeepArchivingLine16.displayName = 'DeepArchivingLine16';

  export default DeepArchivingLine16
