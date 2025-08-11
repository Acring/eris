import React, { ForwardedRef, SVGProps } from 'react';

  const PlusCircleFill16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM11.5 8.69999V7.29999H8.70001V4.5H7.30001L7.30001 7.29999H4.5V8.69999H7.30001L7.30001 11.5H8.70001V8.69999H11.5Z"/>
      </svg>
    )
  });

  PlusCircleFill16.displayName = 'PlusCircleFill16';

  export default PlusCircleFill16
