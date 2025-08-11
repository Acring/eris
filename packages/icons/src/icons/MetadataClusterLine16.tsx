import React, { ForwardedRef, SVGProps } from 'react';

  const MetadataClusterLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <g clipPath="url(#clip0_1_1565)"><path d="M7.9995 8.433L4.6685 6.5125V2.6705L7.9995 0.75L11.3315 2.6705V6.5125L7.9995 8.433ZM5.5835 6.001L8.0005 7.411L10.417 6.001V3.182L8 1.772L5.5835 3.182V6.001ZM11.918 15.25L8.587 13.329V9.488L11.9185 7.567L15.2505 9.488V13.329L11.918 15.25ZM9.5015 12.818L11.91 14.2275L14.335 12.818V9.9985L11.9275 8.589L9.519 9.9985V12.818H9.5015ZM4.081 15.25L0.75 13.329V9.488L4.081 7.567L7.4315 9.488V13.329L4.081 15.25ZM1.674 12.818L4.082 14.2275L6.507 12.818V9.9985L4.0995 8.589L1.674 9.9985V12.818Z"/></g><defs><clipPath id="clip0_1_1565"><path d="M0 0H16V16H0z"/></clipPath></defs>
      </svg>
    )
  });

  MetadataClusterLine16.displayName = 'MetadataClusterLine16';

  export default MetadataClusterLine16
