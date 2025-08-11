import React, { ForwardedRef, SVGProps } from 'react';

  const MenuRegionFill16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M8 14.6395L11.6332 11.0063C12.4023 10.2371 13.1821 9.00111 13.3943 7.93422C13.6065 6.86733 13.4976 5.76148 13.0813 4.7565C12.665 3.75153 11.9601 2.89256 11.0556 2.28823C10.1511 1.68389 9.08779 1.36133 8 1.36133C6.91222 1.36133 5.84886 1.68389 4.9444 2.28823C4.03993 2.89256 3.33498 3.75153 2.91869 4.7565C2.5024 5.76148 2.39347 6.86733 2.60566 7.93422C2.81786 9.00111 3.59765 10.2371 4.36681 11.0063L8 14.6395ZM7.99996 9.2614C9.36687 9.2614 10.475 8.15331 10.475 6.7864C10.475 5.4195 9.36687 4.3114 7.99996 4.3114C6.63306 4.3114 5.52496 5.4195 5.52496 6.7864C5.52496 8.15331 6.63306 9.2614 7.99996 9.2614Z"/>
      </svg>
    )
  });

  MenuRegionFill16.displayName = 'MenuRegionFill16';

  export default MenuRegionFill16
