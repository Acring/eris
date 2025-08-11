import React, { ForwardedRef, SVGProps } from 'react';

  const PlusCircleFill20 = React.forwardRef(({color = 'currentColor', size= 20, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM9.42857 5.42857C9.42857 5.11298 9.68441 4.85714 10 4.85714C10.3156 4.85714 10.5714 5.11298 10.5714 5.42857V9.42857H14.5714C14.887 9.42857 15.1429 9.68441 15.1429 10C15.1429 10.3156 14.887 10.5714 14.5714 10.5714H10.5714V14.5714C10.5714 14.887 10.3156 15.1429 10 15.1429C9.68441 15.1429 9.42857 14.887 9.42857 14.5714V10.5714H5.42857C5.11298 10.5714 4.85714 10.3156 4.85714 10C4.85714 9.68441 5.11298 9.42857 5.42857 9.42857H9.42857V5.42857Z"/>
      </svg>
    )
  });

  PlusCircleFill20.displayName = 'PlusCircleFill20';

  export default PlusCircleFill20
