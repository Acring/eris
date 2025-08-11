import React, { ForwardedRef, SVGProps } from 'react';

  const MenuPoolFill16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M2.2 5.8V3.2H13.8V5.8H2.2ZM1 3C1 2.44772 1.44772 2 2 2H14C14.5523 2 15 2.44772 15 3V7H1V3ZM4 3.89999H12V5.09999H4V3.89999ZM1 8H4V10.2H12V8H15V13C15 13.5523 14.5523 14 14 14H2C1.44772 14 1 13.5523 1 13V8ZM10 8H6V9.2H10V8Z"/>
      </svg>
    )
  });

  MenuPoolFill16.displayName = 'MenuPoolFill16';

  export default MenuPoolFill16
