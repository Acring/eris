import React, { ForwardedRef, SVGProps } from 'react';

  const CloseLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M7.99866 8.84728L12.2189 13.0676L13.0674 12.219L8.84718 7.99875L13.0676 3.77822L12.2191 2.92969L7.99866 7.15021L3.77821 2.92969L2.92969 3.77822L7.15014 7.99875L2.92991 12.219L3.77844 13.0676L7.99866 8.84728Z"/>
      </svg>
    )
  });

  CloseLine16.displayName = 'CloseLine16';

  export default CloseLine16
