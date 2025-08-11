import React, { ForwardedRef, SVGProps } from 'react';

  const FullScreenLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M2.19971 1.59961C1.86834 1.59961 1.59971 1.86824 1.59971 2.19961V6.19961H2.79971V2.79961H6.19971V1.59961H2.19971ZM14.3993 13.7997V9.79971H13.1993V13.1997H9.79932V14.3997H13.7993C14.1307 14.3997 14.3993 14.1311 14.3993 13.7997ZM12.3486 2.79963H9.79731V1.59963H13.7973C14.1287 1.59963 14.3973 1.86826 14.3973 2.19963V6.19963H13.1973V3.648L9.88808 6.95723L9.03955 6.1087L12.3486 2.79963ZM6.19961 13.1973H3.6481L6.95721 9.88823L6.10868 9.0397L2.79961 12.3488V9.79733H1.59961V13.7973C1.59961 14.1287 1.86824 14.3973 2.19961 14.3973H6.19961V13.1973Z"/>
      </svg>
    )
  });

  FullScreenLine16.displayName = 'FullScreenLine16';

  export default FullScreenLine16
