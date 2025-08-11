import React, { ForwardedRef, SVGProps } from 'react';

  const PlusCircleLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M8 13.8C11.2033 13.8 13.8 11.2033 13.8 8C13.8 4.79675 11.2033 2.2 8 2.2C4.79675 2.2 2.2 4.79675 2.2 8C2.2 11.2033 4.79675 13.8 8 13.8ZM8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM11.5 7.29999V8.69999H8.70001V11.5H7.30001L7.30001 8.69999H4.5V7.29999H7.30001L7.30001 4.5H8.70001V7.29999H11.5Z"/>
      </svg>
    )
  });

  PlusCircleLine16.displayName = 'PlusCircleLine16';

  export default PlusCircleLine16
