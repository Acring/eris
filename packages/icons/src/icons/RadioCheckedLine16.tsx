import React, { ForwardedRef, SVGProps } from 'react';

  const RadioCheckedLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M12.8 8C12.8 10.651 10.651 12.8 8 12.8C5.34903 12.8 3.2 10.651 3.2 8C3.2 5.34903 5.34903 3.2 8 3.2C10.651 3.2 12.8 5.34903 12.8 8ZM14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8ZM8 11C9.65685 11 11 9.65685 11 8C11 6.34315 9.65685 5 8 5C6.34315 5 5 6.34315 5 8C5 9.65685 6.34315 11 8 11Z"/>
      </svg>
    )
  });

  RadioCheckedLine16.displayName = 'RadioCheckedLine16';

  export default RadioCheckedLine16
