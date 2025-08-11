import React, { ForwardedRef, SVGProps } from 'react';

  const StopFill16 = React.forwardRef(({color = 'currentColor', size= 16, ...otherProps}: {
    color?: string;
    size?: number | string;
  } & SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill={color} {...otherProps} ref={ref}>
        <path fillRule="evenodd" clipRule="evenodd" d="M8 15.2002C11.9766 15.2002 15.2002 11.9766 15.2002 8C15.2002 4.02344 11.9766 0.799805 8 0.799805C4.02344 0.799805 0.799805 4.02344 0.799805 8C0.799805 11.9766 4.02344 15.2002 8 15.2002ZM11.1004 8C11.1004 7.58579 10.7646 7.25 10.3504 7.25H5.65039C5.23618 7.25 4.90039 7.58579 4.90039 8C4.90039 8.41421 5.23618 8.75 5.65039 8.75H10.3504C10.7646 8.75 11.1004 8.41421 11.1004 8Z"/>
      </svg>
    )
  });

  StopFill16.displayName = 'StopFill16';

  export default StopFill16
