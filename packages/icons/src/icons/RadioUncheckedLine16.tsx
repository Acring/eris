import React, { ForwardedRef, SVGProps } from 'react';

  const RadioUncheckedLine16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M8 12.8C10.651 12.8 12.8 10.651 12.8 8C12.8 5.34903 10.651 3.2 8 3.2C5.34903 3.2 3.2 5.34903 3.2 8C3.2 10.651 5.34903 12.8 8 12.8ZM8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"/>
      </svg>
    )
  });

  RadioUncheckedLine16.displayName = 'RadioUncheckedLine16';

  export default RadioUncheckedLine16
