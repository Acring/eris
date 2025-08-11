import React, { ForwardedRef, SVGProps } from 'react';

  const MultiplicationLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M8.00002 9.06037L11.1181 12.1782L12.1788 11.1175L9.06073 7.99976L12.1788 4.88199L11.1181 3.82129L8.00002 6.93914L4.8819 3.82129L3.82129 4.88199L6.93932 7.99976L3.82129 11.1175L4.8819 12.1782L8.00002 9.06037Z"/>
      </svg>
    )
  });

  MultiplicationLine16.displayName = 'MultiplicationLine16';

  export default MultiplicationLine16
