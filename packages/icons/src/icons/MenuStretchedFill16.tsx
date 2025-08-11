import React, { ForwardedRef, SVGProps } from 'react';

  const MenuStretchedFill16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M2.2145 1.25C1.68182 1.25 1.25 1.68182 1.25 2.2145V7.03698C1.25 7.56965 1.68182 8.00147 2.2145 8.00147H3.28233V11.9973C3.28233 12.3968 3.6062 12.7207 4.0057 12.7207H8.00147V13.7856C8.00147 14.3182 8.43329 14.7501 8.96597 14.7501H13.7855C14.3182 14.7501 14.75 14.3182 14.75 13.7856V8.96603C14.75 8.43335 14.3182 8.00153 13.7855 8.00153H12.7206V4.00576C12.7206 3.60625 12.3967 3.28239 11.9972 3.28239H8.00147V2.2145C8.00147 1.68182 7.56965 1.25 7.03698 1.25H2.2145ZM4.72907 11.2739V8.00147H6.00359V9.99941H8.00147V11.2739H4.72907ZM9.99936 8.00153H11.2739V4.72913H8.00147V6.00365H9.99936V8.00153Z"/>
      </svg>
    )
  });

  MenuStretchedFill16.displayName = 'MenuStretchedFill16';

  export default MenuStretchedFill16
