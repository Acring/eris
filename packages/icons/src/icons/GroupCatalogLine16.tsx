import React, { ForwardedRef, SVGProps } from 'react';

  const GroupCatalogLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path d="M13.0496 13.9V5.7H13.8996V14.75H3.64961V13.1H2.09961V1.25H9.44961V2.1H2.94961V12.3H11.4996V4.1H12.3496V13.1H4.49961V13.9H13.0496Z"/><path d="M9.9996 1.35V3.55H12.2496L9.9996 1.35ZM4.4496 4.2H9.9996V5.05H4.4496V4.2ZM9.9996 6.7H4.4496V7.55H9.9996V6.7ZM4.4496 9.2H9.9996V10.05H4.4496V9.2Z"/>
      </svg>
    )
  });

  GroupCatalogLine16.displayName = 'GroupCatalogLine16';

  export default GroupCatalogLine16
