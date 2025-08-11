import React, { ForwardedRef, SVGProps } from 'react';

  const ViewLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M1.91602 7.08496H7.08444V1.91699H1.91602V7.08496ZM6.11455 6.11554H2.88544V2.88643H6.11455V6.11554ZM8.91464 7.08496H14.0835V1.91699H8.91464V7.08496ZM13.1141 6.11554H9.88409V2.88643H13.1141V6.11554ZM1.91602 14.0831H7.08444V8.91608H1.91602V14.0831ZM6.11455 13.1137H2.88544V9.88552H6.11455V13.1137ZM14.0835 14.0831H8.91464V8.91608H14.0835V11.1655H13.1141V9.88551H9.88407V13.1137H14.0835V13.1833V14.0831Z"/>
      </svg>
    )
  });

  ViewLine16.displayName = 'ViewLine16';

  export default ViewLine16
