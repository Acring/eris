import React, { ForwardedRef, SVGProps } from 'react';

  const Site2Fill16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M7.88094 0.324219L14.4445 4.11369V11.6926L7.88094 15.4821L1.31738 11.6926V4.11369L7.88094 0.324219ZM11.6576 6.46139L8.29958 8.13718L8.2513 12.1024L11.6577 10.136L11.6576 6.46139ZM4.10421 6.4016L4.10446 10.136L7.40976 12.0443L7.45748 8.131L4.10421 6.4016ZM7.88405 3.70377L4.40597 5.60974L7.88405 7.40347L11.414 5.64146L7.88405 3.70377Z"/>
      </svg>
    )
  });

  Site2Fill16.displayName = 'Site2Fill16';

  export default Site2Fill16
