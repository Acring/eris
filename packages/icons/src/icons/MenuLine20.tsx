import React, { ForwardedRef, SVGProps } from 'react';

  const MenuLine20 = React.forwardRef(({color = 'currentColor', size= 20, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M2 3H18V5H2V3ZM2 9H18V11H2V9ZM18 15H2V17H18V15Z"/>
      </svg>
    )
  });

  MenuLine20.displayName = 'MenuLine20';

  export default MenuLine20
